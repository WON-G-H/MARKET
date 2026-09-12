"""Daily AI result contract, validation, preview and explicit application."""
import argparse
import copy
from datetime import date, datetime, timedelta, timezone
import hashlib
import html
import json
import os
from pathlib import Path
import re
import sys

from market_data import ROOT, atomic_write
from research_context import build, encoded, json_literal_text

REPORT_KEYS = {'date', 'title', 'tags', 'lead', 'report', 'watch'}
ADDENDUM_KEYS = {'changes', 'assessment', 'implications', 'conclusion'}


def digest(value):
    return hashlib.sha256(encoded(value).encode('utf-8')).hexdigest()


def no_duplicates(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError('Duplicate JSON key: ' + key)
        result[key] = value
    return result


def read_json(path):
    return json.loads(path.read_text(encoding='utf-8-sig'), object_pairs_hook=no_duplicates,
                      parse_constant=lambda x: (_ for _ in ()).throw(ValueError('Invalid number: ' + x)))


def keys(value, expected, label):
    if not isinstance(value, dict) or set(value) != expected:
        raise ValueError(label + ': expected fields ' + ', '.join(sorted(expected)))


def text(value, label):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(label + ': non-empty text required')


def texts(value, label, allow_empty=False):
    if not isinstance(value, list) or (not allow_empty and not value):
        raise ValueError(label + ': text array required')
    for item in value:
        text(item, label)


def validate(payload):
    keys(payload, {'schemaVersion', 'module', 'date', 'context', 'report', 'addendum', 'researchAudit', 'revisionNote'}, 'result')
    if payload['schemaVersion'] != 1 or payload['module'] != 'daily':
        raise ValueError('Only daily result schemaVersion 1 is supported')
    day = date.fromisoformat(payload['date'])
    if payload['date'] != day.isoformat():
        raise ValueError('Date must be YYYY-MM-DD')
    keys(payload['context'], {'file', 'sha256'}, 'context')
    for key in ('file', 'sha256'):
        text(payload['context'][key], 'context.' + key)
    keys(payload['report'], REPORT_KEYS, 'report')
    record = payload['report']
    if record['date'] != day.isoformat():
        raise ValueError('Report date does not match result date')
    text(record['title'], 'title')
    for field in ('tags', 'lead', 'watch'):
        texts(record[field], field)
    if not isinstance(record['report'], list) or len(record['report']) != 6:
        raise ValueError('Daily sections 02 through 07 are required')
    for number, section in enumerate(record['report'], 2):
        keys(section, {'no', 'title', 'paragraphs'}, 'section')
        if section['no'] != f'{number:02}':
            raise ValueError('Daily section order must be 02 through 07')
        text(section['title'], 'section.title')
        texts(section['paragraphs'], 'section.paragraphs')
    add = payload['addendum']
    keys(add, ADDENDUM_KEYS, 'addendum')
    keys(add['changes'], {'maintained', 'new'}, 'changes')
    for field in ('maintained', 'new'):
        texts(add['changes'][field], 'changes.' + field, allow_empty=True)
    for field in ('assessment', 'implications'):
        texts(add[field], field)
    text(add['conclusion'], 'conclusion')
    audit = payload['researchAudit']
    keys(audit, {'sources', 'unverified', 'counterEvidence', 'timingNotes'}, 'researchAudit')
    if not isinstance(audit['sources'], list) or not audit['sources']:
        raise ValueError('Research sources are required')
    for source in audit['sources']:
        keys(source, {'reference', 'verification', 'note'}, 'audit source')
        text(source['reference'], 'source.reference')
        text(source['note'], 'source.note')
        if source['verification'] not in ('primary_checked', 'secondary_only', 'unverified'):
            raise ValueError('Unknown verification status')
    for field in ('unverified', 'counterEvidence', 'timingNotes'):
        texts(audit[field], field)
    if not isinstance(payload['revisionNote'], str):
        raise ValueError('revisionNote must be text')
    return day


def literal_span(source, expression):
    matches = list(re.finditer(r'^\s*' + re.escape(expression) + r'\s*', source, re.M))
    if len(matches) != 1:
        raise ValueError('Unsupported monthly file structure: ' + expression)
    start = matches[0].end()
    value, size = json.JSONDecoder(object_pairs_hook=no_duplicates).raw_decode(json_literal_text(source[start:]))
    return start, start + size, value


def plain_record(value):
    # Daily renderer accepts HTML. New results are plain text and are encoded once on write.
    if isinstance(value, str):
        return html.escape(value, quote=False)
    if isinstance(value, list):
        return [plain_record(v) for v in value]
    if isinstance(value, dict):
        return {k: plain_record(v) for k, v in value.items()}
    return value


def check_context(payload, root):
    path = (root / 'research-context' / payload['context']['file']).resolve()
    if not path.is_relative_to((root / 'research-context').resolve()) or path.suffix != '.json':
        raise ValueError('Context must be a JSON file under research-context')
    raw = path.read_bytes()
    if hashlib.sha256(raw).hexdigest() != payload['context']['sha256']:
        raise ValueError('Context file changed since result was prepared')
    context = read_json(path)
    if context['task']['mode'] != 'daily' or context['task']['end'] != payload['date']:
        raise ValueError('Wrong context module or date')
    return context


def plan(payload, root):
    day = validate(payload)
    context = check_context(payload, root)
    month = day.isoformat()[:7]
    path = root / 'data/daily' / f'daily-{month}.js'
    source = path.read_bytes().decode('utf-8') if path.exists() else (
        'window.MARKET_LEDGER=window.MARKET_LEDGER||{};\n'
        'window.MARKET_LEDGER.daily=window.MARKET_LEDGER.daily||{};\n'
        'window.MARKET_LEDGER.dailyAddenda=window.MARKET_LEDGER.dailyAddenda||{};\n'
        f'window.MARKET_LEDGER.daily["{month}"]=[];\n'
        'Object.assign(window.MARKET_LEDGER.dailyAddenda,{});\n')
    a, b, records = literal_span(source, f'window.MARKET_LEDGER.daily["{month}"]=')
    c, d, addenda = literal_span(source, 'Object.assign(window.MARKET_LEDGER.dailyAddenda,')
    if not isinstance(records, list) or not isinstance(addenda, dict):
        raise ValueError('Invalid monthly archive')
    dates = [r['date'] for r in records]
    if len(set(dates)) != len(dates) or set(dates) != set(addenda):
        raise ValueError('Existing Daily dates/addenda are duplicated or inconsistent')
    if any(date.fromisoformat(k).isoformat()[:7] != month for k in dates):
        raise ValueError('Existing record in wrong month')
    old = next((r for r in records if r['date'] == payload['date']), None)
    old_pair = {'report': old, 'addendum': addenda.get(payload['date'])}
    record, addendum = plain_record(payload['report']), plain_record(payload['addendum'])
    comparable = {k: old[k] for k in REPORT_KEYS} if old else None
    unchanged = comparable == record and old_pair['addendum'] == addendum
    action = 'unchanged' if unchanged else 'revise' if old else 'create'
    now = datetime.now(timezone(timedelta(hours=9))).isoformat(timespec='seconds')
    record.update(month=f'{day.year}년 {day.month}월', createdAt=old.get('createdAt', now) if old else now,
                  updatedAt=now, revisionNote=html.escape(payload['revisionNote'], quote=False))
    if old:
        record = dict(old, **record)  # Retain optional historical metadata.
    new_records = sorted([r for r in records if r['date'] != payload['date']] + [record], key=lambda r: r['date'])
    new_addenda = dict(sorted(dict(addenda, **{payload['date']: addendum}).items()))
    updated = source if unchanged else source[:c] + encoded(new_addenda) + source[d:]
    if not unchanged:
        updated = updated[:a] + encoded(new_records) + updated[b:]
    index_path = root / 'index.html'
    index = index_path.read_bytes().decode('utf-8')
    relative = 'data/daily/' + path.name
    pattern = r'(?<=src=")' + re.escape(relative) + r'(?:\?[^"\s]*)?(?=")'
    version = hashlib.sha256(updated.encode('utf-8')).hexdigest()[:16]
    new_index, count = re.subn(pattern, relative + '?v=' + version, index)
    if count > 1:
        raise ValueError('Duplicate Daily script in index.html')
    if not count:
        anchor = re.search(r'^.*<script src="assets/script\.js(?:\?[^"\s]*)?"></script>.*$', index, re.M)
        if not anchor:
            raise ValueError('Cannot locate site renderer script')
        new_index = index[:anchor.start()] + f'  <script src="{relative}?v={version}"></script>\n' + index[anchor.start():]
    return {'action': action, 'target': path, 'recordHash': digest(old_pair),
            'before': source if path.exists() else None, 'after': updated,
            'indexBefore': index, 'indexAfter': new_index,
            'contextWarnings': context.get('warnings', []),
            'contextOmissions': len(context.get('omitted', []))}


def apply(payload, root, allow_revision=False, expected_hash=None):
    state_dir = root / 'research-results'
    state_dir.mkdir(parents=True, exist_ok=True)
    lock = state_dir / '.write.lock'
    fd = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    os.close(fd)
    try:
        changes = plan(payload, root)
        if changes['action'] == 'revise':
            if not allow_revision:
                raise ValueError('Existing Daily requires explicit revision authorization (--allow-revision)')
            if not payload['revisionNote'].strip() or expected_hash != changes['recordHash']:
                raise ValueError('Revision requires a reason and the current recordHash from check')
        target, index = changes['target'], root / 'index.html'
        if changes['action'] == 'unchanged' and changes['indexBefore'] == changes['indexAfter']:
            return changes
        receipt = state_dir / 'receipts' / (datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ') + '-' + digest(payload)[:12])
        receipt.mkdir(parents=True)
        if changes['before'] is not None:
            atomic_write(receipt / 'daily-before.js', changes['before'])
        atomic_write(receipt / 'index-before.html', changes['indexBefore'])
        atomic_write(receipt / 'result.json', encoded(payload) + '\n')
        status = {'status': 'prepared', 'action': changes['action'], 'date': payload['date'],
                  'target': str(target), 'previousRecordHash': changes['recordHash'],
                  'resultHash': digest(payload), 'researchAuditIsAIReported': True}
        atomic_write(receipt / 'receipt.json', encoded(status) + '\n')
        if (target.read_bytes().decode('utf-8') if target.exists() else None) != changes['before'] or index.read_bytes().decode('utf-8') != changes['indexBefore']:
            raise ValueError('Site files changed during preparation; check again')
        wrote_target = wrote_index = False
        try:
            atomic_write(target, changes['after'])
            wrote_target = True
            if index.read_bytes().decode('utf-8') != changes['indexBefore']:
                raise ValueError('index.html changed concurrently')
            atomic_write(index, changes['indexAfter'])
            wrote_index = True
            atomic_write(receipt / 'receipt.json', encoded(dict(status, status='applied')) + '\n')
        except Exception:
            # Roll back only content still owned by this operation; never overwrite a concurrent edit.
            if wrote_index and index.read_bytes().decode('utf-8') == changes['indexAfter']:
                atomic_write(index, changes['indexBefore'])
            if wrote_target and target.read_bytes().decode('utf-8') == changes['after']:
                if changes['before'] is None:
                    target.unlink()
                else:
                    atomic_write(target, changes['before'])
            atomic_write(receipt / 'receipt.json', encoded(dict(status, status='failed_check_site_and_backups')) + '\n')
            raise
        changes['receipt'] = str(receipt / 'receipt.json')
        return changes
    finally:
        lock.unlink()


def template(root, day):
    context = build(root, 'daily', day)
    context_path = root / 'research-context' / ('daily-' + day.isoformat() + '.json')
    output = root / 'research-results' / ('daily-' + day.isoformat() + '.json')
    if output.exists():
        raise ValueError('Result template already exists; refusing to overwrite AI work')
    atomic_write(context_path, encoded(context) + '\n')
    result = {'schemaVersion': 1, 'module': 'daily', 'date': day.isoformat(),
              'context': {'file': context_path.name, 'sha256': hashlib.sha256(context_path.read_bytes()).hexdigest()},
              'report': {'date': day.isoformat(), 'title': '', 'tags': [], 'lead': [],
                         'report': [{'no': f'{i:02}', 'title': title, 'paragraphs': []} for i, title in enumerate(
                             ['전일 미국시장 및 글로벌 환경', '국내 지수와 수급', '시장 내부 자금 흐름', '주요 산업 및 기업', '주요 해석과 반대 근거', '시장 전달경로'], 2)], 'watch': []},
              'addendum': {'changes': {'maintained': [], 'new': []}, 'assessment': [], 'implications': [], 'conclusion': ''},
              'researchAudit': {'sources': [], 'unverified': [], 'counterEvidence': [], 'timingNotes': []},
              'revisionNote': ''}
    atomic_write(output, encoded(result) + '\n')
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    create = sub.add_parser('template')
    create.add_argument('--date', type=date.fromisoformat, default=datetime.now(timezone(timedelta(hours=9))).date())
    for command in ('check', 'apply'):
        child = sub.add_parser(command)
        child.add_argument('file', type=Path)
        if command == 'apply':
            child.add_argument('--allow-revision', action='store_true')
            child.add_argument('--expected-hash')
    args = parser.parse_args()
    try:
        if args.command == 'template':
            print('Template ready (not a completed Daily): ' + str(template(ROOT, args.date)))
        else:
            payload = read_json(args.file)
            result = plan(payload, ROOT) if args.command == 'check' else apply(payload, ROOT, args.allow_revision, args.expected_hash)
            print(encoded({k: str(v) if isinstance(v, Path) else v for k, v in result.items() if k not in ('before', 'after', 'indexBefore', 'indexAfter')}))
        return 0
    except (OSError, ValueError, KeyError, TypeError) as error:
        print('ERROR: ' + str(error), file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
