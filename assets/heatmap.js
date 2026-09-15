(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let market='KOSPI',sector='',selected='';
const pct=n=>(n>0?'+':'')+n.toFixed(2)+'%';
const color=n=>Math.abs(n)<.05?'#475560':n>0?(n>=3?'#148654':n>=1?'#20976b':'#347661'):(n<=-3?'#b61d31':n<=-1?'#a32b39':'#85414a');
function layout(items,x=0,y=0,w=1200,h=760){
 if(!items.length)return [];
 if(items.length===1)return [{item:items[0],x,y,w,h}];
 const total=items.reduce((s,i)=>s+i.weight,0);let sum=0,split=1,best=Infinity;
 for(let i=1;i<items.length;i++){sum+=items[i-1].weight;const distance=Math.abs(total/2-sum);if(distance<best){best=distance;split=i;}}
 const first=items.slice(0,split),second=items.slice(split),ratio=first.reduce((s,i)=>s+i.weight,0)/total;
 return w>=h?[...layout(first,x,y,w*ratio,h),...layout(second,x+w*ratio,y,w*(1-ratio),h)]:[...layout(first,x,y,w,h*ratio),...layout(second,x,y+h*ratio,w,h*(1-ratio))];
}
function themeOf(r){
 const source=r.sector||'업종 미확인',industry=r.industry||'';
 if(source==='Technology')return /semiconductor/i.test(industry)?'반도체·AI 하드웨어':/software|programming/i.test(industry)?'소프트웨어·클라우드':'IT·전자 하드웨어';
 const us={'Health Care':'바이오·헬스케어','Finance':'금융·투자','Consumer Discretionary':'소비·커머스','Consumer Staples':'필수소비재','Industrials':'산업재·운송','Energy':'에너지·유틸리티','Utilities':'에너지·유틸리티','Basic Materials':'소재·화학','Real Estate':'부동산','Telecommunications':'미디어·통신'};
 if(us[source])return us[source];
 for(const [pattern,label] of [[/반도체/,'반도체·AI 하드웨어'],[/제약|생물공학|생명과학|건강관리/,'바이오·헬스케어'],[/은행|보험|증권|카드|창업투자/,'금융·투자'],[/우주항공|조선/,'조선·방산·우주'],[/자동차|항공사|물류|해운/,'자동차·운송'],[/IT서비스|양방향미디어|게임|방송|통신서비스/,'플랫폼·미디어·통신'],[/전자|전기제품|통신장비|핸드셋/,'전자·전기제품'],[/전기장비|기계|건설/,'전력기기·기계·건설'],[/석유|에너지|유틸리티/,'에너지·유틸리티'],[/철강|비철|화학/,'소재·화학'],[/화장품/,'화장품'],[/식품|담배|가정용|소매/,'소비·유통']])if(pattern.test(source))return label;
 return source==='업종 미확인'?source:'복합기업·기타';
}
function render(){
 const bundle=window.MARKET_LEDGER?.heatmap,info=bundle?.markets?.[market];
 const rows=(info?.rows||[]).map(r=>({...r,theme:themeOf(r)})),sectors=[...new Set(rows.map(r=>r.theme))].sort();
 const visible=rows.filter(r=>!sector||r.theme===sector),total=visible.reduce((s,r)=>s+r.marketCap,0);
 const grouped={};visible.forEach(r=>(grouped[r.theme]??=[]).push(r));
 const groups=Object.entries(grouped).map(([name,stocks])=>({name,stocks})).sort((a,b)=>b.stocks.length-a.stocks.length||a.name.localeCompare(b.name));
 const map=groups.map(g=>{
  const average=g.stocks.reduce((sum,r)=>sum+r.changePct,0)/g.stocks.length;
  return `<section class="hm-theme"><header><b>${esc(g.name)}</b><span>${pct(average)}</span><small>${g.stocks.length}종목</small></header><div class="hm-theme-tiles">${g.stocks.map(r=>`<button class="hm-theme-tile" data-hm-symbol="${esc(r.symbol)}" style="background:${color(r.changePct)}" title="${esc(r.name)} (${esc(r.symbol)}) · 원업종 ${esc(r.sector)} · ${pct(r.changePct)}" aria-label="${esc(r.name)} ${pct(r.changePct)} 상세보기"><b>${esc(market==='NASDAQ'?r.symbol:r.name)}</b><span>${pct(r.changePct)}</span><small>${esc(market==='NASDAQ'?r.name:r.symbol)}</small></button>`).join('')}</div></section>`;
 }).join('');
 const detail=rows.find(r=>r.symbol===selected);
 return `<div class="page-head"><div><div class="eyebrow">MARKET HEATMAP</div><h1>시장 지도</h1><p>테마별로 종목의 상승·하락 흐름을 한눈에 확인합니다.</p></div></div><div class="hm-toolbar"><div class="hm-tabs" role="group" aria-label="시장 선택">${['KOSPI','KOSDAQ','NASDAQ'].map(m=>`<button data-hm-market="${m}" aria-pressed="${m===market}">${m}</button>`).join('')}</div><label>테마 <select id="hm-sector"><option value="">전체 테마</option>${sectors.map(s=>`<option value="${esc(s)}" ${sector===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label><span>${visible.length}종목</span></div><div class="hm-caption"><span>동일한 크기의 종목 칸 · 색상: 이전 종가 대비 등락률</span><div class="hm-legend">${[-6,-3,0,3,6].map(n=>`<span style="background:${color(n)}">${n>0?'+':''}${n}%</span>`).join('')}</div></div><div class="dashboard-data-status"><span>${info?.checkedAt?'수집 '+esc(new Date(info.checkedAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul',hour12:false}))+' KST':'수집 기록 없음'}</span><span>${esc(info?.note||'시장데이터 업데이트를 실행해주세요.')}</span>${info?.quoteTimeRange?`<span>공급자 시각 범위 ${esc(info.quoteTimeRange.join(' ~ '))}</span>`:''}${info?.status==='failed'?`<span>수집 실패 · 이전 지도 표시: ${esc(info.error)}</span>`:''}<span>테마는 제공처 업종을 화면용으로 묶은 분류이며, 헤더 등락률은 종목의 단순평균입니다.</span></div>${rows.length?`<div class="hm-theme-board" aria-label="${market} 테마 지도">${map}</div>`:'<div class="empty">아직 수집된 종목이 없습니다.</div>'}<div class="hm-detail" aria-live="polite">${detail?`<b>${esc(detail.name)} · ${esc(detail.symbol)}</b><span>${pct(detail.changePct)} · ${detail.price.toLocaleString('ko-KR')} ${esc(detail.currency)}</span><span>시가총액 ${detail.marketCap.toLocaleString('ko-KR')} ${esc(detail.currency)} · ${esc(detail.sector)}</span><a href="${esc(detail.url)}" target="_blank" rel="noreferrer">종목 원문 ↗</a>`:'종목을 선택하면 가격·시가총액·출처를 확인할 수 있습니다.'}</div><details class="hm-list"><summary>종목 목록 보기 · 원업종과 시가총액 비중 확인</summary><div class="live-table-scroll"><table><thead><tr><th>종목</th><th>업종</th><th>등락률</th><th>시총 비중</th></tr></thead><tbody>${visible.map(r=>`<tr><td><button data-hm-symbol="${esc(r.symbol)}">${esc(r.name)} (${esc(r.symbol)})</button></td><td>${esc(r.sector)}</td><td>${pct(r.changePct)}</td><td>${(r.marketCap/total*100).toFixed(2)}%</td></tr>`).join('')}</tbody></table></div></details>`;
}
function bind(container){
 const refresh=()=>{container.innerHTML=render();bind(container);};
 container.querySelectorAll('[data-hm-market]').forEach(b=>b.onclick=()=>{market=b.dataset.hmMarket;sector='';selected='';refresh();});
 const filter=container.querySelector('#hm-sector');if(filter)filter.onchange=()=>{sector=filter.value;selected='';refresh();};
 container.querySelectorAll('[data-hm-symbol]').forEach(b=>b.onclick=()=>{selected=b.dataset.hmSymbol;const scroll=window.scrollY;refresh();window.scrollTo(0,scroll);});
}
window.MarketHeatmap={render,bind,layout,color,themeOf};
})();
