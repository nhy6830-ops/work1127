// ============================================================
// app.js — 메인 앱 컨트롤러
// ============================================================

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────
  const state = {
    checklistChecked: loadChecklist(),
    activeUsageTab: 'forbidden',
    activeClTab: 'checklist',
    recordData: loadRecord()
  };

  // ── DOM ready ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildHero();
    buildPurpose();
    buildPrinciples();
    buildUsage();
    buildCitation();
    buildResponsibility();
    buildPrivacy();
    buildEvaluation();
    buildChecklist();
    buildClosing();
    buildFooter();
    initProgressBar();
    initScrollReveal();
    initBackTop();
    initNavActive();
  });

  // ── Build Navigation ─────────────────────────────────────────
  function buildNav() {
    const nav = document.getElementById('nav');
    const logo = document.createElement('div');
    logo.id = 'nav-logo';
    logo.innerHTML = `🎓 AI 윤리 가이드라인 <span>학습자용 | 대학</span>`;

    const pills = document.createElement('div');
    pills.id = 'nav-pills';
    const sections = [
      ['hero', '홈'], ['purpose', '취지'], ['principles', '5대 원칙'],
      ['usage', '활용유형'], ['citation', '출처표기'], ['responsibility', '책임성'],
      ['privacy', '정보보호'], ['evaluation', '평가기준'], ['checklist', '체크리스트'],
      ['closing', '마무리']
    ];
    sections.forEach(([id, label]) => {
      const btn = document.createElement('button');
      btn.className = 'nav-pill';
      btn.dataset.target = id;
      btn.textContent = label;
      btn.addEventListener('click', () => {
        document.getElementById('section-' + id)?.scrollIntoView({ behavior: 'smooth' });
      });
      pills.appendChild(btn);
    });

    const actions = document.createElement('div');
    actions.id = 'nav-actions';
    actions.innerHTML = `
      <button class="btn-icon" title="인쇄" onclick="window.print()">🖨️</button>
      <button class="btn-icon" title="맨 위로" onclick="window.scrollTo({top:0,behavior:'smooth'})">⬆️</button>
    `;

    nav.appendChild(logo);
    nav.appendChild(pills);
    nav.appendChild(actions);
  }

  // ── Build Hero ───────────────────────────────────────────────
  function buildHero() {
    const sec = document.getElementById('section-hero');
    sec.innerHTML = `
      <div class="hero-grid"></div>
      <div class="hero-shard shard-1"></div>
      <div class="hero-shard shard-2"></div>
      <div class="cyber-circle"></div>
      <div class="cyber-circle"></div>
      <div class="hero-content">
        <div class="hero-eyebrow">📘 2026 · 교육부 · 한국대학교육협의회</div>
        <h1 class="hero-title">
          대학 <span class="accent">AI 활용</span><br>윤리 가이드라인
        </h1>
        <p class="hero-subtitle">학습자를 위한 실천 지침서</p>
        <p class="hero-meta">출처: 교육부·한국대학교육협의회 (2026.8.21.) | 연구책임: 김자미 / 고려대학교</p>
        <div class="hero-cta">
          <button class="btn-primary" onclick="document.getElementById('section-purpose').scrollIntoView({behavior:'smooth'})">
            📖 가이드라인 보기
          </button>
          <button class="btn-outline" onclick="document.getElementById('section-checklist').scrollIntoView({behavior:'smooth'})">
            ✅ 자가 체크리스트
          </button>
        </div>
      </div>
      <div class="hero-scroll-hint">SCROLL</div>
    `;
  }

  // ── Chapter Break Helper ─────────────────────────────────────
  function chapterBreak(icon, label, title) {
    return `
      <div class="chapter-break">
        <div class="chapter-break-icon">${icon}</div>
        <div class="chapter-break-label">${label}</div>
        <div class="chapter-break-title">${title}</div>
      </div>`;
  }

  function sectionHeader(icon, title, desc) {
    return `
      <div class="section-header reveal">
        <div class="section-header-icon">${icon}</div>
        <div class="section-header-text">
          <h2>${title}</h2>
          ${desc ? `<p>${desc}</p>` : ''}
        </div>
      </div>`;
  }

  // ── Build Purpose ────────────────────────────────────────────
  function buildPurpose() {
    const wrapper = document.getElementById('section-purpose');
    const d = DATA.purpose;
    let goalsHTML = d.goals.map((g, i) => `
      <div class="purpose-card reveal delay-${i+1}">
        <div class="purpose-card-icon">${g.icon}</div>
        <div class="purpose-card-body">
          <h3>${g.title}</h3>
          <p>${g.desc}</p>
        </div>
      </div>`).join('');

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '01 · Purpose', d.title)}
      <div class="purpose-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, '가이드라인이 필요한 이유와 추구하는 목표를 살펴봅니다.')}
          <div class="purpose-intro reveal">${d.background}</div>
          <div class="purpose-grid">${goalsHTML}</div>
        </div>
      </div>`;
  }

  // ── Build Principles ─────────────────────────────────────────
  function buildPrinciples() {
    const wrapper = document.getElementById('section-principles');
    const d = DATA.principles;

    let cardsHTML = d.list.map((p, i) => `
      <div class="principle-card reveal delay-${i+1}" data-pid="${p.id}">
        <div class="principle-card-top" style="background:linear-gradient(135deg,${p.color},${darken(p.color)})">
          <div class="principle-num">${p.num}</div>
          <div class="principle-title">${p.title}</div>
          <div class="eval-severity-bar">
            <div class="eval-severity-bar-fill" style="width:${(i+1)*20}%"></div>
          </div>
        </div>
        <div class="principle-body">
          <p class="principle-desc">${p.desc}</p>
          <div class="principle-subs">
            <ul>${p.subs.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
          <div class="principle-toggle" style="color:${p.color}"></div>
        </div>
      </div>`).join('');

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '02 · Principles', d.title)}
      <div class="principles-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, '학습자가 AI를 활용할 때 반드시 지켜야 할 5가지 핵심 원칙입니다.')}
          <div class="principles-grid">${cardsHTML}</div>
        </div>
      </div>`;

    // Toggle accordion
    wrapper.querySelectorAll('.principle-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('open');
      });
    });
  }

  // ── Build Usage Types ────────────────────────────────────────
  function buildUsage() {
    const wrapper = document.getElementById('section-usage');
    const d = DATA.usageTypes;

    let tabsHTML = d.categories.map(c => `
      <button class="usage-tab ${c.type === state.activeUsageTab ? 'active' : ''}" data-type="${c.type}">
        ${c.icon} ${c.label}
      </button>`).join('');

    let panelsHTML = d.categories.map(c => `
      <div class="usage-panel ${c.type === state.activeUsageTab ? 'active' : ''}" data-type="${c.type}">
        <div class="usage-panel-header" style="background:linear-gradient(135deg,${c.color},${darken(c.color)})">
          <div class="icon">${c.icon}</div>
          <div>
            <h3>${c.label}</h3>
            <p>${c.desc}</p>
          </div>
        </div>
        <ul class="usage-items">
          ${c.items.map(item => `
            <li class="usage-item">
              <div class="usage-item-dot" style="background:${c.color}"></div>
              ${item}
            </li>`).join('')}
        </ul>
      </div>`).join('');

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '03-1 · Usage Types', d.title)}
      <div class="usage-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, '수업별로 AI 활용이 허용되는 범위를 명확히 구분합니다.')}
          <div class="usage-tabs reveal">${tabsHTML}</div>
          <div class="usage-panels reveal">${panelsHTML}</div>
        </div>
      </div>`;

    wrapper.querySelectorAll('.usage-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const type = tab.dataset.type;
        state.activeUsageTab = type;
        wrapper.querySelectorAll('.usage-tab').forEach(t => t.classList.remove('active'));
        wrapper.querySelectorAll('.usage-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        wrapper.querySelector(`.usage-panel[data-type="${type}"]`).classList.add('active');
      });
    });
  }

  // ── Build Citation ───────────────────────────────────────────
  function buildCitation() {
    const wrapper = document.getElementById('section-citation');
    const d = DATA.citation;

    let miscHTML = d.misconduct.map((m, i) => `
      <div class="misconduct-card reveal delay-${(i%3)+1}">
        <div class="misconduct-icon">${m.icon}</div>
        <div>
          <h3>${m.title}</h3>
          <p>${m.desc}</p>
        </div>
      </div>`).join('');

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '03-2 · Citation & Integrity', d.title)}
      <div class="citation-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, 'AI를 활용한 경우 반드시 출처를 표기하고 부정행위를 예방해야 합니다.')}
          <div class="apa-box reveal">
            <div class="apa-box-label">${d.apa.label}</div>
            <div class="apa-box-code">${d.apa.example}</div>
          </div>
          <div class="habits-label">❌ 부정행위 유형 6가지</div>
          <div class="misconduct-grid">${miscHTML}</div>
        </div>
      </div>`;
  }

  // ── Build Responsibility ─────────────────────────────────────
  function buildResponsibility() {
    const wrapper = document.getElementById('section-responsibility');
    const d = DATA.responsibility;

    let qHTML = d.quadrants.map((q, i) => `
      <div class="quadrant-card reveal delay-${i+1}" style="border-color:${q.color}22">
        <div class="quadrant-card" style="display:none"></div>
        <style>
          #section-responsibility .quadrant-card:nth-child(${i+1})::before { background:${q.color}; }
          #section-responsibility .quadrant-card:nth-child(${i+1}) h3 { color:${q.color}; }
        </style>
        <div class="quadrant-icon">${q.icon}</div>
        <h3>${q.title}</h3>
        <ul>${q.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>`).join('');

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '03-3 · Responsibility', d.title)}
      <div class="responsibility-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, '학습자가 AI 활용에서 가져야 할 태도와 의무입니다.')}
          <div class="quadrant-grid">${qHTML}</div>
        </div>
      </div>`;

    // Apply colors properly
    const cards = wrapper.querySelectorAll('.quadrant-card:not([style*="display:none"])');
    DATA.responsibility.quadrants.forEach((q, i) => {
      const card = wrapper.querySelectorAll('.quadrant-grid .quadrant-card')[i];
      if (card) {
        card.style.borderColor = q.color + '33';
        card.querySelector('h3').style.color = q.color;
        card.style.setProperty('--accent', q.color);
        const pseudo = card.querySelector('.quadrant-card');
        if (pseudo) pseudo.remove();
        // Fix ::before via inline style attribute
        card.setAttribute('data-color', q.color);
        const before = document.createElement('div');
        before.style.cssText = `position:absolute;top:0;left:0;right:0;height:4px;background:${q.color};border-radius:${getComputedStyle(document.documentElement).getPropertyValue('--card-radius')} ${getComputedStyle(document.documentElement).getPropertyValue('--card-radius')} 0 0`;
        card.style.position = 'relative';
        card.prepend(before);
      }
    });

    // Remove injected style tags
    wrapper.querySelectorAll('style').forEach(s => s.remove());
  }

  // ── Build Privacy ────────────────────────────────────────────
  function buildPrivacy() {
    const wrapper = document.getElementById('section-privacy');
    const d = DATA.privacy;

    let forbiddenHTML = d.forbidden.map((f, i) => `
      <div class="privacy-forbidden-card reveal delay-${i+1}">
        <div class="pficon">${f.icon}</div>
        <h3>${f.title}</h3>
        <ul>${f.items.map(it => `<li>${it}</li>`).join('')}</ul>
      </div>`).join('');

    let habitsHTML = d.habits.map((h, i) => `
      <div class="habit-card reveal delay-${i+1}">
        <div class="habit-icon">${h.icon}</div>
        <div>
          <h4>${h.title}</h4>
          <p>${h.desc}</p>
        </div>
      </div>`).join('');

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '03-4 · Privacy & Security', d.title)}
      <div class="privacy-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, 'AI에 절대 입력하면 안 되는 정보와 안전한 활용 습관을 알아봅니다.')}
          <div class="habits-label">🚫 절대 AI에 입력 금지 정보</div>
          <div class="privacy-forbidden-grid">${forbiddenHTML}</div>
          <div class="habits-label">✅ 보안 습관 4가지</div>
          <div class="habits-grid">${habitsHTML}</div>
        </div>
      </div>`;
  }

  // ── Build Evaluation ─────────────────────────────────────────
  function buildEvaluation() {
    const wrapper = document.getElementById('section-evaluation');
    const d = DATA.evaluation;

    let levelsHTML = d.levels.map((lv, i) => `
      <div class="eval-level reveal delay-${i+1}">
        <div class="eval-level-header" style="background:linear-gradient(135deg,${lv.color},${darken(lv.color)})">
          <div class="eval-severity-badge" style="background:rgba(255,255,255,0.2);color:#fff">
            ${'★'.repeat(lv.severity)}${'☆'.repeat(3-lv.severity)}
          </div>
          <div class="eval-info">
            <h3>${lv.level} 위반</h3>
            <p>${lv.condition}</p>
          </div>
        </div>
        <div class="eval-level-body">
          <div class="eval-action-label">조치 사항</div>
          <div class="eval-action">🔔 ${lv.action}</div>
          <div class="eval-examples">
            ${lv.examples.map(e => `<span class="eval-example-pill">${e}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '04 · Evaluation Standards', d.title)}
      <div class="evaluation-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, 'AI 오용의 심각도에 따른 위반 기준과 조치를 명시합니다.')}
          <div class="eval-levels">${levelsHTML}</div>
        </div>
      </div>`;
  }

  // ── Build Checklist ──────────────────────────────────────────
  function buildChecklist() {
    const wrapper = document.getElementById('section-checklist');
    const d = DATA.checklist;

    wrapper.innerHTML = `
      ${chapterBreak(d.icon, '05 · Checklist & Record', d.title)}
      <div class="checklist-bg">
        <div class="section">
          ${sectionHeader(d.icon, d.title, '14개 항목으로 AI 활용의 윤리성을 직접 점검하고 기록표를 작성합니다.')}
          <div class="checklist-tabs reveal">
            <button class="cl-tab ${state.activeClTab==='checklist'?'active':''}" data-tab="checklist">✅ 자가 체크리스트</button>
            <button class="cl-tab ${state.activeClTab==='record'?'active':''}" data-tab="record">📋 AI 활용 기록표</button>
          </div>
          <div id="cl-checklist" class="cl-panel ${state.activeClTab==='checklist'?'active':''}">
            ${buildChecklistPanel(d)}
          </div>
          <div id="cl-record" class="cl-panel ${state.activeClTab==='record'?'active':''}">
            ${buildRecordPanel(d)}
          </div>
        </div>
      </div>`;

    // Tab switching
    wrapper.querySelectorAll('.cl-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const t = tab.dataset.tab;
        state.activeClTab = t;
        wrapper.querySelectorAll('.cl-tab').forEach(x => x.classList.remove('active'));
        wrapper.querySelectorAll('.cl-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        wrapper.querySelector(`#cl-${t}`).classList.add('active');
      });
    });

    // Checklist items
    attachChecklistEvents(wrapper);
    // Record form
    attachRecordEvents(wrapper);
    // Reset / check-all buttons
    wrapper.querySelector('#cl-reset')?.addEventListener('click', () => {
      if (!confirm('체크리스트를 초기화하시겠습니까?')) return;
      state.checklistChecked = {};
      saveChecklist();
      renderChecklistState(wrapper);
      showToast('🔄 체크리스트가 초기화되었습니다.');
    });
    wrapper.querySelector('#cl-check-all')?.addEventListener('click', () => {
      DATA.checklist.items.forEach(it => { state.checklistChecked[it.id] = true; });
      saveChecklist();
      renderChecklistState(wrapper);
      showToast('✅ 모든 항목이 체크되었습니다!');
    });

    renderChecklistState(wrapper);
  }

  function buildChecklistPanel(d) {
    const total = d.items.length;
    const itemsHTML = d.items.map((it, i) => `
      <div class="cl-item" data-id="${it.id}">
        <div class="cl-checkbox"></div>
        <div class="cl-item-num">${String(i+1).padStart(2,'0')}</div>
        <div class="cl-item-text">${it.text}</div>
        <div class="cl-phase-badge phase-${it.phase}">${it.phase}</div>
      </div>`).join('');

    return `
      <div class="cl-progress-bar-wrap reveal"><div class="cl-progress-bar-fill" id="cl-bar" style="width:0%"></div></div>
      <div class="cl-progress-text reveal">
        <span>진행률</span>
        <span class="cl-progress-score"><span id="cl-count">0</span> / ${total} 완료</span>
      </div>
      <div class="cl-items reveal">${itemsHTML}</div>
      <div class="cl-actions reveal">
        <button class="btn-sm" id="cl-check-all">✅ 전체 체크</button>
        <button class="btn-sm danger" id="cl-reset">🔄 초기화</button>
      </div>`;
  }

  function buildRecordPanel(d) {
    let fieldsHTML = d.recordFields.map(f => {
      let input = '';
      const val = state.recordData[f.id] || '';
      if (f.type === 'textarea') {
        input = `<textarea class="form-control" id="rf-${f.id}" placeholder="${f.placeholder||''}" rows="3">${val}</textarea>`;
      } else if (f.type === 'select') {
        const opts = f.options.map(o => `<option ${val===o?'selected':''}>${o}</option>`).join('');
        input = `<select class="form-control" id="rf-${f.id}"><option value="">선택하세요</option>${opts}</select>`;
      } else {
        input = `<input class="form-control" type="${f.type}" id="rf-${f.id}" placeholder="${f.placeholder||''}" value="${val}">`;
      }
      const isTextarea = f.type === 'textarea';
      return `<div class="form-group ${isTextarea?'full':''}">
        <label class="form-label" for="rf-${f.id}">${f.label}</label>
        ${input}
      </div>`;
    }).join('');

    return `
      <div class="record-form reveal">
        <div class="form-grid">${fieldsHTML}</div>
        <div class="form-actions">
          <button class="btn-success" id="record-save">💾 기록 저장</button>
          <button class="btn-sm" id="record-print">🖨️ 인쇄</button>
          <button class="btn-sm danger" id="record-clear">🗑️ 초기화</button>
        </div>
      </div>`;
  }

  function attachChecklistEvents(wrapper) {
    wrapper.querySelectorAll('.cl-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        state.checklistChecked[id] = !state.checklistChecked[id];
        saveChecklist();
        renderChecklistState(wrapper);
      });
    });
  }

  function attachRecordEvents(wrapper) {
    wrapper.querySelector('#record-save')?.addEventListener('click', () => {
      DATA.checklist.recordFields.forEach(f => {
        const el = wrapper.querySelector(`#rf-${f.id}`);
        if (el) state.recordData[f.id] = el.value;
      });
      saveRecord();
      showToast('💾 기록표가 저장되었습니다.');
    });
    wrapper.querySelector('#record-print')?.addEventListener('click', () => window.print());
    wrapper.querySelector('#record-clear')?.addEventListener('click', () => {
      if (!confirm('기록표를 초기화하시겠습니까?')) return;
      state.recordData = {};
      saveRecord();
      DATA.checklist.recordFields.forEach(f => {
        const el = wrapper.querySelector(`#rf-${f.id}`);
        if (el) el.value = '';
      });
      showToast('🗑️ 기록표가 초기화되었습니다.');
    });
  }

  function renderChecklistState(wrapper) {
    const items = wrapper.querySelectorAll('.cl-item');
    let checked = 0;
    items.forEach(item => {
      const id = item.dataset.id;
      const isChecked = !!state.checklistChecked[id];
      item.classList.toggle('checked', isChecked);
      const box = item.querySelector('.cl-checkbox');
      if (box) box.textContent = isChecked ? '✓' : '';
      if (isChecked) checked++;
    });
    const total = items.length;
    const pct = total ? Math.round((checked / total) * 100) : 0;
    const bar = wrapper.querySelector('#cl-bar');
    const countEl = wrapper.querySelector('#cl-count');
    if (bar) bar.style.width = pct + '%';
    if (countEl) countEl.textContent = checked;
  }

  // ── Build Closing ────────────────────────────────────────────
  function buildClosing() {
    const wrapper = document.getElementById('section-closing');
    const d = DATA.closing;

    let cHTML = d.commitments.map((c, i) => `
      <div class="commitment-item reveal delay-${i+1}">
        <div class="commitment-num">${c.num}</div>
        <div class="commitment-icon">${c.icon}</div>
        <div class="commitment-body">
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </div>
      </div>`).join('');

    wrapper.innerHTML = `
      <div class="closing-section">
        <div class="closing-inner">
          <div class="closing-eyebrow reveal">🌟 Closing · 마무리</div>
          <h2 class="closing-title reveal">${d.title}</h2>
          <div class="commitments-list">${cHTML}</div>
          <div class="closing-footer reveal">
            <strong>출처:</strong> 교육부·한국대학교육협의회 「대학 AI 활용 윤리 가이드라인」 (2026.8.21.)<br>
            <strong>연구팀:</strong> 김자미(연구책임), 유길상(공동연구), 김예슬·황인영·박재희(연구조원) / 고려대학교<br>
            이 가이드라인은 교육적 목적으로 제작되었으며, 학습자의 AI 윤리 의식 함양을 위해 활용됩니다.
          </div>
        </div>
      </div>`;
  }

  // ── Build Footer ─────────────────────────────────────────────
  function buildFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
      <strong>대학 AI 활용 윤리 가이드라인 (학습자용)</strong><br>
      © 2026 교육부 · 한국대학교육협의회 | 연구: 고려대학교 김자미 연구팀
    `;
  }

  // ── Scroll Progress Bar ──────────────────────────────────────
  function initProgressBar() {
    const bar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  // ── Scroll Reveal ────────────────────────────────────────────
  function initScrollReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // Re-observe dynamically added reveal elements
    const mutObs = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
    });
    mutObs.observe(document.getElementById('main'), { childList: true, subtree: true });
  }

  // ── Back to top button ───────────────────────────────────────
  function initBackTop() {
    const btn = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Nav active state ─────────────────────────────────────────
  function initNavActive() {
    const sections = document.querySelectorAll('[id^="section-"]');
    const pills = document.querySelectorAll('.nav-pill');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id.replace('section-', '');
          pills.forEach(p => p.classList.toggle('active', p.dataset.target === id));
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => obs.observe(s));
  }

  // ── Toast ────────────────────────────────────────────────────
  function showToast(msg, duration = 2500) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  // ── LocalStorage ─────────────────────────────────────────────
  function loadChecklist() {
    try { return JSON.parse(localStorage.getItem('ai-ethics-checklist') || '{}'); }
    catch { return {}; }
  }
  function saveChecklist() {
    localStorage.setItem('ai-ethics-checklist', JSON.stringify(state.checklistChecked));
  }
  function loadRecord() {
    try { return JSON.parse(localStorage.getItem('ai-ethics-record') || '{}'); }
    catch { return {}; }
  }
  function saveRecord() {
    localStorage.setItem('ai-ethics-record', JSON.stringify(state.recordData));
  }

  // ── Color Utility ────────────────────────────────────────────
  function darken(hex, amount = 30) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    let r = Math.max(0, parseInt(c.slice(0,2), 16) - amount);
    let g = Math.max(0, parseInt(c.slice(2,4), 16) - amount);
    let b = Math.max(0, parseInt(c.slice(4,6), 16) - amount);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  }

})();
