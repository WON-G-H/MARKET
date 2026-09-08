/* Market Ledger data module · dashboard metrics refreshed on 2026-09-08. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.core={
  "schemaVersion": 1,
  "siteName": "Market Ledger",
  "dashboardDate": "2026-09-08",
  "lastUpdatedAt": "2026-09-08 23:40 KST",
  "dashboard": {
    "week": "2026 W37 · 2026.09.08",
    "regime": "전강후약·변동성 재상승 · 경계",
    "confidence": "보통",
    "thesis": "KOSPI는 장중 7,171.52까지 올랐지만 6,954.52(-0.58%)로 반락했고 KOSDAQ도 1.25% 하락했다. 외국인·기관의 KOSPI 순매수는 이어졌지만 상승 종목은 231개에 그쳤고, 원·달러는 1,345.6원으로 상승했으며 VKOSPI도 47.34로 재차 뛰었다. 2분기 실질 GDP와 GDI는 견조했지만 중동발 유가·정제제품 위험과 7,000선 매물 부담이 전일의 반도체 중심 위험선호를 하루 만에 경계 국면으로 되돌렸다. 지수 재돌파보다 시장 폭, 변동성, 외국인 수급과 미국 물가를 우선 확인한다.",
    "primaryMetrics": [
      {
        "label": "KOSPI",
        "current": "6,954.52",
        "previous": "6,995.39",
        "change": "▼ 40.87",
        "changePct": "-0.58%",
        "unit": "index",
        "asOf": "2026-09-08 종가",
        "source": "한국거래소 집계·서울신문",
        "sourceUrl": "https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277",
        "direction": "down",
        "note": "장중 7,171.52 · 상승 231 · 하락 634 · 보합 45",
        "numericCurrent": 6954.52,
        "numericPrevious": 6995.39,
        "sourceMeta": {"name":"한국거래소 집계·서울신문","url":"https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277","type":"exchange","accessedAt":"2026-09-08"},
        "verified": true,
        "verificationNote": "KRX 정규시장 종가와 상승·하락 종목 수 확인."
      },
      {
        "label": "KOSDAQ",
        "current": "811.88",
        "previous": "822.19",
        "change": "▼ 10.31",
        "changePct": "-1.25%",
        "unit": "index",
        "asOf": "2026-09-08 종가",
        "source": "한국거래소 집계·서울신문",
        "sourceUrl": "https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277",
        "direction": "down",
        "note": "거래대금 약 8.15조원",
        "numericCurrent": 811.88,
        "numericPrevious": 822.19,
        "sourceMeta": {"name":"한국거래소 집계·서울신문","url":"https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277","type":"exchange","accessedAt":"2026-09-08"},
        "verified": true,
        "verificationNote": "KRX 정규시장 종가와 상승·하락 종목 수 확인."
      },
      {
        "label": "VIX",
        "current": "14.07",
        "previous": "14.32",
        "change": "▼ 0.25",
        "changePct": "-1.75%",
        "unit": "index",
        "asOf": "2026-09-04 미국 종가",
        "source": "Cboe VIX 시세·Investing.com",
        "sourceUrl": "https://ca.investing.com/indices/volatility-s-p-500-historical-data?cid=1096487",
        "direction": "down",
        "note": "9/7 미국 Labor Day로 신규 현물 종가 없음",
        "numericCurrent": 14.07,
        "numericPrevious": 14.32,
        "sourceMeta": {
          "name": "Cboe VIX 시세·Investing.com",
          "url": "https://ca.investing.com/indices/volatility-s-p-500-historical-data?cid=1096487",
          "type": "market-data",
          "accessedAt": "2026-09-07"
        },
        "verified": true,
        "verificationNote": "9/4 종가를 유지. 9/7 미국 현물시장 휴장."
      },
      {
        "label": "VKOSPI",
        "current": "47.34",
        "previous": "42.67",
        "change": "▲ 4.67",
        "changePct": "+10.94%",
        "unit": "index",
        "asOf": "2026-09-08 종가",
        "source": "Investing.com 시장 시세",
        "sourceUrl": "https://kr.investing.com/analysis/article-200458940",
        "direction": "up",
        "note": "지수 반락과 함께 변동성 경계 재강화",
        "numericCurrent": 47.34,
        "numericPrevious": 42.67,
        "sourceMeta": {
          "name": "Investing.com 시장 시세",
          "url": "https://kr.investing.com/analysis/article-200458940",
          "type": "market-data",
          "accessedAt": "2026-09-08"
        },
        "verified": true,
        "verificationNote": "9/8 종가 47.34와 일간 +10.94%를 확인. 공식 KRX 원시자료는 추후 대조 필요."
      },
      {
        "label": "이격도",
        "current": "KOSPI 102.87 / KOSDAQ 97.91",
        "previous": "KOSPI 103.98 / KOSDAQ 98.89",
        "change": "KOSPI ▼ 1.11%p / KOSDAQ ▼ 0.98%p",
        "changePct": "-1.07% / -0.99%",
        "unit": "20일 이동평균=100",
        "asOf": "2026-09-08 종가",
        "source": "지수 종가 기반 자체 계산·Investing.com",
        "sourceUrl": "https://kr.investing.com/indices/kospi-historical-data",
        "direction": "down",
        "numericCurrent": 102.87,
        "numericPrevious": 103.98,
        "sourceMeta": {
          "name": "지수 종가 기반 자체 계산·Investing.com",
          "url": "https://kr.investing.com/indices/kospi-historical-data",
          "type": "market-data",
          "accessedAt": "2026-09-08"
        },
        "verified": true,
        "verificationNote": "9/7 자체 계산 MA20에서 8/10 종가를 제외하고 9/8 종가를 반영. KOSPI MA20 6,760.334, KOSDAQ MA20 829.2485 기준."
      },
      {
        "label": "KOSPI 외국인 현물",
        "current": "+6,449",
        "previous": "+25,869",
        "change": "▼ 19,420억원",
        "changePct": "순매수 축소",
        "unit": "억원 · 순매수",
        "asOf": "2026-09-08 종가",
        "source": "한국거래소 집계·서울신문",
        "sourceUrl": "https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277",
        "direction": "up",
        "note": "기관 +6,496억원 · 개인 -3조534억원 · 프로그램 +781억원",
        "numericCurrent": 6449,
        "numericPrevious": 25869,
        "sourceMeta": {
          "name": "한국거래소 집계·서울신문",
          "url": "https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277",
          "type": "exchange",
          "accessedAt": "2026-09-08"
        },
        "verified": true,
        "verificationNote": "기사별 투자자 집계에 소폭 차이가 있어 서울신문의 한국거래소 인용값을 기준으로 사용."
      },
      {
        "label": "신용융자잔고",
        "current": "33.1903",
        "previous": "33.5958",
        "change": "▼ 0.4055조원",
        "changePct": "-1.21%",
        "unit": "조원",
        "asOf": "2026-09-07 · 최신 공표값",
        "source": "금융투자협회 FreeSIS",
        "sourceUrl": "https://freesis.kofia.or.kr/stat/main.do",
        "direction": "down",
        "note": "통계 공표 시차 반영 · 4,054.87억원 감소",
        "numericCurrent": 33.190325,
        "numericPrevious": 33.595812,
        "sourceMeta": {
          "name": "금융투자협회 FreeSIS",
          "url": "https://freesis.kofia.or.kr/stat/main.do",
          "type": "official",
          "accessedAt": "2026-09-08"
        },
        "verified": true,
        "verificationNote": "금융투자협회 9/7 공표값 33,190,325백만원, 전일 대비 405,487백만원 감소."
      },
      {
        "label": "투자자예탁금",
        "current": "93.9258",
        "previous": "93.5500",
        "change": "▲ 0.3758조원",
        "changePct": "+0.40%",
        "unit": "조원",
        "asOf": "2026-09-07 · 최신 공표값",
        "source": "금융투자협회 FreeSIS",
        "sourceUrl": "https://freesis.kofia.or.kr/stat/main.do",
        "direction": "up",
        "note": "통계 공표 시차 반영 · 3,758.08억원 증가",
        "numericCurrent": 93.925789,
        "numericPrevious": 93.549981,
        "sourceMeta": {
          "name": "금융투자협회 FreeSIS",
          "url": "https://freesis.kofia.or.kr/stat/main.do",
          "type": "official",
          "accessedAt": "2026-09-08"
        },
        "verified": true,
        "verificationNote": "금융투자협회 9/7 공표값 93,925,789백만원, 전일 대비 375,808백만원 증가."
      },
      {
        "label": "USD/KRW",
        "current": "1,345.60",
        "previous": "1,340.50",
        "change": "▲ 5.10원",
        "changePct": "+0.38%",
        "unit": "원",
        "asOf": "2026-09-08 15:30 종가",
        "source": "서울외환시장·서울신문",
        "sourceUrl": "https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277",
        "direction": "up",
        "note": "주간거래 종가 기준 원화 약세",
        "numericCurrent": 1345.6,
        "numericPrevious": 1340.5,
        "sourceMeta": {
          "name": "서울외환시장·서울신문",
          "url": "https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277",
          "type": "market-data",
          "accessedAt": "2026-09-08"
        },
        "verified": true,
        "verificationNote": "서울외환시장 15:30 종가."
      }
    ],
    "marketBlocks": [
      {"title":"한국 수급과 시장 폭","body":"외국인 +6,449억원과 기관 +6,496억원의 KOSPI 순매수에도 지수는 하락했다. 상승 231개·하락 634개로 Breadth가 급격히 악화했고 KOSDAQ도 -1.25%였다. 전일의 대형 반도체 집중 상승이 시장 전체로 확산되지 못했다."},
      {"title":"성장과 이익","body":"한국 2분기 실질 GDP는 전기 대비 0.6%, 실질 GDI는 3.7% 늘어 반도체 수출과 교역조건 개선을 확인했다. 그러나 성장의 강도와 당일 주가 반응은 분리해야 하며, 반도체 제외 이익과 소비로의 확산은 계속 확인해야 한다."},
      {"title":"금리·에너지·변동성","body":"원·달러는 1,345.6원으로 반등했고 VKOSPI는 47.34로 10.94% 상승했다. 중동 석유시설 피격과 WTI·Brent 고공행진이 미국 물가 발표 전 할인율 경계를 높였다. 미국 현물시장은 아직 재개 전이어서 글로벌 후속 반응은 미확인이다."},
      {"title":"오늘의 운용 판단","body":"외국인·기관 순매수 지속은 하단을 지지하지만 장중 7,171에서 음전한 가격 구조와 악화된 Breadth를 더 무겁게 본다. 반도체·원전·전력 인프라는 수주와 이익이 확인되는 종목만 선별하고, 미국 PPI·CPI와 한국 선물옵션 만기 전 추격을 제한한다."}
    ]
  }
};
