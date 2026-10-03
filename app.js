(() => {
  'use strict';
  const data = window.STUDY_CONTENT;
  const KEY = 'ueas-admission-learning-v1';
  const groups = [
    { title: 'Foundations', lessons: [1, 2] },
    { title: 'Application Operations', lessons: [3, 4] },
    { title: 'Acceptance and Handoffs', lessons: [5, 6] },
    { title: 'Service and Mastery', lessons: [7, 8] },
  ];
  const glossary = [
    ['AAS', 'Academic Administration System', 'The CIS area containing staff Admission and other academic functions.', 'UEAS-Technical-Manual.html#en-01-19-main-domains'],
    ['CIS', 'Campus Information System', 'The wider integrated university system that includes academic administration.', 'UESD_CIS_Completion_Report_EN_Final_20260610.pdf#page=5'],
    ['Admin Portal', 'Staff administration portal', 'The staff surface for AAS Admission and other authorised functions.', 'UEAS-Technical-Manual.html#en-01-11-product-surfaces'],
    ['Public website', 'Applicant-facing homepage', 'Hosts the admission application and public support content.', 'UEAS-Technical-Manual.html#en-01-11-product-surfaces'],
    ['Academic Year', 'YEAR', 'Four-digit academic year used in the portal and data model.', 'UEAS-Technical-Manual.html#en-03-31-terminology'],
    ['Semester', 'TM', 'Academic term represented as 1 or 2 in the manual.', 'UEAS-Technical-Manual.html#en-03-31-terminology'],
    ['School', 'University / UNIV', 'Parent academic unit in the user-facing terminology.', 'UEAS-Technical-Manual.html#en-03-31-terminology'],
    ['Programme', 'Department / DEPT', 'Academic programme or department used in admission filters.', 'UEAS-Technical-Manual.html#en-03-31-terminology'],
    ['WASSCE', 'West African Senior School Certificate Examination', 'Examination type shown in the submission and decision filters; Ghanaian and International variants are visible.', 'UEAS%20Admission%20Portal.docx'],
    ['SSSCE', 'Senior Secondary School Certificate Examination', 'Another visible examination-type option in the supplied screenshots.', 'UEAS%20Admission%20Portal.docx'],
    ['SSO', 'Single Sign-On', 'Shared sign-in described by the project report; current deployment details require confirmation.', 'UESD_CIS_Completion_Report_EN_Final_20260610.pdf#page=13'],
    ['Role', 'Authorised staff role', 'Determines Admin menu access; backend writes also require separate authorisation.', 'UEAS-Technical-Manual.html#en-01-16-authentication-and-authorization'],
    ['Aggregate', 'Examination aggregate', 'Result value compared during submission review; the calculation is not defined in supplied sources.', 'UEAS%20Admission%20Portal.docx'],
    ['Result', 'Admission or screening result field', 'A Decision Management filter visibly shows “Pass”; its exact meaning must be verified.', 'UEAS%20Admission%20Portal.docx'],
    ['Applicant record', 'Admission application data', 'The manual names applicant account, application, personal/education/programme data, and attachments.', 'UEAS-Technical-Manual.html#en-10-103-admission-workflow'],
    ['Student intake', 'Approved new-student creation', 'Downstream handoff after admission result; exact trigger is not specified.', 'UEAS-Technical-Manual.html#en-10-103-admission-workflow'],
    ['Oracle', 'Oracle Database', 'Shared data store reached through the backend; direct production edits require controlled approval.', 'UEAS-Technical-Manual.html#en-01-12-high-level-request-flow'],
    ['Audit trail', 'Change evidence', 'A record of actor, time, reason, and state change needed for sensitive operations.', 'UEAS-Technical-Manual.html#en-10-104-student-lifecycle-and-level'],
    ['Protected operations record', 'Access-controlled runbook inventory', 'Holds owners, contacts, procedures, storage, and support details omitted from the repository.', 'UEAS-Technical-Manual.html#en-12-121-document-control'],
    ['UI', 'User Interface', 'The visible controls and labels on a screen; a screenshot does not establish hidden behaviour.', 'UEAS%20Admission%20Portal.docx'],
  ].map(([term, expansion, definition, source]) => ({ term, expansion, definition, source: 'sources/' + source }));
  const workflows = [
    { id:'prepare', title:'Prepare an intake', label:'Application Management', description:'Align timing, requirements, and materials for one cohort before public use.', steps:[
      ['Identify cohort','Year, semester, school, programme','Admissions / staff','Approved intake identity','Documented filters'],
      ['Check schedule','Search the application period','Staff operator','Correct opening and closing dates','Screenshot observation'],
      ['Check criteria','Compare programme conditions with approved policy','Admissions owner','Correct requirements and attachments','Documented + screenshot'],
      ['Check support form','Verify programme details and application form file','Content / file owner','Current materials for the cohort','Screenshot observation'],
      ['Approve readiness','Confirm mismatches are resolved','Named institutional owner','Ready to open','Recommended; approval route unknown'],
    ], sources:[['M §10.3','UEAS-Technical-Manual.html#en-10-103-admission-workflow'],['UI screens','UEAS%20Admission%20Portal.docx']], explanation:'Use the same cohort filters across the three tabs. The final readiness approval is a recommended control, not a documented portal button.' },
    { id:'review', title:'Submission and screening', label:'Acceptance Management', description:'Move from a public application to a staff review record without treating screening as a final decision.', steps:[
      ['Applicant application','Personal, education and programme data plus attachments','Applicant','Submitted record','Documented concept'],
      ['Find submission','Filter cohort and examination type','Staff operator','Matching application list','Screenshot observation'],
      ['Review evidence','Compare aggregates and supplied files','Admissions reviewer','Review record','Screenshot observation'],
      ['Policy decision point','Are requirements met under approved criteria?','Admissions owner','Route to authorised decision handling','Interpretation; exact statuses unknown'],
    ], sources:[['M §10.3','UEAS-Technical-Manual.html#en-10-103-admission-workflow'],['UI screens','UEAS%20Admission%20Portal.docx']], explanation:'The manual gives a conceptual sequence. The exact review statuses and exception buttons are not supplied.' },
    { id:'result', title:'Decision to student intake', label:'Acceptance Management', description:'Understand the boundaries between result management, reporting, publication, and student creation.', steps:[
      ['Matched application','Reviewed evidence available','Admissions reviewer','Case ready for decision','Documented concept'],
      ['Authorised result','Apply approved screening and correction policy','Admissions owner','Decision record','Policy required'],
      ['Report and publication','Check report; confirm applicant-facing result separately','Staff / application support','Consistent results','Documented functions; sequence unverified'],
      ['Approved intake','Check student creation and duplicate identity','Student records / application support','Student ID and first login','Conceptual flow; trigger unknown'],
    ], sources:[['M §10.3','UEAS-Technical-Manual.html#en-10-103-admission-workflow'],['P p. 6','UESD_CIS_Completion_Report_EN_Final_20260610.pdf#page=6']], explanation:'“Auto Student ID” is a project-report capability claim. The live trigger and approval evidence need local demonstration.' },
    { id:'incident', title:'First-line service response', label:'Operations', description:'Gather evidence, find the owning layer, and close the loop after an authorised fix.', steps:[
      ['Receive','Record time, role, URL, filters, expected and actual result','Operator','Incident record','Manual §6.5'],
      ['Verify safely','Reproduce read-only and inspect the request','Operator','Evidence','Manual §6.5'],
      ['Classify','Business policy, data, access, file, or application fault','Operator + owner','Correct escalation path','Recommended'],
      ['Resolve under authority','Business approval or technical correction','Named owner / support','Controlled fix','Policy and permission dependent'],
      ['Retest','Confirm user journey and record outcome','Operator + affected user','Closure evidence','Recommended'],
    ], sources:[['M §6.5','UEAS-Technical-Manual.html#en-06-65-investigating-a-production-issue'],['M §12.2','UEAS-Technical-Manual.html#en-12-122-access-request-and-escalation']], explanation:'The manual documents investigation and the need for named contacts. This five-step service shape is recommended, not an approved ticket workflow.' },
  ];
  const quiz = [
    { q:'Which surface does an applicant use to submit an admission application?', choices:['The public website admission feature','The staff Admin Portal','The student academic-record portal'], answer:0, why:'The technical manual places public admission application on the homepage and staff Admission inside the Admin Portal (M §1.1).' },
    { q:'Does hiding a staff menu enforce backend permission?', choices:['Yes, menu visibility is sufficient','No, backend authorisation must also be enforced','Only for read-only screens'], answer:1, why:'M §1.6 and §3.3 say the menu controls navigation; sensitive backend actions still need authorisation.' },
    { q:'What should you do before comparing one programme’s schedule, criteria, and form?', choices:['Use the same cohort filters on all three pages','Leave every School and Programme filter on All','Start by editing the application form'], answer:0, why:'A common year, semester, school, and programme keeps the comparison on the intended intake.' },
    { q:'Does comparing an examination aggregate itself approve admission?', choices:['Yes','No, it is part of review before result handling','Only for WASSCE Ghanaian'], answer:1, why:'The UI separates Submission Management from Decision Management, and M §10.3 separates screening from the admission result.' },
    { q:'What does “Pass” in the Decision Management screenshot prove?', choices:['The applicant has been admitted','It is a visible Result filter value; the meaning requires confirmation','A student ID was created'], answer:1, why:'The screenshot shows a filter value, but the manual does not define its code or relation to admission publication.' },
    { q:'An approved applicant has no student ID. What is the safest next step?', choices:['Create a second applicant','Trace the approved handoff and duplicate-identity controls','Edit the student master directly'], answer:1, why:'M §10.3 calls for approved new-student creation and duplicate identity checks.' },
    { q:'What should an ordinary admissions support ticket contain?', choices:['Full identity document and password','Exact time, role, filters, URL, expected/actual result, redacted reference','Only the applicant’s name'], answer:1, why:'M §§5.8–5.9 require reproducible evidence without passwords, session IDs, or unnecessary personal data.' },
    { q:'Which statement best describes the admission chain?', choices:['A screenshot proves every status and approval step','Application and evidence → review → authorised result → approved student intake, with exact controls to verify','The report screen automatically creates a student ID'], answer:1, why:'M §10.3 gives the conceptual chain while leaving publication and creation controls unspecified.' },
  ];
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { state = {}; }
  state.completed = Array.isArray(state.completed) ? state.completed : [];
  state.bookmarks = Array.isArray(state.bookmarks) ? state.bookmarks : [];
  state.quiz = state.quiz || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lesson = n => data.lessons[n - 1];
  const route = () => (location.hash.slice(1) || '/dashboard').split('?')[0];
  const link = (path, text, cls='') => `<a class="${cls}" href="#${path}">${text}</a>`;
  const sourceLink = (label, url) => `<a class="ref" href="sources/${url}" target="_blank" rel="noopener">${esc(label)}</a>`;
  function rewriteSourceLinks(root=document){
    if(window.STUDY_SOURCE_MODE!=='private-repo')return;
    root.querySelectorAll('a[href^="sources/"]').forEach(a=>{
      const file=a.getAttribute('href').slice('sources/'.length);
      a.href=`https://github.com/EnochSage/ueas-admin-portal-manual/blob/main/manuals/${file}`;
      a.title='Private source file · GitHub sign-in required';
    });
  }

  function sidebar(query='') {
    const r = route();
    const term = query.toLowerCase().trim();
    const top = [['/dashboard','Dashboard'],['/workflow','Workflow Explorer'],['/glossary','Glossary'],['/scenarios','Practical Scenarios'],['/meeting','Meeting Preparation'],['/sources','Sources and Gaps']];
    const mainLinks = top.filter(([p,t]) => !term || t.toLowerCase().includes(term));
    let html = `<div class="brand"><div class="brand-mark" aria-hidden="true">UE</div><div><div class="brand-title">UEAS Admission</div><div class="brand-sub">Learning Studio</div></div></div><div class="side-search"><label class="sr-only" for="sidebar-search">Search sidebar</label><input id="sidebar-search" type="search" placeholder="Find a lesson or topic" value="${esc(query)}"></div>`;
    html += `<div class="side-label">Explore</div>` + mainLinks.map(([p,t]) => link(p, `<span>${esc(t)}</span>`, `side-link ${r===p?'active':''}`)).join('');
    for (const group of groups) {
      const items = group.lessons.map(n=>lesson(n)).filter(l => !term || (l.title+' '+l.search).toLowerCase().includes(term));
      if (!items.length) continue;
      html += `<div class="side-label">${esc(group.title)}</div>`;
      html += items.map(l=>link(`/lesson/${l.number}`, `<span class="mini-dot" aria-hidden="true"></span><span>${esc(l.number+'. '+l.title)}</span>`, `side-link ${r===`/lesson/${l.number}`?'active':''} ${state.completed.includes(l.number)?'done':''}`)).join('');
    }
    if (term && !mainLinks.length && !groups.some(g=>g.lessons.some(n=>(lesson(n).title+' '+lesson(n).search).toLowerCase().includes(term)))) html += `<p class="side-empty">No matching lessons. Try the full search.</p>`;
    html += `<p class="side-note">Progress and bookmarks are saved in this browser only. They do not synchronise across devices.</p>`;
    return html;
  }

  function layout(breadcrumb, content) {
    document.getElementById('app').innerHTML = `<div class="app-shell"><aside class="sidebar" id="sidebar" aria-label="Primary navigation">${sidebar(window.__sidebarQuery||'')}</aside><div class="mobile-shade" id="mobile-shade"></div><div class="main-wrap"><header class="topbar"><button class="icon-btn mobile-toggle" id="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button><div class="breadcrumbs">${link('/dashboard','Home')}<span>/</span>${breadcrumb}</div><div class="top-actions"><button class="icon-btn" id="open-search" aria-label="Search all content" title="Search">⌕</button><button class="icon-btn" id="theme-toggle" aria-label="Toggle light and dark mode" title="Theme">${document.documentElement.dataset.theme==='dark'?'☀':'◐'}</button></div></header><main class="main" id="main" tabindex="-1">${content}</main></div></div><div class="search-panel" id="search-panel" role="dialog" aria-modal="true" aria-label="Search study content"><div class="search-dialog"><div class="search-top"><input id="global-search" type="search" placeholder="Search lessons, glossary, scenarios…" aria-label="Search all study content"><button class="icon-btn" id="close-search" aria-label="Close search">✕</button></div><div class="search-results" id="search-results"></div></div></div>`;
    bindShell();
  }

  function bindShell() {
    const sidebarInput = document.getElementById('sidebar-search');
    sidebarInput?.addEventListener('input', e => {
      window.__sidebarQuery = e.target.value;
      const node = document.getElementById('sidebar');
      node.innerHTML = sidebar(window.__sidebarQuery);
      const fresh = document.getElementById('sidebar-search');
      fresh.focus(); fresh.setSelectionRange(fresh.value.length,fresh.value.length);
      bindSidebarSearch();
    });
    document.getElementById('menu-toggle')?.addEventListener('click', () => toggleMobile(true));
    document.getElementById('mobile-shade')?.addEventListener('click', () => toggleMobile(false));
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next; state.theme = next; save();
      document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀' : '◐';
    });
    document.getElementById('open-search')?.addEventListener('click', openSearch);
    document.getElementById('close-search')?.addEventListener('click', closeSearch);
    document.getElementById('search-panel')?.addEventListener('click', e => { if(e.target.id==='search-panel') closeSearch(); });
    document.getElementById('global-search')?.addEventListener('input', e=>search(e.target.value));
    document.getElementById('sidebar')?.addEventListener('click',e=>{if(e.target.closest('a')) toggleMobile(false)});
  }
  function bindSidebarSearch(){document.getElementById('sidebar-search')?.addEventListener('input', e=>{window.__sidebarQuery=e.target.value;document.getElementById('sidebar').innerHTML=sidebar(window.__sidebarQuery);const f=document.getElementById('sidebar-search');f.focus();f.setSelectionRange(f.value.length,f.value.length);bindSidebarSearch()})}
  function toggleMobile(open){document.getElementById('sidebar')?.classList.toggle('open',open);document.getElementById('mobile-shade')?.classList.toggle('open',open);document.getElementById('menu-toggle')?.setAttribute('aria-expanded',String(open))}

  function dashboard() {
    const completed = state.completed.length;
    const next = data.lessons.find(l=>!state.completed.includes(l.number)) || lesson(8);
    const saved = state.bookmarks.map(n=>lesson(n)).filter(Boolean);
    let cards = groups.map((g,i)=>{
      const first=lesson(g.lessons[0]);const done=g.lessons.filter(n=>state.completed.includes(n)).length;
      return link(`/lesson/${first.number}`,`<div class="module-index">0${i+1}</div><div><strong>${esc(g.title)}</strong><span>${g.lessons.map(n=>esc(lesson(n).title)).join(' · ')}</span><em>${done}/${g.lessons.length} lessons complete</em></div>`,'card module-card');
    }).join('');
    layout('Dashboard',`<div class="page-head"><div><div class="eyebrow">Your study space</div><h1 class="page-title">Welcome back</h1><p class="page-sub">Learn the Admission Portal one stage at a time, from intake setup to first-line support.</p></div></div><div class="dashboard-grid"><section class="card welcome"><div class="eyebrow">Continue learning · Lesson ${next.number}</div><h2>${esc(next.title)}</h2><p>${esc(next.subtitle)}</p>${link(`/lesson/${next.number}`,'Continue Learning','button')}</section><section class="card progress-card"><div class="ring" style="--amount:${Math.round(completed/8*100)}%"><div class="ring-inner">${Math.round(completed/8*100)}%</div></div><h3>${completed} of 8 lessons complete</h3><p>Your progress stays on this device.</p></section></div><h2 class="section-title">Study roadmap</h2><div class="module-grid">${cards}</div>${saved.length?`<h2 class="section-title">Bookmarked lessons</h2><div class="module-grid">${saved.map(l=>link(`/lesson/${l.number}`,`<div class="module-index">${l.number}</div><div><strong>${esc(l.title)}</strong><span>${esc(l.subtitle)}</span></div>`,'card module-card')).join('')}</div>`:''}<p class="local-note">Start with Foundations, then follow the roadmap. Source labels distinguish documented facts, screenshot observations, interpretations, and questions to verify.</p>`);
  }

  function lessonPage(n) {
    const item=lesson(n);if(!item){location.hash='#/dashboard';return}
    state.lastVisited=n;save();
    const done=state.completed.includes(n), bookmarked=state.bookmarks.includes(n);
    layout(`${link('/dashboard','Lessons')}<span>/</span>${esc(item.title)}`,`<div class="lesson-layout"><div class="lesson-page"><div class="page-head"><div><div class="eyebrow">Lesson ${n} of 8</div><h1 class="page-title">${esc(item.title)}</h1><p class="page-sub">${esc(item.subtitle)}</p></div></div><div class="lesson-controls"><button class="button ${done?'':'primary'}" id="complete-btn" aria-pressed="${done}">${done?'✓ Completed':'Mark complete'}</button><button class="button" id="bookmark-btn" aria-pressed="${bookmarked}">${bookmarked?'★ Bookmarked':'☆ Bookmark'}</button><button class="button" id="print-btn">Print lesson</button></div><div class="lesson-body" id="lesson-body">${item.html}</div><div id="quiz-slot"></div><nav class="lesson-footer" aria-label="Lesson navigation">${n>1?link(`/lesson/${n-1}`,'Previous lesson','button'):'<span></span>'}${n<8?link(`/lesson/${n+1}`,'Next lesson','button primary'):link('/dashboard','Back to roadmap','button primary')}</nav></div><aside class="in-page" id="in-page"><h3>In this lesson</h3></aside></div>`);
    document.getElementById('complete-btn').addEventListener('click',()=>{state.completed=doneToggle(state.completed,n);save();lessonPage(n)});
    document.getElementById('bookmark-btn').addEventListener('click',()=>{state.bookmarks=doneToggle(state.bookmarks,n);save();lessonPage(n)});
    document.getElementById('print-btn').addEventListener('click',()=>window.print());
    enhanceLesson(n); renderQuiz(n);
  }
  const doneToggle=(arr,n)=>arr.includes(n)?arr.filter(x=>x!==n):[...arr,n].sort((a,b)=>a-b);
  function enhanceLesson(n){
    const root=document.getElementById('lesson-body');
    const toc=document.getElementById('in-page');
    const sections=[...root.querySelectorAll('h3,.objectives,.diagram,.tablewrap,.exercise,details,.key')]
      .filter(el=>!(el.matches('h3')&&el.closest('.objectives,.box,.exercise')));
    let tableNumber=0;
    sections.forEach((el,i)=>{
      let label=el.matches('h3')?el.textContent.trim():el.matches('.objectives')?'Learning objectives':el.matches('.diagram')?el.querySelector('.diagram-title')?.textContent.trim()||'Workflow diagram':el.matches('.tablewrap')?`Reference table ${++tableNumber}`:el.matches('.exercise')?el.querySelector('h4')?.textContent.trim()||'Worked example':el.matches('details')?'Knowledge check':'Key takeaway';
      el.id=`section-${n}-${i}`;
      toc.insertAdjacentHTML('beforeend',`<button class="toc-link" type="button" data-section="${el.id}">${esc(label)}</button>`);
    });
    toc.querySelectorAll('[data-section]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.section)?.scrollIntoView({block:'start',behavior:'smooth'})));
    const jump=document.createElement('select');
    jump.className='jump-select'; jump.setAttribute('aria-label','Jump to a section in this lesson');
    jump.innerHTML='<option value="">In this lesson…</option>'+[...toc.querySelectorAll('[data-section]')].map(b=>`<option value="${b.dataset.section}">${esc(b.textContent)}</option>`).join('');
    document.querySelector('.lesson-controls').appendChild(jump);
    jump.addEventListener('change',()=>{if(jump.value)document.getElementById(jump.value)?.scrollIntoView({block:'start',behavior:'smooth'})});
    enhanceDiagrams(root);
    root.querySelectorAll('a[href^="sources/"]').forEach(a=>{a.target='_blank';a.rel='noopener'});
  }
  function enhanceDiagrams(root){
    root.querySelectorAll('.diagram,.workflow-diagram').forEach(d=>{
      if(d.dataset.enhanced)return;d.dataset.enhanced='true';
      const title=d.querySelector('.diagram-title')?.textContent||'Workflow diagram';
      d.querySelector('.diagram-title')?.remove();
      const canvas=document.createElement('div');canvas.className='diagram-canvas';
      while(d.firstChild)canvas.appendChild(d.firstChild);
      d.innerHTML=`<div class="diagram-toolbar"><div class="diagram-title">${esc(title)}</div><div class="zoom-controls"><button class="zoom-btn" type="button" aria-label="Zoom out">−</button><span aria-live="polite">100%</span><button class="zoom-btn" type="button" aria-label="Zoom in">+</button></div></div>`;
      d.appendChild(canvas);
      let value=100;
      const buttons=d.querySelectorAll('.zoom-btn');
      const update=()=>{canvas.style.zoom=`${value}%`;d.querySelector('.zoom-controls span').textContent=`${value}%`};
      buttons[0].addEventListener('click',()=>{value=Math.max(70,value-15);update()});
      buttons[1].addEventListener('click',()=>{value=Math.min(160,value+15);update()});
    });
  }
  function renderQuiz(n){
    const q=quiz[n-1], saved=state.quiz[n];
    document.getElementById('quiz-slot').innerHTML=`<section class="quiz-card" aria-labelledby="quiz-title"><div class="eyebrow">Knowledge check</div><h3 id="quiz-title">${esc(q.q)}</h3><div id="quiz-options">${q.choices.map((c,i)=>`<button class="quiz-option" type="button" data-choice="${i}" aria-pressed="${saved?.choice===i}">${esc(c)}</button>`).join('')}</div><button class="button primary" id="quiz-check" type="button">Check answer</button><div id="quiz-feedback" aria-live="polite">${saved?.checked?`<div class="feedback ${saved.correct?'':'wrong'}"><strong>${saved.correct?'Correct.':'Review this one.'}</strong> ${esc(q.why)}</div>`:''}</div></section>`;
    let selected=saved?.choice??null;
    document.querySelectorAll('.quiz-option').forEach(b=>{if(Number(b.dataset.choice)===selected)b.classList.add('selected');b.addEventListener('click',()=>{selected=Number(b.dataset.choice);document.querySelectorAll('.quiz-option').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))})})});
    document.getElementById('quiz-check').addEventListener('click',()=>{if(selected===null){document.getElementById('quiz-feedback').innerHTML='<div class="feedback wrong">Choose an answer first.</div>';return}const correct=selected===q.answer;state.quiz[n]={choice:selected,checked:true,correct};save();document.getElementById('quiz-feedback').innerHTML=`<div class="feedback ${correct?'':'wrong'}"><strong>${correct?'Correct.':'Review this one.'}</strong> ${esc(q.why)}</div>`});
  }

  function workflowPage(){
    const active=workflows.find(w=>w.id===window.__workflowTab)||workflows[0];
    const tabs=workflows.map(w=>`<button class="tab-btn ${w.id===active.id?'active':''}" type="button" data-workflow="${w.id}" aria-pressed="${w.id===active.id}">${esc(w.title)}</button>`).join('');
    const steps=active.steps.map((s,i)=>`<div class="node ${i===active.steps.length-1?'gold':''}"><strong>${esc(s[0])}</strong><small>${esc(s[1])}</small></div>${i<active.steps.length-1?'<div class="arrow" aria-hidden="true">→</div>':''}`).join('');
    const rows=active.steps.map((s,i)=>`<tr><td>${i+1}. ${esc(s[0])}</td><td>${esc(s[2])}</td><td>${esc(s[3])}</td><td>${esc(s[4])}</td></tr>`).join('');
    layout('Workflow Explorer',`<div class="page-head"><div><div class="eyebrow">Process maps</div><h1 class="page-title">Workflow Explorer</h1><p class="page-sub">Follow the sequence, inspect the handoff, and see where policy or live behaviour still needs verification.</p></div></div><div class="tabs" role="group" aria-label="Choose a workflow">${tabs}</div><section class="card"><div class="eyebrow">${esc(active.label)}</div><h2 class="section-title" style="margin:5px 0 6px">${esc(active.title)}</h2><p>${esc(active.description)}</p><div class="workflow-diagram"><div class="diagram-title">${esc(active.title)} · zoomable</div><div class="flow">${steps}</div></div><p class="diagram-caption">${esc(active.explanation)}</p><div class="tablewrap"><table class="data-table"><thead><tr><th>Stage</th><th>Responsible</th><th>Output</th><th>Evidence level</th></tr></thead><tbody>${rows}</tbody></table></div><p class="local-note">Sources: ${active.sources.map(([label,url])=>sourceLink(label,url)).join(' ')}</p></section>`);
    document.querySelectorAll('[data-workflow]').forEach(b=>b.addEventListener('click',()=>{window.__workflowTab=b.dataset.workflow;workflowPage()}));
    enhanceDiagrams(document.querySelector('.main'));
  }

  function glossaryPage(){
    layout('Glossary',`<div class="page-head"><div><div class="eyebrow">Reference</div><h1 class="page-title">Glossary</h1><p class="page-sub">Admission terms, acronyms, and the meanings established by the supplied sources.</p></div></div><input class="search-inline" id="glossary-filter" type="search" placeholder="Filter terms and definitions" aria-label="Filter glossary"><p class="local-note" id="glossary-count"></p><div class="glossary-grid" id="glossary-grid"></div>`);
    const input=document.getElementById('glossary-filter');input.addEventListener('input',()=>drawGlossary(input.value));drawGlossary('');
  }
  function drawGlossary(q){const terms=q.toLowerCase().trim().split(/\s+/).filter(Boolean);const list=glossary.filter(g=>terms.every(t=>(g.term+' '+g.expansion+' '+g.definition).toLowerCase().includes(t)));document.getElementById('glossary-count').textContent=`${list.length} term${list.length===1?'':'s'}`;document.getElementById('glossary-grid').innerHTML=list.map(g=>`<article class="card glossary-card"><div class="eyebrow">${esc(g.term)}</div><h3>${esc(g.expansion)}</h3><p>${esc(g.definition)}</p><small><a href="${g.source}" target="_blank" rel="noopener">Open source</a></small></article>`).join('')||'<div class="card empty-state">No terms match your search.</div>';rewriteSourceLinks(document.getElementById('glossary-grid'))}

  function scenariosPage(){
    layout('Practical Scenarios',`<div class="page-head"><div><div class="eyebrow">Practice lab</div><h1 class="page-title">Practical Scenarios</h1><p class="page-sub">Try the case first, then expand the worked answer. All applicant data is fictional.</p></div></div><input class="search-inline" id="scenario-filter" type="search" placeholder="Find a scenario" aria-label="Filter practical scenarios"><div class="scenario-grid" id="scenario-grid" style="margin-top:16px"></div>`);
    document.getElementById('scenario-filter').addEventListener('input',e=>drawScenarios(e.target.value));drawScenarios('');
  }
  function drawScenarios(q){const terms=q.toLowerCase().trim().split(/\s+/).filter(Boolean);const list=data.scenarios.filter(s=>terms.every(t=>s.search.toLowerCase().includes(t)));document.getElementById('scenario-grid').innerHTML=list.map(s=>`<article class="card scenario-card"><div class="eyebrow">Fictional exercise</div><h3>${esc(s.title)}</h3><p>${s.situation}</p><p>${s.questions}</p><details class="content-details"><summary>Show worked answer</summary><p>${s.answer}</p></details></article>`).join('')||'<div class="card empty-state">No scenarios match your search.</div>';document.querySelectorAll('.scenario-card a[href^="sources/"]').forEach(a=>{a.target='_blank';a.rel='noopener'});rewriteSourceLinks(document.getElementById('scenario-grid'))}

  function meetingPage(){
    const cards=data.meeting.map(m=>`<article class="card meeting-card"><h3>${esc(m.question)}</h3><p>${m.answer}</p></article>`).join('');
    layout('Meeting Preparation',`<div class="page-head"><div><div class="eyebrow">Speak with confidence</div><h1 class="page-title">Meeting Preparation</h1><p class="page-sub">Clear answers grounded in the manual, plus questions to settle with the right owners.</p></div></div><h2 class="section-title">Likely team-lead questions</h2><div class="meeting-list">${cards}</div><h2 class="section-title">Questions to raise</h2><div class="lesson-body">${data.panels.gaps.html}</div>`);
    document.querySelectorAll('.meeting-card a[href^="sources/"]').forEach(a=>{a.target='_blank';a.rel='noopener'});
  }
  function sourcesPage(){layout('Sources and Gaps',`<div class="page-head"><div><div class="eyebrow">Evidence library</div><h1 class="page-title">Sources and Gaps</h1><p class="page-sub">Trace each claim to a cited manual section or report page.</p></div></div><p class="local-note">Original source files are in the private repository. GitHub sign-in and repository access are required to open them.</p><div class="lesson-body">${data.panels.evidence.html}${data.panels.sources.html}</div><div class="lesson-body" style="margin-top:18px">${data.panels.gaps.html}</div>`);document.querySelectorAll('.lesson-body a[href^="sources/"]').forEach(a=>{a.target='_blank';a.rel='noopener'})}

  function openSearch(){const panel=document.getElementById('search-panel');panel.classList.add('open');window.__previousFocus=document.activeElement;const input=document.getElementById('global-search');input.value='';document.getElementById('search-results').innerHTML='<div class="empty-state">Search across all lessons, glossary terms, scenarios, and meeting questions.</div>';input.focus()}
  function closeSearch(){document.getElementById('search-panel')?.classList.remove('open');window.__previousFocus?.focus()}
  function excerpt(s,q){const clean=s.replace(/\s+/g,' ');const i=clean.toLowerCase().indexOf(q.toLowerCase());const start=Math.max(0,i-65);return (start?'…':'')+clean.slice(start,start+170)+(start+170<clean.length?'…':'')}
  function search(q){const term=q.trim().toLowerCase();const out=document.getElementById('search-results');if(!term){out.innerHTML='<div class="empty-state">Type a topic, programme, status, or source term.</div>';return}const terms=term.split(/\s+/);const hits=[];const match=s=>terms.every(t=>s.toLowerCase().includes(t));data.lessons.forEach(l=>{if(match(l.search))hits.push({type:'Lesson',title:l.title,text:excerpt(l.search,term),route:`/lesson/${l.number}`})});glossary.forEach(g=>{const s=g.term+' '+g.expansion+' '+g.definition;if(match(s))hits.push({type:'Glossary',title:g.term+' · '+g.expansion,text:excerpt(s,term),route:'/glossary'})});data.scenarios.forEach(s=>{if(match(s.search))hits.push({type:'Scenario',title:s.title,text:excerpt(s.search,term),route:'/scenarios'})});data.meeting.forEach(m=>{const s=m.question+' '+m.answer.replace(/<[^>]*>/g,' ');if(match(s))hits.push({type:'Meeting',title:m.question,text:excerpt(s,term),route:'/meeting'})});out.innerHTML=hits.slice(0,30).map(h=>`<button class="search-result" data-route="${h.route}"><small>${h.type}</small><strong>${esc(h.title)}</strong><span>${esc(h.text)}</span></button>`).join('')||'<div class="empty-state">No results. Try another term.</div>';out.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>{closeSearch();location.hash='#'+b.dataset.route}))}
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}if(e.key==='Escape'){closeSearch();toggleMobile(false)}if(e.key==='Tab'&&document.getElementById('search-panel')?.classList.contains('open')){const f=[...document.querySelectorAll('#search-panel input,#search-panel button')];const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  document.querySelector('.skip-link')?.addEventListener('click',e=>{e.preventDefault();document.getElementById('main')?.focus()});
  function render(){const r=route();document.documentElement.dataset.theme=state.theme||'light';if(r.startsWith('/lesson/'))lessonPage(Number(r.split('/')[2]));else if(r==='/workflow')workflowPage();else if(r==='/glossary')glossaryPage();else if(r==='/scenarios')scenariosPage();else if(r==='/meeting')meetingPage();else if(r==='/sources')sourcesPage();else dashboard();rewriteSourceLinks();window.scrollTo({top:0,behavior:'instant'})}
  window.addEventListener('hashchange',render);render();
})();
