// Grade 4 · Term 2 · Units 3–4: multimedia (sound, photos, effects) and introduction to robotics.
(function () {
  const { C, svg, text, poly, line, arrow, head, badge, steps, shadow } = window.VisualKit;

  // ---------- small icons ----------
  const mic = (cx, cy, k = 1) => `<g transform="translate(${cx} ${cy}) scale(${k})">`
    + `<rect x="-11" y="-30" width="22" height="36" rx="11" fill="${C.ink}"/>`
    + `<path d="M-19 -6 Q-19 16 0 16 Q19 16 19 -6" fill="none" stroke="${C.ink}" stroke-width="4"/>`
    + line(0, 16, 0, 28, C.ink, 4) + line(-12, 28, 12, 28, C.ink, 4) + '</g>';
  const recBtn = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="30" fill="${C.blue}"/>` + mic(cx, cy + 2, 0.6).replace(new RegExp(C.ink, 'g'), '#fff');
  const stopBtn = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="30" fill="${C.blue}"/><circle cx="${cx}" cy="${cy}" r="36" fill="none" stroke="${C.blue}" stroke-width="2" opacity="0.5"/>`
    + `<rect x="${cx - 10}" y="${cy - 10}" width="20" height="20" rx="3" fill="#fff"/>`;
  const speaker = (cx, cy) => poly([[cx - 26, cy - 9], [cx - 14, cy - 9], [cx, cy - 22], [cx, cy + 22], [cx - 14, cy + 9], [cx - 26, cy + 9]], C.ink)
    + `<path d="M${cx + 8} ${cy - 10} Q${cx + 16} ${cy} ${cx + 8} ${cy + 10}" fill="none" stroke="${C.amber}" stroke-width="4" stroke-linecap="round"/>`
    + `<path d="M${cx + 16} ${cy - 19} Q${cx + 30} ${cy} ${cx + 16} ${cy + 19}" fill="none" stroke="${C.amber}" stroke-width="4" stroke-linecap="round"/>`;

  // A tiny landscape picture used by the photo visuals. p = palette.
  const NORMAL = { sky: '#bfe3f7', sun: '#ffd36b', far: '#7cc38c', near: '#3f9d5a', house: '#e86a4f', roof: '#9b3b2c' };
  const scene = (x, y, w, h, p = NORMAL, extra = '') => {
    const id = `g4clip-${x}-${y}-${w}`;
    return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/></clipPath></defs>`
      + `<g clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.sky}"/>`
      + `<circle cx="${x + w * 0.78}" cy="${y + h * 0.28}" r="${h * 0.13}" fill="${p.sun}"/>`
      + `<path d="M${x} ${y + h * 0.72} Q${x + w * 0.3} ${y + h * 0.36} ${x + w * 0.62} ${y + h * 0.66} T${x + w} ${y + h * 0.6} V${y + h} H${x} Z" fill="${p.far}"/>`
      + `<path d="M${x} ${y + h * 0.86} Q${x + w * 0.5} ${y + h * 0.7} ${x + w} ${y + h * 0.84} V${y + h} H${x} Z" fill="${p.near}"/>`
      + `<rect x="${x + w * 0.2}" y="${y + h * 0.56}" width="${w * 0.16}" height="${h * 0.2}" fill="${p.house}"/>`
      + poly([[x + w * 0.18, y + h * 0.57], [x + w * 0.28, y + h * 0.44], [x + w * 0.38, y + h * 0.57]], p.roof)
      + extra + '</g>';
  };

  // Top-down EV3-style robot heading up; speeds drawn next to each wheel.
  const botTop = (cx, cy, left, right) => `<rect x="${cx - 26}" y="${cy - 30}" width="52" height="60" rx="10" fill="#f2c94c" stroke="${C.ink}" stroke-width="2"/>`
    + `<rect x="${cx - 14}" y="${cy - 20}" width="28" height="18" rx="3" fill="${C.ink}"/>`
    + `<rect x="${cx - 38}" y="${cy - 18}" width="12" height="36" rx="4" fill="${C.ink}"/>`
    + `<rect x="${cx + 26}" y="${cy - 18}" width="12" height="36" rx="4" fill="${C.ink}"/>`
    + (left !== undefined ? `<rect x="${cx - 92}" y="${cy - 14}" width="48" height="28" rx="8" fill="${C.blue}"/>` + text(cx - 68, cy + 6, String(left), { size: 16, weight: 700, fill: '#fff', ltr: true }) : '')
    + (right !== undefined ? `<rect x="${cx + 44}" y="${cy - 14}" width="48" height="28" rx="8" fill="${C.blue}"/>` + text(cx + 68, cy + 6, String(right), { size: 16, weight: 700, fill: '#fff', ltr: true }) : '');

  Object.assign(window.Visuals, {

    // ---------- Unit 3 · Lesson 1 · Recording sound ----------
    'g4-sound-steps'() {
      return steps('خطوات تسجيل مقطع صوتي', [
        ['وصّل الميكروفون', 'بمنفذه في الحاسب'],
        ['ابدأ التسجيل', 'من مسجل الصوت'],
        ['أوقف التسجيل', 'يُحفظ الملف تلقائيًا'],
        ['استمع وشارك', 'بمشغل الوسائط'],
      ], [(x, y) => mic(x, y + 4), recBtn, stopBtn, (x, y) => speaker(x - 2, y)]);
    },

    'g4-player-controls'() {
      const bar = 150, xs = [540, 440, 340, 240, 120];
      const icons = [
        (x) => poly([[x + 10, bar - 12], [x + 10, bar + 12], [x - 4, bar]], '#fff') + `<rect x="${x - 10}" y="${bar - 12}" width="5" height="24" fill="#fff"/>`,
        (x) => poly([[x - 9, bar - 14], [x - 9, bar + 14], [x + 14, bar]], '#fff'),
        (x) => poly([[x - 10, bar - 12], [x - 10, bar + 12], [x + 4, bar]], '#fff') + `<rect x="${x + 5}" y="${bar - 12}" width="5" height="24" fill="#fff"/>`,
        (x) => `<path d="M${x - 14} ${bar + 4} V${bar - 8} H${x + 10}" fill="none" stroke="#fff" stroke-width="3"/>` + head(x, bar - 8, x + 14, bar - 8, '#fff')
          + `<path d="M${x + 14} ${bar - 4} V${bar + 8} H${x - 10}" fill="none" stroke="#fff" stroke-width="3"/>` + head(x, bar + 8, x - 14, bar + 8, '#fff'),
        (x) => poly([[x - 16, bar - 6], [x - 8, bar - 6], [x + 2, bar - 15], [x + 2, bar + 15], [x - 8, bar + 6], [x - 16, bar + 6]], '#fff')
          + `<path d="M${x + 9} ${bar - 8} Q${x + 15} ${bar} ${x + 9} ${bar + 8}" fill="none" stroke="#fff" stroke-width="3"/>`,
      ];
      const labels = [['السابق', 'Previous'], ['تشغيل/إيقاف مؤقت', 'Play / Pause'], ['التالي', 'Next'], ['تكرار', 'Repeat'], ['مستوى الصوت', 'Volume']];
      return svg(640, 290, 'أزرار تشغيل مقطع صوتي',
        `<rect x="20" y="20" width="600" height="170" rx="18" fill="${C.ink}"/>`
        + text(596, 58, 'التسجيل', { size: 20, weight: 700, fill: '#fff', anchor: 'start' })
        + text(596, 82, 'مسجل الصوت', { size: 14, weight: 500, fill: '#b9c4c9', anchor: 'start' })
        + line(60, 108, 580, 108, '#5d6d76', 4) + line(60, 108, 380, 108, C.blue, 4) + `<circle cx="380" cy="108" r="9" fill="#fff"/>`
        + text(50, 113, '0:18', { size: 13, weight: 600, fill: '#b9c4c9', ltr: true, anchor: 'end' })
        + xs.map((x, i) => `<circle cx="${x}" cy="${bar}" r="${i === 1 ? 26 : 22}" fill="${i === 1 ? C.blue : '#2c3e48'}"/>` + icons[i](x)
          + line(x, bar + 30, x, 214, C.line, 2)
          + text(x, 238, labels[i][0], { size: 15, weight: 700 })
          + text(x, 262, labels[i][1], { size: 12, weight: 600, fill: C.muted, ltr: true })).join(''));
    },

    // ---------- Unit 3 · Lesson 2 · Viewing photos and videos ----------
    'g4-photo-viewer'() {
      const legend = [['1', 'التنقل'], ['2', 'التكبير'], ['3', 'حذف'], ['4', 'مشاركة'], ['5', 'عرض الشرائح']];
      return svg(640, 360, 'أدوات برنامج صور مايكروسوفت',
        `<rect x="40" y="14" width="560" height="270" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<path d="M40 56 V28 Q40 14 54 14 H586 Q600 14 600 28 V56 Z" fill="${C.soft}"/>`
        // toolbar (left-to-right like the app)
        + `<circle cx="250" cy="35" r="11" fill="none" stroke="${C.ink}" stroke-width="2.5"/>` + line(258, 43, 264, 49, C.ink, 2.5) + line(245, 35, 255, 35, C.ink, 2) + line(250, 30, 250, 40, C.ink, 2)
        + `<rect x="342" y="26" width="16" height="20" rx="2" fill="none" stroke="${C.ink}" stroke-width="2.5"/>` + line(338, 26, 362, 26, C.ink, 2.5)
        + `<circle cx="432" cy="35" r="4" fill="${C.ink}"/><circle cx="448" cy="27" r="4" fill="${C.ink}"/><circle cx="448" cy="43" r="4" fill="${C.ink}"/>` + line(432, 35, 448, 27, C.ink, 2) + line(432, 35, 448, 43, C.ink, 2)
        + `<rect x="517" y="25" width="26" height="20" rx="3" fill="none" stroke="${C.ink}" stroke-width="2.5"/>` + poly([[526, 30], [526, 40], [535, 35]], C.ink)
        + badge(216, 36, '2') + badge(310, 36, '3') + badge(406, 36, '4') + badge(490, 36, '5')
        + scene(120, 70, 400, 200)
        + `<circle cx="80" cy="170" r="22" fill="${C.soft}"/>` + head(92, 170, 70, 170, C.ink)
        + `<circle cx="560" cy="170" r="22" fill="${C.soft}"/>` + head(548, 170, 570, 170, C.ink)
        + badge(80, 128, '1') + badge(560, 128, '1')
        + legend.map(([n, label], i) => {
          const x = 560 - i * 118;
          return badge(x + 40, 322, n) + text(x + 20, 328, label, { size: 14, weight: 700, anchor: 'start' });
        }).join(''));
    },

    // ---------- Unit 3 · Lesson 3 · Photo improvements ----------
    'g4-photo-fixes'() {
      const eyeDraw = (cx, cy, pupil) => `<ellipse cx="${cx}" cy="${cy}" rx="34" ry="20" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`
        + `<circle cx="${cx}" cy="${cy}" r="14" fill="#6aa0c8"/><circle cx="${cx}" cy="${cy}" r="7" fill="${pupil}"/><circle cx="${cx + 4}" cy="${cy - 4}" r="2.5" fill="#fff"/>`;
      const sky = (cx, cy, spots) => `<rect x="${cx - 44}" y="${cy - 30}" width="88" height="60" rx="8" fill="#9fd0f0"/>`
        + `<path d="M${cx - 44} ${cy + 14} Q${cx} ${cy - 6} ${cx + 44} ${cy + 14} V${cy + 22} Q${cx + 44} ${cy + 30} ${cx + 36} ${cy + 30} H${cx - 36} Q${cx - 44} ${cy + 30} ${cx - 44} ${cy + 22} Z" fill="#d9a35b"/>`
        + (spots ? `<circle cx="${cx - 20}" cy="${cy - 14}" r="4" fill="#3d4f59"/><circle cx="${cx + 18}" cy="${cy - 8}" r="3" fill="#3d4f59"/><circle cx="${cx + 4}" cy="${cy - 20}" r="2.5" fill="#3d4f59"/>` : '');
      const crop = (cx, cy, cut) => (cut
        ? `<rect x="${cx - 26}" y="${cy - 26}" width="52" height="52" rx="6" fill="#ffd36b"/><circle cx="${cx}" cy="${cy}" r="14" fill="#e8912d"/>`
        : `<rect x="${cx - 44}" y="${cy - 30}" width="88" height="60" rx="8" fill="#ffe9b0"/><circle cx="${cx}" cy="${cy}" r="14" fill="#e8912d"/>`
          + `<rect x="${cx - 26}" y="${cy - 26}" width="52" height="52" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="5 4"/>`
          + [[-26, -26], [26, -26], [-26, 26], [26, 26]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`).join(''));
      const fish = (cx, cy, rot) => `<g transform="rotate(${rot} ${cx} ${cy})"><rect x="${cx - 32}" y="${cy - 24}" width="64" height="48" rx="8" fill="#1f4f8a"/>`
        + `<ellipse cx="${cx}" cy="${cy - 8}" rx="14" ry="10" fill="#f2a64a"/>` + [-7, 0, 7].map((d) => line(cx + d, cy, cx + d * 1.4, cy + 17, '#f2a64a', 2.5)).join('') + '</g>';
      const cards = [
        ['العين الحمراء', 'Red eye', (x, y) => eyeDraw(x, y, '#d93b3b'), (x, y) => eyeDraw(x, y, C.ink)],
        ['إصلاح الأخطاء', 'Spot fix', (x, y) => sky(x, y, true), (x, y) => sky(x, y, false)],
        ['القصّ', 'Crop', (x, y) => crop(x, y, false), (x, y) => crop(x, y, true)],
        ['التدوير', 'Rotate', (x, y) => fish(x, y, 90), (x, y) => fish(x, y, 0)],
      ];
      return svg(640, 340, 'تحسينات الصور: العين الحمراء وإصلاح الأخطاء والقص والتدوير', cards.map(([title, en, before, after], i) => {
        const x = i % 2 === 0 ? 326 : 14, y = i < 2 ? 14 : 176;
        return `<rect x="${x}" y="${y}" width="300" height="150" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
          + text(x + 150, y + 30, title, { size: 18, weight: 700 }) + text(x + 150, y + 50, en, { size: 12, weight: 600, fill: C.muted, ltr: true })
          + before(x + 236, y + 96) + after(x + 64, y + 96) + arrow(x + 178, y + 96, x + 122, y + 96, C.amber)
          + text(x + 236, y + 143, 'قبل', { size: 12, weight: 600, fill: C.muted }) + text(x + 64, y + 143, 'بعد', { size: 12, weight: 600, fill: C.muted });
      }).join(''));
    },

    // ---------- Unit 3 · Lesson 4 · Effects ----------
    'g4-filters'() {
      const items = [
        ['الأصلية', 'Original', NORMAL],
        ['القطب الشمالي', 'Arctic', { sky: '#d6e9f7', sun: '#eef6fc', far: '#8fb2cc', near: '#5b86a8', house: '#7d9bb5', roof: '#3e5f7a' }],
        ['فانيلا (رمادي)', 'Vanilla', { sky: '#e3e3e3', sun: '#f6f6f6', far: '#a9a9a9', near: '#7a7a7a', house: '#8e8e8e', roof: '#4d4d4d' }],
        ['صورة قديمة', 'Old photo', { sky: '#efdcb8', sun: '#f8ecd2', far: '#c7a77a', near: '#a5835a', house: '#b38b5e', roof: '#6d5235' }],
      ];
      const xs = [482, 330, 178, 26];
      const slider = (y, label, en, pos, color) => text(612, y + 6, label, { size: 15, weight: 700, anchor: 'start' })
        + text(470, y + 6, en, { size: 12, weight: 600, fill: C.muted, ltr: true })
        + line(40, y, 420, y, C.line, 6) + line(40, y, pos, y, color, 6) + `<circle cx="${pos}" cy="${y}" r="10" fill="#fff" stroke="${color}" stroke-width="3"/>`;
      return svg(640, 330, 'عوامل التصفية وتعديل الإضاءة واللون',
        items.map(([label, en, p], i) => {
          const x = xs[i];
          return `<rect x="${x}" y="14" width="132" height="184" rx="16" fill="${C.paper}" stroke="${i === 0 ? C.amber : C.line}" stroke-width="${i === 0 ? 3 : 2}"/>`
            + scene(x + 12, 26, 108, 100, p)
            + text(x + 66, 156, label, { size: 15, weight: 700 }) + text(x + 66, 180, en, { size: 12, weight: 600, fill: C.muted, ltr: true });
        }).join('')
        + `<rect x="14" y="214" width="612" height="102" rx="16" fill="${C.soft}"/>`
        + text(320, 240, 'مجموعة الضبط (Adjust)', { size: 15, weight: 700, fill: C.right })
        + slider(266, 'الإضاءة', 'Light', 290, C.amber) + slider(298, 'اللون', 'Color', 170, C.blue));
    },

    // ---------- Unit 4 · Lesson 1 · Introduction to robotics ----------
    'g4-ev3-brick'() {
      const parts = [
        [520, 60, 'محركان كبيران', 'الحركة والاتجاه'],
        [520, 160, 'محرك متوسط', 'رفع الذراع وخفضه'],
        [120, 18, 'مستشعر المسافة', 'يكتشف العوائق'],
        [120, 92, 'مستشعر الألوان', 'يكتشف اللون والضوء'],
        [120, 166, 'مستشعر الجيروسكوب', 'يقيس الدوران'],
        [120, 240, 'مستشعر اللمس', 'يستجيب للضغط'],
      ];
      return svg(640, 310, 'وحدة التحكم في روبوت ليجو مايند ستورم والمحركات والمستشعرات',
        parts.map(([x, y, , ], i) => {
          const sx = i < 2 ? 384 : 256, sy = 110 + (i < 2 ? i * 40 : (i - 2) * 30);
          return `<path d="M${sx} ${sy} C${(sx + x) / 2} ${sy} ${(sx + x) / 2} ${y + 20} ${i < 2 ? x - 90 : x + 90} ${y + 20}" fill="none" stroke="${C.muted}" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/>`;
        }).join('')
        + shadow(320, 270, 70)
        + `<rect x="256" y="60" width="128" height="200" rx="18" fill="#e7ecee" stroke="#9eabb1" stroke-width="3"/>`
        + `<rect x="272" y="78" width="96" height="62" rx="6" fill="#2c3e48"/>` + text(320, 116, 'EV3', { size: 20, weight: 700, fill: '#8ad9c7', ltr: true })
        + `<rect x="294" y="168" width="52" height="52" rx="10" fill="#c3ccd0"/>`
        + `<rect x="308" y="182" width="24" height="24" rx="5" fill="#2c3e48"/>`
        + poly([[320, 154], [332, 166], [308, 166]], '#9eabb1') + poly([[320, 234], [332, 222], [308, 222]], '#9eabb1')
        + poly([[280, 194], [292, 182], [292, 206]], '#9eabb1') + poly([[360, 194], [348, 182], [348, 206]], '#9eabb1')
        + `<rect x="266" y="150" width="20" height="12" rx="3" fill="#9eabb1"/>`
        + text(320, 290, 'وحدة التحكم', { size: 17, weight: 700 })
        + parts.map(([x, y, label, sub], i) => `<rect x="${x - 90}" y="${y}" width="180" height="58" rx="14" fill="${i < 2 ? '#fff4e6' : '#e6f0fb'}" stroke="${i < 2 ? C.amber : C.blue}" stroke-width="2"/>`
          + text(x, y + 25, label, { size: 15, weight: 700 }) + text(x, y + 46, sub, { size: 12, weight: 500, fill: C.muted })).join(''));
    },

    'g4-roberta-env'() {
      const cats = [['Action', '#f29a2e'], ['Sensors', '#7fb043'], ['Control', '#ec7a2b'], ['Logic', '#2fb6c8'], ['Math', '#1f5f8b'], ['Text', '#9cc33b'], ['Colours', '#e6b72c']];
      return svg(640, 330, 'واجهة بيئة أوبن روبيرتا لاب',
        `<rect x="10" y="10" width="620" height="262" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<path d="M10 46 V24 Q10 10 24 10 H616 Q630 10 630 24 V46 Z" fill="${C.soft}"/>`
        + text(30, 34, 'Open Roberta Lab', { size: 14, weight: 700, fill: C.right, ltr: true, anchor: 'start' })
        + `<rect x="560" y="18" width="56" height="22" rx="6" fill="${C.ink}"/>` + text(588, 34, 'SIM', { size: 13, weight: 700, fill: '#fff', ltr: true })
        + cats.map(([n, c], i) => `<rect x="20" y="${56 + i * 26}" width="84" height="22" rx="4" fill="${c}"/>` + text(28, 72 + i * 26, n, { size: 12, weight: 700, fill: '#fff', ltr: true, anchor: 'start' })).join('')
        + `<rect x="120" y="56" width="230" height="206" rx="8" fill="#fbf6ee"/>`
        + `<rect x="134" y="74" width="170" height="26" rx="5" fill="#d64545"/>` + text(144, 92, '+ start', { size: 13, weight: 700, fill: '#fff', ltr: true, anchor: 'start' })
        + `<rect x="134" y="102" width="200" height="50" rx="5" fill="#f29a2e"/>`
        + text(144, 122, 'drive forwards  speed %', { size: 12, weight: 700, fill: '#fff', ltr: true, anchor: 'start' })
        + text(244, 144, 'distance cm', { size: 12, weight: 700, fill: '#fff', ltr: true, anchor: 'end' })
        + `<rect x="300" y="108" width="28" height="18" rx="3" fill="#1f5f8b"/>` + text(314, 122, '30', { size: 12, weight: 700, fill: '#fff', ltr: true })
        + `<rect x="300" y="130" width="28" height="18" rx="3" fill="#1f5f8b"/>` + text(314, 144, '100', { size: 11, weight: 700, fill: '#fff', ltr: true })
        + `<rect x="366" y="56" width="252" height="206" rx="8" fill="#eef1f2"/>`
        + `<rect x="378" y="66" width="228" height="156" fill="#fff" stroke="#e0c341" stroke-width="5" stroke-dasharray="8 5"/>`
        + line(420, 150, 520, 150, C.ink, 5)
        + `<rect x="520" y="138" width="30" height="24" rx="4" fill="#f2c94c" stroke="${C.ink}" stroke-width="2"/>`
        + [[386, '▶'], [416, 'EV3'], [446, '◎'], [476, '⌖']].map(([x, s]) => `<rect x="${x}" y="230" width="26" height="24" rx="4" fill="#fff" stroke="${C.line}"/>` + text(x + 13, 247, s, { size: 10, weight: 700, ltr: true })).join('')
        + badge(62, 256, '1') + badge(235, 262, '2') + badge(600, 262, '3') + badge(538, 29, '4')
        + [['1', 'اللبنات البرمجية'], ['2', 'منطقة البرمجة'], ['3', 'عرض المحاكاة'], ['4', 'زر سيم (SIM)']].map(([n, label], i) => {
          const x = 560 - i * 152;
          return badge(x + 54, 308, n) + text(x + 34, 314, label, { size: 14, weight: 700, anchor: 'start' });
        }).join(''));
    },

    // ---------- Unit 4 · Lesson 2 · Turning ----------
    'g4-drive-steer'() {
      return svg(640, 340, 'الفرق بين لبنة القيادة ولبنة التوجيه',
        `<rect x="330" y="14" width="296" height="312" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + text(478, 44, 'مسافة القيادة', { size: 18, weight: 700 }) + text(478, 66, 'drive distance cm', { size: 12, weight: 600, fill: C.muted, ltr: true })
        + line(478, 96, 478, 196, C.ink, 5) + head(478, 130, 478, 92, C.ink)
        + botTop(478, 232, 50, 50)
        + `<rect x="352" y="276" width="252" height="38" rx="10" fill="#e6f0fb"/>` + text(478, 301, 'سرعة واحدة للمحركين: خط مستقيم', { size: 14, weight: 700, fill: C.blue })
        + `<rect x="14" y="14" width="296" height="312" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + text(162, 44, 'مسافة التوجيه', { size: 18, weight: 700 }) + text(162, 66, 'steer distance cm', { size: 12, weight: 600, fill: C.muted, ltr: true })
        + `<path d="M162 196 Q162 110 250 100" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>` + head(230, 102, 262, 100, C.ink)
        + botTop(162, 232, 100, 40)
        + text(94, 186, 'الأيسر', { size: 12, weight: 700, fill: C.blue }) + text(230, 186, 'الأيمن', { size: 12, weight: 700, fill: C.blue })
        + `<rect x="36" y="276" width="252" height="38" rx="10" fill="#fff4e6"/>` + text(162, 301, 'الأيسر أسرع: ينعطف إلى اليمين', { size: 14, weight: 700, fill: C.amber }));
    },
  });
})();
