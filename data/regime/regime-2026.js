/* Market Ledger Regime Monitor · refreshed with 2026-09-07 Daily and verified market data. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-07 한국 종가 · 미국 현물시장 휴장",
    "overallState":"선별적 위험선호",
    "previousState":"경계",
    "direction":"개선 중",
    "confidence":"보통",
    "summary":"미국 고용이 견조한 가운데 GPT-6 Astra와 메모리 이익 기대가 반도체 수요를 자극했고, 원화 강세와 외국인·기관 매수로 KOSPI가 급등했다. 그러나 시장 폭과 KOSDAQ 수급은 지수만큼 강하지 않고 시스템 유동성·장기금리·정제제품 공급 부담도 남아 있어 전면적 위험선호가 아니라 반도체 중심의 선별적 개선으로 판단한다.",
    "keyChanges":[
      "외국인·기관의 KOSPI 현물 순매수가 합산 5조원을 넘고 원·달러가 1,340.5원으로 낮아지면서 한국시장 전달 축이 강하게 개선됐다.",
      "KOSPI +4.61%와 달리 상승 종목 비중은 약 52.5%, KOSDAQ은 외국인·기관 순매도로 대형 반도체 집중형 상승이 확인됐다.",
      "정유사의 디젤·휘발유 생산 우선으로 선박용 중유까지 부족해지면서 공급측 물가 위험이 원유에서 운임·발전비 경로로 넓어졌다."
    ],
    "holdCondition":"반도체 이익 추정치와 외국인 현물·선물 매수가 유지되고 원·달러가 안정되며, 미국 물가가 장기금리와 달러를 다시 급등시키지 않는 경우",
    "changeCondition":"상승 종목과 비반도체 이익 상향이 넓어지면 광범위한 위험선호로 개선하고, 반대로 미국 물가·정제제품 가격과 금리가 함께 오르며 외국인 매수가 역전되면 경계로 되돌린다.",
    "sourceRefs":[
      {"type":"daily","id":"2026-09-07","label":"2026-09-07 Daily"},
      {"type":"daily","id":"2026-09-04","label":"2026-09-04 Daily"},
      {"type":"weekly","id":"2026-W36","label":"2026-W36 Weekly"}
    ],
    "axes":[
      {
        "id":"growth",
        "label":"성장",
        "layer":"거시 레짐",
        "currentState":"성장 견조",
        "previousState":"완만한 성장",
        "direction":"개선 중",
        "confidence":"높음",
        "tone":"positive",
        "summary":"서비스 수요와 8월 고용은 침체보다 견조한 확장에 가깝다. 제조업·건설 고용이 개선됐지만 정보업은 감소했고, 한국에서도 AI 연관 제조업 생산과 가계소비의 온도차가 커 성장의 폭은 고르지 않다.",
        "evidence":["8월 비농업 고용 +16.2만명, 실업률 4.1%","제조업 +1.6만명·건설업 +2.2만명, 제조업 3개월 평균 약 +1.43만명","ISM 서비스업 PMI 55.4, 기업활동 61.7, 신규주문 60.9"],
        "counterEvidence":["정보업 고용 -2.3만명, 컴퓨팅 인프라·데이터처리·웹호스팅 -0.8만명","KDI는 한국의 AI 연관 생산 개선이 가계소득과 소비에 충분히 파급되지 않았다고 평가","ISM 서비스업 고용지수 47.8로 수축"],
        "indicators":[
          {"label":"비농업 고용","current":"+162K","previous":"+21K","change":"예상 +55K 상회","changePct":"—","unit":"명 · 8월","asOf":"2026-09-04 발표","source":"2026-09-04 Daily","sourceUrl":"","interpretation":"노동시장과 수요의 견조함"},
          {"label":"실업률","current":"4.1%","previous":"4.1%","change":"0.0%p","changePct":"0.00%","unit":"%","asOf":"2026-09-04 발표","source":"2026-09-04 Daily","sourceUrl":"","interpretation":"완전고용에 가까운 노동시장"},
          {"label":"제조업 고용","current":"+16K","previous":"+14K","change":"+2K","changePct":"—","unit":"명 · 8월","asOf":"2026-09-04 발표","source":"U.S. BLS","sourceUrl":"https://www.bls.gov/news.release/archives/empsit_09042026.htm","interpretation":"기계·금속가공 중심의 완만한 개선"},
          {"label":"ISM 서비스업 PMI","current":"55.4","previous":"54.1","change":"+1.3","changePct":"+2.40%","unit":"index","asOf":"2026-09-03 미국 발표","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"26개월 연속 서비스업 확장"}
        ],
        "asOf":"2026-09-04 미국 고용보고서",
        "nextEvent":"미국 CPI·PPI",
        "holdCondition":"서비스 신규주문과 고용이 확장권을 유지",
        "changeCondition":"신규주문·고용·이익 전망의 동반 둔화",
        "sourceRefs":[{"type":"daily","id":"2026-09-07","label":"9/7 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"inflation",
        "label":"물가",
        "layer":"거시 레짐",
        "currentState":"정제제품 공급 위험",
        "previousState":"둔화 정체",
        "direction":"악화 중",
        "confidence":"보통",
        "tone":"negative",
        "summary":"임금은 급격히 가속하지 않았지만 서비스 가격과 정제제품 공급 압력이 함께 남아 있다. 선박용 중유 부족과 VLSFO 급등은 운임·발전비 경로를 강화하지만 광범위한 소비자물가 전가는 다음 CPI와 기대인플레이션으로 확인해야 한다.",
        "evidence":["ISM 서비스 가격지수 72.6으로 전월보다 2.3포인트 상승","Reuters 인용 기준 Singapore VLSFO가 이란 전쟁 이후 76% 상승","Energy Aspects는 3분기 글로벌 중유 부족을 일 21.8만배럴로 전망"],
        "counterEvidence":["8월 평균 시급 +0.3% MoM·+3.1% YoY로 급격한 임금 가속은 아님","중유 부족과 가격 수치는 민간 추정이며 CPI·기대인플레이션 전가는 미확인","경기 둔화와 정유설비 복구가 제품 스프레드를 정상화할 수 있음"],
        "indicators":[
          {"label":"ISM 서비스 가격","current":"72.6","previous":"70.3","change":"+2.3","changePct":"+3.27%","unit":"index","asOf":"2026-09-03 미국 발표","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"서비스 비용 압력 확대"},
          {"label":"WTI","current":"$91.22","previous":"$91.67","change":"-$0.45","changePct":"-0.49%","unit":"배럴당 달러","asOf":"2026-09-04 제공 시세","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"하루 조정에도 90달러대 유지"},
          {"label":"평균 시급","current":"+0.3% MoM","previous":"+0.2% MoM","change":"+0.1%p","changePct":"—","unit":"%","asOf":"2026-09-04 발표","source":"2026-09-04 Daily","sourceUrl":"","interpretation":"급격한 임금 가속은 아님"}
          ,{"label":"Singapore VLSFO","current":"약 $825/t","previous":"이란 전쟁 전","change":"+76%","changePct":"+76%","unit":"톤당 달러","asOf":"2026-09-01","source":"Reuters·ZeroNorth","sourceUrl":"https://www.reuters.com/business/energy/ship-fuel-shortage-looms-refiners-strained-by-war-favour-other-products-2026-09-07/","interpretation":"원유보다 강한 선박연료 비용 압력"}
        ],
        "asOf":"2026-09-07 · 일부 시장값 9/4",
        "nextEvent":"미국 PPI·CPI",
        "holdCondition":"에너지 상승이 근원 서비스와 기대인플레이션으로 확산되지 않음",
        "changeCondition":"근원물가·임금·기대인플레이션의 동반 상승 또는 공급가격 정상화",
        "sourceRefs":[{"type":"daily","id":"2026-09-07","label":"9/7 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"liquidity",
        "label":"시스템 유동성",
        "layer":"금융환경",
        "currentState":"소폭 긴축",
        "previousState":"판정 유보",
        "direction":"악화 중",
        "confidence":"보통",
        "tone":"negative",
        "summary":"TGA 증가와 은행 준비금 감소가 Fed 자산 증가보다 커 시스템 유동성의 순방향은 소폭 긴축이었다. ON RRP 잔액은 낮아 추가 완충 여력도 제한적이다.",
        "evidence":["TGA 주평균 +172억달러","은행 준비금 주평균 -304억달러","Fed 총자산 +63억달러"],
        "counterEvidence":["Fed 총자산은 소폭 증가","단기자금시장의 뚜렷한 스트레스는 관찰되지 않음"],
        "indicators":[
          {"label":"TGA · 주평균","current":"$967.935B","previous":"$950.736B","change":"+$17.199B","changePct":"+1.81%","unit":"십억달러","asOf":"2026-09-02","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"민간 유동성 흡수"},
          {"label":"은행 준비금 · 주평균","current":"$2,894.531B","previous":"$2,924.936B","change":"-$30.405B","changePct":"-1.04%","unit":"십억달러","asOf":"2026-09-02","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"시스템 유동성 감소"},
          {"label":"Fed 총자산","current":"$6,737.204B","previous":"$6,730.912B","change":"+$6.292B","changePct":"+0.09%","unit":"십억달러","asOf":"2026-09-02","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"TGA·준비금 변화를 상쇄하기에는 작음"},
          {"label":"ON RRP","current":"$0.702B","previous":"$0.175B","change":"+$0.527B","changePct":"—","unit":"십억달러","asOf":"2026-09-03","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"절대 잔액이 낮아 완충 여력 제한"}
        ],
        "asOf":"2026-09-03 최신 확보값",
        "nextEvent":"재무부 장기물 Buyback·주간 Fed 유동성 통계",
        "holdCondition":"TGA와 준비금 변화가 현재 범위에 머물고 자금시장 기능이 정상",
        "changeCondition":"준비금 감소 가속 또는 TGA 하락·Fed 자산 증가로 순유동성 방향 전환",
        "sourceRefs":[{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"financial-conditions",
        "label":"시장 금융여건",
        "layer":"금융환경",
        "currentState":"소폭 긴축",
        "previousState":"중립",
        "direction":"유지",
        "confidence":"높음",
        "tone":"negative",
        "summary":"미국 고용 발표 뒤 2년물과 장기금리가 반등해 달러 조달비용은 여전히 높다. 9월 7일 미국 현물시장이 휴장해 새 확인값은 없지만 원화 강세가 한국 외국인 수급을 완화해 글로벌 긴축과 한국 금융여건이 엇갈렸다.",
        "evidence":["미국 2년물 4.374%로 전주 말보다 3.4bp 상승","미국 10년물 4.784%로 전주 말보다 5.4bp 상승","IG OAS +2bp, HY OAS +5bp"],
        "counterEvidence":["SOFR 상승은 1bp에 그침","VIX는 14.07로 전일보다 0.25포인트 하락","USD/KRW가 1,340.5원으로 하락해 한국의 외국인 환율 부담 완화"],
        "indicators":[
          {"label":"미국 2년물","current":"4.374%","previous":"4.340%","change":"+3.4bp","changePct":"—","unit":"%","asOf":"2026-09-04 / 2026-08-28","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"고용 후 인상 기대 반영"},
          {"label":"미국 10년물","current":"4.784%","previous":"4.730%","change":"+5.4bp","changePct":"—","unit":"%","asOf":"2026-09-04 / 2026-08-28","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"정책·공급·물가 부담 병존"},
          {"label":"HY OAS","current":"2.65%p","previous":"2.60%p","change":"+5bp","changePct":"—","unit":"%p","asOf":"2026-09-03 / 2026-08-28","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"완만한 악화, 경색은 아님"},
          {"label":"VIX","current":"14.07","previous":"14.32","change":"-0.25","changePct":"-1.75%","unit":"index","asOf":"2026-09-04 미국 종가","source":"Dashboard","sourceUrl":"https://ca.investing.com/indices/volatility-s-p-500-historical-data?cid=1096487","interpretation":"주식 변동성 스트레스는 제한적"}
        ],
        "asOf":"2026-09-04 미국장 · 9/7 미국 휴장",
        "nextEvent":"미국 PPI·CPI",
        "holdCondition":"신용스프레드와 단기자금시장이 안정 범위를 유지",
        "changeCondition":"실질금리·달러·HY 스프레드의 동반 상승 또는 정책 기대 완화로 반대 전환",
        "sourceRefs":[{"type":"daily","id":"2026-09-07","label":"9/7 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"global-risk",
        "label":"글로벌 위험선호",
        "layer":"시장 확인",
        "currentState":"기술주 선별 강세",
        "previousState":"혼조",
        "direction":"개선 중",
        "confidence":"보통",
        "tone":"neutral",
        "summary":"9월 4일 미국 현물시장은 S&P500·다우 약세와 Nasdaq100·반도체 강세가 엇갈렸다. Astra 출시와 메모리 수요 기대는 기술주를 지지하지만 높은 금리 아래 지수 전체보다 반도체와 AI 인프라에 수요가 집중되는 장세다.",
        "evidence":["9월 4일 필라델피아 반도체지수 +3.37%","Nasdaq100 +0.21%로 대형 기술주 상대강세","9월 7일 한국에서 반도체·전력 인프라로 해외 기술주 강세가 전달"],
        "counterEvidence":["9월 4일 S&P500 -0.38%, 다우 -0.51%","Astra 벤치마크 우위는 AI 서비스 매출·FCF와 인프라 한계 ROI의 직접 증거가 아님","9월 7일 미국 현물시장 휴장으로 한국 급등 뒤 글로벌 후속 가격 확인이 없음"],
        "indicators":[
          {"label":"S&P500","current":"7,718.60","previous":"7,686.14","change":"+0.42%","changePct":"+0.42%","unit":"index","asOf":"2026-09-04 / 2026-08-31","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"부분기간 상승, 정식 주간 수익률 아님"},
          {"label":"9/4 S&P500","current":"-0.38%","previous":"고용 발표 전","change":"하락","changePct":"-0.38%","unit":"일간","asOf":"2026-09-04 미국장","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"금리 부담 반영"},
          {"label":"9/4 Nasdaq100","current":"+0.21%","previous":"고용 발표 전","change":"상승","changePct":"+0.21%","unit":"일간","asOf":"2026-09-04 미국장","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"기술주 내부 상대강세"}
        ],
        "asOf":"2026-09-04 미국장",
        "nextEvent":"미국 현물시장 재개·PPI·CPI와 국채시장 반응",
        "holdCondition":"신용스프레드 안정과 기술주 이익 기대 유지",
        "changeCondition":"시장 폭·소형주·신용의 동반 개선 또는 주식·크레딧의 동반 악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-07","label":"9/7 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"korea-transmission",
        "label":"한국시장 전달",
        "layer":"시장 확인",
        "currentState":"대형 반도체 집중 강세",
        "previousState":"수급 개선",
        "direction":"개선 중",
        "confidence":"보통",
        "tone":"positive",
        "summary":"원화 강세와 외국인·기관의 5조원대 KOSPI 순매수로 지수는 7,000선 직전까지 급등했다. 그러나 상승 종목 비중은 52.5%에 그쳤고 KOSDAQ에서는 외국인·기관이 순매도해 위험선호의 폭보다 반도체 대형주의 지수 영향력이 컸다.",
        "evidence":["KOSPI +4.61%, 외국인 +2조5,869억원·기관 +2조6,327억원","삼성전자 +5.68%, SK하이닉스 +8.26%","USD/KRW 1,340.5원으로 9.9원 하락","프로그램 매매 +1조8,602억원"],
        "counterEvidence":["KOSPI 상승 종목 비중 약 52.5%, KOSDAQ 약 50.8%","KOSDAQ 외국인 -717억원·기관 -1,310억원","개인 KOSPI -6조8,212억원으로 대규모 차익실현","VKOSPI 9/7 정확값과 외국인 선물 누적은 미확보"],
        "indicators":[
          {"label":"KOSPI","current":"6,995.39","previous":"6,687.21","change":"+308.18","changePct":"+4.61%","unit":"index","asOf":"2026-09-07 종가","source":"한국거래소·연합뉴스","sourceUrl":"https://www.yna.co.kr/amp/view/AKR20260907128900008","interpretation":"반도체 주도의 급등"},
          {"label":"KOSPI 외국인 현물","current":"+25,869억원","previous":"+4,793억원","change":"+21,076억원","changePct":"순매수 확대","unit":"억원 · 순매수","asOf":"2026-09-07 종가","source":"한국거래소·연합뉴스","sourceUrl":"https://www.yna.co.kr/amp/view/AKR20260907128900008","interpretation":"대형주 현물 수요 급증"},
          {"label":"USD/KRW","current":"1,340.50원","previous":"1,350.40원","change":"-9.90원","changePct":"-0.73%","unit":"원","asOf":"2026-09-07 15:30","source":"서울외환시장·연합뉴스","sourceUrl":"https://www.yna.co.kr/amp/view/AKR20260907128900008","interpretation":"외국인 환율 부담 완화"},
          {"label":"VKOSPI","current":"39.33","previous":"42.42","change":"-3.09","changePct":"-7.28%","unit":"index","asOf":"2026-09-04 종가","source":"Dashboard","sourceUrl":"https://www.yna.co.kr/amp/view/AKR20260904100851008","interpretation":"국내 변동성 완화"},
          {"label":"투자자예탁금","current":"97.7615조원","previous":"102.2672조원","change":"-4.5057조원","changePct":"-4.41%","unit":"조원","asOf":"2026-09-03 최신 공표값","source":"금융투자협회 FreeSIS","sourceUrl":"https://freesis.kofia.or.kr/stat/main.do","interpretation":"대기자금 감소, 원인은 별도 확인 필요"}
        ],
        "asOf":"2026-09-07 한국장",
        "nextEvent":"미국 현물시장 재개·9월 10일 한국 선물옵션 만기",
        "holdCondition":"외국인 현물·선물 매수가 이어지고 반도체 제외 상승 종목·이익 상향이 확산",
        "changeCondition":"KOSDAQ과 시장 폭이 동반 개선하면 광범위한 위험선호로 상향하고, 원화 약세·외국인 매도·VKOSPI 상승이 겹치면 경계로 하향",
        "sourceRefs":[{"type":"daily","id":"2026-09-07","label":"9/7 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-08","title":"미국 현물시장 재개·한국 2분기 GDP 확정치","why":"한국의 반도체 중심 급등이 미국 기술주와 금리시장에서도 후속 확인되는지 점검","axisIds":["growth","financial-conditions","global-risk","korea-transmission"]},
      {"date":"2026-09-10","title":"미국 PPI·한국 선물옵션 만기","why":"기업 단계 가격압력과 국내 프로그램 수급을 함께 확인","axisIds":["inflation","financial-conditions","korea-transmission"]},
      {"date":"2026-09-11","title":"미국 CPI","why":"FOMC 직전 물가 경로와 금리·달러 방향을 가를 핵심 이벤트","axisIds":["growth","inflation","financial-conditions","global-risk"]}
    ]
  },
  "history":[
    {
      "date":"2026-09-07",
      "overallState":"선별적 위험선호",
      "previousState":"경계",
      "direction":"개선 중",
      "summary":"Astra·메모리 기대, 원화 강세와 외국인·기관 매수로 한국 반도체가 급등했지만 시장 폭과 KOSDAQ 수급은 제한돼 선별적 개선으로 판정했다.",
      "changedAxes":["성장","물가","글로벌 위험선호","한국시장 전달"],
      "sourceDaily":"2026-09-07",
      "sourceWeekly":"2026-W36"
    },
    {
      "date":"2026-09-05",
      "overallState":"경계",
      "previousState":"중립",
      "direction":"악화 중",
      "summary":"미국 고용 호조로 금리 인상 기대와 단기금리·달러가 반등해 주중 완화 흐름이 되돌려졌다.",
      "changedAxes":["물가","시장 금융여건","글로벌 위험선호"],
      "sourceDaily":"2026-09-04",
      "sourceWeekly":"2026-W36"
    }
  ]
};
