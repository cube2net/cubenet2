// Grade 5 · Term 1 · Units 1–2 (computer basics, files, documents).
(function () {
  const { C, svg, text, poly, line, arrow, badge, panels, steps, head, globe, monitor, phone, printer, gamepad, cube, shadow } = window.VisualKit;

  const tile = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`;
  const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${extra} fill="${fill}"/>`;
  const circle = (cx, cy, r, fill, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;
  const GREY = '#e1e7ea', GREY2 = '#bcc7cc', GREY3 = '#9eabb1', FOLDER = '#f7c27a';

  // ---- small device icons (centered on cx, cy) ----
  function desktop(cx, cy) {
    return rect(cx - 50, cy - 30, 22, 60, GREY2, `rx="4" stroke="${C.ink}" stroke-width="2.5"`)
      + circle(cx - 39, cy - 16, 3.5, C.amber) + line(cx - 45, cy + 4, cx - 33, cy + 4, C.ink, 2)
      + monitor(cx + 17, cy - 2);
  }
  function laptop(cx, cy) {
    return rect(cx - 38, cy - 34, 76, 50, C.paper, `rx="5" stroke="${C.ink}" stroke-width="3"`)
      + rect(cx - 31, cy - 28, 62, 38, C.soft, 'rx="2"') + cube(cx, cy - 6, 11)
      + poly([[cx - 46, cy + 18], [cx + 46, cy + 18], [cx + 54, cy + 30], [cx - 54, cy + 30]], C.ink)
      + rect(cx - 12, cy + 21, 24, 5, GREY3, 'rx="2"');
  }
  function tablet(cx, cy) {
    return rect(cx - 30, cy - 40, 60, 80, C.ink, 'rx="9"') + rect(cx - 24, cy - 33, 48, 62, C.soft, 'rx="3"')
      + cube(cx, cy - 2, 12) + circle(cx, cy + 34, 2.5, GREY3);
  }
  function keyboard(cx, cy, w = 70) {
    let keys = '';
    const cols = Math.floor((w - 8) / 10);
    for (let r = 0; r < 3; r++) for (let c = 0; c < cols; c++) keys += rect(cx - w / 2 + 6 + c * 10, cy - 13 + r * 9, 7, 6, GREY2, 'rx="1"');
    return rect(cx - w / 2, cy - 18, w, 36, C.paper, `rx="5" stroke="${C.ink}" stroke-width="2.5"`) + keys
      + rect(cx - 18, cy + 9 + 2, 36, 0.1, C.paper);
  }
  function chip(cx, cy) {
    let pins = '';
    for (let i = -2; i <= 2; i++) {
      pins += line(cx + i * 9, cy - 26, cx + i * 9, cy - 34, C.amber, 3) + line(cx + i * 9, cy + 26, cx + i * 9, cy + 34, C.amber, 3)
        + line(cx - 26, cy + i * 9, cx - 34, cy + i * 9, C.amber, 3) + line(cx + 26, cy + i * 9, cx + 34, cy + i * 9, C.amber, 3);
    }
    return pins + rect(cx - 26, cy - 26, 52, 52, C.right, 'rx="5"') + rect(cx - 14, cy - 14, 28, 28, C.top, 'rx="3"')
      + text(cx, cy + 5, 'CPU', { size: 11, weight: 700, fill: C.ink, ltr: true });
  }
  function hdd(cx, cy) {
    return rect(cx - 26, cy - 32, 52, 64, GREY2, `rx="6" stroke="${C.ink}" stroke-width="2.5"`)
      + circle(cx, cy - 6, 18, C.paper, `stroke="${GREY3}" stroke-width="2"`) + circle(cx, cy - 6, 4, GREY3)
      + line(cx + 16, cy + 22, cx + 4, cy - 2, C.amber, 4) + circle(cx + 17, cy + 23, 4, C.ink);
  }
  function doc(cx, cy, k = 1, band = C.blue) {
    const w = 40 * k, h = 52 * k, x = cx - w / 2, y = cy - h / 2, f = 11 * k;
    let rows = '';
    for (let i = 0; i < 3; i++) rows += line(x + 8 * k, y + 24 * k + i * 8 * k, x + w - 8 * k, y + 24 * k + i * 8 * k, C.line, 3 * k);
    return `<path d="M${x} ${y} H${x + w - f} L${x + w} ${y + f} V${y + h} H${x} Z" fill="${C.paper}" stroke="${C.ink}" stroke-width="${2.5 * k}" stroke-linejoin="round"/>`
      + poly([[x + w - f, y], [x + w, y + f], [x + w - f, y + f]], C.line)
      + rect(x + 6 * k, y + 8 * k, w - 20 * k, 8 * k, band, `rx="${2 * k}"`) + rows;
  }
  function shortcutMark(x, y) {
    return rect(x - 11, y - 11, 22, 22, C.paper, `rx="3" stroke="${C.ink}" stroke-width="2"`)
      + `<path d="M${x - 5} ${y + 6} Q${x - 5} ${y - 4} ${x + 4} ${y - 4}" fill="none" stroke="${C.blue}" stroke-width="3"/>`
      + head(x - 3, y - 4, x + 7, y - 4, C.blue);
  }
  function folder(cx, cy, k = 1, zipped = false) {
    const w = 84 * k, h = 62 * k, x = cx - w / 2, y = cy - h / 2;
    let zip = '';
    if (zipped) {
      zip += rect(cx - 7 * k, y + 2 * k, 14 * k, h - 4 * k, '#8a6a2f', `rx="${2 * k}"`);
      for (let i = 0; i < 6; i++) zip += rect(cx - 5 * k, y + 6 * k + i * 9 * k, 10 * k, 4 * k, '#e9d9a8');
    }
    return `<path d="M${x} ${y - 8 * k} H${x + 30 * k} L${x + 38 * k} ${y} H${x + w} V${y + h} H${x} Z" fill="#eba046"/>`
      + rect(x, y + 6 * k, w, h - 6 * k, FOLDER, `rx="${4 * k}"`) + zip;
  }

  Object.assign(window.Visuals, {
    // ---------------- Unit 1 · Lesson 1 ----------------
    'g5-computer-types'() {
      const xs = [482, 326, 170, 14];
      const items = [
        ['حاسب مكتبي', 'Desktop', desktop], ['حاسب محمول', 'Laptop', laptop],
        ['حاسب لوحي', 'Tablet', tablet], ['هاتف ذكي', 'Smartphone', (cx, cy) => phone(cx, cy)],
      ];
      return svg(640, 220, 'أنواع أجهزة الحاسب', items.map(([t, en, icon], i) => {
        const x = xs[i];
        return tile(x, 14, 144, 192) + `<g transform="translate(${x + 72} 88) scale(1.22) translate(${-x - 72} -88)">${icon(x + 72, 88)}</g>`
          + text(x + 72, 166, t, { size: 17, weight: 700 }) + text(x + 72, 190, en, { size: 13, weight: 500, fill: C.muted, ltr: true });
      }).join(''));
    },

    'g5-interactive-tools'() {
      const xs = [430, 222, 14], ys = [14, 168];
      const icons = [
        ['لوحة اللمس', 'Touchpad', (cx, cy) => rect(cx - 44, cy - 30, 88, 56, C.soft, `rx="8" stroke="${C.ink}" stroke-width="3"`)
          + line(cx, cy + 12, cx, cy + 26, C.ink, 2) + line(cx - 44, cy + 12, cx + 44, cy + 12, C.ink, 2)
          + circle(cx + 4, cy - 10, 14, 'none', `stroke="${C.amber}" stroke-width="2.5"`) + circle(cx + 4, cy - 10, 6, C.amber)],
        ['شاشة اللمس', 'Touchscreen', (cx, cy) => rect(cx - 42, cy - 34, 84, 62, C.ink, 'rx="8"') + rect(cx - 36, cy - 28, 72, 50, C.soft, 'rx="3"')
          + rect(cx - 28, cy - 20, 22, 16, C.top, 'rx="3"') + rect(cx + 2, cy - 20, 22, 16, C.top, 'rx="3"') + rect(cx - 28, cy, 22, 16, C.top, 'rx="3"')
          + circle(cx + 13, cy + 8, 13, 'none', `stroke="${C.amber}" stroke-width="2.5"`) + circle(cx + 13, cy + 8, 5, C.amber)],
        ['لوح الرسم', 'Graphic tablet', (cx, cy) => poly([[cx - 50, cy + 22], [cx + 34, cy + 22], [cx + 50, cy - 26], [cx - 34, cy - 26]], C.right)
          + poly([[cx - 40, cy + 16], [cx + 28, cy + 16], [cx + 40, cy - 20], [cx - 28, cy - 20]], C.soft)
          + `<path d="M${cx - 22} ${cy + 6} q12 -22 24 -6 t22 -10" fill="none" stroke="${C.blue}" stroke-width="3"/>`
          + line(cx + 22, cy - 10, cx + 46, cy - 40, C.amber, 6) + poly([[cx + 22, cy - 10], [cx + 20, cy - 2], [cx + 27, cy - 6]], C.ink)],
        ['كرة التتبع', 'Trackball', (cx, cy) => `<path d="M${cx - 50} ${cy + 22} Q${cx - 46} ${cy - 30} ${cx} ${cy - 32} Q${cx + 46} ${cy - 30} ${cx + 50} ${cy + 22} Z" fill="${GREY2}" stroke="${C.ink}" stroke-width="2.5"/>`
          + circle(cx - 4, cy - 6, 20, C.rose) + circle(cx - 10, cy - 12, 6, '#fff', 'opacity="0.5"')],
        ['لوحة الألعاب', 'Gamepad', (cx, cy) => `<g transform="translate(${cx} ${cy}) scale(1.25) translate(${-cx} ${-cy})">${gamepad(cx, cy)}</g>`],
        ['نظارات الواقع الافتراضي', 'VR headset', (cx, cy) => line(cx - 50, cy - 4, cx - 64, cy - 14, C.ink, 5) + line(cx + 50, cy - 4, cx + 64, cy - 14, C.ink, 5)
          + rect(cx - 52, cy - 26, 104, 50, C.blue, 'rx="14"') + circle(cx - 22, cy, 13, '#d6eef8') + circle(cx + 22, cy, 13, '#d6eef8')
          + text(cx, cy - 15, 'VR', { size: 11, weight: 700, fill: '#fff', ltr: true })],
      ];
      return svg(640, 322, 'أدوات الحاسب التفاعلية', icons.map(([t, en, icon], i) => {
        const x = xs[i % 3], y = ys[Math.floor(i / 3)];
        return tile(x, y, 196, 140) + icon(x + 98, y + 54)
          + text(x + 98, y + 108, t, { size: i === 5 ? 15 : 16, weight: 700 }) + text(x + 98, y + 128, en, { size: 12, weight: 500, fill: C.muted, ltr: true });
      }).join(''));
    },

    'g5-ipo'() {
      return steps('عمل الحاسب: الإدخال ثم المعالجة ثم التخزين ثم الإخراج',
        [['الإدخال', 'نستقبل البيانات'], ['المعالجة', 'وحدة المعالجة'], ['التخزين', 'نحفظ البيانات'], ['الإخراج', 'نعرض النتائج']],
        [(x, y) => keyboard(x, y), chip, hdd, monitor]);
    },

    // ---------------- Unit 1 · Lesson 2 ----------------
    'g5-system-unit'() {
      const parts = [
        ['اللوحة الأم', 'Motherboard'], ['وحدة المعالجة المركزية', 'CPU'], ['ذاكرة الوصول العشوائي', 'RAM'],
        ['القرص الصلب', 'Hard Disc'], ['مزود الطاقة', 'Power Supply'], ['محرك الأقراص', 'CD & DVD Drive'],
      ];
      let traces = '';
      for (let i = 0; i < 5; i++) traces += line(66, 230 + i * 12, 226, 230 + i * 12, '#1b7a66', 2);
      const caseArt = rect(36, 18, 280, 296, GREY, `rx="14" stroke="${C.ink}" stroke-width="3"`)
        // power supply
        + rect(54, 34, 104, 64, GREY3, `rx="5" stroke="${C.ink}" stroke-width="2"`)
        + circle(106, 66, 24, GREY, `stroke="${C.ink}" stroke-width="2"`) + line(84, 66, 128, 66, C.ink, 2) + line(106, 44, 106, 88, C.ink, 2)
        // DVD drive
        + rect(176, 38, 124, 30, C.paper, `rx="4" stroke="${C.ink}" stroke-width="2"`) + line(190, 56, 262, 56, C.ink, 2.5) + circle(286, 53, 4, C.amber)
        // motherboard
        + rect(54, 112, 186, 188, C.left, 'rx="6"') + traces
        // CPU
        + rect(76, 134, 60, 60, '#cfdcd7', `rx="4" stroke="${C.ink}" stroke-width="2"`) + rect(90, 148, 32, 32, C.right, 'rx="3"')
        // RAM
        + rect(162, 126, 13, 84, C.blue, `rx="2" stroke="${C.ink}" stroke-width="1.5"`) + rect(184, 126, 13, 84, C.blue, `rx="2" stroke="${C.ink}" stroke-width="1.5"`)
        // hard disc
        + rect(252, 172, 52, 96, GREY2, `rx="5" stroke="${C.ink}" stroke-width="2"`) + circle(278, 206, 18, C.paper, `stroke="${GREY3}" stroke-width="2"`) + circle(278, 206, 4, GREY3)
        // badges
        + badge(70, 284, '1') + badge(136, 134, '2') + badge(208, 126, '3') + badge(298, 172, '4') + badge(158, 40, '5') + badge(296, 34, '6');
      const list = parts.map(([t, en], i) => {
        const y = 42 + i * 50;
        return badge(612, y, String(i + 1)) + text(590, y + 2, t, { size: 18, weight: 700, anchor: 'start' })
          + text(590, y + 24, en, { size: 13, weight: 500, fill: C.muted, anchor: 'end', ltr: true });
      }).join('');
      return svg(640, 330, 'المكونات الرئيسة داخل وحدة النظام', caseArt + list);
    },

    'g5-storage'() {
      const xs = [482, 326, 170, 14];
      const items = [
        ['الذاكرة الفلاشية', 'Flash memory', (cx, cy) => rect(cx - 42, cy - 14, 60, 30, C.right, 'rx="6"') + rect(cx + 18, cy - 9, 24, 20, GREY2, `rx="2" stroke="${C.ink}" stroke-width="1.5"`)
          + rect(cx + 26, cy - 4, 5, 4, C.ink) + rect(cx + 33, cy - 4, 5, 4, C.ink)
          + circle(cx - 50, cy + 1, 7, 'none', `stroke="${C.ink}" stroke-width="2.5"`) + text(cx - 12, cy + 6, '64GB', { size: 11, weight: 700, fill: '#fff', ltr: true })],
        ['الأقراص المضغوطة', 'CD / DVD', (cx, cy) => circle(cx + 10, cy - 4, 34, '#d6eef8', `stroke="${C.blue}" stroke-width="2"`)
          + circle(cx - 8, cy + 4, 36, '#fbe7c4', `stroke="${C.amber}" stroke-width="2"`) + circle(cx - 8, cy + 4, 10, C.paper, `stroke="${C.amber}" stroke-width="2"`)
          + `<path d="M${cx - 34} ${cy - 6} A28 28 0 0 1 ${cx - 18} ${cy - 22}" fill="none" stroke="#fff" stroke-width="4"/>`],
        ['القرص الصلب الخارجي', 'External hard disc', (cx, cy) => rect(cx - 30, cy - 34, 60, 70, C.ink, 'rx="10"') + rect(cx - 22, cy - 26, 44, 4, '#33444d', 'rx="2"')
          + circle(cx + 18, cy + 26, 4, C.amber) + `<path d="M${cx - 10} ${cy + 36} q0 14 -24 14 h-20" fill="none" stroke="${C.ink}" stroke-width="3"/>`],
        ['بطاقة الذاكرة', 'SD / MicroSD', (cx, cy) => poly([[cx - 40, cy - 30], [cx + 2, cy - 30], [cx + 14, cy - 18], [cx + 14, cy + 32], [cx - 40, cy + 32]], C.blue)
          + text(cx - 13, cy + 10, 'SD', { size: 18, weight: 700, fill: '#fff', ltr: true })
          + poly([[cx + 24, cy - 6], [cx + 40, cy - 6], [cx + 46, cy], [cx + 46, cy + 32], [cx + 24, cy + 32]], C.rose)
          + text(cx + 35, cy + 20, 'µ', { size: 13, weight: 700, fill: '#fff', ltr: true })],
      ];
      return svg(640, 220, 'أجهزة التخزين الخارجية', items.map(([t, en, icon], i) => {
        const x = xs[i];
        return tile(x, 14, 144, 192) + icon(x + 72, 88)
          + text(x + 72, 166, t, { size: 15, weight: 700 }) + text(x + 72, 190, en, { size: 12, weight: 500, fill: C.muted, ltr: true });
      }).join(''));
    },

    'g5-io-devices'() {
      const pill = (x, y, w, label, fill, color) => rect(x, y, w, 38, fill, 'rx="19"') + text(x + w / 2, y + 25, label, { size: 15, weight: 700, fill: color });
      const ins = ['لوحة المفاتيح', 'الفأرة', 'الميكروفون', 'الماسح الضوئي', 'كاميرا الويب'];
      const outs = ['الشاشة', 'مكبرات الصوت', 'سماعات الرأس', 'الطابعة'];
      let body = text(540, 34, 'أجهزة الإدخال', { size: 19, weight: 700, fill: C.right })
        + text(100, 34, 'أجهزة الإخراج', { size: 19, weight: 700, fill: C.amber });
      ins.forEach((t, i) => { body += pill(462, 52 + i * 48, 156, t, C.soft, C.ink); });
      outs.forEach((t, i) => { body += pill(22, 76 + i * 48, 156, t, '#fdebd3', C.ink); });
      body += rect(246, 98, 148, 100, C.paper, `rx="10" stroke="${C.ink}" stroke-width="3"`) + rect(256, 108, 128, 80, C.soft, 'rx="4"')
        + cube(320, 152, 22) + rect(312, 198, 16, 14, C.ink) + rect(286, 212, 68, 6, C.ink, 'rx="3"')
        + text(320, 248, 'الحاسب يعالج البيانات', { size: 15, weight: 700, fill: C.muted })
        + arrow(452, 148, 404, 148, C.right) + arrow(236, 148, 188, 148, C.amber);
      return svg(640, 300, 'أجهزة الإدخال وأجهزة الإخراج', body);
    },

    'g5-printers'() {
      const big = (x, y) => `<g transform="translate(${x} ${y}) scale(1.5) translate(${-x} ${-y})">${printer(x, y)}</g>`;
      return panels('أنواع الطابعات', 286, [
        { title: 'النافثة للحبر', sub: 'Inkjet · أربعة ألوان', draw: (x) => big(x, 104)
          + circle(x - 36, 178, 8, C.blue) + circle(x - 12, 178, 8, '#f2c94c') + circle(x + 12, 178, 8, C.rose) + circle(x + 36, 178, 8, C.ink) },
        { title: 'الليزر', sub: 'Laser · سريعة وعالية الجودة', draw: (x) => big(x, 104)
          + line(x - 60, 176, x + 60, 176, C.rose, 3, 'stroke-dasharray="10 6"') + circle(x - 64, 176, 5, C.rose) },
        { title: 'ثلاثية الأبعاد', sub: '3D · تطبع مجسمات', draw: (x) => rect(x - 52, 44, 104, 128, 'none', `rx="6" stroke="${C.ink}" stroke-width="3"`)
          + line(x - 52, 62, x + 52, 62, C.ink, 3) + rect(x - 10, 62, 20, 18, C.rose, 'rx="3"') + line(x, 80, x, 92, C.ink, 3)
          + shadow(x, 158, 34) + cube(x, 140, 24, 'amber') + line(x - 46, 160, x + 46, 160, C.ink, 4) },
      ]);
    },

    // ---------------- Unit 1 · Lesson 3 ----------------
    'g5-file-size'() {
      const units = [['بايت', 'Byte', 16], ['كيلوبايت', 'KB', 26], ['ميجابايت', 'MB', 38], ['جيجابايت', 'GB', 52]];
      const xs = [548, 400, 252, 104];
      let body = '';
      units.forEach(([t, sub, s], i) => {
        const x = xs[i];
        body += shadow(x, 118 + 4, s * 1.1) + cube(x, 118 - s, s)
          + text(x, 156, t, { size: 19, weight: 700 }) + text(x, 180, sub, { size: 13, weight: 500, fill: C.muted, ltr: true });
        if (i < 3) body += arrow(x - 40, 92, xs[i + 1] + 50, 92, C.amber);
      });
      body += rect(170, 200, 300, 34, C.soft, 'rx="17"') + text(320, 223, '1 كيلوبايت = 1024 بايت', { size: 16, weight: 700, fill: C.right });
      return svg(640, 246, 'وحدات قياس حجم الملف', body);
    },

    'g5-shortcut'() {
      const body = tile(360, 14, 266, 196) + text(493, 44, 'مجلد المستندات', { size: 17, weight: 700 })
        + folder(493, 110, 1.4) + doc(493, 118, 0.9)
        + text(493, 190, 'الملف الأصلي يبقى في مكانه', { size: 14, weight: 600, fill: C.muted })
        + rect(14, 14, 266, 196, '#2f6fb0', 'rx="18"') + text(147, 44, 'سطح المكتب', { size: 17, weight: 700, fill: '#fff' })
        + rect(14, 178, 266, 32, '#1f4f80', 'rx="0"') + rect(14, 194, 266, 16, '#1f4f80', 'rx="0"')
        + doc(147, 106, 0.9) + shortcutMark(134, 124) + text(147, 162, 'اختصار', { size: 15, weight: 700, fill: '#fff' })
        + `<path d="M186 104 Q320 52 446 104" fill="none" stroke="${C.amber}" stroke-width="3.5" stroke-dasharray="8 7"/>` + head(400, 84, 446, 104, C.amber)
        + rect(272, 56, 96, 28, C.amber, 'rx="14"') + text(320, 76, 'رابط فقط', { size: 14, weight: 700, fill: '#fff' })
        + text(320, 244, 'حذف الاختصار يحذف الرابط فقط، ولا يؤثر في الملف الأصلي.', { size: 15, weight: 600, fill: C.ink });
      return svg(640, 262, 'الاختصار رابط إلى الملف الأصلي', body);
    },

    'g5-zip'() {
      const files = (cx, cy) => doc(cx - 24, cy + 4, 0.75, C.blue) + doc(cx, cy - 4, 0.75, C.rose) + doc(cx + 24, cy + 4, 0.75, C.right);
      const body = tile(456, 14, 170, 196) + folder(541, 92, 1.25) + files(541, 96)
        + text(541, 160, 'مجلد عادي', { size: 18, weight: 700 }) + text(541, 186, '900 KB', { size: 15, weight: 700, fill: C.muted, ltr: true })
        + tile(235, 14, 170, 196) + folder(320, 92, 1.25, true)
        + text(320, 160, 'مجلد مضغوط', { size: 18, weight: 700 }) + text(320, 186, '300 KB', { size: 15, weight: 700, fill: C.right, ltr: true })
        + tile(14, 14, 170, 196) + files(99, 92)
        + text(99, 160, 'ملفات مستخرجة', { size: 18, weight: 700 }) + text(99, 186, 'استخراج الكل', { size: 14, weight: 600, fill: C.muted })
        + arrow(450, 112, 412, 112, C.amber) + arrow(229, 112, 191, 112, C.blue)
        + rect(400, 222, 62, 28, C.amber, 'rx="14"') + text(431, 241, 'ضغط', { size: 14, weight: 700, fill: '#fff' })
        + rect(170, 222, 80, 28, C.blue, 'rx="14"') + text(210, 241, 'استخراج', { size: 14, weight: 700, fill: '#fff' });
      return svg(640, 258, 'ضغط المجلد واستخراج الملفات منه', body);
    },

    'g5-recycle-bin'() {
      const bin = (cx, cy) => rect(cx - 34, cy - 30, 68, 80, '#d6eef8', `rx="6" stroke="${C.blue}" stroke-width="3"`)
        + rect(cx - 42, cy - 42, 84, 12, C.blue, 'rx="4"') + rect(cx - 12, cy - 50, 24, 10, C.blue, 'rx="3"')
        + line(cx - 14, cy - 18, cx - 14, cy + 38, C.blue, 3) + line(cx, cy - 18, cx, cy + 38, C.blue, 3) + line(cx + 14, cy - 18, cx + 14, cy + 38, C.blue, 3);
      const opt = (y, t, sub, fill) => rect(30, y, 300, 52, fill, 'rx="14"') + text(310, y + 23, t, { size: 18, weight: 700, anchor: 'start' })
        + text(310, y + 43, sub, { size: 13, weight: 500, fill: C.muted, anchor: 'start' });
      const body = tile(410, 14, 216, 222) + bin(518, 120) + doc(470, 50, 0.6)
        + arrow(482, 62, 504, 80, C.amber)
        + text(518, 210, 'سلة المحذوفات', { size: 18, weight: 700 })
        + opt(22, 'استعادة', 'يعود الملف إلى موقعه السابق', C.soft)
        + opt(92, 'قص', 'ننقل الملف إلى مكان آخر', '#dcebf7')
        + opt(162, 'حذف', 'يُحذف الملف نهائيًا', C.roseSoft)
        + arrow(400, 124, 344, 124, C.ink);
      return svg(640, 250, 'خيارات سلة المحذوفات', body);
    },

    // ---------------- Unit 2 · Lesson 1 ----------------
    'g5-picture-sources'() {
      const shapes = (x) => poly([[x - 50, 110], [x - 20, 60], [x + 10, 110]], C.top) + circle(x + 34, 84, 26, '#fdebd3', `stroke="${C.amber}" stroke-width="3"`)
        + arrow(x - 40, 136, x + 46, 136, C.blue);
      const pic = (x) => rect(x - 52, 52, 104, 76, C.soft, `rx="6" stroke="${C.ink}" stroke-width="3"`)
        + poly([[x - 44, 120], [x - 14, 82], [x + 10, 108], [x + 24, 94], [x + 44, 120]], C.right) + circle(x + 26, 70, 9, C.amber);
      return panels('مصادر الرسومات في المستند', 260, [
        { title: 'صور', sub: 'من جهاز الحاسب', draw: (x) => pic(x) },
        { title: 'صور عبر الإنترنت', sub: 'بالبحث بكلمة', draw: (x) => globe(x - 20, 90) + rect(x + 6, 100, 50, 30, C.paper, `rx="6" stroke="${C.ink}" stroke-width="2.5"`) + line(x + 14, 115, x + 46, 115, C.line, 4) },
        { title: 'أشكال', sub: 'أسهم ودوائر ومثلثات', draw: shapes },
      ]);
    },

    'g5-wrap-text'() {
      const pic = (x, y, w, h, op = 1) => `<g opacity="${op}">` + rect(x, y, w, h, C.soft, 'rx="4"')
        + poly([[x + 4, y + h - 4], [x + w * 0.35, y + h * 0.4], [x + w * 0.6, y + h - 4]], C.right)
        + poly([[x + w * 0.45, y + h - 4], [x + w * 0.7, y + h * 0.55], [x + w - 4, y + h - 4]], C.left) + circle(x + w - 14, y + 14, 7, C.amber) + '</g>';
      const lines = (x, skip, inside) => {
        let out = '';
        for (let y = 40; y <= 184; y += 16) {
          const hit = y >= skip[0] && y <= skip[1];
          if (!hit) out += line(x - 80, y, x + 80, y, inside ? C.ink : GREY2, 5, inside ? 'opacity="0.25"' : '');
          else if (skip[2]) out += line(x + 36, y, x + 80, y, GREY2, 5) + line(x - 80, y, x - 36, y, GREY2, 5);
        }
        return out;
      };
      return panels('التفاف النص حول الصورة', 286, [
        { title: 'مربع', sub: 'النص حول الصورة', draw: (x) => lines(x, [70, 136, true]) + pic(x - 30, 66, 60, 74) },
        { title: 'أعلى وأسفل', sub: 'الجانبان فارغان', draw: (x) => lines(x, [70, 136, false]) + pic(x - 30, 66, 60, 74) },
        { title: 'خلف النص', sub: 'الصورة تحت الكلمات', draw: (x) => pic(x - 50, 62, 100, 82, 0.75) + lines(x, [999, 999], true) },
      ]);
    },

    // ---------------- Unit 2 · Lesson 2 ----------------
    'g5-spacing'() {
      const rows = (x, ys, indent = 0, r = 70) => ys.map((y, i) => line(x - 70, y, x + r - (i === 0 ? indent : 0), y, GREY2, 6)).join('');
      return panels('تباعد الأسطر والمسافة البادئة وتباعد الأحرف', 286, [
        { title: 'تباعد الأسطر', sub: 'المسافة بين السطور', draw: (x) => rows(x, [52, 102, 152], 0, 50) + arrow(x + 74, 52, x + 74, 102, C.amber, true) + arrow(x + 74, 102, x + 74, 152, C.amber, true) },
        { title: 'المسافة البادئة', sub: 'بُعد الفقرة عن الهامش', draw: (x) => line(x + 82, 36, x + 82, 190, C.blue, 2, 'stroke-dasharray="5 5"')
          + rows(x, [60, 84, 108, 132, 156], 34) + arrow(x + 82, 60, x + 44, 60, C.amber) },
        { title: 'تباعد الأحرف', sub: 'موسّع أو مكثّف', draw: (x) => `<text x="${x}" y="82" font-size="26" font-weight="700" fill="${C.right}" text-anchor="middle" direction="ltr" letter-spacing="10">Saudi</text>`
          + text(x, 106, 'موسّع', { size: 13, weight: 600, fill: C.muted })
          + `<text x="${x}" y="156" font-size="26" font-weight="700" fill="${C.amber}" text-anchor="middle" direction="ltr" letter-spacing="-2">Saudi</text>`
          + text(x, 180, 'مكثّف', { size: 13, weight: 600, fill: C.muted }) },
      ]);
    },

    'g5-nonprinting'() {
      const xs = [482, 326, 170, 14];
      const items = [['¶', 'Enter', 'نهاية الفقرة'], ['↵', 'Shift + Enter', 'فاصل أسطر'], ['·', 'Space', 'مسافة'], ['→', 'Tab', 'علامة الجدولة']];
      return svg(640, 220, 'الأحرف غير القابلة للطباعة', items.map(([sym, key, t], i) => {
        const x = xs[i], cx = x + 72;
        return tile(x, 14, 144, 192) + circle(cx, 72, 40, C.soft)
          + text(cx, 90, sym, { size: 46, weight: 700, fill: C.right, ltr: true })
          + rect(cx - 52, 124, 104, 28, C.paper, `rx="6" stroke="${C.ink}" stroke-width="2"`)
          + text(cx, 143, key, { size: 14, weight: 700, ltr: true })
          + text(cx, 184, t, { size: 16, weight: 700 });
      }).join(''));
    },

    // ---------------- Unit 2 · Lesson 3 ----------------
    'g5-smartart-types'() {
      const box = (x, y, w, h, fill) => rect(x, y, w, h, fill, 'rx="4"');
      const icons = [
        ['قائمة', 'List', (cx, cy) => box(cx - 36, cy - 30, 72, 14, C.right) + box(cx - 36, cy - 8, 72, 14, C.left) + box(cx - 36, cy + 14, 72, 14, C.top)],
        ['معالجة', 'Process', (cx, cy) => box(cx + 18, cy - 12, 26, 24, C.right) + box(cx - 13, cy - 12, 26, 24, C.left) + box(cx - 44, cy - 12, 26, 24, C.top)],
        ['دائري', 'Cycle', (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="26" fill="none" stroke="${C.line}" stroke-width="4"/>`
          + circle(cx, cy - 26, 9, C.right) + circle(cx + 26, cy, 9, C.left) + circle(cx, cy + 26, 9, C.top) + circle(cx - 26, cy, 9, C.amber)],
        ['هيكلي', 'Hierarchy', (cx, cy) => line(cx, cy - 16, cx, cy - 4, C.ink, 2) + line(cx - 26, cy - 4, cx + 26, cy - 4, C.ink, 2)
          + line(cx - 26, cy - 4, cx - 26, cy + 8, C.ink, 2) + line(cx + 26, cy - 4, cx + 26, cy + 8, C.ink, 2)
          + box(cx - 16, cy - 34, 32, 18, C.right) + box(cx - 42, cy + 8, 32, 18, C.left) + box(cx + 10, cy + 8, 32, 18, C.left)],
        ['علاقة', 'Relationship', (cx, cy) => circle(cx - 14, cy, 24, C.top, 'opacity="0.85"') + circle(cx + 14, cy, 24, C.amber, 'opacity="0.7"')],
        ['مصفوفة', 'Matrix', (cx, cy) => box(cx - 30, cy - 30, 28, 28, C.right) + box(cx + 2, cy - 30, 28, 28, C.left) + box(cx - 30, cy + 2, 28, 28, C.top) + box(cx + 2, cy + 2, 28, 28, C.amber)],
        ['هرمي', 'Pyramid', (cx, cy) => poly([[cx, cy - 32], [cx + 12, cy - 12], [cx - 12, cy - 12]], C.right)
          + poly([[cx - 14, cy - 9], [cx + 14, cy - 9], [cx + 26, cy + 10], [cx - 26, cy + 10]], C.left)
          + poly([[cx - 28, cy + 13], [cx + 28, cy + 13], [cx + 40, cy + 32], [cx - 40, cy + 32]], C.top)],
      ];
      const pos = [[482, 14], [326, 14], [170, 14], [14, 14], [404, 152], [248, 152], [92, 152]];
      return svg(640, 292, 'أنواع الرسوم التوضيحية SmartArt', icons.map(([t, en, icon], i) => {
        const [x, y] = pos[i];
        return tile(x, y, 144, 126) + icon(x + 72, y + 48)
          + text(x + 72, y + 100, t, { size: 17, weight: 700 }) + text(x + 72, y + 118, en, { size: 12, weight: 500, fill: C.muted, ltr: true });
      }).join(''));
    },

    // ---------------- Unit 2 · Lesson 4 ----------------
    'g5-proofing'() {
      let wave = 'M326 72';
      for (let i = 0; i < 14; i++) wave += ` q5 ${i % 2 ? 6 : -6} 10 0`;
      const body = tile(14, 14, 612, 150)
        + text(600, 62, 'تسطير أحمر متموّج', { size: 17, weight: 700, fill: C.rose, anchor: 'start' })
        + text(600, 84, 'خطأ إملائي', { size: 14, weight: 600, fill: C.muted, anchor: 'start' })
        + text(390, 60, 'المدرسه', { size: 26, weight: 700 }) + `<path d="${wave}" fill="none" stroke="${C.rose}" stroke-width="2.5"/>`
        + text(170, 60, 'المدرسة', { size: 26, weight: 700, fill: C.right }) + arrow(300, 52, 236, 52, C.amber)
        + text(600, 126, 'تسطير أزرق', { size: 17, weight: 700, fill: C.blue, anchor: 'start' })
        + text(600, 148, 'خطأ نحوي', { size: 14, weight: 600, fill: C.muted, anchor: 'start' })
        + text(390, 128, 'الطلاب ذهب', { size: 24, weight: 700 }) + line(320, 138, 460, 138, C.blue, 2.5) + line(320, 144, 460, 144, C.blue, 2.5)
        + text(170, 128, 'الطلاب ذهبوا', { size: 24, weight: 700, fill: C.right }) + arrow(300, 120, 250, 120, C.amber)
        + rect(470, 184, 74, 46, C.paper, `rx="8" stroke="${C.ink}" stroke-width="3"`) + text(507, 214, 'F7', { size: 20, weight: 700, ltr: true })
        + text(456, 204, 'المحرر', { size: 17, weight: 700, anchor: 'start' }) + text(456, 224, 'التدقيق الإملائي', { size: 13, weight: 500, fill: C.muted, anchor: 'start' })
        + rect(196, 184, 112, 46, C.paper, `rx="8" stroke="${C.ink}" stroke-width="3"`) + text(252, 214, 'Shift + F7', { size: 17, weight: 700, ltr: true })
        + text(182, 204, 'قاموس المرادفات', { size: 17, weight: 700, anchor: 'start' }) + text(182, 224, 'كلمات بالمعنى نفسه', { size: 13, weight: 500, fill: C.muted, anchor: 'start' });
      return svg(640, 246, 'التدقيق الإملائي والنحوي', body);
    },

    'g5-print-options'() {
      const page = (x, y, w, h) => {
        let rows = '';
        for (let yy = y + 30; yy < y + h - 10; yy += 14) rows += line(x + 10, yy, x + w - 10, yy, C.line, 4);
        return rect(x, y, w, h, C.paper, `rx="4" stroke="${C.ink}" stroke-width="2.5"`) + rect(x + 10, y + 10, w - 20, 10, C.right, 'rx="2"') + rows;
      };
      return panels('خيارات الطباعة', 286, [
        { title: 'اتجاه عمودي', sub: 'Portrait', draw: (x) => page(x - 42, 36, 84, 150) },
        { title: 'اتجاه أفقي', sub: 'Landscape', draw: (x) => page(x - 78, 66, 156, 96) },
        { title: 'صفحات مخصصة', sub: 'نكتب أرقام الصفحات', draw: (x) => page(x - 2, 40, 60, 80) + page(x - 22, 52, 60, 80) + page(x - 42, 64, 60, 80)
          + rect(x - 66, 156, 132, 34, C.soft, `rx="8" stroke="${C.right}" stroke-width="2"`) + text(x, 179, '1-5,8,11', { size: 17, weight: 700, ltr: true }) },
      ]);
    },
  });
})();
