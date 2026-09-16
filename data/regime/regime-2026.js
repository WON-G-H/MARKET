/* Market Ledger Regime Monitor · refreshed with 2026-09-16 market close. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-16 한국 종가 · 9월 15일 미국 종가 반영",
    "overallState":"위험회피",
    "previousState":"위험회피",
    "direction":"기술적 반등·스트레스 지속",
    "confidence":"높음",
    "summary":"KOSPI 6,717.97(+1.37%)와 KOSDAQ 815.98(+0.44%)가 반등했지만 KOSPI 외국인은 약 1.68조원을 순매도했고 상승 종목보다 하락 종목이 많았다. 기관이 반도체·광통신·전력설비를 선별 매수해 지수를 끌어올렸지만 미 10년물 5.0019%, WTI 105.83달러, 원·달러 1,367.60원은 할인율·비용·외국인 수급 압력을 동시에 높였다. AI 속도조절 우려에도 실제 메모리·네트워크·전력 투자는 이어져 성장 붕괴는 아니지만, 반등의 폭과 수급이 위험선호 전환을 확인하지 못했다. 레짐은 위험회피를 유지하고 방향을 기술적 반등·스트레스 지속으로 판정한다.",
    "keyChanges":[
      "기관의 KOSPI 약 1.21조원 순매수로 지수는 1.37% 반등했지만 외국인은 약 1.68조원 순매도했고 KOSPI Breadth는 266 대 392로 약했다.",
      "반도체·광통신·전력설비·기판의 동반 강세는 AI 수요가 전면 취소된 것이 아니라 실물 주문과 이익 가시성에 따라 재선별되고 있음을 보여준다.",
      "미 10년물은 5.0019%, WTI는 105.83달러, 원·달러는 1,367.60원으로 상승해 지수 반등과 별개로 시장 금융여건은 다시 악화됐다."
    ],
    "holdCondition":"반도체·AI 인프라 이익 기대가 지수를 지지하더라도 외국인 매도와 5% 금리·고유가·원화 약세가 지속되고 Breadth가 좁은 경우",
    "changeCondition":"금리 상승 속도와 유가가 안정되고 외국인 현선물·Breadth·신용스프레드가 함께 개선되면 경계로 상향한다. 반대로 신용스프레드 확대와 AI·메모리 EPS 하향, 원화 약세가 겹치면 위험회피 강도를 높인다.",
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
        "summary":"한국 9월 1~10일 수출과 반도체 수출의 강한 증가, 9월 16일 반도체·광통신·전력설비 반등은 AI 공급망의 실물 수요가 아직 유지됨을 보여준다. 다만 외국인 매도와 좁은 KOSPI Breadth는 이 성장 기대가 시장 전체 이익으로 확산되지 않았다는 신호다. 고유가와 높은 자본비용이 비반도체 수요와 AI 프로젝트 ROI를 제약할 수 있어 성장 견조·편중 판정을 유지한다.",
        "evidence":["9월 1~10일 수출 $34.973bn·+82.6% YoY","반도체 수출 $16.483bn·+270.1% YoY·전체 47.1%","한국 2분기 실질 GDP +0.6% QoQ"],
        "counterEvidence":["한국 건설업 -1.9% QoQ","한국의 명목 성장과 반도체 교역조건 개선을 내수 회복으로 일반화할 수 없음","미시간대 9월 예비 소비자심리 47.8·기대지수 45.8"],
        "indicators":[
          {"label":"한국 실질 GDP","current":"+0.6% QoQ","previous":"속보 +0.6%","change":"수정 없음","changePct":"0.0%p","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"반도체 수출 중심의 견조한 성장"},
          {"label":"한국 실질 GDI","current":"+3.7% QoQ","previous":"+3.6% 속보","change":"+0.1%p","changePct":"—","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"교역조건 개선으로 구매력 상승"},
          {"label":"9월 1~10일 수출","current":"$34.973B","previous":"$19.155B","change":"+$15.818B","changePct":"+82.6% YoY","unit":"달러 · 8.5일","asOf":"2026-09-11 발표","source":"관세청","sourceUrl":"https://www.thepowernews.co.kr/view.php?ud=20260911091621701de3f0aa1be_7","interpretation":"반도체 중심 수출 모멘텀 강세"}
        ],
        "asOf":"2026-09-16 한국 종가 · 최신 성장자료 유지",
        "nextEvent":"FOMC 결과·메모리 계약가격·AI CapEx와 주문",
        "holdCondition":"반도체 수출과 서비스 수요가 성장권을 유지",
        "changeCondition":"수출·신규주문·고용의 동반 둔화 또는 내수 확산",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"inflation",
        "label":"물가",
        "layer":"거시 레짐",
        "currentState":"에너지 충격 재가속",
        "previousState":"높은 에너지·기대물가 압력",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"미국 8월 CPI에서 에너지·휘발유 상승과 1년 기대인플레이션 4.6%가 확인된 뒤 WTI가 105.83달러로 하루 4.38% 급등했다. 사우디 East-West Pipeline·Yanbu 선적과 리비아 유전 차질이 겹쳤다는 기관 해석은 실물 공급 충격이 단순 선물 투기보다 길어질 위험을 높인다. 정제품 재고·크랙스프레드와 운임의 연속 확인 전에는 광범위한 물가 재가속을 확정하지 않지만, 물가 축은 높은 수준 유지에서 에너지 충격 재가속으로 한 단계 악화시킨다.",
        "evidence":["WTI $105.83·+4.38%, Brent $108.75·+2.67%","사우디 우회수출·리비아 유전 차질이라는 기관자료상 공급충격","미시간대 1년 기대인플레이션 4.6%·미국 8월 CPI 에너지 +2.1% MoM"],
        "counterEvidence":["식품·에너지 제외 CPI +0.3% MoM·+2.4% YoY","유가의 하루 변동만으로 기대물가 고착을 확정할 수 없음","장기 기대인플레이션 상승은 +0.1%p에 그쳤고 예비치"],
        "indicators":[
          {"label":"미국 8월 CPI","current":"+3.4% YoY","previous":"+3.4% YoY","change":"0.0%p","changePct":"+0.4% MoM","unit":"CPI-U","asOf":"2026-09-11 발표","source":"U.S. BLS","sourceUrl":"https://www.bls.gov/news.release/archives/cpi_09112026.htm","interpretation":"에너지 주도의 높은 월간 상승"},
          {"label":"미시간대 1년 기대물가","current":"4.6%","previous":"4.0%","change":"+0.6%p","changePct":"—","unit":"예비치","asOf":"2026-09-11 발표","source":"University of Michigan Surveys of Consumers","sourceUrl":"https://www.sca.isr.umich.edu/","interpretation":"연료비 충격의 소비자 기대 전가"},
          {"label":"WTI","current":"$105.83","previous":"$101.39","change":"+$4.44","changePct":"+4.38%","unit":"배럴당 달러","asOf":"2026-09-15 미국 종가","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"공급차질 우려로 비용 압력 재가속"}
        ],
        "asOf":"2026-09-16 한국 종가 · 9/15 미국 원유·최신 물가자료",
        "nextEvent":"사우디 설비 복구·정제품 재고와 크랙스프레드·미시간대 확정치",
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
        "currentState":"5% 금리·고유가·원화 약세",
        "previousState":"높은 할인율 고착",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"미 10년물은 5.0019%, 30년물은 5.3662%, WTI는 105.83달러로 올랐고 원·달러도 1,367.60원까지 상승했다. 금리의 절대 수준 하나가 기계적인 주가 붕괴선은 아니지만 상승 속도와 에너지 비용, 외국인 매도가 동시에 나타나 한국 성장주의 체감 금융여건은 악화됐다. VIX 17.20과 반도체 반등은 신용위기 반례이며, 다음 판정은 하이일드·BBB 스프레드와 AI·메모리 EPS 추정치가 가격 변수와 함께 악화되는지에 달렸다.",
        "evidence":["미국 10년물 5.0019%·30년물 5.3662%","WTI $105.83","USD/KRW 1,367.60원·KOSPI 외국인 약 -1.68조원"],
        "counterEvidence":["VIX 17.10으로 공포의 급등은 미확인","VKOSPI 45.63으로 전일 대비 1.22포인트 하락","TGA 감소와 Fed 자산 증가로 단기 유동성은 완화 방향"],
        "indicators":[
          {"label":"USD/KRW","current":"1,367.60원","previous":"1,359.00원","change":"+8.60원","changePct":"+0.63%","unit":"원","asOf":"2026-09-16","source":"사용자 제공 한국장 스냅샷","sourceUrl":"","interpretation":"금리·유가 상승과 외국인 매도 속 원화 약세"},
          {"label":"미국 10년물","current":"5.0019%","previous":"4.97%","change":"+3.19bp","changePct":"—","unit":"%","asOf":"2026-09-15 미국장","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"5% 위로 진입한 높은 할인율"},
          {"label":"미국 2년물","current":"4.65%","previous":"4.63%","change":"+2bp","changePct":"—","unit":"%","asOf":"2026-09-14 미국장","source":"U.S. Treasury","sourceUrl":"https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView","interpretation":"추가 긴축 기대가 남은 단기금리"},
          {"label":"WTI","current":"$105.83","previous":"$101.39","change":"+$4.44","changePct":"+4.38%","unit":"배럴당 달러","asOf":"2026-09-15 미국장","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"에너지 비용과 인플레이션 압력 확대"}
        ],
        "asOf":"2026-09-16 한국 종가 · 9/15 미국 종가",
        "nextEvent":"FOMC 결과·국채 숏커버와 장단기곡선·신용스프레드",
        "holdCondition":"장기금리·원유의 절대 수준이 높고 원화·외국인 수급이 취약",
        "changeCondition":"금리·원유·원화·변동성 동반 안정 또는 신용스프레드·자금시장 스트레스 확대",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"global-risk",
        "label":"글로벌 위험선호",
        "layer":"시장 확인",
        "currentState":"미국 약세·한국 기술적 반등",
        "previousState":"미국 약세·한국 내부 분화",
        "direction":"반등하되 확인 부족",
        "confidence":"높음",
        "tone":"negative",
        "summary":"9월 15일 미국은 S&P500 -0.45%, Nasdaq -0.78%로 약세였지만 SOX는 +0.40%, VIX는 17.20으로 신용위기형 공포는 나타나지 않았다. 9월 16일 한국은 반도체·AI 인프라 주도로 양 지수가 반등했지만 외국인은 KOSPI를 6거래일 연속 순매도했고 KOSPI Breadth도 약했다. 높은 금리에도 이익 가시성이 있는 주식으로 자금이 선별 이동하는 국면이지 광범위한 위험선호 회복은 아니다.",
        "evidence":["S&P500 -0.45%·Nasdaq -0.78%","KOSPI 외국인 약 -1.68조원·상승 266 대 하락 392","미 10년물 5.0019%·WTI $105.83"],
        "counterEvidence":["KOSPI +1.37%·KOSDAQ +0.44%","SOX +0.40%와 한국 반도체·AI 인프라 반등","VIX 17.20으로 공포 급등은 제한"],
        "indicators":[
          {"label":"S&P500","current":"7,585.73","previous":"7,619.98","change":"-34.25","changePct":"-0.45%","unit":"index","asOf":"2026-09-15","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"고금리·고유가 속 이틀째 약세"},
          {"label":"Nasdaq Composite","current":"25,981.57","previous":"—","change":"—","changePct":"-0.78%","unit":"index","asOf":"2026-09-15","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"대형 기술주 할인율 부담"},
          {"label":"VIX","current":"17.20","previous":"17.10","change":"+0.10","changePct":"—","unit":"index","asOf":"2026-09-15","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"주가 약세에도 공포 급등은 제한"}
        ],
        "asOf":"2026-09-15 미국 종가·9/16 한국 종가",
        "nextEvent":"FOMC 이후 미국 주식·신용·한국 외국인 수급 반응",
        "holdCondition":"미국 지수와 KOSPI는 약하지만 KOSDAQ 수급·시장 폭과 변동성이 안정",
        "changeCondition":"KOSPI까지 외국인 수급·시장 폭이 회복되거나 미국 신용·중소형주와 한국 Breadth가 동반 재악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      },
      {
        "id":"korea-transmission",
        "label":"한국시장 전달",
        "layer":"시장 확인",
        "currentState":"지수 반등·수급 미확인",
        "previousState":"KOSPI 약세·KOSDAQ 회복",
        "direction":"기술적 반등",
        "confidence":"높음",
        "tone":"negative",
        "summary":"KOSPI 6,717.97(+1.37%)와 KOSDAQ 815.98(+0.44%)가 반등했지만 KOSPI 외국인은 약 1.68조원을 순매도했고 기관이 약 1.21조원을 받아냈다. KOSPI 상승 266·하락 392로 지수 반등이 시장 전체로 확산되지 않았고 KOSDAQ 외국인도 293억원 순매도했다. 반도체·광통신·전력설비의 이익 가시성은 방어막이지만 원·달러 1,367.60원과 외국인 매도 지속 때문에 수급·할인율 중심 위험회피 판정을 유지한다.",
        "evidence":["KOSPI 외국인 약 -1조6,829억원·6거래일 연속 순매도","KOSPI 상승 266·하락 392","USD/KRW 1,367.60원"],
        "counterEvidence":["KOSPI 6,717.97(+1.37%)·KOSDAQ 815.98(+0.44%)","KOSPI 기관 약 +1조2,145억원","반도체·광통신·전력설비·기판 동반 반등"],
        "indicators":[
          {"label":"KOSPI","current":"6,717.97","previous":"6,627.26","change":"+90.71","changePct":"+1.37%","unit":"index","asOf":"2026-09-16 종가","source":"신한투자증권·미래에셋증권 마감자료","sourceUrl":"","interpretation":"기관의 반도체·AI 인프라 매수로 반등"},
          {"label":"KOSDAQ","current":"815.98","previous":"812.41","change":"+3.57","changePct":"+0.44%","unit":"index","asOf":"2026-09-16 종가","source":"신한투자증권·미래에셋증권 마감자료","sourceUrl":"","interpretation":"동반 반등했으나 외국인 수급은 약함"},
          {"label":"KOSPI 외국인 현물","current":"약 -16,829억원","previous":"약 -15,458억원","change":"순매도 확대","changePct":"—","unit":"억원 · 순매수","asOf":"2026-09-16 종가","source":"신한투자증권 마감자료","sourceUrl":"","interpretation":"지수 반등에도 위험축소 지속"},
          {"label":"USD/KRW","current":"1,367.60원","previous":"1,359.00원","change":"+8.60원","changePct":"+0.63%","unit":"원","asOf":"2026-09-16","source":"사용자 제공 한국장 스냅샷","sourceUrl":"","interpretation":"금리·유가 상승과 외국인 매도 속 원화 약세"}
        ],
        "asOf":"2026-09-16 한국장",
        "nextEvent":"9월 17일 한국장 FOMC 반응·외국인 현선물·반도체 EPS",
        "holdCondition":"기관의 반도체·AI 인프라 매수가 지수를 방어하지만 외국인 매도·원화 약세·좁은 Breadth가 지속",
        "changeCondition":"반도체와 KOSPI Breadth·외국인 현선물 동반 매수 또는 원화·신용 스트레스와 KOSDAQ Breadth 재악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-15","label":"9/15 Daily"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-17","title":"FOMC 결과 이후 한국장 반응","why":"인상 여부보다 장단기곡선·달러·신용스프레드와 외국인 수급의 결합이 레짐을 결정","axisIds":["inflation","liquidity","financial-conditions","global-risk","korea-transmission"]}
    ]
  },
  "history":[
    {
      "date":"2026-09-16",
      "overallState":"위험회피",
      "previousState":"위험회피",
      "direction":"기술적 반등·스트레스 지속",
      "summary":"반도체·AI 인프라의 이익 가시성으로 양 지수가 반등했지만 외국인 매도·좁은 KOSPI Breadth와 5% 금리·고유가·원화 약세가 남아 위험회피를 유지했다.",
      "changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"]
    },
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
