const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="([^"?]+)/g)].map(x=>x[1]);
function render(failed=false){
 const nodes={};
 const el=()=>({innerHTML:'',dataset:{},classList:{toggle(){},add(){},remove(){},contains(){return false}},querySelectorAll(){return []},addEventListener(){}});
 const ctx={window:{scrollTo(){},addEventListener(){}},document:{body:el(),getElementById(id){return nodes[id]??=el()},querySelectorAll(){return []}},localStorage:{getItem(){return null}},location:{hash:'#dashboard'}};
 vm.createContext(ctx);
 for(const file of scripts){
  if(file==='assets/script.js'&&failed)ctx.window.MARKET_LEDGER.core.marketDataStatus.status='failed';
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
 }
 return {nodes,core:ctx.window.MARKET_LEDGER.core};
}
const {nodes,core}=render();
assert(nodes.content.innerHTML.includes('핵심지표 자동 갱신'));
assert(nodes.content.innerHTML.includes('갱신 보류 · 기존값 유지'));
assert(nodes.content.innerHTML.includes('매매기준율'));
assert(nodes.content.innerHTML.includes('계약월 미제공'));
assert(nodes.content.innerHTML.includes('시장 판단 · '+core.dashboard.judgmentAsOf));
assert.equal(nodes.researchAsOf.textContent,core.dashboard.judgmentAsOf);
for(const id of ['us_treasury_2y','us_treasury_10y']){
 const cards=core.dashboard.primaryMetrics.filter(x=>x.id===id);
 assert.equal(cards.length,1);
 assert(nodes.content.innerHTML.includes(cards[0].current));
 assert(nodes.content.innerHTML.includes('공식 일별 CMT'));
 assert(nodes.content.innerHTML.includes('이전 관측'));
}
assert(render(true).nodes.content.innerHTML.includes('수집 실패 · 기존 표시값 유지'));
console.log('PASS: Dashboard Treasury cards, separate judgment date, failure state');
