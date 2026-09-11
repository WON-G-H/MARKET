import copy
from datetime import date
import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
import shutil
import subprocess
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))
import research_result as r


class ResultTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / 'data/daily').mkdir(parents=True)
        (self.root / 'research-context').mkdir()
        self.index = self.root / 'index.html'
        self.index.write_text('<script src="assets/script.js?v=test"></script>\n', encoding='utf-8')

    def payload(self, day='2026-10-01'):
        context = {'task': {'mode': 'daily', 'end': day}, 'warnings': ['test incomplete source'], 'omitted': []}
        file = self.root / 'research-context' / (day + '.json')
        file.write_text(json.dumps(context), encoding='utf-8')
        return {'schemaVersion': 1, 'module': 'daily', 'date': day,
                'context': {'file': file.name, 'sha256': hashlib.sha256(file.read_bytes()).hexdigest()},
                'report': {'date': day, 'title': '시험 보고서', 'tags': ['시험'], 'lead': ['근거·반례는 시험 데이터'],
                           'report': [{'no': f'{n:02}', 'title': f'제목 {n}', 'paragraphs': ['실제 시장 보고서가 아님']} for n in range(2, 8)], 'watch': ['시험 조건']},
                'addendum': {'changes': {'maintained': [], 'new': ['시험 변화']}, 'assessment': ['시험 판단'], 'implications': ['시험 함의'], 'conclusion': '시험 결론'},
                'researchAudit': {'sources': [{'reference': 'test fixture', 'verification': 'unverified', 'note': '합성 데이터'}],
                                  'unverified': ['검증하지 않음'], 'counterEvidence': ['시험 반례'], 'timingNotes': ['시험 시각']}, 'revisionNote': ''}

    def test_new_month_validation_apply_and_retry(self):
        payload = self.payload()
        before = self.index.read_bytes()
        planned = r.plan(payload, self.root)
        self.assertEqual(planned['action'], 'create')
        self.assertEqual(before, self.index.read_bytes())
        self.assertFalse(planned['target'].exists())
        applied = r.apply(payload, self.root)
        self.assertIn('data/daily/daily-2026-10.js?v=', self.index.read_text())
        source = applied['target'].read_bytes()
        self.assertEqual(r.plan(payload, self.root)['action'], 'unchanged')
        r.apply(payload, self.root)
        self.assertEqual(source, applied['target'].read_bytes())
        self.assertEqual(len(list((self.root / 'research-results/receipts').iterdir())), 1)

    def test_sort_preserve_and_escape(self):
        later = self.payload('2026-10-03')
        r.apply(later, self.root)
        before = r.plan(later, self.root)['recordHash']
        earlier = self.payload('2026-10-01')
        earlier['report']['lead'] = ['<script>alert(1)</script> & <img src=x onerror=bad()>']
        outcome = r.apply(earlier, self.root)
        source = outcome['target'].read_text(encoding='utf-8')
        records = r.literal_span(source, 'window.MARKET_LEDGER.daily["2026-10"]=')[2]
        self.assertEqual([x['date'] for x in records], ['2026-10-01', '2026-10-03'])
        self.assertIn('&lt;script&gt;', records[0]['lead'][0])
        self.assertNotIn('<script>', records[0]['lead'][0])
        self.assertEqual(before, r.plan(later, self.root)['recordHash'])

    def test_existing_revision_needs_authorization_reason_and_hash(self):
        payload = self.payload()
        first = r.apply(payload, self.root)
        original = first['target'].read_bytes()
        payload['report']['title'] = '수정 제목'
        checked = r.plan(payload, self.root)
        self.assertEqual(checked['action'], 'revise')
        for allowed, oldhash in [(False, checked['recordHash']), (True, 'wrong'), (True, checked['recordHash'])]:
            with self.assertRaises(ValueError):
                r.apply(payload, self.root, allowed, oldhash)
        self.assertEqual(original, first['target'].read_bytes())
        payload['revisionNote'] = '사용자가 요청한 시험 수정'
        applied = r.apply(payload, self.root, True, checked['recordHash'])
        self.assertEqual(applied['action'], 'revise')
        self.assertTrue((Path(applied['receipt']).parent / 'daily-before.js').exists())

    def test_stale_context_wrong_dates_bad_schema_no_writes(self):
        original = self.index.read_bytes()
        for kind in ('context', 'date', 'section', 'audit', 'path'):
            p = self.payload()
            if kind == 'context': p['context']['sha256'] = 'changed'
            elif kind == 'date': p['report']['date'] = '2026-10-02'
            elif kind == 'section': p['report']['report'].pop()
            elif kind == 'audit': p['researchAudit']['sources'] = []
            else: p['context']['file'] = '../index.html'
            with self.assertRaises(ValueError): r.apply(p, self.root)
        self.assertEqual(original, self.index.read_bytes())
        self.assertEqual(list((self.root / 'data/daily').iterdir()), [])

    def test_index_write_failure_rolls_back_new_month(self):
        p = self.payload()
        original = self.index.read_bytes()
        write = r.atomic_write
        def fail_index(path, content):
            if path == self.index and 'data/daily/' in content:
                raise OSError('simulated write failure')
            return write(path, content)
        with patch.object(r, 'atomic_write', fail_index):
            with self.assertRaises(OSError): r.apply(p, self.root)
        self.assertEqual(original, self.index.read_bytes())
        self.assertFalse((self.root / 'data/daily/daily-2026-10.js').exists())
        self.assertFalse((self.root / 'research-results/.write.lock').exists())

    def test_real_archive_compatibility_without_touching_live_data(self):
        path = self.root / 'data/daily/daily-2026-09.js'
        path.write_bytes((ROOT / 'data/daily/daily-2026-09.js').read_bytes())
        self.index.write_bytes((ROOT / 'index.html').read_bytes())
        source = path.read_text(encoding='utf-8')
        old_records = r.literal_span(source, 'window.MARKET_LEDGER.daily["2026-09"]=')[2]
        old_addenda = r.literal_span(source, 'Object.assign(window.MARKET_LEDGER.dailyAddenda,')[2]
        r.apply(self.payload('2026-09-11'), self.root)
        updated = path.read_text(encoding='utf-8')
        records = r.literal_span(updated, 'window.MARKET_LEDGER.daily["2026-09"]=')[2]
        addenda = r.literal_span(updated, 'Object.assign(window.MARKET_LEDGER.dailyAddenda,')[2]
        self.assertEqual(records[:-1], old_records)
        self.assertEqual({k:v for k,v in addenda.items() if k != '2026-09-11'}, old_addenda)

    def test_duplicate_json_keys_rejected(self):
        path = self.root / 'bad.json'
        path.write_text('{"date":"one","date":"two"}', encoding='utf-8')
        with self.assertRaises(ValueError): r.read_json(path)

    def test_written_daily_renders_in_existing_site(self):
        node = shutil.which('node') or str(Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe')
        if not Path(node).is_file(): self.skipTest('Node runtime unavailable')
        self.index.write_bytes((ROOT / 'index.html').read_bytes())
        payload = self.payload('2026-10-01')
        payload['report']['lead'] = ['<img src=x onerror=bad()>']
        r.apply(payload, self.root)
        script = r'''
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const [root,tmp]=process.argv.slice(1),nodes={};
const el=()=>({innerHTML:'',dataset:{},classList:{toggle(){},add(){},remove(){},contains(){return false}},querySelectorAll(){return []},addEventListener(){}});
const ctx={window:{scrollTo(){},addEventListener(){}},document:{body:el(),getElementById(id){return nodes[id]??=el()},querySelectorAll(){return []}},localStorage:{getItem(){return null}},location:{hash:'#daily'}};
vm.createContext(ctx);
const html=fs.readFileSync(path.join(tmp,'index.html'),'utf8');
for(const match of html.matchAll(/<script src="([^"?]+)/g)){
 const file=match[1];
 let code=fs.readFileSync(path.join(file==='data/daily/daily-2026-10.js'?tmp:root,file),'utf8');
 if(file==='assets/script.js')code=code.replace('window.addEventListener(\'hashchange\',route);','window.testDaily=dailyDetail;window.addEventListener(\'hashchange\',route);');
 vm.runInContext(code,ctx);
}
assert(nodes.content.innerHTML.includes('2026-10-01'));
const detail=ctx.window.testDaily('2026-10-01');
assert(detail.includes('&lt;img src=x onerror=bad()&gt;'));
assert(!detail.includes('<img src=x'));
assert(detail.includes('시험 결론'));
assert(detail.includes('시장 전달경로')||detail.includes('제목 7'));
'''
        subprocess.run([node, '-e', script, str(ROOT), str(self.root)], check=True, capture_output=True, text=True)


if __name__ == '__main__': unittest.main()
