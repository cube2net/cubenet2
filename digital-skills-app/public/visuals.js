// Built-in illustrations for lesson pages and slides. Lesson JSON refers to them by
// name, e.g. { "type": "visual", "name": "axes-cube" }. Drawn for a light background.
(function () {
  const C = {
    top: '#8ad9c7', left: '#23957d', right: '#0e6b5c',
    ink: '#14232b', muted: '#5d6d76', line: '#cfdcd7', soft: '#e4f1ec', paper: '#ffffff',
    flat: '#d2ebe3', amber: '#e8912d', blue: '#2f7fc1', rose: '#cc4a5c', roseSoft: '#f7dfe3',
  };
  const TONES = {
    brand: [C.top, C.left, C.right],
    amber: ['#f7c27a', '#eba046', '#cf7a1c'],
    grey: ['#e1e7ea', '#bcc7cc', '#9eabb1'],
  };
  let uid = 0;
  const uniq = (prefix) => `${prefix}-${++uid}`;
  const r1 = (n) => Math.round(n * 10) / 10;

  function svg(w, h, label, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
  }
  // o.ltr keeps formulas and numbers in left-to-right order inside the RTL page.
  function text(x, y, value, o = {}) {
    const dir = o.ltr ? ' direction="ltr" unicode-bidi="embed"' : '';
    return `<text x="${r1(x)}" y="${r1(y)}" font-size="${o.size || 18}" font-weight="${o.weight || 600}" fill="${o.fill || C.ink}" text-anchor="${o.anchor || 'middle'}" font-family="inherit"${dir}>${value}</text>`;
  }
  function poly(points, fill, extra = '') {
    return `<polygon points="${points.map(([x, y]) => `${r1(x)},${r1(y)}`).join(' ')}" fill="${fill}" ${extra}/>`;
  }
  function line(x1, y1, x2, y2, stroke, width = 2, extra = '') {
    return `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;
  }

  // Isometric cube; (cx, cy) is the vertex shared by the three visible faces.
  function cube(cx, cy, s, tone = 'brand') {
    const [t, l, r] = TONES[tone];
    const w = s * 0.866, h = s / 2;
    return poly([[cx, cy - s], [cx + w, cy - h], [cx, cy], [cx - w, cy - h]], t)
      + poly([[cx - w, cy - h], [cx, cy], [cx, cy + s], [cx - w, cy + h]], l)
      + poly([[cx, cy], [cx + w, cy - h], [cx + w, cy + h], [cx, cy + s]], r);
  }
  function sphere(cx, cy, r) {
    const id = uniq('sph');
    return `<defs><radialGradient id="${id}" cx="35%" cy="30%" r="78%"><stop offset="0" stop-color="#c9f1e7"/><stop offset="0.45" stop-color="${C.top}"/><stop offset="1" stop-color="${C.right}"/></radialGradient></defs>`
      + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/>`;
  }
  function pyramid(cx, cy, s) {
    const w = s * 0.866, h = s / 2, apex = [cx, cy - s * 1.1];
    return poly([apex, [cx - w, cy], [cx, cy + h]], C.left) + poly([apex, [cx, cy + h], [cx + w, cy]], C.right);
  }
  function cylinder(cx, cy, r, height) {
    const id = uniq('cyl'), ry = r1(r * 0.32);
    return `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${C.left}"/><stop offset="0.55" stop-color="${C.top}"/><stop offset="1" stop-color="${C.right}"/></linearGradient></defs>`
      + `<path d="M${cx - r},${cy} L${cx - r},${cy + height} A${r},${ry} 0 0 0 ${cx + r},${cy + height} L${cx + r},${cy} Z" fill="url(#${id})"/>`
      + `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${ry}" fill="${C.top}"/>`;
  }
  function shadow(cx, cy, rx) {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${r1(rx * 0.22)}" fill="${C.ink}" opacity="0.1"/>`;
  }
  function head(x1, y1, x2, y2, color) {
    const a = Math.atan2(y2 - y1, x2 - x1), L = 13, W = 7;
    const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    const px = -W * Math.sin(a), py = W * Math.cos(a);
    return poly([[x2, y2], [bx + px, by + py], [bx - px, by - py]], color);
  }
  function arrow(x1, y1, x2, y2, color = C.amber, both = false) {
    const a = Math.atan2(y2 - y1, x2 - x1), cut = 10;
    const sx = both ? x1 + cut * Math.cos(a) : x1, sy = both ? y1 + cut * Math.sin(a) : y1;
    return line(sx, sy, x2 - cut * Math.cos(a), y2 - cut * Math.sin(a), color, 4)
      + head(x1, y1, x2, y2, color) + (both ? head(x2, y2, x1, y1, color) : '');
  }
  function badge(x, y, n) {
    return `<circle cx="${x}" cy="${y}" r="15" fill="${C.amber}" stroke="#fff" stroke-width="3"/>`
      + text(x, y + 6, n, { size: 16, weight: 700, fill: '#fff' });
  }

  // Small icons
  function printer(cx, cy) {
    return `<rect x="${cx - 30}" y="${cy - 30}" width="60" height="58" rx="5" fill="none" stroke="${C.ink}" stroke-width="3"/>`
      + line(cx - 30, cy - 14, cx + 30, cy - 14, C.ink, 2)
      + poly([[cx - 7, cy - 14], [cx + 7, cy - 14], [cx, cy - 4]], C.amber)
      + cube(cx, cy + 9, 11)
      + line(cx - 22, cy + 22, cx + 22, cy + 22, C.ink, 3);
  }
  function bulb(cx, cy) {
    let rays = '';
    for (const deg of [-160, -125, -90, -55, -20]) {
      const a = (deg * Math.PI) / 180;
      rays += line(cx + 27 * Math.cos(a), cy - 8 + 27 * Math.sin(a), cx + 35 * Math.cos(a), cy - 8 + 35 * Math.sin(a), C.amber, 3);
    }
    return rays
      + `<circle cx="${cx}" cy="${cy - 8}" r="19" fill="#f7c27a" stroke="${C.amber}" stroke-width="3"/>`
      + `<rect x="${cx - 9}" y="${cy + 11}" width="18" height="13" rx="3" fill="${C.ink}"/>`;
  }
  function monitor(cx, cy) {
    return `<rect x="${cx - 32}" y="${cy - 28}" width="64" height="44" rx="5" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>`
      + cube(cx, cy - 6, 13)
      + `<rect x="${cx - 4}" y="${cy + 16}" width="8" height="8" fill="${C.ink}"/>`
      + `<rect x="${cx - 16}" y="${cy + 24}" width="32" height="4" rx="2" fill="${C.ink}"/>`;
  }
  function rotate(cx, cy) {
    return `<path d="M${cx + 36} ${cy + 6} A36 14 0 0 0 ${cx - 36} ${cy + 6}" fill="none" stroke="${C.muted}" stroke-width="2" stroke-dasharray="4 5"/>`
      + cube(cx, cy - 2, 18)
      + `<path d="M${cx - 36} ${cy + 6} A36 14 0 0 0 ${cx + 36} ${cy + 6}" fill="none" stroke="${C.amber}" stroke-width="3"/>`
      + head(cx + 28, cy + 16, cx + 37, cy + 3, C.amber);
  }
  function gamepad(cx, cy) {
    return `<rect x="${cx - 40}" y="${cy - 22}" width="80" height="44" rx="22" fill="${C.right}"/>`
      + `<rect x="${cx - 28}" y="${cy - 3}" width="20" height="6" rx="2" fill="${C.paper}"/>`
      + `<rect x="${cx - 21}" y="${cy - 10}" width="6" height="20" rx="2" fill="${C.paper}"/>`
      + `<circle cx="${cx + 16}" cy="${cy - 5}" r="5" fill="${C.amber}"/><circle cx="${cx + 26}" cy="${cy + 5}" r="5" fill="${C.top}"/>`;
  }
  function clapper(cx, cy) {
    let stripes = '';
    for (let k = 0; k < 4; k++) {
      stripes += poly([[cx - 30 + k * 18, cy - 28], [cx - 22 + k * 18, cy - 28], [cx - 28 + k * 18, cy - 15], [cx - 36 + k * 18, cy - 15]], C.paper);
    }
    return `<rect x="${cx - 36}" y="${cy - 10}" width="72" height="42" rx="5" fill="${C.ink}"/>`
      + `<rect x="${cx - 36}" y="${cy - 28}" width="72" height="13" rx="3" fill="${C.ink}"/>` + stripes
      + poly([[cx - 8, cy], [cx + 12, cy + 11], [cx - 8, cy + 22]], C.amber);
  }
  function building(cx, cy) {
    let windows = '';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 2; c++) windows += `<rect x="${cx - 28 + c * 16}" y="${cy - 28 + r * 16}" width="10" height="9" fill="${C.top}"/>`;
    }
    for (let r = 0; r < 3; r++) windows += `<rect x="${cx + 14}" y="${cy - 6 + r * 14}" width="16" height="7" fill="${C.top}"/>`;
    return `<rect x="${cx - 34}" y="${cy - 36}" width="38" height="72" fill="${C.left}"/>`
      + `<rect x="${cx + 8}" y="${cy - 14}" width="28" height="50" fill="${C.right}"/>` + windows
      + line(cx - 42, cy + 36, cx + 42, cy + 36, C.ink, 3);
  }
  function medical(cx, cy) {
    return `<circle cx="${cx}" cy="${cy}" r="34" fill="${C.roseSoft}"/>`
      + `<rect x="${cx - 7}" y="${cy - 22}" width="14" height="44" rx="3" fill="${C.rose}"/>`
      + `<rect x="${cx - 22}" y="${cy - 7}" width="44" height="14" rx="3" fill="${C.rose}"/>`;
  }
  function phone(cx, cy) {
    return `<rect x="${cx - 20}" y="${cy - 34}" width="40" height="68" rx="8" fill="${C.ink}"/>`
      + `<rect x="${cx - 15}" y="${cy - 27}" width="30" height="50" rx="3" fill="${C.soft}"/>`
      + cube(cx, cy - 2, 10);
  }
  function monitorPage(cx, cy) {
    return `<rect x="${cx - 32}" y="${cy - 28}" width="64" height="44" rx="5" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>`
      + `<rect x="${cx - 26}" y="${cy - 22}" width="52" height="9" rx="2" fill="${C.right}"/>`
      + line(cx + 22, cy - 5, cx - 6, cy - 5, C.line, 4) + line(cx + 22, cy + 4, cx - 18, cy + 4, C.line, 4)
      + `<rect x="${cx - 4}" y="${cy + 16}" width="8" height="8" fill="${C.ink}"/>`
      + `<rect x="${cx - 16}" y="${cy + 24}" width="32" height="4" rx="2" fill="${C.ink}"/>`;
  }
  function eye(cx, cy) {
    return `<path d="M${cx - 34} ${cy} Q${cx} ${cy - 30} ${cx + 34} ${cy} Q${cx} ${cy + 30} ${cx - 34} ${cy} Z" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>`
      + `<circle cx="${cx}" cy="${cy}" r="11" fill="${C.right}"/><circle cx="${cx + 3}" cy="${cy - 3}" r="3" fill="#fff"/>`;
  }
  function globe(cx, cy) {
    return `<circle cx="${cx}" cy="${cy}" r="30" fill="${C.top}" stroke="${C.right}" stroke-width="3"/>`
      + `<ellipse cx="${cx}" cy="${cy}" rx="13" ry="30" fill="none" stroke="${C.right}" stroke-width="2.5"/>`
      + line(cx - 30, cy, cx + 30, cy, C.right, 2.5)
      + `<path d="M${cx - 26} ${cy - 14} Q${cx} ${cy - 8} ${cx + 26} ${cy - 14} M${cx - 26} ${cy + 14} Q${cx} ${cy + 8} ${cx + 26} ${cy + 14}" fill="none" stroke="${C.right}" stroke-width="2.5"/>`;
  }
  function share(cx, cy) {
    return line(cx - 20, cy, cx + 20, cy - 18, C.ink, 3) + line(cx - 20, cy, cx + 20, cy + 18, C.ink, 3)
      + `<circle cx="${cx + 20}" cy="${cy - 18}" r="10" fill="${C.right}"/><circle cx="${cx - 20}" cy="${cy}" r="10" fill="${C.amber}"/><circle cx="${cx + 20}" cy="${cy + 18}" r="10" fill="${C.right}"/>`;
  }
  function character(cx, cy) {
    return line(cx, cy - 26, cx, cy - 36, C.ink, 3) + `<circle cx="${cx}" cy="${cy - 38}" r="5" fill="${C.amber}"/>`
      + `<rect x="${cx - 24}" y="${cy - 26}" width="48" height="40" rx="12" fill="${C.right}"/>`
      + `<circle cx="${cx - 9}" cy="${cy - 8}" r="6" fill="#fff"/><circle cx="${cx + 9}" cy="${cy - 8}" r="6" fill="#fff"/>`
      + `<circle cx="${cx - 9}" cy="${cy - 7}" r="2.5" fill="${C.ink}"/><circle cx="${cx + 9}" cy="${cy - 7}" r="2.5" fill="${C.ink}"/>`
      + `<rect x="${cx - 16}" y="${cy + 16}" width="32" height="10" rx="5" fill="${C.left}"/>`;
  }
  function rulesList(cx, cy) {
    let rows = '';
    for (let i = 0; i < 3; i++) {
      const y = cy - 10 + i * 13;
      rows += line(cx + 12, y, cx - 8, y, C.line, 4) + `<circle cx="${cx + 16}" cy="${y}" r="3" fill="${C.left}"/>`;
    }
    return `<rect x="${cx - 24}" y="${cy - 30}" width="48" height="62" rx="6" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>`
      + `<rect x="${cx - 12}" y="${cy - 36}" width="24" height="12" rx="3" fill="${C.amber}"/>` + rows;
  }
  function trophy(cx, cy) {
    return `<path d="M${cx - 22} ${cy - 18} q-14 0 -12 12 q2 10 14 10 M${cx + 22} ${cy - 18} q14 0 12 12 q-2 10 -14 10" fill="none" stroke="${C.amber}" stroke-width="4"/>`
      + `<path d="M${cx - 22} ${cy - 26} H${cx + 22} V${cy - 6} Q${cx + 22} ${cy + 10} ${cx} ${cy + 12} Q${cx - 22} ${cy + 10} ${cx - 22} ${cy - 6} Z" fill="#f7c27a" stroke="${C.amber}" stroke-width="3"/>`
      + `<rect x="${cx - 4}" y="${cy + 12}" width="8" height="10" fill="${C.amber}"/>`
      + `<rect x="${cx - 16}" y="${cy + 22}" width="32" height="7" rx="2" fill="${C.ink}"/>`;
  }
  function rover(cx, cy, k = 1) {
    return `<g transform="translate(${cx} ${cy}) scale(${k})">`
      + line(8, -34, 14, -46, C.ink, 2.5) + `<circle cx="14" cy="-47" r="3.5" fill="${C.rose}"/>`
      + `<rect x="-16" y="-36" width="30" height="20" rx="5" fill="#f7c27a"/>`
      + `<rect x="-10" y="-31" width="12" height="9" rx="2" fill="#d6eef8"/>`
      + `<rect x="-32" y="-18" width="64" height="22" rx="7" fill="${C.amber}"/>`
      + `<circle cx="-18" cy="8" r="10" fill="${C.ink}"/><circle cx="18" cy="8" r="10" fill="${C.ink}"/>`
      + `<circle cx="-18" cy="8" r="4" fill="#9eabb1"/><circle cx="18" cy="8" r="4" fill="#9eabb1"/></g>`;
  }
  function apple(cx, cy, r = 11) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#d64545"/>`
      + line(cx, cy - r, cx + 2, cy - r - 6, '#6b4a2b', 2.5)
      + `<ellipse cx="${cx + 7}" cy="${cy - r - 3}" rx="6" ry="3" fill="#4caf50" transform="rotate(-25 ${cx + 7} ${cy - r - 3})"/>`
      + `<circle cx="${cx - r / 3}" cy="${cy - r / 3}" r="${r / 4}" fill="#fff" opacity="0.5"/>`;
  }

  // RTL table: the first column is drawn on the right. o.fills maps "row,col" to a fill.
  function table(x, y, widths, rowH, rows, o = {}) {
    const total = widths.reduce((a, b) => a + b, 0);
    let out = '';
    rows.forEach((row, r) => {
      let right = x + total;
      row.forEach((value, c) => {
        const w = widths[c], left = right - w, top = y + r * rowH;
        const header = o.header && r === 0;
        let fill = C.paper;
        if (o.fills && o.fills[`${r},${c}`]) fill = o.fills[`${r},${c}`];
        else if (header) fill = o.headerFill || C.soft;
        else if (o.row === r) fill = '#fdebd3';
        else if (o.col === c) fill = '#dcebf7';
        out += `<rect x="${left}" y="${top}" width="${w}" height="${rowH}" fill="${fill}" stroke="${o.stroke || C.line}" stroke-width="1.5"/>`;
        if (value !== '') {
          out += text(left + w / 2, top + rowH / 2 + (o.size || 16) * 0.35, value, {
            size: o.size || 16,
            weight: header ? 700 : 500,
            fill: header && o.headerText ? o.headerText : C.ink,
            ltr: /^[=\dA-Z.:%*+\-/^() ]+$/.test(value),
          });
        }
        right = left;
      });
    });
    return out;
  }

  // Numbered process: up to four steps laid out right-to-left with arrows between them.
  function steps(label, list, icons) {
    const cy = 64, xs = list.length === 4 ? [548, 400, 252, 104] : [520, 320, 120];
    let body = '';
    xs.forEach((x, i) => {
      body += `<circle cx="${x}" cy="${cy}" r="50" fill="${C.soft}"/>` + icons[i](x, cy)
        + badge(x + 38, cy - 38, String(i + 1))
        + text(x, cy + 92, list[i][0], { size: 21, weight: 700 })
        + text(x, cy + 120, list[i][1], { size: 15, weight: 500, fill: C.muted });
      if (i < xs.length - 1) body += arrow(x - 58, cy, xs[i + 1] + 58, cy);
    });
    return svg(640, 205, label, body);
  }

  // Three framed panels with a caption under each (used by several "compare" visuals).
  function panels(label, height, items) {
    const xs = [530, 320, 110];
    return svg(640, height, label, items.map((item, i) => {
      const x = xs[i];
      return `<rect x="${x - 98}" y="14" width="196" height="${height - 28}" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + item.draw(x)
        + text(x, height - 66, item.title, { size: 20, weight: 700 })
        + (item.sub ? text(x, height - 40, item.sub, { size: 14, weight: 500, fill: C.muted }) : '');
    }).join(''));
  }

  const Visuals = {
    hero() {
      return svg(640, 400, 'أشكال ثلاثية الأبعاد',
        poly([[320, 205], [600, 300], [320, 395], [40, 300]], C.soft)
        + `<path d="M70 190 Q 320 20 580 170" fill="none" stroke="${C.line}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>`
        + shadow(165, 318, 52) + sphere(165, 268, 52)
        + pyramid(490, 300, 76)
        + shadow(320, 326, 70) + cube(320, 228, 96)
        + cube(540, 110, 30, 'amber')
        + cylinder(105, 112, 22, 34));
    },

    'flat-vs-solid'() {
      return svg(640, 330, 'مقارنة بين الأشكال ثنائية الأبعاد وثلاثية الأبعاد',
        `<rect x="344" y="14" width="282" height="302" rx="20" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<rect x="14" y="14" width="282" height="302" rx="20" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + text(485, 56, 'ثنائي الأبعاد', { size: 22, weight: 700 })
        + text(485, 82, 'مسطّح على سطح مستوٍ', { size: 15, weight: 500, fill: C.muted })
        + text(155, 56, 'ثلاثي الأبعاد', { size: 22, weight: 700 })
        + text(155, 82, 'يشغل حيّزًا في الفراغ', { size: 15, weight: 500, fill: C.muted })
        + `<rect x="380" y="120" width="88" height="88" rx="3" fill="${C.flat}" stroke="${C.right}" stroke-width="3"/>`
        + `<circle cx="562" cy="164" r="45" fill="${C.flat}" stroke="${C.right}" stroke-width="3"/>`
        + text(424, 250, 'مربع') + text(562, 250, 'دائرة')
        + shadow(92, 214, 44) + cube(92, 160, 52)
        + shadow(222, 214, 40) + sphere(222, 166, 46)
        + text(92, 250, 'مكعب') + text(222, 250, 'كرة')
        + text(485, 292, 'طول × عرض', { size: 16, weight: 500, fill: C.muted })
        + text(155, 292, 'طول × عرض × ارتفاع', { size: 16, weight: 500, fill: C.muted })
        + arrow(336, 165, 304, 165));
    },

    'axes-cube'() {
      return svg(640, 360, 'أبعاد المكعب: الطول والعرض والارتفاع',
        shadow(320, 302, 92)
        + cube(320, 180, 120)
        + arrow(331, 320, 435, 260, C.amber, true)
        + arrow(309, 320, 205, 260, C.blue, true)
        + arrow(450, 120, 450, 240, C.rose, true)
        + text(414, 330, 'الطول', { size: 22, weight: 700, fill: C.amber })
        + text(226, 330, 'العرض', { size: 22, weight: 700, fill: C.blue })
        + text(512, 187, 'الارتفاع', { size: 22, weight: 700, fill: C.rose }));
    },

    'shape-pairs'() {
      const F = `fill="${C.flat}" stroke="${C.right}" stroke-width="3"`;
      const cols = [
        { x: 530, a: 'مربع', b: 'مكعب', flat: (x) => `<rect x="${x - 36}" y="38" width="72" height="72" rx="3" ${F}/>`, solid: (x) => shadow(x, 312, 42) + cube(x, 258, 52) },
        { x: 320, a: 'دائرة', b: 'كرة', flat: (x) => `<circle cx="${x}" cy="74" r="37" ${F}/>`, solid: (x) => shadow(x, 312, 40) + sphere(x, 262, 48) },
        { x: 110, a: 'مثلث', b: 'هرم', flat: (x) => poly([[x, 36], [x + 42, 110], [x - 42, 110]], C.flat, `stroke="${C.right}" stroke-width="3" stroke-linejoin="round"`), solid: (x) => pyramid(x, 284, 62) },
      ];
      return svg(640, 370, 'أشكال مسطحة والمجسمات المقابلة لها',
        line(215, 24, 215, 350, C.line, 2, 'stroke-dasharray="6 8"')
        + line(425, 24, 425, 350, C.line, 2, 'stroke-dasharray="6 8"')
        + cols.map((c) => c.flat(c.x) + text(c.x, 138, c.a) + arrow(c.x, 152, c.x, 192)
          + c.solid(c.x) + text(c.x, 352, c.b, { size: 20, weight: 700 })).join(''));
    },

    'modeling-flow'() {
      return steps('مراحل النمذجة ثلاثية الأبعاد',
        [['الفكرة', 'نتخيّل الشكل'], ['التصميم', 'نبنيه بالبرنامج'], ['المعاينة', 'نراه من كل الجهات'], ['الإنتاج', 'نطبعه أو نستخدمه']],
        [bulb, monitor, rotate, printer]);
    },

    // ---------- Term 1 · Unit 1 · 3D shape tools ----------

    'shape-handles'() {
      const handle = (x, y) => `<rect x="${r1(x - 4)}" y="${r1(y - 4)}" width="8" height="8" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`;
      return panels('معالجة الشكل: التحريك والتدوير وتغيير الحجم', 330, [
        { title: 'التحريك', sub: 'اسحب الشكل إلى مكانه', draw: (x) => cube(x, 150, 42)
          + arrow(x, 100, x, 62) + arrow(x, 202, x, 240) + arrow(x + 48, 150, x + 84, 150) + arrow(x - 48, 150, x - 84, 150) },
        { title: 'التدوير', sub: 'بمقبض السهم المنحني', draw: (x) => cube(x, 165, 42)
          + `<path d="M${x - 58} 128 A58 24 0 0 1 ${x + 58} 128" fill="none" stroke="${C.amber}" stroke-width="4"/>`
          + head(x + 48, 114, x + 59, 130, C.amber) },
        { title: 'تغيير الحجم', sub: 'بالمقابض البيضاء', draw: (x) => cube(x + 50, 178, 18)
          + arrow(x + 28, 168, x + 6, 168) + cube(x - 32, 165, 36)
          + handle(x - 63.2, 147) + handle(x - 0.8, 147) + handle(x - 32, 129) + handle(x - 32, 201) },
      ]);
    },

    'solid-hole'() {
      const id = uniq('hole');
      const hole = (cx, cy, r, h) => {
        const ry = r1(r * 0.32);
        return `<defs><pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#e3e9eb"/><line x1="0" y1="0" x2="0" y2="8" stroke="#aab7bd" stroke-width="3"/></pattern></defs>`
          + `<path d="M${cx - r},${cy} L${cx - r},${cy + h} A${r},${ry} 0 0 0 ${cx + r},${cy + h} L${cx + r},${cy} Z" fill="url(#${id})" stroke="#7f8f96" stroke-width="2" stroke-dasharray="6 5"/>`
          + `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${ry}" fill="#eef2f3" stroke="#7f8f96" stroke-width="2" stroke-dasharray="6 5"/>`;
      };
      return svg(640, 300, 'تجميع شكل صلب مع شكل مفرغ',
        shadow(540, 212, 50) + cylinder(540, 110, 46, 92)
        + text(432, 176, '+', { size: 44, weight: 500, fill: C.muted })
        + hole(330, 104, 36, 98)
        + text(218, 142, 'تجميع', { size: 16, weight: 700, fill: C.amber }) + arrow(244, 160, 192, 160)
        + shadow(105, 212, 50) + cylinder(105, 110, 46, 92)
        + `<ellipse cx="105" cy="110" rx="36" ry="11.5" fill="#0a4a40"/>`
        + text(540, 256, 'شكل صلب', { size: 19, weight: 700 }) + text(330, 256, 'شكل مفرغ (فتحة)', { size: 19, weight: 700 })
        + text(105, 256, 'النتيجة: كوب مجوَّف', { size: 19, weight: 700 })
        + text(540, 282, 'Solid', { size: 14, weight: 500, fill: C.muted, ltr: true })
        + text(330, 282, 'Hole', { size: 14, weight: 500, fill: C.muted, ltr: true }));
    },

    'tool-tiles'() {
      const xs = [482, 326, 170, 14];
      const tiles = [
        ['المحاذاة', (cx) => line(cx + 32, 52, cx + 32, 128, C.amber, 3)
          + `<rect x="${cx - 28}" y="60" width="60" height="16" rx="3" fill="${C.right}"/><rect x="${cx - 8}" y="82" width="40" height="16" rx="3" fill="${C.left}"/><rect x="${cx - 43}" y="104" width="75" height="16" rx="3" fill="${C.top}"/>`],
        ['التجميع', (cx) => `<rect x="${cx - 48}" y="48" width="96" height="84" rx="10" fill="none" stroke="${C.amber}" stroke-width="2.5" stroke-dasharray="6 5"/>`
          + cube(cx - 16, 92, 18) + sphere(cx + 20, 96, 16)],
        ['المرآة', (cx) => line(cx, 46, cx, 132, C.muted, 2, 'stroke-dasharray="5 5"')
          + poly([[cx - 10, 60], [cx - 10, 122], [cx - 46, 122]], C.right) + poly([[cx + 10, 60], [cx + 10, 122], [cx + 46, 122]], C.top)],
        ['النسخ والمضاعفة', (cx) => cube(cx - 32, 104, 16) + cube(cx, 94, 16) + cube(cx + 32, 84, 16)],
      ];
      return svg(640, 220, 'أدوات المحاذاة والتجميع والمرآة والنسخ', tiles.map(([label, icon], i) => {
        const x = xs[i];
        return `<rect x="${x}" y="14" width="144" height="192" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
          + icon(x + 72) + text(x + 72, 176, label, { size: 16, weight: 700 });
      }).join(''));
    },

    // ---------- Term 1 · Unit 2 · Spreadsheets ----------

    spreadsheet() {
      const grey = '#eef2f1';
      const rows = [
        ['', 'A', 'B', 'C', 'D'],
        ['1', 'الصنف', 'الكمية', 'السعر', 'الإجمالي'],
        ['2', 'دفتر', '3', '5', '15'],
        ['3', 'قلم', '4', '2', '8'],
        ['4', 'مسطرة', '2', '3', '6'],
      ];
      const fills = { '1,0': grey, '2,0': grey, '3,0': grey, '4,0': grey };
      return svg(640, 320, 'جدول بيانات فيه معادلة في شريط الصيغة',
        `<rect x="520" y="40" width="100" height="40" rx="6" fill="${C.paper}" stroke="${C.line}" stroke-width="1.5"/>`
        + text(570, 66, 'D2', { size: 17, ltr: true })
        + text(498, 66, 'fx', { size: 17, weight: 500, fill: C.muted, ltr: true })
        + `<rect x="100" y="40" width="380" height="40" rx="6" fill="${C.paper}" stroke="${C.line}" stroke-width="1.5"/>`
        + text(290, 67, '=B2*C2', { size: 20, weight: 700, fill: C.right, ltr: true })
        + table(100, 100, [44, 119, 119, 119, 119], 40, rows, { header: true, headerFill: grey, fills })
        + `<rect x="100" y="180" width="119" height="40" fill="none" stroke="#1f8f5c" stroke-width="3.5"/>`
        + `<rect x="96" y="216" width="8" height="8" fill="#1f8f5c"/>`
        + badge(76, 60, '1') + badge(76, 200, '2'));
    },

    'operations-order'() {
      const rowsData = [['الأقواس ( )', C.right, '#fff'], ['الأسس ^', C.left, '#fff'], ['الضرب والقسمة * /', '#4fb39d', C.ink], ['الجمع والطرح + -', C.top, C.ink]];
      let stair = '';
      rowsData.forEach(([label, fill, ink], i) => {
        const y = 24 + i * 66;
        stair += `<rect x="340" y="${y}" width="280" height="54" rx="12" fill="${fill}"/>`
          + `<circle cx="592" cy="${y + 27}" r="16" fill="#fff"/>` + text(592, y + 33, String(i + 1), { size: 17, weight: 700, fill: C.right })
          + text(462, y + 34, label, { size: 19, weight: 700, fill: ink });
        if (i < 3) stair += head(330, y + 40, 330, y + 70, C.amber);
      });
      return svg(640, 300, 'أولوية تنفيذ العمليات الحسابية',
        stair + line(330, 44, 330, 236, C.amber, 3)
        + `<rect x="20" y="24" width="280" height="252" rx="16" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + text(160, 62, 'مثال', { size: 18, weight: 700, fill: C.muted })
        + text(160, 118, '2 + 3 × 4', { size: 30, weight: 600, ltr: true })
        + text(160, 172, '= 2 + 12', { size: 30, weight: 600, ltr: true })
        + text(160, 226, '= 14', { size: 30, weight: 700, fill: C.right, ltr: true })
        + text(160, 258, 'الضرب يُنفَّذ قبل الجمع', { size: 14, weight: 500, fill: C.muted }));
    },

    'chart-types'() {
      const xs = [482, 326, 170, 14];
      const pie = (cx, cy, r) => {
        const pt = (deg) => [cx + r * Math.cos((deg - 90) * Math.PI / 180), cy + r * Math.sin((deg - 90) * Math.PI / 180)];
        const wedge = (a, b, fill) => {
          const [x1, y1] = pt(a), [x2, y2] = pt(b);
          return `<path d="M${cx} ${cy} L${r1(x1)} ${r1(y1)} A${r} ${r} 0 ${b - a > 180 ? 1 : 0} 1 ${r1(x2)} ${r1(y2)} Z" fill="${fill}" stroke="#fff" stroke-width="2"/>`;
        };
        return wedge(0, 150, C.right) + wedge(150, 250, C.amber) + wedge(250, 360, C.top);
      };
      const charts = [
        ['المخطط العمودي', (cx) => line(cx - 52, 130, cx + 52, 130, C.ink, 2)
          + [40, 70, 55, 88].map((h, i) => `<rect x="${cx - 44 + i * 24}" y="${130 - h}" width="16" height="${h}" rx="2" fill="${i % 2 ? C.left : C.right}"/>`).join('')],
        ['المخطط الشريطي', (cx) => line(cx + 52, 40, cx + 52, 132, C.ink, 2)
          + [60, 88, 42, 72].map((w, i) => `<rect x="${cx + 52 - w}" y="${46 + i * 22}" width="${w}" height="14" rx="2" fill="${i % 2 ? C.amber : '#f7c27a'}"/>`).join('')],
        ['المخطط الدائري', (cx) => pie(cx, 86, 44)],
        ['المخطط الخطي', (cx) => line(cx - 52, 130, cx + 52, 130, C.ink, 2) + line(cx - 52, 40, cx - 52, 130, C.ink, 2)
          + `<polyline points="${cx - 44},118 ${cx - 22},92 ${cx},104 ${cx + 22},66 ${cx + 44},52" fill="none" stroke="${C.right}" stroke-width="4" stroke-linejoin="round"/>`
          + [[-44, 118], [-22, 92], [0, 104], [22, 66], [44, 52]].map(([dx, y]) => `<circle cx="${cx + dx}" cy="${y}" r="5" fill="${C.amber}"/>`).join('')],
      ];
      return svg(640, 220, 'أنواع المخططات البيانية', charts.map(([label, draw], i) => {
        const x = xs[i];
        return `<rect x="${x}" y="14" width="144" height="192" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
          + draw(x + 72) + text(x + 72, 178, label, { size: 15, weight: 700 });
      }).join(''));
    },

    'data-to-chart'() {
      const data = [['رياضيات', 18], ['علوم', 15], ['لغتي', 20], ['مهارات', 17]];
      const rows = [['المادة', 'الدرجة'], ...data.map(([s, v]) => [s, String(v)])];
      let bars = '';
      data.forEach(([s, v], i) => {
        const cx = 285 - i * 62, h = v * 10;
        bars += `<rect x="${cx - 18}" y="${270 - h}" width="36" height="${h}" rx="3" fill="${i % 2 ? C.left : C.right}"/>`
          + text(cx, 262 - h, String(v), { size: 14, weight: 700 })
          + text(cx, 292, s, { size: 13, weight: 600, fill: C.muted });
      });
      return svg(640, 310, 'تحويل جدول الدرجات إلى مخطط عمودي',
        table(400, 40, [120, 100], 44, rows, { header: true })
        + arrow(388, 150, 344, 150)
        + line(40, 270, 322, 270, C.ink, 2) + line(322, 50, 322, 270, C.ink, 2)
        + [5, 10, 15, 20].map((v) => line(40, 270 - v * 10, 322, 270 - v * 10, C.line, 1, 'stroke-dasharray="3 5"')
          + text(334, 275 - v * 10, String(v), { size: 11, weight: 500, fill: C.muted })).join('')
        + bars);
    },

    // ---------- Term 1 · Unit 3 · Databases ----------

    'database-structure'() {
      const miniTable = (x, y, highlight) => {
        let out = `<rect x="${x}" y="${y}" width="76" height="54" rx="4" fill="${C.paper}" stroke="${C.right}" stroke-width="2"/>`
          + `<rect x="${x}" y="${y}" width="76" height="13" rx="3" fill="${C.right}"/>`;
        for (let i = 1; i < 4; i++) out += line(x, y + 13 + i * 10.25, x + 76, y + 13 + i * 10.25, C.line, 1);
        for (let i = 1; i < 3; i++) out += line(x + i * 25.3, y + 13, x + i * 25.3, y + 54, C.line, 1);
        if (highlight) {
          out += `<rect x="${x}" y="${y + 23.25}" width="76" height="10.25" fill="#f7c27a" opacity="0.8"/>`
            + `<rect x="${x + 25.3}" y="${y + 13}" width="25.3" height="41" fill="${C.blue}" opacity="0.35"/>`;
        }
        return out;
      };
      return svg(640, 240, 'مكونات قاعدة البيانات',
        `<path d="M494 60 V130 A46 15 0 0 0 586 130 V60" fill="${C.left}"/>`
        + `<ellipse cx="540" cy="60" rx="46" ry="15" fill="${C.top}"/>`
        + `<path d="M494 84 A46 15 0 0 0 586 84 M494 108 A46 15 0 0 0 586 108" fill="none" stroke="${C.top}" stroke-width="3"/>`
        + arrow(476, 96, 424, 96)
        + miniTable(276, 52, false) + miniTable(302, 82, false)
        + arrow(258, 96, 206, 96)
        + `<g transform="translate(60 56) scale(1.35)">${miniTable(0, 0, true)}</g>`
        + text(540, 190, 'قاعدة البيانات', { size: 19, weight: 700 }) + text(540, 216, 'مجموعة جداول مترابطة', { size: 14, weight: 500, fill: C.muted })
        + text(330, 190, 'الجداول', { size: 19, weight: 700 }) + text(330, 216, 'جدول الطلاب، جدول الكتب', { size: 14, weight: 500, fill: C.muted })
        + text(111, 190, 'السجلات والحقول', { size: 19, weight: 700 }) + text(111, 216, 'صفوف وأعمدة', { size: 14, weight: 500, fill: C.muted }));
    },

    'data-kinds'() {
      const cards = [
        ['البيانات العددية', 'أرقام يمكن قياسها', ['50', '6.25', '-10'], C.right],
        ['البيانات الأبجدية', 'حروف وفراغات', ['أحمد', 'الرياض', 'أحمر'], C.amber],
        ['الأبجدية العددية', 'حروف وأرقام ورموز', ['A380', '08:30 م', '#10'], C.blue],
      ];
      const xs = [530, 320, 110];
      return svg(640, 300, 'أنواع البيانات', cards.map(([title, sub, ex, color], i) => {
        const x = xs[i];
        return `<rect x="${x - 98}" y="14" width="196" height="272" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
          + `<rect x="${x - 98}" y="14" width="196" height="10" rx="5" fill="${color}"/>`
          + text(x, 62, title, { size: 19, weight: 700 }) + text(x, 88, sub, { size: 14, weight: 500, fill: C.muted })
          + ex.map((v, k) => `<rect x="${x - 70}" y="${110 + k * 54}" width="140" height="40" rx="10" fill="${C.soft}"/>`
            + text(x, 137 + k * 54, v, { size: 18, weight: 700, fill: color, ltr: /^[\x00-\x7F ]+$/.test(v) })).join('');
      }).join(''));
    },

    'database-table'() {
      const rows = [['رقم الطالب', 'الاسم', 'الصف', 'العمر'], ['1', 'سعد', 'السادس', '11'], ['2', 'ريم', 'السادس', '12'], ['3', 'خالد', 'الخامس', '10'], ['4', 'نورة', 'السادس', '11']];
      return svg(640, 300, 'جدول قاعدة بيانات يوضح الحقل والسجل',
        table(70, 50, [120, 170, 130, 100], 44, rows, { header: true, row: 2, col: 1 })
        + text(375, 36, 'حقل (عمود)', { size: 17, weight: 700, fill: C.blue })
        + text(36, 160, 'سجل', { size: 17, weight: 700, fill: C.amber })
        + text(36, 180, '(صف)', { size: 13, weight: 600, fill: C.amber }));
    },

    'field-types'() {
      const icons = [
        (x, y) => text(x, y + 7, 'Aa', { size: 20, weight: 700, fill: C.right, ltr: true }),
        (x, y) => text(x, y + 7, '123', { size: 18, weight: 700, fill: C.right, ltr: true }),
        (x, y) => `<rect x="${x - 13}" y="${y - 12}" width="26" height="24" rx="3" fill="#fff" stroke="${C.right}" stroke-width="2"/><rect x="${x - 13}" y="${y - 12}" width="26" height="7" fill="${C.right}"/>`
          + [[-6, 1], [0, 1], [6, 1], [-6, 7], [0, 7]].map(([dx, dy]) => `<rect x="${x + dx - 2}" y="${y + dy - 2}" width="4" height="4" fill="${C.left}"/>`).join(''),
        (x, y) => `<rect x="${x - 12}" y="${y - 12}" width="24" height="24" rx="4" fill="#fff" stroke="${C.right}" stroke-width="2"/><path d="M${x - 6} ${y} l4 5 l9 -10" fill="none" stroke="${C.right}" stroke-width="3"/>`,
      ];
      const rows = [['اسم الكتاب', 'نص قصير'], ['عدد الصفحات', 'رقم'], ['تاريخ الإعارة', 'تاريخ/وقت'], ['متوفر؟', 'نعم/لا']];
      return svg(640, 300, 'أنواع البيانات في الحقول', rows.map(([field, type], i) => {
        const y = 14 + i * 70;
        return `<rect x="40" y="${y}" width="560" height="56" rx="12" fill="${C.paper}" stroke="${C.line}" stroke-width="1.5"/>`
          + `<rect x="540" y="${y + 8}" width="48" height="40" rx="8" fill="${C.soft}"/>` + icons[i](564, y + 28)
          + text(440, y + 35, field, { size: 18, weight: 700 })
          + line(340, y + 28, 250, y + 28, C.line, 2, 'stroke-dasharray="4 6"')
          + `<rect x="60" y="${y + 12}" width="180" height="32" rx="16" fill="${C.right}"/>`
          + text(150, y + 34, type, { size: 15, weight: 700, fill: '#fff' });
      }).join(''));
    },

    'sort-filter'() {
      const chip = (x, y, v) => `<rect x="${x - 34}" y="${y}" width="68" height="36" rx="8" fill="${C.soft}" stroke="${C.right}" stroke-width="1.5"/>` + text(x, y + 25, String(v), { size: 18, weight: 700, ltr: true });
      const dots = [C.right, C.amber, C.right, C.right, C.amber, C.amber];
      return svg(640, 310, 'الفرز والتصفية',
        `<rect x="330" y="14" width="296" height="282" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<rect x="14" y="14" width="296" height="282" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + text(478, 48, 'الفرز', { size: 21, weight: 700 }) + text(162, 48, 'التصفية', { size: 21, weight: 700 })
        + [15, 8, 20, 11].map((v, i) => chip(560, 66 + i * 46, v)).join('')
        + arrow(512, 152, 444, 152)
        + [8, 11, 15, 20].map((v, i) => chip(396, 66 + i * 46, v)).join('')
        + text(560, 270, 'قبل', { size: 14, weight: 600, fill: C.muted }) + text(396, 270, 'بعد: تصاعدي', { size: 14, weight: 600, fill: C.muted })
        + dots.map((c, i) => `<circle cx="${72 + i * 36}" cy="82" r="12" fill="${c}"/>`).join('')
        + poly([[62, 108], [262, 108], [184, 178], [184, 214], [140, 234], [140, 178]], C.soft, `stroke="${C.right}" stroke-width="2"`)
        + [122, 162, 202].map((x) => `<circle cx="${x}" cy="258" r="12" fill="${C.right}"/>`).join('')
        + text(162, 288, 'تظهر السجلات المطابقة للشرط فقط', { size: 13, weight: 600, fill: C.muted }));
    },

    // ---------- Term 2 · Unit 1 · Word tables ----------

    'word-table'() {
      const rows = [['اليوم', 'المادة', 'الوقت', 'المكان'], ['الأحد', 'رياضيات', '7:00', 'فصل 1'], ['الاثنين', 'علوم', '8:00', 'المختبر'], ['الثلاثاء', 'حاسب', '9:00', 'المعمل'], ['الأربعاء', 'لغتي', '10:00', 'فصل 2']];
      return svg(640, 340, 'جدول في مستند وورد',
        `<rect x="150" y="14" width="340" height="312" rx="8" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<rect x="330" y="38" width="130" height="12" rx="4" fill="${C.ink}"/>`
        + `<rect x="260" y="62" width="200" height="7" rx="3" fill="${C.line}"/><rect x="220" y="78" width="240" height="7" rx="3" fill="${C.line}"/>`
        + table(180, 104, [70, 70, 70, 70], 34, rows, { header: true, headerFill: C.right, headerText: '#fff', size: 13, row: 2 })
        + `<rect x="180" y="240" width="70" height="34" fill="none" stroke="${C.amber}" stroke-width="3"/>`
        + `<rect x="320" y="104" width="70" height="170" fill="none" stroke="${C.blue}" stroke-width="2.5" stroke-dasharray="6 4"/>`
        + badge(512, 121, '1') + badge(512, 189, '2') + badge(355, 298, '3') + badge(160, 257, '4'));
    },

    'table-edit'() {
      const green = '#d6f0df';
      const empty = (n) => Array.from({ length: n }, () => '');
      const grid = (cols, rowsN) => Array.from({ length: rowsN }, () => empty(cols));
      return panels('تحرير الجداول', 290, [
        { title: 'إضافة صف', draw: (x) => table(x - 65, 52, [43, 44, 43], 26, grid(3, 5), { header: true, headerFill: C.top, fills: { '2,0': green, '2,1': green, '2,2': green } })
          + text(x + 82, 52 + 2 * 26 + 20, '+', { size: 24, weight: 700, fill: '#1f8f5c' }) },
        { title: 'إضافة عمود', draw: (x) => table(x - 72, 52, [36, 36, 36, 36], 26, grid(4, 5), { header: true, headerFill: C.top, fills: { '0,1': green, '1,1': green, '2,1': green, '3,1': green, '4,1': green } })
          + text(x + 18, 46, '+', { size: 24, weight: 700, fill: '#1f8f5c' }) },
        { title: 'البحث والاستبدال', draw: (x) => `<rect x="${x - 82}" y="32" width="164" height="164" rx="10" fill="${C.paper}" stroke="${C.ink}" stroke-width="2"/>`
          + `<path d="M${x - 82} 58 V42 Q${x - 82} 32 ${x - 72} 32 H${x + 72} Q${x + 82} 32 ${x + 82} 42 V58 Z" fill="${C.soft}"/>`
          + text(x, 50, 'بحث واستبدال', { size: 13, weight: 700 })
          + text(x + 70, 78, 'بحث عن:', { size: 12, weight: 600, fill: C.muted, anchor: 'start' })
          + `<rect x="${x - 70}" y="84" width="140" height="26" rx="5" fill="#fff" stroke="${C.line}"/>` + text(x, 102, 'الحاسب', { size: 14 })
          + text(x + 70, 128, 'استبدال بـ:', { size: 12, weight: 600, fill: C.muted, anchor: 'start' })
          + `<rect x="${x - 70}" y="134" width="140" height="26" rx="5" fill="#fff" stroke="${C.line}"/>` + text(x, 152, 'الحاسوب', { size: 14 })
          + `<rect x="${x - 40}" y="168" width="80" height="20" rx="5" fill="${C.amber}"/>` + text(x, 182, 'استبدال الكل', { size: 11, weight: 700, fill: '#fff' }) },
      ]);
    },

    // ---------- Term 2 · Unit 2 · Websites ----------

    'web-page'() {
      return svg(640, 360, 'أجزاء الصفحة الإلكترونية',
        `<rect x="20" y="14" width="600" height="330" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<circle cx="40" cy="36" r="5" fill="#e7a3a0"/><circle cx="56" cy="36" r="5" fill="#efd08a"/><circle cx="72" cy="36" r="5" fill="#a8d8b4"/>`
        + `<rect x="180" y="25" width="280" height="22" rx="11" fill="${C.soft}"/>`
        + text(320, 41, 'sites.google.com/view/school', { size: 11, weight: 500, fill: C.muted, ltr: true })
        + `<rect x="20" y="58" width="600" height="56" fill="${C.right}"/>`
        + text(500, 93, 'موقع مدرستي', { size: 20, weight: 700, fill: '#fff' })
        + ['الرئيسية', 'من نحن', 'أنشطتنا', 'تواصل معنا'].map((t, i) => text(330 - i * 72, 92, t, { size: 13, weight: 600, fill: '#cfe9e2' })).join('')
        + `<rect x="40" y="128" width="560" height="92" rx="10" fill="#cdeee5"/>`
        + `<circle cx="140" cy="158" r="16" fill="#ffd36b"/>`
        + poly([[40, 220], [190, 160], [300, 220]], C.left) + poly([[230, 220], [380, 150], [520, 220]], C.right) + poly([[440, 220], [540, 176], [600, 220]], C.left)
        + `<rect x="330" y="234" width="250" height="9" rx="4" fill="${C.ink}" opacity="0.75"/>`
        + `<rect x="350" y="252" width="230" height="7" rx="3" fill="${C.line}"/><rect x="380" y="266" width="200" height="7" rx="3" fill="${C.line}"/>`
        + `<rect x="60" y="232" width="240" height="46" rx="8" fill="${C.soft}"/>` + poly([[100, 272], [140, 244], [180, 272]], C.top) + `<circle cx="210" cy="250" r="8" fill="${C.top}"/>`
        + `<path d="M20 296 H620 V330 Q620 344 606 344 H34 Q20 344 20 330 Z" fill="${C.soft}"/>`
        + [280, 320, 360].map((x) => `<circle cx="${x}" cy="320" r="11" fill="${C.right}"/>`).join('')
        + badge(600, 86, '1') + badge(586, 142, '2') + badge(604, 250, '3') + badge(604, 320, '4'));
    },

    'site-structure'() {
      const child = (cx, label) => `<rect x="${cx - 85}" y="190" width="170" height="58" rx="12" fill="${C.soft}" stroke="${C.right}" stroke-width="2"/>`
        + text(cx, 225, label, { size: 18, weight: 700 });
      return svg(640, 310, 'بنية صفحات الموقع',
        line(320, 92, 320, 140, C.right, 3) + line(110, 140, 530, 140, C.right, 3)
        + [110, 320, 530].map((x) => line(x, 140, x, 190, C.right, 3)).join('')
        + `<rect x="230" y="34" width="180" height="58" rx="12" fill="${C.right}"/>` + text(320, 70, 'الصفحة الرئيسية', { size: 19, weight: 700, fill: '#fff' })
        + child(530, 'من نحن') + child(320, 'أنشطتنا') + child(110, 'تواصل معنا')
        + `<path d="M445 252 Q 320 296 195 252" fill="none" stroke="${C.amber}" stroke-width="3" stroke-dasharray="7 6"/>`
        + head(214, 262, 195, 252, C.amber)
        + text(320, 300, 'ارتباط تشعبي', { size: 14, weight: 700, fill: C.amber }));
    },

    'site-publish'() {
      return steps('مراحل نشر الموقع الإلكتروني',
        [['التصميم', 'نبني الصفحات'], ['المعاينة', 'نراجع الشكل'], ['النشر', 'نتيحه على الإنترنت'], ['المشاركة', 'نرسل الرابط']],
        [monitorPage, eye, globe, share]);
    },

    // ---------- Term 2 · Unit 3 · Computer games ----------

    'game-elements'() {
      return svg(640, 340, 'عناصر لعبة الحاسب',
        `<rect x="14" y="14" width="612" height="312" rx="18" fill="#dff1fb"/>`
        + `<circle cx="330" cy="72" r="26" fill="#ffd36b"/>`
        + `<path d="M14 222 Q160 170 320 210 T626 200 V308 Q626 326 608 326 H32 Q14 326 14 308 Z" fill="#9fd68f"/>`
        + `<path d="M14 270 Q200 246 360 266 T626 258 V308 Q626 326 608 326 H32 Q14 326 14 308 Z" fill="#7cc06c"/>`
        + `<rect x="74" y="160" width="10" height="40" fill="#8a6a45"/><circle cx="79" cy="150" r="24" fill="#4f9a55"/>`
        + rover(230, 214, 1.2)
        + apple(392, 196) + apple(470, 188) + apple(548, 194)
        + `<rect x="474" y="28" width="136" height="40" rx="10" fill="#fff"/>` + text(542, 54, 'النقاط: 3', { size: 16, weight: 700 })
        + `<rect x="30" y="28" width="120" height="40" rx="10" fill="#fff"/>` + text(90, 54, 'الوقت: 30', { size: 16, weight: 700 })
        + badge(230, 146, '1') + badge(470, 152, '2') + badge(180, 296, '3') + badge(470, 48, '4'));
    },

    'when-do'() {
      const keys = (cx, cy) => [[0, -24], [-26, 0], [0, 0], [26, 0]].map(([dx, dy]) => `<rect x="${cx + dx - 12}" y="${cy + dy - 10}" width="24" height="20" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`).join('')
        + head(cx, cy - 18, cx, cy - 30, C.ink) + head(cx - 20, cy, cx - 32, cy, C.ink) + head(cx, cy - 6, cx, cy + 6, C.ink) + head(cx + 20, cy, cx + 32, cy, C.ink);
      const row = (y, whenIcon, whenText, doIcon, doText) =>
        `<rect x="340" y="${y}" width="276" height="104" rx="16" fill="#e6f0fb" stroke="${C.blue}" stroke-width="2"/>`
        + text(580, y + 30, 'عندما', { size: 18, weight: 700, fill: C.blue })
        + whenIcon + text(530, y + 74, whenText, { size: 17, weight: 600 })
        + arrow(334, y + 52, 306, y + 52)
        + `<rect x="24" y="${y}" width="276" height="104" rx="16" fill="#e6f6ee" stroke="${C.left}" stroke-width="2"/>`
        + text(266, y + 30, 'افعل', { size: 18, weight: 700, fill: C.left })
        + doIcon + text(200, y + 74, doText, { size: 17, weight: 600 });
      return svg(640, 260, 'قواعد البرمجة: عندما… افعل',
        row(20, keys(392, 76), 'أضغط الأسهم', rover(70, 88, 0.8), 'تتحرك العربة')
        + row(140, apple(392, 196, 16), 'تلمس العربة تفاحة', text(72, 214, '+1', { size: 30, weight: 700, fill: C.amber, ltr: true }), 'تحصل على نقطة'));
    },

    'game-plan'() {
      return steps('خطوات التخطيط للعبة',
        [['الفكرة', 'ما قصة اللعبة؟'], ['الشخصيات', 'من يلعب ومن يواجه؟'], ['القواعد', 'ماذا يحدث عندما…؟'], ['الفوز والخسارة', 'متى تنتهي اللعبة؟']],
        [bulb, character, rulesList, trophy]);
    },

    // ---------- Term 2 · Unit 4 · Robot sensors ----------

    'robot-sensors'() {
      return svg(640, 310, 'مستشعرات الروبوت: الموجات فوق الصوتية والألوان',
        `<rect x="24" y="50" width="28" height="220" fill="#b9c4c9"/>`
        + [80, 120, 160, 200, 240].map((y) => line(24, y, 52, y, '#9eabb1', 2)).join('')
        + line(20, 272, 620, 272, C.ink, 3)
        + `<rect x="270" y="266" width="90" height="6" fill="#d64545"/>`
        + arrow(56, 120, 292, 120, C.blue, true) + text(174, 106, '15 سم', { size: 18, weight: 700, fill: C.blue })
        + [0, 1, 2].map((i) => `<path d="M${282 - i * 20} ${166 - i * 6} Q${270 - i * 20} 188 ${282 - i * 20} ${210 + i * 6}" fill="none" stroke="${C.blue}" stroke-width="3" opacity="${1 - i * 0.28}"/>`).join('')
        + `<rect x="330" y="150" width="190" height="92" rx="14" fill="#eef2f3" stroke="${C.ink}" stroke-width="3"/>`
        + `<rect x="420" y="164" width="64" height="32" rx="4" fill="#c9e7df" stroke="${C.ink}" stroke-width="2"/>`
        + `<rect x="436" y="206" width="32" height="14" rx="3" fill="${C.amber}"/>`
        + `<rect x="296" y="164" width="38" height="50" rx="7" fill="${C.ink}"/>`
        + `<circle cx="315" cy="178" r="9" fill="#d9e2e5"/><circle cx="315" cy="200" r="9" fill="#d9e2e5"/>`
        + `<rect x="300" y="226" width="26" height="18" rx="3" fill="${C.ink}"/>`
        + poly([[305, 244], [321, 244], [334, 266], [292, 266]], '#ffe08a', 'opacity="0.85"')
        + `<circle cx="372" cy="250" r="22" fill="${C.ink}"/><circle cx="372" cy="250" r="8" fill="#9eabb1"/>`
        + `<circle cx="480" cy="250" r="22" fill="${C.ink}"/><circle cx="480" cy="250" r="8" fill="#9eabb1"/>`
        + badge(318, 146, '1') + badge(262, 234, '2'));
    },

    'decision-flow'() {
      const box = (cx, label, fill, stroke) => `<rect x="${cx - 80}" y="226" width="160" height="54" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` + text(cx, 259, label, { size: 17, weight: 700 });
      return svg(640, 320, 'مخطط اتخاذ القرار للروبوت',
        `<rect x="250" y="10" width="140" height="38" rx="19" fill="${C.right}"/>` + text(320, 35, 'ابدأ', { size: 17, weight: 700, fill: '#fff' })
        + arrow(320, 48, 320, 80, C.ink)
        + poly([[320, 82], [450, 140], [320, 198], [190, 140]], '#fdebd3', `stroke="${C.amber}" stroke-width="2"`)
        + text(320, 134, 'هل المسافة', { size: 16, weight: 700 }) + text(320, 156, 'أقل من 15 سم؟', { size: 16, weight: 700 })
        + line(450, 140, 545, 140, C.ink, 3) + arrow(545, 140, 545, 224, C.ink)
        + text(496, 128, 'نعم', { size: 16, weight: 700, fill: '#1f8f5c' })
        + line(190, 140, 95, 140, C.ink, 3) + arrow(95, 140, 95, 224, C.ink)
        + text(144, 128, 'لا', { size: 16, weight: 700, fill: C.rose })
        + box(545, 'توقّف واستدر', '#fdeceb', C.rose) + box(95, 'تحرّك للأمام', '#e2f4e8', '#1f8f5c')
        + `<path d="M95 280 V302 H545 V280" fill="none" stroke="${C.muted}" stroke-width="2" stroke-dasharray="6 5"/>`
        + arrow(320, 302, 320, 204, C.muted)
        + text(350, 254, 'كرّر', { size: 15, weight: 700, fill: C.muted }));
    },

    'robot-map'() {
      const cell = 60, x0 = 80, y0 = 14;
      const center = (c, r) => [x0 + c * cell + cell / 2, y0 + r * cell + cell / 2];
      const blocked = ['2,0', '2,1', '2,2', '5,2', '5,3', '5,4'];
      let grid = '';
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 8; c++) {
          const wall = blocked.includes(`${c},${r}`);
          grid += `<rect x="${x0 + c * cell}" y="${y0 + r * cell}" width="${cell}" height="${cell}" fill="${wall ? '#5d6d76' : C.paper}" stroke="${C.line}" stroke-width="1.5"/>`;
        }
      }
      const path = [[7, 4], [7, 1], [3, 1], [3, 3], [1, 3], [1, 0], [0, 0]].map(([c, r]) => center(c, r));
      const [sx, sy] = center(7, 4), [tx, ty] = center(0, 0);
      const [px, py] = path[path.length - 2];
      return svg(640, 330, 'خريطة الروبوت: البداية والهدف والعوائق والمسار',
        grid
        + `<rect x="${x0 + 7 * cell}" y="${y0 + 4 * cell}" width="${cell}" height="${cell}" fill="${C.soft}"/>`
        + `<rect x="${x0}" y="${y0}" width="${cell}" height="${cell}" fill="#fdebd3"/>`
        + `<polyline points="${path.map(([x, y]) => `${x},${y}`).join(' ')}" fill="none" stroke="${C.amber}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round" stroke-linejoin="round"/>`
        + head(px, py, tx + 14, ty, C.amber)
        + `<rect x="${sx - 18}" y="${sy - 18}" width="36" height="36" rx="8" fill="${C.right}"/>`
        + `<circle cx="${sx - 7}" cy="${sy - 4}" r="4" fill="#fff"/><circle cx="${sx + 7}" cy="${sy - 4}" r="4" fill="#fff"/>`
        + line(tx - 10, ty + 20, tx - 10, ty - 20, C.ink, 3) + poly([[tx - 10, ty - 20], [tx + 18, ty - 12], [tx - 10, ty - 4]], C.rose)
        + text(x0 + 8 * cell + 38, sy + 6, 'البداية', { size: 15, weight: 700, fill: C.right })
        + text(x0 - 38, ty + 6, 'الهدف', { size: 15, weight: 700, fill: C.rose })
        + text(x0 + 2 * cell + 30, y0 + cell + 36, 'عائق', { size: 14, weight: 700, fill: '#fff' }));
    },

    uses() {
      const items = [
        ['ألعاب الفيديو', gamepad], ['الرسوم المتحركة', clapper], ['تصميم المباني', building],
        ['الطب', medical], ['الطباعة ثلاثية الأبعاد', printer], ['تصميم المنتجات', phone],
      ];
      const xs = [434, 232, 30], ys = [16, 178];
      return svg(640, 342, 'مجالات استخدام النمذجة ثلاثية الأبعاد', items.map(([label, icon], i) => {
        const x = xs[i % 3], y = ys[Math.floor(i / 3)];
        return `<rect x="${x}" y="${y}" width="176" height="148" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
          + icon(x + 88, y + 62) + text(x + 88, y + 128, label, { size: 16, weight: 700 });
      }).join(''));
    },

    'design-workspace'() {
      let grid = '';
      for (let i = 0; i <= 10; i++) grid += line(120 + i * 27, 170, 40 + i * 43, 345, '#c9dbe8', 1);
      for (let j = 1; j < 7; j++) {
        const t = j / 7, y = 170 + t * 175;
        grid += line(120 - 80 * t, y, 390 + 80 * t, y, '#c9dbe8', 1);
      }
      return svg(640, 380, 'مساحة العمل في برنامج تصميم ثلاثي الأبعاد',
        `<rect x="6" y="6" width="628" height="368" rx="16" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<path d="M6 46 V22 Q6 6 22 6 H618 Q634 6 634 22 V46 Z" fill="${C.soft}"/>`
        + `<circle cx="30" cy="26" r="5" fill="#e7a3a0"/><circle cx="48" cy="26" r="5" fill="#efd08a"/><circle cx="66" cy="26" r="5" fill="#a8d8b4"/>`
        + text(320, 32, 'مساحة التصميم', { size: 15, fill: C.muted })
        + `<rect x="482" y="60" width="140" height="300" rx="12" fill="#f3f8f6" stroke="${C.line}"/>`
        + text(556, 92, 'الأشكال', { size: 16, weight: 700 })
        + cube(520, 130, 20) + sphere(586, 132, 20)
        + cylinder(520, 190, 18, 26) + pyramid(586, 214, 22)
        + cube(520, 276, 20, 'amber') + cube(586, 276, 20, 'grey')
        + poly([[120, 170], [390, 170], [470, 345], [40, 345]], '#e9f2f9', 'stroke="#b8cfe0" stroke-width="2"')
        + grid
        + shadow(256, 296, 52) + cube(256, 245, 48)
        + cube(64, 100, 20)
        + badge(150, 322, '1') + badge(506, 86, '2') + badge(100, 80, '3') + badge(306, 200, '4'));
    },
  };

  window.Visuals = Visuals;
})();
