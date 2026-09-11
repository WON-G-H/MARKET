from datetime import date, datetime, timedelta, timezone
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'tools'))
import core_metrics as c
import dashboard_data as d
from test_dashboard_data import bundle


def table(rows, headers=('날짜', '체결가')):
    return '<table><tr>' + ''.join('<th>' + x + '</th>' for x in headers) + '</tr>' + ''.join(
        '<tr>' + ''.join('<td>' + str(x) + '</td>' for x in row) + '</tr>' for row in rows) + '</table>'


class CoreMetricTests(unittest.TestCase):
    def test_table_dates_duplicates_and_missing(self):
        text = table([('2026.09.11', '1,100.25'), ('2026.09.10', '1,000')])
        self.assertEqual(c.daily_table(text, date(2026, 9, 10)), {'2026-09-10': 1000})
        for rows in [[('2026.09.10', '-')], [('2026.09.10', 1), ('2026.09.10', 2)], [('2026.09.10', 0)]]:
            with self.assertRaises(ValueError):
                c.daily_table(table(rows), date(2026, 9, 11))
        with self.assertRaises(ValueError):
            c.daily_table(text, date(2026, 9, 11), required=('외국인',))

    def test_disparity_uses_twenty_observations(self):
        points = {(date(2026, 8, 20) + timedelta(days=i)).isoformat(): float(i+1) for i in range(21)}
        result = list(c.disparity(points).values())
        self.assertAlmostEqual(result[-2], 20 / 10.5 * 100)
        self.assertAlmostEqual(result[-1], 21 / 11.5 * 100)
        with self.assertRaises(ValueError):
            c.disparity(dict(list(points.items())[:20]))

    def test_vix_csv_and_cutoff(self):
        self.assertEqual(c.vix_csv('DATE,CLOSE\n09/10/2026,17.84\n09/11/2026,18\n', date(2026,9,10)), {'2026-09-10':17.84})
        with self.assertRaises(ValueError):
            c.vix_csv('DATE,CLOSE\n09/10/2026,NaN\n', date(2026,9,10))

    def test_kofia_units_year_and_previous_without_invented_date(self):
        text = ''.join(f'''<dl><a>{code}</a><span>백만원</span><span class="date">12/31</span>
        <span class="num1">32,000,000</span><span class="num2b">-100,000</span></dl>'''
                       for code in ('OS0026', 'OS0021'))
        points, previous = c.kofia(text, date(2027,1,2))['credit']
        self.assertEqual(points, {'2026-12-31':32})
        self.assertEqual(previous,32.1)
        card = c.build_card('credit', points, 'KOFIA', c.KOFIA_URL, '조원',4,previous)
        self.assertIsNone(card['previousAsOf'])
        self.assertEqual(card['change'],'-0.1000')
        with self.assertRaises(ValueError):
            c.kofia(text.replace('백만원','억원'), date(2027,1,2))

    def test_independent_failures_and_history_idempotency(self):
        def fetch(url):
            if url == c.VIX_URL:
                return b'DATE,CLOSE\n09/10/2026,17.84\n09/09/2026,15\n'
            raise OSError('fixture source unavailable')
        with tempfile.TemporaryDirectory() as tmp:
            output = Path(tmp)
            now = datetime(2026,9,11,10,tzinfo=timezone.utc)
            first = c.collect(output,now,fetch)
            self.assertEqual(set(first['cards']),{'vix'})
            self.assertEqual(len(first['errors']),9)
            before = (output/'history.json').read_bytes()
            c.collect(output,now+timedelta(minutes=1),fetch)
            self.assertEqual(before,(output/'history.json').read_bytes())

    def test_apply_preserves_judgment_failed_and_regressing_values(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root/'data').mkdir()
            cards = [{'label':label,'current':'old','asOf':'2026-09-10'} for label in c.LABELS.values()]
            core = {'dashboard':{'primaryMetrics':cards,'thesis':'AI thesis','confidence':'AI score'},'lastUpdatedAt':'old'}
            path = root/'data/core.js'
            path.write_text(d.ASSIGNMENT+json.dumps(core)+';',encoding='utf-8')
            (root/'index.html').write_text('<script src="data/core.js"></script>',encoding='utf-8')
            fresh = c.build_card('kospi',{'2026-09-11':100},'source','https://example.com','index')
            extra = {'cards':{'kospi':fresh},'errors':{s:'source unavailable' for s in c.LABELS if s!='kospi'}}
            d.apply_dashboard(bundle(),root,extra)
            result = d.load_core(path.read_text(encoding='utf-8'))
            self.assertEqual(result['dashboard']['thesis'],'AI thesis')
            self.assertEqual(result['dashboard']['confidence'],'AI score')
            self.assertEqual(result['lastUpdatedAt'],'old')
            self.assertEqual(result['dashboard']['primaryMetrics'][0]['current'],'100.00')
            self.assertEqual(result['dashboard']['primaryMetrics'][1]['current'],'old')
            self.assertEqual(result['dashboard']['primaryMetrics'][1]['collectionState'],'failed')
            fresh['observationDate']='2026-09-09'
            fresh['current']='90'
            d.apply_dashboard(bundle(),root,extra)
            result=d.load_core(path.read_text(encoding='utf-8'))
            self.assertEqual(result['dashboard']['primaryMetrics'][0]['current'],'100.00')


if __name__ == '__main__':
    unittest.main()
