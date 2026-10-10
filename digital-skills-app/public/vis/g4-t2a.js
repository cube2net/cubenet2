(function () {
  const { C, svg, text, poly, line, arrow, badge, panels, steps, table, head, globe, monitor, monitorPage, eye, share, bulb, character, sprite, sblock, cblock, hat, hexagon, rover, cube, shadow, phone, printer } = window.VisualKit;

  const rect = (x, y, w, h, fill, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx == null ? 8 : o.rx}" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}"` : ''}${o.extra || ''}/>`;
  const handle = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${C.muted}" stroke-width="2"/>`;
  const mountains = (x, y, w, h) =>
    rect(x, y, w, h, '#e3f2ec', { rx: 6 })
    + `<circle cx="${x + w * 0.25}" cy="${y + h * 0.3}" r="${h * 0.12}" fill="#f7c27a"/>`
    + poly([[x + 6, y + h - 4], [x + w * 0.4, y + h * 0.42], [x + w * 0.7, y + h - 4]], C.left)
    + poly([[x + w * 0.45, y + h - 4], [x + w * 0.75, y + h * 0.55], [x + w - 6, y + h - 4]], C.top);
  const key = (cx, cy, w, label, o = {}) =>
    rect(cx - w / 2, cy - 26, w, 52, '#fff', { rx: 10, stroke: C.ink, sw: 2.5 })
    + `<rect x="${cx - w / 2 + 4}" y="${cy + 18}" width="${w - 8}" height="5" rx="2" fill="${C.line}"/>`
    + text(cx, cy + 7, label, { size: o.size || 20, weight: 700, ltr: true });

  Object.assign(window.Visuals, {
    // Parts of a PowerPoint window: thumbnails, slide with title, bullets and picture.
    'g4-slide-parts'() {
      let thumbs = '';
      [0, 1, 2, 3].forEach((i) => {
        const y = 40 + i * 62;
        thumbs += text(612, y + 28, String(i + 1), { size: 13, weight: 600, fill: C.muted, ltr: true })
          + rect(510, y, 90, 50, '#fff', { rx: 4, stroke: i === 1 ? C.amber : C.line, sw: i === 1 ? 3 : 1.5 })
          + rect(522, y + 9, 66, 6, i === 0 ? C.right : C.line, { rx: 3 })
          + rect(522, y + 22, 40, 4, C.line, { rx: 2 }) + rect(522, y + 31, 50, 4, C.line, { rx: 2 })
          + `<rect x="510" y="${y + 44}" width="90" height="6" fill="#3fae5a"/>`;
      });
      const bullets = [0, 1, 2].map((i) => {
        const y = 128 + i * 34;
        return `<circle cx="452" cy="${y}" r="5" fill="${C.right}"/>` + rect(300, y - 5, 140, 10, '#c9d6d1', { rx: 5 });
      }).join('');
      const legend = [['1', 'العنوان'], ['2', 'تعداد نقطي'], ['3', 'صورة'], ['4', 'الصور المصغرة']].map(([n, t], i) => {
        const x = 600 - i * 150;
        return badge(x, 330, n) + text(x - 22, 336, t, { size: 16, weight: 600, fill: C.muted, anchor: 'start' });
      }).join('');
      return svg(640, 352, 'أجزاء نافذة العرض التقديمي',
        rect(20, 20, 470, 280, '#eef3f1', { rx: 14 })
        + rect(496, 20, 124, 280, '#f6f9f8', { rx: 14, stroke: C.line })
        + thumbs
        + rect(40, 40, 430, 240, '#fff', { rx: 6, stroke: C.line })
        + rect(130, 54, 330, 46, '#fff', { rx: 4, stroke: C.muted, extra: ' stroke-dasharray="6 5"' })
        + text(440, 85, 'الأطعمة الصحية', { size: 24, weight: 700, anchor: 'start' })
        + bullets
        + mountains(60, 112, 200, 120)
        + `<rect x="40" y="262" width="430" height="18" fill="#3fae5a"/>`
        + badge(130, 54, '1') + badge(468, 150, '2') + badge(60, 112, '3') + badge(612, 28, '4')
        + legend);
    },

    // Resize, move and rotate a picture.
    'g4-picture-handles'() {
      const pic = (x, cy, extra = '') => {
        const w = 120, h = 84, l = x - w / 2, t = cy - h / 2;
        return `<g${extra}>` + mountains(l, t, w, h)
          + `<rect x="${l}" y="${t}" width="${w}" height="${h}" fill="none" stroke="${C.muted}" stroke-width="1.5"/>`
          + handle(l, t) + handle(l + w, t) + handle(l, t + h) + handle(l + w, t + h)
          + handle(x, t) + handle(x, t + h) + handle(l, cy) + handle(l + w, cy) + '</g>';
      };
      return panels('تغيير حجم الصورة ونقلها وتدويرها', 290, [
        { title: 'تغيير الحجم', sub: 'اسحب مقبض الزاوية', draw: (x) => pic(x - 10, 120)
          + arrow(x + 44, 156, x + 80, 186, C.amber, true) },
        { title: 'النقل', sub: 'اضغط باستمرار واسحب', draw: (x) => pic(x, 120)
          + arrow(x, 120, x + 34, 120, C.right) + arrow(x, 120, x - 34, 120, C.right)
          + arrow(x, 120, x, 90, C.right) + arrow(x, 120, x, 150, C.right) },
        { title: 'التدوير', sub: 'اسحب الدائرة في الأعلى', draw: (x) => pic(x, 132, ` transform="rotate(-14 ${x} 132)"`)
          + `<path d="M${x - 30} 58 A34 34 0 0 1 ${x + 30} 58" fill="none" stroke="${C.amber}" stroke-width="3"/>`
          + head(x + 18, 50, x + 32, 62, C.amber)
          + `<circle cx="${x - 10}" cy="72" r="8" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>` },
      ]);
    },

    // Transition (between slides) vs animation (inside one slide).
    'g4-transition-animation'() {
      const slide = (x, y, w, h, opacity = 1) => `<g opacity="${opacity}">`
        + rect(x, y, w, h, '#fff', { rx: 6, stroke: C.line })
        + rect(x + 14, y + 12, w - 28, 10, C.right, { rx: 4 })
        + rect(x + w - 70, y + 34, 56, 7, C.line, { rx: 3 }) + rect(x + w - 82, y + 48, 68, 7, C.line, { rx: 3 })
        + `<rect x="${x}" y="${y + h - 9}" width="${w}" height="9" fill="#3fae5a"/></g>`;
      const chip = (cx, y, label) => rect(cx - 96, y, 192, 34, C.soft, { rx: 17 })
        + text(cx, y + 23, label, { size: 15, weight: 700, fill: C.right });
      return svg(640, 320, 'الفرق بين الانتقال وتأثير الحركة',
        rect(330, 14, 296, 292, '#fff', { rx: 18, stroke: C.line })
        + rect(14, 14, 296, 292, '#fff', { rx: 18, stroke: C.line })
        + text(478, 48, 'الانتقال', { size: 22, weight: 700 })
        + text(478, 72, 'بين شريحة وأخرى', { size: 14, weight: 500, fill: C.muted })
        + slide(500, 100, 106, 76) + badge(600, 104, '1')
        + slide(352, 150, 106, 76, 0.45) + slide(362, 160, 106, 76) + badge(366, 164, '2')
        + arrow(510, 186, 476, 200, C.amber)
        + chip(478, 254, 'علامة التبويب: انتقالات')
        + text(162, 48, 'تأثير الحركة', { size: 22, weight: 700 })
        + text(162, 72, 'لنص أو صورة داخل الشريحة', { size: 14, weight: 500, fill: C.muted })
        + rect(40, 92, 244, 140, '#fff', { rx: 6, stroke: C.line })
        + rect(56, 104, 212, 12, C.right, { rx: 4 })
        + [0, 1, 2].map((i) => {
          const y = 140 + i * 26, op = [1, 0.8, 0.3][i], dx = [0, 0, 40][i];
          return `<g opacity="${op}"><circle cx="${256 - dx}" cy="${y}" r="5" fill="${C.right}"/>` + rect(150 - dx, y - 5, 96, 10, '#c9d6d1', { rx: 5 })
            + rect(258, y - 9, 18, 18, '#f7dfe3', { rx: 3 }) + text(267, y + 5, String(i + 1), { size: 12, weight: 700, fill: C.rose, ltr: true }) + '</g>';
        }).join('')
        + arrow(84, 192, 116, 192, C.amber)
        + `<rect x="40" y="222" width="244" height="10" fill="#3fae5a"/>`
        + chip(162, 254, 'علامة التبويب: حركات'));
    },

    // Keys to run and control a slide show.
    'g4-show-keys'() {
      const items = [
        [560, 'F5', 'بدء العرض', 80],
        [414, 'Enter / →', 'الشريحة التالية', 124],
        [236, 'Backspace / ←', 'الشريحة السابقة', 156],
        [76, 'Esc', 'إيقاف العرض', 80],
      ];
      return svg(640, 230, 'مفاتيح تشغيل العرض التقديمي والتحكم فيه',
        items.map(([cx, k, label, w], i) => rect(cx - w / 2 - 14, 34, w + 28, 104, C.soft, { rx: 20 })
          + key(cx, 86, w, k, { size: k.length > 6 ? 16 : 22 })
          + text(cx, 182, label, { size: 18, weight: 700 })
          + (i === 0 ? text(cx, 206, 'من البداية', { size: 14, weight: 500, fill: C.muted }) : '')
          + (i === 3 ? text(cx, 206, 'في أي وقت', { size: 14, weight: 500, fill: C.muted }) : '')).join(''));
    },

    // A cell address = column letter + row number.
    'g4-cell-address'() {
      const cols = ['A', 'B', 'C', 'D'], x0 = 560, cw = 100, rh = 40, top = 92;
      let grid = '';
      // column headers right-to-left
      cols.forEach((c, i) => {
        const x = x0 - (i + 1) * cw;
        grid += `<rect x="${x}" y="${top}" width="${cw}" height="${rh}" fill="${c === 'B' ? '#cfe8de' : '#eef2f1'}" stroke="${C.line}" stroke-width="1.5"/>`
          + text(x + cw / 2, top + 27, c, { size: 18, weight: 700, fill: c === 'B' ? C.right : C.muted, ltr: true });
      });
      [1, 2, 3, 4, 5].forEach((r, j) => {
        const y = top + rh * (j + 1);
        grid += `<rect x="${x0}" y="${y}" width="50" height="${rh}" fill="${r === 3 ? '#cfe8de' : '#eef2f1'}" stroke="${C.line}" stroke-width="1.5"/>`
          + text(x0 + 25, y + 27, String(r), { size: 18, weight: 700, fill: r === 3 ? C.right : C.muted, ltr: true });
        cols.forEach((c, i) => {
          const x = x0 - (i + 1) * cw;
          const fill = (c === 'B' && r === 3) ? '#fff' : (c === 'B' || r === 3) ? '#f1f8f5' : '#fff';
          grid += `<rect x="${x}" y="${y}" width="${cw}" height="${rh}" fill="${fill}" stroke="${C.line}" stroke-width="1.5"/>`;
        });
      });
      grid += `<rect x="${x0 - 2 * cw}" y="${top + rh * 3}" width="${cw}" height="${rh}" fill="none" stroke="${C.right}" stroke-width="4"/>`
        + `<rect x="${x0 - cw - 5}" y="${top + rh * 4 - 5}" width="9" height="9" fill="${C.right}"/>`
        + text(x0 - 1.5 * cw, top + rh * 3 + 27, 'B3', { size: 20, weight: 700, fill: C.right, ltr: true });
      return svg(640, 340, 'عنوان الخلية: حرف العمود ورقم الصف',
        rect(20, 24, 120, 44, '#fff', { stroke: C.ink, sw: 2 })
        + text(80, 54, 'B3', { size: 22, weight: 700, ltr: true })
        + text(80, 86, 'مربع الاسم', { size: 13, weight: 600, fill: C.muted })
        + rect(150, 24, 410, 44, '#fff', { stroke: C.line })
        + text(500, 52, 'العمود B', { size: 18, weight: 700, fill: C.right })
        + text(435, 52, '+', { size: 20, weight: 700, fill: C.amber, ltr: true })
        + text(380, 52, 'الصف 3', { size: 18, weight: 700, fill: C.right })
        + text(320, 52, '=', { size: 20, weight: 700, fill: C.amber, ltr: true })
        + text(240, 52, 'الخلية B3', { size: 18, weight: 700, fill: C.right })
        + `<rect x="${x0}" y="${top}" width="50" height="${rh}" fill="#e1e7ea" stroke="${C.line}" stroke-width="1.5"/>`
        + grid);
    },

    // The four arithmetic operators in a spreadsheet formula.
    'g4-formula-ops'() {
      const items = [
        ['+', 'الجمع', '=B2+C2', '10 + 5 = 15', C.right],
        ['-', 'الطرح', '=B2-C2', '10 - 5 = 5', C.left],
        ['*', 'الضرب', '=B2*C2', '10 × 5 = 50', C.amber],
        ['/', 'القسمة', '=B2/C2', '10 ÷ 5 = 2', C.blue],
      ];
      const xs = [548, 400, 252, 104];
      return svg(640, 290, 'رموز العمليات الحسابية في جدول البيانات',
        rect(336, 12, 130, 36, C.soft, { rx: 18 }) + text(401, 36, 'B2 = 10', { size: 16, weight: 700, fill: C.right, ltr: true })
        + rect(174, 12, 130, 36, C.soft, { rx: 18 }) + text(239, 36, 'C2 = 5', { size: 16, weight: 700, fill: C.right, ltr: true })
        + items.map(([sym, name, f, ex, col], i) => {
          const x = xs[i];
          return rect(x - 68, 62, 136, 214, '#fff', { rx: 16, stroke: C.line })
            + `<circle cx="${x}" cy="114" r="32" fill="${col}"/>`
            + text(x, 128, sym, { size: 38, weight: 700, fill: '#fff', ltr: true })
            + text(x, 176, name, { size: 20, weight: 700 })
            + rect(x - 56, 192, 112, 32, '#f3f6f5', { rx: 8 })
            + text(x, 214, f, { size: 17, weight: 700, fill: C.ink, ltr: true })
            + text(x, 252, ex, { size: 15, weight: 600, fill: C.muted, ltr: true });
        }).join(''));
    },
  });
})();
