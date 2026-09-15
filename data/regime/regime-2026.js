/* Market Ledger Regime Monitor · refreshed with 2026-09-15 Daily. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-15 한국 종가 · 9월 14일 미국 종가 반영",
    "overallState":"위험회피",
    "previousState":"위험회피",
    "direction":"제한적 안정",
    "confidence":"높음",
    "summary":"KOSPI는 6,627.26(-0.85%)로 추가 하락했지만 KOSDAQ은 812.41(+0.70%)로 반등했다. KOSPI 외국인과 기관은 각각 약 1.55조원과 0.96조원을 순매도한 반면 KOSDAQ에서는 두 주체가 순매수했고 상승 종목이 하락 종목을 웃돌았다. 미 10년물 4.97%, WTI 101.39달러, 원·달러 1,359원은 할인율·비용 압력을 유지한다. 다만 TGA 감소와 연준 자산 증가, VKOSPI 하락, KOSDAQ 시장 폭 개선으로 전일의 전면적 악화는 멈췄다. 레짐은 위험회피를 유지하되 방향은 제한적 안정으로 조정한다.",
    "keyChanges":[
      "KOSPI는 외국인·기관 합계 약 2.50조원 순매도로 6,627선까지 밀렸지만 낙폭은 전일보다 축소됐다.",
      "KOSDAQ은 외국인·기관 동반 순매수와 상승 825·하락 518로 전환돼 위험회피가 시장 전체에서 대형주 중심으로 좁혀졌다.",
      "TGA 주평균 -846억달러와 연준 자산 +34.15억달러는 단기 유동성 완충이지만 미 10년 4.97%·WTI 101.39달러·원달러 1,359원이 금융여건 개선을 제한했다."
    ],
    "holdCondition":"KOSPI 외국인 매도와 높은 미국 금리·원유·원화 약세가 지속되지만 KOSDAQ의 수급·시장 폭이 버티는 경우",
    "changeCondition":"금리·유가 안정과 KOSPI 외국인 수급·반도체 Breadth 회복이 겹치면 경계로 상향하고, 원화·신용 스트레스와 양 시장 Breadth가 다시 동반 악화하면 위험회피 강도를 높인다.",
    "sourceRefs":[
      {"type":"daily","id":"2026-09-15","label":"2026-09-15 Daily"},
      {"type":"daily","id":"2026-09-14","label":"2026-09-14 Daily"},
      {"type":"daily","id":"2026-09-11","label":"2026-09-11 Daily"},
      {"type":"weekly","id":"2026-W36","label":"기존 기준선 · 2026-W36 Weekly"}
    ],
    "axes":[
      {
        "id":"growth",
        "label":"성장",
        "layer":"거시 레짐",
        "currentState":"성장 견조·편중",
        "previousState":"성장 견조·편중",
        "direction":"유지",
        "confidence":"높음",
        "tone":"positive",
        "summary":"한국 9월 1~10일 수출은 349.73억달러로 전년 대비 82.6% 늘었고 반도체 수출은 164.83억달러로 270.1% 증가했다. 조업일수가 전년과 같은 8.5일이라 방향성은 강하지만 반도체가 전체의 47.1%를 차지한다. 9월 15일 KOSPI 약세와 KOSDAQ 반등의 분화는 성장지표 붕괴보다 높은 할인율과 대형주 수급을 먼저 반영한 결과에 가깝다. 미국 소비자심리 하락과 고유가가 비반도체 수요를 제약할 수 있어 견조하되 편중된 성장 판정을 유지한다.",
        "evidence":["9월 1~10일 수출 $34.973bn·+82.6% YoY","반도체 수출 $16.483bn·+270.1% YoY·전체 47.1%","한국 2분기 실질 GDP +0.6% QoQ"],
        "counterEvidence":["한국 건설업 -1.9% QoQ","한국의 명목 성장과 반도체 교역조건 개선을 내수 회복으로 일반화할 수 없음","미시간대 9월 예비 소비자심리 47.8·기대지수 45.8"],
        "indicators":[
          {"label":"한국 실질 GDP","current":"+0.6% QoQ","previous":"속보 +0.6%","change":"수정 없음","changePct":"0.0%p","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"반도체 수출 중심의 견조한 성장"},
          {"label":"한국 실질 GDI","current":"+3.7% QoQ","previous":"+3.6% 속보","change":"+0.1%p","changePct":"—","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"교역조건 개선으로 구매력 상승"},
          {"label":"9월 1~10일 수출","current":"$34.973B","previous":"$19.155B","change":"+$15.818B","changePct":"+82.6% YoY","unit":"달러 · 8.5일","asOf":"2026-09-11 발표","source":"관세청","sourceUrl":"https://www.thepowernews.co.kr/view.php?ud=20260911091621701de3f0aa1be_7","interpretation":"반도체 중심 수출 모멘텀 강세"}
        ],
        "asOf":"2026-09-15 한국 종가 · 최신 성장자료 유지",
        "nextEvent":"9월 16일 FOMC·이후 한국 수출 흐름",
        "holdCondition":"반도체 수출과 서비스 수요가 성장권을 유지",
        "changeCondition":"수출·신규주문·고용의 동반 둔화 또는 내수 확산",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"inflation",
        "label":"물가",
        "layer":"거시 레짐",
        "currentState":"높은 에너지·기대물가 압력",
        "previousState":"CPI·기대물가로 확산",
        "direction":"높은 수준 유지",
        "confidence":"높음",
        "tone":"negative",
        "summary":"미국 8월 CPI의 에너지 +2.1%·휘발유 +3.9%와 미시간대 1년 기대인플레이션 4.6%로 에너지 충격의 소비자물가·기대 경로 전가는 이미 확인됐다. 9월 14일 WTI가 101.39달러로 다시 100달러를 웃돌아 비용 압력은 높은 수준을 유지한다. 근원 CPI +0.3% MoM·+2.4% YoY와 하루 단위 유가 변동은 광범위한 재가속을 확정하지 못하므로 추가 악화 대신 높은 압력 유지로 판정한다.",
        "evidence":["미국 8월 CPI +0.4% MoM·+3.4% YoY","에너지 +2.1%·휘발유 +3.9% MoM","미시간대 1년 기대인플레이션 4.6%·장기 3.4%"],
        "counterEvidence":["식품·에너지 제외 CPI +0.3% MoM·+2.4% YoY","유가의 하루 변동만으로 기대물가 고착을 확정할 수 없음","장기 기대인플레이션 상승은 +0.1%p에 그쳤고 예비치"],
        "indicators":[
          {"label":"미국 8월 CPI","current":"+3.4% YoY","previous":"+3.4% YoY","change":"0.0%p","changePct":"+0.4% MoM","unit":"CPI-U","asOf":"2026-09-11 발표","source":"U.S. BLS","sourceUrl":"https://www.bls.gov/news.release/archives/cpi_09112026.htm","interpretation":"에너지 주도의 높은 월간 상승"},
          {"label":"미시간대 1년 기대물가","current":"4.6%","previous":"4.0%","change":"+0.6%p","changePct":"—","unit":"예비치","asOf":"2026-09-11 발표","source":"University of Michigan Surveys of Consumers","sourceUrl":"https://www.sca.isr.umich.edu/","interpretation":"연료비 충격의 소비자 기대 전가"},
          {"label":"WTI","current":"$101.39","previous":"$100.05","change":"+$1.34","changePct":"+1.34%","unit":"배럴당 달러","asOf":"2026-09-14 미국 종가","source":"공개 시장자료 수집본","sourceUrl":"","interpretation":"100달러대 비용 압력 지속"}
        ],
        "asOf":"2026-09-15 한국 종가 · 9/14 미국 원유·최신 물가자료",
        "nextEvent":"9월 16일 FOMC·9월 25일 미시간대 확정치",
        "holdCondition":"근원 물가는 통제권에 있지만 에너지·기대인플레이션이 높은 상태",
        "changeCondition":"기대·서비스·임금의 동반 상승이면 추가 악화, 원유·제품가격과 기대물가 정상화면 완화",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"liquidity",
        "label":"시스템 유동성",
        "layer":"금융환경",
        "currentState":"소폭 완화",
        "previousState":"소폭 긴축",
        "direction":"개선 중",
        "confidence":"보통",
        "tone":"negative",
        "summary":"최신 공개자료에서 TGA 주평균은 8,833.35억달러로 전주보다 846억달러 감소했고 연준 총자산은 6조7,406.19억달러로 34.15억달러 증가했다. ON RRP도 14.2억달러로 38.35억달러 줄어 단기 시스템 유동성 방향은 소폭 완화로 전환됐다. 다만 역레포 완충은 이미 작고 9월 세금 납부와 국채 발행이 남아 있어 지속적 완화로 확대 해석하지 않는다.",
        "evidence":["TGA 주평균 -846억달러","Fed 총자산 주간 +34.15억달러","ON RRP -38.35억달러"],
        "counterEvidence":["ON RRP 잔액은 $1.42B로 완충 규모가 작음","2026년 3분기 순시장성 차입 전망 $739bn","9월 세금 납부와 국채 결제에 따라 TGA가 다시 유동성을 흡수할 수 있음"],
        "indicators":[
          {"label":"TGA · 주평균","current":"$883.335B","previous":"$967.935B","change":"-$84.600B","changePct":"-8.74%","unit":"십억달러","asOf":"2026-09-09","source":"U.S. Treasury·Daily archive","sourceUrl":"https://fiscaldata.treasury.gov/datasets/daily-treasury-statement/operating-cash-balance","interpretation":"민간 유동성 방출 방향"},
          {"label":"Fed 총자산","current":"$6,740.619B","previous":"$6,737.204B","change":"+$3.415B","changePct":"+0.05%","unit":"십억달러","asOf":"2026-09-09","source":"Federal Reserve H.4.1","sourceUrl":"https://www.federalreserve.gov/releases/h41/","interpretation":"주간 소폭 증가"},
          {"label":"ON RRP","current":"$1.420B","previous":"$5.255B","change":"-$3.835B","changePct":"-72.98%","unit":"십억달러","asOf":"2026-09-14","source":"Federal Reserve Bank of New York","sourceUrl":"https://www.newyorkfed.org/markets/desk-operations/reverse-repo","interpretation":"유동성 방출이나 잔액은 이미 작음"}
        ],
        "asOf":"2026-09-15 확인 · 최신 주간/일간 공개값",
        "nextEvent":"주간 Fed 유동성 통계·9월 세금 납부·FOMC",
        "holdCondition":"TGA 감소와 Fed 자산 증가가 유지되고 자금시장 기능이 정상",
        "changeCondition":"세금·국채 결제로 TGA가 급증하거나 준비금·Fed 자산이 동반 감소하면 다시 긴축으로 전환",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"financial-conditions",
        "label":"시장 금융여건",
        "layer":"금융환경",
        "currentState":"높은 할인율 고착",
        "previousState":"높은 할인율 고착",
        "direction":"높은 수준 유지",
        "confidence":"높음",
        "tone":"negative",
        "summary":"9월 14일 미국 2년물은 4.65%, 10년물은 4.97%로 각각 2bp와 1bp 올랐고 WTI는 101.39달러였다. 원·달러도 1,359원으로 10.5원 상승해 한국 성장주가 체감하는 할인율은 여전히 긴축적이다. VIX 17.10과 VKOSPI 하락, 단기 유동성 완화는 반대 근거지만 KOSPI 외국인·기관 매도가 이어져 높은 할인율 고착 판정을 유지한다.",
        "evidence":["미국 2년물 4.65%·10년물 4.97%","WTI $101.39","USD/KRW 1,359원·KOSPI 외국인 약 -1.55조원"],
        "counterEvidence":["VIX 17.10으로 공포의 급등은 미확인","VKOSPI 45.63으로 전일 대비 1.22포인트 하락","TGA 감소와 Fed 자산 증가로 단기 유동성은 완화 방향"],
        "indicators":[
          {"label":"USD/KRW","current":"1,359.00원","previous":"1,348.50원","change":"+10.50원","changePct":"+0.78%","unit":"원","asOf":"2026-09-15","source":"공개 외환시장 수집본","sourceUrl":"","interpretation":"외국인 매도와 달러 강세 속 원화 약세"},
          {"label":"미국 10년물","current":"4.97%","previous":"4.96%","change":"+1bp","changePct":"—","unit":"%","asOf":"2026-09-14 미국장","source":"U.S. Treasury","sourceUrl":"https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView","interpretation":"5% 부근의 높은 할인율"},
          {"label":"미국 2년물","current":"4.65%","previous":"4.63%","change":"+2bp","changePct":"—","unit":"%","asOf":"2026-09-14 미국장","source":"U.S. Treasury","sourceUrl":"https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView","interpretation":"추가 긴축 기대가 남은 단기금리"},
          {"label":"WTI","current":"$101.39","previous":"$100.05","change":"+$1.34","changePct":"+1.34%","unit":"배럴당 달러","asOf":"2026-09-14 미국장","source":"공개 시장자료 수집본","sourceUrl":"","interpretation":"비용 압력을 주는 100달러대 유지"}
        ],
        "asOf":"2026-09-15 한국 종가 · 9/14 미국 종가",
        "nextEvent":"9월 16일 FOMC·점도표",
        "holdCondition":"장기금리·원유의 절대 수준이 높고 원화·외국인 수급이 취약",
        "changeCondition":"금리·원유·원화·변동성 동반 안정 또는 신용스프레드·자금시장 스트레스 확대",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"global-risk",
        "label":"글로벌 위험선호",
        "layer":"시장 확인",
        "currentState":"미국 약세·한국 내부 분화",
        "previousState":"미국 반등·한국 위험회피",
        "direction":"제한적 안정",
        "confidence":"높음",
        "tone":"negative",
        "summary":"9월 14일 미국은 S&P500 -0.48%, Nasdaq100 -0.82%, Russell2000 -0.40%로 다시 약세였지만 VIX는 17.10으로 급격한 공포 확산을 보이지 않았다. 9월 15일 한국은 KOSPI -0.85%와 KOSDAQ +0.70%로 내부 분화가 나타났다. KOSPI 외국인·기관 매도가 위험회피를 확인하지만 KOSDAQ의 동반 순매수와 상승 종목 우위는 낙폭 과대 구간의 제한적 안정을 보여준다.",
        "evidence":["S&P500 -0.48%·Nasdaq100 -0.82%","KOSPI -0.85%·외국인·기관 합계 약 -2.50조원","미 10년물 4.97%·WTI $101.39"],
        "counterEvidence":["KOSDAQ +0.70%·외국인과 기관 동반 순매수","KOSDAQ 상승 825·하락 518","VIX 17.10·VKOSPI 전일 대비 하락"],
        "indicators":[
          {"label":"S&P500","current":"7,619.98","previous":"7,656.98","change":"-37.00","changePct":"-0.48%","unit":"index","asOf":"2026-09-14","source":"사용자 제공 장 마감자료","sourceUrl":"","interpretation":"높은 금리·유가 속 재약세"},
          {"label":"Nasdaq100","current":"29,127.16","previous":"—","change":"—","changePct":"-0.82%","unit":"index","asOf":"2026-09-14","source":"사용자 제공 장 마감자료","sourceUrl":"","interpretation":"대형 기술주 할인율 부담"},
          {"label":"VIX","current":"17.10","previous":"—","change":"—","changePct":"—","unit":"index","asOf":"2026-09-14","source":"CBOE 공개자료 수집본","sourceUrl":"https://www.cboe.com/tradable_products/vix/","interpretation":"주가 약세에도 공포 급등은 제한"}
        ],
        "asOf":"2026-09-14 미국 종가·9/15 한국 종가",
        "nextEvent":"9월 15일 중국 실물지표·9월 16일 FOMC",
        "holdCondition":"미국 지수와 KOSPI는 약하지만 KOSDAQ 수급·시장 폭과 변동성이 안정",
        "changeCondition":"KOSPI까지 외국인 수급·시장 폭이 회복되거나 미국 신용·중소형주와 한국 Breadth가 동반 재악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"korea-transmission",
        "label":"한국시장 전달",
        "layer":"시장 확인",
        "currentState":"KOSPI 약세·KOSDAQ 회복",
        "previousState":"6,700선 이탈·매도 확대",
        "direction":"분화·악화 둔화",
        "confidence":"높음",
        "tone":"negative",
        "summary":"KOSPI는 6,627.26(-0.85%)로 추가 하락했지만 KOSDAQ은 812.41(+0.70%)로 반등했다. KOSPI 외국인 약 -1.55조원과 기관 약 -0.96조원의 동반 매도는 대형주 위험축소가 끝나지 않았음을 보여준다. 반면 KOSDAQ은 외국인·기관 동반 순매수와 상승 825·하락 518로 회복해 전일의 광범위한 매도가 선택적 순환매로 좁혀졌다. 원·달러 1,359원과 KOSPI 이격도 97.51 때문에 신용경색이 아닌 수급·할인율 중심 위험회피 판정을 유지한다.",
        "evidence":["KOSPI 6,627.26(-0.85%)·KOSDAQ 812.41(+0.70%)","KOSPI 외국인 약 -1.55조원·기관 약 -0.96조원","KOSPI 상승 248·하락 456"],
        "counterEvidence":["KOSDAQ 외국인 +272억원·기관 +1,149억원","KOSDAQ 상승 825·하락 518","VKOSPI 45.63으로 전일 대비 1.22포인트 하락"],
        "indicators":[
          {"label":"KOSPI","current":"6,627.26","previous":"6,684.37","change":"-57.11","changePct":"-0.85%","unit":"index","asOf":"2026-09-15 종가","source":"국내 공개 시세 수집본·신한투자증권","sourceUrl":"","interpretation":"외국인·기관 매도로 추가 하락"},
          {"label":"KOSDAQ","current":"812.41","previous":"806.79","change":"+5.62","changePct":"+0.70%","unit":"index","asOf":"2026-09-15 종가","source":"국내 공개 시세 수집본·신한투자증권","sourceUrl":"","interpretation":"수급·Breadth 동반 회복"},
          {"label":"KOSPI 외국인 현물","current":"약 -15,458억원","previous":"약 -32,900억원","change":"순매도 축소","changePct":"—","unit":"억원 · 순매수","asOf":"2026-09-15 종가","source":"국내 공개 투자자별 매매 수집본","sourceUrl":"","interpretation":"매도 규모는 줄었지만 위험축소 지속"},
          {"label":"USD/KRW","current":"1,359.00원","previous":"1,348.50원","change":"+10.50원","changePct":"+0.78%","unit":"원","asOf":"2026-09-15","source":"공개 외환시장 수집본","sourceUrl":"","interpretation":"KOSPI 외국인 매도와 함께 원화 약세"}
        ],
        "asOf":"2026-09-15 한국장",
        "nextEvent":"9월 16일 외국인 현선물 수급·9월 17일 한국장 FOMC 반응",
        "holdCondition":"KOSPI 외국인·기관 매도와 원화 약세가 지속되지만 KOSDAQ 수급·Breadth가 버팀",
        "changeCondition":"반도체와 KOSPI Breadth·외국인 현선물 동반 매수 또는 원화·신용 스트레스와 KOSDAQ Breadth 재악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-16","title":"FOMC·SEP·점도표","why":"강한 물가와 성장 사이의 정책경로가 장단기 금리와 달러를 재설정","axisIds":["growth","inflation","liquidity","financial-conditions","global-risk"]}
    ]
  },
  "history":[
    {
      "date":"2026-09-15",
      "overallState":"위험회피",
      "previousState":"위험회피",
      "direction":"제한적 안정",
      "summary":"KOSPI 외국인·기관 매도와 높은 금리·유가·원화 약세로 위험회피를 유지했다. 다만 KOSDAQ의 수급·시장 폭 개선과 단기 유동성 완화로 전일의 전면적 악화는 제한적 안정으로 좁혀졌다.",
      "changedAxes":["물가","시스템 유동성","시장 금융여건","글로벌 위험선호","한국시장 전달"],
      "sourceDaily":"2026-09-15"
    },
    {
      "date":"2026-09-14",
      "overallState":"위험회피",
      "previousState":"위험회피",
      "direction":"악화 중",
      "summary":"미국 증시 반등에도 KOSPI가 6,700선을 이탈하고 외국인·기관 매도가 확대됐다. CPI 에너지·휘발유와 미시간대 기대인플레이션 상승이 확인돼 위험회피를 유지하고 강도를 높였다.",
      "changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],
      "sourceDaily":"2026-09-14"
    },
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
