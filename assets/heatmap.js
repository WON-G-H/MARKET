(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const marketLabels={KPI200:'KOSPI 200',KQI150:'KOSDAQ 150',SP500:'S&P 500'};
let market='KPI200',sector='',selected='',expanded=false;
const pct=n=>(n>0?'+':'')+n.toFixed(2)+'%';
const color=n=>Math.abs(n)<.05?'#657084':n>0?(n>=3?'#ad202b':n>=1?'#c33d46':'#b5646c'):(n<=-3?'#15519b':n<=-1?'#2869af':'#557eae');
function layout(items,x=0,y=0,w=1200,h=760){
 if(!items.length)return [];
 if(items.length===1)return [{item:items[0],x,y,w,h}];
 const total=items.reduce((s,i)=>s+i.weight,0);let sum=0,split=1,best=Infinity;
 for(let i=1;i<items.length;i++){sum+=items[i-1].weight;const distance=Math.abs(total/2-sum);if(distance<best){best=distance;split=i;}}
 const first=items.slice(0,split),second=items.slice(split),ratio=first.reduce((s,i)=>s+i.weight,0)/total;
 return w>=h?[...layout(first,x,y,w*ratio,h),...layout(second,x+w*ratio,y,w*(1-ratio),h)]:[...layout(first,x,y,w,h*ratio),...layout(second,x,y+h*ratio,w,h*(1-ratio))];
}
// Squarified treemap keeps rectangles compact while preserving bounded display weights.
function mosaic(items,x=0,y=0,w=1120,h=700){
 const total=items.reduce((n,r)=>n+r.weight,0),pending=items.map(item=>({item,area:item.weight/total*w*h})).sort((a,b)=>b.area-a.area),out=[];
 const worst=(row,side)=>{const a=row.map(r=>r.area),sum=a.reduce((n,v)=>n+v,0);return Math.max(side*side*Math.max(...a)/(sum*sum),sum*sum/(side*side*Math.min(...a)));};
 while(pending.length){
  const row=[pending.shift()],side=Math.min(w,h);
  while(pending.length&&worst([...row,pending[0]],side)<=worst(row,side))row.push(pending.shift());
  const area=row.reduce((n,r)=>n+r.area,0);
  if(w>=h){const width=area/h;let yy=y;row.forEach(r=>{const height=r.area/width;out.push({item:r.item,x,y:yy,w:width,h:height});yy+=height;});x+=width;w-=width;}
  else{const height=area/w;let xx=x;row.forEach(r=>{const width=r.area/height;out.push({item:r.item,x:xx,y,w:width,h:height});xx+=width;});y+=height;h-=height;}
 }
 return out;
}
function displayWeights(rows){
 const caps=rows.map(r=>r.marketCap).filter(n=>n>0).sort((a,b)=>a-b),median=caps[Math.floor(caps.length/2)]||1;
 return rows.map(r=>({...r,weight:Math.min(12,Math.max(.4,Math.pow((r.marketCap||median)/median,.65)))}));
}
function themeOf(r){
 const source=r.sector||'업종 미확인',industry=r.industry||'';
 const gics={'Information Technology':'기술','Financials':'금융','Communication Services':'커뮤니케이션','Materials':'소재'};
 if(gics[source])return gics[source];
 if(source==='Technology')return /semiconductor/i.test(industry)?'반도체·AI 하드웨어':/software|programming/i.test(industry)?'소프트웨어·클라우드':'IT·전자 하드웨어';
 const us={'Health Care':'바이오·헬스케어','Finance':'금융·투자','Consumer Discretionary':'소비·커머스','Consumer Staples':'필수소비재','Industrials':'산업재·운송','Energy':'에너지·유틸리티','Utilities':'에너지·유틸리티','Basic Materials':'소재·화학','Real Estate':'부동산','Telecommunications':'미디어·통신'};
 if(us[source])return us[source];
 for(const [pattern,label] of [[/반도체/,'반도체·AI 하드웨어'],[/제약|생물공학|생명과학|건강관리/,'바이오·헬스케어'],[/은행|보험|증권|카드|창업투자/,'금융·투자'],[/우주항공|조선/,'조선·방산·우주'],[/자동차|항공사|물류|해운/,'자동차·운송'],[/IT서비스|양방향미디어|게임|방송|통신서비스/,'플랫폼·미디어·통신'],[/전자|전기제품|통신장비|핸드셋/,'전자·전기제품'],[/전기장비|기계|건설/,'전력기기·기계·건설'],[/석유|에너지|유틸리티/,'에너지·유틸리티'],[/철강|비철|화학/,'소재·화학'],[/화장품/,'화장품'],[/식품|담배|가정용|소매/,'소비·유통']])if(pattern.test(source))return label;
 return source==='업종 미확인'?source:'복합기업·기타';
}

const mapColor=n=>n<=-3?'#f63538':n<=-2?'#bf4045':n<=-1?'#8b444e':n<-.05?'#594553':n<.05?'#414554':n<1?'#386650':n<2?'#32834e':n<3?'#2ca44c':'#30cc5a';
const industryOf=r=>r.industry||r.sector||'업종 미확인';
function mapGroups(rows){
 const groups={};
 displayWeights(rows).forEach(r=>{
  const name=themeOf(r),industry=industryOf(r);
  const g=groups[name]??={name,weight:0,industries:{}};g.weight+=r.weight;
  const sub=g.industries[industry]??={name:industry,weight:0,stocks:[]};sub.weight+=r.weight;sub.stocks.push(r);
 });
 return Object.values(groups).map(g=>({...g,industries:Object.values(g.industries)}));
}
function render(){
 const info=window.MARKET_LEDGER?.heatmap?.markets?.[market];
 const rows=info?.rows||[],sectors=[...new Set(rows.map(themeOf))].sort();
 const visible=rows.filter(r=>!sector||themeOf(r)===sector);
 const W=1440,H=820;
 const map=mosaic(mapGroups(visible),0,0,W,H).map(({item:g,x,y,w,h})=>{
  const innerHeight=Math.max(1,h-19);
  const industries=mosaic(g.industries,0,0,w-3,innerHeight).map(({item:ind,x:ix,y:iy,w:iw,h:ih})=>{
   const tileHeight=Math.max(1,ih-14),tiles=mosaic(ind.stocks,0,0,iw,tileHeight);
   return `<div class="fm-industry" data-hm-industry="${esc(ind.name)}" style="left:${ix/(w-3)*100}%;top:${iy/innerHeight*100}%;width:${iw/(w-3)*100}%;height:${ih/innerHeight*100}%"><div class="fm-industry-name">${esc(ind.name)}</div><div class="fm-stocks">${tiles.map(({item:r,x:tx,y:ty,w:tw,h:th})=>{
    const label=market==='SP500'?r.symbol:r.name;
    const font=Math.max(8,Math.min(48,tw/(label.length*(market==='SP500'?.65:1.05)+1),th*.29));
    return `<button class="fm-stock ${tw<30||th<22?'fm-no-label':''}" data-hm-symbol="${esc(r.symbol)}" aria-label="${esc(r.name)} ${pct(r.changePct)} 상세보기" style="left:${tx/iw*100}%;top:${ty/tileHeight*100}%;width:${tw/iw*100}%;height:${th/tileHeight*100}%;background:${mapColor(r.changePct)};--stock-font:${font}px;--label-fit:${100/(label.length*(market==='SP500'?.65:1.05)+1)}cqw"><b>${esc(label)}</b><span>${pct(r.changePct)}</span></button>`;
   }).join('')}</div></div>`;
  }).join('');
  return `<section class="fm-sector" style="left:${x/W*100}%;top:${y/H*100}%;width:${w/W*100}%;height:${h/H*100}%"><h2>${esc(g.name)}</h2><div class="fm-industries">${industries}</div></section>`;
 }).join('');
 const time=info?.checkedAt?new Date(info.checkedAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul',hour12:false}):'수집 전';
 return `<div class="hm-terminal ${expanded?'is-expanded':''}"><header class="fm-toolbar"><h1>Market Heatmap</h1><div class="fm-tabs" role="group" aria-label="시장 선택">${['KPI200','KQI150','SP500'].map(m=>`<button data-hm-market="${m}" aria-pressed="${m===market}">${esc(marketLabels[m])}</button>`).join('')}</div><label class="fm-filter"><span>테마</span><select id="hm-sector"><option value="">전체 테마</option>${sectors.map(s=>`<option value="${esc(s)}" ${sector===s?'selected':''}>${esc(s)}</option>`).join('')}</select></label><button id="hm-expand" aria-pressed="${expanded}">${expanded?'축소 ↙':'전체 화면 ↗'}</button></header><div class="fm-meta"><span>${visible.length}종목${info?.countNote?' · 구성 수 확인 필요':''} <i>·</i> 전일 대비 <i>·</i> 시총 비중 완화</span><span>${esc(time)} KST 수집${info?.status==='failed'?' · 갱신 실패, 이전값 표시':''}</span></div><div class="fm-board" aria-label="${esc(marketLabels[market])} 테마 지도">${map||'<div class="empty">시장데이터 업데이트를 실행해주세요.</div>'}</div><footer class="fm-footer"><span>종목에 마우스를 올려 상세 확인 · 클릭으로 고정 · Esc 닫기</span><div class="fm-legend">${[-3,-2,-1,0,1,2,3].map(n=>`<span style="background:${mapColor(n)}">${n>0?'+':''}${n}%</span>`).join('')}</div></footer><details class="fm-sources"><summary>데이터 기준·출처</summary><p>${esc(info?.note||'수집 기록 없음')} ${esc(info?.countNote||'')} 수집시각과 거래일은 다를 수 있습니다. 면적은 시가총액 차이를 완화한 값입니다. 테마는 제공처 업종을 묶은 분류입니다.</p>${info?.quoteTimeRange?`<p>공급자 시각: ${esc(info.quoteTimeRange.join(' ~ '))}</p>`:''}</details><aside class="fm-tooltip" role="dialog" aria-label="종목 상세" hidden></aside></div>`;
}
function bind(container){
 const refresh=()=>{container.innerHTML=render();bind(container);};
 container.querySelectorAll('[data-hm-market]').forEach(b=>b.onclick=()=>{market=b.dataset.hmMarket;sector='';selected='';refresh();});
 const filter=container.querySelector('#hm-sector');if(filter)filter.onchange=()=>{sector=filter.value;selected='';refresh();};
 const expand=container.querySelector('#hm-expand');if(expand)expand.onclick=()=>{expanded=!expanded;refresh();container.querySelector('#hm-expand')?.focus();};
 const tip=container.querySelector('.fm-tooltip');
 if(!tip)return;
 const rows=window.MARKET_LEDGER?.heatmap?.markets?.[market]?.rows||[];
 let pinned=false;
 const hide=()=>{tip.hidden=true;pinned=false;container.querySelectorAll('.fm-active').forEach(el=>el.classList.remove('fm-active'));};
 const show=(button,event)=>{
  const r=rows.find(row=>row.symbol===button.dataset.hmSymbol);if(!r)return;
  container.querySelectorAll('.fm-active').forEach(el=>el.classList.remove('fm-active'));
  button.closest('.fm-industry')?.classList.add('fm-active');
  const peers=rows.filter(row=>industryOf(row)===industryOf(r)).sort((a,b)=>b.marketCap-a.marketCap);
  tip.innerHTML=`<div class="fm-tip-heading"><span>${esc(themeOf(r))} / ${esc(industryOf(r))}</span><button aria-label="상세 닫기">×</button></div><div class="fm-tip-main"><div><b>${esc(market==='SP500'?r.symbol:r.name)}</b><small>${esc(r.name)} · ${esc(r.symbol)}</small></div><strong style="color:${r.changePct>=0?'#30cc5a':'#ff6267'}">${pct(r.changePct)}</strong></div><div class="fm-tip-price">${r.price.toLocaleString('ko-KR')} ${esc(r.currency)} <a href="${esc(r.url)}" target="_blank" rel="noreferrer">종목 원문 ↗</a></div><div class="fm-tip-peers">${peers.map(p=>`<div class="${p.symbol===r.symbol?'current':''}"><b>${esc(market==='SP500'?p.symbol:p.name)}</b><span>${p.price.toLocaleString('ko-KR')}</span><strong style="color:${p.changePct>=0?'#30cc5a':'#ff6267'}">${pct(p.changePct)}</strong></div>`).join('')}</div><small class="fm-tip-note">전일 대비 · ${peers.length}종목 · ${pinned?'고정됨':'클릭으로 고정'}</small>`;
  tip.hidden=false;
  tip.querySelector('button').onclick=hide;
  const rect=button.getBoundingClientRect(),tx=event?.clientX??rect.right,ty=event?.clientY??rect.top;
  const width=tip.offsetWidth,height=tip.offsetHeight;
  tip.style.left=Math.max(8,Math.min(tx+18,window.innerWidth-width-8))+'px';
  tip.style.top=Math.max(8,Math.min(ty+16,window.innerHeight-height-8))+'px';
 };
 container.querySelectorAll('.fm-stock').forEach(b=>{
  b.onpointerenter=e=>{if(!pinned)show(b,e);};
  b.onfocus=()=>{if(!pinned)show(b);};
  b.onclick=e=>{pinned=true;selected=b.dataset.hmSymbol;show(b,e);};
 });
 const board=container.querySelector('.fm-board');
 if(board)board.onpointerleave=e=>{if(!pinned&&!tip.contains(e.relatedTarget))hide();};
 tip.onpointerleave=e=>{if(!pinned&&!board?.contains(e.relatedTarget))hide();};
 container.onkeydown=e=>{if(e.key==='Escape'){hide();if(expanded){expanded=false;refresh();}}};
}

function summarize(rows){
 const valid=rows.filter(r=>Number.isFinite(r.changePct));
 const up=valid.filter(r=>r.changePct>0).length,down=valid.filter(r=>r.changePct<0).length;
 const groups={};valid.forEach(r=>(groups[themeOf(r)]??=[]).push(r.changePct));
 const themes=Object.entries(groups).map(([name,v])=>({name,value:v.reduce((a,b)=>a+b,0)/v.length,count:v.length}));
 return {valid,up,down,flat:valid.length-up-down,missing:rows.length-valid.length,
  average:valid.length?valid.reduce((a,b)=>a+b.changePct,0)/valid.length:null,
  themes:themes.sort((a,b)=>b.value-a.value),
  winners:valid.filter(r=>r.changePct>0).sort((a,b)=>b.changePct-a.changePct).slice(0,5),
  losers:valid.filter(r=>r.changePct<0).sort((a,b)=>a.changePct-b.changePct).slice(0,5)};
}
function koreaSummary(index){
 if(!index)return '<h2>국내 주요지수 구성종목 요약</h2>'+['KPI200','KQI150'].map(k=>koreaSummary(k)).join('');
 const source=window.MARKET_LEDGER?.heatmap?.indices?.[index],label=index==='KPI200'?'KOSPI 200':'KOSDAQ 150';
 const markets={[index]:source};
 const rows=[index].flatMap(m=>(markets[m]?.rows||[]).map(r=>({...r,market:m})));
 if(!rows.length)return `<section class="card"><h2>${label}</h2><p>공식 구성종목 수집 대기 · 시장데이터 업데이트 후 표시됩니다.</p></section>`;
 const s=summarize(rows),n=s.valid.length,ratio=n?s.up/n*100:0;
 const list=(items,theme=false)=>items.length?items.map(r=>`<li><div><b>${esc(r.name)}</b><small>${esc(theme?r.count+'종목':(r.market==='KPI200'?'KOSPI 200':r.market==='KQI150'?'KOSDAQ 150':r.market)+' · '+themeOf(r))}</small></div><strong style="color:${color(theme?r.value:r.changePct)}">${pct(theme?r.value:r.changePct)}</strong></li>`).join(''):'<li>해당 항목 없음</li>';
 return `<section class="kr-breadth"><h2>${label}</h2><p class="snapshot-note">네이버 지수 구성목록 ${rows.length}종목${source?.countNote?' · '+esc(source.countNote):''} · 전일 대비 등락률 · 전체 시장 통계가 아닙니다. 단순평균은 공식 지수 수익률과 다릅니다.</p><div class="kr-summary-grid"><article class="card"><h3>상승·하락 분포</h3><h2>${!n?'확인 필요':s.up>s.down?'상승 우위':s.up<s.down?'하락 우위':'상승·하락 균형'}</h2><div class="kr-breadth-bar" role="img" aria-label="상승 ${s.up}, 하락 ${s.down}, 보합 ${s.flat}"><i style="width:${ratio}%;background:#c33d46"></i><i style="width:${n?s.down/n*100:0}%;background:#2869af"></i><i style="width:${n?s.flat/n*100:0}%;background:#657084"></i></div><p>상승 ${s.up} · 하락 ${s.down} · 보합 ${s.flat}<br>확인 ${n}/${rows.length} · 미확인 ${s.missing}<br>상승 비율 ${ratio.toFixed(1)}% · 상승−하락 ${s.up-s.down}<br>동일가중 평균 ${s.average===null?'—':pct(s.average)}</p></article><article class="card"><h3>테마 강약</h3><small>표시 종목 단순평균 · 시총 비중 미반영</small><div class="kr-rank-columns"><div><h4>강세 TOP 5</h4><ul>${list(s.themes.filter(r=>r.value>0).slice(0,5),true)}</ul></div><div><h4>약세 TOP 5</h4><ul>${list(s.themes.filter(r=>r.value<0).slice().reverse().slice(0,5),true)}</ul></div></div></article><article class="card"><h3>종목 순위</h3><div class="kr-rank-columns"><div><h4>상승 TOP 5</h4><ul>${list(s.winners)}</ul></div><div><h4>하락 TOP 5</h4><ul>${list(s.losers)}</ul></div></div></article></div><div class="dashboard-data-status">${[index].map(m=>`<span>${label}: ${markets[m]?.checkedAt?esc(new Date(markets[m].checkedAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul',hour12:false}))+' KST 수집':'수집 없음'}${markets[m]?.status==='failed'?' · 수집 실패, 이전값 포함':''} · 개별 시세시각 미제공${markets[m]?.quoteTimeRange?' · 관측 '+esc(markets[m].quoteTimeRange.join(' ~ ')):''}</span>`).join('')}</div></section>`;
}
window.MarketHeatmap={render,bind,layout,color,themeOf,summarize,koreaSummary,mosaic,displayWeights,mapColor,mapGroups};
})();
