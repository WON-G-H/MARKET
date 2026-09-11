import importlib.util
from datetime import date, datetime, timezone
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('market_data', Path(__file__).resolve().parents[1] / 'tools/market_data.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


def feed(year, values=None):
    values = values or [('01-02', '4.10', '4.50'), ('01-05', '4.13', '4.48')]
    rows = ''.join(f'<entry><content><m:properties><d:NEW_DATE>{year}-{day}T00:00:00</d:NEW_DATE><d:BC_2YEAR>{a}</d:BC_2YEAR><d:BC_10YEAR>{b}</d:BC_10YEAR></m:properties></content></entry>' for day, a, b in values)
    return (f'<feed xmlns="http://www.w3.org/2005/Atom" xmlns:m="{m.NS["m"]}" xmlns:d="{m.NS["d"]}">{rows}</feed>').encode()


class CollectorTests(unittest.TestCase):
    def test_sort_duplicate_cutoff_and_bad_input(self):
        values = [('01-05', '4.13', '4.48'), ('01-02', '4.10', '4.50'), ('01-02', '4.10', '4.50')]
        rows = m.parse_feed(feed(2026, values), date(2026, 1, 4))
        self.assertEqual(list(rows), ['2026-01-02'])
        for raw in [b'<html/>', feed(2026, [('01-02', 'NaN', '4')]),
                    feed(2026, [('01-02', '4', '4'), ('01-02', '5', '4')])]:
            with self.assertRaises(ValueError):
                m.parse_feed(raw, date(2026, 9, 11))

    def test_idempotency_revision_and_missing_preservation(self):
        state = {'observations': {}, 'revisions': []}
        rows = m.parse_feed(feed(2026), date(2026, 9, 11))
        initial = m.merge(state, rows, 'first', 'hash1')
        self.assertEqual(initial, m.merge(initial, rows, 'second', 'hash2'))
        rows['2026-01-05']['us_treasury_2y'] = 4.20
        rows['2026-01-05']['us_treasury_10y'] = None
        revised = m.merge(initial, rows, 'third', 'hash3')
        self.assertEqual(len(revised['revisions']), 1)
        self.assertEqual(revised['observations']['2026-01-05/us_treasury_10y']['value'], 4.48)

    def test_arithmetic_and_observation_dates(self):
        state = m.merge({'observations': {}, 'revisions': []},
                        m.parse_feed(feed(2026), date(2026, 9, 11)), 'now', 'hash')
        bundle = m.make_bundle(state, date(2026, 9, 11), {'status': 'success'})
        self.assertEqual(bundle['metrics'][0]['changeBp'], 3)
        self.assertEqual(bundle['metrics'][1]['changeBp'], -2)
        self.assertEqual(bundle['spread10yMinus2yBp'], 35)
        self.assertEqual(bundle['metrics'][0]['freshness'], 'older_than_4_days')

    def test_failed_partial_fetch_rolls_back_and_flags_bundle(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            fetch = lambda url: feed(int(url.rsplit('=', 1)[1]))
            m.run(out, date(2026, 9, 11), fetch)
            before = (out / 'history.json').read_bytes()
            m.run(out, date(2026, 9, 11), fetch)
            self.assertEqual(before, (out / 'history.json').read_bytes())
            def broken(url):
                if url.endswith('2026'):
                    raise OSError('network unavailable')
                return feed(2025, [('01-02', '9', '9')])
            result = m.run(out, date(2026, 9, 11), broken)
            self.assertEqual(before, (out / 'history.json').read_bytes())
            self.assertEqual(result['collection']['status'], 'failed')
            self.assertTrue(result['collection']['usingPreviouslyStoredValues'])
            self.assertFalse((out / '.lock').exists())

    def test_first_failure_and_lock(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp)
            def broken(url):
                raise OSError('offline')
            result = m.run(out, date(2026, 9, 11), broken)
            self.assertIsNone(result['metrics'][0]['current'])
            self.assertFalse((out / 'history.json').exists())
            (out / '.lock').touch()
            with self.assertRaises(FileExistsError):
                m.run(out, date(2026, 9, 11), broken)


if __name__ == '__main__':
    unittest.main()
