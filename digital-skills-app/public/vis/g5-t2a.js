// Grade 5, term 2: units 1 (search, communication and file sharing) and 2 (spreadsheets).
(function () {
  const { C, svg, text, line, arrow, badge, panels, steps, table, head, globe, monitor, phone, building } = window.VisualKit;

  // Small helpers shared by the drawings below.
  const pc = (cx, cy) => `<rect x="${cx - 22}" y="${cy - 18}" width="44" height="30" rx="4" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.5"/>`
    + `<rect x="${cx - 17}" y="${cy - 13}" width="34" height="20" rx="2" fill="${C.top}"/>`
    + `<rect x="${cx - 3}" y="${cy + 12}" width="6" height="6" fill="${C.ink}"/><rect x="${cx - 11}" y="${cy + 18}" width="22" height="3" rx="1.5" fill="${C.ink}"/>`;
  const router = (cx, cy) => `<rect x="${cx - 26}" y="${cy - 10}" width="52" height="20" rx="6" fill="${C.right}"/>`
    + line(cx - 14, cy - 10, cx - 18, cy - 24, C.ink, 3) + line(cx + 14, cy - 10, cx + 18, cy - 24, C.ink, 3)
    + `<circle cx="${cx - 12}" cy="${cy}" r="3" fill="#7CFFB2"/><circle cx="${cx}" cy="${cy}" r="3" fill="#7CFFB2"/><circle cx="${cx + 12}" cy="${cy}" r="3" fill="${C.amber}"/>`;
  const cloud = (cx, cy, k = 1, fill = '#dcebf7', stroke = C.blue) => `<g transform="translate(${cx} ${cy}) scale(${k})">`
    + `<path d="M-70 30 Q-96 30 -96 6 Q-96 -18 -70 -20 Q-66 -52 -30 -52 Q-6 -70 22 -54 Q56 -62 66 -28 Q98 -24 96 4 Q96 30 68 30 Z" fill="${fill}" stroke="${stroke}" stroke-width="3"/></g>`;
  const folder = (cx, cy, fill = '#f7c27a') => `<path d="M${cx - 30} ${cy - 18} h20 l6 7 h34 v33 h-60 Z" fill="${fill}" stroke="#cf7a1c" stroke-width="2.5"/>`
    + `<rect x="${cx - 30}" y="${cy - 8}" width="60" height="30" rx="3" fill="#f9d49b" stroke="#cf7a1c" stroke-width="2.5"/>`;
  const person = (cx, cy, fill = C.right) => `<circle cx="${cx}" cy="${cy - 14}" r="10" fill="${fill}"/>`
    + `<path d="M${cx - 17} ${cy + 16} Q${cx - 17} ${cy - 2} ${cx} ${cy - 2} Q${cx + 17} ${cy - 2} ${cx + 17} ${cy + 16} Z" fill="${fill}"/>`;

  Object.assign(window.Visuals, {
    // LAN, WAN and the Internet, from the smallest network to the largest.
    'g5-networks'() {
      return panels('أنواع شبكات الحاسب', 300, [
        {
          title: 'شبكة محلية LAN', sub: 'فصل أو طابق أو مبنى',
          draw: (x) => `<rect x="${x - 78}" y="34" width="156" height="150" rx="12" fill="${C.soft}"/>`
            + line(x, 118, x - 48, 74, C.right, 3) + line(x, 118, x + 48, 74, C.right, 3)
            + line(x, 118, x - 48, 160, C.right, 3) + line(x, 118, x + 48, 160, C.right, 3)
            + pc(x - 48, 70) + pc(x + 48, 70) + pc(x - 48, 158) + pc(x + 48, 158) + router(x, 120),
        },
        {
          title: 'شبكة واسعة WAN', sub: 'تغطي مدينتين أو بلدين',
          draw: (x) => `<path d="M${x - 60} 150 Q${x} 40 ${x + 60} 150" fill="none" stroke="${C.amber}" stroke-width="4" stroke-dasharray="8 7"/>`
            + building(x + 58, 150) + building(x - 58, 150)
            + text(x + 58, 202, 'الرياض', { size: 14, weight: 600, fill: C.muted })
            + text(x - 58, 202, 'جدة', { size: 14, weight: 600, fill: C.muted }),
        },
        {
          title: 'الإنترنت', sub: 'أكبر شبكة في العالم',
          draw: (x) => [[-62, 58], [62, 58], [-70, 160], [70, 160], [0, 184]].map(([dx, dy]) => line(x, 112, x + dx, dy, C.line, 3)).join('')
            + [[-62, 58], [62, 58], [-70, 160], [70, 160]].map(([dx, dy]) => pc(x + dx, dy + 2)).join('')
            + phone(x, 182)
            + `<circle cx="${x}" cy="112" r="40" fill="#fff"/>` + globe(x, 112),
        },
      ]);
    },

    // How to search the web with a search engine (Bing).
    'g5-search-flow'() {
      const box = (x, y) => `<rect x="${x - 34}" y="${y - 12}" width="68" height="24" rx="12" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>`
        + `<circle cx="${x - 20}" cy="${y}" r="6" fill="none" stroke="${C.blue}" stroke-width="2.5"/>` + line(x - 16, y + 4, x - 12, y + 8, C.blue, 2.5)
        + line(x - 4, y, x + 22, y, C.line, 4);
      const enter = (x, y) => `<rect x="${x - 30}" y="${y - 20}" width="60" height="40" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>`
        + text(x, y + 6, 'Enter', { size: 15, weight: 700, ltr: true });
      const results = (x, y) => [0, 1, 2].map((i) => `<rect x="${x - 30}" y="${y - 24 + i * 17}" width="60" height="12" rx="4" fill="${i === 0 ? C.amber : '#fff'}" stroke="${C.ink}" stroke-width="1.5"/>`).join('');
      return steps('خطوات البحث في محرك البحث', [
        ['افتح المتصفح', 'مثل مايكروسوفت إيدج'],
        ['اكتب الكلمات', 'في مربع البحث'],
        ['اضغط Enter', 'أو أيقونة البحث'],
        ['اختر النتيجة', 'الأكثر صلة بالموضوع'],
      ], [(x, y) => globe(x, y), (x, y) => box(x, y), (x, y) => enter(x, y), (x, y) => results(x, y)]);
    },

    // Three ways to communicate on the Internet.
    'g5-comm-tools'() {
      return panels('أدوات التواصل عبر الإنترنت', 290, [
        {
          title: 'البريد الإلكتروني', sub: 'رسائل وملفات تصل خلال ثوانٍ',
          draw: (x) => `<rect x="${x - 58}" y="62" width="116" height="80" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="3"/>`
            + `<path d="M${x - 58} 64 L${x} 108 L${x + 58} 64" fill="none" stroke="${C.ink}" stroke-width="3"/>`
            + `<circle cx="${x + 54}" cy="64" r="16" fill="${C.amber}"/>` + text(x + 54, 70, '1', { size: 16, weight: 700, fill: '#fff' }),
        },
        {
          title: 'المحادثة الفورية', sub: 'رسالة قصيرة تظهر فورًا',
          draw: (x) => `<rect x="${x - 70}" y="46" width="96" height="48" rx="14" fill="${C.soft}" stroke="${C.right}" stroke-width="2.5"/>`
            + `<path d="M${x - 2} 92 l12 16 l4 -16 Z" fill="${C.soft}" stroke="${C.right}" stroke-width="2.5"/>`
            + line(x - 54, 64, x + 10, 64, C.right, 4) + line(x - 54, 78, x - 12, 78, C.right, 4)
            + `<rect x="${x - 24}" y="112" width="96" height="44" rx="14" fill="#5b5fc7"/>`
            + `<path d="M${x - 8} 154 l-10 14 l18 -14 Z" fill="#5b5fc7"/>`
            + line(x - 10, 128, x + 56, 128, '#fff', 4) + line(x - 10, 141, x + 30, 141, '#fff', 4),
        },
        {
          title: 'مكالمة الفيديو', sub: 'صوت وصورة مع الأصدقاء',
          draw: (x) => `<rect x="${x - 70}" y="50" width="140" height="100" rx="10" fill="${C.ink}"/>`
            + `<circle cx="${x}" cy="94" r="26" fill="#f7dfe3"/>` + text(x, 102, 'س', { size: 24, weight: 700, fill: C.rose })
            + `<rect x="${x - 64}" y="112" width="34" height="32" rx="5" fill="#5d6d76"/>` + person(x - 47, 132, '#cfdcd7')
            + `<rect x="${x + 22}" y="124" width="40" height="18" rx="9" fill="${C.rose}"/>`,
        },
      ]);
    },

    // Presence statuses in Microsoft Teams.
    'g5-teams-status'() {
      const items = [
        ['متاح', 'نشط ويمكنه التحدث', '#6bb700', 'check'],
        ['مشغول', 'تصله الإشعارات', '#c4314b', 'dot'],
        ['ممنوع الإزعاج', 'لا تصله الإشعارات', '#c4314b', 'minus'],
        ['سأعود حالًا', 'غير متوافر مؤقتًا', '#f8b500', 'clock'],
        ['الظهور بالخارج', 'لا يرد على الفور', '#f8b500', 'clock'],
        ['الظهور غير متصل', 'كأنه لم يسجل الدخول', '#8a8886', 'x'],
      ];
      const icon = (cx, cy, color, kind) => {
        let s = `<circle cx="${cx}" cy="${cy}" r="17" fill="${kind === 'x' ? '#fff' : color}" stroke="${color}" stroke-width="3"/>`;
        if (kind === 'check') s += `<path d="M${cx - 8} ${cy} l6 6 l11 -12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        if (kind === 'minus') s += line(cx - 9, cy, cx + 9, cy, '#fff', 4);
        if (kind === 'clock') s += line(cx, cy, cx, cy - 9, '#fff', 3) + line(cx, cy, cx + 7, cy + 3, '#fff', 3);
        if (kind === 'x') s += line(cx - 7, cy - 7, cx + 7, cy + 7, color, 3) + line(cx + 7, cy - 7, cx - 7, cy + 7, color, 3);
        return s;
      };
      return svg(640, 300, 'حالات مايكروسوفت تيمز', items.map(([t, sub, color, kind], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = col === 0 ? 330 : 20, y = 18 + row * 92;
        return `<rect x="${x}" y="${y}" width="290" height="78" rx="14" fill="#fff" stroke="${C.line}" stroke-width="2"/>`
          + icon(x + 254, y + 39, color, kind)
          + text(x + 222, y + 34, t, { size: 19, weight: 700, anchor: 'start' })
          + text(x + 222, y + 60, sub, { size: 14, weight: 500, fill: C.muted, anchor: 'start' });
      }).join(''));
    },

    // OneDrive: files live in the cloud and are reachable from anywhere.
    'g5-cloud-share'() {
      return svg(640, 300, 'التخزين والمشاركة عبر السحابة',
        cloud(320, 104, 1.25)
        + folder(290, 92) + `<rect x="330" y="72" width="36" height="46" rx="4" fill="#fff" stroke="${C.blue}" stroke-width="2.5"/>`
        + line(338, 86, 358, 86, C.line, 3) + line(338, 96, 358, 96, C.line, 3) + line(338, 106, 352, 106, C.line, 3)
        + text(320, 160, 'ون درايف (السحابة)', { size: 18, weight: 700, fill: C.blue })
        // upload from my computer (right)
        + monitor(540, 236) + arrow(520, 196, 420, 150, C.right)
        + text(540, 292, 'جهازي', { size: 15, weight: 700 })
        + text(486, 158, 'تحميل', { size: 15, weight: 700, fill: C.right })
        // share with a friend (left)
        + person(100, 236, C.amber) + arrow(220, 150, 124, 200, C.amber)
        + text(100, 292, 'صديقي', { size: 15, weight: 700 })
        + text(160, 158, 'مشاركة', { size: 15, weight: 700, fill: C.amber })
        // access from anywhere (middle)
        + phone(320, 234) + arrow(320, 174, 320, 196, C.blue, true)
        + text(300, 292, 'من أي مكان', { size: 15, weight: 700, fill: C.blue }));
    },

    // Weak versus strong passwords.
    'g5-password'() {
      const card = (x, title, pw, color, level, tips, ok) => `<rect x="${x}" y="16" width="290" height="268" rx="16" fill="#fff" stroke="${color}" stroke-width="2.5"/>`
        + `<rect x="${x}" y="16" width="290" height="44" rx="16" fill="${color}"/><rect x="${x}" y="44" width="290" height="16" fill="${color}"/>`
        + text(x + 145, 46, title, { size: 19, weight: 700, fill: '#fff' })
        + `<rect x="${x + 24}" y="76" width="242" height="44" rx="10" fill="${C.soft}" stroke="${C.line}" stroke-width="2"/>`
        + text(x + 145, 106, pw, { size: 20, weight: 700, ltr: true })
        + `<rect x="${x + 24}" y="134" width="242" height="10" rx="5" fill="#e6ecee"/><rect x="${x + 266 - 242 * level}" y="134" width="${242 * level}" height="10" rx="5" fill="${color}"/>`
        + tips.map((t, i) => {
          const y = 178 + i * 34;
          const mark = ok
            ? `<path d="M${x + 252} ${y - 6} l5 5 l9 -10" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
            : line(x + 252, y - 11, x + 264, y + 1, color, 3.5) + line(x + 264, y - 11, x + 252, y + 1, color, 3.5);
          return mark + text(x + 238, y, t, { size: 15, weight: 600, anchor: 'start' });
        }).join('');
      return svg(640, 300, 'كلمة مرور ضعيفة وكلمة مرور قوية',
        card(330, 'كلمة مرور ضعيفة', '123456', C.rose, 0.2, ['قصيرة وسهلة التخمين', 'أرقام شائعة متتالية', 'بلا رموز ولا أحرف'], false)
        + card(20, 'كلمة مرور قوية', 'chicken5meal7#', '#1f8f5c', 0.95, ['طويلة: 8 إلى 10 على الأقل', 'أحرف وأرقام ورموز', 'بلا بيانات شخصية'], true));
    },

    // Formatting cells: column width, merge and center, wrap text, text angle.
    'g5-cell-format'() {
      const frame = (x, y, title) => `<rect x="${x}" y="${y}" width="296" height="134" rx="14" fill="#fff" stroke="${C.line}" stroke-width="2"/>`
        + text(x + 276, y + 30, title, { size: 17, weight: 700, anchor: 'start' });
      const cell = (x, y, w, h, fill = '#fff', stroke = '#b9c6c2') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
      // 1. column width (top right)
      const a = frame(332, 14, 'تغيير عرض العمود')
        + cell(496, 58, 110, 26, C.soft) + text(551, 76, 'A', { size: 14, weight: 700, ltr: true })
        + cell(496, 84, 110, 34) + text(551, 106, 'المواد الدراسية', { size: 14, weight: 600 })
        + cell(386, 58, 110, 26, C.soft) + text(441, 76, 'B', { size: 14, weight: 700, ltr: true })
        + cell(386, 84, 110, 34)
        + line(496, 52, 496, 124, C.amber, 3) + arrow(470, 136, 446, 136, C.amber) + arrow(522, 136, 546, 136, C.amber)
        + text(368, 106, 'اسحب', { size: 13, weight: 600, fill: C.muted, anchor: 'start' });
      // 2. merge and center (top left)
      const b = frame(20, 14, 'دمج وتوسيط')
        + cell(40, 58, 256, 30, '#e3f1e8', '#1f8f5c') + text(168, 79, 'درجات سعد', { size: 15, weight: 700 })
        + [0, 1, 2, 3].map((i) => cell(40 + i * 64, 88, 64, 30)).join('')
        + text(168, 138, 'A1:D1 ← خلية واحدة', { size: 13, weight: 600, fill: C.muted });
      // 3. wrap text (bottom right)
      const c = frame(332, 160, 'التفاف النص')
        + cell(490, 200, 110, 76, '#fdebd3', C.amber)
        + text(545, 224, 'القرآن الكريم', { size: 13, weight: 600 }) + text(545, 244, 'والدراسات', { size: 13, weight: 600 })
        + text(545, 264, 'الإسلامية', { size: 13, weight: 600 })
        + text(410, 236, 'Alt+Enter', { size: 14, weight: 700, ltr: true, fill: C.right })
        + text(410, 258, 'سطر جديد', { size: 12, weight: 500, fill: C.muted });
      // 4. text angle (bottom left)
      const d = frame(20, 160, 'زاوية اتجاه النص')
        + cell(150, 200, 120, 76)
        + `<text x="210" y="238" font-size="15" font-weight="700" fill="${C.ink}" text-anchor="middle" font-family="inherit" transform="rotate(45 210 238)">أكبر قيمة</text>`
        + `<path d="M90 268 A44 44 0 0 1 59 240" fill="none" stroke="${C.amber}" stroke-width="3"/>` + head(66, 252, 59, 240, C.amber)
        + line(46, 268, 104, 268, C.ink, 2) + line(46, 268, 88, 226, C.ink, 2)
        + text(84, 216, '-45°', { size: 14, weight: 700, ltr: true, fill: C.amber });
      return svg(640, 308, 'تنسيق خلايا جدول البيانات', a + b + c + d);
    },

    // Auto Fill with the fill handle, then decreasing decimals.
    'g5-fill-handle'() {
      const xs = 400, cw = 120;
      const vals = ['398', '388', '369', '376'];
      let body = text(xs + cw / 2, 30, 'التعبئة التلقائية', { size: 18, weight: 700 })
        + `<rect x="${xs}" y="44" width="${cw}" height="32" fill="${C.soft}" stroke="#b9c6c2" stroke-width="1.5"/>`
        + text(xs + cw / 2, 66, 'F', { size: 15, weight: 700, ltr: true })
        + vals.map((v, i) => `<rect x="${xs}" y="${76 + i * 40}" width="${cw}" height="40" fill="${i ? '#e3f1e8' : '#fff'}" stroke="${i ? '#1f8f5c' : '#b9c6c2'}" stroke-width="1.5"/>`
          + text(xs + cw / 2, 102 + i * 40, v, { size: 17, weight: i ? 600 : 700, ltr: true, fill: i ? '#1f8f5c' : C.ink })).join('')
        + `<rect x="${xs - 2}" y="76" width="${cw + 4}" height="40" fill="none" stroke="#1f8f5c" stroke-width="3"/>`
        + `<rect x="${xs - 6}" y="112" width="9" height="9" fill="#1f8f5c" stroke="#fff" stroke-width="1.5"/>`
        + arrow(xs - 30, 120, xs - 30, 230, C.amber)
        + text(xs - 44, 104, '+', { size: 26, weight: 700, ltr: true })
        + text(xs - 54, 180, 'اسحب', { size: 14, weight: 600, fill: C.muted, anchor: 'start' })
        + text(xs + cw / 2, 268, 'مقبض التعبئة', { size: 14, weight: 600, fill: C.muted })
        + badge(xs + cw + 26, 96, '1') + badge(xs - 6, 140, '2');
      // decimals
      const bx = 40;
      body += text(bx + 110, 30, 'إنقاص العدد العشري', { size: 18, weight: 700 })
        + [['99.50', '99.5'], ['92.25', '92.3'], ['97.75', '97.8']].map(([a, b], i) => {
          const y = 56 + i * 62;
          return `<rect x="${bx + 130}" y="${y}" width="90" height="40" rx="6" fill="#fff" stroke="#b9c6c2" stroke-width="1.5"/>`
            + text(bx + 175, y + 26, a, { size: 17, weight: 600, ltr: true })
            + arrow(bx + 120, y + 20, bx + 100, y + 20, C.amber)
            + `<rect x="${bx}" y="${y}" width="90" height="40" rx="6" fill="#e3f1e8" stroke="#1f8f5c" stroke-width="1.5"/>`
            + text(bx + 45, y + 26, b, { size: 17, weight: 700, ltr: true, fill: '#1f8f5c' });
        }).join('')
        + text(bx + 110, 268, 'يُقرَّب الرقم لأقرب منزلة', { size: 14, weight: 600, fill: C.muted });
      return svg(640, 290, 'التعبئة التلقائية وتنسيق الأرقام العشرية', body + line(300, 30, 300, 270, C.line, 2));
    },
  });
})();
