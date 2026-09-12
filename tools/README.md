# Market Ledger 데이터 수집 · Dashboard 반영

## 더블클릭 갱신 (2026-09-12, 현재 운영 방식)

**Macro Calendar도 같은 실행기에 포함됩니다.** BEA의 GDP·개인소득/소비(PCE)·무역수지, 연준 FOMC 공식 일정을 조회하며
BLS CPI·PPI·고용·JOLTS 등은 공식 ICS 접근이 성공할 때 수집합니다. 현재 BLS는 HTTP 403으로 접근이 차단되어 기존 일정을 유지합니다.
출처별 성공·실패와 확인 시각을 캘린더 상단 및 `market-data/collection-status.json`의 `calendar`에 표시합니다.

수집 일정은 `market-data/calendar/`에 원응답·실행별 스냅샷으로 보관하고 `data/calendar-live.js`로 표시합니다.
기존 월별 수동 캘린더의 실제치·컨센서스·해석·연결 Daily는 보존합니다. 시간 경과만으로 발표 완료를 선언하거나 실제치를 생성하지 않습니다.
공식 시간이 있으면 KST로 변환하며, FOMC에 종료일만 제공되면 시간 미확인을 표시합니다. 기존에 기록한 KST 시간이 있는 FOMC는 이를 유지합니다.
공식 응답에서 사라진 일정은 취소로 단정하지 않고 재확인 대상으로 남깁니다. 최초 현재 달부터 약 4개월간 수집하며 이후 저장된 과거 일정도 유지합니다.
국내·중국·ISM·ADP·기업실적 등은 아직 자동 일정 출처가 연결되지 않아 기존 수동 일정을 유지합니다.

프로젝트 폴더의 **`시장데이터 업데이트.cmd`를 더블클릭**합니다.
수집이 끝나면 로컬 사이트가 열립니다. 이미 열려 있으면 Ctrl+F5로 새로고침합니다.
창에는 성공 또는 일부 실패가 표시되며, 아무 키나 누르면 닫힙니다. 수집 중에는 창을 닫지 마세요.
이 파일만 다른 폴더로 옮기지 마세요. 원하면 이 파일의 Windows 바로가기를 만들어 사용합니다.

- 기존 매일 19시 Codex 예약은 **일시정지**했습니다. 사용자가 실행할 때만 갱신합니다.
- Python이 직접 실행되므로 Codex 앱을 열 필요가 없고 AI 토큰을 사용하지 않습니다. 인터넷과 Python은 필요합니다.
- 이 PC의 기존 번들 Python을 우선 사용하고, 없으면 설치된 `python`을 사용합니다.
- Dashboard 숫자, Macro 자동 수집 표, 한국시장 지수·수급 표를 같은 실행에서 갱신합니다.
- Macro·한국시장의 기존 본문은 작성 당시 숫자와 해석으로 날짜를 표시해 보존합니다. GDP·수출·섹터 등 미연결 수치는 자동 갱신하지 않습니다.
- **VKOSPI는 Investing.com의 KOSPI Volatility 역사 시세 표에 연결했습니다.** 두 개 이상 관측일, 종가·고저 범위를 검사합니다.
- 원천 차단·결측·형식 변경 시 이전 값을 유지하고 경고합니다. 웹검색 결과를 자동으로 대신 입력하지 않습니다.
- 외부 웹사이트 배포는 하지 않으며 이 폴더의 로컬 사이트가 열립니다.

`data/market-live.js`는 Macro·한국시장이 함께 읽는 숫자 전용 스냅샷입니다. `data/macro.js`, `data/korea.js`의
작성된 리서치를 자동으로 수정하지 않습니다. 새 데이터에는 관측일·기간·단위·수집 상태를 표시합니다.
`market-data/collection-status.json`에 전체 결과와 사이트 스냅샷 반영 여부가 남습니다.

실행기를 창/브라우저 자동 열기 없이 점검하려면 `powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\run-update.ps1 -NoOpen`을 사용합니다.
아래 단계별 설명 중 예약·VKOSPI 관련 과거 제한은 이 절의 현재 운영 방식으로 대체됩니다.

## 5단계: 공개 데이터 수집 범위 확대 (2026-09-12)

기존 수집에 **17개 계열**을 추가했습니다. `collect-market.ps1` 기본 실행에 함께 실행됩니다.
별도 API 키·패키지·데이터베이스·AI API 호출은 필요하지 않습니다.

| 범위 | 추가 계열 | 기준 |
|---|---|---|
| 국내 지수 | KOSPI200 | 네이버 일별 지수 |
| 국내 수급 | KOSPI 개인·기관, KOSDAQ 개인·외국인·기관 | 억원 순매수; KOSPI 외국인은 기존 수집 유지 |
| 환율 | JPY/KRW, EUR/KRW, CNY/KRW | 매매기준율; 엔화는 **100엔당 원** |
| 미국 유동성 | WALCL, WTREGEN, RRPONTSYD, M2SL | FRED; 연준 자산·TGA는 백만 달러, RRP·M2는 십억 달러 |
| 미국 경제 | CPIAUCSL, UNRATE | FRED/BLS 월간·계절조정 CPI 지수와 실업률 |
| 한국 경제 | 소비자물가 상승률, 실질 GDP 성장률 | World Bank **연간** 전년 대비 변화율 |

```powershell
# 기존 핵심지표 + 확장 데이터 수집; 기존 Dashboard 숫자 반영
.\tools\collect-market.ps1
# 새 17개 계열만 수집; 사이트 수정 없음
.\tools\collect-market.ps1 -ExpandedOnly
```

새 데이터는 `market-data/expanded/latest.md`에서 확인합니다. AI에 원수치·기간·이전값·단위·실패 상태를 전달할 때는
`market-data/expanded/latest.json`을 사용합니다. 현재 Macro·한국시장에는 이 숫자를 반영하며, 기존 3단계 입력 생성기에 자동 삽입하지는 않습니다.

- `history.json`: 지표/관측기간 키로 중복 제거한 원수치, 수집 시각, 원자료 해시 및 정정 이력.
- `raw/<해시>.txt`: UTF-8로 저장한 응답. 해시는 변환 전 원응답 바이트 기준.
- `runs/<수집시각>.json`: 수집 시점별 결과. 같은 원수치는 history에 중복 추가하지 않습니다.
- 기본 실행의 `market-data/collection-status.json`에는 `expandedData` 상태가 추가됩니다. 확장 전용 실행은 `expanded/latest.json`을 확인합니다.

동일 수급 표는 한 번만 요청하며, 최대 4개 HTTP 요청을 동시에 처리합니다. 원출처별 실패는 독립 처리하며
실패·최근 결측·응답 기간 회귀가 있으면 저장값을 유지하고 경고합니다. 결측을 0으로 대체하지 않습니다.
수급 열 순서가 바뀌면 실패 처리합니다. 단위가 다른 계열을 합산한 유동성 점수나 투자 판단은 생성하지 않습니다.

관측기간과 발표시각은 다릅니다. 월간 FRED의 `YYYY-MM-01`은 해당 월을 나타내며 발표일이 아닙니다.
연간 데이터는 `YYYY`로 보존합니다. 주기별 지연 안내 기준은 일별 7일, 주별 21일, 월별 100일, 연별 730일이며
이는 실제 발표 캘린더를 확인한 판정이 아닙니다. 저장본에는 사후 정정이 포함될 수 있으므로 백테스트 당시 정보로 간주하지 않습니다.

한국 **월간** CPI·M2·기준금리의 신규 연결은 아직 지원하지 않습니다. 연간 한국 통계로 월간 최신치를 대체하지 않습니다.
기존 예탁금·신용융자잔고 수집은 유지합니다. 수집 확장은 기존 시장 해석·Confidence·보고서·예약 시간을 바꾸지 않습니다.

검증: `python -m unittest discover -s tests -p test_expanded_data.py -v`

## 핵심지표 자동 갱신 (2026-09-11)

`powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\collect-market.ps1`

기존 명령으로 미국 금리뿐 아니라 Dashboard 핵심지표를 함께 갱신합니다. 추가 패키지나 AI API 호출은 없습니다.
이후 더블클릭 실행으로 전환했으며 19시 Codex 예약은 일시정지했습니다.
예약은 Python 실행을 지시하는 Codex 작업이므로 예약 작업 자체에는 모델 사용량이 발생할 수 있습니다.

| 카드 | 원자료와 기준 |
|---|---|
| KOSPI·KOSDAQ | 네이버 금융 일별 지수 시세; 한국 16시 이전에는 전일까지 |
| 이격도 | 위 지수 각각의 20거래일 종가 평균 대비 비율 ×100; 21개 이상 관측으로 전회와 비교 |
| VIX | CBOE 공식 일별 종가 CSV |
| KOSPI 외국인 현물 | 네이버 금융 KOSPI 투자자별 순매수; 억원 |
| 신용융자잔고·투자자예탁금 | 금융투자협회 FreeSIS; 백만원을 조원으로 환산 |
| USD/KRW | 네이버 매매기준율; 기존 서울 15:30 현물 종가와 다른 시세 |
| 미국 2년·10년 금리 | 기존 Treasury 공식 일별 CMT 수집 유지 |
| WTI | 네이버 OIL_CL 일별 연속시세; 계약월 미제공, 월물 변경 포함 가능 |
| VKOSPI | Investing.com KOSPI Volatility 일별 역사 시세; 직접 접근 실패 시 기존값 유지 |

`market-data/collection-status.json`에 전체 실행 결과, `market-data/indicators/latest.json`에 지표별 성공·실패와 출처를 저장합니다.
`indicators/history.json`에는 날짜·지표별 관측과 정정 이력, `raw/`에는 원응답을 UTF-8로 보관합니다(해시는 변환 전 바이트 기준).
Treasury의 기존 `market-data/history.json`, `latest.json` 계약은 유지됩니다. 3단계 AI 입력 묶음의 자동 데이터는 여전히 Treasury 중심입니다.
이격도 계산에 사용된 지수 시계열과 결과는 최신 실행 스냅샷에서 추적할 수 있습니다.

수집 실패·누락·과거 날짜 회귀는 기존 카드 숫자를 보존하고 상태를 표시합니다. 7일 초과 원자료에는 지연 안내가 붙습니다.
KOFIA는 월/일만 제공하므로 수집일 기준 가까운 연도를 추론하며, 전회 공표값은 제공된 증감액으로 계산합니다. 전회 날짜는 임의로 채우지 않습니다.
숫자 형식 검증은 독립 교차검증을 뜻하지 않습니다. 시장 해석과 AI 점수, 과거 보고서는 변경하지 않습니다.
기존 수동 숫자와 수집된 숫자는 출처·시점 차이로 다를 수 있고, 과거 보고서를 새 숫자로 소급 수정하지 않습니다.

`-CollectOnly`는 사이트 반영 없이 수집합니다. 과거 `-ObservationDate`는 기존 Treasury 수집만 지원하며, 과거 자료를 Dashboard에 반영할 수 없습니다.
종료코드: 0 전체 성공, 2 일부 실패/보류, 1 실행 오류. `.all.lock`은 중복 실행을 막습니다.
VKOSPI를 포함해 모두 성공하면 0입니다. 일부 실패했다고 전체 데이터를 다시 수동 편집하지 마세요.
이 명령은 로컬 사이트 파일을 갱신합니다. 별도 원격 배포는 수행하지 않습니다.

## 4단계: AI Daily 결과 검증·저장

첫 지원 모듈은 **Daily**입니다. AI는 보고서와 판단을 작성하고, Python은 필수 항목·날짜·중복을 검증한 뒤
월별 Daily 파일과 사이트의 해당 파일 연결만 갱신합니다. Weekly·Regime·Idea 결과 저장은 아직 지원하지 않습니다.

채팅에서는 “오늘 자료로 Daily 작성하고 저장해줘”라고 요청하면 됩니다.
AI는 먼저 입력 자료를 확인하고 결과 JSON을 작성합니다. Python이 투자 판단이나 보고서 본문을 만들지는 않습니다.
이번 기능 설치만으로 오늘 Daily를 생성하거나 기존 보고서를 수정하지 않았습니다.

직접 사용하는 순서:

```powershell
# 1. 오늘 입력 묶음과 빈 AI 결과 양식 생성
.\tools\save-research.ps1 -Action template
# 2. AI가 research-results/daily-YYYY-MM-DD.json의 빈 내용을 작성
# 3. 검증만 수행 (사이트 수정 없음)
.\tools\save-research.ps1 -Action check -File .\research-results\daily-2026-09-11.json
# 4. 완성된 신규 Daily 저장
.\tools\save-research.ps1 -Action apply -File .\research-results\daily-2026-09-11.json
```

날짜를 지정하려면 template에 `-Date YYYY-MM-DD`를 붙입니다. 같은 이름의 결과가 있으면 덮어쓰지 않습니다.
빈 양식은 미완성 결과이며 check/apply를 통과하지 않습니다. 날짜별 예시 경로를 실제 작성 날짜로 바꿉니다.
Python 직접 실행은 `python tools/research_result.py template`, `check <파일>`, `apply <파일>`입니다.

### AI 작성 계약

- 최상위: `schemaVersion: 1`, `module: daily`, `date`, `context`, `report`, `addendum`, `researchAudit`, `revisionNote`.
- `context.file`과 `context.sha256`는 양식이 참조한 AI 입력 파일과 내용 해시입니다. 다른 날짜의 입력이나 변경된 입력은 거부합니다.
- `report`: `date`, `title`, `tags`, `lead`, `report`(02~07 순서의 6개 섹션), `watch`.
- 각 본문 섹션: `no`, `title`, `paragraphs`.
- `addendum`: `changes.maintained`, `changes.new`, `assessment`, `implications`, `conclusion`.
- `researchAudit`: 출처 `sources`, 미확인 내용 `unverified`, 반대 근거 `counterEvidence`, 시간 귀속 `timingNotes`.
- 각 출처: `reference`, `verification`(`primary_checked` / `secondary_only` / `unverified`), `note`.
- 감사 항목은 AI가 확인한 범위와 한계를 명시하는 기록입니다. Python의 형식 검증은 사실 확인이 아니며 자동으로 verified 상태를 부여하지 않습니다.
- 자료가 없으면 숫자나 근거를 만들어 채우지 않습니다. 실제 판단의 한계를 설명합니다. 없다고 확인한 감사 항목도 이유를 문장으로 적습니다.
- 모든 보고서 문장은 일반 텍스트로 작성합니다. HTML은 지원하지 않으며 저장할 때 안전하게 표시 문자로 변환됩니다.
- `month`, `createdAt`, `updatedAt`과 저장 경로는 Python이 관리합니다. AI는 파일 경로를 지정하지 않습니다.

### 기존 Daily 수정

기존 운영 지침대로 완성본 소급 수정은 사용자가 그 수정을 요청·승인한 경우에만 수행합니다.
check는 `revise` 여부와 `recordHash`를 반환합니다. 내용을 사용자에게 설명할 때 결과 JSON과 해당 기존 보고서를 비교합니다.
이미 사용자가 구체적인 수정을 요청했다면 다시 승인을 요구할 필요는 없습니다.
수정 사유를 결과 JSON의 `revisionNote`에 넣고, 확인한 기존 기록 해시를 전달합니다.

```powershell
.\tools\save-research.ps1 -Action apply -File .\research-results\daily-2026-09-10.json -AllowRevision -ExpectedHash '<check가 반환한 recordHash>'
```

이 플래그는 코드의 쓰기 보호 장치이며 사용자 승인을 대신하지 않습니다. 해시가 달라지면 다시 검토합니다.
신규 Daily 저장에는 이 옵션이 필요 없습니다. 같은 본문·판단을 재적용하면 `unchanged`로 처리합니다.

### 저장·복구 범위

- `data/daily/daily-YYYY-MM.js`에서 해당 날짜의 report와 addendum을 함께 저장하고 날짜순으로 정렬합니다.
- 같은 월의 다른 기록은 보존합니다. 새 월이면 월별 파일을 만들고 `index.html`에서 렌더러보다 먼저 읽도록 연결합니다.
- 캐시 버전을 갱신하므로 로컬 사이트 새로고침 시 표시됩니다. 외부 사이트 배포는 수행하지 않습니다.
- Dashboard·Macro·Korea·Regime·Weekly·Idea 데이터는 수정하지 않습니다.
- `research-results/receipts/<실행>/`에 입력 결과, 적용 상태와 수정 전 Daily/index를 보존합니다.
- 일반 쓰기 오류는 본 작업이 쓴 내용에 한해 되돌립니다. 동시 작업이 바꾼 파일을 덮어쓰지 않습니다.
- 프로세스 강제 종료까지 보장하는 다중 파일 DB 트랜잭션은 아닙니다. 이 경우 receipt 상태와 백업을 확인한 뒤 재실행하여 연결을 복구합니다.
- `.write.lock`은 중복 저장을 막습니다. 실행 중인 저장기가 없는 것을 확인한 뒤에만 비정상 종료로 남은 lock을 제거합니다.
- 날짜·입력 해시·필수 항목 검증을 통과해도 문장의 인과관계와 수치 정확성은 AI의 리서치 책임입니다.

테스트: `python -m unittest discover -s tests -p test_research_result.py -v`

## 3단계: AI 리서치 입력 준비

채팅에서는 “오늘 Daily 입력 묶음 만들어줘”, “이번 주 Weekly 입력 준비해줘”,
“Idea 스크리닝 자료 준비해줘”처럼 요청하면 됩니다. 입력 묶음 생성은 AI 판단이나 보고서 작성을 실행하지 않습니다.

직접 실행:

```powershell
.\tools\prepare-research.ps1 -Mode daily
.\tools\prepare-research.ps1 -Mode weekly
.\tools\prepare-research.ps1 -Mode regime
.\tools\prepare-research.ps1 -Mode idea
```

특정 가설의 검토가 필요하다고 판단한 뒤 해당 ID만 지정할 수 있습니다.

```powershell
.\tools\prepare-research.ps1 -Mode idea -Date 2026-09-10 -IdeaId diesel-inflation -Query '디젤'
.\tools\prepare-research.ps1 -Mode daily -Source intake-2026-09-10.md
.\tools\prepare-research.ps1 -Mode weekly -MaxChars 180000
```

검색어는 `-Query '디젤','운임'`처럼 여러 개 지정할 수 있습니다. 문자열 일치로 자료 후보만 고릅니다.
Python이 인과관계, Material Change, 가설 강화·약화, Confidence를 판단하지 않습니다.
`-Source`는 `research-notes` 아래 Markdown 파일을 명시적으로 추가하는 옵션입니다.
다른 폴더나 대상일 이후 날짜의 intake는 허용하지 않습니다.

출력은 `research-context/<작업>-<대상일>.json`과 `.md`입니다.
Idea ID와 검색어·추가 출처가 있으면 구분자가 붙어 다른 입력 묶음과 충돌하지 않습니다.
같은 옵션으로 재실행하면 해당 파일을 갱신합니다. 실패 시 기존 출력은 유지되므로 실패 메시지 뒤에 오래된 출력을 새 결과로 취급하지 않습니다.

| 작업 | 기본 포함 문맥 |
|---|---|
| Daily | 수집 금리·이전 관측, 직전 Daily 본문과 addendum, 해당 날짜 기존 Daily, 날짜가 맞는 Regime·Macro·Korea, 당일 intake |
| Weekly | 월요일부터 대상일까지 Daily, 직전 Weekly 가설·Change Board, 해당 주 Macro·Portfolio, Regime, 해당 기간 intake와 금리 비교 |
| Regime | 기존 Regime 근거와 조건, 최근 Daily, Macro·Korea, 당일 intake와 금리 |
| Idea 기본 | 경량 색인, 당일 intake, 금리. `ideas.js` 상세를 읽지 않음 |
| Idea ID 지정 | 해당 Idea 원문 전체와 색인 항목, 당일 자료 후보와 금리. 다른 Idea 원문은 AI 입력에서 제외 |

Weekly는 Idea 색인·상세를 읽지 않습니다. 과거 Weekly의 Idea 전용 레거시 필드와 intake의 Idea Lab 스크리닝 제목 구간은 제외합니다.
Python은 저장 파일을 파싱할 수 있지만 AI에는 선택한 레코드·구간만 전달합니다.
JavaScript를 실행하지 않고 JSON 형태의 데이터 리터럴과 기존 trailing comma만 처리합니다.

각 블록에 원본 절대 경로, 레코드 ID 또는 줄 범위, 파일 내용 해시를 남깁니다.
자료 본문과 검증 한계를 임의로 요약하지 않고 `##` 구간 전체를 유지합니다.
검색어가 있으면 제목·본문에 해당 문자열이 있는 구간과 자료 머리말을 우선합니다.
명시적으로 추가하지 않은 과거 intake나 별도 날짜 범위 보고서를 모두 자동 탐색하지 않습니다.

기본 본문 한도는 Daily·Regime·Idea 60,000자, Weekly 120,000자입니다. 실제 토큰 수가 아닙니다.
필수 판단·조건·반례가 한도를 넘으면 실패하여 잘린 가설을 전달하지 않습니다.
선택 자료가 한도를 넘으면 구간을 통째로 제외하고 `omitted`에 원문 위치와 이유를 기록합니다.
자료가 빠진 묶음은 완전한 리서치 입력이라고 가정하지 말고 `warnings`와 `omitted`를 확인한 뒤
필요한 출처·검색어를 지정하거나 `-MaxChars`를 늘립니다. 해석에 필요한 반례도 AI가 확인해야 합니다.

오늘 intake가 없으면 이전 날짜를 오늘 자료로 대체하지 않습니다.
관측일 필터는 당시 정보 가용성을 재현하는 백테스트가 아닙니다. 과거 파일의 사후 정정이 포함될 수 있습니다.
발표시각·한국시장 귀속일·최종 사실 검증은 리서치 시 확인합니다.
생성기는 인터넷 조회, 금리 재수집, AI 호출, 원본 수정, 보고서 저장, 사이트 반영을 하지 않습니다.
최신 금리가 필요하면 먼저 수집 명령을 실행합니다.

```powershell
.\tools\collect-market.ps1
.\tools\prepare-research.ps1 -Mode daily
```

생성된 JSON과 이번 채팅에서 추가된 자료를 AI가 읽고 판단합니다.
완성한 Daily 결과를 검증·저장하는 방법은 위 4단계 설명을 따릅니다. 다른 모듈의 결과 저장은 이후 확장 범위입니다.

검증:

```text
python -m unittest discover -s tests -p test_research_context.py -v
```

## 1·2단계 수집과 반영

미국 재무부 공식 일별 Par Yield Curve의 2년·10년 CMT를 수집합니다.
Python 표준 라이브러리만 사용하며 API 키, 패키지 설치, DB가 필요하지 않습니다.
정의·접근 방법: https://home.treasury.gov/treasury-daily-interest-rate-xml-feed
장중 거래 금리와 다른 계열이므로 기존 시황 수치에 자동 대입하지 않습니다.

## 실행

프로젝트 폴더의 PowerShell에서:

```powershell
.\tools\collect-market.ps1
```

일반 Python 3.10 이상이 설치된 환경:

```text
python tools/market_data.py
python -m unittest discover -s tests -p test_market_data.py -v
```

이 컴퓨터는 Codex 번들 Python을 실행 스크립트가 우선 사용합니다.
네트워크가 허용된 환경에서 실행해야 합니다. 성공은 종료 코드 0, 실패는 1입니다.
아래 1·2단계 설명은 Treasury 전용 Python 실행의 범위입니다. 현재 PowerShell 기본 명령은 위 핵심지표·5단계까지 수집합니다.
현재 매일 19시 예약 실행에 연결돼 있으며, 외부 사이트 게시 자동화는 포함하지 않습니다.

수집만 실행하거나 과거 관측일로 수집할 때:

```powershell
.\tools\collect-market.ps1 -CollectOnly
.\tools\collect-market.ps1 -CollectOnly -ObservationDate 2026-09-10
```

Python 직접 실행 시 `--update-dashboard`를 붙여야 Dashboard까지 반영합니다.
Dashboard 반영에는 기본 저장 폴더와 오늘 KST 날짜만 허용합니다.

## 2단계 반영 범위

- `data/core.js`의 미국 금리 숫자 카드와 `marketDataStatus`만 자동 갱신합니다.
- 기존 미국 10년물 참고 시세 카드는 공식 일별 CMT 카드로 전환하고 2년물 카드를 추가합니다.
- 이전값도 같은 공식 계열에서 가져오므로 장중 시세와 섞어 변화량을 계산하지 않습니다.
- `dashboard.judgmentAsOf`는 AI 해석을 작성한 시각입니다. 수집기는 이 값과 본문·Regime·Confidence를 수정하지 않습니다.
- AI가 Dashboard 해석을 새로 작성할 때 `judgmentAsOf`도 함께 갱신해야 합니다.
- 수집 실패·결측·더 오래된 관측값은 기존 카드를 유지하고 상태로 알립니다.
- `index.html`의 core 데이터 버전을 내용 해시로 갱신합니다. 페이지를 새로고침하면 반영됩니다.
- 반영 전 core 원문을 `market-data/dashboard-backups/<hash>.js`에 보존합니다.
- 각 파일은 원자적으로 교체하지만 core와 index 두 파일 전체가 하나의 트랜잭션은 아닙니다. 중간 파일 쓰기 실패 시 재실행하면 버전이 복구됩니다.
- `.dashboard.lock`은 Dashboard 반영 중복 실행을 방지합니다. 실행 중인 작업이 없는데 비정상 종료로 남은 경우에만 제거합니다.

## 결과

`market-data/`는 사이트가 읽지 않는 별도 폴더입니다.

- `history.json`: 관측일·지표별 수치와 과거값 정정 이력. 단일 파일을 원자적으로 교체합니다.
- `raw/<hash>.xml`: 내용 해시로 중복 제거한 원응답.
- `latest.json`: AI 입력. 현재·이전 유효 관측값, bp 변화, 10Y−2Y 차이, 출처와 상태.
- `latest.md`: 사람이 읽는 짧은 요약.
- `runs/<수집시각>.json`: 실행 시점별 입력 묶음. 동일 데이터라도 수집 상태 확인 기록은 추가합니다.

AI에게 `latest.json`과 이번 작업에 필요한 intake·직전 판단만 전달합니다.
1단계는 문맥 선별, AI 호출, 투자 판단, Confidence Score 계산을 수행하지 않습니다.
수집 전용 실행은 기존 사이트를 수정하지 않습니다. 기본 PowerShell 실행의 Dashboard 반영 범위는 위 2단계 설명을 따릅니다. 과거 보고서와 Idea 색인은 수정하지 않습니다.

## 데이터 처리 원칙

- 당해 연도와 직전 연도를 요청해 연초에도 이전 유효 관측값을 찾습니다.
- 금리는 % 단위, 변화는 `(현재−이전)×100` bp입니다. 달력상 전일을 의미하지 않습니다.
- 결측은 0으로 채우지 않습니다. 기존 유효값은 유지하고 최신 응답 결측 여부를 표시합니다.
- 관측일과 수집시각을 분리합니다. 발표시각은 원응답에서 확인하지 못하므로 null입니다.
- 원출처 수집과 숫자·구조 검증만 수행하며 독립 교차검증 완료로 표시하지 않습니다.
- 4일 초과 경과는 오래된 값으로 표시합니다. 미국 휴일 달력 판정은 아직 없으며 휴장으로 단정하지 않습니다.
- 일부 요청이라도 실패하면 history를 갱신하지 않고 latest에 실패·기존값 사용 여부를 표시합니다.
- 원응답의 빈 피드·구조 변경·충돌 중복·비정상 숫자는 실패 처리합니다.
- `--date YYYY-MM-DD`는 관측일 상한입니다. 당시 공표된 정보만 재현하는 백테스트 기능이 아닙니다.
- 이미 저장된 원값이 바뀌면 정정 이력을 보존합니다. 과거 보고서에 소급 반영하지 않습니다.
- 중복 실행은 `.lock`으로 차단합니다. 비정상 종료로 lock이 남으면 실행 중인 수집기가 없는지 확인 후 해당 파일만 제거합니다.

이전 두 관측일이 충분하지 않으면 변화량은 null입니다. 원응답에 해당 연도 관측값이 전혀 없는 연초에는 실패 상태로 기존값을 유지합니다.
