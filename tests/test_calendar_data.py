from datetime import datetime,timezone
import json
from pathlib import Path
import sys
import tempfile
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
import calendar_data as c

def ics(uid='one',stamp='20260930T123000Z',title='Personal Income and Outlays'):
    return f'BEGIN:VCALENDAR\nBEGIN:VEVENT\nUID:{uid}\nSUMMARY:{title}\nDTSTART:{stamp}\nEND:VEVENT\nEND:VCALENDAR'

class CalendarTests(unittest.TestCase):
    def test_kst_dst_and_folded_titles(self):
        summer=c.parse_ics(ics(title='Personal Income and \n Outlays'),'bea')[0]
        winter=c.parse_ics(ics(stamp='20261125T133000Z'),'bea')[0]
        self.assertEqual(summer['kst'],'2026-09-30 21:30')
        self.assertEqual(winter['kst'],'2026-11-25 22:30')
        self.assertEqual(c.parse_ics(ics(stamp='20260930T230000Z'),'bea')[0]['date'],'2026-10-01')
        with self.assertRaises(ValueError):c.parse_ics(ics(stamp='20260930T123000'),'bea')
        self.assertEqual(c.parse_ics(ics(title='GDP (Third Estimate)'),'bea')[0]['family'],'gdp')

    def test_preserve_actuals_no_assumed_release_and_deduplicate(self):
        auto=c.parse_ics(ics(),'bea')
        old=dict(auto[0],id='us-pce-2026-09-30',actual='AI actual',why='AI reasoning',status='발표 완료',importance=3)
        result=c.merge([old],auto,datetime(2026,10,1,tzinfo=timezone.utc))
        self.assertEqual(len(result),1)
        self.assertEqual(result[0]['actual'],'AI actual')
        self.assertEqual(result[0]['why'],'AI reasoning')
        self.assertEqual(result[0]['importance'],3)
        self.assertEqual(result[0]['status'],'발표 완료')
        new=c.merge([],auto,datetime(2026,10,1,tzinfo=timezone.utc))[0]
        self.assertIn('발표 여부 확인 필요',new['status'])
        self.assertEqual(new['actual'],'확인 필요')

    def test_compound_event_preserves_research(self):
        auto=c.parse_ics(ics(),'bea')+c.parse_ics(ics(uid='two',title='GDP (Third Estimate)'),'bea')
        old=dict(auto[0],id='us-pce-gdp-2026-09-30',why='combined thesis')
        result=c.merge([old],auto,datetime(2026,9,12,tzinfo=timezone.utc))
        self.assertEqual(len(result),1)
        self.assertEqual(len(result[0]['scheduleComponents']),2)
        self.assertEqual(result[0]['why'],'combined thesis')

    def test_failed_source_keeps_saved_schedule_and_original_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'data/calendar').mkdir(parents=True)
            path=root/'data/calendar/calendar-2026-09.js'
            text='window.MARKET_LEDGER.calendar["2026-09"]=[];'
            path.write_text(text,encoding='utf-8')
            (root/'index.html').write_text('<script src="assets/script.js"></script>',encoding='utf-8')
            def fetch(url):
                if url==c.SOURCES['bea']:return ics().encode()
                raise OSError('fixture inaccessible')
            now=datetime(2026,9,12,tzinfo=timezone.utc)
            first=c.collect(root,now,fetch,True)
            self.assertEqual(first['status'],'partial')
            def fail(url):raise OSError('offline')
            second=c.collect(root,now,fail,True)
            self.assertEqual(first['events'],second['events'])
            self.assertEqual(path.read_text(encoding='utf-8'),text)
            self.assertEqual((root/'index.html').read_text().count('data/calendar-live.js'),1)

if __name__=='__main__':unittest.main()
