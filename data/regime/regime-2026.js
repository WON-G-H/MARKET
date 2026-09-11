/* Market Ledger Regime Monitor · refreshed with 2026-09-11 Daily. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-11 한국 종가 · 미국 CPI 발표 전",
    "overallState":"위험회피",
    "previousState":"경계",
    "direction":"악화 중",
    "confidence":"높음",
    "summary":"KOSPI는 6,909.91(-1.76%), KOSDAQ은 820.64(-1.95%)로 동반 하락했고 KOSPI는 7천선을 다시 이탈했다. 외국인과 기관이 KOSPI에서 각각 약 2.29조원, 1.22조원을 순매도했고 KOSDAQ도 하락 종목이 1,004개로 상승 607개를 크게 웃돌았다. 전일 미국 10년물 4.9626%, WTI 10월물 102.48달러와 8월 PPI의 에너지·운송비 확산이 금융여건을 압박했다. 장중 저점 반등과 수출 호조, Oracle의 강한 AI 계약 잔고는 반대 근거지만 가격·수급·시장 폭이 함께 악화돼 경계에서 위험회피로 하향한다.",
    "keyChanges":[
      "KOSPI 7천선 이탈과 KOSDAQ 동반 하락, KOSPI 외국인·기관 동반 순매도로 국내 위험회피 신호가 강화됐다.",
      "미국 2년물 4.5856%, 10년물 4.9626%와 WTI 102.48달러가 할인율과 실질소득 부담을 동시에 높였다.",
      "BLS 8월 PPI에서 디젤 +24.1%, 운송·창고 서비스 +2.3%, 화물트럭 운송 +2.0%가 확인돼 제품가격의 물류비 전가가 시작됐다."
    ],
    "holdCondition":"KOSPI가 7천선 아래에 머물고 외국인·기관 매도, 높은 미국 금리·원유, 약한 시장 폭이 지속되는 경우",
    "changeCondition":"CPI 둔화와 금리·원유 안정, 외국인 수급 회복이 겹치면 경계로 상향하고, 물가 상방과 신용·원화 스트레스까지 확대되면 위험회피 강도를 높인다.",
    "sourceRefs":[
      {"type":"daily","id":"2026-09-11","label":"2026-09-11 Daily"},
      {"type":"daily","id":"2026-09-10","label":"2026-09-10 Daily"},
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
        "summary":"한국 9월 1~10일 수출은 349.73억달러로 전년 대비 82.6% 늘었고 반도체 수출은 164.83억달러로 270.1% 증가했다. 조업일수가 전년과 같은 8.5일이라 방향성은 강하지만 반도체가 전체의 47.1%를 차지해 성장의 폭은 편중됐다. 고유가·고금리가 비반도체 수요를 제약할 수 있어 견조하되 편중된 성장 판정을 유지한다.",
        "evidence":["9월 1~10일 수출 $34.973bn·+82.6% YoY","반도체 수출 $16.483bn·+270.1% YoY·전체 47.1%","한국 2분기 실질 GDP +0.6% QoQ"],
        "counterEvidence":["한국 건설업 -1.9% QoQ","한국의 명목 성장과 반도체 교역조건 개선을 내수 회복으로 일반화할 수 없음","미국 ISM 서비스 고용지수 47.8로 수축"],
        "indicators":[
          {"label":"한국 실질 GDP","current":"+0.6% QoQ","previous":"속보 +0.6%","change":"수정 없음","changePct":"0.0%p","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"반도체 수출 중심의 견조한 성장"},
          {"label":"한국 실질 GDI","current":"+3.7% QoQ","previous":"+3.6% 속보","change":"+0.1%p","changePct":"—","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"교역조건 개선으로 구매력 상승"},
          {"label":"9월 1~10일 수출","current":"$34.973B","previous":"$19.155B","change":"+$15.818B","changePct":"+82.6% YoY","unit":"달러 · 8.5일","asOf":"2026-09-11 발표","source":"관세청","sourceUrl":"https://www.thepowernews.co.kr/view.php?ud=20260911091621701de3f0aa1be_7","interpretation":"반도체 중심 수출 모멘텀 강세"}
        ],
        "asOf":"2026-09-11 한국 9월 초 수출·9/8 국민소득",
        "nextEvent":"미국 CPI·Oracle 실적",
        "holdCondition":"반도체 수출과 서비스 수요가 성장권을 유지",
        "changeCondition":"수출·신규주문·고용의 동반 둔화 또는 내수 확산",
        "sourceRefs":[{"type":"daily","id":"2026-09-11","label":"9/11 Daily"}]
      },
      {
        "id":"inflation",
        "label":"물가",
        "layer":"거시 레짐",
        "currentState":"에너지·PPI 압력 확대",
        "previousState":"에너지 공급 위험 확대",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"WTI 102.48달러와 미국 8월 최종수요 PPI +5.4% YoY·+0.4% MoM이 공급측 물가 위험을 강화했다. BLS 세부표에서 최종수요 상품 +1.1%, 에너지 상품 +4.2%, 디젤 +24.1%, 운송·창고 서비스 +2.3%, 화물트럭 운송 +2.0%가 확인돼 정제제품 충격이 물류비로 번지는 초기 직접 증거가 생겼다.",
        "evidence":["WTI $102.48","미국 8월 최종수요 PPI +5.4% YoY·+0.4% MoM","BLS 디젤 +24.1%·운송·창고 서비스 +2.3%·화물트럭 운송 +2.0%"],
        "counterEvidence":["식품·에너지·무역서비스 제외 최종수요는 +0.3% MoM","소비자물가·기대인플레이션 전가는 아직 미확인","에너지 공급 정상화 시 제품가격 충격이 되돌려질 수 있음"],
        "indicators":[
          {"label":"WTI","current":"$102.48","previous":"$100.24","change":"+$2.24","changePct":"+2.23%","unit":"배럴당 달러","asOf":"2026-09-11 한국장 이후 확보값","source":"시장 시세","sourceUrl":"","interpretation":"에너지발 비용·금리 압력 확대"},
          {"label":"미국 8월 PPI","current":"+5.4% YoY","previous":"+4.7% YoY","change":"+0.7%p","changePct":"+0.4% MoM","unit":"Final demand","asOf":"2026-09-10 발표","source":"U.S. BLS","sourceUrl":"https://www.bls.gov/news.release/archives/ppi_09102026.htm","interpretation":"최종수요 헤드라인 압력 확대"},
          {"label":"미국 디젤 재고","current":"1억배럴 하회 전망","previous":"—","change":"2003년 이후 최저 가능성","changePct":"—","unit":"배럴","asOf":"2026-09-09 EIA 전망 인용","source":"Bloomberg·EIA","sourceUrl":"","interpretation":"제품 공급 단계의 직접 압박"}
        ],
        "asOf":"2026-09-11 한국 종가 이후",
        "nextEvent":"미국 CPI",
        "holdCondition":"원유·제품가격은 높지만 core CPI·기대인플레이션으로의 확산은 제한",
        "changeCondition":"CPI·기대인플레이션의 동반 상승이면 추가 악화, 원유·크랙스프레드 정상화면 완화",
        "sourceRefs":[{"type":"daily","id":"2026-09-11","label":"9/11 Daily"}]
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
        "summary":"TGA·준비금·Fed 자산의 새 주간 원시값은 확보하지 못해 기존 소폭 긴축 판정을 유지한다. 장기물 Buyback 확대는 유동성 지원이지만 매입분을 신규 발행으로 대체하므로 시스템 순유동성 완화로 승격하지 않는다.",
        "evidence":["TGA 주평균 +172억달러","은행 준비금 주평균 -304억달러","2026년 3분기 순시장성 차입 전망 $739bn"],
        "counterEvidence":["Fed 총자산은 주간 +63억달러","장기물 Buyback 회당 최소 $4bn·당일 최대 $6bn","단기자금시장 기능 장애는 관찰되지 않음"],
        "indicators":[
          {"label":"TGA · 주평균","current":"$967.935B","previous":"$950.736B","change":"+$17.199B","changePct":"+1.81%","unit":"십억달러","asOf":"2026-09-02","source":"U.S. Treasury·Daily archive","sourceUrl":"https://fiscaldata.treasury.gov/datasets/daily-treasury-statement/operating-cash-balance","interpretation":"민간 유동성 흡수"},
          {"label":"은행 준비금 · 주평균","current":"$2,894.531B","previous":"$2,924.936B","change":"-$30.405B","changePct":"-1.04%","unit":"십억달러","asOf":"2026-09-02","source":"Federal Reserve·Daily archive","sourceUrl":"https://fred.stlouisfed.org/series/WRESBAL","interpretation":"시스템 유동성 감소"},
          {"label":"ON RRP","current":"$0.702B","previous":"$0.175B","change":"+$0.527B","changePct":"—","unit":"십억달러","asOf":"2026-09-03","source":"Federal Reserve Bank of New York","sourceUrl":"https://www.newyorkfed.org/markets/desk-operations/reverse-repo","interpretation":"완충 여력 제한"}
        ],
        "asOf":"2026-09-03 최신 확보값",
        "nextEvent":"주간 Fed 유동성 통계·9월 세금 납부",
        "holdCondition":"준비금 감소가 가속하지 않고 자금시장 기능이 정상",
        "changeCondition":"준비금 급감·자금시장 스트레스 또는 TGA 하락으로 순유동성 전환",
        "sourceRefs":[{"type":"daily","id":"2026-09-11","label":"9/11 Daily"}]
      },
      {
        "id":"financial-conditions",
        "label":"시장 금융여건",
        "layer":"금융환경",
        "currentState":"글로벌 긴축 강화",
        "previousState":"긴축 재강화",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"미국 10년물 4.9626%, 2년물 4.5856%, WTI 102.48달러가 글로벌 할인율과 에너지 비용 부담을 함께 높였다. 9월 10일 달러-원 현물은 1,339.20원이었지만 1개월 NDF가 1,350.30원으로 뛰어 다음 한국장의 원화 부담을 예고했다. 9월 11일 KOSPI가 7천선을 이탈하고 외국인·기관이 동반 매도해 국내 완충력도 약해졌다.",
        "evidence":["미국 10년물 4.9626%·2년물 4.5856%","WTI 10월물 $102.48·Brent 11월물 $107.63","달러-원 1개월 NDF 1,350.30원"],
        "counterEvidence":["USD/KRW 1,342.5원으로 원화 급락은 제한","KOSPI가 장중 저점에서 100포인트 넘게 반등","미국 신용스프레드의 새 악화는 미확인"],
        "indicators":[
          {"label":"USD/KRW","current":"1,342.50원","previous":"1,339.20원","change":"+3.30원","changePct":"+0.25%","unit":"원","asOf":"2026-09-11","source":"시장 시세","sourceUrl":"","interpretation":"위험회피에도 원화 약세 폭은 제한"},
          {"label":"미국 10년물","current":"4.9626%","previous":"4.8406%","change":"+12.20bp","changePct":"—","unit":"%","asOf":"2026-09-10 미국장","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"에너지·PPI·재정 우려로 할인율 상승"},
          {"label":"WTI 10월물","current":"$102.48","previous":"$96.05","change":"+$6.43","changePct":"+6.69%","unit":"배럴당 달러","asOf":"2026-09-10 미국장","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"에너지발 실질소득·금리 부담"},
          {"label":"ECB 기준금리","current":"2.50%","previous":"2.25%","change":"+25bp","changePct":"—","unit":"%","asOf":"2026-09-10","source":"ECB·AP","sourceUrl":"https://www.ecb.europa.eu/press/press_conference/html/index.en.html","interpretation":"에너지발 물가에 대응한 긴축 재개"}
        ],
        "asOf":"2026-09-11 한국 종가 이후",
        "nextEvent":"미국 30년물 입찰·CPI",
        "holdCondition":"원화와 신용은 버티지만 미국 금리·원유가 높은 수준 유지",
        "changeCondition":"금리·원유·변동성 동반 안정 또는 CPI 상방·신용스프레드 확대",
        "sourceRefs":[{"type":"daily","id":"2026-09-11","label":"9/11 Daily"}]
      },
      {
        "id":"global-risk",
        "label":"글로벌 위험선호",
        "layer":"시장 확인",
        "currentState":"광범위 위험회피",
        "previousState":"후속 확인 대기",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"9월 10일 미국 주요 지수는 S&P500 -0.58%, Dow -0.60%, Nasdaq -0.65%, Russell2000 -1.04%로 동반 하락했고 9월 11일 한국도 양 지수가 약세였다. 유가와 장기금리 상승이 대형 성장주부터 중소형주까지 위험선호를 눌렀다. 일부 사이버보안·MLCC 테마 급등은 있었지만 시장 전체로 확산되지 않았다.",
        "evidence":["S&P500 7,591.70(-0.58%)·Russell2000 -1.04%","KOSPI -1.76%·KOSDAQ -1.95%","미국 10년물 4.95%·WTI $102.48"],
        "counterEvidence":["한국 9월 초 반도체 수출 +270.1% YoY","Oracle 클라우드 인프라 매출 두 배 이상·RPO $664bn","KOSPI 장중 저점에서 100포인트 넘게 반등"],
        "indicators":[
          {"label":"S&P500","current":"7,591.70","previous":"7,636.36","change":"-44.66","changePct":"-0.58%","unit":"index","asOf":"2026-09-10","source":"AP","sourceUrl":"https://apnews.com/article/0c547c6cc3e374a2c04f78a90e35e113","interpretation":"유가·금리 상승에 광범위 약세"},
          {"label":"Nasdaq Composite","current":"26,081.72","previous":"26,253.34","change":"-171.62","changePct":"-0.65%","unit":"index","asOf":"2026-09-10","source":"AP","sourceUrl":"https://apnews.com/article/0c547c6cc3e374a2c04f78a90e35e113","interpretation":"고금리에 성장주 약세"},
          {"label":"Russell2000","current":"2,890.95","previous":"2,921.23","change":"-30.28","changePct":"-1.04%","unit":"index","asOf":"2026-09-10","source":"AP","sourceUrl":"https://apnews.com/article/0c547c6cc3e374a2c04f78a90e35e113","interpretation":"중소형주 상대약세 지속"}
        ],
        "asOf":"2026-09-10 미국 종가·9/11 한국 종가",
        "nextEvent":"미국 CPI·Oracle 실적",
        "holdCondition":"지수는 약하지만 AI 공급망 실적과 신용시장이 버팀",
        "changeCondition":"금리·원유 안정과 시장 폭 회복 또는 신용·중소형주 추가 악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-11","label":"9/11 Daily"}]
      },
      {
        "id":"korea-transmission",
        "label":"한국시장 전달",
        "layer":"시장 확인",
        "currentState":"7천선 이탈·동반 매도",
        "previousState":"7천선 방어·외국인 매도",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"KOSPI는 6,909.91(-1.76%), KOSDAQ은 820.64(-1.95%)로 마감했다. KOSPI 외국인 약 -2.29조원, 기관 약 -1.22조원의 동반 매도와 KOSDAQ 하락 1,004개가 가격 하락을 확인했다. 다만 KOSPI는 시가·저가 6,802.50에서 100포인트 넘게 회복했고 수출 펀더멘털은 강해 일방적 투매로 보지는 않는다.",
        "evidence":["KOSPI 6,909.91(-1.76%)·KOSDAQ 820.64(-1.95%)","KOSPI 외국인 약 -2.29조원·기관 약 -1.22조원","KOSDAQ 상승 607·하락 1,004"],
        "counterEvidence":["KOSPI 시가·저가 6,802.50에서 6,909.91로 회복","9월 1~10일 수출 +82.6%·반도체 +270.1% YoY","USD/KRW 1,342.5원으로 원화 급락은 제한"],
        "indicators":[
          {"label":"KOSPI","current":"6,909.91","previous":"7,033.92","change":"-124.01","changePct":"-1.76%","unit":"index","asOf":"2026-09-11 종가","source":"한국거래소·Korea Times","sourceUrl":"https://www.koreatimes.co.kr/economy/20260911/kospi-falls-on-higher-oil-prices-global-bond-yields","interpretation":"7천선 이탈·저점 대비 낙폭 축소"},
          {"label":"KOSDAQ","current":"820.64","previous":"836.92","change":"-16.28","changePct":"-1.95%","unit":"index","asOf":"2026-09-11 종가","source":"한국거래소·Investing","sourceUrl":"https://kr.investing.com/indices/kosdaq-historical-data","interpretation":"하락 종목 우위의 광범위 약세"},
          {"label":"KOSPI 외국인 현물","current":"약 -22,900억원","previous":"-24,821억원","change":"순매도 지속","changePct":"—","unit":"억원 · 순매수","asOf":"2026-09-11 종가","source":"한국거래소·Korea Times","sourceUrl":"https://www.koreatimes.co.kr/economy/20260911/kospi-falls-on-higher-oil-prices-global-bond-yields","interpretation":"대형주 중심 위험회피 지속"},
          {"label":"USD/KRW","current":"1,342.50원","previous":"1,339.20원","change":"+3.30원","changePct":"+0.25%","unit":"원","asOf":"2026-09-11","source":"시장 시세","sourceUrl":"","interpretation":"원화 약세 폭은 제한"}
        ],
        "asOf":"2026-09-11 한국장",
        "nextEvent":"만기 이후 외국인 현선물 수급·미국 CPI",
        "holdCondition":"7천선 아래에서 외국인·기관 매도와 약한 Breadth가 지속",
        "changeCondition":"7천선 회복과 외국인 현선물 동반 매수·Breadth 개선 또는 원화·신용 스트레스 확대",
        "sourceRefs":[{"type":"daily","id":"2026-09-11","label":"9/11 Daily"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-11","title":"미국 CPI","why":"FOMC 직전 서비스·주거비와 에너지 충격의 결합을 확인","axisIds":["growth","inflation","financial-conditions","global-risk"]},
      {"date":"2026-09-16","title":"미국 수출입물가","why":"에너지·정제제품 충격의 무역가격 전가를 확인","axisIds":["inflation","financial-conditions"]},
      {"date":"2026-09-16","title":"FOMC·SEP·점도표","why":"강한 물가와 성장 사이의 정책경로가 장단기 금리와 달러를 재설정","axisIds":["growth","inflation","liquidity","financial-conditions","global-risk"]}
    ]
  },
  "history":[
    {
      "date":"2026-09-11",
      "overallState":"위험회피",
      "previousState":"경계",
      "direction":"악화 중",
      "summary":"KOSPI 7천선 이탈, 양 시장 동반 하락, KOSPI 외국인·기관 동반 매도와 높은 미국 금리·원유가 겹쳐 위험회피로 하향했다.",
      "changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],
      "sourceDaily":"2026-09-11"
    },
    {
      "date":"2026-09-10",
      "overallState":"경계",
      "previousState":"중립",
      "direction":"악화 중",
      "summary":"KOSPI는 장중 6,900선 이탈을 되돌렸지만 외국인 현물 매도가 확대됐고, 장 마감 뒤 WTI 100달러·ECB 인상·높은 미국 금리가 금융여건을 악화시켰다.",
      "changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],
      "sourceDaily":"2026-09-10"
    },
    {
      "date":"2026-09-09",
      "overallState":"중립",
      "previousState":"경계",
      "direction":"개선 중",
      "summary":"KOSPI가 7천선 위에서 마감하고 KOSDAQ과 업종 확산이 개선됐지만 외국인 KOSPI 현물 매도가 남아 전면 위험선호로는 올리지 않았다.",
      "changedAxes":["글로벌 위험선호","한국시장 전달"],
      "sourceDaily":"2026-09-09"
    },
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
    }
  ]
};
