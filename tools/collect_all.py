"""Collect Dashboard indicators, preserving all AI research text."""
import argparse
from datetime import date, datetime, timezone
import os
import sys

import core_metrics
import expanded_data
from dashboard_data import apply_dashboard
from market_data import ROOT, run, save_json


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--date', type=date.fromisoformat)
    parser.add_argument('--update-dashboard', action='store_true')
    parser.add_argument('--expanded-only', action='store_true', help='Collect phase 5 data only; no Dashboard edits')
    args = parser.parse_args()
    if args.expanded_only and (args.update_dashboard or args.date):
        parser.error('--expanded-only cannot be combined with --update-dashboard or --date')
    today = datetime.now(core_metrics.KST).date()
    if args.date and args.date != today:
        if args.update_dashboard:
            parser.error('Historical collection cannot update the Dashboard')
        # Historical Treasury support remains available; other sources expose latest snapshots.
        result = run(ROOT / 'market-data', args.date)
        return 0 if result['collection']['status'] == 'success' else 1
    output = ROOT / 'market-data'
    output.mkdir(exist_ok=True)
    lock = output / '.all.lock'
    try:
        fd = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        os.close(fd)
    except FileExistsError:
        print('Collection already running; existing lock preserved.', file=sys.stderr)
        return 1
    try:
        if args.expanded_only:
            expanded = expanded_data.collect(output / 'expanded')
            print('Expanded data: ' + expanded['status'] + '; report: market-data/expanded/latest.md')
            return 0 if expanded['status'] == 'success' else 2
        treasury = run(output, today)
        extra = core_metrics.collect(output / 'indicators')
        expanded = expanded_data.collect(output / 'expanded')
        # Use the completion time for the combined update, not its start time.
        treasury['collection']['checkedAt'] = datetime.now(timezone.utc).isoformat()
        meta = apply_dashboard(treasury, ROOT, extra) if args.update_dashboard else {
            'status': 'success' if extra['status']=='success' and treasury['collection']['status']=='success' else 'partial',
            'warnings': list(extra['errors'].values())}
        meta['expandedData'] = {'status': expanded['status'], 'seriesCount': len(expanded['metrics']),
                                'warnings': expanded['warnings'], 'report': 'market-data/expanded/latest.md'}
        if expanded['status'] != 'success':
            meta['status'] = 'partial'
        meta['checkedAt'] = datetime.now(timezone.utc).isoformat()
        if args.update_dashboard:
            from site_market_data import publish
            meta['siteSnapshot'] = publish(ROOT, expanded, meta['checkedAt'])
        from calendar_data import collect as collect_calendar
        calendar = collect_calendar(ROOT, apply=args.update_dashboard)
        meta['calendar'] = {'status':calendar['status'],'events':len(calendar['events']),
                            'warnings':calendar['warnings']}
        if calendar['status'] != 'success':meta['status']='partial'
        meta['checkedAt'] = datetime.now(timezone.utc).isoformat()
        save_json(output / 'collection-status.json', meta)
        print('Dashboard collection: ' + meta['status'])
        print('Indicator cards collected: ' + str(len(extra['cards'])) + '/10; Treasury: ' + treasury['collection']['status'])
        print('Expanded series: ' + str(len(expanded['metrics'])) + '; ' + expanded['status'])
        print('Macro calendar: ' + calendar['status'] + '; events: ' + str(len(calendar['events'])))
        print('Report: market-data/collection-status.json')
        return 0 if meta['status'] == 'success' else 2
    except (OSError, ValueError) as exc:
        print('Collection failed: ' + str(exc), file=sys.stderr)
        return 1
    finally:
        lock.unlink()


if __name__ == '__main__':
    sys.exit(main())
