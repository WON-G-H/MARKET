"""Market Ledger phase 1: standard-library-only Treasury collector."""
import argparse
import copy
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
import hashlib
import json
import os
from pathlib import Path
import sys
import tempfile
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://home.treasury.gov/treasury-daily-interest-rate-xml-feed'
BASE = 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml'
NS = {'m': 'http://schemas.microsoft.com/ado/2007/08/dataservices/metadata',
      'd': 'http://schemas.microsoft.com/ado/2007/08/dataservices'}
FIELDS = {'us_treasury_2y': 'BC_2YEAR', 'us_treasury_10y': 'BC_10YEAR'}


def atomic_write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.read_text(encoding='utf-8') == content:
        return
    fd, name = tempfile.mkstemp(dir=path.parent, suffix='.tmp')
    try:
        with os.fdopen(fd, 'w', encoding='utf-8', newline='\n') as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(name, path)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def save_json(path, value):
    atomic_write(path, json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + '\n')


def parse_feed(raw, cutoff):
    root = ET.fromstring(raw)
    if root.tag != '{http://www.w3.org/2005/Atom}feed':
        raise ValueError('Expected Treasury Atom XML feed')
    rows = {}
    for prop in root.findall('.//m:properties', NS):
        text = prop.findtext('d:NEW_DATE', namespaces=NS)
        if not text:
            raise ValueError('Missing observation date')
        day = date.fromisoformat(text[:10])
        if day > cutoff:
            continue
        values = {}
        for key, field in FIELDS.items():
            node = prop.find('d:' + field, NS)
            if node is None:
                raise ValueError('Missing field: ' + field)
            value = (node.text or '').strip()
            if node.get('{' + NS['m'] + '}null') == 'true' or value in ('', 'N/A'):
                values[key] = None
            else:
                number = Decimal(value)
                if not number.is_finite() or not -10 <= number <= 100:
                    raise ValueError('Invalid yield: ' + value)
                values[key] = float(number)
        key = day.isoformat()
        if key in rows and rows[key] != values:
            raise ValueError('Conflicting duplicate date: ' + key)
        rows[key] = values
    if not rows or not any(v is not None for r in rows.values() for v in r.values()):
        raise ValueError('Feed contains no usable observations')
    return dict(sorted(rows.items()))


def merge(state, rows, fetched_at, raw_hash):
    result = copy.deepcopy(state)
    for day, values in rows.items():
        for series, value in values.items():
            key = day + '/' + series
            old = result['observations'].get(key)
            if value is None:
                continue  # Missing response must not erase a previously valid value.
            if old and old['value'] == value:
                continue
            if old:
                result['revisions'].append({'key': key, 'previous': old,
                                            'replacedAt': fetched_at})
            result['observations'][key] = {
                'series': series, 'observationDate': day, 'value': value,
                'unit': 'percent', 'fetchedAt': fetched_at, 'publishedAt': None,
                'sourceUrl': SOURCE, 'rawHash': raw_hash,
                'validation': 'numeric_and_schema_passed',
                'independentVerification': 'not_performed'}
    result['observations'] = dict(sorted(result['observations'].items()))
    return result


def bp(a, b):
    return float((Decimal(str(a)) - Decimal(str(b))) * 100)


def make_bundle(state, cutoff, status, response_rows=None):
    metrics = []
    for series in FIELDS:
        points = sorted((r for r in state['observations'].values()
                         if r['series'] == series and r['observationDate'] <= cutoff.isoformat()),
                        key=lambda r: r['observationDate'])
        current = points[-1] if points else None
        previous = points[-2] if len(points) > 1 else None
        age = (cutoff - date.fromisoformat(current['observationDate'])).days if current else None
        metrics.append({'series': series, 'current': current, 'previous': previous,
                        'changeBp': bp(current['value'], previous['value']) if previous else None,
                        'ageCalendarDays': age,
                        'freshness': 'missing' if age is None else 'older_than_4_days' if age > 4 else 'within_4_days',
                        'latestResponseMissing': bool(response_rows and response_rows[max(response_rows)][series] is None)})
    a, b = [m['current'] for m in metrics]
    spread = bp(b['value'], a['value']) if a and b and a['observationDate'] == b['observationDate'] else None
    return {'schemaVersion': 1, 'observationCutoff': cutoff.isoformat(), 'collection': status,
            'definition': 'US Treasury daily par yield curve (CMT); not an intraday traded yield.',
            'limitations': ['Observation cutoff is NOT historical information availability. Later revisions may be present.',
                            'Publication time is unavailable; do not infer same-day Korean market causation.',
                            'Freshness uses calendar days, not a US holiday calendar.',
                            'Python supplies facts and arithmetic only; AI retains interpretation and confidence judgments.'],
            'metrics': metrics, 'spread10yMinus2yBp': spread}


def run(output, cutoff, fetcher=None, now=None):
    now = now or datetime.now(timezone.utc)
    stamp = now.isoformat()
    output.mkdir(parents=True, exist_ok=True)
    # Exclusive file prevents concurrent updates. A crash may require manual lock removal.
    lock = output / '.lock'
    fd = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    os.close(fd)
    try:
        state_path = output / 'history.json'
        state = json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {
            'schemaVersion': 1, 'observations': {}, 'revisions': []}
        rows = None
        try:
            combined = {}
            hashes = []
            # Previous year supplies the preceding observation across New Year.
            for year in (cutoff.year - 1, cutoff.year):
                url = BASE + '?data=daily_treasury_yield_curve&field_tdr_date_value=' + str(year)
                if fetcher:
                    raw = fetcher(url)
                else:
                    request = urllib.request.Request(url, headers={'User-Agent': 'MarketLedger/1.0'})
                    with urllib.request.urlopen(request, timeout=25) as response:
                        raw = response.read(5_000_001)
                if len(raw) > 5_000_000:
                    raise ValueError('Feed exceeds size limit')
                parsed = parse_feed(raw, cutoff)
                if any(date.fromisoformat(d).year != year for d in parsed):
                    raise ValueError('Feed returned unexpected year')
                digest = hashlib.sha256(raw).hexdigest()
                raw_path = output / 'raw' / (digest + '.xml')
                atomic_write(raw_path, raw.decode('utf-8-sig'))
                hashes.append({'url': url, 'sha256': digest})
                combined.update(parsed)
                state = merge(state, parsed, stamp, digest)
            rows = combined
            status = {'status': 'success', 'checkedAt': stamp, 'sources': hashes}
            save_json(state_path, state)
        except (OSError, ValueError, ArithmeticError, ET.ParseError) as error:
            # Roll back in-memory partial fetches as well as preserving disk history.
            state = json.loads(state_path.read_text(encoding='utf-8')) if state_path.exists() else {
                'schemaVersion': 1, 'observations': {}, 'revisions': []}
            status = {'status': 'failed', 'checkedAt': stamp,
                      'error': str(error), 'usingPreviouslyStoredValues': bool(state['observations'])}
        bundle = make_bundle(state, cutoff, status, rows)
        save_json(output / 'latest.json', bundle)
        # Immutable run snapshots preserve what was actually available at collection time.
        name = now.strftime('%Y%m%dT%H%M%S%fZ')
        save_json(output / 'runs' / (name + '.json'), bundle)
        lines = ['# Market Ledger 시장 데이터', '', '수집 상태: ' + status['status'],
                 '관측 기준일 상한: ' + cutoff.isoformat(),
                 '공식 일별 Treasury CMT 금리 · 단위 % · 변화량 bp', '']
        for item in bundle['metrics']:
            point = item['current']
            lines.append('- ' + item['series'] + ': ' + (
                f"{point['value']}% ({point['observationDate']}), 이전 관측 대비 {item['changeBp']} bp, {item['freshness']}"
                if point else '값 없음'))
        lines += ['', '10Y−2Y: ' + str(bundle['spread10yMinus2yBp']) + ' bp',
                  '수집 실패 시 표시값은 기존 저장값입니다. 최신 수집값으로 취급하지 마세요.',
                  '관측일은 발표시각·한국시장 귀속일과 다릅니다. 과거 시점 재현 자료가 아닙니다.',
                  '출처: ' + SOURCE]
        atomic_write(output / 'latest.md', '\n'.join(lines) + '\n')
        return bundle
    finally:
        lock.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--date', type=date.fromisoformat,
                        default=datetime.now(timezone(timedelta(hours=9))).date(),
                        help='Observation date upper bound (default: today KST); not a backtest cutoff')
    parser.add_argument('--output', type=Path, default=ROOT / 'market-data')
    parser.add_argument('--update-dashboard', action='store_true',
                        help='Apply collected Treasury cards to this project Dashboard')
    args = parser.parse_args()
    if args.update_dashboard and (args.output.resolve() != ROOT / 'market-data' or
                                 args.date != datetime.now(timezone(timedelta(hours=9))).date()):
        parser.error('Dashboard updates require the default output and today KST (no backfill)')
    try:
        bundle = run(args.output.resolve(), args.date)
        if args.update_dashboard:
            from dashboard_data import apply_dashboard
            apply_dashboard(bundle, ROOT)
            print('Dashboard Treasury cards/status updated; AI judgment preserved.')
    except (OSError, ValueError) as error:
        print('ERROR: ' + str(error), file=sys.stderr)
        return 1
    print(bundle['collection']['status'] + ': ' + str(args.output / 'latest.md'))
    return 0 if bundle['collection']['status'] == 'success' else 1


if __name__ == '__main__':
    sys.exit(main())
