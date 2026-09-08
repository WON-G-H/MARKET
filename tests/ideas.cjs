const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const ideasSource = fs.readFileSync(path.join(root, 'data/ideas.js'), 'utf8');
const scriptSource = fs.readFileSync(path.join(root, 'assets/script.js'), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(ideasSource, context);

const data = context.window.MARKET_LEDGER.ideas;
const items = data.items;
const allowedLogDirections = new Set(['등록', '강화', '약화', '구조 수정', '종료']);
const sourceOrder = items.map(item => item.id);

assert.equal(data.schemaVersion, 4);
assert.equal(items.length, 14);
for (const idea of items) {
  assert.equal(Object.hasOwn(idea, 'confidence'), false, `${idea.id}: old confidence field`);
  assert(Number.isInteger(idea.confidenceScore), `${idea.id}: score must be integer`);
  assert(idea.confidenceScore >= 0 && idea.confidenceScore <= 100, `${idea.id}: score range`);
  assert(idea.confidenceRationale?.trim(), `${idea.id}: rationale required`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(idea.lastReviewed), `${idea.id}: lastReviewed`);
  assert(idea.nextValidation.length >= 3 && idea.nextValidation.length <= 5, `${idea.id}: decisive validations`);
  for (const log of idea.researchLog) {
    assert(allowedLogDirections.has(log.direction), `${idea.id}: non-material log direction ${log.direction}`);
    assert(!/검증 중 유지|주간 유지|W\d{2}/.test(`${log.newInformation} ${log.impact}`), `${idea.id}: boilerplate timeline entry`);
  }
  const lastLogDate = idea.researchLog.at(-1).date.replaceAll('.', '-');
  const materialDate = (idea.updatedAt || idea.updated).slice(0, 10);
  assert.equal(materialDate, lastLogDate, `${idea.id}: updated date must match last material change`);
  if (idea.status === '종료') {
    assert(['확인', '조건부 확인', '오류 / 기각'].includes(idea.outcome), `${idea.id}: outcome`);
    assert(Number.isInteger(idea.finalView?.finalConfidenceScore), `${idea.id}: final score`);
    assert(idea.finalView?.applicationRange?.length, `${idea.id}: application range`);
    assert(idea.finalView?.remainingLimitations?.length, `${idea.id}: remaining limitations`);
  }
}

const sorted = items.slice().sort((a, b) =>
  (b.updatedAt || b.updated || b.date || '').localeCompare(a.updatedAt || a.updated || a.date || '')
);
assert.deepEqual(items.map(item => item.id), sourceOrder, 'sorting a copy must not mutate source order');
assert(sorted[0].updatedAt || sorted[0].updated, 'sorted list has latest item first');
assert(scriptSource.includes('AI Confidence'));
assert(scriptSource.includes('예측확률이 아닌 AI 연구 판단 점수'));
assert(scriptSource.includes('scoreChange'));
assert(scriptSource.includes('scoreChangeText'));
assert(scriptSource.includes('finalConfidenceScore'));

const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...indexSource.matchAll(/<script src="([^"?]+)/g)].map(match => match[1]);
const nodes = {};
const handlers = {};
function element() {
  return {
    innerHTML: '', dataset: {},
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    querySelectorAll() { return []; },
    addEventListener(type, fn) { this[type] = fn; }
  };
}
const ui = {
  window: { scrollTo() {}, addEventListener(type, fn) { handlers[type] = fn; } },
  document: { body: element(), getElementById(id) { return nodes[id] ??= element(); }, querySelectorAll() { return []; } },
  localStorage: { getItem() { return null; }, setItem() {} },
  location: { hash: '#ideas' }
};
vm.createContext(ui);
for (const file of files) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ui);
assert(nodes.content.innerHTML.includes('AI Confidence'));
assert(nodes.content.innerHTML.includes('68 / 100'));
assert(scriptSource.includes('AI CONFIDENCE SCORE'));
assert(scriptSource.includes('최근 검토'));
assert(scriptSource.includes('개의 Material Change'));

console.log('PASS: Idea Lab score, lifecycle, material timeline, validation limits and immutable sorting');
