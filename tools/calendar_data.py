"""Official release schedules, with preserved authored event research."""
from datetime import date, datetime, timedelta, timezone
import hashlib
import json
import re
import urllib.request
from zoneinfo import ZoneInfo

from core_metrics import KST
from market_data import atomic_write, save_json
from research_context import Reader

SOURCES = {'bea':'https://www.bea.gov/news/schedule/ics/online-calendar-subscription.ics',
           'bls':'https://www.bls.gov/schedule/news_release/bls.ics',
           'fed':'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm'}
FAMILIES = [('personal income and outlays','pce','소득·소비 / PCE','물가'),
            ('gross domestic product','gdp','미국 GDP','경기'),
            ('gdp (','gdp','미국 GDP','경기'),
            ('international trade in goods and services','trade','미국 무역수지','경기'),
            ('consumer price index','cpi','CPI / Core CPI','물가'),
            ('producer price index','ppi','PPI','물가'),
            ('employment situation','nfp','NFP / 실업률 / 임금','고용'),
            ('job openings and labor turnover','jolts','JOLTS','고용'),
            ('productivity and costs','productivity','Productivity / Unit Labor Costs','생산성')]


def event(provider,uid,title,family,category,day,kst,local_day):
    return {'id':'auto-'+provider+'-'+hashlib.sha256(uid.encode()).hexdigest()[:16],
            'providerUid':uid,'provider':provider,'family':family,'date':day,'kst':kst,
            'sourceLocalDate':local_day,'title':title,'category':category,'importance':2,
            'country':'미국','status':'발표 예정','previous':'확인 필요','consensus':'확인 필요',
            'actual':'확인 필요','surprise':'AI 확인 필요','source':provider.upper()+' 공식 일정',
            'sourceUrl':SOURCES[provider],'why':'리서치 해석 미작성','path':'리서치 해석 미작성',
            'checkpoints':['원문 발표 여부와 실제 수치 확인'],'reaction':'AI 확인 필요',
            'linkedDaily':'미지정','managedBy':'calendar-collector','scheduleStatus':'confirmed',
            'importanceNote':'자동 추가 일정의 기본 표시값이며 투자 중요도 판단이 아님'}


def parse_ics(text,provider):
    if 'BEGIN:VCALENDAR' not in text or 'END:VCALENDAR' not in text:
        raise ValueError('Incomplete iCalendar response')
    text=re.sub(r'\r?\n[ \t]','',text)
    events=[]
    for body in re.findall(r'BEGIN:VEVENT\r?\n(.*?)END:VEVENT',text,re.S):
        fields={}
        for line in body.splitlines():
            if ':' not in line:continue
            key,value=line.split(':',1)
            name=key.split(';')[0]
            if name in fields:raise ValueError('Duplicate calendar property')
            fields[name]=(key,value)
        summary=fields.get('SUMMARY',('', ''))[1].replace('\\,',',').replace('\\n',' ')
        match=next((f for f in FAMILIES if f[0] in summary.lower()),None)
        if not match:continue
        if 'RRULE' in fields or 'RECURRENCE-ID' in fields:
            raise ValueError('Recurring events need explicit expansion')
        key,raw=fields['DTSTART'];uid=fields['UID'][1]
        if raw.endswith('Z'):
            dt=datetime.strptime(raw,'%Y%m%dT%H%M%SZ').replace(tzinfo=timezone.utc)
        else:
            tz=re.search(r'TZID=([^;:]+)',key)
            if not tz:raise ValueError('Release time has no timezone')
            dt=datetime.strptime(raw,'%Y%m%dT%H%M%S').replace(tzinfo=ZoneInfo(tz[1]))
        local=dt.astimezone(ZoneInfo('America/New_York'))
        korean=dt.astimezone(KST)
        item=event(provider,uid,match[2]+' · '+summary,match[1],match[3],
                   korean.date().isoformat(),korean.strftime('%Y-%m-%d %H:%M'),local.date().isoformat())
        item['scheduledAt']=dt.isoformat()
        item['dateBasis']='KST'
        if fields.get('STATUS',('', ''))[1]=='CANCELLED':item['scheduleStatus']='cancelled'
        events.append(item)
    if not events:raise ValueError('No supported release events')
    ids=[e['id'] for e in events]
    if len(ids)!=len(set(ids)):raise ValueError('Duplicate event UID')
    return events


def parse_fed(text,year):
    section=re.search(str(year)+r' FOMC Meetings(.*?)(?=\d{4} FOMC Meetings|$)',text,re.S)
    if not section:raise ValueError('FOMC year missing')
    pairs=re.findall(r'fomc-meeting__month[^>]*>\s*<strong>(.*?)</strong>.*?fomc-meeting__date[^>]*>(.*?)</div>',section[1],re.S)
    months={name:i+1 for i,name in enumerate('January February March April May June July August September October November December'.split())}
    events=[]
    for month,days in pairs:
        month=re.sub('<[^>]+>','',month).strip().split('/')[-1]
        clean=re.sub('<[^>]+>','',days).strip()
        if month not in months or not re.fullmatch(r'\d{1,2}(?:-\d{1,2})?\*?',clean):
            raise ValueError('Unknown FOMC date format')
        day=date(year,months[month],int(clean.rstrip('*').split('-')[-1])).isoformat()
        item=event('fed','fomc-'+day,'FOMC 회의 종료'+(' · SEP' if '*' in clean else ''),
                   'fomc','중앙은행',day,'시간 미확인 · 미국 현지 종료일',day)
        item['dateBasis']='미국 현지일 · 한국 날짜 미확정'
        events.append(item)
    if len(events)<6:raise ValueError('Incomplete FOMC calendar')
    return events


def merge(authored,automatic,now):
    result=[dict(e) for e in authored]
    automatic=list(automatic)
    for i,old in enumerate(result):
        if not old['id'].startswith('us-pce-gdp-'):continue
        components=[e for e in automatic if e['family'] in ('pce','gdp') and e['sourceLocalDate']==old['date']]
        if len(components)==2 and len({e.get('scheduledAt') for e in components})==1:
            result[i]=dict(old,date=components[0]['date'],kst=components[0]['kst'],dateBasis='KST',
                           scheduleComponents=components,scheduleNote='GDP·PCE 각각 공식 일정 대조 · 기존 판단 보존')
            automatic=[e for e in automatic if e not in components]
        else:
            result[i]=dict(old,scheduleNote='복합 리서치 기록 · GDP와 PCE 개별 공식 일정 대조 필요')
    for item in automatic:
        new=dict(item)
        if new['scheduleStatus']=='cancelled':new['status']='일정 취소'
        elif new.get('scheduledAt') and datetime.fromisoformat(new['scheduledAt'])<=now:
            new['status']='예정시각 경과 · 발표 여부 확인 필요'
        matches=[i for i,e in enumerate(result) if e['id']==new['id'] or
                 (not e['id'].startswith('us-pce-gdp-') and e['id'].startswith(('fomc-' if new['family']=='fomc' else 'us-'+new['family']+'-')) and
                  abs((date.fromisoformat(e['date'])-date.fromisoformat(new['sourceLocalDate'])).days)<=7)]
        if len(matches)>1:
            new['scheduleNote']='기존 일정과 자동 연결 불확실 · 별도 표시'
        elif matches:
            old=result[matches[0]]
            # Preserve all actuals, consensus, importance and research. Only schedule facts change.
            updated=dict(old)
            for key in ['providerUid','provider','family','sourceLocalDate','scheduleStatus','dateBasis','scheduledAt']:
                if key in new:updated[key]=new[key]
            updated['scheduleSourceUrl']=new['sourceUrl']
            if new['family']!='fomc' or old['date']!=new['sourceLocalDate']:
                updated.update(date=new['date'],kst=new['kst'])
            else:
                updated['dateBasis']='기존 KST 시간 유지 · 공식 종료일 대조'
                if re.match(r'^\d{4}-\d{2}-\d{2}',old.get('kst','')):
                    updated['date']=old['kst'][:10]
            updated['scheduleNote']=new.get('scheduleNote','공식 일정 대조 · 기존 판단 보존')
            if new['scheduleStatus']=='cancelled':updated['status']='일정 취소'
            elif old.get('status')!='발표 완료':updated['status']=new['status']
            result[matches[0]]=updated
            continue
        result.append(new)
    if len({e['id'] for e in result})!=len(result):raise ValueError('Duplicate merged event IDs')
    return sorted(result,key=lambda e:(e['date'],e.get('kst',''),e['id']))


def collect(root,now=None,fetcher=None,apply=False):
    now=(now or datetime.now(timezone.utc)).astimezone(timezone.utc)
    today=now.astimezone(KST).date();output=root/'market-data/calendar'
    reader=Reader(root);authored=[]
    for path in sorted((root/'data/calendar').glob('calendar-????-??.js')):
        month=path.stem[-7:]
        authored+=reader.literal(path,'window.MARKET_LEDGER.calendar["'+month+'"]=')
    state_path=output/'sources.json'
    saved=json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {}
    warnings=[];sources={};automatic=[]
    start=today.replace(day=1);end=(start+timedelta(days=125)).replace(day=1)
    for provider,url in SOURCES.items():
        try:
            if fetcher:raw=fetcher(url)
            else:
                req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; MarketLedger/1.0)'})
                with urllib.request.urlopen(req,timeout=25) as response:raw=response.read(3_000_001)
            if len(raw)>3_000_000:raise ValueError('Calendar response too large')
            text=raw.decode('utf-8-sig')
            parsed=parse_fed(text,today.year) if provider=='fed' else parse_ics(text,provider)
            if provider=='fed' and end.year>today.year and end.month>1:
                parsed+=parse_fed(text,end.year)
            selected=[e for e in parsed if start<=date.fromisoformat(e['date'])<end]
            if not selected:raise ValueError('No events in requested calendar window')
            digest=hashlib.sha256(raw).hexdigest()
            atomic_write(output/'raw'/(digest+'.txt'),text)
            old=saved.get(provider,[])
            ids={e['id'] for e in selected}
            # Disappearance is not proof of cancellation. Retain and flag previously collected events.
            for e in old:
                if e['id'] not in ids and start<=date.fromisoformat(e['date'])<end:
                    selected.append(dict(e,scheduleNote='최신 원응답에서 누락 · 일정 재확인 필요'))
                    warnings.append(provider.upper()+': 기존 일정이 최신 응답에서 누락 · '+e['date'])
            selected_ids={e['id'] for e in selected}
            saved[provider]=[e for e in old if e['id'] not in selected_ids and date.fromisoformat(e['date'])<start]+selected
            sources[provider]={'status':'success','sha256':digest,'events':len(selected)}
        except (OSError,ValueError,KeyError) as exc:
            sources[provider]={'status':'failed','error':str(exc)}
            warnings.append(provider.upper()+': 일정 수집 실패 · 기존 일정 유지 ('+str(exc)+')')
        automatic.extend(e for e in saved.get(provider,[]) if date.fromisoformat(e['date'])<end)
    events=merge(authored,automatic,now)
    bundle={'checkedAt':now.isoformat(),'today':today.isoformat(),'status':'failed' if all(s['status']=='failed' for s in sources.values()) else 'partial' if warnings else 'success',
            'sources':sources,'events':events,'warnings':warnings,
            'coverage':'BEA·BLS 주요 발표 / FOMC. 한국·중국·ISM·기업실적 등 기존 수동 일정은 보존하며 자동 갱신하지 않습니다.'}
    save_json(state_path,saved)
    save_json(output/'latest.json',bundle)
    save_json(output/'runs'/(now.strftime('%Y%m%dT%H%M%S%fZ')+'.json'),bundle)
    if apply:
        script='window.MARKET_LEDGER=window.MARKET_LEDGER||{};\nwindow.MARKET_LEDGER.calendarLive='+json.dumps(bundle,ensure_ascii=False,indent=2)+';\n'
        index_path=root/'index.html';original=index_path.read_text(encoding='utf-8')
        tag='<script src="data/calendar-live.js?v='+hashlib.sha256(script.encode()).hexdigest()[:16]+'"></script>'
        if 'src="data/calendar-live.js' in original:
            updated,count=re.subn(r'<script src="data/calendar-live\.js(?:\?[^" ]*)?"></script>',tag,original)
            if count!=1:raise ValueError('Expected one calendar-live script')
        else:
            if original.count('<script src="assets/script.js')!=1:raise ValueError('Expected one renderer')
            updated=original.replace('<script src="assets/script.js',tag+'\n  <script src="assets/script.js',1)
        atomic_write(root/'data/calendar-live.js',script)
        atomic_write(index_path,updated)
    return bundle
