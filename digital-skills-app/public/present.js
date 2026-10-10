// Slide presenter for a lesson's "slides" array. Keys: ←/Space/PageDown next,
// →/PageUp previous, N teacher notes, F fullscreen. On activity slides, "next"
// reveals the hidden answers one by one before moving on.
(function () {
  const id = new URLSearchParams(window.location.search).get('id');
  const stage = document.getElementById('stage');
  const notesBox = document.getElementById('notes');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const notesBtn = document.getElementById('toggle-notes');
  const countBox = document.getElementById('count');
  const bar = document.getElementById('bar');

  let slides = [];
  let index = 0;

  const slideVisual = (s) => {
    let art = null;
    if (s.visual) art = visual(s.visual);
    // Screenshots from the applications sit in a window frame.
    else if (s.image) {
      art = el('div', { class: 'shot' }, [
        el('div', { class: 'shot-bar', 'aria-hidden': 'true' }, [el('i'), el('i'), el('i')]),
        el('img', { src: s.image, alt: s.alt || s.title || '' }),
      ]);
    }
    return art ? el('div', { class: 'slide-visual' }, [art]) : null;
  };

  const head = (s) => el('header', { class: 'slide-head' }, [
    s.kicker ? el('span', { class: 'slide-kicker' }, s.kicker) : null,
    el('h2', { class: 'slide-title' }, s.title),
  ]);

  const bullets = (items, cls = 'bullets') => el('ul', { class: cls }, (items || []).map((b) => el('li', {}, b)));

  const body = (children) => {
    const parts = children.filter(Boolean);
    return el('div', { class: `slide-body${parts.length < 2 ? ' single' : ''}` }, parts);
  };

  function card(item) {
    const node = el('button', { class: 'card', type: 'button' }, [
      el('span', { class: 'card-q' }, item.q),
      el('span', { class: 'card-a' }, item.a),
      el('span', { class: 'card-hint' }, 'اضغط لإظهار الإجابة'),
    ]);
    node.addEventListener('click', () => node.classList.toggle('revealed'));
    return node;
  }

  const LAYOUTS = {
    title: (s) => [
      el('div', { class: 'title-text' }, [
        s.kicker ? el('span', { class: 'slide-kicker' }, s.kicker) : null,
        el('h1', {}, s.title),
        s.subtitle ? el('p', {}, s.subtitle) : null,
      ]),
      slideVisual(s),
    ],
    content: (s) => [head(s), body([
      el('div', { class: 'slide-text' }, [
        s.lead ? el('p', { class: 'slide-lead' }, s.lead) : null,
        bullets(s.bullets),
        s.aside ? el('p', { class: 'slide-aside' }, s.aside) : null,
      ]),
      slideVisual(s),
    ])],
    visual: (s) => (s.youtube
      ? [head(s), body([el('div', { class: 'slide-video' }, [el('iframe', {
        src: `https://www.youtube-nocookie.com/embed/${s.youtube}?rel=0`, title: s.title,
        allow: 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen', allowfullscreen: true,
      })])])]
      : [head(s), body([slideVisual(s), s.caption ? el('p', { class: 'slide-caption' }, s.caption) : null])]),
    question: (s) => LAYOUTS.visual(s),
    definition: (s) => [head(s), body([el('p', { class: 'definition' }, s.definition), slideVisual(s)])],
    activity: (s) => [head(s), body([
      el('div', { class: `cards${(s.items || []).length <= 3 ? ' few' : ''}` }, (s.items || []).map(card)),
      s.hint ? el('p', { class: 'slide-hint' }, s.hint) : null,
    ])],
    summary: (s) => [head(s), body([
      bullets(s.bullets, 'bullets checks'),
      s.closing ? el('p', { class: 'closing' }, s.closing) : null,
    ])],
  };

  function renderNotes() {
    const s = slides[index];
    const upcoming = slides[index + 1];
    notesBox.replaceChildren(
      el('h3', {}, `ملاحظات المعلم · الشريحة ${index + 1}`),
      el('p', {}, s.notes || 'لا توجد ملاحظات لهذه الشريحة.'),
      el('p', { class: 'next' }, upcoming ? `التالي: ${upcoming.title}` : 'نهاية العرض'),
    );
  }

  function render(direction = 1) {
    const s = slides[index];
    const layout = LAYOUTS[s.layout] ? s.layout : 'content';
    const node = el('section', {
      class: `slide layout-${layout}${direction < 0 ? ' back' : ''}`,
      'aria-label': `الشريحة ${index + 1} من ${slides.length}`,
    }, LAYOUTS[layout](s).filter(Boolean));
    if (layout !== 'title') {
      node.append(el('div', { class: 'slide-foot' }, [
        el('span', {}, `المهارات الرقمية · الصف ${GRADE_NAMES[gradeOf(id)]}`),
        el('span', {}, `${index + 1} / ${slides.length}`),
      ]));
    }
    stage.replaceChildren(node);
    countBox.textContent = `${index + 1} / ${slides.length}`;
    bar.style.width = `${((index + 1) / slides.length) * 100}%`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1 && !stage.querySelector('.card:not(.revealed)');
    renderNotes();
    history.replaceState(null, '', `#${index + 1}`);
  }

  function next() {
    const hidden = stage.querySelector('.card:not(.revealed)');
    if (hidden) {
      hidden.classList.add('revealed');
      nextBtn.disabled = index === slides.length - 1 && !stage.querySelector('.card:not(.revealed)');
      return;
    }
    if (index < slides.length - 1) { index += 1; render(1); }
  }

  function prev() {
    if (index > 0) { index -= 1; render(-1); }
  }

  function go(i) {
    const target = Math.max(0, Math.min(slides.length - 1, i));
    if (target !== index) { const dir = target > index ? 1 : -1; index = target; render(dir); }
  }

  function setNotes(show) {
    notesBox.hidden = !show;
    notesBtn.setAttribute('aria-pressed', String(show));
    storage('ds-notes', show ? '1' : '0');
  }

  // Embedded in the lesson page: no exit/notes, and "full screen" opens the full presenter.
  const embedded = new URLSearchParams(window.location.search).get('embed') === '1';
  if (embedded) document.body.classList.add('embed');

  function toggleFullscreen() {
    if (embedded) {
      window.open(`/present.html?id=${encodeURIComponent(id)}#${index + 1}`, '_blank', 'noopener');
      return;
    }
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  notesBtn.addEventListener('click', () => setNotes(notesBox.hidden));
  document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', (e) => {
    if (!slides.length || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest('input, textarea')) return;
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('button, a')) return;
    switch (e.key) {
      case 'ArrowLeft': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter':
        e.preventDefault(); next(); return;
      case 'ArrowRight': case 'ArrowUp': case 'PageUp': case 'Backspace':
        e.preventDefault(); prev(); return;
      case 'Home': e.preventDefault(); go(0); return;
      case 'End': e.preventDefault(); go(slides.length - 1); return;
      default:
    }
    // Physical keys, so they also work with an Arabic keyboard layout.
    if (e.code === 'KeyN') setNotes(notesBox.hidden);
    if (e.code === 'KeyF') toggleFullscreen();
  });

  // Swipe on touch screens: dragging toward the right moves forward (RTL).
  let touchX = null;
  const wrap = document.getElementById('stage-wrap');
  wrap.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') touchX = e.clientX; });
  wrap.addEventListener('pointerup', (e) => {
    if (touchX == null) return;
    const dx = e.clientX - touchX;
    touchX = null;
    if (dx > 60) next();
    else if (dx < -60) prev();
  });

  function message(text) {
    stage.replaceChildren(el('section', { class: 'slide message' }, [el('h2', { class: 'slide-title' }, text)]));
  }

  if (!id) {
    message('لم يتم تحديد الدرس.');
    return;
  }

  getJson(`/api/lessons/${encodeURIComponent(id)}`).then((lesson) => {
    document.title = `عرض: ${lesson.title}`;
    document.getElementById('exit').href = `/lesson.html?id=${encodeURIComponent(lesson.id)}`;
    slides = lesson.slides || [];
    const vid = (String(lesson.video || '').match(/(?:v=|youtu\.be\/|embed\/|shorts\/|^)([\w-]{11})(?:[?&#/]|$)/) || [])[1];
    if (vid) {
      slides = slides.map((s) => (s.kicker === 'الدرس الرقمي'
        ? { ...s, title: 'فيديو شرح الدرس', youtube: vid, notes: 'شغّل الفيديو مع الطلاب، وأوقفه عند كل خطوة لتطبيقها. (اختياري)' }
        : s));
    }
    if (!slides.length) {
      message('لا توجد شرائح لهذا الدرس بعد.');
      return;
    }
    const fromHash = parseInt(window.location.hash.slice(1), 10);
    index = fromHash >= 1 && fromHash <= slides.length ? fromHash - 1 : 0;
    setNotes(storage('ds-notes') === '1');
    render(1);
  }).catch((err) => message(`تعذّر تحميل العرض: ${err.message}`));
})();
