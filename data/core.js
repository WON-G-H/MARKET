/* Market Ledger data module · dashboard metrics refreshed on 2026-09-07. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.core={
  "schemaVersion": 1,
  "siteName": "Market Ledger",
  "dashboardDate": "2026-09-07",
  "lastUpdatedAt": "2026-09-07 23:10 KST",
  "dashboard": {
    "week": "2026 W37 · 2026.09.07",
    "regime": "반도체 중심 선별적 위험선호 · 공급측 물가 경계",
    "confidence": "보통",
    "thesis": "GPT-6 Astra 출시와 미국 메모리·반도체 강세가 삼성전자·SK하이닉스의 이익 지속 기대를 자극했고, 원화 강세와 외국인·기관의 합산 5조원대 현물 순매수가 KOSPI를 4.61% 끌어올렸다. 그러나 상승 종목 비중은 약 52.5%에 그쳤고 KOSDAQ에서는 외국인·기관이 순매도했다. 따라서 광범위한 유동성 장세보다 대형 반도체와 AI 전력 인프라에 집중된 선별적 위험선호로 판단한다. 미국 10년물 4.784%와 정제제품 공급난이 남아 있어 추격보다 이익 상향과 수급 지속성을 확인한다.",
    "primaryMetrics": [
      {
        "label": "KOSPI",
        "current": "6,995.39",
        "previous": "6,687.21",
        "change": "▲ 308.18",
        "changePct": "+4.61%",
        "unit": "index",
        "asOf": "2026-09-07 종가",
        "source": "한국거래소 집계·연합뉴스",
        "sourceUrl": "https://www.yna.co.kr/amp/view/AKR20260907128900008",
        "direction": "up",
        "note": "상승 478 · 하락 381 · 보합 52",
        "numericCurrent": 6995.39,
        "numericPrevious": 6687.21,
        "sourceMeta": {"name":"한국거래소 집계·연합뉴스","url":"https://www.yna.co.kr/amp/view/AKR20260907128900008","type":"exchange","accessedAt":"2026-09-07"},
        "verified": true,
        "verificationNote": "KRX 정규시장 종가와 상승·하락 종목 수 확인."
      },
      {
        "label": "KOSDAQ",
        "current": "822.19",
        "previous": "813.50",
        "change": "▲ 8.69",
        "changePct": "+1.07%",
        "unit": "index",
        "asOf": "2026-09-07 종가",
        "source": "한국거래소 집계·연합뉴스",
        "sourceUrl": "https://www.yna.co.kr/amp/view/AKR20260907128900008",
        "direction": "up",
        "note": "상승 833 · 하락 807 · 보합 95",
        "numericCurrent": 822.19,
        "numericPrevious": 813.50,
        "sourceMeta": {"name":"한국거래소 집계·연합뉴스","url":"https://www.yna.co.kr/amp/view/AKR20260907128900008","type":"exchange","accessedAt":"2026-09-07"},
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
        "current": "39.33",
        "previous": "42.42",
        "change": "▼ 3.09",
        "changePct": "-7.28%",
        "unit": "index",
        "asOf": "2026-09-04 종가 · 최신 정확값 미확보",
        "source": "한국거래소 집계·연합뉴스",
        "sourceUrl": "https://www.yna.co.kr/amp/view/AKR20260904100851008",
        "direction": "down",
        "note": "9/7 자료는 40선 하회만 확인돼 9/4 정확값을 유지",
        "numericCurrent": 39.33,
        "numericPrevious": 42.42,
        "sourceMeta": {
          "name": "한국거래소 집계·연합뉴스",
          "url": "https://www.yna.co.kr/amp/view/AKR20260904100851008",
          "type": "market-data",
          "accessedAt": "2026-09-05"
        },
        "verified": true,
        "verificationNote": "KRX 9/4 종가 39.33, 전일 대비 -3.09(-7.28%)."
      },
      {
        "label": "이격도",
        "current": "KOSPI 99.95 / KOSDAQ 97.99",
        "previous": "KOSPI 98.62 / KOSDAQ 95.25",
        "change": "KOSPI ▲ 1.32%p / KOSDAQ ▲ 2.74%p",
        "changePct": "+1.34% / +2.87%",
        "unit": "20일 이동평균=100",
        "asOf": "2026-09-04 종가",
        "source": "지수 종가 기반 자체 계산·Investing.com",
        "sourceUrl": "https://kr.investing.com/indices/kospi-historical-data",
        "direction": "up",
        "numericCurrent": 99.95,
        "numericPrevious": 98.62,
        "sourceMeta": {
          "name": "지수 종가 기반 자체 계산·Investing.com",
          "url": "https://kr.investing.com/indices/kospi-historical-data",
          "type": "market-data",
          "accessedAt": "2026-09-05"
        },
        "verified": true,
        "verificationNote": "KOSPI·KOSDAQ 최근 20거래일 종가의 단순이동평균 대비 9/4 종가 비율. 반올림으로 미세한 차이가 날 수 있음."
      },
      {
        "label": "KOSPI 외국인 현물",
        "current": "+25,869",
        "previous": "+4,793",
        "change": "▲ 21,076억원",
        "changePct": "순매수 확대",
        "unit": "억원 · 순매수",
        "asOf": "2026-09-07 종가",
        "source": "한국거래소 집계·연합뉴스",
        "sourceUrl": "https://www.yna.co.kr/amp/view/AKR20260907128900008",
        "direction": "up",
        "note": "기관 +26,327억원 · 개인 -68,212억원",
        "numericCurrent": 25869,
        "numericPrevious": 4793,
        "sourceMeta": {
          "name": "한국거래소 집계·연합뉴스",
          "url": "https://www.yna.co.kr/amp/view/AKR20260907128900008",
          "type": "exchange",
          "accessedAt": "2026-09-07"
        },
        "verified": true,
        "verificationNote": "기사별 투자자 집계에 소폭 차이가 있어 연합뉴스의 KRX 인용값을 기준으로 사용."
      },
      {
        "label": "신용융자잔고",
        "current": "33.5420",
        "previous": "33.4404",
        "change": "▲ 0.1016조원",
        "changePct": "+0.30%",
        "unit": "조원",
        "asOf": "2026-09-03 · 최신 공표값",
        "source": "금융투자협회 FreeSIS",
        "sourceUrl": "https://freesis.kofia.or.kr/stat/main.do",
        "direction": "up",
        "note": "통계 공표 시차 반영 · 1,015.75억원 증가",
        "numericCurrent": 33.542016,
        "numericPrevious": 33.440441,
        "sourceMeta": {
          "name": "금융투자협회 FreeSIS",
          "url": "https://freesis.kofia.or.kr/stat/main.do",
          "type": "official",
          "accessedAt": "2026-09-05"
        },
        "verified": true,
        "verificationNote": "금융투자협회 9/3 공표값 33,542,016백만원, 전일 대비 101,575백만원 증가."
      },
      {
        "label": "투자자예탁금",
        "current": "97.7615",
        "previous": "102.2672",
        "change": "▼ 4.5057조원",
        "changePct": "-4.41%",
        "unit": "조원",
        "asOf": "2026-09-03 · 최신 공표값",
        "source": "금융투자협회 FreeSIS",
        "sourceUrl": "https://freesis.kofia.or.kr/stat/main.do",
        "direction": "down",
        "note": "통계 공표 시차 반영 · 4조5,057.40억원 감소",
        "numericCurrent": 97.761496,
        "numericPrevious": 102.267236,
        "sourceMeta": {
          "name": "금융투자협회 FreeSIS",
          "url": "https://freesis.kofia.or.kr/stat/main.do",
          "type": "official",
          "accessedAt": "2026-09-05"
        },
        "verified": true,
        "verificationNote": "금융투자협회 9/3 공표값 97,761,496백만원, 전일 대비 4,505,740백만원 감소. 원인은 별도 확인하지 않음."
      },
      {
        "label": "USD/KRW",
        "current": "1,340.50",
        "previous": "1,350.40",
        "change": "▼ 9.90원",
        "changePct": "-0.73%",
        "unit": "원",
        "asOf": "2026-09-07 15:30 종가",
        "source": "서울외환시장·연합뉴스",
        "sourceUrl": "https://www.yna.co.kr/amp/view/AKR20260907128900008",
        "direction": "down",
        "note": "사용자 제공 1,342.8원은 다른 관측시각 스냅샷",
        "numericCurrent": 1340.5,
        "numericPrevious": 1350.4,
        "sourceMeta": {
          "name": "서울외환시장·연합뉴스",
          "url": "https://www.yna.co.kr/amp/view/AKR20260907128900008",
          "type": "market-data",
          "accessedAt": "2026-09-07"
        },
        "verified": true,
        "verificationNote": "서울외환시장 15:30 종가."
      }
    ],
    "marketBlocks": [
      {"title":"한국 수급과 시장 폭","body":"외국인 +2조5,869억원, 기관 +2조6,327억원이 KOSPI를 끌어올렸고 원·달러는 1,340.5원으로 하락했다. 그러나 KOSPI 상승 종목 비중은 약 52.5%, KOSDAQ은 약 50.8%에 그쳤고 KOSDAQ 외국인·기관은 순매도해 대형 반도체 집중도가 높았다."},
      {"title":"AI·반도체와 한국 이익","body":"Astra 출시는 AI 활용 범위 확대의 근거이고 DRAM 공급 제약과 한국 ROE 전망 상향은 반도체 이익 지속성을 지지한다. 다만 모델 벤치마크는 최종 AI ROI가 아니며, 한국시장 전체 재평가는 반도체 제외 이익·ROE와 주주환원 확산이 필요하다."},
      {"title":"금리·에너지 리스크","body":"8월 미국 고용은 +16.2만명, 실업률 4.1%, 임금 +3.1% YoY로 침체보다 견조한 성장에 가깝다. 미국 10년물은 9/4 4.784%이고, Reuters가 보도한 VLSFO 76% 상승과 중유 부족은 운임·물가로 번질 수 있어 할인율 부담이 해소되지 않았다."},
      {"title":"오늘의 운용 판단","body":"반도체·전력·데이터센터 공급망은 이익 상향과 외국인 수급이 동반되는 종목을 우선한다. KOSPI 7,000선 자체를 추격 근거로 삼지 않고 KOSDAQ 수급, 상승 종목 비중, 미국 물가와 장기금리, 정제제품 가격을 확인한다."}
    ]
  }
};
