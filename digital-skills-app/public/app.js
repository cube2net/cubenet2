// Renders the unit index (index.html) and a single lesson (lesson.html).
// All text from the content files is inserted with textContent, never innerHTML.

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function renderIndex() {
  const container = document.getElementById('units');
  const data = await getJson('/api/curriculum');
  document.getElementById('subtitle').textContent = `${data.grade} - ${data.year}`;

  const nodes = data.units.map((unit) =>
    el('section', { class: 'card unit' }, [
      el('h2', {}, unit.title),
      el('ul', { class: 'lesson-list' }, unit.lessons.map((lesson) =>
        el('li', {}, [el('a', { href: `/lesson.html?id=${encodeURIComponent(lesson.id)}` }, lesson.title)])
      )),
    ])
  );
  container.replaceChildren(...nodes);
  if (data.note) container.prepend(el('p', { class: 'note' }, data.note));
}

function renderBlock(block) {
  if (block.type === 'image') {
    return el('figure', { class: 'figure' }, [
      el('img', { src: block.src, alt: block.alt || '', loading: 'lazy' }),
      block.caption ? el('figcaption', {}, block.caption) : null,
    ]);
  }
  return el('p', {}, block.text);
}

function renderWorksheet(ws) {
  const items = ws.tasks.map((task) =>
    el('li', { class: 'task' }, [
      el('span', {}, task),
      el('div', { class: 'answer-line' }),
      el('div', { class: 'answer-line' }),
    ])
  );
  return el('section', { class: 'card worksheet' }, [
    el('div', { class: 'worksheet-head' }, [
      el('h2', {}, ws.title),
      el('button', { class: 'btn no-print', type: 'button', onclick: () => window.print() }, 'طباعة ورقة العمل'),
    ]),
    ws.name_line ? el('p', { class: 'name-line' }, 'الاسم: ____________________   التاريخ: ____________') : null,
    el('ol', { class: 'tasks' }, items),
  ]);
}

function renderQuestion(q, index, showAnswers) {
  const wrapper = el('div', { class: 'question' }, [el('p', { class: 'q-text' }, `${index + 1}. ${q.q}`)]);

  if (q.type === 'mcq') {
    const feedback = el('p', { class: 'feedback', 'aria-live': 'polite' });
    const buttons = q.options.map((opt, i) =>
      el('button', {
        class: 'option',
        type: 'button',
        onclick: () => {
          const correct = i === q.answer;
          feedback.textContent = correct ? 'إجابة صحيحة' : 'إجابة غير صحيحة، حاول مرة أخرى';
          feedback.className = `feedback ${correct ? 'ok' : 'bad'}`;
        },
      }, opt)
    );
    wrapper.append(el('div', { class: 'options' }, buttons), feedback);
    if (showAnswers) {
      wrapper.append(el('p', { class: 'teacher-answer' }, `إجابة المعلم: ${q.options[q.answer]}`));
    }
  } else {
    wrapper.append(el('textarea', { rows: '3', 'aria-label': q.q }));
    if (showAnswers) {
      wrapper.append(el('p', { class: 'teacher-answer' }, `إجابة المعلم: ${q.answer}`));
    }
  }
  return wrapper;
}

async function renderLesson() {
  const container = document.getElementById('lesson');
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    container.replaceChildren(el('p', {}, 'لم يتم تحديد الدرس.'));
    return;
  }

  const lesson = await getJson(`/api/lessons/${encodeURIComponent(id)}`);
  document.title = `${lesson.title} - المهارات الرقمية`;

  const toggle = el('input', { type: 'checkbox', id: 'show-answers' });
  const questionsBox = el('div', { class: 'questions' });
  const drawQuestions = () => {
    questionsBox.replaceChildren(
      ...lesson.questions.map((q, i) => renderQuestion(q, i, toggle.checked))
    );
  };
  toggle.addEventListener('change', drawQuestions);
  drawQuestions();

  container.replaceChildren(
    lesson.note ? el('p', { class: 'note' }, lesson.note) : null,
    el('header', { class: 'lesson-head' }, [
      el('p', { class: 'muted' }, lesson.unit),
      el('h1', {}, lesson.title),
    ]),
    el('section', { class: 'card summary' }, [el('h2', {}, 'ملخص الدرس'), el('p', {}, lesson.summary)]),
    el('section', { class: 'card explanation' }, [
      el('h2', {}, 'شرح الدرس'),
      ...lesson.explanation.map(renderBlock),
    ]),
    lesson.worksheet ? renderWorksheet(lesson.worksheet) : null,
    el('section', { class: 'card questions-card' }, [
      el('div', { class: 'worksheet-head' }, [
        el('h2', {}, 'أسئلة الطلاب'),
        el('label', { class: 'no-print teacher-toggle' }, [toggle, ' إظهار إجابات المعلم']),
      ]),
      questionsBox,
    ]),
  );
}

const page = document.body.querySelector('#units') ? renderIndex : renderLesson;
page().catch((err) => {
  const target = document.getElementById('units') || document.getElementById('lesson');
  target.replaceChildren(el('p', { class: 'error' }, `تعذّر تحميل المحتوى: ${err.message}`));
});
