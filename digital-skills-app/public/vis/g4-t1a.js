// Grade 4, term 1, units 1-2: computer basics and working with text.
(function () {
  const { C, svg, text, poly, line, arrow, badge, panels, steps, printer, monitor } = window.VisualKit;

  const card = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2" ${extra}/>`;
  const key = (x, y, w, h, label, fill = '#f3f6f7', ink = C.ink, size = 13) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="#b9c6cc" stroke-width="1.5"/>`
    + (label ? text(x + w / 2, y + h / 2 + size * 0.36, label, { size, weight: 700, fill: ink, ltr: true }) : '');

  // ---- small device icons (centred on cx, cy, about 80px wide)
  function tower(cx, cy) {
    return `<rect x="${cx - 22}" y="${cy - 40}" width="44" height="80" rx="6" fill="#e1e7ea" stroke="${C.ink}" stroke-width="3"/>`
      + `<rect x="${cx - 14}" y="${cy - 30}" width="28" height="7" rx="2" fill="#9eabb1"/>`
      + `<circle cx="${cx}" cy="${cy}" r="7" fill="${C.left}"/>`
      + line(cx - 12, cy + 22, cx + 12, cy + 22, '#9eabb1', 3) + line(cx - 12, cy + 30, cx + 12, cy + 30, '#9eabb1', 3);
  }
  function keyboardIcon(cx, cy, w = 120) {
    let keys = '';
    const cols = Math.floor((w - 12) / 12);
    for (let r = 0; r < 3; r++) for (let c = 0; c < cols; c++) keys += `<rect x="${cx - w / 2 + 7 + c * 12}" y="${cy - 13 + r * 9}" width="9" height="6" rx="1.5" fill="#bcc7cc"/>`;
    return `<rect x="${cx - w / 2}" y="${cy - 18}" width="${w}" height="40" rx="7" fill="#f3f6f7" stroke="${C.ink}" stroke-width="3"/>` + keys
      + `<rect x="${cx - 26}" y="${cy + 12}" width="52" height="6" rx="1.5" fill="#bcc7cc"/>`;
  }
  function mouseIcon(cx, cy) {
    return `<rect x="${cx - 15}" y="${cy - 22}" width="30" height="44" rx="15" fill="#f3f6f7" stroke="${C.ink}" stroke-width="3"/>`
      + line(cx, cy - 22, cx, cy - 6, C.ink, 2) + line(cx - 15, cy - 6, cx + 15, cy - 6, C.ink, 2)
      + `<rect x="${cx - 2.5}" y="${cy - 17}" width="5" height="8" rx="2.5" fill="${C.amber}"/>`;
  }
  function speaker(cx, cy) {
    return `<rect x="${cx - 18}" y="${cy - 32}" width="36" height="64" rx="7" fill="#e1e7ea" stroke="${C.ink}" stroke-width="3"/>`
      + `<circle cx="${cx}" cy="${cy - 12}" r="7" fill="${C.ink}"/><circle cx="${cx}" cy="${cy + 12}" r="11" fill="${C.ink}"/><circle cx="${cx}" cy="${cy + 12}" r="4" fill="#9eabb1"/>`;
  }
  function webcam(cx, cy) {
    return `<path d="M${cx - 22} ${cy + 32} Q${cx} ${cy + 14} ${cx + 22} ${cy + 32} Z" fill="#9eabb1"/>`
      + `<circle cx="${cx}" cy="${cy - 6}" r="26" fill="#f3f6f7" stroke="${C.ink}" stroke-width="3"/>`
      + `<circle cx="${cx}" cy="${cy - 6}" r="13" fill="${C.ink}"/><circle cx="${cx + 4}" cy="${cy - 10}" r="4" fill="#fff"/>`
      + `<circle cx="${cx}" cy="${cy + 13}" r="3" fill="${C.left}"/>`;
  }
  function mic(cx, cy) {
    return `<rect x="${cx - 11}" y="${cy - 36}" width="22" height="38" rx="11" fill="${C.left}" stroke="${C.ink}" stroke-width="3"/>`
      + `<path d="M${cx - 20} ${cy - 10} Q${cx - 20} ${cy + 14} ${cx} ${cy + 14} Q${cx + 20} ${cy + 14} ${cx + 20} ${cy - 10}" fill="none" stroke="${C.ink}" stroke-width="3"/>`
      + line(cx, cy + 14, cx, cy + 28, C.ink, 3) + `<rect x="${cx - 18}" y="${cy + 28}" width="36" height="6" rx="3" fill="${C.ink}"/>`;
  }
  function scanner(cx, cy) {
    return poly([[cx - 36, cy - 30], [cx + 30, cy - 30], [cx + 40, cy - 2], [cx - 26, cy - 2]], '#d6eef8', `stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"`)
      + `<rect x="${cx - 40}" y="${cy}" width="80" height="24" rx="5" fill="#e1e7ea" stroke="${C.ink}" stroke-width="3"/>`
      + line(cx - 28, cy + 12, cx + 6, cy + 12, C.blue, 3)
      + `<circle cx="${cx + 22}" cy="${cy + 12}" r="3" fill="${C.left}"/><circle cx="${cx + 30}" cy="${cy + 12}" r="3" fill="${C.left}"/>`;
  }
  function headphones(cx, cy) {
    return `<path d="M${cx - 28} ${cy + 6} V${cy - 4} A28 28 0 0 1 ${cx + 28} ${cy - 4} V${cy + 6}" fill="none" stroke="${C.ink}" stroke-width="5"/>`
      + `<rect x="${cx - 36}" y="${cy}" width="16" height="30" rx="7" fill="${C.rose}"/><rect x="${cx + 20}" y="${cy}" width="16" height="30" rx="7" fill="${C.rose}"/>`;
  }
  function camera(cx, cy) {
    return `<rect x="${cx - 36}" y="${cy - 20}" width="72" height="46" rx="8" fill="#e1e7ea" stroke="${C.ink}" stroke-width="3"/>`
      + `<rect x="${cx - 26}" y="${cy - 28}" width="18" height="8" rx="2" fill="${C.ink}"/>`
      + `<circle cx="${cx + 6}" cy="${cy + 3}" r="15" fill="${C.ink}"/><circle cx="${cx + 6}" cy="${cy + 3}" r="7" fill="${C.blue}"/>`
      + `<rect x="${cx - 30}" y="${cy - 12}" width="12" height="7" rx="2" fill="${C.top}"/>`;
  }
  function folder(cx, cy, s = 1, fill = '#f6c85f') {
    const w = 64 * s, h = 46 * s, x = cx - w / 2, y = cy - h / 2;
    return `<path d="M${x} ${y + 6 * s} Q${x} ${y} ${x + 6 * s} ${y} H${x + 22 * s} L${x + 28 * s} ${y + 7 * s} H${x + w - 6 * s} Q${x + w} ${y + 7 * s} ${x + w} ${y + 13 * s} V${y + h - 5 * s} Q${x + w} ${y + h} ${x + w - 5 * s} ${y + h} H${x + 5 * s} Q${x} ${y + h} ${x} ${y + h - 5 * s} Z" fill="#e0a93a"/>`
      + `<rect x="${x}" y="${y + 13 * s}" width="${w}" height="${h - 13 * s}" rx="${5 * s}" fill="${fill}"/>`;
  }
  function fileIcon(cx, cy, color = C.blue, s = 1) {
    const w = 46 * s, h = 58 * s, x = cx - w / 2, y = cy - h / 2, f = 13 * s;
    return `<path d="M${x} ${y} H${x + w - f} L${x + w} ${y + f} V${y + h} H${x} Z" fill="#fff" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`
      + poly([[x + w - f, y], [x + w - f, y + f], [x + w, y + f]], C.line)
      + `<rect x="${x + 7 * s}" y="${y + 24 * s}" width="${w - 14 * s}" height="${20 * s}" rx="3" fill="${color}"/>`;
  }
  function clock(cx, cy) {
    return `<circle cx="${cx}" cy="${cy}" r="32" fill="#fff" stroke="${C.ink}" stroke-width="3"/>`
      + [0, 90, 180, 270].map((d) => { const a = d * Math.PI / 180; return line(cx + 25 * Math.cos(a), cy + 25 * Math.sin(a), cx + 29 * Math.cos(a), cy + 29 * Math.sin(a), C.ink, 3); }).join('')
      + line(cx, cy, cx, cy - 20, C.ink, 4) + line(cx, cy, cx + 14, cy + 8, C.amber, 4) + `<circle cx="${cx}" cy="${cy}" r="4" fill="${C.ink}"/>`;
  }
  function volume(cx, cy) {
    return poly([[cx - 30, cy - 10], [cx - 18, cy - 10], [cx - 2, cy - 26], [cx - 2, cy + 26], [cx - 18, cy + 10], [cx - 30, cy + 10]], C.ink, 'stroke-linejoin="round"')
      + `<path d="M${cx + 8} ${cy - 12} Q${cx + 18} ${cy} ${cx + 8} ${cy + 12} M${cx + 16} ${cy - 22} Q${cx + 34} ${cy} ${cx + 16} ${cy + 22}" fill="none" stroke="${C.amber}" stroke-width="4" stroke-linecap="round"/>`;
  }
  function picture(cx, cy) {
    return `<rect x="${cx - 38}" y="${cy - 28}" width="76" height="56" rx="6" fill="#d6eef8" stroke="${C.ink}" stroke-width="3"/>`
      + poly([[cx - 32, cy + 22], [cx - 10, cy - 6], [cx + 8, cy + 22]], C.left) + poly([[cx - 2, cy + 22], [cx + 16, cy], [cx + 32, cy + 22]], C.right)
      + `<circle cx="${cx + 20}" cy="${cy - 14}" r="7" fill="${C.amber}"/>`;
  }
  function pixels(cx, cy) {
    let g = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) g += `<rect x="${cx - 26 + c * 10.5}" y="${cy - 22 + r * 9}" width="9" height="7.5" fill="${(r + c) % 3 ? C.top : C.left}"/>`;
    return `<rect x="${cx - 32}" y="${cy - 28}" width="64" height="44" rx="5" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>` + g
      + `<rect x="${cx - 4}" y="${cy + 16}" width="8" height="8" fill="${C.ink}"/><rect x="${cx - 16}" y="${cy + 24}" width="32" height="4" rx="2" fill="${C.ink}"/>`;
  }
  function tiles(label, items, h = 220) {
    const xs = [482, 326, 170, 14];
    return svg(640, h, label, items.map(([title, sub, icon], i) => {
      const x = xs[i];
      return card(x, 16, 144, h - 32) + icon(x + 72, 84)
        + text(x + 72, h - 66, title, { size: 17, weight: 700 })
        + (sub ? text(x + 72, h - 42, sub, { size: 13, weight: 500, fill: C.muted, ltr: /^[\x00-\x7F ]+$/.test(sub) }) : '');
    }).join(''));
  }

  Object.assign(window.Visuals, {
    // Lesson 1: the computer
    'g4-computer-parts'() {
      const label = (y, n, t, sub) => badge(600, y, n) + text(576, y + 6, t, { size: 18, weight: 700, anchor: 'start' })
        + text(576, y + 28, sub, { size: 13, weight: 500, fill: C.muted, anchor: 'end', ltr: true });
      return svg(640, 310, 'المكونات الرئيسة للحاسب المكتبي',
        `<rect x="20" y="264" width="390" height="14" rx="6" fill="#d9b48a"/>`
        + `<rect x="60" y="30" width="220" height="146" rx="10" fill="${C.ink}"/>`
        + `<rect x="70" y="40" width="200" height="118" rx="4" fill="#4aa3df"/>`
        + `<path d="M70 132 Q150 90 270 112 V158 H70 Z" fill="#8fd0f5" opacity="0.7"/>`
        + `<rect x="157" y="176" width="26" height="40" fill="#9eabb1"/><rect x="123" y="214" width="94" height="10" rx="4" fill="#9eabb1"/>`
        + tower(350, 222) + keyboardIcon(150, 246, 170) + mouseIcon(270, 244)
        + badge(84, 54, '1') + badge(374, 168, '2') + badge(62, 228, '3') + badge(296, 214, '4')
        + `<rect x="440" y="20" width="184" height="270" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + label(60, '1', 'الشاشة', 'Monitor') + label(124, '2', 'صندوق الحاسب', 'Computer Case')
        + label(188, '3', 'لوحة المفاتيح', 'Keyboard') + label(252, '4', 'الفأرة', 'Mouse'));
    },

    'g4-peripherals'() {
      const items = [
        ['الطابعة', 'طباعة صفحة', printer], ['مكبر الصوت', 'الاستماع إلى الصوت', speaker], ['كاميرا الويب', 'التواصل المرئي', webcam],
        ['الميكروفون', 'تسجيل الصوت', mic], ['الماسح الضوئي', 'مسح المستندات والصور', scanner], ['الكاميرا الرقمية', 'التقاط الصور', camera],
      ];
      const xs = [434, 232, 30], ys = [16, 186];
      return svg(640, 352, 'الأجهزة الملحقة بالحاسب واستخداماتها', items.map(([t, sub, icon], i) => {
        const x = xs[i % 3], y = ys[Math.floor(i / 3)];
        return card(x, y, 176, 156) + icon(x + 88, y + 58)
          + text(x + 88, y + 118, t, { size: 17, weight: 700 }) + text(x + 88, y + 142, sub, { size: 13, weight: 500, fill: C.muted });
      }).join(''));
    },


    'g4-printing'() {
      const link = (cx, cy) => `<rect x="${cx - 12}" y="${cy - 30}" width="24" height="30" rx="4" fill="${C.ink}"/>`
        + `<rect x="${cx - 7}" y="${cy - 40}" width="14" height="12" fill="#9eabb1"/>` + line(cx, cy, cx, cy + 14, C.ink, 4)
        + `<path d="M${cx + 18} ${cy - 2} q12 -12 24 0 M${cx + 22} ${cy + 6} q8 -8 16 0" fill="none" stroke="${C.blue}" stroke-width="3" stroke-linecap="round"/>`
        + `<circle cx="${cx + 30}" cy="${cy + 13}" r="3" fill="${C.blue}"/>`;
      const paper = (cx, cy) => `<rect x="${cx - 24}" y="${cy - 32}" width="40" height="52" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>`
        + `<rect x="${cx - 6}" y="${cy - 12}" width="36" height="24" rx="3" fill="#fdebd3" stroke="${C.amber}" stroke-width="2.5"/>`
        + line(cx - 16, cy - 20, cx + 6, cy - 20, C.line, 3) + poly([[cx - 6, cy - 12], [cx + 12, cy + 2], [cx + 30, cy - 12]], 'none', `stroke="${C.amber}" stroke-width="2"`);
      return steps('خطوات الطباعة من الحاسب', [
        ['الحاسب', 'افتح المستند'], ['التوصيل', 'سلك USB أو لاسلكي'], ['الطابعة', 'شغّلها أولًا'], ['الورق', 'أحجام وملصقات ومغلفات'],
      ], [monitor, link, printer, paper]);
    },

    'g4-resolution'() {
      const screen = (cx, rows, cols, title, sub, value) => {
        const w = 220, h = 140, x = cx - w / 2, y = 30;
        let icons = '';
        const cw = (w - 20) / cols, ch = (h - 20) / rows;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const s = Math.min(cw, ch) * 0.55;
          icons += `<rect x="${x + 10 + c * cw + (cw - s) / 2}" y="${y + 10 + r * ch + (ch - s) / 2}" width="${s}" height="${s}" rx="${s / 5}" fill="${(r + c) % 3 === 0 ? C.amber : (r + c) % 3 === 1 ? C.left : C.blue}"/>`;
        }
        return `<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="10" fill="${C.ink}"/>`
          + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#e9f4fb"/>` + icons
          + `<rect x="${cx - 12}" y="${y + h + 10}" width="24" height="22" fill="#9eabb1"/><rect x="${cx - 44}" y="${y + h + 30}" width="88" height="8" rx="4" fill="#9eabb1"/>`
          + `<rect x="${cx - 70}" y="232" width="140" height="32" rx="9" fill="${C.soft}"/>` + text(cx, 254, value, { size: 17, weight: 700, fill: C.right, ltr: true })
          + text(cx, 292, title, { size: 18, weight: 700 }) + text(cx, 316, sub, { size: 14, weight: 500, fill: C.muted });
      };
      return svg(640, 330, 'مقارنة بين دقة الشاشة العالية والمنخفضة',
        screen(475, 5, 8, 'دقة أعلى', 'عناصر أصغر وأكثر وضوحًا', '1920 x 1080')
        + screen(165, 2, 3, 'دقة أقل', 'عناصر أكبر حجمًا', '800 x 600'));
    },

    // Lesson 2: the desktop, files and folders
    'g4-desktop'() {
      const call = (x, y, n, t) => badge(x, y, n) + text(x, y + 38, t, { size: 15, weight: 700 });
      return svg(640, 330, 'أجزاء سطح المكتب في ويندوز',
        `<rect x="60" y="14" width="520" height="230" rx="10" fill="#1f6fbf"/>`
        + poly([[300, 70], [356, 62], [356, 118], [300, 118]], '#5fb0f0', 'opacity="0.8"') + poly([[360, 61], [420, 52], [420, 118], [360, 118]], '#5fb0f0', 'opacity="0.8"')
        + poly([[300, 122], [356, 122], [356, 176], [300, 168]], '#5fb0f0', 'opacity="0.8"') + poly([[360, 122], [420, 122], [420, 186], [360, 177]], '#5fb0f0', 'opacity="0.8"')
        + `<rect x="534" y="30" width="30" height="34" rx="3" fill="#e1e7ea"/>` + line(540, 38, 558, 38, '#9eabb1', 3) + line(542, 46, 556, 46, '#9eabb1', 2) + line(542, 54, 556, 54, '#9eabb1', 2)
        + `<rect x="60" y="244" width="520" height="30" rx="0" fill="#16324a"/>`
        + `<rect x="548" y="248" width="26" height="22" fill="#2b4f6e"/>` + [[553, 252], [562, 252], [553, 261], [562, 261]].map(([x, y]) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#fff"/>`).join('')
        + `<rect x="510" y="250" width="22" height="18" rx="2" fill="#f6c85f"/>`
        + `<circle cx="486" cy="259" r="10" fill="#3fb0e8"/><circle cx="486" cy="259" r="5" fill="#16324a"/>`
        + text(100, 264, '10:30', { size: 13, weight: 700, fill: '#fff', ltr: true })
        + badge(548, 82, '1') + badge(561, 300, '2') + badge(520, 300, '3') + badge(480, 300, '4') + badge(100, 300, '5') + badge(320, 300, '6')
        + line(320, 285, 320, 274, '#fff', 0)
        + text(470, 228, 'سطح المكتب', { size: 16, weight: 700, fill: '#fff' })
        + `<rect x="76" y="26" width="200" height="206" rx="12" fill="#fff" opacity="0.95"/>`
        + [['1', 'سلة المحذوفات'], ['2', 'زر بدء'], ['3', 'مستكشف الملفات'], ['4', 'متصفح إيدج'], ['5', 'التاريخ والوقت'], ['6', 'شريط المهام']].map(([n, t], i) => {
          const x = 256, y = 50 + i * 32;
          return `<circle cx="${x}" cy="${y}" r="10" fill="${C.amber}"/>` + text(x, y + 5, n, { size: 12, weight: 700, fill: '#fff' }) + text(x - 18, y + 5, t, { size: 14, weight: 600, anchor: 'start' });
        }).join(''));
    },

    'g4-file-name'() {
      const box = (cx, w, value, fill, ink, ltr) => `<rect x="${cx - w / 2}" y="44" width="${w}" height="62" rx="12" fill="${fill}"/>` + text(cx, 86, value, { size: 30, weight: 700, fill: ink, ltr });
      const exts = [['docx', 'مستند', C.blue], ['png', 'صورة', C.left], ['txt', 'ملف نصي', '#9eabb1'], ['pptx', 'عرض تقديمي', C.rose]];
      return svg(640, 320, 'أجزاء اسم الملف: الأيقونة والاسم والامتداد',
        fileIcon(560, 75, C.left, 1.1)
        + box(410, 160, 'مسجد', C.soft, C.right) + box(304, 36, '.', '#fdebd3', C.amber, true) + box(220, 110, 'png', '#dcebf7', C.blue, true)
        + text(560, 138, 'الأيقونة', { size: 15, weight: 700, fill: C.muted })
        + text(410, 138, 'الاسم', { size: 15, weight: 700, fill: C.right }) + text(304, 138, 'نقطة', { size: 15, weight: 700, fill: C.amber })
        + text(220, 138, 'الامتداد', { size: 15, weight: 700, fill: C.blue })
        + text(90, 70, 'اسم واضح', { size: 15, weight: 700, fill: C.left }) + text(90, 92, 'يصف المحتوى', { size: 13, weight: 500, fill: C.muted })
        + line(20, 168, 620, 168, C.line, 2)
        + exts.map(([e, t, col], i) => {
          const x = 482 - i * 156;
          return card(x, 186, 144, 118) + fileIcon(x + 112, 236, col, 0.8)
            + text(x + 52, 236, e, { size: 22, weight: 700, fill: col === '#9eabb1' ? C.muted : col, ltr: true })
            + text(x + 72, 288, t, { size: 15, weight: 700 });
        }).join(''));
    },

    'g4-folder-tree'() {
      const subs = ['توحيد', 'رياضيات', 'علوم', 'قراءة', 'كتابة'];
      const xs = [560, 440, 320, 200, 80];
      return svg(640, 300, 'مجلد رئيس يحتوي مجلدات فرعية',
        folder(320, 56, 1.3) + text(320, 112, 'المواد الدراسية', { size: 19, weight: 700 })
        + text(320, 134, 'مجلد رئيس', { size: 13, weight: 500, fill: C.muted })
        + line(80, 160, 560, 160, C.line, 3) + line(320, 142, 320, 160, C.line, 3)
        + subs.map((s, i) => line(xs[i], 160, xs[i], 186, C.line, 3) + folder(xs[i], 212, 0.95) + text(xs[i], 262, s, { size: 16, weight: 700 })).join('')
        + text(320, 290, 'مجلدات فرعية', { size: 13, weight: 500, fill: C.muted }));
    },

    'g4-copy-move'() {
      const side = (x, title, sub, cmd, keep) => card(x, 14, 296, 272)
        + text(x + 148, 50, title, { size: 21, weight: 700 }) + text(x + 148, 76, cmd, { size: 14, weight: 600, fill: C.amber })
        + folder(x + 226, 150, 1.25) + folder(x + 70, 150, 1.25, '#f6d58a')
        + text(x + 226, 204, 'المكان الأصلي', { size: 13, weight: 600, fill: C.muted }) + text(x + 70, 204, 'المكان الجديد', { size: 13, weight: 600, fill: C.muted })
        + (keep ? fileIcon(x + 226, 134, C.left, 0.62) : `<g opacity="0.35">${fileIcon(x + 226, 134, C.left, 0.62)}</g>` + line(x + 210, 118, x + 242, 150, C.rose, 4) + line(x + 242, 118, x + 210, 150, C.rose, 4))
        + fileIcon(x + 70, 134, C.left, 0.62)
        + arrow(x + 180, 140, x + 116, 140)
        + text(x + 148, 252, sub, { size: 15, weight: 600, fill: keep ? C.right : C.rose });
      return svg(640, 300, 'الفرق بين نسخ الملف ونقله',
        side(326, 'النسخ', 'الأصل يبقى في مكانه', 'نسخ ← لصق', true)
        + side(18, 'النقل', 'يُحذف من مكانه الأصلي', 'قص ← لصق', false));
    },

    // Lesson 3: computer settings
    'g4-pc-settings'() {
      return tiles('إعدادات جهاز الحاسب', [
        ['التاريخ والوقت', 'شريط المهام', clock],
        ['دقة الشاشة', 'إعدادات العرض', pixels],
        ['مستوى الصوت', 'أيقونة السماعة', volume],
        ['الخلفية', 'تخصيص', picture],
      ]);
    },

    // Unit 2, lesson 1: the keyboard
    'g4-keyboard'() {
      const u = 38, x0 = 35, h = 32;
      const edit = '#fdebd3', mod = '#dcebf7', space = C.soft;
      const rows = [
        [[1, 'Esc', mod], [0.5], ...Array(12).fill([1, '']), [1.5, 'Delete', edit]],
        [[1, '`'], ...'1234567890'.split('').map((d) => [1, d]), [1, '-'], [1, '='], [2, 'Backspace', edit]],
        [[1.5, 'Tab'], ...Array(12).fill([1, '']), [1.5, '\\']],
        [[1.75, 'Caps Lock', mod], ...Array(11).fill([1, '']), [2.25, 'Enter', edit]],
        [[2.25, 'Shift', mod], ...Array(10).fill([1, '']), [2.75, 'Shift', mod]],
        [[1.5, 'Ctrl', mod], [1, ''], [1.25, 'Alt', mod], [6.25, 'Space', space], [1.25, 'Alt', mod], [1, '←', space], [1, 'ARROWS', space], [1, '→', space], [0.75, '']],
      ];
      let body = `<rect x="${x0 - 14}" y="10" width="${15 * u + 24}" height="252" rx="16" fill="#e7eef1" stroke="#b9c6cc" stroke-width="2"/>`;
      rows.forEach((row, r) => {
        let x = x0;
        const y = r === 0 ? 22 : 22 + 26 + (r - 1) * 40, kh = r === 0 ? 22 : h;
        row.forEach(([w, lab, fill]) => {
          if (lab === undefined) { x += w * u; return; }
          const kw = w * u - 4;
          if (lab === 'ARROWS') {
            body += key(x, y, kw, kh / 2 - 1, '↑', space, C.ink, 11) + key(x, y + kh / 2 + 1, kw, kh / 2 - 1, '↓', space, C.ink, 11);
          } else {
            body += key(x, y, kw, kh, lab, fill || '#f7f9fa', C.ink, lab.length > 6 ? 12 : 13);
          }
          x += w * u;
        });
      });
      const legend = [['مفاتيح التحرير', edit], ['مفاتيح التحكم والتبديل', mod], ['المسافة والأسهم', space]];
      body += legend.map(([t, f], i) => {
        const x = 600 - i * 200;
        return `<rect x="${x - 22}" y="278" width="22" height="18" rx="4" fill="${f}" stroke="#b9c6cc"/>` + text(x - 30, 292, t, { size: 14, weight: 600, anchor: 'start' });
      }).join('');
      return svg(640, 306, 'أهم مفاتيح لوحة المفاتيح', body);
    },

    // Unit 2, lesson 2: editing text
    'g4-delete-keys'() {
      const caret = (x, y) => line(x, y - 26, x, y + 6, C.rose, 3);
      const side = (x, keyName, sub, before, after, caretAt) => card(x, 14, 296, 262)
        + key(x + 98, 30, 100, 36, keyName, '#fdebd3', C.ink, 15)
        + text(x + 148, 92, sub, { size: 15, weight: 600, fill: C.muted })
        + `<rect x="${x + 48}" y="110" width="200" height="54" rx="12" fill="${C.soft}"/>` + text(x + 148, 148, before, { size: 28, weight: 700 }) + caret(x + 148 + caretAt, 148)
        + arrow(x + 148, 170, x + 148, 202)
        + `<rect x="${x + 48}" y="208" width="200" height="54" rx="12" fill="#fff" stroke="${C.line}" stroke-width="2"/>` + text(x + 148, 246, after, { size: 28, weight: 700, fill: C.right });
      return svg(640, 290, 'الفرق بين مفتاحي Backspace وDelete',
        side(326, 'Backspace', 'يحذف الحرف الذي قبل المؤشر', 'مرحبا', 'مرحب', -42)
        + side(18, 'Delete', 'يحذف الحرف الذي بعد المؤشر', 'مرحبا', 'رحبا', 42));
    },

    'g4-shift-keys'() {
      const rows = [
        ['حرف إنجليزي كبير', ['Shift', 'A'], 'A'],
        ['الهمزة', ['Shift', 'H'], 'أ'],
        ['الفاصلة', ['Shift', 'K'], '،'],
        ['النقطة', ['Shift', '>'], '.'],
        ['تغيير لغة الكتابة', ['Alt', 'Shift'], 'ع / EN'],
      ];
      return svg(640, 330, 'استخدامات مفتاح Shift', rows.map(([t, keys, res], i) => {
        const y = 14 + i * 62;
        return `<rect x="20" y="${y}" width="600" height="52" rx="12" fill="${i % 2 ? C.paper : '#f3f8f6'}" stroke="${C.line}" stroke-width="1.5"/>`
          + text(596, y + 33, t, { size: 18, weight: 700, anchor: 'start' })
          + `<rect x="300" y="${y + 8}" width="86" height="36" rx="9" fill="${C.soft}"/>` + text(343, y + 34, res, { size: 22, weight: 700, fill: C.right, ltr: /^[\x00-\x7F]+$/.test(res) })
          + arrow(286, y + 26, 236, y + 26)
          + key(40, y + 9, 74, 34, keys[0], '#dcebf7', C.ink, 14) + text(130, y + 33, '+', { size: 20, weight: 700, fill: C.muted }) + key(146, y + 9, keys[1].length > 1 ? 74 : 44, 34, keys[1], '#f7f9fa', C.ink, 15);
      }).join(''));
    },

    // Unit 2, lesson 3: formatting text
    'g4-font-tools'() {
      const items = [
        ['غامق', 'Ctrl+B', (cx, cy) => key(cx - 22, cy - 22, 44, 44, 'B', '#f7f9fa', C.ink, 24), 'font-weight="800"'],
        ['مائل', 'Ctrl+I', (cx, cy) => key(cx - 22, cy - 22, 44, 44, '', '#f7f9fa') + `<text x="${cx}" y="${cy + 9}" font-size="24" font-style="italic" font-weight="700" text-anchor="middle" fill="${C.ink}" font-family="serif">I</text>`, 'font-style="italic"'],
        ['تسطير', 'Ctrl+U', (cx, cy) => key(cx - 22, cy - 22, 44, 44, 'U', '#f7f9fa', C.ink, 22) + line(cx - 9, cy + 14, cx + 9, cy + 14, C.ink, 2.5), 'text-decoration="underline"'],
        ['تمييز النص', 'لون التمييز', (cx, cy) => key(cx - 22, cy - 22, 44, 44, '', '#f7f9fa') + poly([[cx - 4, cy + 8], [cx + 12, cy - 12], [cx + 18, cy - 6], [cx + 2, cy + 14]], C.ink) + `<rect x="${cx - 16}" y="${cy + 12}" width="32" height="7" fill="#ffe14d"/>`, 'HL'],
        ['لون الخط', 'Font Color', (cx, cy) => key(cx - 22, cy - 22, 44, 44, 'A', '#f7f9fa', C.ink, 22) + `<rect x="${cx - 14}" y="${cy + 12}" width="28" height="6" fill="${C.rose}"/>`, `fill="${C.rose}"`],
        ['نوع الخط وحجمه', 'Font · Size', (cx, cy) => `<rect x="${cx - 44}" y="${cy - 16}" width="62" height="32" rx="5" fill="#f7f9fa" stroke="#b9c6cc" stroke-width="1.5"/>` + text(cx - 13, cy + 5, 'Arial', { size: 12, weight: 600, ltr: true }) + `<rect x="${cx + 22}" y="${cy - 16}" width="26" height="32" rx="5" fill="#f7f9fa" stroke="#b9c6cc" stroke-width="1.5"/>` + text(cx + 35, cy + 5, '26', { size: 12, weight: 700, ltr: true }), 'font-size="26"'],
      ];
      const xs = [434, 232, 30], ys = [16, 186];
      return svg(640, 352, 'أدوات تنسيق الخط', items.map(([t, sub, icon, style], i) => {
        const x = xs[i % 3], y = ys[Math.floor(i / 3)], cx = x + 88;
        let sample;
        if (style === 'HL') sample = `<rect x="${cx - 30}" y="${y + 86}" width="60" height="30" fill="#ffe14d"/>` + text(cx, y + 108, 'نص', { size: 20, weight: 600 });
        else sample = `<text x="${cx}" y="${y + 110}" font-size="20" font-weight="600" text-anchor="middle" fill="${C.ink}" font-family="inherit" ${style}>نص</text>`;
        return card(x, y, 176, 156) + icon(cx, y + 42) + sample
          + text(cx, y + 140, t, { size: 15, weight: 700 }) + text(x + 168, y + 22, '', {})
          + text(cx, y + 76, sub, { size: 11, weight: 600, fill: C.muted, ltr: /^[\x00-\x7F ·+]+$/.test(sub) });
      }).join(''));
    },

    // Unit 2, lesson 4: formatting paragraphs
    'g4-align'() {
      const kinds = [
        ['محاذاة لليمين', 'Ctrl+R', 'r'], ['توسيط', 'Ctrl+E', 'c'], ['محاذاة لليسار', 'Ctrl+L', 'l'], ['ملء السطر (ضبط)', 'Ctrl+J', 'j'],
      ];
      const xs = [482, 326, 170, 14];
      return svg(640, 240, 'أنواع محاذاة النص', kinds.map(([t, k, mode], i) => {
        const x = xs[i], lens = [96, 70, 88, 52], L = x + 24, R = x + 120;
        const lines = lens.map((w, j) => {
          const y = 40 + j * 20, ww = mode === 'j' && j < 3 ? 96 : w;
          const x1 = mode === 'r' || (mode === 'j') ? R - ww : mode === 'l' ? L : (L + R) / 2 - ww / 2;
          return line(x1, y, x1 + ww, y, j === 0 ? C.left : '#9eb8b0', 7);
        }).join('');
        return card(x, 14, 144, 210) + `<rect x="${x + 14}" y="26" width="116" height="96" rx="8" fill="#f7f9fa" stroke="${C.line}"/>` + lines
          + text(x + 72, 156, t, { size: 15, weight: 700 })
          + `<rect x="${x + 32}" y="172" width="80" height="30" rx="8" fill="#fdebd3"/>` + text(x + 72, 193, k, { size: 14, weight: 700, fill: C.amber, ltr: true });
      }).join(''));
    },

    'g4-lists'() {
      const bulletList = (x) => ['يناير', 'فبراير', 'مارس'].map((m, j) => `<circle cx="${x + 46}" cy="${58 + j * 34}" r="5" fill="${C.ink}"/>` + text(x + 30, 64 + j * 34, m, { size: 17, weight: 600, anchor: 'start' })).join('');
      const numList = (x) => ['يناير', 'فبراير', 'مارس'].map((m, j) => text(x + 50, 64 + j * 34, `${j + 1}.`, { size: 17, weight: 700, fill: C.right, ltr: true }) + text(x + 30, 64 + j * 34, m, { size: 17, weight: 600, anchor: 'start' })).join('');
      const bordered = (x) => `<rect x="${x - 68}" y="42" width="136" height="98" fill="#d6eef8" stroke="${C.ink}" stroke-width="2.5"/>`
        + text(x, 80, 'الرياض', { size: 18, weight: 700 }) + text(x, 112, '15 صفر', { size: 16, weight: 600 });
      return panels('التعداد النقطي والرقمي والحدود والتظليل', 250, [
        { title: 'تعداد نقطي', sub: 'Bullets', draw: (x) => bulletList(x) },
        { title: 'تعداد رقمي', sub: 'Numbering', draw: (x) => numList(x) },
        { title: 'حدود وتظليل', sub: 'Borders · Fill', draw: (x) => bordered(x) },
      ]);
    },
  });
})();
