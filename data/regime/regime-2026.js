/* Market Ledger Regime Monitor · refreshed with 2026-09-08 Daily. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-08 한국 종가 · 미국 현물시장 재개 전",
    "overallState":"경계",
    "previousState":"선별적 위험선호",
    "direction":"악화 중",
    "confidence":"보통",
    "summary":"한국 성장과 반도체 이익 방향은 견조하지만 KOSPI가 장중 7,171에서 음전했고 시장 폭, 원화와 VKOSPI가 동시에 악화됐다. 외국인·기관 순매수와 신용융자 감소는 하단을 지지하지만 중동발 유가와 미국 물가 이벤트가 남아 있어 전면적 위험회피가 아닌 경계로 판정한다.",
    "keyChanges":[
      "KOSPI는 외국인·기관의 합산 약 1.29조원 순매수에도 -0.58%로 마감했고 상승 231개·하락 634개로 Breadth가 급격히 악화됐다.",
      "USD/KRW가 1,345.6원으로 5.1원 상승하고 VKOSPI가 47.34로 10.94% 뛰어 전일의 한국 금융여건 개선이 일부 되돌려졌다.",
      "한국 2분기 실질 GDP +0.6% QoQ와 GDI +3.7% QoQ는 성장을 지지했지만 WTI·Brent 고공행진과 7,000선 공급이 좋은 매크로의 주가 전환을 막았다."
    ],
    "holdCondition":"외국인·기관 순매수는 유지되지만 VKOSPI 40 이상, 약한 Breadth와 원·달러 1,340원대 후반이 지속되는 경우",
    "changeCondition":"VKOSPI·원화·Breadth가 함께 안정되면 선별적 위험선호로 복귀하고, 외국인 매도 전환과 미국 금리·유가 상승이 겹치면 위험회피로 하향한다.",
    "sourceRefs":[
      {"type":"daily","id":"2026-09-08","label":"2026-09-08 Daily"},
      {"type":"daily","id":"2026-09-07","label":"2026-09-07 Daily"},
      {"type":"weekly","id":"2026-W36","label":"기존 기준선 · 2026-W36 Weekly"}
    ],
    "axes":[
      {
        "id":"growth",
        "label":"성장",
        "layer":"거시 레짐",
        "currentState":"성장 견조·편중",
        "previousState":"성장 견조",
        "direction":"유지",
        "confidence":"높음",
        "tone":"positive",
        "summary":"미국 고용과 서비스 수요는 견조하고 한국 2분기 GDP와 GDI도 개선됐다. 다만 한국의 성장은 반도체 수출과 교역조건에 집중됐고 건설업은 부진해 성장의 폭은 고르지 않다.",
        "evidence":["한국 2분기 실질 GDP +0.6% QoQ·+3.7% YoY","한국 실질 GDI +3.7% QoQ·+15.7% YoY","미국 8월 비농업 고용 +16.2만명·실업률 4.1%"],
        "counterEvidence":["한국 건설업 -1.9% QoQ","한국의 명목 성장과 반도체 교역조건 개선을 내수 회복으로 일반화할 수 없음","미국 ISM 서비스 고용지수 47.8로 수축"],
        "indicators":[
          {"label":"한국 실질 GDP","current":"+0.6% QoQ","previous":"속보 +0.6%","change":"수정 없음","changePct":"0.0%p","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"반도체 수출 중심의 견조한 성장"},
          {"label":"한국 실질 GDI","current":"+3.7% QoQ","previous":"+3.6% 속보","change":"+0.1%p","changePct":"—","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"교역조건 개선으로 구매력 상승"},
          {"label":"미국 비농업 고용","current":"+162K","previous":"+21K","change":"예상 +55K 상회","changePct":"—","unit":"명 · 8월","asOf":"2026-09-04 발표","source":"U.S. BLS","sourceUrl":"https://www.bls.gov/news.release/archives/empsit_09042026.htm","interpretation":"미국 수요의 견조함"}
        ],
        "asOf":"2026-09-08 한국 국민소득·9/4 미국 고용",
        "nextEvent":"한국 기업경영분석·미국 PPI/CPI",
        "holdCondition":"반도체 수출과 서비스 수요가 성장권을 유지",
        "changeCondition":"수출·신규주문·고용의 동반 둔화 또는 내수 확산",
        "sourceRefs":[{"type":"daily","id":"2026-09-08","label":"9/8 Daily"}]
      },
      {
        "id":"inflation",
        "label":"물가",
        "layer":"거시 레짐",
        "currentState":"에너지 공급 위험 확대",
        "previousState":"정제제품 공급 위험",
        "direction":"악화 중",
        "confidence":"보통",
        "tone":"negative",
        "summary":"서비스 가격과 정제제품 부족에 더해 사우디 석유시설 피격 보도로 원유 위험이 다시 커졌다. WTI와 Brent가 각각 약 94달러와 98달러로 제시됐지만 소비자물가·기대인플레이션 전가는 아직 확인되지 않았다.",
        "evidence":["대신증권 9/8 보고서의 WTI 약 94달러·Brent 약 98달러","Singapore VLSFO 약 825달러/톤과 글로벌 중유 부족 전망","ISM 서비스 가격지수 72.6"],
        "counterEvidence":["유가와 정제제품 가격의 CPI 전가는 시차와 기저효과에 좌우","평균 시급 +3.1% YoY로 급격한 임금 가속은 아님","유가 수치의 시장·관측시각은 최종 보고서 사용 전 재확인 필요"],
        "indicators":[
          {"label":"WTI","current":"약 $94","previous":"$91.22","change":"상승","changePct":"—","unit":"배럴당 달러","asOf":"2026-09-08 보고서","source":"대신증권 Strategy Daily","sourceUrl":"","interpretation":"중동 위험 프리미엄 확대"},
          {"label":"Brent","current":"약 $98","previous":"확인 필요","change":"100달러 접근","changePct":"—","unit":"배럴당 달러","asOf":"2026-09-08 보고서","source":"대신증권 Strategy Daily","sourceUrl":"","interpretation":"글로벌 공급측 물가 경계"},
          {"label":"Singapore VLSFO","current":"약 $825/t","previous":"이란 전쟁 전","change":"+76%","changePct":"+76%","unit":"톤당 달러","asOf":"2026-09-01","source":"Reuters·ZeroNorth","sourceUrl":"https://www.reuters.com/business/energy/ship-fuel-shortage-looms-refiners-strained-by-war-favour-other-products-2026-09-07/","interpretation":"운임·발전비 전가 가능성"}
        ],
        "asOf":"2026-09-08",
        "nextEvent":"미국 PPI·CPI",
        "holdCondition":"에너지 상승이 근원 서비스와 기대인플레이션으로 확산되지 않음",
        "changeCondition":"근원물가·기대인플레이션의 동반 상승 또는 원유·제품 가격 정상화",
        "sourceRefs":[{"type":"daily","id":"2026-09-08","label":"9/8 Daily"}]
      },
      {
        "id":"liquidity",
        "label":"시스템 유동성",
        "layer":"금융환경",
        "currentState":"소폭 긴축",
        "previousState":"소폭 긴축",
        "direction":"유지",
        "confidence":"보통",
        "tone":"negative",
        "summary":"미국 휴장으로 TGA·준비금·Fed 자산의 새 주간 확인값은 없다. 기존 TGA 증가와 준비금 감소가 Fed 자산 증가보다 컸고 ON RRP의 완충 여력도 제한적이라는 판단을 유지한다.",
        "evidence":["TGA 주평균 +172억달러","은행 준비금 주평균 -304억달러","ON RRP 절대잔액이 10억달러 미만"],
        "counterEvidence":["Fed 총자산은 주간 +63억달러","단기자금시장 기능 장애는 관찰되지 않음","한국 투자자예탁금은 9/7 하루 +0.3758조원"],
        "indicators":[
          {"label":"TGA · 주평균","current":"$967.935B","previous":"$950.736B","change":"+$17.199B","changePct":"+1.81%","unit":"십억달러","asOf":"2026-09-02","source":"U.S. Treasury·Daily archive","sourceUrl":"https://fiscaldata.treasury.gov/datasets/daily-treasury-statement/operating-cash-balance","interpretation":"민간 유동성 흡수"},
          {"label":"은행 준비금 · 주평균","current":"$2,894.531B","previous":"$2,924.936B","change":"-$30.405B","changePct":"-1.04%","unit":"십억달러","asOf":"2026-09-02","source":"Federal Reserve·Daily archive","sourceUrl":"https://fred.stlouisfed.org/series/WRESBAL","interpretation":"시스템 유동성 감소"},
          {"label":"ON RRP","current":"$0.702B","previous":"$0.175B","change":"+$0.527B","changePct":"—","unit":"십억달러","asOf":"2026-09-03","source":"Federal Reserve Bank of New York","sourceUrl":"https://www.newyorkfed.org/markets/desk-operations/reverse-repo","interpretation":"완충 여력 제한"}
        ],
        "asOf":"2026-09-03 최신 확보값",
        "nextEvent":"장기물 Buyback·주간 Fed 유동성 통계",
        "holdCondition":"준비금 감소가 가속하지 않고 자금시장 기능이 정상",
        "changeCondition":"준비금 급감·자금시장 스트레스 또는 TGA 하락으로 순유동성 전환",
        "sourceRefs":[{"type":"daily","id":"2026-09-04","label":"9/4 Daily"}]
      },
      {
        "id":"financial-conditions",
        "label":"시장 금융여건",
        "layer":"금융환경",
        "currentState":"긴축 재강화",
        "previousState":"소폭 긴축",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"미국 금리의 새 종가는 없지만 한국에서는 원화 약세, VKOSPI 급등과 높은 국내 금리가 동시에 나타났다. 9월 FOMC 인상 기대와 유가 부담도 남아 전일의 완화 신호가 이어지지 못했다.",
        "evidence":["USD/KRW 1,345.6원으로 +5.1원","VKOSPI 47.34로 +10.94%","국고채 3년 3.901%·회사채 3년 AA- 4.575%"],
        "counterEvidence":["KOSPI 외국인·기관 순매수 지속","신용융자잔고 하루 -1.21%","미국 신용스프레드의 새 악화는 미확인"],
        "indicators":[
          {"label":"USD/KRW","current":"1,345.60원","previous":"1,340.50원","change":"+5.10원","changePct":"+0.38%","unit":"원","asOf":"2026-09-08 15:30","source":"서울외환시장·서울신문","sourceUrl":"https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277","interpretation":"한국 외국인 환율 부담 재확대"},
          {"label":"VKOSPI","current":"47.34","previous":"42.67","change":"+4.67","changePct":"+10.94%","unit":"index","asOf":"2026-09-08 종가","source":"Investing.com 시장 시세","sourceUrl":"https://kr.investing.com/analysis/article-200458940","interpretation":"국내 주식 변동성 스트레스 확대"},
          {"label":"국고채 3년","current":"3.901%","previous":"3.900%","change":"+0.1bp","changePct":"+0.03%","unit":"%","asOf":"2026-09-08","source":"금융투자협회 FreeSIS","sourceUrl":"https://freesis.kofia.or.kr/stat/main.do","interpretation":"높은 할인율 유지"},
          {"label":"미국 10년물","current":"4.784%","previous":"4.730%","change":"+5.4bp","changePct":"—","unit":"%","asOf":"2026-09-04 / 8월 말","source":"9/7 Daily","sourceUrl":"","interpretation":"미국 휴장으로 마지막 확인값 유지"}
        ],
        "asOf":"2026-09-08 한국장·미국 9/4 종가",
        "nextEvent":"미국 장기물 Buyback·PPI·CPI",
        "holdCondition":"원화·변동성이 현재 범위에 머물고 외국인 수급이 유지",
        "changeCondition":"달러·금리·변동성의 동반 안정 또는 신용·환율의 추가 악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-08","label":"9/8 Daily"}]
      },
      {
        "id":"global-risk",
        "label":"글로벌 위험선호",
        "layer":"시장 확인",
        "currentState":"후속 확인 대기",
        "previousState":"기술주 선별 강세",
        "direction":"악화 중",
        "confidence":"낮음",
        "tone":"neutral",
        "summary":"Astra와 반도체 기대의 미국 현물시장 후속 반응은 한국장 마감 시점까지 확인되지 않았다. 한국·일본·대만의 반도체 차익실현과 홍콩 약세는 아시아 위험선호가 약해졌음을 보여주지만 미국장 확인 전 글로벌 위험회피로 확정하지 않는다.",
        "evidence":["Nikkei225 -1.7%·TAIEX 약 -0.5%","KOSPI -0.58%·KOSDAQ -1.25%","중동 유가와 미·캐나다 무역 불확실성 확대"],
        "counterEvidence":["미국 9/8 현물시장은 한국장 마감 뒤 재개","Astra·메모리 수요의 중기 실적 논리는 유지","한국 외국인·기관 순매수 지속"],
        "indicators":[
          {"label":"Nikkei225","current":"-1.70%","previous":"+2%대 반등","change":"하락 전환","changePct":"-1.70%","unit":"일간","asOf":"2026-09-08","source":"대신증권 Strategy Daily","sourceUrl":"","interpretation":"아시아 기술주 차익실현"},
          {"label":"TAIEX","current":"약 -0.5%","previous":"+1.67%","change":"하락 전환","changePct":"약 -0.5%","unit":"일간","asOf":"2026-09-08","source":"제공 마감 시황","sourceUrl":"","interpretation":"반도체 위험선호 둔화"},
          {"label":"S&P500","current":"7,718.60","previous":"7,686.14","change":"+0.42%","changePct":"+0.42%","unit":"index","asOf":"2026-09-04 / 8월 말","source":"9/7 Daily","sourceUrl":"","interpretation":"미국 휴장으로 마지막 확인값 유지"}
        ],
        "asOf":"2026-09-08 한국장",
        "nextEvent":"미국 현물시장 재개",
        "holdCondition":"미국 기술주·신용시장의 후속 확인 전",
        "changeCondition":"미국 시장 폭·반도체·크레딧의 동반 개선 또는 동반 악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-08","label":"9/8 Daily"}]
      },
      {
        "id":"korea-transmission",
        "label":"한국시장 전달",
        "layer":"시장 확인",
        "currentState":"장중 반락·약한 Breadth",
        "previousState":"대형 반도체 집중 강세",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"외국인·기관 순매수는 이어졌지만 매수 규모가 줄었고 KOSPI는 장중 7,171에서 음전했다. 하락 종목이 상승 종목의 2.7배였고 KOSDAQ 수급도 약해 전일의 반도체 집중 상승이 시장 전체로 확산되지 못했다.",
        "evidence":["KOSPI 6,954.52(-0.58%), 장중 고점 7,171.52","상승 231개·하락 634개","VKOSPI 47.34(+10.94%)·USD/KRW 1,345.6원"],
        "counterEvidence":["외국인 +6,449억원·기관 +6,496억원 순매수","신용융자 -0.4055조원·예탁금 +0.3758조원","원전·건설주는 공식 프로젝트 기대에 상대강세"],
        "indicators":[
          {"label":"KOSPI","current":"6,954.52","previous":"6,995.39","change":"-40.87","changePct":"-0.58%","unit":"index","asOf":"2026-09-08 종가","source":"한국거래소·서울신문","sourceUrl":"https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277","interpretation":"장중 7,000선 돌파 후 음전"},
          {"label":"KOSPI 외국인 현물","current":"+6,449억원","previous":"+25,869억원","change":"-19,420억원","changePct":"순매수 축소","unit":"억원 · 순매수","asOf":"2026-09-08 종가","source":"한국거래소·서울신문","sourceUrl":"https://www.seoul.co.kr/news/economy/securities/2026/09/08/20260908500277","interpretation":"순매수는 유지됐지만 강도 둔화"},
          {"label":"투자자예탁금","current":"93.9258조원","previous":"93.5500조원","change":"+0.3758조원","changePct":"+0.40%","unit":"조원","asOf":"2026-09-07 최신값","source":"금융투자협회 FreeSIS","sourceUrl":"https://freesis.kofia.or.kr/stat/main.do","interpretation":"대기자금 하루 기준 소폭 회복"},
          {"label":"신용융자","current":"33.1903조원","previous":"33.5958조원","change":"-0.4055조원","changePct":"-1.21%","unit":"조원","asOf":"2026-09-07 최신값","source":"금융투자협회 FreeSIS","sourceUrl":"https://freesis.kofia.or.kr/stat/main.do","interpretation":"레버리지 부담 하루 기준 완화"}
        ],
        "asOf":"2026-09-08 한국장",
        "nextEvent":"9월 10일 한국 선물옵션 만기",
        "holdCondition":"외국인 순매수에도 Breadth와 변동성이 개선되지 않음",
        "changeCondition":"시장 폭·KOSDAQ 수급·원화가 동반 개선하거나 외국인 매도가 재개",
        "sourceRefs":[{"type":"daily","id":"2026-09-08","label":"9/8 Daily"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-09","title":"미국 장기물 Buyback·10년물 입찰","why":"재무부 유동성 지원과 장기물 수요가 기간 프리미엄을 낮추는지 확인","axisIds":["liquidity","financial-conditions","global-risk"]},
      {"date":"2026-09-10","title":"미국 PPI·한국 선물옵션 만기","why":"기업 단계 가격압력과 국내 프로그램 수급을 함께 확인","axisIds":["inflation","financial-conditions","korea-transmission"]},
      {"date":"2026-09-11","title":"미국 CPI","why":"FOMC 직전 물가 경로와 금리·달러 방향을 가를 핵심 이벤트","axisIds":["growth","inflation","financial-conditions","global-risk"]}
    ]
  },
  "history":[
    {
      "date":"2026-09-08",
      "overallState":"경계",
      "previousState":"선별적 위험선호",
      "direction":"악화 중",
      "summary":"외국인·기관 순매수에도 KOSPI가 장중 7,171에서 음전했고 Breadth·원화·VKOSPI가 함께 악화돼 경계로 되돌렸다.",
      "changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],
      "sourceDaily":"2026-09-08"
    },
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
