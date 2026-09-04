# Market Ledger data layout

The website renders data registered under `window.MARKET_LEDGER`.

- `core.js`: dashboard, current regime, update metadata and primary metrics
- `macro.js`: latest macro and cross-asset state
- `korea.js`: latest Korea market state
- `ideas.js`: Idea Lab records and status metadata
- `portfolio.js`: portfolio and decision records
- `daily/daily-YYYY-MM.js`: monthly Daily Research archive and its addenda
- `weekly/weekly-YYYY.js`: annual Weekly Report archive
- `calendar/calendar-YYYY-MM.js`: monthly macro event archive
- `archive/`: legacy migration inputs; never loaded by `index.html`

Daily updates modify the matching monthly file directly. Revisions use `updatedAt` and `revisionNote`; they do not create update or revised overlay files.

Live/latest values belong in `core.js`, `macro.js`, or `korea.js`. Historical values used in a report remain inside that Daily report for later review.
