/* Market Ledger Regime Monitor · refreshed with 2026-09-17 market close and U.S. after-close data. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-17 한국 종가 · 9월 16일 미국 종가 · 9/17 21:30 미국 소매판매 반영",
    "overallState":"경계",
    "previousState":"위험회피",
    "direction":"내부 확산·매크로 긴축 공존",
    "confidence":"높음",
    "summary":"FOMC의 25bp 인상과 2027년까지 높은 정책금리 전망, 원·달러 1,385.50원과 KOSPI 외국인 -2조2,782억원은 금융여건과 한국 대형주 수급의 압박을 확인했다. 그러나 KOSPI 상승 419 대 하락 262, KOSDAQ 상승 905 대 하락 406으로 시장 폭이 개선됐고 KOSDAQ은 +0.76%, WTI는 102.43달러로 3.21% 하락했다. 장 마감 뒤 미국 소매판매·근원·통제그룹이 모두 예상을 웃돌아 성장 붕괴를 반박했지만 추가 긴축 여력과 달러 부담도 높였다. 전면 위험회피보다 대형주 위험축소와 중소형 테마 확산이 공존하는 경계 국면으로 한 단계 완화한다.",
    "keyChanges":[
      "연준이 25bp 인상했고 SEP의 2026년·2027년 말 정책금리 중간값이 4.1%로 올라 고금리 장기화가 공식 전망에 반영됐다.",
      "KOSPI 외국인 순매도가 2.28조원으로 확대됐지만 양 시장 상승 종목 수가 하락 종목 수를 웃돌고 KOSDAQ이 상승해 내부 위험선호는 개선됐다.",
      "WTI가 3.21% 하락해 에너지 충격은 일부 완화됐으나 원화 약세와 미국 단기금리 상승이 금융여건 완화를 막았다.",
      "미국 8월 소매판매·근원·통제그룹의 예상 상회는 성장 축을 강화하는 동시에 추가 긴축 가능성을 높였다."
    ],
    "holdCondition":"외국인 매도·원화 약세와 높은 단기금리가 유지되지만 KOSDAQ·Breadth와 계약 기반 테마가 버티는 경우 경계를 유지한다.",
    "changeCondition":"외국인 현선물·원화·Breadth가 함께 개선되고 단기금리·달러가 안정되면 선별적 위험선호로 올린다. 반대로 소매판매 뒤 금리·달러·신용스프레드가 동반 상승하고 KOSDAQ Breadth까지 무너지면 위험회피로 되돌린다.",
    "sourceRefs":[
      {"type":"daily","id":"2026-09-17","label":"2026-09-17 Daily"},
      {"type":"daily","id":"2026-09-16","label":"2026-09-16 Daily"},
      {"type":"daily","id":"2026-09-15","label":"2026-09-15 Daily"},
      {"type":"daily","id":"2026-09-11","label":"2026-09-11 위험회피 전환 기준"},
      {"type":"weekly","id":"2026-W36","label":"기존 기준선 · 2026-W36 Weekly"}
    ],
    "axes":[
      {
        "id":"growth","label":"성장","layer":"거시 레짐",
        "currentState":"성장 견조·긴축 여력","previousState":"성장 견조·편중","direction":"강화","confidence":"높음","tone":"positive",
        "summary":"미국 8월 소매판매는 헤드라인 +1.2% MoM, 근원 +1.4%, 통제그룹 +1.4%로 모두 예상치를 웃돌아 소비 수요의 견조함을 확인했다. 한국에서는 KOSDAQ 시장 폭과 반도체 후공정·전력·우주항공의 순환이 실물 투자 기대를 지지했다. 다만 명목 소매판매에는 가격 효과가 포함되고 한국 외국인 매도·건설 부진은 성장의 폭이 고르지 않음을 보여준다. 성장 축은 강화하되 연준이 물가에 대응할 여지도 함께 커졌다.",
        "evidence":["미국 8월 소매판매 +1.2% MoM·예상 +0.8%","근원 +1.4%·통제그룹 +1.4%","KOSDAQ +0.76%·상승 905 대 하락 406"],
        "counterEvidence":["명목 판매액의 유가·가격 효과","미시간대 9월 예비 소비자심리 47.8","한국 건설업 -1.9% QoQ·KOSPI 외국인 대규모 순매도"],
        "indicators":[
          {"label":"미국 8월 소매판매","current":"+1.2% MoM","previous":"-0.5%","change":"예상 +0.8% 상회","changePct":"—","unit":"명목 소매판매","asOf":"2026-09-17 21:30 KST","source":"사용자 제공 발표 화면","sourceUrl":"","interpretation":"소비 수요가 예상보다 견조"},
          {"label":"미국 8월 통제그룹","current":"+1.4% MoM","previous":"-0.4%","change":"예상 +0.4% 상회","changePct":"—","unit":"GDP 소비 추정 관련","asOf":"2026-09-17 21:30 KST","source":"사용자 제공 발표 화면","sourceUrl":"","interpretation":"주유소 효과를 넘어 기초 소비 강세"},
          {"label":"한국 9월 1~10일 수출","current":"$34.973B","previous":"$19.155B","change":"+$15.818B","changePct":"+82.6% YoY","unit":"달러 · 8.5일","asOf":"2026-09-11 발표","source":"관세청 인용 공개자료","sourceUrl":"","interpretation":"반도체 중심 수출 모멘텀"}
        ],
        "asOf":"2026-09-17 미국 발표·한국 종가","nextEvent":"미국 실질 PCE·카드지출·고용과 한국 수출","holdCondition":"소비와 AI·반도체 주문이 성장권 유지","changeCondition":"실질 소비·고용·수출의 동반 둔화 또는 내수 확산","sourceRefs":[{"type":"daily","id":"2026-09-17","label":"9/17 Daily"}]
      },
      {
        "id":"inflation","label":"물가","layer":"거시 레짐",
        "currentState":"높은 물가·에너지 변동성","previousState":"에너지 충격 재가속","direction":"일부 완화·기초압력 지속","confidence":"높음","tone":"negative",
        "summary":"WTI가 105.83달러에서 102.43달러로 3.21% 하락해 직전의 에너지 충격은 일부 완화됐다. 그러나 절대 유가는 100달러를 웃돌고, 2026년 Core PCE 전망이 3.4%로 상향됐으며 미국 8월 수입물가 +0.7%·수출물가 +0.6%도 예상을 웃돌았다. 공급 우회가 원유 급등을 진정시켰지만 강한 수요와 교역가격은 물가의 기초압력이 남았음을 보여준다.",
        "evidence":["SEP 2026 Core PCE 3.4%·6월 대비 +0.1%p","미국 8월 수입물가 +0.7%·수출물가 +0.6%","WTI가 여전히 배럴당 100달러 상회"],
        "counterEvidence":["WTI $102.43·-3.21%","Brent $105.83·-2.84%","사우디 우회 수출·복구 추진"],
        "indicators":[
          {"label":"WTI","current":"$102.43","previous":"$105.83","change":"-$3.40","changePct":"-3.21%","unit":"배럴당 달러","asOf":"2026-09-16 미국 종가","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"공급 우회 기대로 에너지 충격 일부 완화"},
          {"label":"미국 8월 수입물가","current":"+0.7% MoM","previous":"-0.3%","change":"예상 +0.4% 상회","changePct":"—","unit":"수입물가지수","asOf":"2026-09-17 21:30 KST","source":"사용자 제공 발표 화면","sourceUrl":"","interpretation":"교역가격 압력 재확인"},
          {"label":"SEP Core PCE 2026","current":"3.4%","previous":"3.3%","change":"+0.1%p","changePct":"—","unit":"연말 전망","asOf":"2026-09 FOMC","source":"미래에셋증권 Fixed Income Comment","sourceUrl":"","interpretation":"물가 둔화 경로가 더 느려짐"}
        ],
        "asOf":"2026-09-17","nextEvent":"사우디 복구·정제품 재고·미시간대 확정치·PCE","holdCondition":"유가는 조정돼도 교역가격과 Core PCE 전망이 높은 상태","changeCondition":"유가·제품가격·기대물가 동반 정상화면 완화, 임금·서비스 재가속이면 악화","sourceRefs":[{"type":"daily","id":"2026-09-17","label":"9/17 Daily"}]
      },
      {
        "id":"liquidity","label":"시스템 유동성","layer":"금융환경",
        "currentState":"소폭 완화","previousState":"소폭 완화","direction":"유지","confidence":"보통","tone":"negative",
        "summary":"TGA 감소와 연준 총자산의 소폭 증가는 단기 시스템 유동성을 완화 방향으로 유지한다. 다만 ON RRP 잔액이 이미 작고 9월 세금·국채 결제, 연준의 금리 인상으로 유동성 완충이 위험자산 전체로 확산되기는 어렵다. 오늘 KOSDAQ Breadth는 개선됐지만 외국인 KOSPI 매도는 유동성 효과가 국내 대형주까지 전달되지 않았음을 보여준다.",
        "evidence":["TGA 주평균 -846억달러","Fed 총자산 주간 +34.15억달러","KOSDAQ 시장 폭 905 대 406"],
        "counterEvidence":["ON RRP 잔액 $1.42B","FOMC 25bp 인상","KOSPI 외국인 -2.28조원"],
        "indicators":[
          {"label":"TGA · 주평균","current":"$883.335B","previous":"$967.935B","change":"-$84.600B","changePct":"-8.74%","unit":"십억달러","asOf":"2026-09-09","source":"U.S. Treasury","sourceUrl":"https://fiscaldata.treasury.gov/datasets/daily-treasury-statement/operating-cash-balance","interpretation":"민간 유동성 방출 방향"},
          {"label":"Fed 총자산","current":"$6,740.619B","previous":"$6,737.204B","change":"+$3.415B","changePct":"+0.05%","unit":"십억달러","asOf":"2026-09-09","source":"Federal Reserve H.4.1","sourceUrl":"https://www.federalreserve.gov/releases/h41/","interpretation":"주간 소폭 증가"},
          {"label":"ON RRP","current":"$1.420B","previous":"$5.255B","change":"-$3.835B","changePct":"-72.98%","unit":"십억달러","asOf":"2026-09-14","source":"Federal Reserve Bank of New York","sourceUrl":"https://www.newyorkfed.org/markets/desk-operations/reverse-repo","interpretation":"방출 방향이나 완충 규모는 작음"}
        ],
        "asOf":"2026-09-17 확인 · 최신 공개값 유지","nextEvent":"주간 Fed 유동성 통계·9월 세금 납부","holdCondition":"TGA 감소와 Fed 자산 증가가 유지","changeCondition":"TGA 급증·준비금 감소·자금시장 스트레스 확대","sourceRefs":[{"type":"daily","id":"2026-09-17","label":"9/17 Daily"}]
      },
      {
        "id":"financial-conditions","label":"시장 금융여건","layer":"금융환경",
        "currentState":"고금리·달러·원화 약세","previousState":"5% 금리·고유가·원화 약세","direction":"긴축 유지·에너지만 완화","confidence":"높음","tone":"negative",
        "summary":"미국 2년물 4.7359%, 10년물 5.0225%, 달러인덱스 100.306과 원·달러 1,385.50원은 FOMC 인상 이후 금융여건이 여전히 긴축적임을 보여준다. WTI 하락은 비용 압력을 줄였지만 강한 소매판매와 수출입물가는 추가 인상 기대를 자극할 수 있다. Hyperscaler CDS 상승 주장까지 고려하면 다음 판정은 단기금리·달러와 광범위한 신용스프레드의 동행 여부에 달렸다.",
        "evidence":["미국 2년물 4.7359%·+7.3bp","미국 10년물 5.0225%·원·달러 1,385.50원","KOSPI 외국인 -2조2,782억원"],
        "counterEvidence":["WTI -3.21%","미국 30년물 -0.5bp","한국 양 시장 Breadth 개선"],
        "indicators":[
          {"label":"USD/KRW","current":"1,385.50원","previous":"1,367.60원","change":"+17.90원","changePct":"+1.31%","unit":"원","asOf":"2026-09-17 장중 스냅샷","source":"사용자 제공 시장 스냅샷","sourceUrl":"","interpretation":"FOMC·달러 강세와 외국인 매도 반영"},
          {"label":"미국 10년물","current":"5.0225%","previous":"5.0019%","change":"+2.06bp","changePct":"—","unit":"%","asOf":"2026-09-16 미국 종가","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"높은 할인율 지속"},
          {"label":"미국 2년물","current":"4.7359%","previous":"4.67%","change":"+6.59bp","changePct":"—","unit":"%","asOf":"2026-09-16 미국 종가","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"추가 긴축 기대가 단기물에 집중"},
          {"label":"WTI","current":"$102.43","previous":"$105.83","change":"-$3.40","changePct":"-3.21%","unit":"배럴당 달러","asOf":"2026-09-16 미국 종가","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"비용 압력 일부 완화"}
        ],
        "asOf":"2026-09-17 한국 종가 · 9/16 미국 종가","nextEvent":"소매판매 뒤 미국 금리·달러·신용스프레드","holdCondition":"금리·달러·원화가 높지만 유가와 Breadth가 상쇄","changeCondition":"금리·달러·신용 동반 안정 또는 OAS·CDS와 원화 스트레스 확대","sourceRefs":[{"type":"daily","id":"2026-09-17","label":"9/17 Daily"}]
      },
      {
        "id":"global-risk","label":"글로벌 위험선호","layer":"시장 확인",
        "currentState":"금리 충격 속 내부 분화","previousState":"미국 약세·한국 기술적 반등","direction":"혼조·확산 개선","confidence":"높음","tone":"neutral",
        "summary":"전일 미국은 Dow -1.21%, S&P500 -0.45%였지만 Nasdaq은 -0.01%, SOX는 +0.63%로 기술 수요가 상대적으로 견조했다. 한국은 KOSPI 보합에도 KOSDAQ과 Breadth가 개선됐다. VIX 17.71로 공포 급등은 제한됐고 유가도 하락했다. 높은 금리와 달러가 지수 상단을 막지만 이익·수주 촉매가 있는 성장주로 자금이 이동하는 선별적 환경이다.",
        "evidence":["Dow -1.21%·S&P500 -0.45%","미국 2년물 +7.3bp·DXY +0.69%","KOSPI 외국인 -2.28조원"],
        "counterEvidence":["Nasdaq -0.01%·SOX +0.63%","KOSDAQ +0.76%·시장 폭 905 대 406","VIX 17.71·WTI -3.21%"],
        "indicators":[
          {"label":"S&P500","current":"7,551.81","previous":"7,585.73","change":"-33.92","changePct":"-0.45%","unit":"index","asOf":"2026-09-16","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"FOMC 인상에 약세"},
          {"label":"Nasdaq Composite","current":"25,978.43","previous":"25,981.57","change":"-3.14","changePct":"-0.01%","unit":"index","asOf":"2026-09-16","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"기술주는 사실상 보합"},
          {"label":"VIX","current":"17.71","previous":"17.20","change":"+0.51","changePct":"+2.97%","unit":"index","asOf":"2026-09-16","source":"미래에셋증권 글로벌 마켓 브리핑","sourceUrl":"","interpretation":"불확실성 상승이나 공포 급등은 아님"}
        ],
        "asOf":"2026-09-16 미국 종가·9/17 한국 종가","nextEvent":"소매판매 뒤 미국장·BOJ·한국 외국인 수급","holdCondition":"금리 충격에도 기술주·KOSDAQ·Breadth가 버팀","changeCondition":"외국인·신용·중소형주 동반 개선 또는 시장 폭 재붕괴","sourceRefs":[{"type":"daily","id":"2026-09-17","label":"9/17 Daily"}]
      },
      {
        "id":"korea-transmission","label":"한국시장 전달","layer":"시장 확인",
        "currentState":"KOSPI 정체·KOSDAQ 확산","previousState":"지수 반등·수급 미확인","direction":"내부 개선·외국인 악화","confidence":"높음","tone":"neutral",
        "summary":"KOSPI는 6,715.41(-0.04%)로 장중 상승분을 반납했지만 KOSDAQ은 822.18(+0.76%)로 올랐다. 외국인은 KOSPI 2조2,782억원을 순매도했으나 KOSPI와 KOSDAQ 모두 상승 종목이 더 많았다. 우주항공 8종, 반도체 후공정·MLCC, 데이터센터 전력과 조선·방산으로 순환매가 확산됐다. 대형주 위험축소는 지속되지만 한국 내부는 전일보다 넓어져 경계 판정에 부합한다.",
        "evidence":["KOSPI 외국인 -2조2,782억원·7거래일 연속 순매도","USD/KRW 1,385.50원","KOSPI 장중 약 +1.2% 상승분 반납"],
        "counterEvidence":["KOSDAQ +0.76%","KOSPI 상승 419 대 하락 262","KOSDAQ 상승 905 대 하락 406"],
        "indicators":[
          {"label":"KOSPI","current":"6,715.41","previous":"6,717.97","change":"-2.56","changePct":"-0.04%","unit":"index","asOf":"2026-09-17 종가","source":"신한투자증권·미래에셋증권 마감자료","sourceUrl":"","interpretation":"외국인 매도에 장중 상승분 반납"},
          {"label":"KOSDAQ","current":"822.18","previous":"815.98","change":"+6.20","changePct":"+0.76%","unit":"index","asOf":"2026-09-17 종가","source":"신한투자증권·미래에셋증권 마감자료","sourceUrl":"","interpretation":"중소형 테마와 시장 폭 확산"},
          {"label":"KOSPI 외국인 현물","current":"-22,782억원","previous":"-16,829억원","change":"-5,953억원","changePct":"—","unit":"억원 · 순매수","asOf":"2026-09-17 종가","source":"신한투자증권 마감자료","sourceUrl":"","interpretation":"대형주 위험축소 확대"},
          {"label":"KOSDAQ Breadth","current":"905 / 406","previous":"716 / 596","change":"상승 우위 확대","changePct":"—","unit":"상승 / 하락","asOf":"2026-09-17 종가","source":"신한투자증권 마감자료","sourceUrl":"","interpretation":"지수 밖 내부 확산 확인"}
        ],
        "asOf":"2026-09-17 한국장","nextEvent":"소매판매 뒤 원화·외국인 수급과 KOSDAQ Breadth","holdCondition":"외국인·원화는 약하지만 시장 폭과 KOSDAQ 순환이 유지","changeCondition":"외국인 순매수·원화 안정 또는 KOSDAQ 시장 폭·거래대금 재악화","sourceRefs":[{"type":"daily","id":"2026-09-17","label":"9/17 Daily"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-18","title":"미국 소매판매 이후 금리·달러와 한국장 전달","why":"강한 소비가 성장 기대보다 추가 긴축·달러 강세로 가격되는지 확인","axisIds":["growth","inflation","financial-conditions","global-risk","korea-transmission"]},
      {"date":"2026-09-18","title":"일본 CPI·BOJ 결정","why":"엔화와 글로벌 장기금리, 아시아 외국인 수급에 미치는 영향","axisIds":["financial-conditions","global-risk","korea-transmission"]}
    ]
  },
  "history":[
    {"date":"2026-09-17","overallState":"경계","previousState":"위험회피","direction":"내부 확산·매크로 긴축 공존","summary":"FOMC와 외국인·원화는 긴축적이었지만 KOSDAQ·양 시장 Breadth 개선과 유가 하락으로 위험회피를 경계로 한 단계 완화했다. 장 마감 뒤 강한 소매판매는 다음 거래일의 추가 긴축 변수로 남겼다.","changedAxes":["성장","물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-17"},
    {"date":"2026-09-16","overallState":"위험회피","previousState":"위험회피","direction":"기술적 반등·스트레스 지속","summary":"반도체·AI 인프라의 이익 가시성으로 양 지수가 반등했지만 외국인 매도·좁은 KOSPI Breadth와 5% 금리·고유가·원화 약세가 남아 위험회피를 유지했다.","changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-16"},
    {"date":"2026-09-15","overallState":"위험회피","previousState":"위험회피","direction":"제한적 안정","summary":"KOSPI 외국인·기관 매도와 높은 금리·유가·원화 약세로 위험회피를 유지했으나 KOSDAQ 수급·시장 폭과 유동성 완화로 전면 악화는 제한됐다.","changedAxes":["물가","시스템 유동성","시장 금융여건","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-15"},
    {"date":"2026-09-14","overallState":"위험회피","previousState":"위험회피","direction":"악화 중","summary":"미국 증시 반등에도 KOSPI가 6,700선을 이탈하고 외국인·기관 매도가 확대됐다. CPI 에너지와 기대인플레이션 상승으로 위험회피를 유지했다.","changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-14"},
    {"date":"2026-09-11","overallState":"위험회피","previousState":"경계","direction":"악화 중","summary":"KOSPI 7천선 이탈, 양 시장 동반 하락, 외국인·기관 동반 매도와 높은 미국 금리·원유가 겹쳐 위험회피로 하향했다.","changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-11"},
    {"date":"2026-09-10","overallState":"경계","previousState":"중립","direction":"악화 중","summary":"KOSPI는 장중 6,900선 이탈을 되돌렸지만 외국인 현물 매도가 확대됐고 WTI 100달러·ECB 인상·높은 미국 금리가 금융여건을 악화시켰다.","changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-10"},
    {"date":"2026-09-09","overallState":"중립","previousState":"경계","direction":"개선 중","summary":"KOSPI가 7천선 위에서 마감하고 KOSDAQ과 업종 확산이 개선됐지만 외국인 KOSPI 현물 매도가 남아 전면 위험선호로는 올리지 않았다.","changedAxes":["글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-09"},
    {"date":"2026-09-08","overallState":"경계","previousState":"선별적 위험선호","direction":"악화 중","summary":"외국인·기관 순매수에도 KOSPI가 장중 고점에서 음전했고 Breadth·원화·VKOSPI가 함께 악화돼 경계로 되돌렸다.","changedAxes":["물가","시장 금융여건","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-08"},
    {"date":"2026-09-07","overallState":"선별적 위험선호","previousState":"경계","direction":"개선 중","summary":"Astra·메모리 기대, 원화 강세와 외국인·기관 매수로 한국 반도체가 급등했지만 시장 폭과 KOSDAQ 수급은 제한돼 선별적 개선으로 판정했다.","changedAxes":["성장","물가","글로벌 위험선호","한국시장 전달"],"sourceDaily":"2026-09-07","sourceWeekly":"2026-W36"}
  ]
};
