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
    lesson.pages ? el('span', { class: 'lesson-pages', title: 'صفحات كتاب الطالب' }, ['ص ', el('bdi', { dir: 'ltr' }, lesson.pages)]) : null,
    status === 'ready' ? null : statusChip(status),
    lesson.unconfirmed ? el('span', { class: 'chip chip-pending', title: 'العنوان غير مؤكد في المصادر المتاحة' }, 'عنوان غير مؤكد') : null,
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
  const grades = await getJson('/api/grades').catch(() => []);
  const fallback = (grades.find((g) => g.default) || grades[0] || {}).id;
  const wanted = new URLSearchParams(window.location.search).get('grade') || storage('ds-grade') || fallback;
  const grade = grades.find((g) => g.id === wanted) || grades.find((g) => g.id === fallback);
  if (grades.length > 1) {
    document.getElementById('grade-tabs').replaceChildren(el('div', { class: 'grade-tabs', role: 'tablist', 'aria-label': 'الصفوف' },
      grades.map((g) => el('button', {
        class: 'grade-tab', type: 'button', role: 'tab', 'aria-selected': String(g === grade),
        onclick: () => { storage('ds-grade', g.id); window.location.search = `grade=${g.id}`; },
      }, [el('small', {}, 'الصف'), g.short || g.title]))));
  }
  if (grade) {
    document.getElementById('grade-title').textContent = grade.title.replace(/^ال/, 'لل');
    document.getElementById('topbar-grade').textContent = grade.title;
  }
  const data = await getJson(`/api/curriculum${grade ? `?grade=${grade.id}` : ''}`);
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

  if (!data.units.length) {
    document.getElementById('units').replaceChildren(el('p', { class: 'empty' }, 'دروس هذا الصف قيد الإعداد.'));
    return;
  }
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

const LETTERS = ['أ', 'ب', 'ج', 'د'];

// Official-style worksheet: ministry header, student fields, multiple choice, written tasks.
function renderWorksheet(lesson, school) {
  const ws = lesson.worksheet;
  const term = (lesson.unit || '').split(' · ')[0];
  const unit = (lesson.unit || '').split(' · ')[1] || '';
  const mcqs = (lesson.questions || []).filter((q) => q.type === 'mcq');
  const total = mcqs.length + ws.tasks.length;

  const emblem = el('div', { class: 'ws-emblem' });
  const fallback = () => emblem.replaceChildren(el('div', { class: 'ws-mark' }, [
    el('span', { class: 'ws-mark-icon', 'aria-hidden': 'true' }),
    el('strong', {}, school.subject || 'المهارات الرقمية'),
  ]));
  if (school.logo) {
    const img = el('img', { src: school.logo, alt: school.ministry || 'وزارة التعليم' });
    img.addEventListener('error', fallback);
    emblem.append(img);
  } else {
    fallback();
  }

  const field = (label, cls = '') => el('div', { class: `ws-field ${cls}` }, [el('span', {}, `${label}:`), el('i')]);
  const section = (n, title, body) => el('section', { class: 'ws-section' }, [
    el('h3', { class: 'ws-q' }, [el('span', { class: 'ws-q-num' }, n), title]),
    body,
  ]);

  return el('div', { class: 'worksheet' }, [
    el('header', { class: 'ws-header' }, [
      el('div', { class: 'ws-id' }, [school.country, school.ministry, school.region, school.school].filter(Boolean).map((t) => el('p', {}, t))),
      emblem,
      el('div', { class: 'ws-meta' }, [
        el('p', {}, [el('b', {}, 'المادة: '), school.subject || 'المهارات الرقمية']),
        el('p', {}, [el('b', {}, 'الصف: '), school.grade || 'السادس الابتدائي']),
        term ? el('p', {}, term) : null,
        el('p', {}, [el('b', {}, 'العام الدراسي: '), school.year || '1448هـ']),
      ]),
    ]),
    el('div', { class: 'ws-title' }, [
      el('span', {}, 'ورقة عمل'),
      el('strong', {}, lesson.title),
      unit ? el('small', {}, unit) : null,
    ]),
    el('div', { class: 'ws-student' }, [
      field('اسم الطالب', 'wide'),
      field('الفصل'),
      field('التاريخ'),
      el('div', { class: 'ws-score' }, [el('span', {}, 'الدرجة'), el('i'), el('small', {}, `من ${total}`)]),
    ]),
    mcqs.length ? section('السؤال الأول', 'اختر الإجابة الصحيحة بوضع دائرة حول الحرف:', el('ol', { class: 'ws-mcq' }, mcqs.map((q) => el('li', {}, [
      el('p', {}, q.q),
      el('div', { class: 'ws-options' }, q.options.map((o, k) => el('span', {}, [el('b', {}, LETTERS[k]), o]))),
    ])))) : null,
    section(mcqs.length ? 'السؤال الثاني' : 'السؤال الأول', 'أجب عن الأسئلة الآتية:', el('ol', { class: 'ws-tasks' }, ws.tasks.map((task) => el('li', {}, [
      el('p', {}, task),
      el('div', { class: 'answer-line' }),
      el('div', { class: 'answer-line' }),
    ])))),
    el('footer', { class: 'ws-footer' }, [
      el('span', {}, 'مع تمنياتي لكم بالتوفيق'),
      el('span', { class: 'ws-teacher' }, ['معلم المادة: ', school.teacher ? el('b', {}, school.teacher) : el('i')]),
    ]),
  ]);
}

// YouTube id from a full link (watch, youtu.be, embed, shorts) or a bare 11-character id.
function youtubeId(value) {
  const m = String(value || '').match(/(?:v=|youtu\.be\/|embed\/|shorts\/|^)([\w-]{11})(?:[?&#/]|$)/);
  return m ? m[1] : null;
}

function renderVideo(lesson) {
  const vid = youtubeId(lesson.video);
  const search = `https://www.youtube.com/results?search_query=${encodeURIComponent(`عين المهارات الرقمية سادس ابتدائي ${lesson.title}`)}`;
  return el('div', { class: 'video-box' }, [
    vid ? null : el('p', { class: 'video-empty' }, 'لم يُحدَّد فيديو يوتيوب لهذا الدرس بعد. استخدم رمز الدرس الرقمي أو البحث في يوتيوب.'),
    vid
      ? el('div', { class: 'video-frame' }, [el('iframe', {
        src: `https://www.youtube-nocookie.com/embed/${vid}?rel=0`,
        title: `فيديو شرح ${lesson.title}`,
        allow: 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen',
        allowfullscreen: true,
        loading: 'lazy',
      })])
      : null,
    lesson.digital
      ? el('div', { class: 'digital-card' }, [
        el('img', { class: 'digital-qr', src: lesson.digital.qr, alt: 'رمز الدرس الرقمي' }),
        el('div', {}, [
          el('h3', {}, 'الدرس الرقمي في كتاب الطالب'),
          el('p', {}, 'هذا هو الرمز المطبوع في كتاب الطالب لهذا الدرس. امسحه بالجوال أو افتح الرابط لمشاهدة الشرح.'),
          el('div', { class: 'digital-actions' }, [
            el('a', { class: 'btn btn-primary', href: lesson.digital.url, target: '_blank', rel: 'noopener' }, 'فتح الدرس الرقمي'),
            vid
              ? el('a', { class: 'btn btn-ghost', href: `https://www.youtube.com/watch?v=${vid}`, target: '_blank', rel: 'noopener' }, 'فتح في يوتيوب')
              : el('a', { class: 'btn btn-ghost', href: search, target: '_blank', rel: 'noopener' }, 'بحث في يوتيوب'),
          ]),
          vid ? null : el('p', { class: 'muted small' }, 'لعرض فيديو يوتيوب هنا مباشرة، أضف رابطه في الملف content/videos.json.'),
        ]),
      ])
      : null,
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

  const [lesson, school] = await Promise.all([
    getJson(`/api/lessons/${encodeURIComponent(id)}`),
    getJson('/api/school').catch(() => ({})),
  ]);
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

  if (lesson.slides && lesson.slides.length) {
    addSection('slides', 'الشرائح', el('div', { class: 'deck-embed' }, [
      el('iframe', { src: `${presentUrl(lesson.id)}&embed=1`, title: `شرائح درس ${lesson.title}`, allow: 'fullscreen', loading: 'lazy' }),
    ]), el('a', { class: 'btn btn-small btn-soft no-print', href: presentUrl(lesson.id) }, 'ملء الشاشة'));
  }
  addSection('video', 'فيديو الشرح', renderVideo(lesson));
  if (lesson.summary) {
    addSection('summary', 'الملخص', el('p', { class: 'summary-text' }, lesson.summary));
  }
  if (lesson.explanation && lesson.explanation.length) {
    addSection('explain', 'الشرح', el('div', { class: 'prose' }, lesson.explanation.map(renderBlock)));
  }
  if (lesson.worksheet) {
    addSection('worksheet', 'ورقة العمل', renderWorksheet(lesson, school),
      el('button', { class: 'btn btn-small btn-soft no-print', type: 'button', onclick: printWorksheet }, 'طباعة'));
  }
  if (lesson.questions && lesson.questions.length) {
    const box = el('div', { class: 'questions' });
    const toggle = el('input', { type: 'checkbox', class: 'switch-input' });
    const draw = () => box.replaceChildren(...lesson.questions.map((q, i) => renderQuestion(q, i, toggle.checked)));
    toggle.addEventListener('change', draw);
    draw();
    addSection('questions', 'الأسئلة', box,
      el('label', { class: 'switch no-print' }, [toggle, el('span', { class: 'switch-track' }), 'إجابات المعلم']));
  }

  // One section at a time, chosen from the tab bar (and kept in the URL hash).
  const tabs = nav.length ? el('nav', { class: 'lesson-tabs no-print', role: 'tablist', 'aria-label': 'أقسام الدرس' }) : null;
  const show = (key) => {
    if (!nav.some(([k]) => k === key)) key = nav[0][0];
    sections.forEach((sec) => sec.classList.toggle('is-hidden', sec.id !== key));
    tabs.replaceChildren(...nav.map(([k, title]) => el('button', {
      class: 'lesson-tab', type: 'button', role: 'tab', 'aria-selected': String(k === key),
      onclick: () => { history.replaceState(null, '', `#${k}`); show(k); },
    }, title)));
  };
  if (tabs) show(window.location.hash.slice(1));

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
    tabs,
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
