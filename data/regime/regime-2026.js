/* Market Ledger Regime Monitor · refreshed with 2026-09-10 Daily. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-10 한국 종가 · 미국 PPI·ECB 발표 직후",
    "overallState":"경계",
    "previousState":"중립",
    "direction":"악화 중",
    "confidence":"보통",
    "summary":"KOSPI는 만기·리밸런싱 충격으로 장중 6,898.45까지 하락했지만 7,033.92로 7천선을 회복했고 KOSDAQ은 상승했다. 그러나 외국인 KOSPI 현물 -2조4,821억원, 미국 10년물 4.845%, Brent 100달러 상회에 이어 장 마감 뒤 WTI 10월물이 100.24달러를 기록했다. PPI는 headline과 core가 혼재했지만 ECB가 25bp 인상해 에너지발 물가와 글로벌 금융여건의 부담이 커졌다. 국내 하단 수요가 남아 전면 위험회피는 아니지만 전일 중립에서 경계로 하향한다.",
    "keyChanges":[
      "KOSPI는 장중 6,898.45에서 7,033.92로 회복했고 KOSDAQ은 +0.79%로 마감해 충격 흡수력을 보였지만 외국인은 양 시장 현물을 대규모 순매도했다.",
      "미국 10년물은 4.845%로 상승했고 장기물 Buyback 확대가 기간 프리미엄과 재정공급 부담을 상쇄하지 못했다.",
      "미국 PPI는 headline +5.4% YoY, core +4.6% YoY로 제시됐고 WTI 10월물 $100.24, ECB 25bp 인상이 에너지발 글로벌 긴축 위험을 강화했다."
    ],
    "holdCondition":"KOSPI 7천선과 KOSDAQ Breadth는 유지되지만 외국인 현물 매도와 미국 10년물·원유의 높은 수준이 지속되는 경우",
    "changeCondition":"CPI 둔화와 외국인 현물·선물 수급 회복이 겹치면 중립·선별적 위험선호로 복귀하고, 10년물·WTI 추가 상승과 7천선 재이탈이 겹치면 위험회피로 하향한다.",
    "sourceRefs":[
      {"type":"daily","id":"2026-09-10","label":"2026-09-10 Daily"},
      {"type":"daily","id":"2026-09-09","label":"2026-09-09 Daily"},
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
        "summary":"미국 고용과 서비스 수요, 한국 2분기 GDP·GDI는 견조하고 TSMC 8월 매출도 전년 대비 53.3% 증가했다. 다만 한국의 성장은 반도체 수출과 교역조건에 집중됐고 고유가·고금리가 비반도체 수요를 제약할 수 있어 성장의 폭은 고르지 않다.",
        "evidence":["한국 2분기 실질 GDP +0.6% QoQ·+3.7% YoY","TSMC 8월 매출 NT$514,806m·+53.3% YoY","미국 8월 비농업 고용 +16.2만명·실업률 4.1%"],
        "counterEvidence":["한국 건설업 -1.9% QoQ","한국의 명목 성장과 반도체 교역조건 개선을 내수 회복으로 일반화할 수 없음","미국 ISM 서비스 고용지수 47.8로 수축"],
        "indicators":[
          {"label":"한국 실질 GDP","current":"+0.6% QoQ","previous":"속보 +0.6%","change":"수정 없음","changePct":"0.0%p","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"반도체 수출 중심의 견조한 성장"},
          {"label":"한국 실질 GDI","current":"+3.7% QoQ","previous":"+3.6% 속보","change":"+0.1%p","changePct":"—","unit":"2분기","asOf":"2026-09-08 발표","source":"한국은행","sourceUrl":"https://www.bok.or.kr/portal/stats/statsPublictSchdul/listCldr.do?date=2026-09&menuNo=200775","interpretation":"교역조건 개선으로 구매력 상승"},
          {"label":"미국 비농업 고용","current":"+162K","previous":"+21K","change":"예상 +55K 상회","changePct":"—","unit":"명 · 8월","asOf":"2026-09-04 발표","source":"U.S. BLS","sourceUrl":"https://www.bls.gov/news.release/archives/empsit_09042026.htm","interpretation":"미국 수요의 견조함"}
        ],
        "asOf":"2026-09-10 TSMC 매출·9/8 한국 국민소득·9/4 미국 고용",
        "nextEvent":"미국 CPI·Oracle 실적",
        "holdCondition":"반도체 수출과 서비스 수요가 성장권을 유지",
        "changeCondition":"수출·신규주문·고용의 동반 둔화 또는 내수 확산",
        "sourceRefs":[{"type":"daily","id":"2026-09-10","label":"9/10 Daily"}]
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
        "summary":"Brent 100달러 상회와 WTI 10월물 장중 100.24달러, 낮은 미국 디젤 재고 전망이 공급측 물가 위험을 키웠다. 미국 PPI는 headline +5.4% YoY·+0.4% MoM으로 높았지만 core는 +4.6% YoY·+0.2% MoM으로 월간 예상치를 밑돌아 근원 확산은 혼재했다.",
        "evidence":["WTI 2026년 10월물 $100.24·+4.36% 장중 스냅샷","미국 8월 PPI +5.4% YoY·+0.4% MoM","미국 디젤 재고 1억배럴 하회와 높은 크랙스프레드 전망"],
        "counterEvidence":["Core PPI +0.2% MoM으로 예상 +0.3% 하회","유가·정제제품의 CPI·기대인플레이션 전가는 아직 미확인","WTI는 장중값이고 PPI 세부표는 BLS 원문 대조가 남음"],
        "indicators":[
          {"label":"WTI 2026년 10월물","current":"$100.24","previous":"$96.05","change":"+$4.19","changePct":"+4.36%","unit":"배럴당 달러","asOf":"2026-09-10 21:32 KST 장중","source":"사용자 제공 시세 화면","sourceUrl":"","interpretation":"공급 충격 확대·정산가와 구분"},
          {"label":"미국 8월 PPI","current":"+5.4% YoY","previous":"+4.7% YoY","change":"예상 +0.1%p 상회","changePct":"+0.4% MoM","unit":"Final demand","asOf":"2026-09-10 발표","source":"사용자 제공 경제일정 화면·BLS 일정","sourceUrl":"https://www.bls.gov/schedule/news_release/ppi.htm","interpretation":"headline 압력 확대·core 월간은 예상 하회"},
          {"label":"미국 디젤 재고","current":"1억배럴 하회 전망","previous":"—","change":"2003년 이후 최저 가능성","changePct":"—","unit":"배럴","asOf":"2026-09-09 EIA 전망 인용","source":"Bloomberg·EIA","sourceUrl":"","interpretation":"제품 공급 단계의 직접 압박"}
        ],
        "asOf":"2026-09-10 21:32 KST",
        "nextEvent":"미국 CPI",
        "holdCondition":"원유·제품가격은 높지만 core CPI·기대인플레이션으로의 확산은 제한",
        "changeCondition":"CPI·기대인플레이션의 동반 상승이면 추가 악화, 원유·크랙스프레드 정상화면 완화",
        "sourceRefs":[{"type":"daily","id":"2026-09-10","label":"9/10 Daily"}]
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
        "sourceRefs":[{"type":"daily","id":"2026-09-10","label":"9/10 Daily"}]
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
        "summary":"미국 10년물 4.845%, WTI 100.24달러와 ECB 25bp 인상이 글로벌 할인율 부담을 키웠다. 한국 원·달러는 1,339.2원으로 하루 상승했지만 9월 8일보다 낮고 KOSPI가 7천선을 지켜 국내 충격은 부분적으로 완충됐다.",
        "evidence":["미국 10년물 4.845%·2년물 4.434%","WTI 10월물 $100.24·Brent $100 상회","ECB 기준금리 2.50%로 25bp 인상"],
        "counterEvidence":["USD/KRW 1,339.2원으로 9/8 1,345.6원보다 낮음","KOSPI 장중 6,898.45에서 7,033.92로 회복","미국 신용스프레드의 새 악화는 미확인"],
        "indicators":[
          {"label":"USD/KRW","current":"1,339.20원","previous":"1,336.10원","change":"+3.10원","changePct":"+0.23%","unit":"원","asOf":"2026-09-10 15:30","source":"서울외환시장·Korea Times","sourceUrl":"https://www.koreatimes.co.kr/economy/20260910/kospi-falls-as-oil-prices-jump-but-retains-7000","interpretation":"외국인 매도 속 원화 소폭 약세"},
          {"label":"미국 10년물","current":"4.845%","previous":"4.792%","change":"+5.3bp","changePct":"—","unit":"%","asOf":"2026-09-09 미국 종가 부근","source":"SAVE 브리핑·신한투자증권","sourceUrl":"","interpretation":"바이백 확대에도 기간 프리미엄 상승"},
          {"label":"WTI 2026년 10월물","current":"$100.24","previous":"$96.05","change":"+$4.19","changePct":"+4.36%","unit":"배럴당 달러","asOf":"2026-09-10 21:32 KST 장중","source":"사용자 제공 시세 화면","sourceUrl":"","interpretation":"에너지발 실질소득·금리 부담"},
          {"label":"ECB 기준금리","current":"2.50%","previous":"2.25%","change":"+25bp","changePct":"—","unit":"%","asOf":"2026-09-10","source":"ECB·AP","sourceUrl":"https://www.ecb.europa.eu/press/press_conference/html/index.en.html","interpretation":"에너지발 물가에 대응한 긴축 재개"}
        ],
        "asOf":"2026-09-10 21:32 KST",
        "nextEvent":"미국 30년물 입찰·CPI",
        "holdCondition":"원화와 신용은 버티지만 미국 금리·원유가 높은 수준 유지",
        "changeCondition":"금리·원유·변동성 동반 안정 또는 CPI 상방·신용스프레드 확대",
        "sourceRefs":[{"type":"daily","id":"2026-09-10","label":"9/10 Daily"}]
      },
      {
        "id":"global-risk",
        "label":"글로벌 위험선호",
        "layer":"시장 확인",
        "currentState":"지수 약세·AI 상대강세",
        "previousState":"후속 확인 대기",
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"9월 9일 미국 주요 지수는 S&P500 -0.48%, Dow -0.77%, Nasdaq Composite -0.64%, Russell2000 -1.32%로 하락했다. 유가와 금리 상승이 광범위한 위험선호를 눌렀지만 Meta·Micron과 TSMC 매출은 AI 공급망의 상대강세를 지지했다.",
        "evidence":["S&P500 7,636.36(-0.48%)·Russell2000 -1.32%","미국 10년물 4.845%·WTI $100.24 장중","외국인 KOSPI 현물 -2조4,821억원"],
        "counterEvidence":["TSMC 8월 매출 +53.3% YoY","KOSDAQ +0.79%·Breadth 균형","미국 신용시장 경색이나 AI 주문 취소는 미확인"],
        "indicators":[
          {"label":"S&P500","current":"7,636.36","previous":"7,673.52","change":"-37.16","changePct":"-0.48%","unit":"index","asOf":"2026-09-09","source":"AP","sourceUrl":"https://apnews.com/article/31c966aef214740b8fec71e399a051b8","interpretation":"유가·금리 상승에 광범위 약세"},
          {"label":"Nasdaq Composite","current":"26,253.34","previous":"26,421.41","change":"-168.07","changePct":"-0.64%","unit":"index","asOf":"2026-09-09","source":"AP","sourceUrl":"https://apnews.com/article/31c966aef214740b8fec71e399a051b8","interpretation":"AI 상대강세에도 지수 하락"},
          {"label":"Russell2000","current":"2,921.23","previous":"2,960.20","change":"-38.97","changePct":"-1.32%","unit":"index","asOf":"2026-09-09","source":"AP","sourceUrl":"https://apnews.com/article/31c966aef214740b8fec71e399a051b8","interpretation":"고금리에 중소형주 상대약세"}
        ],
        "asOf":"2026-09-09 미국 종가·9/10 한국 종가",
        "nextEvent":"미국 CPI·Oracle 실적",
        "holdCondition":"지수는 약하지만 AI 공급망 실적과 신용시장이 버팀",
        "changeCondition":"금리·원유 안정과 시장 폭 회복 또는 신용·중소형주 추가 악화",
        "sourceRefs":[{"type":"daily","id":"2026-09-10","label":"9/10 Daily"}]
      },
      {
        "id":"korea-transmission",
        "label":"한국시장 전달",
        "layer":"시장 확인",
        "currentState":"7천선 방어·외국인 매도",
        "previousState":"종가 돌파·기관 주도",
        "direction":"혼조",
        "confidence":"높음",
        "tone":"negative",
        "summary":"KOSPI는 만기·리밸런싱으로 장중 6,898.45까지 밀렸지만 7,033.92로 회복했고 KOSDAQ은 0.79% 상승했다. Breadth는 균형에 가까워졌으나 외국인이 양 시장 현물을 대규모 순매도해 하단 방어의 지속성은 만기 이후 확인이 필요하다.",
        "evidence":["KOSPI 7,033.92(-0.25%)·장중 저가 6,898.45","KOSPI 상승 419·하락 443 / KOSDAQ 상승 827·하락 796","기관 KOSDAQ +1조3,491억원"],
        "counterEvidence":["외국인 KOSPI -2조4,821억원·KOSDAQ -1조758억원","만기·KRX 섹터지수 변경의 기계적 수급","USD/KRW 1,339.2원으로 하루 +3.1원"],
        "indicators":[
          {"label":"KOSPI","current":"7,033.92","previous":"7,051.64","change":"-17.72","changePct":"-0.25%","unit":"index","asOf":"2026-09-10 종가","source":"한국거래소·Korea Times","sourceUrl":"https://www.koreatimes.co.kr/economy/20260910/kospi-falls-as-oil-prices-jump-but-retains-7000","interpretation":"6,900선 이탈 뒤 7천선 회복"},
          {"label":"KOSDAQ","current":"836.92","previous":"830.37","change":"+6.55","changePct":"+0.79%","unit":"index","asOf":"2026-09-10 종가","source":"한국거래소·Korea Times","sourceUrl":"https://www.koreatimes.co.kr/economy/20260910/kospi-falls-as-oil-prices-jump-but-retains-7000","interpretation":"기관 매수로 상대강세"},
          {"label":"KOSPI 외국인 현물","current":"-24,821억원","previous":"-4,271억원","change":"-20,550억원","changePct":"순매도 확대","unit":"억원 · 순매수","asOf":"2026-09-10 종가","source":"한국거래소·신한투자증권","sourceUrl":"","interpretation":"만기·리밸런싱 영향 포함 대규모 매도"},
          {"label":"USD/KRW","current":"1,339.20원","previous":"1,336.10원","change":"+3.10원","changePct":"+0.23%","unit":"원","asOf":"2026-09-10 15:30","source":"서울외환시장·Korea Times","sourceUrl":"https://www.koreatimes.co.kr/economy/20260910/kospi-falls-as-oil-prices-jump-but-retains-7000","interpretation":"하루 원화 약세지만 9/8보다 안정"}
        ],
        "asOf":"2026-09-10 한국장",
        "nextEvent":"만기 이후 외국인 현선물 수급·미국 CPI",
        "holdCondition":"7천선과 Breadth는 버티지만 외국인 매도가 지속",
        "changeCondition":"외국인 현선물 동반 매수와 Breadth 개선 또는 7천선 재이탈·원화 급락",
        "sourceRefs":[{"type":"daily","id":"2026-09-10","label":"9/10 Daily"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-11","title":"미국 30년물 입찰·Oracle 실적","why":"기간 프리미엄과 AI CapEx의 매출·FCF 전환을 함께 확인","axisIds":["liquidity","financial-conditions","global-risk"]},
      {"date":"2026-09-11","title":"미국 CPI","why":"FOMC 직전 서비스·주거비와 에너지 충격의 결합을 확인","axisIds":["growth","inflation","financial-conditions","global-risk"]},
      {"date":"2026-09-16","title":"FOMC·SEP·점도표","why":"강한 물가와 성장 사이의 정책경로가 장단기 금리와 달러를 재설정","axisIds":["growth","inflation","liquidity","financial-conditions","global-risk"]}
    ]
  },
  "history":[
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
