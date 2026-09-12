"""Publish one numeric snapshot for Macro and Korea; preserve authored research modules."""
import hashlib
import json
import re

from dashboard_data import load_core
from market_data import atomic_write


def publish(root, expanded, checked_at):
    core_path = root/'data/core.js'
    core_text = core_path.read_text(encoding='utf-8')
    core = load_core(core_text)
    cards = {}
    for card in core['dashboard']['primaryMetrics']:
        if card.get('managedBy') not in ('treasury-collector','core-metrics-collector'):
            continue
        cards[card['id']] = {k:card.get(k) for k in ('id','label','current','previous','previousAsOf',
            'change','changePct','unit','observationDate','source','sourceUrl','collectionState','collectionNote')}
    extra = {}
    for key, metric in expanded['metrics'].items():
        point = metric['current']
        extra[key] = {'id':key,'label':metric['label'],'current':f"{point['value']:,.4f}".rstrip('0').rstrip('.') if point else '',
            'previous': str(metric['previous']['value']) if metric['previous'] else '',
            'previousAsOf':metric['previous']['period'] if metric['previous'] else None,
            'change':f"{metric['change']:+,.4f}".rstrip('0').rstrip('.') if metric['change'] is not None else '',
            'unit':metric['unit'],'observationDate':point['period'] if point else None,
            'source':metric.get('seasonalAdjustment') or metric['frequency'],
            'sourceUrl':metric['sourceUrl'],'frequency':metric['frequency'],
            'collectionState':'failed' if metric['collectionStatus']=='failed' else 'stale' if metric['warning'] else 'success',
            'collectionNote':metric['warning'] or '자동 수집'}
    result={'checkedAt':checked_at,'cards':dict(cards,**extra),
            'warnings':core.get('marketDataStatus',{}).get('warnings',[])+expanded['warnings']}
    text='window.MARKET_LEDGER=window.MARKET_LEDGER||{};\nwindow.MARKET_LEDGER.marketLive='+json.dumps(result,ensure_ascii=False,indent=2,allow_nan=False)+';\n'
    target=root/'data/market-live.js'
    index_path=root/'index.html'
    original=index_path.read_text(encoding='utf-8')
    version=hashlib.sha256(text.encode()).hexdigest()[:16]
    tag='<script src="data/market-live.js?v='+version+'"></script>'
    if 'src="data/market-live.js' in original:
        updated,count=re.subn(r'<script src="data/market-live\.js(?:\?[^" ]*)?"></script>',tag,original)
        if count!=1:raise ValueError('Expected one market-live script')
    else:
        if original.count('<script src="assets/script.js')!=1:raise ValueError('Expected one renderer')
        updated=original.replace('<script src="assets/script.js',tag+'\n  <script src="assets/script.js',1)
    if core_path.read_text(encoding='utf-8')!=core_text or index_path.read_text(encoding='utf-8')!=original:
        raise ValueError('Site changed during publish; retry')
    atomic_write(target,text)
    atomic_write(index_path,updated)
    return {'file':'data/market-live.js','seriesCount':len(result['cards'])}
