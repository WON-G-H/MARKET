"""Apply only Treasury numeric cards and collection status to the existing Dashboard."""
from datetime import date, datetime
from decimal import Decimal
import hashlib
import json
import os
import re

from market_data import SOURCE, atomic_write, bp

LABELS = {'us_treasury_10y': '미국 10년물', 'us_treasury_2y': '미국 2년물'}
ASSIGNMENT = 'window.MARKET_LEDGER.core='


def load_core(text):
    prefix, body = text.split(ASSIGNMENT, 1)
    result, end = json.JSONDecoder().raw_decode(body)
    if body[end:].strip() != ';':
        raise ValueError('core.js must contain one JSON assignment')
    return result


def replace_field(text, key, value):
    matches = list(re.finditer(r'"' + re.escape(key) + r'"\s*:\s*', text))
    if len(matches) != 1:
        raise ValueError('Expected one field: ' + key)
    start = matches[0].end()
    _, end = json.JSONDecoder().raw_decode(text[start:])
    return text[:start] + json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + text[start + end:]


def point_value(point, series, cutoff):
    if point['series'] != series or point['unit'] != 'percent' or point['sourceUrl'] != SOURCE:
        raise ValueError('Unexpected Treasury series/unit/source')
    day = date.fromisoformat(point['observationDate'])
    if day > cutoff:
        raise ValueError('Observation after cutoff')
    value = point['value']
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError('Expected numeric yield')
    number = Decimal(str(value))
    if not number.is_finite() or not -10 <= number <= 100:
        raise ValueError('Invalid yield')
    return value


def numeric_card(item, cutoff):
    series = item['series']
    current, previous = item['current'], item['previous']
    value = point_value(current, series, cutoff)
    old = point_value(previous, series, cutoff) if previous else None
    if previous and previous['observationDate'] >= current['observationDate']:
        raise ValueError('Previous observation must precede current')
    change = bp(value, old) if old is not None else None
    return {
        'id': series, 'label': LABELS[series], 'current': f'{value:.2f}%',
        'previous': f'{old:.2f}%' if old is not None else '',
        'previousLabel': '이전 관측',
        'previousAsOf': previous['observationDate'] if previous else None,
        'change': f'{change:+g} bp' if change is not None else '이전 관측값 없음',
        'changePct': '', 'unit': '공식 일별 CMT · %',
        'asOf': current['observationDate'] + ' 미국 관측',
        'observationDate': current['observationDate'],
        'source': '미국 재무부', 'sourceUrl': SOURCE,
        'direction': 'flat' if not change else 'up' if change > 0 else 'down',
        'numericCurrent': value, 'numericPrevious': old,
        'managedBy': 'treasury-collector',
        'verified': False,
        'verificationNote': '공식 원출처 수집·숫자 형식 검증 완료. 독립 교차검증은 수행하지 않음.'}


def apply_dashboard(bundle, root, indicators=None):
    """No AI text edits. Preserve old cards on failed/missing/regressing observations."""
    lock = root / 'market-data' / '.dashboard.lock'
    lock.parent.mkdir(parents=True, exist_ok=True)
    fd = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    os.close(fd)
    try:
        core_path, index_path = root / 'data/core.js', root / 'index.html'
        original = core_path.read_text(encoding='utf-8')
        core = load_core(original)
        cutoff = date.fromisoformat(bundle['observationCutoff'])
        status = bundle['collection']['status']
        if bundle.get('schemaVersion') != 1 or status not in ('success', 'failed'):
            raise ValueError('Unsupported collection bundle')
        checked = datetime.fromisoformat(bundle['collection']['checkedAt'])
        if checked.tzinfo is None:
            raise ValueError('Collection time requires a timezone')
        old_status = core.get('marketDataStatus', {})
        if old_status.get('checkedAt') and checked < datetime.fromisoformat(old_status['checkedAt']):
            raise ValueError('Refusing an older collection result')
        cards = core['dashboard']['primaryMetrics']
        new_cards = list(cards)
        incoming = {item['series']: item for item in bundle['metrics']}
        if len(incoming) != len(bundle['metrics']) or set(incoming) != set(LABELS):
            raise ValueError('Expected exactly the two supported Treasury series')
        warnings = []
        for series, label in LABELS.items():
            item = incoming[series]
            positions = [i for i, card in enumerate(new_cards) if card.get('id') == series or card['label'] == label]
            if len(positions) > 1:
                raise ValueError('Duplicate Dashboard metric: ' + label)
            old_card = new_cards[positions[0]] if positions else None
            if status == 'failed':
                continue
            if not item['current'] or item.get('latestResponseMissing'):
                warnings.append(label + ': 최신 응답 결측 · 기존값 유지')
                continue
            card = numeric_card(item, cutoff)
            if old_card and old_card.get('observationDate', '') > card['observationDate']:
                warnings.append(label + ': 과거 관측값 수신 · 기존값 유지')
                continue
            if positions:
                new_cards[positions[0]] = card
            else:
                anchor = next((i for i, c in enumerate(new_cards) if c['label'] == '미국 10년물'), len(new_cards)-1)
                new_cards.insert(anchor + 1, card)
        if indicators is not None:
            from core_metrics import LABELS as EXTRA_LABELS
            if set(indicators['cards']) | set(indicators['errors']) != set(EXTRA_LABELS):
                raise ValueError('Expected status for every core metric')
            for series, label in EXTRA_LABELS.items():
                positions = [i for i, c in enumerate(new_cards) if c.get('id') == series or
                             c['label'] == label or (series == 'wti' and c['label'].startswith('WTI '))]
                if len(positions) != 1:
                    raise ValueError('Expected exactly one Dashboard card: ' + label)
                position = positions[0]
                old_card = new_cards[position]
                card = indicators['cards'].get(series)
                reason = indicators['errors'].get(series)
                if card and not reason:
                    observed = date.fromisoformat(card['observationDate'])
                    old_day = old_card.get('observationDate') or old_card.get('asOf', '')[:10]
                    if observed > cutoff or (re.fullmatch(r'\d{4}-\d{2}-\d{2}', old_day) and old_day > observed.isoformat()):
                        reason = '과거/미래 관측값 수신 · 기존값 유지'
                    elif card['id'] != series or card['label'] != label or not Decimal(str(card['numericCurrent'])).is_finite():
                        raise ValueError('Invalid core metric card')
                if reason:
                    warnings.append(label + ': ' + reason)
                    new_cards[position] = dict(old_card, collectionState='failed', collectionNote='갱신 보류 · 기존값 유지')
                else:
                    new_cards[position] = card
                    if card.get('collectionState') == 'stale':
                        warnings.append(label + ': ' + card['collectionNote'])
            for i, card in enumerate(new_cards):
                if card.get('managedBy') == 'treasury-collector':
                    withheld = status == 'failed' or any(w.startswith(card['label'] + ':') for w in warnings)
                    stale = (cutoff - date.fromisoformat(card['observationDate'])).days > 7
                    new_cards[i] = dict(card, collectionState='failed' if withheld else 'stale' if stale else 'success',
                                       collectionNote='갱신 보류 · 기존값 유지' if withheld else
                                       '관측일 7일 초과 · 최신 공표 여부 확인 필요' if stale else '자동 수집')
                    if stale:
                        warnings.append(card['label'] + ': 관측일 7일 초과')
            if status == 'failed':
                warnings.append('미국 금리: 수집 실패 · 기존값 유지')
            status = 'partial' if warnings else 'success'
        observation_dates = {c['id']: c['observationDate'] for c in new_cards if c.get('managedBy') in ('treasury-collector', 'core-metrics-collector')}
        meta = {'status': status, 'checkedAt': checked.isoformat(),
                'observationDates': observation_dates, 'warnings': warnings}
        if indicators is not None:
            meta['scope'] = 'core-metrics'
        updated = replace_field(original, 'primaryMetrics', new_cards) if new_cards != cards else original
        if 'marketDataStatus' in core:
            updated = replace_field(updated, 'marketDataStatus', meta)
        else:
            updated = updated.replace(ASSIGNMENT + '{', ASSIGNMENT + '{\n  "marketDataStatus": ' +
                                      json.dumps(meta, ensure_ascii=False, indent=2) + ',', 1)
        # Validate full JSON before touching either file.
        parsed = load_core(updated)
        expected_dashboard = dict(core['dashboard'], primaryMetrics=new_cards)
        if parsed['dashboard'] != expected_dashboard:
            raise ValueError('Unexpected Dashboard mutation')
        index = index_path.read_text(encoding='utf-8')
        version = hashlib.sha256(updated.encode('utf-8')).hexdigest()[:16]
        updated_index, count = re.subn(r'(?<=src=")data/core\.js(?:\?[^"\s]*)?(?=")',
                                      'data/core.js?v=' + version, index)
        if count != 1:
            raise ValueError('Expected exactly one core.js script in index.html')
        if core_path.read_text(encoding='utf-8') != original:
            raise ValueError('core.js changed during update; retry')
        if updated != original:
            backup = hashlib.sha256(original.encode('utf-8')).hexdigest()
            atomic_write(root / 'market-data/dashboard-backups' / (backup + '.js'), original)
        atomic_write(core_path, updated)
        atomic_write(index_path, updated_index)
        return meta
    finally:
        lock.unlink()
