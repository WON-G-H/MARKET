from datetime import date, datetime, timezone
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
import expanded_data as e
import collect_all


class ExpandedTests(unittest.TestCase):
    def setUp(self):
        self.cutoff=date(2026,9,12)
        self.now=datetime(2026,9,12,10,tzinfo=timezone.utc)
        self.specs=e.definitions(self.cutoff)

    def test_fred_missing_zero_duplicate_and_wrong_series(self):
        spec=self.specs['rrpontsyd']
        points,_=e.fred_points('observation_date,RRPONTSYD\n2026-09-10,0\n2026-09-11,.\n2026-09-13,5\n',spec,self.cutoff)
        self.assertEqual(points,{'2026-09-10':0,'2026-09-11':None})
        for text in ['observation_date,WRONG\n2026-09-10,1\n',
                     'observation_date,RRPONTSYD\n2026-09-10,NaN\n',
                     'observation_date,RRPONTSYD\n2026-09-10,1\n2026-09-10,2\n']:
            with self.assertRaises(ValueError):e.fred_points(text,spec,self.cutoff)

    def test_annual_period_country_and_null(self):
        spec=self.specs['kr_gdp_growth_annual']
        row=lambda year,value:dict(countryiso3code='KOR',indicator={'id':spec['code']},date=year,value=value)
        raw=[{'lastupdated':'2026-07-13'},[row('2026',2),row('2025',None),row('2024',-0.5)]]
        points,meta=e.worldbank_points(json.dumps(raw),spec,self.cutoff)
        self.assertEqual(points,{'2025':None,'2024':-0.5})
        self.assertEqual(meta['datasetUpdatedAt'],'2026-07-13')
        raw[1][-1]['countryiso3code']='USA'
        with self.assertRaises(ValueError):e.worldbank_points(json.dumps(raw),spec,self.cutoff)

    def test_period_end_and_frequency_aware_freshness(self):
        self.assertEqual(e.period_end('2024-02-01','monthly'),date(2024,2,29))
        self.assertEqual(e.period_end('2025','annual'),date(2025,12,31))
        row={'series':'m2sl','period':'2026-07-01','value':100,'unit':'십억 USD','frequency':'monthly'}
        metric=e.summarize('m2sl',self.specs['m2sl'],{'a':row},'success',self.cutoff)
        self.assertIsNone(metric['warning'])
        self.assertEqual(metric['ageDaysAfterPeriodEnd'],43)
        self.assertIsNone(metric['publishedAt'])

    def test_persistence_revision_failure_and_no_zero_fill(self):
        spec={'walcl':self.specs['walcl']}
        def collect(path,text):
            def fetch(url):
                if text is None:raise OSError('fixture offline')
                return text.encode()
            with patch.object(e,'definitions',return_value=spec):return e.collect(path,self.now,fetch)
        with tempfile.TemporaryDirectory() as tmp:
            path=Path(tmp)
            text='observation_date,WALCL\n2026-09-02,100\n2026-09-09,101\n'
            first=collect(path,text)
            before=(path/'history.json').read_bytes()
            collect(path,text)
            self.assertEqual(before,(path/'history.json').read_bytes())
            failed=collect(path,None)
            self.assertEqual(failed['metrics']['walcl']['current'],first['metrics']['walcl']['current'])
            self.assertTrue(failed['metrics']['walcl']['usingStoredValue'])
            self.assertEqual(before,(path/'history.json').read_bytes())
            collect(path,text.replace('101','102'))
            state=json.loads((path/'history.json').read_text())
            self.assertEqual(len(state['revisions']),1)
            missing=collect(path,text.replace('101','.'))
            self.assertEqual(missing['metrics']['walcl']['current']['value'],102)
            self.assertTrue(missing['metrics']['walcl']['latestResponseMissing'])
            regressed=collect(path,'observation_date,WALCL\n2026-09-02,100\n')
            self.assertTrue(regressed['metrics']['walcl']['latestResponseRegressed'])
            self.assertFalse((path/'.lock').exists())

    def test_shared_flow_request_and_column_order(self):
        specs={key:value for key,value in self.specs.items() if key.startswith('kosdaq_')}
        text='<table><tr><th>날짜</th><th>개인</th><th>외국인</th><th>기관계</th></tr><tr><td>26.09.11</td><td>10</td><td>-3</td><td>-7</td></tr></table>'
        calls=[]
        def fetch(url):calls.append(url);return text.encode('cp949')
        with tempfile.TemporaryDirectory() as tmp,patch.object(e,'definitions',return_value=specs):
            result=e.collect(Path(tmp),self.now,fetch)
            self.assertEqual(len(calls),1)
            self.assertEqual(result['metrics']['kosdaq_foreign_net']['current']['value'],-3)
            text=text.replace('<th>개인</th><th>외국인</th>','<th>외국인</th><th>개인</th>')
            result=e.collect(Path(tmp),self.now,fetch)
            self.assertEqual(result['status'],'failed')
            self.assertEqual(result['metrics']['kosdaq_foreign_net']['current']['value'],-3)

    def test_coordinator_includes_expanded_status(self):
        with tempfile.TemporaryDirectory() as tmp,patch.object(collect_all,'ROOT',Path(tmp)),\
             patch.object(sys,'argv',['collect_all.py','--update-dashboard']),\
             patch.object(collect_all,'run',return_value={'collection':{'status':'success'}}),\
             patch.object(collect_all.core_metrics,'collect',return_value={'status':'success','cards':{},'errors':{}}),\
             patch.object(collect_all.expanded_data,'collect',return_value={'status':'partial','metrics':{'x':{}},'warnings':['fixture failed']}),\
             patch('site_market_data.publish',return_value={'file':'data/market-live.js'}),\
             patch('calendar_data.collect',return_value={'status':'success','events':[],'warnings':[]}),\
             patch.object(collect_all,'apply_dashboard',return_value={'status':'success','warnings':[]}) as apply:
            self.assertEqual(collect_all.main(),2)
            self.assertEqual(apply.call_count,1)
            saved=json.loads((Path(tmp)/'market-data/collection-status.json').read_text())
            self.assertEqual(saved['expandedData']['warnings'],['fixture failed'])
            self.assertEqual(saved['status'],'partial')


if __name__=='__main__':unittest.main()
