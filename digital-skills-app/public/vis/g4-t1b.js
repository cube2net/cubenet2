// Grade 4, term 1: units 3 (عالمي المتصل) and 4 (العمل مع البرمجة باستخدام سكراتش).
(function () {
  const { C, svg, text, poly, line, arrow, badge, panels, steps, head, globe, monitor, sprite, sblock, hat, cblock, building, phone } = window.VisualKit;

  const card = (x, y, w, h, fill = C.paper, stroke = C.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const pill = (cx, cy, w, label, fill, color = '#fff', size = 15) => `<rect x="${cx - w / 2}" y="${cy - 16}" width="${w}" height="32" rx="16" fill="${fill}"/>` + text(cx, cy + 5, label, { size, weight: 700, fill: color });
  const magnifier = (cx, cy, k = 1, color = C.right) => `<circle cx="${cx - 4 * k}" cy="${cy - 4 * k}" r="${13 * k}" fill="#fff" stroke="${color}" stroke-width="${4 * k}"/>` + line(cx + 5 * k, cy + 5 * k, cx + 16 * k, cy + 16 * k, color, 5 * k);
  const check = (cx, cy, color = '#1f8f5c') => `<circle cx="${cx}" cy="${cy}" r="13" fill="${color}"/><path d="M${cx - 6} ${cy} l4 5 l8 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cross = (cx, cy, color = C.rose) => `<circle cx="${cx}" cy="${cy}" r="13" fill="${color}"/>` + line(cx - 5, cy - 5, cx + 5, cy + 5, '#fff', 3) + line(cx + 5, cy - 5, cx - 5, cy + 5, '#fff', 3);
  const shield = (cx, cy, s = 1, fill = C.right) => `<path d="M${cx} ${cy - 40 * s} L${cx + 32 * s} ${cy - 28 * s} V${cy} Q${cx + 32 * s} ${cy + 30 * s} ${cx} ${cy + 44 * s} Q${cx - 32 * s} ${cy + 30 * s} ${cx - 32 * s} ${cy} V${cy - 28 * s} Z" fill="${fill}"/>`;
  const virus = (cx, cy, r = 14) => {
    let spikes = '';
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4;
      spikes += line(cx + r * Math.cos(a), cy + r * Math.sin(a), cx + (r + 8) * Math.cos(a), cy + (r + 8) * Math.sin(a), '#b8394b', 3)
        + `<circle cx="${cx + (r + 9) * Math.cos(a)}" cy="${cy + (r + 9) * Math.sin(a)}" r="3" fill="#b8394b"/>`;
    }
    return spikes + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.rose}"/>`
      + `<circle cx="${cx - 4}" cy="${cy - 3}" r="3" fill="#fff"/><circle cx="${cx + 5}" cy="${cy - 3}" r="3" fill="#fff"/>`;
  };
  const bread = (cx, cy, fill = '#e8b46a') => `<path d="M${cx - 26} ${cy + 22} V${cy - 6} Q${cx - 34} ${cy - 30} ${cx - 10} ${cy - 30} H${cx + 10} Q${cx + 34} ${cy - 30} ${cx + 26} ${cy - 6} V${cy + 22} Z" fill="${fill}" stroke="#b9772e" stroke-width="3"/>`
    + `<path d="M${cx - 18} ${cy + 16} V${cy - 4} Q${cx - 24} ${cy - 22} ${cx - 8} ${cy - 22} H${cx + 8} Q${cx + 24} ${cy - 22} ${cx + 18} ${cy - 4} V${cy + 16} Z" fill="#fbe3b7"/>`;
  const cheese = (cx, cy) => poly([[cx - 26, cy + 4], [cx + 26, cy - 4], [cx + 26, cy + 14], [cx - 26, cy + 20]], '#ffd34d', 'stroke="#d9a400" stroke-width="2"')
    + `<circle cx="${cx - 8}" cy="${cy + 10}" r="3" fill="#e6b800"/><circle cx="${cx + 10}" cy="${cy + 6}" r="2.5" fill="#e6b800"/>`;
  const toaster = (cx, cy) => `<rect x="${cx - 30}" y="${cy - 14}" width="60" height="38" rx="10" fill="#9eabb1"/>`
    + `<rect x="${cx - 18}" y="${cy - 26}" width="12" height="14" rx="2" fill="#e8b46a"/><rect x="${cx + 6}" y="${cy - 26}" width="12" height="14" rx="2" fill="#e8b46a"/>`
    + `<rect x="${cx - 30}" y="${cy - 16}" width="60" height="6" rx="3" fill="${C.ink}"/>` + `<circle cx="${cx + 20}" cy="${cy + 8}" r="4" fill="${C.rose}"/>`;

  Object.assign(window.Visuals, {
    // ------------------------------------------------------------ unit 3
    'g4-browser'() {
      const legend = (y, n, label) => badge(126, y, n) + text(104, y + 6, label, { size: 16, weight: 700, anchor: 'start' });
      return svg(640, 340, 'أجزاء نافذة المتصفح',
        card(170, 14, 456, 312)
        + `<path d="M170 28 Q170 14 184 14 H612 Q626 14 626 28 V54 H170 Z" fill="#eef3f6"/>`
        + `<rect x="430" y="20" width="150" height="30" rx="8" fill="#fff"/>` + text(566, 40, 'الهيئة الملكية', { size: 12, weight: 600, anchor: 'start' })
        + line(196, 30, 206, 40, C.muted, 2) + line(206, 30, 196, 40, C.muted, 2)
        + `<rect x="196" y="62" width="392" height="30" rx="15" fill="#eef3f6" stroke="${C.blue}" stroke-width="2.5"/>`
        + text(392, 82, 'www.rcrc.gov.sa', { size: 14, weight: 600, fill: C.ink, ltr: true })
        + `<rect x="170" y="100" width="456" height="40" fill="${C.right}"/>` + text(600, 126, 'الصفحة الرئيسة', { size: 15, weight: 700, fill: '#fff', anchor: 'start' })
        + `<rect x="226" y="152" width="380" height="70" rx="8" fill="#cdeee5"/>`
        + poly([[226, 222], [330, 170], [430, 222]], C.left) + poly([[380, 222], [500, 160], [606, 222]], C.right)
        + `<rect x="300" y="236" width="306" height="8" rx="4" fill="${C.line}"/><rect x="340" y="254" width="266" height="8" rx="4" fill="${C.line}"/>`
        + text(584, 294, 'برامج ومشاريع الهيئة', { size: 15, weight: 700, fill: C.blue, anchor: 'start' }) + line(584, 299, 434, 299, C.blue, 2)
        + `<path d="M410 300 v-14 a4 4 0 0 1 8 0 v10 h2 v-4 a4 4 0 0 1 8 0 v4 a4 4 0 0 1 8 0 v8 q0 14 -12 14 h-6 q-8 0 -12 -8 l-6 -8 a4 4 0 0 1 6 -4 z" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`
        + `<rect x="178" y="144" width="12" height="174" rx="6" fill="#eef3f6"/><rect x="178" y="160" width="12" height="60" rx="6" fill="${C.muted}"/>`
        + head(184, 156, 184, 148, C.muted) + head(184, 306, 184, 314, C.muted)
        + badge(606, 77, '1') + badge(606, 289, '2') + badge(206, 190, '3')
        + legend(110, '1', 'شريط العنوان') + legend(170, '2', 'رابط تشعبي') + legend(230, '3', 'شريط التمرير')
        + text(80, 290, 'عند الإشارة إلى الرابط', { size: 13, weight: 500, fill: C.muted }) + text(80, 310, 'يتحول السهم إلى يد', { size: 13, weight: 500, fill: C.muted }));
    },

    'g4-browser-tools'() {
      const items = [
        ['الرجوع', 'Back', (x, y) => arrow(x + 16, y, x - 16, y, '#fff')],
        ['للأمام', 'Forward', (x, y) => arrow(x - 16, y, x + 16, y, '#fff')],
        ['التحديث', 'Refresh', (x, y) => `<path d="M${x + 14} ${y - 6} A15 15 0 1 0 ${x + 13} ${y + 8}" fill="none" stroke="#fff" stroke-width="4"/>` + head(x + 6, y - 16, x + 16, y - 4, '#fff')],
        ['إيقاف', 'Stop', (x, y) => line(x - 11, y - 11, x + 11, y + 11, '#fff', 5) + line(x + 11, y - 11, x - 11, y + 11, '#fff', 5)],
        ['الصفحة الرئيسة', 'Home', (x, y) => poly([[x, y - 17], [x + 18, y - 1], [x - 18, y - 1]], '#fff') + `<rect x="${x - 12}" y="${y - 2}" width="24" height="18" fill="#fff"/><rect x="${x - 4}" y="${y + 5}" width="8" height="11" fill="${C.right}"/>`],
        ['تبويب جديد', 'New Tab', (x, y) => line(x, y - 14, x, y + 14, '#fff', 5) + line(x - 14, y, x + 14, y, '#fff', 5)],
      ];
      const xs = [575, 473, 371, 269, 167, 65];
      return svg(640, 250, 'أدوات المتصفح',
        `<rect x="14" y="14" width="612" height="36" rx="18" fill="#eef3f6"/>`
        + text(320, 38, 'شريط العنوان (Address bar): نكتب فيه عنوان الموقع', { size: 15, weight: 700 })
        + items.map(([ar, en, icon], i) => {
          const cx = xs[i];
          return `<circle cx="${cx}" cy="118" r="36" fill="${i === 3 ? C.rose : C.right}"/>` + icon(cx, 118)
            + text(cx, 186, ar, { size: 15, weight: 700 }) + text(cx, 210, en, { size: 13, weight: 600, fill: C.muted, ltr: true });
        }).join(''));
    },

    'g4-search-steps'() {
      return steps('خطوات البحث في الإنترنت', [
        ['محرك البحث', 'www.bing.com'],
        ['اكتب الكلمات', 'الرياض الخضراء'],
        ['اضغط «بحث»', 'أيقونة العدسة'],
        ['اختر النتيجة', 'الأنسب لبحثك'],
      ], [
        (x, y) => globe(x, y),
        (x, y) => `<rect x="${x - 34}" y="${y - 14}" width="68" height="28" rx="14" fill="#fff" stroke="${C.right}" stroke-width="3"/>` + line(x + 20, y - 7, x + 20, y + 7, C.ink, 2) + line(x + 14, y, x - 22, y, C.line, 5),
        (x, y) => magnifier(x, y, 1.3),
        (x, y) => [0, 1, 2].map((k) => `<rect x="${x - 28}" y="${y - 24 + k * 18}" width="56" height="12" rx="4" fill="${k === 0 ? C.amber : '#fff'}" stroke="${C.right}" stroke-width="2"/>`).join(''),
      ]);
    },

    'g4-trusted-sites'() {
      const domain = (cx, y, d, label, icon) => card(cx - 92, y, 184, 168)
        + icon(cx, y + 52)
        + `<rect x="${cx - 44}" y="${y + 94}" width="88" height="30" rx="15" fill="${C.soft}" stroke="${C.right}" stroke-width="2"/>`
        + text(cx, y + 115, d, { size: 18, weight: 700, fill: C.right, ltr: true })
        + text(cx, y + 150, label, { size: 15, weight: 700 }) + check(cx + 74, y + 18);
      return svg(640, 300, 'المواقع الموثوقة',
        domain(522, 14, '.gov', 'المواقع الحكومية', (x, y) => building(x, y))
        + domain(320, 14, '.edu', 'المؤسسات التعليمية', (x, y) => poly([[x, y - 26], [x + 42, y - 8], [x, y + 10], [x - 42, y - 8]], C.right) + `<path d="M${x - 24} ${y + 2} V${y + 20} Q${x} ${y + 34} ${x + 24} ${y + 20} V${y + 2}" fill="${C.left}"/>` + line(x + 36, y - 6, x + 36, y + 22, C.amber, 3))
        + domain(118, 14, '.org', 'المنظمات', (x, y) => globe(x, y))
        + `<rect x="26" y="200" width="588" height="86" rx="14" fill="#fff7ea" stroke="${C.amber}" stroke-width="2"/>`
        + `<rect x="534" y="214" width="58" height="58" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="3"/><rect x="534" y="214" width="58" height="16" rx="6" fill="${C.rose}"/>`
        + text(563, 260, '15', { size: 20, weight: 700, ltr: true })
        + text(512, 238, 'تحقق من تاريخ آخر تحديث للموقع', { size: 18, weight: 700, anchor: 'start' })
        + text(512, 266, 'فالمعلومات الحديثة أفضل، واسأل من تثق بهم', { size: 15, weight: 500, fill: C.muted, anchor: 'start' }));
    },

    'g4-copy-paste'() {
      const doc = (x, y) => `<rect x="${x - 24}" y="${y - 30}" width="48" height="60" rx="5" fill="#fff" stroke="${C.ink}" stroke-width="3"/>`;
      return steps('نسخ النص ولصقه', [
        ['ظلّل النص', 'بسحب الفأرة'],
        ['نسخ (Copy)', 'بزر الفأرة الأيمن'],
        ['لصق (Paste)', 'في محرر النصوص'],
      ], [
        (x, y) => doc(x, y) + `<rect x="${x - 18}" y="${y - 14}" width="36" height="10" fill="#9fd0f5"/>` + line(x + 16, y - 20, x - 16, y - 20, C.line, 4) + line(x + 16, y + 6, x - 16, y + 6, C.line, 4) + line(x + 16, y + 18, x - 8, y + 18, C.line, 4),
        (x, y) => `<rect x="${x - 8}" y="${y - 26}" width="34" height="42" rx="4" fill="#fff" stroke="${C.right}" stroke-width="3"/><rect x="${x - 26}" y="${y - 14}" width="34" height="42" rx="4" fill="${C.soft}" stroke="${C.right}" stroke-width="3"/>`,
        (x, y) => `<rect x="${x - 24}" y="${y - 26}" width="48" height="56" rx="5" fill="#d9b48a"/><rect x="${x - 10}" y="${y - 32}" width="20" height="12" rx="3" fill="${C.ink}"/><rect x="${x - 16}" y="${y - 14}" width="32" height="38" rx="3" fill="#fff"/>` + line(x + 10, y - 4, x - 10, y - 4, C.line, 3) + line(x + 10, y + 6, x - 10, y + 6, C.line, 3),
      ]);
    },

    'g4-netiquette'() {
      const col = (x, title, color, soft, items, mark) => `<rect x="${x}" y="14" width="296" height="312" rx="16" fill="${soft}" stroke="${color}" stroke-width="2"/>`
        + `<rect x="${x}" y="14" width="296" height="50" rx="16" fill="${color}"/><rect x="${x}" y="48" width="296" height="16" fill="${color}"/>`
        + text(x + 148, 47, title, { size: 21, weight: 700, fill: '#fff' })
        + items.map((t, i) => mark(x + 266, 102 + i * 60) + text(x + 244, 108 + i * 60, t, { size: 16, weight: 600, anchor: 'start' })).join('');
      return svg(640, 340, 'أخلاقيات التواصل عبر الإنترنت',
        col(330, 'افعل', '#1f8f5c', '#e2f4e8', ['اكتب رسائل مختصرة', 'احترم الآخرين وكن إيجابيًا', 'ساعد أصدقاءك وودّعهم', 'أخبر شخصًا كبيرًا في الأسرة'], check)
        + col(14, 'لا تفعل', C.rose, C.roseSoft, ['لا تجادل ولا تلم أحدًا', 'لا تستخدم عبارات سيئة', 'لا تتحدث مع من لا تعرفهم', 'لا ترسل وأنت غاضب'], cross));
    },

    'g4-personal-info'() {
      const item = (cx, cy, label, icon) => `<circle cx="${cx}" cy="${cy}" r="40" fill="#fff" stroke="${C.line}" stroke-width="2"/>` + icon(cx, cy)
        + cross(cx + 30, cy - 30) + text(cx, cy + 66, label, { size: 16, weight: 700 });
      return svg(640, 320, 'معلومات شخصية لا نشاركها',
        `<circle cx="320" cy="150" r="74" fill="${C.soft}"/>` + shield(320, 146, 1.4)
        + `<rect x="304" y="140" width="32" height="26" rx="4" fill="#fff"/><path d="M308 140 v-8 a12 12 0 0 1 24 0 v8" fill="none" stroke="#fff" stroke-width="5"/>`
        + item(530, 80, 'العمر', (x, y) => text(x, y + 10, '10', { size: 28, weight: 700, fill: C.right, ltr: true }))
        + item(530, 220, 'رقم الهاتف', (x, y) => phone(x, y + 4).replace(/<rect x="[\d.]+" y="[\d.]+" width="30"/, (m) => m))
        + item(110, 80, 'عنوان المنزل', (x, y) => poly([[x, y - 22], [x + 24, y - 2], [x - 24, y - 2]], C.right) + `<rect x="${x - 16}" y="${y - 3}" width="32" height="24" fill="${C.left}"/><rect x="${x - 5}" y="${y + 6}" width="10" height="15" fill="#fff"/>`)
        + item(110, 220, 'الصور الشخصية', (x, y) => `<rect x="${x - 24}" y="${y - 18}" width="48" height="38" rx="5" fill="${C.soft}" stroke="${C.right}" stroke-width="3"/><circle cx="${x}" cy="${y - 2}" r="8" fill="${C.right}"/><path d="M${x - 16} ${y + 18} q16 -18 32 0" fill="${C.right}"/>`)
        + text(320, 270, 'لا تعطِ معلوماتك لمن لا تعرفهم', { size: 18, weight: 700, fill: C.rose })
        + text(320, 298, 'وأخبر شخصًا كبيرًا في الأسرة فورًا', { size: 15, weight: 600, fill: C.muted }));
    },

    'g4-antivirus'() {
      return svg(640, 320, 'برنامج مكافحة الفيروسات يحمي الحاسب',
        `<rect x="330" y="40" width="250" height="170" rx="12" fill="${C.ink}"/><rect x="344" y="54" width="222" height="142" rx="6" fill="#e6f3fb"/>`
        + `<rect x="440" y="210" width="30" height="34" fill="${C.ink}"/><rect x="400" y="244" width="110" height="10" rx="5" fill="${C.ink}"/>`
        + shield(455, 128, 1.2) + `<path d="M440 128 l11 12 l20 -24" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
        + virus(110, 80) + virus(70, 170, 12) + virus(170, 210, 13)
        + arrow(140, 95, 250, 120, C.rose) + arrow(100, 168, 250, 150, C.rose) + arrow(196, 200, 250, 180, C.rose)
        + `<rect x="262" y="96" width="14" height="104" rx="7" fill="${C.right}"/>`
        + text(455, 290, 'ثبّت برنامج مكافحة الفيروسات وحدّثه دائمًا', { size: 17, weight: 700 })
        + text(130, 290, 'الفيروس يحذف الملفات', { size: 15, weight: 600, fill: C.rose })
        + text(130, 312, 'أو يسرق المعلومات', { size: 15, weight: 600, fill: C.rose }));
    },

    // ------------------------------------------------------------ unit 4
    'g4-algorithm'() {
      return steps('خوارزمية صنع شطيرة الجبن', [
        ['شريحة خبز', 'خذ شريحة واحدة'],
        ['أضف الجبن', 'فوق الخبز'],
        ['شريحة ثانية', 'فوق الجبن'],
        ['حمّصها', '3 دقائق ثم قدّمها'],
      ], [
        (x, y) => bread(x, y),
        (x, y) => bread(x, y + 6) + cheese(x, y - 18),
        (x, y) => bread(x, y + 10, '#d9a35a') + cheese(x, y - 6) + bread(x, y - 4),
        (x, y) => toaster(x, y + 6),
      ]);
    },

    'g4-scratch-ui'() {
      const region = (x, y, w, h, fill, stroke, label, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
        + text(x + w / 2, y + 30, label, { size: 17, weight: 700 })
        + (sub ? text(x + w / 2, y + 52, sub, { size: 13, weight: 500, fill: C.muted }) : '');
      return svg(640, 360, 'واجهة سكراتش',
        `<rect x="14" y="14" width="612" height="40" rx="10" fill="#4c97ff"/>`
        + text(600, 40, 'القائمة: ملف · تحرير · تغيير اللغة', { size: 15, weight: 700, fill: '#fff', anchor: 'start' })
        + `<rect x="34" y="22" width="90" height="24" rx="12" fill="#ff8c1a"/>` + text(79, 39, 'مشاركة', { size: 13, weight: 700, fill: '#fff' })
        + [0, 1, 2, 3, 4].map((k) => `<circle cx="606" cy="${88 + k * 34}" r="9" fill="${['#4c97ff', '#9966ff', '#cf63cf', '#ffbf00', '#ffab19'][k]}"/>`).join('')
        + region(450, 66, 140, 280, '#f4f8ff', '#9cbcf0', 'لوحة اللبنات', 'البرمجية')
        + sblock(580, 150, 116, 'تحرك 10', '#4c97ff', 14) + sblock(580, 198, 116, 'قل مرحبًا', '#9966ff', 14)
        + region(232, 66, 206, 280, '#fbfcfd', C.line, 'منطقة البرمجة', 'نسحب اللبنات إليها')
        + hat(410, 170, 150, 'عند نقر', '#ffbf00', true) + sblock(410, 214, 150, 'قل مرحبًا', '#9966ff', 14)
        + `<rect x="14" y="66" width="206" height="160" rx="10" fill="#e6f3fb" stroke="#9cbcf0" stroke-width="2"/>`
        + sprite(80, 150, 0.7) + text(170, 210, 'المنصة', { size: 17, weight: 700 })
        + `<path d="M28 84 v-10 l10 4 z" fill="#4cbf56"/><circle cx="52" cy="80" r="6" fill="${C.rose}"/>`
        + region(14, 236, 206, 110, '#fbfcfd', C.line, 'لوحة الكائنات', 'الكائن: القطة') + sprite(60, 312, 0.35));
    },

    'g4-block-categories'() {
      const rows = [
        ['الحركة', '#4c97ff', 'تحرك (10) خطوة', 'تحريك الكائن على المنصة'],
        ['الهيئة', '#9966ff', 'قل (مرحبًا!)', 'تغيير مظهر الكائن'],
        ['الصوت', '#cf63cf', 'شغّل الصوت', 'تشغيل الأصوات وتسجيلها'],
        ['الأحداث', '#ffbf00', 'عند نقر العلم', 'تحدد متى يبدأ المشروع'],
        ['التحكم', '#ffab19', 'كرّر (10) مرة', 'التحكم في البرنامج'],
      ];
      return svg(640, 330, 'فئات اللبنات البرمجية',
        rows.map(([name, color, block, job], i) => {
          const y = 14 + i * 62;
          return `<rect x="14" y="${y}" width="612" height="54" rx="12" fill="#fff" stroke="${C.line}" stroke-width="2"/>`
            + `<circle cx="600" cy="${y + 27}" r="14" fill="${color}"/>`
            + text(576, y + 34, name, { size: 18, weight: 700, anchor: 'start' })
            + (i === 3 ? hat(470, y + 2, 170, block, color, true) : sblock(470, y + 7, 170, block, color, 15))
            + text(276, y + 33, job, { size: 15, weight: 600, fill: C.muted, anchor: 'start' });
        }).join(''));
    },

    'g4-repeat-story'() {
      return svg(640, 350, 'لبنة كرّر تعيد الأوامر عدة مرات',
        card(330, 14, 296, 322)
        + hat(600, 30, 244, 'عند نقر', '#ffbf00', true)
        + cblock(600, 78, 244, 176, 'كرّر (3) مرة', '#ffab19')
        + sblock(578, 122, 208, 'تحرك (100) خطوة', '#4c97ff', 15)
        + sblock(578, 166, 208, 'شغّل الصوت حتى انتهائه', '#cf63cf', 14)
        + sblock(578, 210, 208, 'انتظر (1) ثانية', '#ffab19', 15)
        + sblock(578, 254, 208, 'قل (هل يوجد أحد هنا؟)', '#9966ff', 14)
        + card(14, 14, 304, 322, '#e6f3fb', '#9cbcf0')
        + `<rect x="15" y="230" width="302" height="104" rx="0" fill="#c9b79c"/><path d="M14 230 H318" stroke="#a48a66" stroke-width="3"/>`
        + [0, 1, 2].map((k) => sprite(64 + k * 94, 200, 0.6).replace('<g ', `<g opacity="${k === 2 ? 1 : 0.4}" `) + badge(64 + k * 94, 140, String(k + 1))).join('')
        + arrow(84, 112, 254, 112, C.amber)
        + text(166, 270, 'تتكرر الأوامر 3 مرات', { size: 17, weight: 700 })
        + text(166, 296, 'دون أن نكتبها 3 مرات', { size: 14, weight: 500, fill: C.ink }));
    },

    'g4-pen-updown'() {
      const pen = (x, y, label, color) => `<rect x="${x - 120}" y="${y - 20}" width="120" height="40" rx="8" fill="#0fbd8c"/>` + text(x - 14, y + 6, label, { size: 15, weight: 700, fill: '#fff', anchor: 'start' });
      return svg(640, 260, 'إنزال القلم ورفعه',
        card(14, 14, 612, 108)
        + pen(610, 68, 'أنزل القلم') + line(470, 68, 120, 68, C.blue, 5) + sprite(80, 76, 0.55)
        + text(300, 106, 'خط متصل: الكائن يترك أثرًا', { size: 14, weight: 600, fill: C.muted })
        + card(14, 136, 612, 108)
        + pen(610, 190, 'أنزل ثم ارفع') + [0, 1, 2, 3, 4].map((k) => line(470 - k * 72, 190, 434 - k * 72, 190, C.blue, 5)).join('') + sprite(80, 198, 0.55)
        + text(300, 228, 'أنزل القلم ثم ارفعه: خط متقطع', { size: 14, weight: 600, fill: C.muted }));
    },

    'g4-pen-shapes'() {
      const poly2 = (pts, color) => `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>`;
      return panels('رسم الأشكال بالقلم والتكرار', 330, [
        { title: 'المربع', sub: 'كرّر 4 · تحرك 100 · استدر 90', draw: (x) => poly2([[x - 55, 50], [x + 55, 50], [x + 55, 160], [x - 55, 160]], C.blue) + badge(x + 70, 44, '4') },
        { title: 'المثلث', sub: 'كرّر 3 · تحرك 100 · استدر 120', draw: (x) => poly2([[x, 40], [x + 66, 160], [x - 66, 160]], C.rose) + badge(x + 70, 44, '3') },
        { title: 'الدائرة', sub: 'كرّر 36 · تحرك 20 · استدر 10', draw: (x) => `<circle cx="${x}" cy="102" r="62" fill="none" stroke="#8a5cd6" stroke-width="5" stroke-dasharray="11 2"/>` + badge(x + 70, 44, '36') },
      ]);
    },
  });
})();
