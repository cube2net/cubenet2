// Grade 5, term 2: social media, blogging, intellectual property, robot programming (EV3 shapes).
(function () {
  const { C, svg, text, poly, line, arrow, head, badge, panels, steps, table, eye, share, rover, globe, character } = window.VisualKit;

  const card = (x, y, w, h, fill = C.paper, stroke = C.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const heart = (cx, cy, s = 1, fill = C.rose) => `<path transform="translate(${cx} ${cy}) scale(${s})" d="M0 10 C-14 0 -14 -12 -6 -12 C-2 -12 0 -8 0 -6 C0 -8 2 -12 6 -12 C14 -12 14 0 0 10 Z" fill="${fill}"/>`;
  const bubble = (cx, cy, s = 1, fill = C.blue) => `<g transform="translate(${cx} ${cy}) scale(${s})"><rect x="-13" y="-11" width="26" height="18" rx="5" fill="${fill}"/>${poly([[-6, 7], [-1, 7], [-8, 13]], fill)}</g>`;
  const lock = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M-14 -6 V-16 A14 14 0 0 1 14 -16 V-6" fill="none" stroke="${C.ink}" stroke-width="6"/><rect x="-22" y="-8" width="44" height="36" rx="6" fill="${C.amber}"/><circle cx="0" cy="6" r="5" fill="${C.ink}"/><rect x="-2" y="6" width="4" height="12" fill="${C.ink}"/></g>`;
  const shield = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})"><path d="M0 -34 L28 -24 V0 Q28 24 0 36 Q-28 24 -28 0 V-24 Z" fill="${C.left}"/><path d="M-12 0 L-3 10 L14 -10" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const person = (cx, cy, s = 1, fill = C.right) => `<g transform="translate(${cx} ${cy}) scale(${s})"><circle cx="0" cy="-14" r="10" fill="${fill}"/><path d="M-17 18 Q-17 -2 0 -2 Q17 -2 17 18 Z" fill="${fill}"/></g>`;
  // Top view of the EV3 robot (yellow body, two wheels), facing angle deg (0 = right).
  const bot = (cx, cy, deg = 0, k = 1) => `<g transform="translate(${cx} ${cy}) rotate(${deg}) scale(${k})">`
    + `<rect x="-6" y="-17" width="12" height="6" rx="2" fill="${C.ink}"/><rect x="-6" y="11" width="12" height="6" rx="2" fill="${C.ink}"/>`
    + `<rect x="-13" y="-12" width="26" height="24" rx="4" fill="#f5c518" stroke="#b58f00" stroke-width="1.5"/>`
    + `<circle cx="9" cy="0" r="3.5" fill="${C.ink}"/></g>`;
  const regular = (cx, cy, r, n, start) => Array.from({ length: n }, (_, i) => {
    const a = ((start + (360 / n) * i) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const outline = (pts, stroke = C.ink, w = 6) => `<polygon points="${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const evBlock = (x, y, w, label, color = '#f39c27') => `<rect x="${x}" y="${y}" width="${w}" height="34" rx="6" fill="${color}"/>` + text(x + 12, y + 23, label, { size: 15, weight: 700, fill: '#fff', anchor: 'start', ltr: true });

  Object.assign(window.Visuals, {
    // ---------------- Social media ----------------
    'g5-social-feed'() {
      const tag = (x, y, label, icon) => card(x, y, 170, 52, C.soft, C.soft) + icon + text(x < 320 ? x + 108 : x + 120, y + 33, label, { size: 16, weight: 700 });
      return svg(640, 330, 'وسائل التواصل الاجتماعي: النشر والتفاعل',
        `<rect x="250" y="14" width="140" height="300" rx="22" fill="${C.ink}"/>`
        + `<rect x="261" y="40" width="118" height="250" rx="6" fill="${C.paper}"/>`
        + `<circle cx="358" cy="62" r="11" fill="${C.top}"/>` + line(338, 58, 290, 58, C.line, 5) + line(338, 70, 304, 70, C.line, 4)
        + `<rect x="272" y="86" width="96" height="74" rx="6" fill="#cdeee5"/>` + poly([[272, 160], [308, 120], [340, 160]], C.left) + poly([[318, 160], [348, 132], [368, 160]], C.right) + `<circle cx="292" cy="104" r="9" fill="#ffd36b"/>`
        + line(364, 176, 280, 176, C.line, 5) + line(364, 190, 300, 190, C.line, 5)
        + heart(352, 214, 0.9) + bubble(320, 214, 0.8) + share(290, 214).replace(/<line /g, '<line transform="translate(290 214) scale(0.5) translate(-290 -214)" ').replace(/<circle /g, '<circle transform="translate(290 214) scale(0.5) translate(-290 -214)" ')
        + `<rect x="272" y="240" width="96" height="36" rx="8" fill="${C.soft}"/>` + line(358, 252, 290, 252, C.line, 4) + line(358, 264, 306, 264, C.line, 4)
        + tag(440, 40, 'اكتب أفكارك', `<rect x="456" y="52" width="26" height="30" rx="3" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.5"/>` + line(462, 62, 476, 62, C.muted, 2) + line(462, 70, 476, 70, C.muted, 2))
        + tag(440, 130, 'شارك الصور', `<rect x="452" y="146" width="34" height="24" rx="4" fill="${C.top}"/>` + poly([[452, 170], [466, 154], [480, 170]], C.right))
        + tag(440, 220, 'شارك الفيديو', `<rect x="452" y="234" width="34" height="26" rx="5" fill="${C.rose}"/>` + poly([[464, 240], [476, 247], [464, 254]], '#fff'))
        + tag(30, 40, 'إعجاب', heart(56, 66, 1.1))
        + tag(30, 130, 'تعليق', bubble(56, 157, 1))
        + tag(30, 220, 'إعادة مشاركة', share(56, 246).replace(/<line /g, '<line transform="translate(56 246) scale(0.6) translate(-56 -246)" ').replace(/<circle /g, '<circle transform="translate(56 246) scale(0.6) translate(-56 -246)" '))
        + arrow(436, 66, 396, 90, C.amber) + arrow(436, 156, 396, 140, C.amber) + arrow(436, 246, 396, 230, C.amber)
        + arrow(204, 66, 244, 100, C.blue) + arrow(204, 156, 244, 200, C.blue) + arrow(204, 246, 244, 226, C.blue));
    },

    'g5-online-safety'() {
      return panels('قواعد الأمان عبر الإنترنت', 300, [
        { title: 'احمِ معلوماتك', sub: 'لا تشارك اسمك وعنوانك', draw: (x) => `<rect x="${x - 52}" y="56" width="104" height="70" rx="8" fill="${C.soft}" stroke="${C.right}" stroke-width="2"/>` + `<circle cx="${x + 28}" cy="80" r="11" fill="${C.top}"/>` + line(x + 6, 76, x - 38, 76, C.line, 5) + line(x + 6, 90, x - 30, 90, C.line, 5) + line(x + 40, 108, x - 38, 108, C.line, 5) + lock(x - 30, 132, 0.9) },
        { title: 'أخبر والديك', sub: 'عند الشعور بالخطر', draw: (x) => person(x + 30, 110, 1.6, C.right) + person(x - 26, 110, 1.6, C.left) + person(x + 2, 136, 1.05, C.amber) + `<rect x="${x - 50}" y="36" width="64" height="30" rx="10" fill="${C.amber}"/>` + poly([[x - 26, 66], [x - 14, 66], [x - 24, 78]], C.amber) + text(x - 18, 57, '!', { size: 20, weight: 700, fill: '#fff' }) },
        { title: 'مكافحة الفيروسات', sub: 'ثبّته وحدّثه دائمًا', draw: (x) => `<rect x="${x - 56}" y="54" width="112" height="76" rx="8" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>` + `<rect x="${x - 6}" y="130" width="12" height="12" fill="${C.ink}"/><rect x="${x - 24}" y="142" width="48" height="5" rx="2" fill="${C.ink}"/>` + shield(x, 92, 0.85) },
      ]);
    },

    'g5-safe-download'() {
      const no = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="18" fill="#fff" stroke="${C.rose}" stroke-width="5"/>` + line(cx - 12, cy + 12, cx + 12, cy - 12, C.rose, 5);
      const ok = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="18" fill="#1f8f5c"/><path d="M${cx - 8} ${cy} L${cx - 2} ${cy + 7} L${cx + 9} ${cy - 7}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
      return panels('قواعد رفع المواد وتحميلها', 300, [
        { title: 'استأذن والديك', sub: 'قبل تحميل البرامج والملفات', draw: (x) => person(x + 26, 112, 1.7, C.right) + person(x - 28, 122, 1.2, C.amber)
          + `<path d="M${x - 40} 50 h28 v18 h10 l-24 22 l-24 -22 h10 z" fill="${C.blue}"/>` },
        { title: 'مواقع موثوقة', sub: 'استشر معلمك أو والديك', draw: (x) => globe(x - 6, 100) + ok(x + 32, 130) },
        { title: 'احترم الآخرين', sub: 'لا تنشر ما يسيء لأحد', draw: (x) => `<rect x="${x - 46}" y="58" width="80" height="64" rx="6" fill="#cdeee5" stroke="${C.right}" stroke-width="2"/>` + person(x - 6, 104, 1.3, C.left) + no(x + 36, 128) },
      ]);
    },

    'g5-safe-gaming'() {
      const clock = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="38" fill="${C.paper}" stroke="${C.ink}" stroke-width="4"/>` + line(cx, cy, cx, cy - 24, C.ink, 4) + line(cx, cy, cx + 18, cy + 8, C.amber, 4) + `<circle cx="${cx}" cy="${cy}" r="4" fill="${C.ink}"/>`;
      const no = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="18" fill="#fff" stroke="${C.rose}" stroke-width="5"/>` + line(cx - 12, cy + 12, cx + 12, cy - 12, C.rose, 5);
      return panels('قواعد الأمان عند اللعب عبر الإنترنت', 300, [
        { title: 'صورة رمزية', sub: 'بدل صورتك الحقيقية', draw: (x) => `<circle cx="${x}" cy="98" r="50" fill="${C.soft}"/>` + character(x, 112) },
        { title: 'لا ملفات من الغرباء', sub: 'ولا كاميرا ولا دردشة صوتية', draw: (x) => `<path d="M${x - 30} 52 h42 l18 18 v62 h-60 z" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>` + line(x + 18, 86, x - 20, 86, C.muted, 3) + line(x + 18, 100, x - 20, 100, C.muted, 3) + no(x + 34, 128) },
        { title: 'وقت محدد', sub: 'لا تقضِ كل وقتك في اللعب', draw: (x) => clock(x, 98) },
      ]);
    },

    // ---------------- Blogging ----------------
    'g5-blog-page'() {
      const legend = [['1', 'اسم المدونة'], ['2', 'عنوان التدوينة'], ['3', 'نص التدوينة'], ['4', 'صورة أو فيديو'], ['5', 'التعليقات']];
      return svg(640, 360, 'أجزاء المدونة',
        `<rect x="230" y="14" width="396" height="332" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<circle cx="248" cy="34" r="5" fill="#e7a3a0"/><circle cx="264" cy="34" r="5" fill="#efd08a"/><circle cx="280" cy="34" r="5" fill="#a8d8b4"/>`
        + `<rect x="330" y="23" width="200" height="22" rx="11" fill="${C.soft}"/>` + text(430, 39, 'healthyhabits.blogspot.com', { size: 11, weight: 500, fill: C.muted, ltr: true })
        + `<rect x="230" y="54" width="396" height="50" fill="#f57d00"/>` + text(588, 86, 'عادات صحية', { size: 20, weight: 700, fill: '#fff', anchor: 'start' })
        + text(596, 132, 'تناول الطعام الصحي', { size: 17, weight: 700, fill: C.left, anchor: 'start' })
        + line(596, 150, 430, 150, C.line, 6) + line(596, 166, 410, 166, C.line, 6) + line(596, 182, 450, 182, C.line, 6)
        + `<rect x="252" y="122" width="150" height="90" rx="8" fill="#fdebd3"/>`
        + `<ellipse cx="327" cy="186" rx="52" ry="18" fill="#c8a173"/>` + [[300, 170, '#d64545'], [324, 164, '#4caf50'], [348, 170, '#f5c518'], [314, 178, '#e8912d'], [338, 178, '#8e44ad']].map(([x, y, f]) => `<circle cx="${x}" cy="${y}" r="11" fill="${f}"/>`).join('')
        + line(596, 226, 252, 226, C.line, 2)
        + `<circle cx="580" cy="256" r="13" fill="${C.top}"/>` + line(558, 250, 420, 250, C.line, 5) + line(558, 264, 470, 264, C.line, 5)
        + `<circle cx="580" cy="300" r="13" fill="#f7c27a"/>` + line(558, 294, 450, 294, C.line, 5) + line(558, 308, 490, 308, C.line, 5)
        + text(300, 266, 'رد', { size: 13, weight: 700, fill: C.blue }) + text(300, 310, 'رد', { size: 13, weight: 700, fill: C.blue })
        + badge(614, 66, '1') + badge(614, 126, '2') + badge(614, 168, '3') + badge(250, 128, '4') + badge(614, 258, '5')
        + legend.map(([n, t], i) => badge(196, 60 + i * 58, n) + text(170, 66 + i * 58, t, { size: 17, weight: 700, anchor: 'start' })).join(''));
    },

    'g5-blog-steps'() {
      const page = (x, y) => `<rect x="${x - 22}" y="${y - 28}" width="44" height="56" rx="5" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>`
        + `<rect x="${x - 22}" y="${y - 28}" width="44" height="13" rx="4" fill="#f57d00"/>`;
      return steps('خطوات التدوين في بلوقر', [
        ['أنشئ المدونة', 'الاسم والعنوان'],
        ['اكتب التدوينة', 'عنوان ونص'],
        ['أضف الوسائط', 'صور ومقاطع فيديو'],
        ['عاين وانشر', 'ثم أكّد النشر'],
      ], [
        (x, y) => page(x, y) + text(x, y + 14, 'B', { size: 20, weight: 700, fill: '#f57d00', ltr: true }),
        (x, y) => page(x, y) + line(x + 14, y - 2, x - 14, y - 2, C.muted, 3) + line(x + 14, y + 8, x - 10, y + 8, C.muted, 3) + line(x + 14, y + 18, x - 4, y + 18, C.muted, 3),
        (x, y) => `<rect x="${x - 30}" y="${y - 20}" width="40" height="30" rx="4" fill="${C.top}"/>` + poly([[x - 30, y + 10], [x - 14, y - 6], [x + 2, y + 10]], C.right)
          + `<rect x="${x - 4}" y="${y - 2}" width="34" height="26" rx="5" fill="${C.rose}"/>` + poly([[x + 8, y + 4], [x + 20, y + 11], [x + 8, y + 18]], '#fff'),
        (x, y) => eye(x, y - 4).replace(/<path /, '<path transform="translate(' + x + ' ' + (y - 4) + ') scale(0.8) translate(' + (-x) + ' ' + (-(y - 4)) + ')" ') + `<rect x="${x - 24}" y="${y + 16}" width="48" height="18" rx="9" fill="#f57d00"/>` + text(x, y + 30, 'نشر', { size: 12, weight: 700, fill: '#fff' }),
      ]);
    },

    // ---------------- Intellectual property ----------------
    'g5-ip-works'() {
      const icons = [
        (x, y) => `<rect x="${x - 18}" y="${y - 20}" width="36" height="40" rx="3" fill="${C.left}"/><rect x="${x - 12}" y="${y - 20}" width="4" height="40" fill="${C.right}"/>`,
        (x, y) => `<circle cx="${x - 8}" cy="${y + 12}" r="8" fill="${C.blue}"/><circle cx="${x + 14}" cy="${y + 6}" r="8" fill="${C.blue}"/>` + line(x, y + 12, x, y - 18, C.blue, 4) + line(x + 22, y + 6, x + 22, y - 24, C.blue, 4) + line(x, y - 18, x + 22, y - 24, C.blue, 6),
        (x, y) => `<rect x="${x - 24}" y="${y - 18}" width="48" height="34" rx="4" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>` + text(x, y + 6, '&lt;/&gt;', { size: 15, weight: 700, fill: C.left, ltr: true }) + `<rect x="${x - 14}" y="${y + 18}" width="28" height="4" rx="2" fill="${C.ink}"/>`,
        (x, y) => `<rect x="${x - 24}" y="${y - 20}" width="48" height="40" rx="3" fill="#fdebd3" stroke="#c8a173" stroke-width="3"/>` + poly([[x - 20, y + 16], [x - 4, y - 4], [x + 10, y + 16]], C.left) + `<circle cx="${x + 12}" cy="${y - 8}" r="6" fill="${C.amber}"/>`,
        (x, y) => `<rect x="${x - 24}" y="${y - 16}" width="48" height="34" rx="4" fill="${C.ink}"/>` + `<rect x="${x - 24}" y="${y - 26}" width="48" height="9" rx="2" fill="${C.ink}"/>` + poly([[x - 6, y - 6], [x + 10, y + 1], [x - 6, y + 8]], C.amber),
        (x, y) => `<rect x="${x - 24}" y="${y - 20}" width="48" height="40" rx="2" fill="#dcebf7" stroke="${C.blue}" stroke-width="2"/>` + line(x - 24, y - 2, x + 24, y - 2, C.blue, 1.5) + line(x, y - 20, x, y + 20, C.blue, 1.5) + `<rect x="${x - 16}" y="${y - 14}" width="12" height="8" fill="none" stroke="${C.blue}" stroke-width="2"/>`,
      ];
      const labels = ['كتب ومقالات وشعر', 'مقاطع صوتية', 'برامج الحاسب', 'رسومات وصور', 'أفلام وفيديو', 'مخططات معمارية'];
      const pos = [[520, 62], [520, 168], [520, 274], [120, 62], [120, 168], [120, 274]];
      return svg(640, 330, 'أمثلة على المواد ذات الحقوق المحفوظة',
        `<circle cx="320" cy="168" r="78" fill="${C.soft}" stroke="${C.right}" stroke-width="4"/>`
        + text(320, 196, '©', { size: 96, weight: 700, fill: C.right, ltr: true })
        + text(320, 278, 'حقوق محفوظة', { size: 18, weight: 700, fill: C.right })
        + pos.map(([x, y], i) => card(x - 104, y - 34, 208, 68) + icons[i](x + 66, y) + text(x + 30, y + 7, labels[i], { size: 16, weight: 700, anchor: 'start' })
          + line(x < 320 ? x + 108 : x - 108, y, x < 320 ? 246 : 394, 168 + (y - 168) * 0.45, C.line, 2, 'stroke-dasharray="4 5"')).join(''));
    },

    'g5-ip-terms'() {
      const seal = (x, label, color) => `<circle cx="${x}" cy="96" r="50" fill="${color}"/><circle cx="${x}" cy="96" r="40" fill="none" stroke="#fff" stroke-width="4"/>` + text(x, 108, label, { size: 32, weight: 700, fill: '#fff', ltr: true });
      return panels('الحقوق والتراخيص', 300, [
        { title: 'حقوق محفوظة', sub: 'لا تنسخه ولا تبعه دون إذن', draw: (x) => seal(x, '©', C.rose) },
        { title: 'المشاع الإبداعي', sub: 'استخدمه وانسبه لصاحبه', draw: (x) => seal(x, 'CC', C.blue) },
        { title: 'المُلك المشاع', sub: 'متاح لعموم الناس', draw: (x) => seal(x, 'PD', C.left) },
      ]);
    },

    'g5-piracy'() {
      const disc = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="#9eabb1" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="${C.paper}" stroke="#9eabb1" stroke-width="2"/>`;
      const doc = (x, y, fill) => `<rect x="${x - 34}" y="${y - 44}" width="68" height="88" rx="6" fill="${fill}" stroke="${C.ink}" stroke-width="2.5"/>` + [-24, -10, 4, 18].map((d) => line(x + 22, y + d, x - 22, y + d, C.muted, 3)).join('');
      const no = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="20" fill="#fff" stroke="${C.rose}" stroke-width="5"/>` + line(cx - 13, cy + 13, cx + 13, cy - 13, C.rose, 5);
      return svg(640, 300, 'القرصنة والانتحال',
        card(330, 14, 296, 272) + card(14, 14, 296, 272)
        + text(478, 50, 'القرصنة', { size: 22, weight: 700 })
        + disc(530, 140, 46, '#e4f1ec') + arrow(472, 140, 440, 140, C.rose)
        + [0, 1, 2].map((i) => disc(400 - i * 16, 120 + i * 20, 30, '#fdebd3')).join('') + no(560, 196)
        + text(478, 238, 'نسخ الأفلام والأصوات وبيعها', { size: 15, weight: 600, fill: C.muted })
        + text(478, 262, 'دون ترخيص', { size: 15, weight: 600, fill: C.muted })
        + text(162, 50, 'الانتحال', { size: 22, weight: 700 })
        + doc(220, 140, C.soft) + arrow(178, 140, 146, 140, C.rose) + doc(104, 140, '#fdebd3')
        + `<rect x="74" y="88" width="60" height="16" rx="4" fill="${C.amber}"/>` + text(104, 101, 'اسمي', { size: 12, weight: 700, fill: '#fff' }) + no(140, 196)
        + text(162, 238, 'نسخ عمل غيرك', { size: 15, weight: 600, fill: C.muted })
        + text(162, 262, 'وادّعاء أنه عملك', { size: 15, weight: 600, fill: C.muted }));
    },

    // ---------------- Robots ----------------
    'g5-robot-cycle'() {
      return steps('خطوات عمل الروبوت', [
        ['يستشعر', 'يجمع المعلومات من بيئته'],
        ['يعالج', 'يفكّر في المعلومات'],
        ['ينفّذ', 'يقوم بالمهمة'],
      ], [
        (x, y) => eye(x, y),
        (x, y) => `<rect x="${x - 22}" y="${y - 22}" width="44" height="44" rx="6" fill="${C.right}"/>` + `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" rx="3" fill="${C.top}"/>`
          + [-14, 0, 14].map((d) => line(x + d, y - 22, x + d, y - 30, C.ink, 3) + line(x + d, y + 22, x + d, y + 30, C.ink, 3) + line(x - 22, y + d, x - 30, y + d, C.ink, 3) + line(x + 22, y + d, x + 30, y + d, C.ink, 3)).join(''),
        (x, y) => rover(x, y + 18, 0.85),
      ]);
    },

    'g5-robot-kinds'() {
      const arm = (x, y) => `<rect x="${x - 34}" y="${y + 70}" width="68" height="16" rx="4" fill="${C.ink}"/>`
        + `<rect x="${x - 14}" y="${y + 50}" width="28" height="22" rx="4" fill="${C.amber}"/>`
        + line(x, y + 56, x - 30, y + 4, '#eba046', 16) + `<circle cx="${x}" cy="${y + 56}" r="10" fill="${C.ink}"/>`
        + line(x - 30, y + 4, x + 30, y - 22, '#eba046', 13) + `<circle cx="${x - 30}" cy="${y + 4}" r="9" fill="${C.ink}"/>`
        + line(x + 30, y - 22, x + 44, y - 8, C.ink, 5) + line(x + 30, y - 22, x + 48, y - 26, C.ink, 5);
      const drone = (x, y) => line(x - 34, y, x + 34, y, C.ink, 5) + [x - 34, x + 34].map((px) => `<ellipse cx="${px}" cy="${y - 8}" rx="22" ry="5" fill="none" stroke="${C.muted}" stroke-width="2.5"/>` + line(px, y, px, y - 8, C.ink, 3)).join('')
        + `<rect x="${x - 14}" y="${y - 6}" width="28" height="14" rx="5" fill="${C.left}"/><rect x="${x - 16}" y="${y + 12}" width="32" height="24" rx="2" fill="#c8a173"/>` + line(x - 8, y + 8, x - 10, y + 12, C.ink, 2) + line(x + 8, y + 8, x + 10, y + 12, C.ink, 2);
      return svg(640, 320, 'أنواع الروبوتات: الثابتة والمتنقلة',
        card(330, 14, 296, 292) + card(14, 14, 296, 292)
        + text(478, 50, 'الروبوتات الثابتة', { size: 21, weight: 700 })
        + arm(478, 100)
        + text(478, 232, 'أسرع وأقوى، ترفع الأوزان', { size: 15, weight: 600, fill: C.muted })
        + text(478, 262, 'أذرع المصانع، الصرّاف الآلي', { size: 15, weight: 700, fill: C.right })
        + text(162, 50, 'الروبوتات المتنقلة', { size: 21, weight: 700 })
        + drone(100, 110) + rover(210, 170, 1) + line(150, 196, 270, 196, C.line, 3)
        + text(162, 232, 'تتنقل بالمحركات في البر والبحر والجو', { size: 14, weight: 600, fill: C.muted })
        + text(162, 262, 'طائرات مسيّرة، سيارات ذاتية القيادة', { size: 14, weight: 700, fill: C.right }));
    },

    'g5-robot-proscons'() {
      const item = (x, y, label, good) => (good
        ? `<circle cx="${x}" cy="${y}" r="12" fill="#1f8f5c"/><path d="M${x - 5} ${y} L${x - 1} ${y + 5} L${x + 6} ${y - 5}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`
        : `<circle cx="${x}" cy="${y}" r="12" fill="${C.rose}"/>` + line(x - 5, y, x + 5, y, '#fff', 3))
        + text(x - 22, y + 6, label, { size: 16, weight: 600, anchor: 'start' });
      const pros = ['لا تتعب', 'تعمل بسرعة', 'دقيقة للغاية', 'تؤدي مهامًا صعبة على البشر', 'يمكن إصلاحها'];
      const cons = ['كلفتها عالية', 'تحتاج إلى طاقة لتعمل', 'لا تتخذ القرارات بنفسها', 'إصلاحها قد يستغرق وقتًا', 'لا تقوم بالمهن الإبداعية'];
      return svg(640, 320, 'إيجابيات الروبوتات وسلبياتها',
        card(330, 14, 296, 292, '#eef8f1', '#bfe3cb') + card(14, 14, 296, 292, C.roseSoft, '#efc3cb')
        + text(478, 52, 'الإيجابيات', { size: 22, weight: 700, fill: '#1f8f5c' })
        + text(162, 52, 'السلبيات', { size: 22, weight: 700, fill: C.rose })
        + pros.map((t, i) => item(596, 98 + i * 44, t, true)).join('')
        + cons.map((t, i) => item(280, 98 + i * 44, t, false)).join(''));
    },

    'g5-repeat-block'() {
      const tri = [[110, 70], [250, 70], [180, 191]];
      return svg(640, 320, 'لبنة التكرار ( ) مرة في أوبن روبيرتا',
        `<g direction="ltr">`
        + `<rect x="300" y="40" width="320" height="40" rx="6" fill="#e8722b"/>`
        + text(314, 67, 'repeat', { size: 17, weight: 700, fill: '#fff', anchor: 'start', ltr: true })
        + `<rect x="384" y="48" width="36" height="24" rx="4" fill="#d9eaf7" stroke="#2f6fa8" stroke-width="2"/>` + text(402, 66, '3', { size: 16, weight: 700, ltr: true })
        + text(432, 67, 'times', { size: 17, weight: 700, fill: '#fff', anchor: 'start', ltr: true })
        + `<rect x="300" y="80" width="34" height="132" fill="#e8722b"/>` + text(310, 104, 'do', { size: 16, weight: 700, fill: '#fff', anchor: 'start', ltr: true })
        + `<rect x="300" y="212" width="160" height="22" rx="4" fill="#e8722b"/>`
        + evBlock(340, 90, 270, 'drive forwards  50%  80 cm')
        + evBlock(340, 136, 270, 'turn right  30%  120°')
        + `</g>`
        + text(470, 196, 'اللبنات المكرَّرة داخلها', { size: 14, weight: 700, fill: C.muted })
        + text(460, 270, 'نجدها في فئة «التحكم» (Control)', { size: 16, weight: 700 })
        + text(460, 296, 'عدد المرات عدد صحيح فقط', { size: 14, weight: 600, fill: C.muted })
        + outline(tri, C.ink, 5) + bot(250, 70, 0, 1)
        + text(180, 240, 'x3', { size: 28, weight: 700, fill: C.amber, ltr: true })
        + text(180, 272, 'تقدّم ← انعطف', { size: 16, weight: 700 }));
    },

    'g5-turn-angles'() {
      const shapes = [[3, 'مثلث'], [4, 'مربع'], [5, 'خماسي'], [6, 'سداسي'], [8, 'ثماني']];
      const rows = [['الشكل', 'الأضلاع', 'الانعطاف']].concat(shapes.map(([n, name]) => [name, String(n), `${360 / n}°`]));
      return svg(640, 320, 'زاوية انعطاف الروبوت = 360 ÷ عدد الأضلاع',
        `<rect x="330" y="14" width="296" height="54" rx="14" fill="#fdebd3"/>`
        + text(478, 49, 'الانعطاف = 360 ÷ عدد الأضلاع', { size: 18, weight: 700, fill: '#b5651d' })
        + table(330, 84, [110, 86, 100], 38, rows, { header: true, size: 16, fills: { '4,2': '#cdeee5', '4,0': '#cdeee5', '4,1': '#cdeee5' } })
        + outline(regular(160, 160, 92, 6, -90), C.ink, 5)
        + bot(160, 68, 30, 1)
        + line(160 + 92 * Math.cos(-Math.PI / 6), 160 + 92 * Math.sin(-Math.PI / 6), 160 + 92 * Math.cos(-Math.PI / 6) + 44 * Math.cos(Math.PI / 6), 160 + 92 * Math.sin(-Math.PI / 6) + 44 * Math.sin(Math.PI / 6), C.muted, 2, 'stroke-dasharray="5 5"')
        + text(276, 160, '60°', { size: 18, weight: 700, fill: C.amber, ltr: true })
        + text(108, 70, '30°', { size: 16, weight: 700, fill: C.blue, ltr: true })
        + text(160, 168, 'x6', { size: 26, weight: 700, fill: C.amber, ltr: true })
        + text(160, 296, 'يبدأ بانعطاف 30° ثم 60° بعد كل ضلع', { size: 15, weight: 700, fill: C.muted }));
    },

    'g5-steer-circle'() {
      const speeds = (x, l, r) => `<rect x="${x - 70}" y="210" width="64" height="40" rx="8" fill="${C.soft}"/><rect x="${x + 6}" y="210" width="64" height="40" rx="8" fill="#fdebd3"/>`
        + text(x - 38, 236, l, { size: 18, weight: 700, ltr: true }) + text(x + 38, 236, r, { size: 18, weight: 700, ltr: true })
        + text(x - 38, 268, 'يمين', { size: 13, weight: 600, fill: C.muted }) + text(x + 38, 268, 'يسار', { size: 13, weight: 600, fill: C.muted });
      return svg(640, 330, 'أثر سرعة المحركين والمسافة على حجم الدائرة',
        card(330, 14, 296, 300) + card(14, 14, 296, 300)
        + text(478, 46, 'فرق بسيط + مسافة كبيرة', { size: 17, weight: 700 })
        + `<circle cx="478" cy="142" r="60" fill="none" stroke="${C.ink}" stroke-width="5"/>` + bot(478, 82, 0, 1.1)
        + speeds(478, '80', '100')
        + text(478, 300, 'دائرة كبيرة', { size: 18, weight: 700, fill: C.right })
        + text(162, 46, 'فرق كبير + مسافة صغيرة', { size: 17, weight: 700 })
        + `<circle cx="162" cy="142" r="30" fill="none" stroke="${C.ink}" stroke-width="5"/>` + bot(162, 112, 0, 1.1)
        + speeds(162, '55', '100')
        + text(162, 300, 'دائرة صغيرة', { size: 18, weight: 700, fill: C.right }));
    },

    'g5-repeat-shapes'() {
      return svg(640, 340, 'رسم المثلث والمستطيل باستخدام التكرار',
        card(330, 14, 296, 312) + card(14, 14, 296, 312)
        + text(478, 46, 'المثلث', { size: 21, weight: 700 })
        + outline([[408, 90], [548, 90], [478, 211]].map(([x, y]) => [x, y])) + bot(548, 90, 0, 1)
        + line(548, 90, 600, 90, C.muted, 2, 'stroke-dasharray="5 5"')
        + `<path d="M584 90 A36 36 0 0 1 566 121" fill="none" stroke="${C.amber}" stroke-width="3"/>` + text(600, 128, '120°', { size: 16, weight: 700, fill: C.amber, ltr: true })
        + `<rect x="398" y="236" width="160" height="38" rx="8" fill="#e8722b"/>` + text(478, 261, 'repeat 3 times', { size: 16, weight: 700, fill: '#fff', ltr: true })
        + text(478, 302, 'تقدّم ثم انعطف 120° × 3', { size: 15, weight: 600, fill: C.muted })
        + text(162, 46, 'المستطيل', { size: 21, weight: 700 })
        + outline([[60, 90], [264, 90], [264, 190], [60, 190]]) + bot(264, 90, 0, 1)
        + line(264, 90, 296, 90, C.muted, 2, 'stroke-dasharray="5 5"')
        + `<path d="M288 90 A24 24 0 0 1 264 114" fill="none" stroke="${C.amber}" stroke-width="3"/>` + text(240, 124, '90°', { size: 16, weight: 700, fill: C.amber, ltr: true })
        + text(162, 82, '100 سم', { size: 14, weight: 700, fill: C.blue }) + text(42, 146, '50', { size: 14, weight: 700, fill: C.blue, ltr: true })
        + `<rect x="82" y="236" width="160" height="38" rx="8" fill="#e8722b"/>` + text(162, 261, 'repeat 2 times', { size: 16, weight: 700, fill: '#fff', ltr: true })
        + text(162, 302, 'ضلع طويل وضلع قصير × 2', { size: 15, weight: 600, fill: C.muted }));
    },

    'g5-cube-draw'() {
      const hex = regular(110, 150, 72, 6, -90);
      const hex2 = regular(510, 150, 72, 6, -90);
      const rh = [[320, 78], [382, 114], [320, 150], [258, 114]];
      return svg(640, 330, 'المضلع السداسي + المعين = مكعب',
        outline(hex) + bot(hex[0][0], hex[0][1], 30, 0.9)
        + text(110, 262, 'مضلع سداسي', { size: 18, weight: 700 })
        + text(110, 290, '360 ÷ 6 = 60°', { size: 16, weight: 700, fill: C.amber, ltr: true })
        + text(214, 160, '+', { size: 40, weight: 700, fill: C.muted })
        + outline(rh, C.blue)
        + text(320, 104, '120°', { size: 13, weight: 700, fill: C.blue, ltr: true }) + text(352, 119, '60°', { size: 12, weight: 700, fill: C.blue, ltr: true })
        + text(320, 262, 'مُعيّن', { size: 18, weight: 700 })
        + text(320, 290, 'انعطاف 120° ثم 60°', { size: 15, weight: 700, fill: C.amber })
        + text(414, 160, '=', { size: 40, weight: 700, fill: C.muted })
        + poly([[hex2[0][0], hex2[0][1]], [hex2[1][0], hex2[1][1]], [510, 150], [hex2[5][0], hex2[5][1]]], '#8ad9c7')
        + poly([[hex2[5][0], hex2[5][1]], [510, 150], [hex2[3][0], hex2[3][1]], [hex2[4][0], hex2[4][1]]], '#23957d')
        + poly([[510, 150], [hex2[1][0], hex2[1][1]], [hex2[2][0], hex2[2][1]], [hex2[3][0], hex2[3][1]]], '#0e6b5c')
        + outline(hex2) + line(hex2[1][0], hex2[1][1], 510, 150, C.ink, 6) + line(hex2[5][0], hex2[5][1], 510, 150, C.ink, 6) + line(510, 150, hex2[3][0], hex2[3][1], C.ink, 6)
        + text(510, 262, 'مكعب', { size: 18, weight: 700 })
        + text(510, 290, 'شكل ثلاثي الأبعاد', { size: 15, weight: 600, fill: C.muted }));
    },
  });
  void head;
})();
