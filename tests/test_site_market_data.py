import json
from pathlib import Path
import sys
import tempfile
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
from dashboard_data import ASSIGNMENT
from site_market_data import publish

class SiteSnapshotTests(unittest.TestCase):
    def test_shared_snapshot_preserves_research_and_updates_cache(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'data').mkdir()
            core={'dashboard':{'primaryMetrics':[{'id':'kospi','label':'KOSPI','current':'100',
                'observationDate':'2026-09-11','managedBy':'core-metrics-collector','collectionState':'failed'}]},
                'marketDataStatus':{'warnings':['failed fixture']}}
            (root/'data/core.js').write_text(ASSIGNMENT+json.dumps(core)+';',encoding='utf-8')
            for module in ['macro','korea']:(root/'data'/f'{module}.js').write_text('original research',encoding='utf-8')
            (root/'index.html').write_text('<script src="assets/script.js?v=old"></script>',encoding='utf-8')
            expanded={'metrics':{},'warnings':[]}
            publish(root,expanded,'2026-09-12T10:00:00+00:00')
            original=(root/'data/market-live.js').read_bytes()
            publish(root,expanded,'2026-09-12T10:00:00+00:00')
            self.assertEqual(original,(root/'data/market-live.js').read_bytes())
            index=(root/'index.html').read_text()
            self.assertEqual(index.count('data/market-live.js'),1)
            self.assertLess(index.index('data/market-live.js'),index.index('assets/script.js'))
            for module in ['macro','korea']:self.assertEqual((root/'data'/f'{module}.js').read_text(),'original research')
            self.assertIn(b'failed fixture',original)

if __name__=='__main__':unittest.main()
