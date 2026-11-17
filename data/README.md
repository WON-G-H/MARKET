# Market Ledger data layout

The website renders data registered under `window.MARKET_LEDGER`.

- `core.js`: dashboard, current regime, update metadata and primary metrics
- `macro.js`: latest macro and cross-asset state
- `korea.js`: latest Korea market state
- `ideas.js`: Idea Lab records and status metadata
- `macro-trader.js`: Telegram posts supplied by the user, with dated summaries and the original text
- `portfolio.js`: portfolio and decision records
- `daily/daily-YYYY-MM.js`: monthly Daily Research archive and its addenda
- `weekly/weekly-YYYY.js`: annual Weekly Report archive
- `calendar/calendar-YYYY-MM.js`: monthly macro event archive
- `archive/`: legacy migration inputs; never loaded by `index.html`

Daily updates modify the matching monthly file directly. Revisions use `updatedAt` and `revisionNote`; they do not create update or revised overlay files.

Live/latest values belong in `core.js`, `macro.js`, or `korea.js`. Historical values used in a report remain inside that Daily report for later review.

Macro Trader 글은 `window.MARKET_LEDGER.macroTrader.items`에 저장한다. 글마다 게시일과 주제를 기준으로 찾을 수 있으며, 식별자는 게시일과 글 제목을 바탕으로 정한다. `title`은 목록의 한글 제목, `originalTitle`과 `original`은 사용자가 제공한 제목과 본문, `source`는 원문에 적힌 출처다. 게시 시각은 알 수 있을 때 `time`에 한국시간으로 기록한다. `summary`, `points`, `limits`에는 요지, 근거와 전달 경로, 가정이나 자료 한계를 적는다. 원문의 전망이나 추정은 글의 주장으로 표시한다. 새 글을 추가할 때 `index.html`에서 해당 데이터의 버전도 갱신한다.

Idea Lab 보관함은 `index.html#ideas`로 접근한다. 보관함에 들어간 상태에서는 상단 검색으로 Idea Lab 기록을 찾을 수 있다.

Phase 2: `tools/collect-market.ps1` collects official Treasury CMT rates and updates only the two Treasury Dashboard cards in `core.js`, plus `marketDataStatus`. It refreshes the `core.js` cache version in `index.html`. `dashboard.judgmentAsOf` is maintained by the AI author when the Dashboard interpretation changes, never by the collector. Macro, Korea, Regime and historical reports are not synchronized automatically. Use `-CollectOnly` for collection without Dashboard writes. See `tools/README.md` for details.

Idea Lab uses canonical Narrative schema v3. Every record is self-contained inside `ideas.items[n]`; rendering does not merge legacy fields or a separate metadata object. Each record preserves `originalHypothesis` and separately maintains a one-line `currentView`, the explanatory `currentThesis`, `direction`, `confidence`, evidence balance, decision thresholds, next validation and structured research logs. A `signalBoard` is optional and appears only when current values and thresholds materially help the research. Complex external reports may additionally use internal `sourceAnalysis` data to preserve a full main hypothesis, independently rated sub-hypotheses and exact `AND` / `OR` / `N-of-M` / `SEQUENTIAL` / `INVALIDATION` rules; simpler Ideas omit it. Unless the source itself uses those terms, the UI does not expose the internal identifiers or operators and instead renders their exact meaning as natural-language research prose. `status` is either `검증 중` or `종료`; a closed record also requires `outcome` and a complete `finalView`. Closed Narratives are immutable and later questions become new records linked as related research.
