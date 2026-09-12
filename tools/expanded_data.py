"""Phase 5: additional public observations, separate from research and Dashboard cards."""
from concurrent.futures import ThreadPoolExecutor
import csv
from datetime import date, datetime, timedelta, timezone
import hashlib
import io
import json
import os
import urllib.request

from core_metrics import KST, NAVER, Table, daily_table, number
from market_data import atomic_write, save_json


def definitions(cutoff):
    result = {}
    def add(key, label, provider, url, unit, frequency, **extra):
        result[key] = dict(label=label, provider=provider, url=url, unit=unit,
                           frequency=frequency, **extra)
    add('kospi200', 'KOSPI200', 'naver', NAVER + 'sise/sise_index_day.naver?code=KPI200&page=1',
        'index', 'daily', column=1, headers=['날짜','체결가'], positive=True)
    for market, code in [('kospi','01'),('kosdaq','02')]:
        url = NAVER + 'sise/investorDealTrendDay.naver?bizdate=' + cutoff.strftime('%Y%m%d') + '&sosok=' + code
        for investor, label, column in [('individual','개인',1),('foreign','외국인',2),('institution','기관계',3)]:
            # KOSPI foreign is already in the core collector; do not collect it twice here.
            if market == 'kospi' and investor == 'foreign':
                continue
            add(market+'_'+investor+'_net', market.upper()+' '+label+' 순매수', 'naver', url,
                '억원', 'daily', column=column, headers=['날짜','개인','외국인','기관계'], positive=False)
    for currency, label, unit in [('JPY','엔화','원/100엔'),('EUR','유로','원/유로'),('CNY','위안','원/위안')]:
        add(currency.lower()+'krw_reference', label+' 매매기준율', 'naver',
            NAVER+'marketindex/exchangeDailyQuote.naver?marketindexCd=FX_'+currency+'KRW&page=1',
            unit, 'daily', column=1, headers=['날짜','매매기준율'], positive=True)
    for key, label, unit, frequency, adjustment in [
        ('WALCL','미 연준 총자산 · 수요일 잔액','백만 USD','weekly','NSA'),
        ('WTREGEN','미 재무부 TGA · 주간 평균','백만 USD','weekly','NSA'),
        ('RRPONTSYD','미 연준 ON RRP','십억 USD','daily','NSA'),
        ('M2SL','미국 M2','십억 USD','monthly','SA'),
        ('CPIAUCSL','미국 CPI','index 1982–1984=100','monthly','SA'),
        ('UNRATE','미국 실업률','%','monthly','SA')]:
        add(key.lower(), label, 'fred', 'https://fred.stlouisfed.org/graph/fredgraph.csv?id='+key+
            '&cosd='+str(cutoff.year-2)+'-01-01', unit, frequency, code=key,
            sourceUrl='https://fred.stlouisfed.org/series/'+key, seasonalAdjustment=adjustment)
    for key, code, label in [('kr_inflation_annual','FP.CPI.TOTL.ZG','한국 소비자물가 상승률 · 연간'),
                             ('kr_gdp_growth_annual','NY.GDP.MKTP.KD.ZG','한국 실질 GDP 성장률 · 연간')]:
        add(key, label, 'worldbank', 'https://api.worldbank.org/v2/country/KOR/indicator/'+code+
            '?format=json&per_page=10', '% 전년 대비', 'annual', code=code,
            sourceUrl='https://data.worldbank.org/indicator/'+code+'?locations=KR')
    return result


def fred_points(text, spec, cutoff):
    reader = csv.DictReader(io.StringIO(text.lstrip('\ufeff')))
    if reader.fieldnames != ['observation_date', spec['code']]:
        raise ValueError('Unexpected FRED CSV columns')
    points = {}
    for row in reader:
        observed = date.fromisoformat(row['observation_date'])
        if observed > cutoff:
            continue
        raw = row[spec['code']]
        value = None if raw in ('', '.') else number(raw)
        if value is not None and value < 0:
            raise ValueError('Negative level in nonnegative FRED series')
        key = observed.isoformat()
        if key in points and points[key] != value:
            raise ValueError('Conflicting FRED date duplicates')
        points[key] = value
    if not any(v is not None for v in points.values()):
        raise ValueError('No valid FRED observations')
    return points, {}


def worldbank_points(text, spec, cutoff):
    body = json.loads(text)
    if not isinstance(body, list) or len(body) != 2 or not isinstance(body[1], list):
        raise ValueError('Unexpected World Bank response')
    points = {}
    for row in body[1]:
        if row['countryiso3code'] != 'KOR' or row['indicator']['id'] != spec['code']:
            raise ValueError('Unexpected country or indicator')
        year = int(row['date'])
        # Annual figures are periods, never a January 1 release/observation timestamp.
        if year >= cutoff.year:
            continue
        raw = row['value']
        value = None if raw is None else number(str(raw))
        key = str(year)
        if key in points and points[key] != value:
            raise ValueError('Conflicting World Bank year duplicates')
        points[key] = value
    if not any(v is not None for v in points.values()):
        raise ValueError('No valid annual observations')
    return points, {'datasetUpdatedAt': body[0].get('lastupdated'),
                    'note': '한국 연간 통계. 월간 CPI·분기 GDP 또는 당일 경기 상태가 아님.'}


def period_end(period, frequency):
    if frequency == 'annual':
        return date(int(period),12,31)
    day = date.fromisoformat(period)
    if frequency == 'monthly':
        return date(day.year + (day.month == 12), day.month % 12 + 1, 1) - timedelta(days=1)
    return day


def summarize(key, spec, history, status, cutoff, error=None, latest_missing=False):
    rows = sorted((p for p in history.values() if p['series'] == key and
                   period_end(p['period'], spec['frequency']) <= cutoff), key=lambda p:p['period'])
    current, previous = (rows[-1] if rows else None), (rows[-2] if len(rows)>1 else None)
    age = (cutoff - period_end(current['period'],spec['frequency'])).days if current else None
    threshold = {'daily':7,'weekly':21,'monthly':100,'annual':730}[spec['frequency']]
    delta = current['value'] - previous['value'] if current and previous else None
    warning = error or ('원응답의 최근 기간이 결측 · 이전 유효값 사용' if latest_missing else
                        '공표 주기 대비 오래된 관측 · 최신 발표 여부 확인 필요' if age is not None and age>threshold else None)
    return {'series':key,'label':spec['label'],'unit':spec['unit'],'frequency':spec['frequency'],
            'seasonalAdjustment':spec.get('seasonalAdjustment'),
            'sourceUrl':spec.get('sourceUrl',spec['url'].split('&page=')[0]),
            'collectionStatus':status,'usingStoredValue':status!='success' or latest_missing,
            'current':current,'previous':previous,'change':delta,'changeUnit':spec['unit'],
            'ageDaysAfterPeriodEnd':age,'staleThresholdDays':threshold,
            'latestResponseMissing':latest_missing,'warning':warning,
            'verification':'provider_data_not_independently_cross_checked',
            'publishedAt':None}


def collect(output, now=None, fetcher=None):
    now = now or datetime.now(timezone.utc)
    if now.tzinfo is None:
        raise ValueError('Collection time requires timezone')
    now = now.astimezone(timezone.utc)
    cutoff, stamp = now.astimezone(KST).date(), now.isoformat()
    output.mkdir(parents=True,exist_ok=True)
    lock = output/'.lock'
    fd = os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    os.close(fd)
    try:
        specs = definitions(cutoff)
        path = output/'history.json'
        state = json.loads(path.read_text(encoding='utf-8')) if path.exists() else {
            'schemaVersion':1,'observations':{},'revisions':[]}
        def download(url):
            try:
                if fetcher:
                    raw = fetcher(url)
                else:
                    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; MarketLedger/1.0)'})
                    with urllib.request.urlopen(req,timeout=25) as response:
                        raw=response.read(5_000_001)
                if len(raw)>5_000_000:
                    raise ValueError('Response exceeds size limit')
                return raw,None
            except (OSError,ValueError) as exc:
                return None,type(exc).__name__+': '+str(exc)
        # Shared flow tables are fetched only once; maximum four simultaneous requests.
        urls=list(dict.fromkeys(s['url'] for s in specs.values()))
        with ThreadPoolExecutor(max_workers=4) as pool:
            responses=dict(zip(urls,pool.map(download,urls)))
        metrics, sources = {}, {}
        for key,spec in specs.items():
            raw,error=responses[spec['url']]
            missing=False
            try:
                if error:
                    raise ValueError(error)
                text=raw.decode('cp949' if spec['provider']=='naver' else 'utf-8-sig')
                digest=hashlib.sha256(raw).hexdigest()
                atomic_write(output/'raw'/(digest+'.txt'),text)
                sources[spec['url']]={'sha256':digest,'encoding':'cp949' if spec['provider']=='naver' else 'utf-8'}
                metadata={}
                if spec['provider']=='naver':
                    if spec['column'] in (2,3) or key.endswith('_net'):
                        parsed=Table()
                        parsed.feed(text)
                        if not parsed.rows or parsed.rows[0][:4] != ['날짜','개인','외국인','기관계']:
                            raise ValueError('Investor column order changed')
                    limit=cutoff if now.astimezone(KST).hour>=16 else cutoff-timedelta(days=1)
                    points=daily_table(text,limit,spec['column'],spec['headers'],spec['positive'])
                elif spec['provider']=='fred':
                    points,metadata=fred_points(text,spec,cutoff)
                else:
                    points,metadata=worldbank_points(text,spec,cutoff)
                missing=points[max(points)] is None
                for period,value in sorted(points.items()):
                    if value is None:
                        continue  # No zero fill and no erasure of a previously reported value.
                    point={'series':key,'period':period,'value':value,'unit':spec['unit'],
                           'frequency':spec['frequency'],'sourceUrl':spec.get('sourceUrl',spec['url'].split('&page=')[0])}
                    identity=key+'/'+period
                    prior=state['observations'].get(identity)
                    # URL query dates are provenance, not an economic revision.
                    if prior and all(prior.get(k)==point[k] for k in ('series','period','value','unit','frequency')):
                        continue
                    if prior:
                        state['revisions'].append({'key':identity,'previous':prior,'revisedAt':stamp})
                    state['observations'][identity]=dict(point,fetchedAt=stamp,rawHash=digest)
                metric=summarize(key,spec,state['observations'],'success',cutoff,latest_missing=missing)
                if metric['current'] and metric['current']['period'] > max(points):
                    metric['latestResponseRegressed']=True
                    metric['usingStoredValue']=True
                    metric['warning']='최신 응답 관측 기간 회귀 · 저장된 더 최근 값 유지'
                metric['providerMetadata']=metadata
            except (OSError,ValueError,KeyError,TypeError) as exc:
                metric=summarize(key,spec,state['observations'],'failed',cutoff,error=str(exc))
            metrics[key]=metric
        save_json(path,state)
        failures=[key for key,m in metrics.items() if m['collectionStatus']=='failed']
        warnings=[m['label']+': '+m['warning'] for m in metrics.values() if m['warning']]
        bundle={'schemaVersion':1,'checkedAt':stamp,'observationCutoff':cutoff.isoformat(),
                'status':'failed' if len(failures)==len(metrics) else 'partial' if warnings else 'success',
                'metrics':metrics,'warnings':warnings,'sources':sources,
                'limitations':['관측 기간과 발표 시각은 다르며 당시 이용 가능했던 정보를 재현하는 데이터가 아닙니다.',
                               '월간·연간 통계는 일별 값으로 보간하지 않습니다. 과거 정정이 포함될 수 있습니다.',
                               'TGA는 주간 평균, 연준 자산은 수요일 잔액, RRP는 일별 값입니다. 단순 합산한 유동성 점수는 생성하지 않습니다.',
                               '한국 월간 CPI·M2·기준금리의 신규 자동 연결은 이번 범위에 포함되지 않습니다. VKOSPI는 핵심지표 수집기가 별도로 수집합니다.']}
        save_json(output/'latest.json',bundle)
        save_json(output/'runs'/(now.strftime('%Y%m%dT%H%M%S%fZ')+'.json'),bundle)
        lines=['# 확장 시장 데이터','', '수집 확인: '+stamp,'상태: '+bundle['status'],'',
               '| 지표 | 최근 기간 | 값 | 단위 | 주기 | 상태 |','|---|---|---:|---|---|---|']
        for m in metrics.values():
            current=m['current']
            lines.append('| '+ ' | '.join([m['label'],current['period'] if current else '없음',
                         str(current['value']) if current else '없음',m['unit'],m['frequency'],
                         m['collectionStatus']+(' · 확인 필요' if m['warning'] else '')])+' |')
        lines+=['','## 주의 사항']+['- '+w for w in bundle['limitations']+warnings]
        lines+=['','## 출처']+['- '+m['label']+': '+m['sourceUrl'] for m in metrics.values()]
        atomic_write(output/'latest.md','\n'.join(lines)+'\n')
        return bundle
    finally:
        lock.unlink()
