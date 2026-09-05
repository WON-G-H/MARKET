/* Market Ledger Regime Monitor · derived only from existing W36 Weekly, 2026-09-04 Daily and Dashboard. */
window.MARKET_LEDGER=window.MARKET_LEDGER||{};
window.MARKET_LEDGER.regime={
  "schemaVersion":1,
  "current":{
    "asOf":"2026-09-05 · 9/4 미국장 및 한국장 기준",
    "overallState":"경계",
    "previousState":"중립",
    "direction":"악화 중",
    "confidence":"보통",
    "summary":"미국의 성장과 고용은 견조하지만 서비스·에너지 가격 부담이 남아 있고, 고용 발표 뒤 단기금리와 달러가 다시 올랐다. 시스템 유동성은 소폭 긴축이며 9월 4일 한국 수급 회복은 이후 미국장 변화를 아직 소화하지 않았다.",
    "keyChanges":[
      "월러 발언 뒤 낮아졌던 9월 금리 인상 기대가 미국 고용 발표 후 다시 높아졌다.",
      "TGA 증가와 은행 준비금 감소로 시스템 유동성의 순방향이 소폭 긴축으로 기울었다.",
      "한국에서는 외국인·기관 동반 매수로 수급이 개선됐지만 다음 거래일 지속성 확인이 남았다."
    ],
    "holdCondition":"성장과 이익 전망이 유지되고 서비스 물가가 더 가속하지 않으며, 신용스프레드와 한국 외국인 수급이 안정되는 경우",
    "changeCondition":"물가 재가속과 함께 Fed 인상 기대·달러·실질금리가 동반 상승하거나, 고용과 이익 전망이 급격히 꺾이며 신용스프레드가 확대되는 경우",
    "sourceRefs":[
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
        "summary":"서비스 수요와 고용이 예상을 웃돌아 침체보다 견조한 확장에 가까운 모습이다. 다만 서비스업 고용지수는 기준선을 밑돌아 성장의 폭은 고르게 강하지 않다.",
        "evidence":["8월 비농업 고용 +16.2만명으로 예상 +5.5만명을 상회","ISM 서비스업 PMI 55.4, 기업활동 61.7, 신규주문 60.9","실업률 4.1% 유지"],
        "counterEvidence":["ISM 서비스업 고용지수 47.8로 2개월 연속 수축","고용의 산업별 확산 정도는 추가 자료가 부족"],
        "indicators":[
          {"label":"비농업 고용","current":"+162K","previous":"+21K","change":"예상 +55K 상회","changePct":"—","unit":"명 · 8월","asOf":"2026-09-04 발표","source":"2026-09-04 Daily","sourceUrl":"","interpretation":"노동시장과 수요의 견조함"},
          {"label":"실업률","current":"4.1%","previous":"4.1%","change":"0.0%p","changePct":"0.00%","unit":"%","asOf":"2026-09-04 발표","source":"2026-09-04 Daily","sourceUrl":"","interpretation":"완전고용에 가까운 노동시장"},
          {"label":"ISM 서비스업 PMI","current":"55.4","previous":"54.1","change":"+1.3","changePct":"+2.40%","unit":"index","asOf":"2026-09-03 미국 발표","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"26개월 연속 서비스업 확장"}
        ],
        "asOf":"2026-09-04 미국 고용보고서",
        "nextEvent":"미국 CPI·PPI",
        "holdCondition":"서비스 신규주문과 고용이 확장권을 유지",
        "changeCondition":"신규주문·고용·이익 전망의 동반 둔화",
        "sourceRefs":[{"type":"daily","id":"2026-09-04","label":"9/4 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"inflation",
        "label":"물가",
        "layer":"거시 레짐",
        "currentState":"공급측 물가 위험",
        "previousState":"둔화 정체",
        "direction":"악화 중",
        "confidence":"보통",
        "tone":"negative",
        "summary":"임금은 급격히 가속하지 않았지만 서비스 투입가격과 90달러대 유가가 함께 남아 있다. 아직 광범위한 물가 재가속으로 확인된 것은 아니며 다음 CPI가 전가 범위를 가를 핵심이다.",
        "evidence":["ISM 서비스 가격지수 72.6으로 전월보다 2.3포인트 상승","WTI가 9월 4일 제공 시세 기준 91.22달러","에너지·정제품 공급 부담이 운송과 기업 비용으로 이어질 가능성"],
        "counterEvidence":["8월 평균 시급은 전월 대비 0.3%로 예상과 동일","WTI는 9월 4일 전일 동일시각 대비 0.49% 하락"],
        "indicators":[
          {"label":"ISM 서비스 가격","current":"72.6","previous":"70.3","change":"+2.3","changePct":"+3.27%","unit":"index","asOf":"2026-09-03 미국 발표","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"서비스 비용 압력 확대"},
          {"label":"WTI","current":"$91.22","previous":"$91.67","change":"-$0.45","changePct":"-0.49%","unit":"배럴당 달러","asOf":"2026-09-04 제공 시세","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"하루 조정에도 90달러대 유지"},
          {"label":"평균 시급","current":"+0.3% MoM","previous":"+0.2% MoM","change":"+0.1%p","changePct":"—","unit":"%","asOf":"2026-09-04 발표","source":"2026-09-04 Daily","sourceUrl":"","interpretation":"급격한 임금 가속은 아님"}
        ],
        "asOf":"2026-09-04",
        "nextEvent":"미국 PPI·CPI",
        "holdCondition":"에너지 상승이 근원 서비스와 기대인플레이션으로 확산되지 않음",
        "changeCondition":"근원물가·임금·기대인플레이션의 동반 상승 또는 공급가격 정상화",
        "sourceRefs":[{"type":"daily","id":"2026-09-04","label":"9/4 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
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
        "direction":"악화 중",
        "confidence":"높음",
        "tone":"negative",
        "summary":"미국 고용 발표 뒤 2년물과 달러가 반등하고 신용스프레드도 소폭 확대됐다. 조달 비용은 높아졌지만 SOFR과 크레딧 움직임은 아직 경색보다 완만한 긴축에 가깝다.",
        "evidence":["미국 2년물 4.374%로 전주 말보다 3.4bp 상승","미국 10년물 4.784%로 전주 말보다 5.4bp 상승","IG OAS +2bp, HY OAS +5bp"],
        "counterEvidence":["SOFR 상승은 1bp에 그침","VIX는 14.07로 전일보다 0.25포인트 하락"],
        "indicators":[
          {"label":"미국 2년물","current":"4.374%","previous":"4.340%","change":"+3.4bp","changePct":"—","unit":"%","asOf":"2026-09-04 / 2026-08-28","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"고용 후 인상 기대 반영"},
          {"label":"미국 10년물","current":"4.784%","previous":"4.730%","change":"+5.4bp","changePct":"—","unit":"%","asOf":"2026-09-04 / 2026-08-28","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"정책·공급·물가 부담 병존"},
          {"label":"HY OAS","current":"2.65%p","previous":"2.60%p","change":"+5bp","changePct":"—","unit":"%p","asOf":"2026-09-03 / 2026-08-28","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"완만한 악화, 경색은 아님"},
          {"label":"VIX","current":"14.07","previous":"14.32","change":"-0.25","changePct":"-1.75%","unit":"index","asOf":"2026-09-04 미국 종가","source":"Dashboard","sourceUrl":"https://ca.investing.com/indices/volatility-s-p-500-historical-data?cid=1096487","interpretation":"주식 변동성 스트레스는 제한적"}
        ],
        "asOf":"2026-09-04 미국장",
        "nextEvent":"미국 PPI·CPI",
        "holdCondition":"신용스프레드와 단기자금시장이 안정 범위를 유지",
        "changeCondition":"실질금리·달러·HY 스프레드의 동반 상승 또는 정책 기대 완화로 반대 전환",
        "sourceRefs":[{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"global-risk",
        "label":"글로벌 위험선호",
        "layer":"시장 확인",
        "currentState":"혼조",
        "previousState":"위험선호",
        "direction":"악화 중",
        "confidence":"보통",
        "tone":"neutral",
        "summary":"고용 발표 뒤 S&P500과 다우는 하락했지만 Nasdaq100과 반도체는 상대적으로 견조했다. 성장 기대는 남았으나 높은 할인율이 업종과 종목을 가르는 좁은 시장이다.",
        "evidence":["9월 4일 S&P500 -0.38%, 다우 -0.51%","Nasdaq100 +0.21%로 대형 기술주 상대강세","주간 확보값 기준 S&P500은 8월 31일 대비 +0.42%"],
        "counterEvidence":["VIX가 하락해 광범위한 공포 확산은 아님","반도체 강세가 위험자산 내부의 선택적 수요를 지지"],
        "indicators":[
          {"label":"S&P500","current":"7,718.60","previous":"7,686.14","change":"+0.42%","changePct":"+0.42%","unit":"index","asOf":"2026-09-04 / 2026-08-31","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"부분기간 상승, 정식 주간 수익률 아님"},
          {"label":"9/4 S&P500","current":"-0.38%","previous":"고용 발표 전","change":"하락","changePct":"-0.38%","unit":"일간","asOf":"2026-09-04 미국장","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"금리 부담 반영"},
          {"label":"9/4 Nasdaq100","current":"+0.21%","previous":"고용 발표 전","change":"상승","changePct":"+0.21%","unit":"일간","asOf":"2026-09-04 미국장","source":"2026-W36 Weekly","sourceUrl":"","interpretation":"기술주 내부 상대강세"}
        ],
        "asOf":"2026-09-04 미국장",
        "nextEvent":"미국 물가 발표와 국채시장 반응",
        "holdCondition":"신용스프레드 안정과 기술주 이익 기대 유지",
        "changeCondition":"시장 폭·소형주·신용의 동반 개선 또는 주식·크레딧의 동반 악화",
        "sourceRefs":[{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      },
      {
        "id":"korea-transmission",
        "label":"한국시장 전달",
        "layer":"시장 확인",
        "currentState":"수급 개선",
        "previousState":"수급 악화",
        "direction":"개선 중",
        "confidence":"보통",
        "tone":"positive",
        "summary":"9월 4일 원화 강세와 외국인·기관의 양 시장 동반 매수로 반등의 질이 개선됐다. 다만 이후 미국 고용 발표로 금리와 달러가 반등했기 때문에 다음 한국장에서 지속성을 확인해야 한다.",
        "evidence":["코스피 외국인 +4,793억원, 기관 +1조6,691억원","코스닥 외국인 +2,600억원, 기관 +1,601억원","USD/KRW 1,350.40원, VKOSPI 39.33으로 전일보다 하락"],
        "counterEvidence":["KOSPI와 KOSDAQ은 9월 1일 대비 각각 -2.17%, -0.94%","9월 4일 미국 고용 이후의 금리·달러 반등은 한국 종가에 반영되지 않음"],
        "indicators":[
          {"label":"KOSPI 외국인 현물","current":"+4,793억원","previous":"-4,234억원","change":"+9,027억원","changePct":"순매도→순매수","unit":"억원 · 순매수","asOf":"2026-09-04 종가","source":"Dashboard","sourceUrl":"https://v.daum.net/v/20260904155904765","interpretation":"외국인 현물 수급 개선"},
          {"label":"USD/KRW","current":"1,350.40원","previous":"1,359.30원","change":"-8.90원","changePct":"-0.65%","unit":"원","asOf":"2026-09-04 15:30","source":"Dashboard","sourceUrl":"https://mobile.newsis.com/view/NISX20260904_0003776930","interpretation":"원화 강세"},
          {"label":"VKOSPI","current":"39.33","previous":"42.42","change":"-3.09","changePct":"-7.28%","unit":"index","asOf":"2026-09-04 종가","source":"Dashboard","sourceUrl":"https://www.yna.co.kr/amp/view/AKR20260904100851008","interpretation":"국내 변동성 완화"},
          {"label":"투자자예탁금","current":"97.7615조원","previous":"102.2672조원","change":"-4.5057조원","changePct":"-4.41%","unit":"조원","asOf":"2026-09-03 최신 공표값","source":"금융투자협회 FreeSIS","sourceUrl":"https://freesis.kofia.or.kr/stat/main.do","interpretation":"대기자금 감소, 원인은 별도 확인 필요"}
        ],
        "asOf":"2026-09-04 한국장",
        "nextEvent":"9월 7일 한국장·9월 10일 선물옵션 만기",
        "holdCondition":"외국인 현물·선물과 시장 폭 개선이 다음 거래일에도 유지",
        "changeCondition":"금리·달러 상승과 함께 외국인 매도 및 VKOSPI 재상승",
        "sourceRefs":[{"type":"daily","id":"2026-09-04","label":"9/4 Daily"},{"type":"weekly","id":"2026-W36","label":"W36 Weekly"}]
      }
    ],
    "nextEvents":[
      {"date":"2026-09-07","title":"미국 Labor Day·한국장 단독 가격발견","why":"미국 현물시장 부재 속에서 금요일 고용 충격을 한국 수급이 처음 소화","axisIds":["financial-conditions","korea-transmission"]},
      {"date":"2026-09-10","title":"미국 PPI·한국 선물옵션 만기","why":"기업 단계 가격압력과 국내 프로그램 수급을 함께 확인","axisIds":["inflation","financial-conditions","korea-transmission"]},
      {"date":"2026-09-11","title":"미국 CPI","why":"FOMC 직전 물가 경로와 금리·달러 방향을 가를 핵심 이벤트","axisIds":["growth","inflation","financial-conditions","global-risk"]}
    ]
  },
  "history":[
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
