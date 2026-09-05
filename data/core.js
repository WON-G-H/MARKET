/* Market Ledger data module · dashboard metrics refreshed on 2026-09-05. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.core={
  "schemaVersion": 1,
  "siteName": "Market Ledger",
  "dashboardDate": "2026-09-04",
  "lastUpdatedAt": "2026-09-05",
  "dashboard": {
    "week": "2026 W36 · 2026.09.04",
    "regime": "위험선호 회복 · 공급측 물가 경계",
    "confidence": "높음",
    "thesis": "미국 생산성 +1.4%와 단위노동비용 +1.2%가 경기 침체 없는 비용 완화를 시사하면서 금리·달러가 하락했고, 원화 강세와 외국인·기관의 양 시장 동반 순매수로 국내 위험선호가 회복됐다. 다만 ISM 서비스 가격 72.6, WTI 91.67달러와 식품가격 상승은 금리 하락의 지속성을 제약한다. 반도체·로봇·전력 인프라는 선별 확대하되 금융·고배당과 현금을 병행한다.",
    "primaryMetrics": [
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
        "note": "9/4 종가 확인 · Cboe 공식 시계열은 9/8 갱신 예정",
        "numericCurrent": 14.07,
        "numericPrevious": 14.32,
        "sourceMeta": {
          "name": "Cboe VIX 시세·Investing.com",
          "url": "https://ca.investing.com/indices/volatility-s-p-500-historical-data?cid=1096487",
          "type": "market-data",
          "accessedAt": "2026-09-05"
        },
        "verified": true,
        "verificationNote": "9/4 종가는 금융정보 제공처에서 확인. Cboe/FRED 공식 일별 시계열의 다음 갱신일은 9/8."
      },
      {
        "label": "VKOSPI",
        "current": "39.33",
        "previous": "42.42",
        "change": "▼ 3.09",
        "changePct": "-7.28%",
        "unit": "index",
        "asOf": "2026-09-04 종가",
        "source": "한국거래소 집계·연합뉴스",
        "sourceUrl": "https://www.yna.co.kr/amp/view/AKR20260904100851008",
        "direction": "down",
        "note": "KRX 종가 · 직전값은 등락폭으로 역산",
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
        "current": "+4,793",
        "previous": "-4,234",
        "change": "▲ 9,027억원",
        "changePct": "순매도→순매수",
        "unit": "억원 · 순매수",
        "asOf": "2026-09-04 종가",
        "source": "한국거래소 집계·뉴스웨이",
        "sourceUrl": "https://v.daum.net/v/20260904155904765",
        "direction": "up",
        "note": "KRX 정규시장 기준",
        "numericCurrent": 4793,
        "numericPrevious": -4234,
        "sourceMeta": {
          "name": "한국거래소 집계·뉴스웨이",
          "url": "https://v.daum.net/v/20260904155904765",
          "type": "exchange",
          "accessedAt": "2026-09-04"
        },
        "verified": true,
        "verificationNote": "KRX 정규시장 기준"
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
        "current": "1,350.40",
        "previous": "1,359.30",
        "change": "▼ 8.90원",
        "changePct": "-0.65%",
        "unit": "원",
        "asOf": "2026-09-04 15:30 종가",
        "source": "서울외환시장·뉴시스",
        "sourceUrl": "https://mobile.newsis.com/view/NISX20260904_0003776930",
        "direction": "down",
        "note": "주간 종가 기준",
        "numericCurrent": 1350.4,
        "numericPrevious": 1359.3,
        "sourceMeta": {
          "name": "서울외환시장·뉴시스",
          "url": "https://mobile.newsis.com/view/NISX20260904_0003776930",
          "type": "market-data",
          "accessedAt": "2026-09-04"
        },
        "verified": true,
        "verificationNote": "주간 종가 기준"
      }
    ],
    "marketBlocks": [
      {
        "title": "금리·달러·원자재",
        "body": "미국 2년물 4.340%, 10년물 4.768%, DXY 98.995로 금융여건은 완화됐다. 그러나 ISM 서비스 가격 72.6, WTI 91.67달러와 식품가격 상승이 공급측 물가 위험을 높인다."
      },
      {
        "title": "국내 수급",
        "body": "코스피 외국인 +4,793억원·기관 +1조6,691억원, 코스닥 외국인 +2,600억원·기관 +1,601억원으로 전일의 수급 공백이 해소됐다. 원·달러 1,350.40원과 코스닥 +2.95%가 반등의 질을 지지한다."
      },
      {
        "title": "오늘의 운용 판단",
        "body": "AI 하드웨어와 전력 인프라의 실적 노출은 유지하되 높은 서비스·에너지·식품가격이 장기금리를 다시 올릴 수 있다. 성장 모멘텀과 금융·고배당을 병행하고 외국인 수급이 지속될 때만 위험노출을 늘린다."
      }
    ]
  }
};
