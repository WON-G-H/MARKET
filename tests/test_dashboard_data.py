import copy
from datetime import date
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
import dashboard_data as d
import market_data as m


def bundle():
    rows = {'2026-09-09': {'us_treasury_2y': 4.43, 'us_treasury_10y': 4.83},
            '2026-09-10': {'us_treasury_2y': 4.56, 'us_treasury_10y': 4.95}}
    state = m.merge({'observations': {}, 'revisions': []}, rows, '2026-09-11T10:00:00+00:00', 'fixture')
    return m.make_bundle(state, date(2026, 9, 11), {'status': 'success', 'checkedAt': '2026-09-11T10:00:00+00:00'})


class DashboardTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / 'data').mkdir()
        # Baseline intentionally includes AI text with a different intraday rate.
        self.core = {'dashboardDate': '2026-09-10', 'lastUpdatedAt': '2026-09-10 22:20 KST',
                     'dashboard': {'judgmentAsOf': '2026-09-10 22:20 KST', 'thesis': '당시 4.845% · 판단 유지',
                                   'confidence': '보통', 'regime': '경계',
                                   'primaryMetrics': [{'label': 'KOSPI', 'current': 'unchanged'},
                                                      {'label': '미국 10년물', 'current': '4.845%'}]}}
        self.path = self.root / 'data/core.js'
        self.path.write_text(d.ASSIGNMENT + json.dumps(self.core, ensure_ascii=False) + ';', encoding='utf-8')
        (self.root / 'index.html').write_text('<script src="data/core.js?v=old"></script>', encoding='utf-8')

    def read(self):
        return d.load_core(self.path.read_text(encoding='utf-8'))

    def test_apply_scope_calculation_cache_and_idempotency(self):
        b = bundle()
        d.apply_dashboard(b, self.root)
        result = self.read()
        dashboard = result['dashboard']
        self.assertEqual([x['label'] for x in dashboard['primaryMetrics']], ['KOSPI', '미국 10년물', '미국 2년물'])
        self.assertEqual(dashboard['primaryMetrics'][1]['current'], '4.95%')
        self.assertEqual(dashboard['primaryMetrics'][1]['change'], '+12 bp')
        self.assertEqual(dashboard['primaryMetrics'][2]['change'], '+13 bp')
        self.assertEqual(dashboard['primaryMetrics'][0], self.core['dashboard']['primaryMetrics'][0])
        for key in ('thesis', 'confidence', 'regime', 'judgmentAsOf'):
            self.assertEqual(dashboard[key], self.core['dashboard'][key])
        self.assertEqual(result['dashboardDate'], self.core['dashboardDate'])
        self.assertEqual(result['lastUpdatedAt'], self.core['lastUpdatedAt'])
        before = self.path.read_bytes()
        index = (self.root / 'index.html').read_bytes()
        self.assertNotIn(b'?v=old', index)
        d.apply_dashboard(b, self.root)
        self.assertEqual(before, self.path.read_bytes())
        self.assertEqual(index, (self.root / 'index.html').read_bytes())
        self.assertEqual(len(list((self.root / 'market-data/dashboard-backups').glob('*.js'))), 1)

    def test_failure_missing_and_regression_preserve_cards(self):
        b = bundle()
        d.apply_dashboard(b, self.root)
        cards = self.read()['dashboard']['primaryMetrics']
        b['collection']['status'] = 'failed'
        b['metrics'][0]['current']['value'] = 99
        d.apply_dashboard(b, self.root)
        self.assertEqual(self.read()['dashboard']['primaryMetrics'], cards)
        self.assertEqual(self.read()['marketDataStatus']['status'], 'failed')
        b = bundle()
        b['metrics'][0]['latestResponseMissing'] = True
        b['metrics'][1]['current']['observationDate'] = '2026-09-08'
        b['metrics'][1]['previous'] = None
        d.apply_dashboard(b, self.root)
        self.assertEqual(self.read()['dashboard']['primaryMetrics'], cards)
        self.assertEqual(len(self.read()['marketDataStatus']['warnings']), 2)

    def test_invalid_data_and_stale_run_do_not_write(self):
        d.apply_dashboard(bundle(), self.root)
        before = self.path.read_bytes()
        for mutation in ('unit', 'date', 'duplicate', 'older'):
            b = bundle()
            if mutation == 'unit':
                b['metrics'][0]['current']['unit'] = 'bp'
            elif mutation == 'date':
                b['metrics'][0]['current']['observationDate'] = '2027-01-01'
            elif mutation == 'duplicate':
                b['metrics'].append(copy.deepcopy(b['metrics'][0]))
            else:
                b['collection']['checkedAt'] = '2026-09-10T10:00:00+00:00'
            with self.assertRaises(ValueError):
                d.apply_dashboard(b, self.root)
            self.assertEqual(before, self.path.read_bytes())


if __name__ == '__main__':
    unittest.main()
