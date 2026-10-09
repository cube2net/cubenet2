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
  function text(x, y, value, o = {}) {
    return `<text x="${x}" y="${y}" font-size="${o.size || 18}" font-weight="${o.weight || 600}" fill="${o.fill || C.ink}" text-anchor="middle" font-family="inherit">${value}</text>`;
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
      const cy = 64, xs = [548, 400, 252, 104];
      const icons = [bulb, monitor, rotate, printer];
      const steps = [['الفكرة', 'نتخيّل الشكل'], ['التصميم', 'نبنيه بالبرنامج'], ['المعاينة', 'نراه من كل الجهات'], ['الإنتاج', 'نطبعه أو نستخدمه']];
      let body = '';
      xs.forEach((x, i) => {
        body += `<circle cx="${x}" cy="${cy}" r="50" fill="${C.soft}"/>` + icons[i](x, cy)
          + badge(x + 38, cy - 38, String(i + 1))
          + text(x, cy + 92, steps[i][0], { size: 21, weight: 700 })
          + text(x, cy + 120, steps[i][1], { size: 15, weight: 500, fill: C.muted });
        if (i < xs.length - 1) body += arrow(x - 58, cy, xs[i + 1] + 58, cy);
      });
      return svg(640, 205, 'مراحل النمذجة ثلاثية الأبعاد', body);
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
