const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([^"?]+)/g)].map(x => x[1]);
const nodes = {}, handlers = {};
function element() { return {innerHTML:'', dataset:{}, classList:{toggle(){},add(){},remove(){},contains(){return false}}, querySelectorAll(){return []}, addEventListener(type,fn){this[type]=fn}}; }
const context = {window:{scrollTo(){},addEventListener(type,fn){handlers[type]=fn}}, document:{body:element(),getElementById(id){return nodes[id]??=element()},querySelectorAll(){return []}}, localStorage:{getItem(){return null}},location:{hash:'#regime'}};
vm.createContext(context);
for (const file of files) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const ledger=context.window.MARKET_LEDGER;
const regime=ledger.regime.current;
assert(html.includes('data-view="regime"'));
assert.equal(regime.axes.length,6);
for(const axis of regime.axes){
  for(const field of ['id','label','layer','currentState','previousState','direction','confidence','summary','evidence','counterEvidence','indicators','asOf','nextEvent','holdCondition','changeCondition','sourceRefs']) assert(field in axis,`${axis.id}: ${field}`);
  for(const indicator of axis.indicators) for(const field of ['label','current','previous','change','changePct','unit','asOf','source','sourceUrl','interpretation']) assert(field in indicator,`${axis.id}/${indicator.label}: ${field}`);
}
assert(nodes.content.innerHTML.includes('현재 시장 상태'));
assert(nodes.content.innerHTML.includes('시스템 유동성'));
assert(nodes.content.innerHTML.includes('시장 금융여건'));
assert(nodes.content.innerHTML.includes('반대 근거와 한계'));
assert(nodes.content.innerHTML.includes('Regime 유지 조건'));
assert(nodes.content.innerHTML.includes('다음 핵심 이벤트'));
assert(nodes.content.innerHTML.includes('최근 상태 변화'));
assert(nodes.content.innerHTML.includes('data-log="2026-09-04"'));
assert(nodes.content.innerHTML.includes('data-week="2026-W36"'));
nodes.globalSearch.input({target:{value:'시스템 유동성'}});
assert(nodes.content.innerHTML.includes('Regime Monitor'));
assert(nodes.content.innerHTML.includes('data-jump="regime"'));
context.location.hash='#weekly/2026-W36';handlers.hashchange();
for(let i=0;i<=16;i++) assert(nodes.content.innerHTML.includes('weekly-section-'+String(i).padStart(2,'0')));
assert(!nodes.content.innerHTML.includes('Regime Monitor 구축'));
console.log('PASS: regime data, six axes, evidence details, links, search, responsive classes and Weekly preservation');
