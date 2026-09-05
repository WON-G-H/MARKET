/* Market Ledger data module · generated from the verified latest state on 2026-09-04. */
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
        "current": "14.32",
        "previous": "15.20",
        "change": "▼ 0.88",
        "changePct": "-5.79%",
        "unit": "index",
        "asOf": "2026-09-03 미국 종가",
        "source": "Cboe 시세·YCharts",
        "sourceUrl": "https://ycharts.com/indicators/vix_close",
        "direction": "down",
        "note": "미국 종가 기준 최신 검증값",
        "numericCurrent": 14.32,
        "numericPrevious": 15.2,
        "sourceMeta": {
          "name": "Cboe 시세·YCharts",
          "url": "https://ycharts.com/indicators/vix_close",
          "type": "market-data",
          "accessedAt": "2026-09-04"
        },
        "verified": true,
        "verificationNote": "미국 종가 기준 최신 검증값"
      },
      {
        "label": "VKOSPI",
        "current": "44.03",
        "previous": "46.05",
        "change": "▼ 2.02",
        "changePct": "-4.39%",
        "unit": "index",
        "asOf": "2026-09-01 종가",
        "source": "국내 시장정보 서비스(KRX 시세 기반)",
        "sourceUrl": "https://portfolio.ezinit.com/community/market_report/2496",
        "direction": "down",
        "note": "9/1 15:59 KST 수집값 · 직전값은 8/31 종가",
        "numericCurrent": 44.03,
        "numericPrevious": 46.05,
        "sourceMeta": {
          "name": "국내 시장정보 서비스(KRX 시세 기반)",
          "url": "https://portfolio.ezinit.com/community/market_report/2496",
          "type": "market-data",
          "accessedAt": "2026-09-04"
        },
        "verified": true,
        "verificationNote": "9/1 15:59 KST 수집값 · 직전값은 8/31 종가"
      },
      {
        "label": "이격도",
        "current": "KOSPI 102.61 / KOSDAQ 99.07",
        "previous": "KOSPI 102.82 / KOSDAQ 101.16",
        "change": "KOSPI ▼ 0.21%p / KOSDAQ ▼ 2.09%p",
        "changePct": "-0.20% / -2.06%",
        "unit": "20일 이동평균=100",
        "asOf": "2026-09-01 종가",
        "source": "KRX 종가 기반 자체 계산",
        "sourceUrl": "https://www.investing.com/indices/kosdaq-historical-data",
        "direction": "down",
        "numericCurrent": 102.61,
        "numericPrevious": 102.82,
        "sourceMeta": {
          "name": "KRX 종가 기반 자체 계산",
          "url": "https://www.investing.com/indices/kosdaq-historical-data",
          "type": "market-data",
          "accessedAt": "2026-09-04"
        },
        "verified": true,
        "verificationNote": ""
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
        "current": "33.3379",
        "previous": "33.3290",
        "change": "▲ 0.0089조원",
        "changePct": "+0.03%",
        "unit": "조원",
        "asOf": "2026-08-28 · 최신 공표값",
        "source": "금융투자협회 집계·SBS 보도",
        "sourceUrl": "https://news.sbs.co.kr/amp/news.amp?news_id=N1008730358",
        "direction": "up",
        "note": "통계 공표 시차 반영 · 89억원 증가",
        "numericCurrent": 33.3379,
        "numericPrevious": 33.329,
        "sourceMeta": {
          "name": "금융투자협회 집계·SBS 보도",
          "url": "https://news.sbs.co.kr/amp/news.amp?news_id=N1008730358",
          "type": "official",
          "accessedAt": "2026-09-04"
        },
        "verified": true,
        "verificationNote": "통계 공표 시차 반영 · 89억원 증가"
      },
      {
        "label": "투자자예탁금",
        "current": "99.8138",
        "previous": "96.7091",
        "change": "▲ 3.1047조원",
        "changePct": "+3.21%",
        "unit": "조원",
        "asOf": "2026-08-28 · 최신 공표값",
        "source": "금융투자협회 집계·SBS 보도",
        "sourceUrl": "https://news.sbs.co.kr/amp/news.amp?news_id=N1008730358",
        "direction": "up",
        "note": "통계 공표 시차 반영 · 공모주 청약자금 환급 영향",
        "numericCurrent": 99.8138,
        "numericPrevious": 96.7091,
        "sourceMeta": {
          "name": "금융투자협회 집계·SBS 보도",
          "url": "https://news.sbs.co.kr/amp/news.amp?news_id=N1008730358",
          "type": "official",
          "accessedAt": "2026-09-04"
        },
        "verified": true,
        "verificationNote": "통계 공표 시차 반영 · 공모주 청약자금 환급 영향"
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
