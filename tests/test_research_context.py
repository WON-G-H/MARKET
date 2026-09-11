from datetime import date
import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
import research_context as c


class ContextTests(unittest.TestCase):
    def test_daily_scope_and_no_research_writes(self):
        files = list((ROOT / 'data').rglob('*.js')) + list((ROOT.parent / 'research-notes').glob('*.md'))
        before = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
        result = c.build(ROOT, 'daily', date(2026, 9, 11))
        kinds = [b['kind'] for b in result['blocks']]
        self.assertIn('previous_daily', kinds)
        self.assertNotIn('selected_idea', kinds)
        previous = next(b for b in result['blocks'] if b['kind'] == 'previous_daily')
        self.assertEqual(previous['content']['report']['date'], '2026-09-10')
        self.assertIsNotNone(previous['content']['addendum'])
        self.assertTrue(any('intake 없음' in w for w in result['warnings']))
        self.assertEqual(before, {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in files})

    def test_screening_and_weekly_never_read_idea_detail(self):
        original = c.Reader.read
        def guarded(reader, path):
            self.assertNotEqual(path.name, 'ideas.js')
            return original(reader, path)
        with patch.object(c.Reader, 'read', guarded):
            screening = c.build(ROOT, 'idea', date(2026, 9, 11))
            weekly = c.build(ROOT, 'weekly', date(2026, 9, 11))
        self.assertIn('idea_screening_index', [b['kind'] for b in screening['blocks']])
        self.assertNotIn('idea_screening_index', [b['kind'] for b in weekly['blocks']])
        prior = next(b['content'] for b in weekly['blocks'] if b['kind'] == 'previous_weekly')
        self.assertNotIn('ideaUpdates', prior)
        self.assertIn('nextWeekHypotheses', prior)
        self.assertIn('changeBoard', prior)
        self.assertTrue(any(o['reason'] == 'weekly_idea_isolation' for o in weekly['omitted']))

    def test_exact_idea_retains_evidence_and_score(self):
        result = c.build(ROOT, 'idea', date(2026, 9, 10), 'diesel-inflation', ['디젤'])
        ideas = [b['content'] for b in result['blocks'] if b['kind'] == 'selected_idea']
        self.assertEqual(len(ideas), 1)
        self.assertEqual(ideas[0]['id'], 'diesel-inflation')
        reader = c.Reader(ROOT)
        source = next(i for i in reader.module('ideas')[1]['items'] if i['id'] == 'diesel-inflation')
        self.assertEqual(ideas[0], source)
        self.assertTrue(any(o['reason'] == 'no_literal_query_match' for o in result['omitted']))
        for block in result['blocks']:
            self.assertTrue(block['source']['sha256'])

    def test_budget_omissions_are_explicit_and_repeatable(self):
        a = c.build(ROOT, 'idea', date(2026, 9, 10), 'diesel-inflation', max_chars=30000)
        b = c.build(ROOT, 'idea', date(2026, 9, 10), 'diesel-inflation', max_chars=30000)
        self.assertEqual(a, b)
        self.assertLessEqual(a['stats']['contentCharacters'], 30000)
        self.assertTrue(any(o['reason'] == 'character_budget' for o in a['omitted']))
        self.assertIn('selected_idea', [block['kind'] for block in a['blocks']])
        with self.assertRaises(ValueError):
            c.build(ROOT, 'daily', date(2026, 9, 11), max_chars=1000)

    def test_future_snapshots_and_wrong_id_rejected(self):
        for key in ['unknown-id', 'diesel-inflation']:
            with self.assertRaises(ValueError):
                c.build(ROOT, 'idea', date(2026, 9, 1), key)
        with self.assertRaises(ValueError):
            c.build(ROOT, 'daily', date(2026, 9, 11), source_names=['../AGENTS.md'])
        with self.assertRaises(ValueError):
            c.build(ROOT, 'idea', date(2026, 9, 9), source_names=['intake-2026-09-10.md'])

    def test_trailing_commas_preserve_strings_and_no_js_execution(self):
        text = '{"text":"keep ,] and \\\"quote\\\"", "array":[1,],}'
        value = json.loads(c.json_literal_text(text))
        self.assertEqual(value['text'], 'keep ,] and "quote"')
        self.assertEqual(value['array'], [1])
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'test.js'
            path.write_text('window.MARKET_LEDGER.test={"x": process.exit()};', encoding='utf-8')
            with self.assertRaises(ValueError):
                c.Reader(Path(tmp)).literal(path, 'window.MARKET_LEDGER.test=')

    def test_cross_year_previous_daily_and_weekly(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / 'data/daily').mkdir(parents=True)
            (root / 'data/weekly').mkdir()
            for month, day in [('2025-12', '2025-12-31'), ('2026-01', '2026-01-02')]:
                (root / 'data/daily' / f'daily-{month}.js').write_text(
                    f'window.MARKET_LEDGER.daily["{month}"]=[{{"date":"{day}"}}];', encoding='utf-8')
            (root / 'data/weekly/weekly-2025.js').write_text(
                'window.MARKET_LEDGER.weekly["2025"]=[{"week":"2025-W52"}];', encoding='utf-8')
            reader = c.Reader(root)
            current, previous = reader.daily(date(2026, 1, 2), date(2026, 1, 2))
            self.assertEqual(previous[0], date(2025, 12, 31))
            self.assertEqual(len(current), 1)
            self.assertEqual(reader.weekly(date(2025, 12, 29))[1][1]['week'], '2025-W52')

    def test_intake_section_keeps_caveats_and_lines(self):
        text = '# Intake\nsource caveat\n## Oil\nclaim\n### Limit\nnot verified\n## Other\ntext\n'
        parts = c.sections(text)
        self.assertEqual(parts[1], (3, 6, 'Oil', '## Oil\nclaim\n### Limit\nnot verified\n'))


if __name__ == '__main__':
    unittest.main()
