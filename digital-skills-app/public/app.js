// Index (units grouped by term) and lesson pages. Helpers come from common.js.

const ORDINALS = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة', 'الثامنة'];
const TERMS = { 1: 'الفصل الدراسي الأول', 2: 'الفصل الدراسي الثاني', 3: 'الفصل الدراسي الثالث' };

const lessonUrl = (id) => `/lesson.html?id=${encodeURIComponent(id)}`;
const presentUrl = (id) => `/present.html?id=${encodeURIComponent(id)}`;

// ---------- Index ----------

function stat(value, label) {
  return el('div', { class: 'stat' }, [el('strong', {}, String(value)), el('span', {}, label)]);
}

function lessonRow(lesson, j) {
  const status = lesson.status || 'ready';
  const pending = status === 'pending';
  return el('li', { class: `lesson-row${pending ? ' is-pending' : ''}` }, [
    el('span', { class: 'lesson-idx' }, String(j + 1)),
    pending
      ? el('span', { class: 'lesson-title' }, lesson.title)
      : el('a', { class: 'lesson-title', href: lessonUrl(lesson.id) }, lesson.title),
    statusChip(status),
    lesson.slides && !pending
      ? el('a', { class: 'btn btn-small btn-soft', href: presentUrl(lesson.id) }, 'العرض')
      : null,
  ]);
}

function unitCard(unit, i) {
  const number = unit.number || i + 1;
  return el('article', { class: 'unit' }, [
    el('div', { class: 'unit-head' }, [
      el('span', { class: 'unit-num' }, String(number).padStart(2, '0')),
      el('div', {}, [
        el('p', { class: 'unit-kicker' }, `الوحدة ${ORDINALS[number - 1] || number}`),
        el('h3', {}, unit.title),
      ]),
    ]),
    unit.lessons.length
      ? el('ol', { class: 'lesson-list' }, unit.lessons.map(lessonRow))
      : el('p', { class: 'empty' }, 'دروس هذه الوحدة قيد الإعداد.'),
  ]);
}

async function renderIndex() {
  const data = await getJson('/api/curriculum');
  const lessons = data.units.flatMap((u) => u.lessons);

  document.getElementById('year').textContent = [data.curriculum, data.year].filter(Boolean).join(' · ');
  document.getElementById('stats').replaceChildren(
    stat(data.units.length, 'وحدات'),
    stat(lessons.length, 'دروس'),
    stat(lessons.filter((l) => l.slides).length, 'عروض تقديمية'),
  );
  const hero = visual('hero');
  if (hero) document.getElementById('hero-visual').replaceChildren(hero);
  if (data.note) document.getElementById('curriculum-note').replaceChildren(el('p', { class: 'note' }, data.note));

  const terms = [...new Set(data.units.map((u) => u.term || 1))].sort();
  let current = Number(storage('ds-term'));
  if (!terms.includes(current)) current = terms[0];

  const tabs = el('div', { class: 'tabs', role: 'tablist', 'aria-label': 'الفصول الدراسية' });
  const panel = el('div', { class: 'unit-grid', role: 'tabpanel' });
  const draw = () => {
    tabs.replaceChildren(...terms.map((t) => el('button', {
      class: 'tab',
      type: 'button',
      role: 'tab',
      'aria-selected': String(t === current),
      onclick: () => { current = t; storage('ds-term', String(t)); draw(); },
    }, TERMS[t] || `الفصل ${t}`)));
    panel.replaceChildren(...data.units.filter((u) => (u.term || 1) === current).map(unitCard));
  };
  draw();
  document.getElementById('units').replaceChildren(tabs, panel);
}

// ---------- Lesson ----------

function renderBlock(block) {
  if (block.type === 'visual' || block.type === 'image') return figure(block);
  if (block.type === 'heading') return el('h3', {}, block.text);
  return el('p', {}, block.text);
}

function printWorksheet() {
  document.body.classList.add('print-worksheet');
  window.print();
}
window.addEventListener('afterprint', () => document.body.classList.remove('print-worksheet'));

function renderWorksheet(lesson) {
  const ws = lesson.worksheet;
  return el('div', { class: 'worksheet' }, [
    el('div', { class: 'ws-head' }, [
      el('span', {}, 'المهارات الرقمية · الصف السادس الابتدائي'),
      el('strong', {}, ws.title),
    ]),
    ws.name_line
      ? el('div', { class: 'ws-fields' }, ['الاسم', 'الفصل', 'التاريخ'].map((f) => el('span', {}, [`${f}:`, el('i')])))
      : null,
    el('ol', { class: 'tasks' }, ws.tasks.map((task) => el('li', {}, [
      el('p', {}, task),
      el('div', { class: 'answer-line' }),
      el('div', { class: 'answer-line' }),
    ]))),
  ]);
}

function renderQuestion(q, i, showAnswers) {
  const box = el('div', { class: 'question' }, [
    el('p', { class: 'q-text' }, [el('span', { class: 'q-num' }, String(i + 1)), q.q]),
  ]);

  if (q.type === 'mcq') {
    const feedback = el('p', { class: 'feedback', 'aria-live': 'polite' });
    const options = q.options.map((opt, k) => el('button', {
      class: `option${showAnswers && k === q.answer ? ' is-answer' : ''}`,
      type: 'button',
      onclick: (event) => {
        options.forEach((b) => b.classList.remove('is-correct', 'is-wrong'));
        const correct = k === q.answer;
        event.currentTarget.classList.add(correct ? 'is-correct' : 'is-wrong');
        feedback.textContent = correct ? 'إجابة صحيحة، أحسنت!' : 'ليست الإجابة الصحيحة، حاول مرة أخرى.';
        feedback.className = `feedback ${correct ? 'ok' : 'bad'}`;
      },
    }, opt));
    box.append(el('div', { class: 'options' }, options), feedback);
  } else {
    box.append(el('textarea', { rows: '3', 'aria-label': q.q, placeholder: 'اكتب إجابتك هنا...' }));
    if (showAnswers && q.answer) box.append(el('p', { class: 'teacher-answer' }, q.answer));
  }
  return box;
}

async function renderLesson() {
  const root = document.getElementById('lesson');
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    root.replaceChildren(el('p', { class: 'empty' }, 'لم يتم تحديد الدرس.'));
    return;
  }

  const lesson = await getJson(`/api/lessons/${encodeURIComponent(id)}`);
  document.title = `${lesson.title} · المهارات الرقمية`;

  const sections = [];
  const nav = [];
  const addSection = (key, title, body, action) => {
    nav.push([key, title]);
    sections.push(el('section', { class: 'section', id: key }, [
      el('header', { class: 'section-head' }, [
        el('span', { class: 'section-num' }, String(sections.length + 1)),
        el('h2', {}, title),
        action || null,
      ]),
      body,
    ]));
  };

  if (lesson.summary) {
    addSection('summary', 'ملخص الدرس', el('p', { class: 'summary-text' }, lesson.summary));
  }
  if (lesson.explanation && lesson.explanation.length) {
    addSection('explain', 'شرح الدرس', el('div', { class: 'prose' }, lesson.explanation.map(renderBlock)));
  }
  if (lesson.worksheet) {
    addSection('worksheet', 'ورقة العمل', renderWorksheet(lesson),
      el('button', { class: 'btn btn-small btn-soft no-print', type: 'button', onclick: printWorksheet }, 'طباعة'));
  }
  if (lesson.questions && lesson.questions.length) {
    const box = el('div', { class: 'questions' });
    const toggle = el('input', { type: 'checkbox', class: 'switch-input' });
    const draw = () => box.replaceChildren(...lesson.questions.map((q, i) => renderQuestion(q, i, toggle.checked)));
    toggle.addEventListener('change', draw);
    draw();
    addSection('questions', 'أسئلة الطلاب', box,
      el('label', { class: 'switch no-print' }, [toggle, el('span', { class: 'switch-track' }), 'إجابات المعلم']));
  }

  const slides = lesson.slides || [];
  const parts = [
    el('header', { class: 'lesson-hero' }, [
      el('p', { class: 'crumb' }, [el('a', { href: '/' }, 'الوحدات'), ' / ', lesson.unit]),
      el('h1', {}, lesson.title),
      el('div', { class: 'hero-actions' }, [
        slides.length
          ? el('a', { class: 'btn btn-primary', href: presentUrl(lesson.id) }, `ابدأ العرض التقديمي · ${slides.length} شريحة`)
          : null,
        lesson.worksheet
          ? el('button', { class: 'btn btn-ghost', type: 'button', onclick: printWorksheet }, 'طباعة ورقة العمل')
          : null,
        lesson.status ? statusChip(lesson.status) : null,
      ]),
    ]),
    lesson.note ? el('p', { class: 'note' }, lesson.note) : null,
    nav.length
      ? el('nav', { class: 'section-nav no-print', 'aria-label': 'أقسام الدرس' }, nav.map(([key, title]) => el('a', { href: `#${key}` }, title)))
      : null,
    ...sections,
    sections.length ? null : el('p', { class: 'empty' }, 'محتوى هذا الدرس قيد الإعداد.'),
  ];
  root.replaceChildren(...parts.filter(Boolean));
}

const page = document.getElementById('units') ? renderIndex : renderLesson;
page().catch((err) => {
  const target = document.getElementById('units') || document.getElementById('lesson');
  target.replaceChildren(el('p', { class: 'error' }, `تعذّر تحميل المحتوى: ${err.message}`));
});
