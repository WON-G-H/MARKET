"""Public Dashboard indicators. Standard library only; no investment judgments."""
import csv
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
import hashlib
from html.parser import HTMLParser
import io
import json
import re
import urllib.request

from market_data import atomic_write, save_json

KST = timezone(timedelta(hours=9))
NAVER = 'https://finance.naver.com/'
VIX_URL = 'https://cdn.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv'
KOFIA_URL = 'https://freesis.kofia.or.kr/stat/main.do'
VKOSPI_URL = 'https://www.investing.com/indices/kospi-volatility-historical-data'
LABELS = {'kospi': 'KOSPI', 'kosdaq': 'KOSDAQ', 'vix': 'VIX', 'vkospi': 'VKOSPI',
          'disparity': '이격도', 'foreign': 'KOSPI 외국인 현물', 'credit': '신용융자잔고',
          'deposit': '투자자예탁금', 'fx': 'USD/KRW', 'wti': 'WTI · 일별 연속시세'}


def number(text):
    text = text.strip().replace(',', '')
    if not re.fullmatch(r'[+-]?\d+(?:\.\d+)?', text):
        raise ValueError('Invalid numeric field')
    value = Decimal(text)
    if not value.is_finite():
        raise ValueError('Nonfinite number')
    return float(value)


class Table(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows, self.row, self.cell = [], None, None

    def handle_starttag(self, tag, attrs):
        if tag == 'tr':
            self.row = []
        elif tag in ('td', 'th') and self.row is not None:
            self.cell = []

    def handle_data(self, data):
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag):
        if tag in ('td', 'th') and self.cell is not None:
            self.row.append(' '.join(''.join(self.cell).split()))
            self.cell = None
        elif tag == 'tr' and self.row is not None:
            self.rows.append(self.row)
            self.row = None


def daily_table(text, cutoff, column=1, required=(), positive=True):
    parser = Table()
    parser.feed(text)
    headers = ' '.join(' '.join(row) for row in parser.rows if not row or not re.match(r'\d', row[0]))
    if any(word not in headers for word in required):
        raise ValueError('Provider table headers changed')
    points = {}
    for row in parser.rows:
        if not row or not re.fullmatch(r'(?:\d{4}|\d{2})\.\d{2}\.\d{2}', row[0]):
            continue
        day = date.fromisoformat(('20' if len(row[0]) == 8 else '') + row[0].replace('.', '-'))
        if day > cutoff:
            continue
        if len(row) <= column:
            raise ValueError('Truncated provider row')
        value = number(row[column])
        if positive and value <= 0:
            raise ValueError('Expected a positive price')
        if day.isoformat() in points and points[day.isoformat()] != value:
            raise ValueError('Conflicting date duplicates')
        points[day.isoformat()] = value
    if not points:
        raise ValueError('No dated observations')
    return points


def vix_csv(text, cutoff):
    reader = csv.DictReader(io.StringIO(text.lstrip('\ufeff')))
    if not {'DATE', 'CLOSE'}.issubset(reader.fieldnames or []):
        raise ValueError('VIX CSV headers changed')
    points = {}
    for row in reader:
        day = datetime.strptime(row['DATE'], '%m/%d/%Y').date()
        if day > cutoff:
            continue
        value = number(row['CLOSE'])
        if not 0 < value < 1000:
            raise ValueError('Invalid VIX')
        key = day.isoformat()
        if key in points and points[key] != value:
            raise ValueError('Conflicting VIX observations')
        points[key] = value
    if not points:
        raise ValueError('No VIX observations')
    return dict(sorted(points.items())[-60:])


def vkospi_table(text, cutoff):
    if 'KOSPI Volatility' not in text or 'KSVKOSPI' not in text:
        raise ValueError('Unexpected Investing.com instrument')
    parser = Table()
    parser.feed(text)
    active, points = False, {}
    months = {name: i+1 for i,name in enumerate('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split())}
    for row in parser.rows:
        if row[:5] == ['Date','Price','Open','High','Low']:
            active = True
            continue
        if not active or not row:
            continue
        match = re.fullmatch(r'([A-Z][a-z]{2}) (\d{1,2}), (\d{4})',row[0])
        if not match:
            if points:
                break
            continue
        day = date(int(match[3]),months[match[1]],int(match[2]))
        if day > cutoff:
            continue
        if len(row) < 5:
            raise ValueError('Truncated VKOSPI row')
        value, high, low = number(row[1]), number(row[3]), number(row[4])
        if not 0 < low <= value <= high < 1000:
            raise ValueError('Invalid VKOSPI close/high/low')
        key = day.isoformat()
        if key in points and points[key] != value:
            raise ValueError('Conflicting VKOSPI dates')
        points[key] = value
    if len(points) < 2:
        raise ValueError('VKOSPI requires at least two dated daily prices')
    return points


def kofia(text, cutoff):
    result = {}
    for series, code in [('credit', 'OS0026'), ('deposit', 'OS0021')]:
        blocks = [block for block in re.findall(r'<dl\b[^>]*>(.*?)</dl>', text, re.S) if code in block]
        if len(blocks) != 1 or '백만원' not in blocks[0]:
            raise ValueError('KOFIA series/unit missing or ambiguous')
        block = blocks[0]
        def field(cls):
            match = re.search(r'class=["\']' + cls + r'["\'][^>]*>\s*([^<]+)', block)
            if not match:
                raise ValueError('KOFIA field missing: ' + cls)
            return match.group(1).strip()
        month, day = map(int, field('date').split('/'))
        observed = date(cutoff.year, month, day)
        if observed > cutoff:
            observed = date(cutoff.year - 1, month, day)
        if (cutoff - observed).days > 45:
            raise ValueError('KOFIA month/day cannot be resolved to a recent date')
        value = number(field('num1')) / 1_000_000
        delta = number(field('num2[ab]')) / 1_000_000
        if value <= 0 or value - delta <= 0:
            raise ValueError('Invalid KOFIA balance')
        result[series] = ({observed.isoformat(): value}, value - delta)
    return result


def disparity(points):
    rows = sorted(points.items())
    if len(rows) < 21:
        raise ValueError('20-day disparity requires at least 21 trading observations')
    result = {}
    for i in range(19, len(rows)):
        window = rows[i-19:i+1]
        if (date.fromisoformat(window[-1][0]) - date.fromisoformat(window[0][0])).days > 45:
            raise ValueError('Index history has too few recent trading observations')
        result[rows[i][0]] = rows[i][1] / (sum(v for _, v in window) / 20) * 100
    return result


def build_card(series, points, source, url, unit, decimals=2, previous_reported=None):
    rows = sorted(points.items())
    if not rows:
        raise ValueError('No observations')
    day, value = rows[-1]
    previous_day, old = rows[-2] if len(rows) > 1 else (None, previous_reported)
    delta = value - old if old is not None else None
    pct = delta / abs(old) * 100 if old else None
    fmt = lambda x: f'{x:,.{decimals}f}'
    return {'id': series, 'label': LABELS[series], 'current': fmt(value),
            'previous': fmt(old) if old is not None else '',
            'previousLabel': '이전 관측' if previous_day else '전회 공표값',
            'previousAsOf': previous_day, 'numericCurrent': value, 'numericPrevious': old,
            'change': f'{delta:+,.{decimals}f}' if delta is not None else '이전 관측값 없음',
            'changePct': f'{pct:+.2f}%' if pct is not None and series != 'foreign' else '',
            'direction': 'flat' if not delta else 'up' if delta > 0 else 'down',
            'unit': unit, 'observationDate': day, 'asOf': day + ' · 일별 공표값',
            'source': source, 'sourceUrl': url, 'managedBy': 'core-metrics-collector',
            'verified': False, 'verificationNote': '공개 원자료 수집·형식 검증. 독립 교차검증 미수행.'}


def collect(output, now=None, fetcher=None):
    now = now or datetime.now(timezone.utc)
    cutoff = now.astimezone(KST).date()
    kr_cutoff = cutoff if now.astimezone(KST).hour >= 16 else cutoff - timedelta(days=1)
    stamp = now.isoformat()
    sources, cards, errors, observations = [], {}, {}, {}
    def fetch(url, encoding='cp949'):
        if fetcher:
            raw = fetcher(url)
        else:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (compatible; MarketLedger/1.0)'})
            with urllib.request.urlopen(req, timeout=25) as response:
                raw = response.read(5_000_001)
        if len(raw) > 5_000_000:
            raise ValueError('Provider response exceeds size limit')
        text = raw.decode(encoding)
        digest = hashlib.sha256(raw).hexdigest()
        atomic_write(output / 'raw' / (digest + '.txt'), text)
        sources.append({'url': url, 'sha256': digest, 'encoding': encoding})
        return text
    def remember(series, points, source, url, unit, decimals=2, previous_reported=None):
        card = build_card(series, points, source, url, unit, decimals, previous_reported)
        age = (cutoff - date.fromisoformat(card['observationDate'])).days
        card['collectionNote'] = '관측일 7일 초과 · 최신 공표 여부 확인 필요' if age > 7 else '자동 수집'
        card['collectionState'] = 'stale' if age > 7 else 'success'
        cards[series] = card
        observations[series] = [{'observationDate': day, 'value': value, 'unit': unit,
                                 'sourceUrl': url} for day, value in sorted(points.items())]
    indices = {}
    for series in ['kospi', 'kosdaq']:
        url = NAVER + 'sise/sise_index_day.naver?code=' + series.upper()
        try:
            points = daily_table(fetch(url + '&page=1'), kr_cutoff, required=('날짜', '체결가'))
            remember(series, points, '네이버 금융 · 지수 일별시세', url + '&page=1', 'index')
            for page in range(2, 5):
                more = daily_table(fetch(url + '&page=' + str(page)), kr_cutoff, required=('날짜', '체결가'))
                if any(day in points and points[day] != value for day, value in more.items()):
                    raise ValueError('Conflicting paginated index observations')
                points.update(more)
            indices[series] = points
            remember(series, points, '네이버 금융 · 지수 일별시세', url + '&page=1', 'index')
        except (OSError, ValueError) as exc:
            errors['disparity' if series in cards else series] = type(exc).__name__ + ': ' + str(exc)
    try:
        a, b = disparity(indices['kospi']), disparity(indices['kosdaq'])
        if set(a) != set(b):
            raise ValueError('KOSPI/KOSDAQ observation dates differ')
        ca = build_card('disparity', a, '네이버 지수 종가 · Python 계산', cards['kospi']['sourceUrl'], '20거래일 이동평균=100')
        cb = build_card('disparity', b, '', '', '')
        ca.update(current='KOSPI ' + ca['current'] + ' / KOSDAQ ' + cb['current'],
                  previous='KOSPI ' + ca['previous'] + ' / KOSDAQ ' + cb['previous'],
                  change='KOSPI ' + ca['change'] + ' / KOSDAQ ' + cb['change'] + ' %p',
                  changePct='', direction='flat', collectionNote='20거래일 종가로 자동 계산',
                  collectionState='success', components={'kospi': a, 'kosdaq': b})
        if (cutoff - date.fromisoformat(ca['observationDate'])).days > 7:
            ca.update(collectionState='stale', collectionNote='관측일 7일 초과 · 최신 공표 여부 확인 필요')
        cards['disparity'] = ca
        errors.pop('disparity', None)
    except (KeyError, ValueError) as exc:
        errors['disparity'] = str(exc)
    jobs = [
        ('vix', VIX_URL, 'CBOE VIX History', 'index · 미국 종가', 2, 'utf-8', None),
        ('foreign', NAVER + 'sise/investorDealTrendDay.naver?bizdate=' + cutoff.strftime('%Y%m%d') + '&sosok=01',
         '네이버 금융 · KOSPI 투자자별 매매', '억원 · 순매수', 0, 'cp949', (2, ('날짜', '외국인'), False)),
        ('fx', NAVER + 'marketindex/exchangeDailyQuote.naver?marketindexCd=FX_USDKRW&page=1',
         '네이버 금융 · 매매기준율', '원 · 매매기준율', 2, 'cp949', (1, ('날짜', '매매기준율'), True)),
        ('wti', NAVER + 'marketindex/worldDailyQuote.naver?marketindexCd=OIL_CL&fdtc=2&page=1',
         '네이버 금융 · OIL_CL', '달러/배럴 · 계약월 미제공', 2, 'cp949', (1, ('날짜',), True))]
    for series, url, source, unit, decimals, encoding, spec in jobs:
        try:
            text = fetch(url, encoding)
            points = vix_csv(text, cutoff) if spec is None else daily_table(
                text, kr_cutoff if series in ('foreign', 'fx') else cutoff, *spec)
            remember(series, points, source, url, unit, decimals)
            if series == 'wti':
                cards[series]['collectionNote'] += ' · 월물 변경 포함 가능'
        except (OSError, ValueError) as exc:
            errors[series] = type(exc).__name__ + ': ' + str(exc)
    try:
        for series, (points, old) in kofia(fetch(KOFIA_URL, 'utf-8'), cutoff).items():
            remember(series, points, '금융투자협회 FreeSIS', KOFIA_URL, '조원', 4, old)
            cards[series]['verificationNote'] += ' 원자료 백만원→조원 환산. 월/일의 연도는 수집일 기준 추론; 전회 관측일 미제공.'
    except (OSError, ValueError) as exc:
        errors.update({s: type(exc).__name__ + ': ' + str(exc) for s in ('credit', 'deposit')})
    try:
        points = vkospi_table(fetch(VKOSPI_URL, 'utf-8'), kr_cutoff)
        remember('vkospi', points, 'Investing.com · KOSPI Volatility', VKOSPI_URL, 'index · 일별 종가')
    except (OSError, ValueError, KeyError) as exc:
        errors['vkospi'] = 'Investing.com 수집 실패 · 기존값 유지: ' + str(exc)
    path = output / 'history.json'
    state = json.loads(path.read_text(encoding='utf-8')) if path.exists() else {'observations': {}, 'revisions': []}
    for series, rows in observations.items():
        for point in rows:
            key = series + '/' + point['observationDate']
            prior = state['observations'].get(key)
            if prior and all(prior.get(k) == v for k, v in point.items()):
                continue
            if prior:
                state['revisions'].append({'key': key, 'previous': prior, 'revisedAt': stamp})
            state['observations'][key] = dict(point, fetchedAt=stamp)
    save_json(path, state)
    bundle = {'schemaVersion': 1, 'checkedAt': stamp, 'cards': cards, 'errors': errors,
              'sources': sources, 'status': 'partial' if errors else 'success'}
    save_json(output / 'latest.json', bundle)
    save_json(output / 'runs' / (now.strftime('%Y%m%dT%H%M%S%fZ') + '.json'), bundle)
    return bundle
