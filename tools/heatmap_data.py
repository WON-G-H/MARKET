"""Market-cap ranked heatmap snapshots. No AI classification or return estimates."""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime,timezone,timedelta
import hashlib
import json
import re
import urllib.request
from market_data import atomic_write,save_json
from core_metrics import number

KR='https://m.stock.naver.com/api/'
NASDAQ='https://api.nasdaq.com/api/screener/stocks?exchange=nasdaq&download=true'
INDUSTRY=KR+'stocks/industry?page=1&pageSize=100'

def normalize_kr(body,market):
    if body.get('stockListCategoryType')!=market:raise ValueError('Wrong Korean market')
    result=[]
    for row in body['stocks']:
        if row.get('stockEndType')!='stock':continue
        symbol=row['itemCode']
        if not re.fullmatch(r'[A-Z0-9]{6}',symbol):raise ValueError('Invalid symbol')
        cap=number(row['marketValueRaw']);price=number(row['closePriceRaw'])
        change=number(row['fluctuationsRatio'])
        if cap<=0 or price<=0 or not -100<=change<=1000:raise ValueError('Invalid Korean quote')
        observed=datetime.fromisoformat(row['localTradedAt'])
        if observed.tzinfo is None:raise ValueError('Quote time missing timezone')
        result.append(dict(symbol=symbol,name=row['stockName'],marketCap=cap,price=price,
                           changePct=change,currency='KRW',quoteAt=observed.isoformat(),
                           sector='업종 미확인',url='https://stock.naver.com/domestic/stock/'+symbol))
    return validate(result),body.get('totalCount')

def normalize_us(body):
    rows=body['data']['rows'];result=[];skipped=0
    if not isinstance(rows,list) or not rows:raise ValueError('Empty Nasdaq screener')
    for row in rows:
        try:
            symbol=row['symbol']
            if not re.fullmatch(r'[A-Za-z0-9.^/-]+',symbol):raise ValueError('Invalid symbol')
            cap=number(row['marketCap']);price=number(row['lastsale'].replace('$',''))
            change=number(row['pctchange'].replace('%',''))
            if cap<=0 or price<=0 or not -100<=change<=1000:raise ValueError('Invalid quote')
            result.append(dict(symbol=symbol,name=row['name'],marketCap=cap,price=price,
                               changePct=change,currency='USD',quoteAt=None,
                               sector=row.get('sector') or '업종 미확인',industry=row.get('industry'),
                               url='https://www.nasdaq.com/market-activity/stocks/'+symbol.lower()))
        except (ValueError,KeyError,TypeError):skipped+=1
    return validate(result),len(rows),skipped

def validate(rows):
    if len(rows)<30:raise ValueError('Fewer than 30 usable stocks; preserving previous map')
    if len({r['symbol'] for r in rows})!=len(rows):raise ValueError('Duplicate symbols')
    return sorted(rows,key=lambda r:(-r['marketCap'],r['symbol']))[:100]

def collect(root,apply=False,fetcher=None,now=None):
    now=now or datetime.now(timezone.utc);stamp=now.isoformat()
    output=root/'market-data/heatmap';latest=output/'latest.json'
    prior=json.loads(latest.read_text(encoding='utf-8')) if latest.exists() else {'markets':{}}
    cache_path=output/'industries.json'
    cache=json.loads(cache_path.read_text(encoding='utf-8')) if cache_path.exists() else {}
    def get(url):
        if fetcher:raw=fetcher(url)
        else:
            req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; MarketLedger/1.0)','Accept':'application/json'})
            with urllib.request.urlopen(req,timeout=20) as r:raw=r.read(5_000_001)
        if len(raw)>5_000_000:raise ValueError('Response too large')
        body=json.loads(raw)
        digest=hashlib.sha256(raw).hexdigest()
        atomic_write(output/'raw'/(digest+'.json'),raw.decode('utf-8-sig'))
        return body,digest
    try:
        body,_=get(INDUSTRY);names={str(g['no']):g['name'] for g in body['groups']}
    except (OSError,ValueError,KeyError):names={}
    markets={};warnings=[]
    for market in ['KOSPI','KOSDAQ','NASDAQ']:
        url=NASDAQ if market=='NASDAQ' else KR+'stocks/marketValue/'+market+'?page=1&pageSize=100'
        try:
            body,digest=get(url)
            skipped=0
            if market=='NASDAQ':rows,total,skipped=normalize_us(body)
            else:
                rows,total=normalize_kr(body,market)
                if len(rows)<100 and total and total>100:
                    page2,second_hash=get(url.replace('page=1&','page=2&'))
                    if page2.get('stockListCategoryType')!=market:raise ValueError('Wrong market on second page')
                    combined=dict(body,stocks=body['stocks']+page2['stocks'])
                    rows,total=normalize_kr(combined,market)
                    digest=[digest,second_hash]
                def classify(row):
                    key=row['symbol'];old=cache.get(key)
                    if old and (now-datetime.fromisoformat(old['checkedAt'])).days<30:return key,old
                    try:
                        b,_=get(KR+'stock/'+key+'/integration')
                        if b['itemCode']!=key:raise ValueError('Wrong industry symbol')
                        name=names.get(str(b.get('industryCode')))
                        if not name:raise ValueError('Industry name unavailable')
                        return key,{'sector':name,'checkedAt':stamp}
                    except (OSError,ValueError,KeyError):return key,old
                with ThreadPoolExecutor(max_workers=4) as pool:
                    for key,value in pool.map(classify,rows):
                        if value:cache[key]=value
                for row in rows:row['sector']=cache.get(row['symbol'],{}).get('sector','업종 미확인')
            missing=sum(r['sector']=='업종 미확인' for r in rows)
            dates=[r['quoteAt'] for r in rows if r['quoteAt']]
            markets[market]={'rows':rows,'status':'success','checkedAt':stamp,'sourceUrl':url,
                             'rawHash':digest,'totalSourceRows':total,'skippedRows':skipped,
                             'unclassified':missing,'quoteTimeRange':[min(dates),max(dates)] if dates else None,
                             'note':'시가총액 상위 후보 중 '+str(len(rows))+'종목 · 공급자 시세 스냅샷. 전체 시장 수익률이 아님.'+
                             (' Nasdaq 상장 종목 기준. 개별 거래시각 미제공; 수집시각만 표시. 복수 주식종류는 별도 종목이며 기업 시총이 중복될 수 있음.' if market=='NASDAQ' else
                              ' NXT 시간외 시세 제외, 기본 가격·등락률 사용. 업종 분류는 최대 30일 캐시.')}
            if missing:warnings.append(market+': 업종 미확인 '+str(missing)+'종목')
        except (OSError,ValueError,KeyError,TypeError) as exc:
            markets[market]=dict(prior['markets'].get(market,{'rows':[]}),status='failed',error=str(exc))
            warnings.append(market+': 수집 실패 · 기존 지도 유지 ('+str(exc)+')')
    save_json(cache_path,cache)
    bundle={'checkedAt':stamp,'markets':markets,'warnings':warnings,'status':'partial' if warnings else 'success'}
    save_json(latest,bundle)
    save_json(output/'runs'/(now.strftime('%Y%m%dT%H%M%S%fZ')+'.json'),bundle)
    if apply:
        script='window.MARKET_LEDGER=window.MARKET_LEDGER||{};\nwindow.MARKET_LEDGER.heatmap='+json.dumps(bundle,ensure_ascii=False,indent=2,allow_nan=False)+';\n'
        index=root/'index.html';original=index.read_text(encoding='utf-8')
        tag='<script src="data/heatmap.js?v='+hashlib.sha256(script.encode()).hexdigest()[:16]+'"></script>'
        if 'src="data/heatmap.js' in original:
            updated,count=re.subn(r'<script src="data/heatmap\.js(?:\?[^" ]*)?"></script>',tag,original)
            if count!=1:raise ValueError('Duplicate heatmap script')
        else:
            if original.count('<script src="assets/script.js')!=1:raise ValueError('Missing renderer')
            updated=original.replace('<script src="assets/script.js',tag+'\n  <script src="assets/script.js',1)
        atomic_write(root/'data/heatmap.js',script);atomic_write(index,updated)
    return bundle
