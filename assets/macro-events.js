(function(){
  const archive=window.MARKET_LEDGER?.macroEvents||{events:[],categories:[]};
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ordered=items=>items.slice().sort((a,b)=>b.eventDate.localeCompare(a.eventDate)||a.id.localeCompare(b.id));
  const ps=xs=>(xs||[]).map(p=>`<p>${esc(p)}</p>`).join('');
  const ul=xs=>`<ul>${(xs||[]).map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`;
  const url=x=>'#macro-events/'+encodeURIComponent(x.id);
  const caseTitle=x=>x.casebook?.title||x.title;
  let lastArchive='#macro-events';
  function params(filters={}){return ['year','month','category','q'].filter(k=>filters[k]).map(k=>k+'='+encodeURIComponent(filters[k])).join('&');}
  function archiveUrl(filters={}){const p=params(filters);return '#macro-events'+(p?'?'+p:'');}
  function readFilters(query=''){const f={year:'',month:'',category:'',q:''};for(const part of query.split('&')){const i=part.indexOf('=');if(i<0)continue;const key=part.slice(0,i);if(Object.hasOwn(f,key)){try{f[key]=decodeURIComponent(part.slice(i+1).replaceAll('+',' '));}catch{f[key]='';}}}return f;}
  function matching(filters={}){const q=(filters.q||'').trim().toLocaleLowerCase();return ordered(archive.events).filter(x=>(!filters.year||x.eventDate.startsWith(filters.year+'-'))&&(!filters.month||x.eventDate.startsWith(filters.month))&&(!filters.category||x.category===filters.category)&&(!q||JSON.stringify(x).toLocaleLowerCase().includes(q)));}
  function tags(items){return `<div class="me-tags">${(items||[]).map(t=>`<a href="${esc(archiveUrl({q:t}))}">${esc(t)}</a>`).join('')}</div>`;}
  function rows(items){
    if(!items.length)return '<div class="empty me-empty"><strong>일치하는 사건이 없습니다.</strong>검색어 또는 날짜·분류 조건을 바꿔보세요.</div>';
    const groups={};ordered(items).forEach(x=>(groups[x.eventDate]??=[]).push(x));
    return `<div class="me-date-list">${Object.entries(groups).map(([date,events])=>`<section class="me-date-group" aria-label="${esc(date)} 사건"><div class="me-date-heading"><time datetime="${esc(date)}">${esc(date.replaceAll('-','.'))}</time><span>${events.length}개 사건</span></div><div class="me-date-items">${events.map(x=>`<article class="me-event-card"><a class="me-event-link" href="${url(x)}"><div class="me-card-meta"><span>${esc(x.category)}</span></div><h2>${esc(caseTitle(x))}</h2><p class="me-card-cause">${esc(x.casebook?.cause||x.background?.[0]||x.subtitle)}</p><div class="me-card-impact"><span>시장 영향</span><p>${esc(x.casebook?.impact||x.reactions?.[0]?.observation||x.subtitle)}</p></div><div class="me-card-foot"><span>사건 분석 읽기 ↗</span></div></a><details class="me-card-keywords"><summary>키워드 ${x.tags.length}</summary>${tags(x.tags)}</details></article>`).join('')}</div></section>`).join('')}</div>`;
  }
  function render(filters={}){
    lastArchive=archiveUrl(filters);
    const items=matching(filters),years=[...new Set(archive.events.map(x=>x.eventDate.slice(0,4)))].sort().reverse();
    const months=[...new Set(archive.events.filter(x=>!filters.year||x.eventDate.startsWith(filters.year)).map(x=>x.eventDate.slice(0,7)))].sort().reverse();
    const option=(value,label,selected)=>`<option value="${esc(value)}"${value===selected?' selected':''}>${esc(label)}</option>`;
    return `<div class="page-head me-index-head"><div><div class="eyebrow">매크로 사건 분석</div><h1>Macro Casebook</h1><p>무엇이 충격을 만들었고, 어떤 경로로 시장에 전달됐는가.<br>사건의 배경부터 시장의 해석과 후속 반응까지 읽습니다.</p></div><span class="me-index-count">${archive.events.length}개 사건</span></div><form class="me-controls" id="macroEventFilters" role="search" aria-label="Macro Casebook 검색"><label class="me-query">키워드·본문 검색<input id="macroEventSearch" type="search" value="${esc(filters.q||'')}" placeholder="예: 코어위브, CPI, 회사채, 에너지" autocomplete="off"></label><label>연도<select id="macroEventYear">${option('','전체 연도',filters.year)}${years.map(v=>option(v,v+'년',filters.year)).join('')}</select></label><label>월<select id="macroEventMonth">${option('','전체 월',filters.month)}${months.map(v=>option(v,v.replace('-','년 ')+'월',filters.month)).join('')}</select></label><label>사건 분류<select id="macroEventCategory">${option('','전체 분류',filters.category)}${archive.categories.map(v=>option(v,v,filters.category)).join('')}</select></label><button class="me-reset" type="button" id="macroEventReset">조건 초기화</button></form><div class="me-result-bar"><span id="macroEventCount" role="status">${items.length}개 사건</span><span>사건 발생일순 · 최신순</span></div><div id="macroEventResults">${rows(items)}</div><footer class="me-legacy"><div><h2>이전 매크로 자료</h2><p>기존 파트별 리포트와 원문 기록은 별도 보관했습니다.</p></div><a href="#macro-reports/topics">이전 파트별 리포트 →</a><a href="#macro-reports/library">원문·자료 보관함 →</a></footer>`;
  }
  function sourceRefs(event,ids=[]){return ids.map(id=>{const s=event.sources.find(s=>s.id===id);return s?`<a href="#" data-me-source="${esc(id)}">${esc(s.dailyDate?s.dailyDate+' Daily':s.publisher)}</a>`:'';}).filter(Boolean).join(' · ');}
  function detail(id){
    const x=archive.events.find(x=>x.id===id);
    if(!x)return '<div class="empty"><strong>사건 기록을 찾을 수 없습니다.</strong><a href="#macro-events">Macro Casebook으로 돌아가기 →</a></div>';
    const sorted=ordered(archive.events),i=sorted.findIndex(e=>e.id===id),older=sorted[i+1],newer=sorted[i-1];
    const nav=`<nav class="report-nav me-record-nav" aria-label="사건 이동">${older?`<a href="${url(older)}">← 이전 사건 · ${esc(older.eventDate)}</a>`:'<span>이전 사건 없음</span>'}<a href="${esc(lastArchive)}">사건 목록</a>${newer?`<a href="${url(newer)}">다음 사건 · ${esc(newer.eventDate)} →</a>`:'<span>다음 사건 없음</span>'}</nav>`;
    const section=(no,title,body)=>`<section class="paper-section" id="me-section-${no}"><div class="section-number">${no}</div><div><h2>${esc(title)}</h2>${body}</div></section>`;
    const sources=x.sources.map(s=>`<article class="me-source" id="me-source-${esc(s.id)}"><div class="me-source-heading"><h3>${esc(s.title)}</h3><span>${esc(s.verification)}</span></div><p>${esc(s.publisher)} · 공표 ${esc(s.publishedAt)} · 관측 ${esc(s.observedAt)}</p><p>${esc(s.note)}</p>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">원문 열기 ↗</a>`:''}${s.dailyDate?`<button class="text-link" data-log="${esc(s.dailyDate)}">${esc(s.dailyDate)} 당시 Daily →</button>`:''}</article>`).join('');
    const timeline=`<div class="me-timeline">${x.timeline.map(t=>`<article class="me-timeline-item"><div class="me-timeline-stamp"><time>${esc(t.at)}</time><span>${esc(t.session)}</span></div><div><h3>${esc(t.title)}</h3>${ps(t.paragraphs)}<div class="me-inline-sources">근거 · ${sourceRefs(x,t.sourceIds)}</div></div></article>`).join('')}</div>`;
    const reactions=`<p class="me-reaction-note">관찰된 가격과 그 해석을 나누어 기록했습니다. 장중·종가와 관측 구간이 다른 수치는 하나의 사건 수익률로 합산하지 않습니다.</p><div class="me-reactions">${x.reactions.map(r=>`<article class="me-reaction"><div><h3>${esc(r.market)}</h3><time>${esc(r.window)}</time></div><p class="me-observation">${esc(r.observation)}</p><p>${esc(r.interpretation)}</p><div class="me-inline-sources">근거 · ${sourceRefs(x,r.sourceIds)}</div></article>`).join('')}</div>`;
    // Older entries remain readable without a presentation layer; do not rewrite source data.
    const chapters=x.casebook?.sections||[
      {title:'사건의 배경과 촉발',paragraphs:[...x.background,...x.trigger]},
      {title:'시장으로의 전달과 다른 해석',paragraphs:[...x.transmission,...x.alternatives]},
      {title:'이후의 변화와 남은 조건',paragraphs:x.aftermath}
    ];
    const body=chapters.map((s,i)=>section(String(i+1).padStart(2,'0'),s.title,ps(s.paragraphs)+`<div class="me-inline-sources">근거 · ${sourceRefs(x,s.sourceIds||[])}</div>`)).join('');
    const disclosure=(title,body,cls='')=>`<details class="me-evidence ${cls}"><summary>${esc(title)}</summary><div class="me-evidence-body">${body}</div></details>`;
    const updates=x.updates.map(u=>`<article class="me-update"><time>${esc(u.date)}</time><h3>${esc(u.title)}</h3>${ps(u.paragraphs)}<div class="me-inline-sources">근거 · ${sourceRefs(x,u.sourceIds)}</div></article>`).join('');
    const evidence=disclosure('시간·가격 기록 대조',timeline+reactions)+disclosure('남은 쟁점과 후속 기록',ul(x.openQuestions)+updates)+disclosure('출처와 관측 기준',sources,'me-source-records')+disclosure('개편 전 사건 기록',`<h3>${esc(x.title)}</h3>${ps(x.summary)}<h3>배경과 발생</h3>${ps(x.background)}${ps(x.trigger)}<h3>전달 경로와 대안 해석</h3>${ps(x.transmission)}${ps(x.alternatives)}<h3>이후의 변화</h3>${ps(x.aftermath)}`);
    const related=`<div class="me-related">${x.relatedIds.map(id=>archive.events.find(r=>r.id===id)).filter(Boolean).map(r=>`<a href="${url(r)}"><time>${esc(r.eventDate)}</time><strong>${esc(caseTitle(r))}</strong><span>이어서 읽기 →</span></a>`).join('')}</div>`;
    return `<a class="text-link back-link me-back" href="${esc(lastArchive)}">← Macro Casebook</a><article class="research-paper me-paper">${nav}<header class="paper-head"><div class="paper-series">MACRO CASEBOOK · ${esc(x.category)}</div><h1>${esc(caseTitle(x))}</h1><p class="me-subtitle">${esc(x.casebook?.thesis||x.subtitle)}</p><div class="me-dateline"><span>사건일 <time datetime="${esc(x.eventDate)}">${esc(x.eventDate)}</time></span><span>첫 한국 반영 ${esc(x.koreaAttributionDate)}</span><span>관측 기록 ${esc(x.updatedAt)} 기준</span></div><details class="me-record-context"><summary>기록 범위·키워드</summary><dl class="me-record-meta"><div><dt>시각·기준</dt><dd>${esc(x.eventTime)}</dd></div><div><dt>기록 상태</dt><dd>${esc(x.phase)}</dd></div></dl>${tags(x.tags)}<p class="me-coverage">${esc(x.coverage)}</p>${x.casebook?`<p class="me-coverage">본문 재구성 ${esc(x.casebook.editedAt)} · ${esc(x.casebook.editorialNote)}</p>`:''}</details></header>${body}${section(String(chapters.length+1).padStart(2,'0'),'근거와 후속 기록',`<p class="me-evidence-intro">본문의 해석과 당시의 관측을 대조할 수 있도록 시간순 기록, 자산별 가격과 원출처를 보존했습니다.</p>${evidence}`)}${section(String(chapters.length+2).padStart(2,'0'),'함께 읽을 사건',related)}${nav}</article>`;
  }
  function bind(root){
    const form=root.querySelector?.('#macroEventFilters');
    if(form){
      const get=()=>({q:form.querySelector('#macroEventSearch').value,year:form.querySelector('#macroEventYear').value,month:form.querySelector('#macroEventMonth').value,category:form.querySelector('#macroEventCategory').value});
      const update=()=>{const f=get(),items=matching(f);root.querySelector('#macroEventResults').innerHTML=rows(items);root.querySelector('#macroEventCount').textContent=items.length+'개 사건';lastArchive=archiveUrl(f);window.history.replaceState(null,'',lastArchive);};
      form.onsubmit=e=>{e.preventDefault();update();};
      form.querySelector('#macroEventSearch').oninput=update;
      for(const id of ['macroEventYear','macroEventMonth','macroEventCategory'])form.querySelector('#'+id).onchange=()=>{const f=get();if(id==='macroEventYear')f.month='';location.hash=archiveUrl(f);};
      form.querySelector('#macroEventReset').onclick=()=>{location.hash='macro-events';};
    }
    root.querySelectorAll('[data-me-source]').forEach(link=>link.onclick=e=>{e.preventDefault();const target=root.querySelector('#me-source-'+link.dataset.meSource);if(target){for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;target.scrollIntoView({behavior:'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}});
  }
  window.MacroEvents={render,detail,rows,matching,readFilters,bind};
})();
