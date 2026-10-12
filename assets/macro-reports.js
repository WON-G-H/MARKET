(function(){
  const archive = window.MARKET_LEDGER?.macroReports || {categories: [], items: []};
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sorted = items => items.slice().sort((a,b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
  const paragraphs = xs => (xs || []).map(x => `<p>${esc(x)}</p>`).join('');
  const list = xs => `<ul>${(xs || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const topicLink = x => '#macro-reports/'+encodeURIComponent(x.id);
  function topics(){
    const latest = archive.categories.map(c => sorted(archive.topicReports||[]).find(x => x.category === c)).filter(Boolean);
    return `<div class="page-head"><div><div class="eyebrow">MACRO TOPIC REPORTS</div><h1>매크로 리포트</h1><p>주제별로 나눠 읽는 독립 보고서. 각 파트 안에서 관련 자료의 근거와 해석을 연결합니다.</p></div><span class="date-chip">${latest.length}개 파트</span></div><div class="mr-mode"><a class="active" href="#macro-reports">파트별 보고서</a><a href="#macro-reports/library">원문·자료 보관함</a></div><div class="mr-topic-list">${latest.map(x=>`<a class="mr-topic-card" href="${topicLink(x)}"><span class="eyebrow">${esc(x.category)}</span><h2>${esc(x.title)}</h2><p>${esc(x.summary)}</p><div class="mr-meta"><time>작성 ${esc(x.date)}</time><span>${x.sources.length}개 참고 자료</span></div><span class="mr-open">${esc(x.category)} 보고서 읽기 →</span></a>`).join('')}</div>`;
  }
  function topicReport(id){
    const x=(archive.topicReports||[]).find(x=>x.id===id);
    if(!x)return '<div class="empty">보고서를 찾을 수 없습니다. <a href="#macro-reports">파트 목록으로</a></div>';
    const histories=sorted(archive.topicReports||[]).filter(r=>r.category===x.category);
    const sources=x.sources.map(id=>archive.items.find(s=>s.id===id)).filter(Boolean);
    const peers=archive.categories.map(c=>sorted(archive.topicReports||[]).find(r=>r.category===c)).filter(Boolean);
    const related={ '금리·채권':['경제·물가','유동성·신용'], '경제·물가':['금리·채권','원자재·공급망'], '유동성·신용':['퀀트·시장구조','금리·채권'], '퀀트·시장구조':['금리·채권','유동성·신용'], '환율·자산배분':['금리·채권','유동성·신용'], '원자재·공급망':['경제·물가','금리·채권'] };
    const section=(n,title,body)=>`<section class="paper-section"><div class="section-number">${n}</div><div><h2>${esc(title)}</h2>${body}</div></section>`;
    return `<nav class="mr-topic-tabs" aria-label="매크로 파트">${peers.map(r=>`<a class="${r.category===x.category?'active':''}" href="${topicLink(r)}">${esc(r.category)}</a>`).join('')}</nav><article class="research-paper mr-paper mr-topic-report"><div class="report-nav"><a href="#macro-reports">← 파트 목록</a><b>${esc(x.date)}</b><span>${esc(x.category)}</span></div><header class="report-header"><div class="eyebrow">${esc(x.category)} REPORT</div><h1>${esc(x.title)}</h1><p>${esc(x.summary)}</p><div class="mr-meta">${esc(x.period)} · ${x.sources.length}개 참고 자료 · 관측기간은 원문별로 구분</div></header>${section('01',x.category+' 내러티브',paragraphs(x.paragraphs))}${section('02','다음 확인 항목',list(x.watch))}${section('03','참고 리포트',sources.map(s=>`<div class="mr-reference-row"><a href="#macro-reports/${encodeURIComponent(s.id)}">${esc(s.title)} ↗</a><p>${esc(s.institution)} · ${esc(s.date)} · ${esc(s.period)}</p><small>${esc(s.sourceNote)}</small></div>`).join(''))}<div class="mr-related"><span>함께 읽을 파트</span>${peers.filter(r=>(related[x.category]||[]).includes(r.category)).map(r=>`<a href="${topicLink(r)}">${esc(r.category)} →</a>`).join('')}</div>${histories.length>1?`<details class="mr-references"><summary>${esc(x.category)} 이전 보고서</summary>${histories.filter(r=>r.id!==x.id).map(r=>`<p><a href="${topicLink(r)}">${esc(r.date)} · ${esc(r.title)}</a></p>`).join('')}</details>`:''}</article>`;
  }
  function rows(items){
    return `<div class="mr-list">${sorted(items).map(x => `<a class="mr-card" href="#macro-reports/${encodeURIComponent(x.id)}"><div class="mr-meta"><time>${esc(x.date)}</time><span>${esc(x.category)}</span><span>${esc(x.type)}</span></div><h2>${esc(x.title)}</h2><div class="mr-source">${esc(x.institution)}${x.author ? ' · '+esc(x.author) : ''}</div><p>${esc(x.summary)}</p><div class="mr-tags">${x.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div><span class="mr-open">자료 읽기 →</span></a>`).join('')}</div>`;
  }
  function library(category = '', query = ''){
    const q = query.trim().toLowerCase();
    const items = archive.items.filter(x => (!category || x.category === category) && (!q || JSON.stringify(x).toLowerCase().includes(q)));
    return `<div class="page-head"><div><div class="eyebrow">MACRO RESEARCH LIBRARY</div><h1>매크로 리포트</h1><p>한국 시장의 일일 시황과 별도로, 리포트의 근거·방법론·해석을 주제별로 축적합니다.</p></div><span class="date-chip">${archive.items.length} 자료 · 정리 ${esc(archive.updatedAt)}</span></div><div class="mr-controls"><div class="mr-filters" aria-label="리포트 분류">${['',...archive.categories].map(c => `<button data-mr-category="${esc(c)}" aria-pressed="${c===category}" class="${c===category?'active':''}">${esc(c || '전체')} <small>${archive.items.filter(x => !c || x.category === c).length}</small></button>`).join('')}</div><label class="mr-search">자료 검색<input type="search" id="macroReportSearch" value="${esc(query)}" placeholder="제목, 기관, 내용, 태그" aria-label="매크로 리포트 검색"></label></div><p class="mr-caption">최근 제공 자료부터 선별한 보관함입니다. 표시 날짜는 발표일이며, 개별 관측기간과 전망 시점은 상세 내용에 구분합니다.</p><div id="macroReportResults">${items.length ? rows(items) : '<div class="empty">일치하는 자료가 없습니다.</div>'}</div>`;
  }
  function report(date){
    const issues=(archive.reports||[]).slice().sort((a,b)=>b.date.localeCompare(a.date));
    const r=date ? issues.find(x=>x.date===date) : issues[0];
    if(!r)return '<div class="empty">보고서를 찾을 수 없습니다. <a href="#macro-reports">목록으로</a></div>';
    const section=(n,title,body)=>`<section class="paper-section"><div class="section-number">${n}</div><div><h2>${esc(title)}</h2>${body}</div></section>`;
    const references=ids=>`<details class="mr-references"><summary>참고 리포트 · ${ids.length}건</summary>${ids.map(id=>{const x=archive.items.find(x=>x.id===id);return x?`<p><a href="#macro-reports/${encodeURIComponent(id)}">${esc(x.title)} ↗</a><small>${esc(x.institution)} · ${esc(x.date)} · ${esc(x.period)}</small></p>`:''}).join('')}</details>`;
    return `<div class="mr-mode"><a class="active" href="#macro-reports">종합 보고서</a><a href="#macro-reports/library">원문·자료 보관함</a></div><article class="research-paper mr-paper mr-issue"><div class="report-nav"><span>MACRO RESEARCH</span><b>${esc(r.date)}</b><span>${archive.items.length} 참고 자료</span></div><header class="report-header"><div class="eyebrow">매크로 리포트 · ${esc(r.date)}</div><h1>${esc(r.title)}</h1><p>${esc(r.lead)}</p><div class="mr-meta">${esc(r.period)} · 당일 신규 발표만을 모은 보고서가 아닙니다.</div></header>${section('00','핵심 요약',paragraphs(r.overview))}${r.sections.map((s,i)=>section(String(i+1).padStart(2,'0'),s.category,`<h3 class="mr-subtitle">${esc(s.title)}</h3>${paragraphs(s.paragraphs)}${references(s.sources)}`)).join('')}${section('07','다음 확인 항목',list(r.watch))}${section('08','종합 정리',`<p>${esc(r.conclusion)}</p>`)}<div class="report-nav"><a href="#macro-reports/library">원문·자료 보관함 →</a><span>작성 ${esc(r.date)}</span><span>${issues.length} 보고서</span></div></article>`;
  }
  function render(category,query){return arguments.length ? library(category,query) : topics();}
  function detail(id){
    if(id.startsWith('topic/'))return topicReport(id);
    if(id==='library')return library();
    if(id.startsWith('report/'))return report(id.slice(7));
    return sourceDetail(id).replaceAll('href="#macro-reports"','href="#macro-reports/library"');
  }
  function sourceDetail(id){
    const x = archive.items.find(x => x.id === id);
    if(!x)return '<div class="empty">자료를 찾을 수 없습니다. <a href="#macro-reports">목록으로</a></div>';
    const ordered = sorted(archive.items), i = ordered.findIndex(r => r.id === id);
    const section = (n,title,body) => `<section class="paper-section"><div class="section-number">${n}</div><div><h2>${title}</h2>${body}</div></section>`;
    return `<article class="research-paper mr-paper"><div class="report-nav"><a href="#macro-reports">← 자료 목록</a><b>${esc(x.date)}</b><span>${esc(x.category)}</span></div><header class="report-header"><div class="eyebrow">${esc(x.type)} · ${esc(x.institution)}</div><h1>${esc(x.title)}</h1><p>${esc(x.summary)}</p><div class="mr-meta"><span>${esc(x.author)}</span><span>관측·분석기간: ${esc(x.period)}</span></div></header>${section('01','핵심 근거·방법론',list(x.evidence))}${section('02','리포트의 해석',paragraphs(x.interpretation))}${section('03','전망의 조건·해석 범위',list(x.limits))}${section('04','후속 확인 포인트',list(x.watch))}${section('05','원문·출처',`<p>${esc(x.sourceNote)}</p>${x.source ? `<a class="mr-source-link" href="${esc(x.source)}" target="_blank" rel="noopener noreferrer">원문 열기 ↗</a>` : '<p class="mr-caption">현재 원문 링크 없음 · 제공 요약 및 기록으로 보존</p>'}`)}<div class="report-nav">${ordered[i+1]?`<a href="#macro-reports/${encodeURIComponent(ordered[i+1].id)}">← 이전 자료</a>`:'<span></span>'}<a href="#macro-reports">전체 목록</a>${ordered[i-1]?`<a href="#macro-reports/${encodeURIComponent(ordered[i-1].id)}">다음 자료 →</a>`:'<span></span>'}</div></article>`;
  }
  function bind(root){
    root.querySelectorAll('[data-mr-category]').forEach(button => button.onclick = () => {
      const q = root.querySelector('#macroReportSearch')?.value || '';
      root.innerHTML = library(button.dataset.mrCategory,q); bind(root);
    });
    const input = root.querySelector?.('#macroReportSearch');
    if(input)input.oninput = () => {
      const category = root.querySelector('[data-mr-category][aria-pressed="true"]')?.dataset.mrCategory || '';
      const q = input.value.trim().toLowerCase();
      const items = archive.items.filter(x => (!category || x.category === category) && JSON.stringify(x).toLowerCase().includes(q));
      root.querySelector('#macroReportResults').innerHTML = items.length ? rows(items) : '<div class="empty">일치하는 자료가 없습니다.</div>';
    };
  }
  window.MacroReports = {render,topics,topicReport,report,library,detail,rows,bind};
})();
