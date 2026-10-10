// Grade 5, term 1: multimedia (unit 3) and Scratch programming (unit 4).
(function () {
  const { C, svg, text, poly, line, arrow, badge, steps, head, hat, sblock, cblock, hexagon, sprite, phone } = window.VisualKit;
  const card = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`;
  const EV = '#ffbf00', LOOK = '#9966ff', MOT = '#4c97ff', CTRL = '#ffab19', SENSE = '#5cb1d6', OPS = '#59c059';

  Object.assign(window.Visuals, {
    'g5-capture-devices'() {
      const cam = (cx, cy) => `<rect x="${cx - 34}" y="${cy - 20}" width="68" height="44" rx="8" fill="${C.ink}"/>`
        + `<rect x="${cx - 22}" y="${cy - 28}" width="20" height="10" rx="3" fill="${C.ink}"/>`
        + `<circle cx="${cx + 2}" cy="${cy + 2}" r="16" fill="#9eabb1"/><circle cx="${cx + 2}" cy="${cy + 2}" r="9" fill="${C.right}"/>`
        + `<circle cx="${cx + 24}" cy="${cy - 11}" r="4" fill="${C.amber}"/>`;
      const scan = (cx, cy) => poly([[cx - 34, cy + 6], [cx + 34, cy + 6], [cx + 30, cy - 30], [cx - 30, cy - 30]], C.ink)
        + `<rect x="${cx - 38}" y="${cy + 4}" width="76" height="24" rx="5" fill="#5d6d76"/>`
        + `<rect x="${cx - 30}" y="${cy + 8}" width="60" height="6" rx="2" fill="#d6eef8"/>`
        + `<rect x="${cx - 4}" y="${cy + 8}" width="8" height="16" fill="${C.amber}" opacity="0.9"/>`;
      const mic = (cx, cy) => `<rect x="${cx - 12}" y="${cy - 34}" width="24" height="40" rx="12" fill="${C.right}"/>`
        + line(cx - 6, cy - 22, cx + 6, cy - 22, '#fff', 2) + line(cx - 6, cy - 14, cx + 6, cy - 14, '#fff', 2)
        + `<path d="M${cx - 20} ${cy - 6} Q${cx - 20} ${cy + 16} ${cx} ${cy + 16} Q${cx + 20} ${cy + 16} ${cx + 20} ${cy - 6}" fill="none" stroke="${C.ink}" stroke-width="3"/>`
        + line(cx, cy + 16, cx, cy + 28, C.ink, 3) + line(cx - 14, cy + 30, cx + 14, cy + 30, C.ink, 4);
      const items = [['الهاتف المحمول', 'صور وفيديو وصوت', phone], ['الكاميرا الرقمية', 'صور ومقاطع فيديو', cam], ['الماسح الضوئي', 'يحوّل الورق إلى ملف رقمي', scan], ['الميكروفون', 'يسجّل المقاطع الصوتية', mic]];
      return svg(640, 300, 'أجهزة الالتقاط: الهاتف والكاميرا والماسح الضوئي والميكروفون', items.map(([label, sub, icon], i) => {
        const x = i % 2 === 0 ? 326 : 14, y = i < 2 ? 14 : 156;
        return card(x, y, 300, 130)
          + `<circle cx="${x + 244}" cy="${y + 65}" r="46" fill="${C.soft}"/>` + icon(x + 244, y + 65)
          + text(x + 106, y + 58, label, { size: 19, weight: 700 }) + text(x + 106, y + 86, sub, { size: 14, weight: 500, fill: C.muted });
      }).join(''));
    },

    'g5-file-sizes'() {
      const units = [['Byte', 'بايت'], ['KB', 'كيلوبايت'], ['MB', 'ميجابايت'], ['GB', 'جيجابايت'], ['TB', 'تيرابايت']];
      const tones = ['#d2ebe3', C.top, '#4fb59c', C.left, C.right];
      let bars = '';
      units.forEach(([u, ar], i) => {
        const x = 520 - i * 110, h = 34 + i * 22, y = 168 - h;
        bars += `<rect x="${x}" y="${y}" width="92" height="${h}" rx="8" fill="${tones[i]}"/>`
          + text(x + 46, y + h / 2 + 7, u, { size: 19, weight: 700, fill: i > 1 ? '#fff' : C.ink, ltr: true })
          + text(x + 46, 194, ar, { size: 15, weight: 600, fill: C.muted });
      });
      const ex = [['مستند نصي', 'KB'], ['صورة', 'KB – MB'], ['ملف صوتي', 'MB'], ['فيديو', 'MB – GB']];
      let chips = '';
      ex.forEach(([t, u], i) => {
        const x = 478 - i * 152;
        chips += `<rect x="${x}" y="222" width="140" height="66" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
          + text(x + 70, 248, t, { size: 16, weight: 700 }) + text(x + 70, 275, u, { size: 15, weight: 600, fill: C.amber, ltr: true });
      });
      return svg(640, 300, 'وحدات قياس حجم الملفات من البايت إلى التيرابايت',
        arrow(560, 24, 84, 24, C.muted) + text(600, 30, 'الأصغر', { size: 15, weight: 700, fill: C.muted }) + text(44, 30, 'الأكبر', { size: 15, weight: 700, fill: C.muted })
        + bars + chips);
    },

    'g5-audio-edit'() {
      let wave = '';
      for (let i = 0; i < 118; i++) {
        const x = 46 + i * 4.6, amp = 8 + Math.abs(Math.sin(i * 0.55) * 26 + Math.sin(i * 1.7) * 10);
        wave += line(x, 168 - amp, x, 168 + amp, '#3f63c7', 2.4);
      }
      const btn = (cx, inner) => `<rect x="${cx - 22}" y="38" width="44" height="40" rx="8" fill="#e9eef7" stroke="#b7c3d6" stroke-width="1.5"/>` + inner;
      return svg(640, 320, 'تحرير مقطع صوتي في أوداسيتي: الشكل الموجي وتحديد جزء منه',
        `<rect x="20" y="16" width="600" height="250" rx="14" fill="#f4f6fa" stroke="${C.line}" stroke-width="2"/>`
        + btn(70, poly([[63, 47], [63, 69], [82, 58]], '#1f8f5c'))
        + btn(134, `<rect x="125" y="48" width="6" height="20" fill="#3f63c7"/><rect x="137" y="48" width="6" height="20" fill="#3f63c7"/>`)
        + btn(198, `<rect x="188" y="48" width="20" height="20" fill="${C.ink}"/>`)
        + btn(262, `<circle cx="262" cy="58" r="11" fill="#d64545"/>`)
        + text(70, 98, 'تشغيل', { size: 12, weight: 600, fill: C.muted }) + text(134, 98, 'إيقاف مؤقت', { size: 12, weight: 600, fill: C.muted })
        + text(198, 98, 'توقف', { size: 12, weight: 600, fill: C.muted }) + text(262, 98, 'تسجيل', { size: 12, weight: 600, fill: C.muted })
        + `<rect x="400" y="40" width="200" height="36" rx="8" fill="#fff" stroke="#b7c3d6" stroke-width="1.5"/>`
        + text(500, 64, 'Effect: Fade In · Change Speed', { size: 12, weight: 600, fill: '#3f63c7', ltr: true })
        + `<rect x="40" y="112" width="560" height="112" rx="6" fill="#dfe6f3"/>`
        + `<rect x="250" y="112" width="150" height="112" fill="#ffffff" opacity="0.75"/>`
        + wave
        + line(250, 106, 250, 230, C.amber, 3) + line(400, 106, 400, 230, C.amber, 3)
        + `<rect x="232" y="276" width="186" height="34" rx="17" fill="${C.amber}"/>`
        + text(325, 299, 'الجزء المحدد', { size: 15, weight: 700, fill: '#fff' })
        + text(530, 298, 'مفتاح المسافة للتشغيل', { size: 14, weight: 600, fill: C.muted })
        + text(110, 298, 'مفتاح Delete للحذف', { size: 14, weight: 600, fill: C.muted }));
    },

    'g5-image-search'() {
      const tab = (x, w, label, on) => `<rect x="${x}" y="104" width="${w}" height="30" rx="15" fill="${on ? C.right : C.soft}"/>` + text(x + w / 2, 124, label, { size: 14, weight: 700, fill: on ? '#fff' : C.ink });
      let thumbs = '';
      for (let i = 0; i < 4; i++) {
        const x = 470 - i * 118;
        thumbs += `<rect x="${x}" y="196" width="104" height="72" rx="8" fill="#d6eef8"/>`
          + poly([[x + 8, 260], [x + 40, 222], [x + 64, 246], [x + 80, 232], [x + 98, 260]], C.left)
          + `<circle cx="${x + 80}" cy="${212}" r="8" fill="#f7c27a"/>`
          + (i < 2 ? `<rect x="${x + 6}" y="200" width="34" height="18" rx="9" fill="#fff"/>` + text(x + 23, 214, 'CC', { size: 12, weight: 700, fill: C.right, ltr: true }) : '');
      }
      return svg(640, 300, 'البحث عن الصور في محرك البحث وتصفية النتائج حسب الحجم والترخيص',
        `<rect x="20" y="14" width="600" height="276" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`
        + `<rect x="20" y="14" width="600" height="30" rx="14" fill="#e9eef2"/>`
        + `<circle cx="44" cy="29" r="5" fill="#d64545"/><circle cx="60" cy="29" r="5" fill="${C.amber}"/><circle cx="76" cy="29" r="5" fill="#4caf50"/>`
        + `<rect x="120" y="56" width="420" height="36" rx="18" fill="#fff" stroke="${C.line}" stroke-width="2"/>`
        + text(510, 80, 'الرياض', { size: 16, weight: 700, anchor: 'start' })
        + `<circle cx="150" cy="72" r="8" fill="none" stroke="${C.muted}" stroke-width="2.5"/>` + line(156, 78, 163, 85, C.muted, 2.5)
        + tab(520, 70, 'الكل', false) + tab(440, 70, 'صور', true) + tab(360, 70, 'فيديو', false) + tab(250, 96, 'الأدوات', false)
        + `<rect x="40" y="144" width="560" height="38" rx="10" fill="#fdebd3"/>`
        + text(580, 169, 'الحجم: كبير', { size: 14, weight: 700, anchor: 'start' })
        + text(440, 169, 'حقوق الاستخدام: رخص المشاع الإبداعي', { size: 14, weight: 700, anchor: 'start', fill: C.right })
        + thumbs);
    },

    'g5-storyboard'() {
      const chip = (x, w, label, color) => `<rect x="${x}" y="196" width="${w}" height="30" rx="15" fill="${color}"/>` + text(x + w / 2, 216, label, { size: 13, weight: 700, fill: '#fff' });
      let frames = '';
      const sky = ['#d6eef8', '#fde7c7', '#d8f0dd', '#e6defa'];
      for (let i = 0; i < 4; i++) {
        const x = 478 - i * 146;
        frames += `<rect x="${x}" y="240" width="128" height="56" rx="8" fill="${sky[i]}" stroke="${i === 0 ? C.amber : C.line}" stroke-width="${i === 0 ? 3 : 1.5}"/>`
          + poly([[x + 10, 288], [x + 50, 258], [x + 76, 276], [x + 96, 264], [x + 120, 288]], C.left)
          + text(x + 18, 258, String(i + 1), { size: 13, weight: 700, fill: C.muted, ltr: true });
      }
      return svg(640, 310, 'لوحة العمل في محرر الفيديو: معاينة وأدوات وصور مرتبة',
        `<rect x="150" y="12" width="340" height="170" rx="12" fill="${C.ink}"/>`
        + `<rect x="166" y="24" width="308" height="122" rx="6" fill="#d6eef8"/>`
        + poly([[176, 140], [270, 70], [330, 112], [380, 86], [464, 140]], C.left)
        + `<circle cx="420" cy="52" r="14" fill="#f7c27a"/>`
        + text(320, 132, 'الحيوانات في الغابة', { size: 17, weight: 700, fill: '#fff' })
        + poly([[300, 156], [300, 174], [316, 165]], '#fff') + line(330, 165, 460, 165, '#9eabb1', 3) + line(330, 165, 370, 165, C.amber, 3)
        + chip(512, 96, 'تأثيرات ثلاثية', '#7a5cc7') + chip(424, 78, 'حركة', C.blue) + chip(346, 68, 'نص', C.right)
        + chip(234, 102, 'صوت مخصص', C.amber) + chip(124, 100, 'إنهاء الفيديو', '#1f8f5c')
        + frames);
    },

    'g5-program-steps'() {
      const icon1 = (cx, cy) => `<circle cx="${cx - 4}" cy="${cy - 4}" r="17" fill="none" stroke="${C.ink}" stroke-width="4"/>` + line(cx + 8, cy + 8, cx + 22, cy + 22, C.ink, 5) + text(cx - 4, cy + 3, '?', { size: 20, weight: 700, fill: C.amber, ltr: true });
      const icon2 = (cx, cy) => [0, 1, 2].map((i) => text(cx + 22, cy - 14 + i * 16, `${i + 1}.`, { size: 13, weight: 700, fill: C.amber, ltr: true }) + line(cx + 10, cy - 18 + i * 16, cx - 22, cy - 18 + i * 16, C.left, 5)).join('');
      const icon3 = (cx, cy) => `<rect x="${cx - 18}" y="${cy - 32}" width="36" height="14" rx="7" fill="${C.right}"/>` + line(cx, cy - 18, cx, cy - 10, C.ink, 2)
        + poly([[cx, cy - 10], [cx + 20, cy + 2], [cx, cy + 14], [cx - 20, cy + 2]], '#fdebd3', `stroke="${C.amber}" stroke-width="2"`) + line(cx, cy + 14, cx, cy + 20, C.ink, 2)
        + `<rect x="${cx - 16}" y="${cy + 20}" width="32" height="12" rx="2" fill="${C.top}"/>`;
      const icon4 = (cx, cy) => `<path d="M${cx - 28} ${cy - 20} Q${cx - 20} ${cy - 28} ${cx - 10} ${cy - 20} H${cx + 28} V${cy - 4} H${cx - 28} Z" fill="${EV}"/>`
        + `<rect x="${cx - 28}" y="${cy - 2}" width="56" height="15" rx="3" fill="${LOOK}"/><rect x="${cx - 28}" y="${cy + 15}" width="56" height="15" rx="3" fill="${MOT}"/>`;
      return steps('خطوات إنشاء برنامج: تحليل المشكلة ثم الخوارزمية ثم المخطط ثم المقطع البرمجي',
        [['تحليل المشكلة', 'افهم ما تريد حله'], ['الخوارزمية', 'خطوات بكلمات بسيطة'], ['المخطط الانسيابي', 'أشكال وأسهم'], ['المقطع البرمجي', 'لبنات سكراتش']],
        [icon1, icon2, icon3, icon4]);
    },

    'g5-flowchart-shapes'() {
      const items = [
        ['البداية والنهاية', 'شكل بيضاوي', (cx, cy) => `<rect x="${cx - 52}" y="${cy - 20}" width="104" height="40" rx="20" fill="${C.right}"/>` + text(cx, cy + 6, 'البداية', { size: 15, weight: 700, fill: '#fff' })],
        ['المدخلات والمخرجات', 'متوازي أضلاع', (cx, cy) => poly([[cx - 40, cy - 20], [cx + 56, cy - 20], [cx + 40, cy + 20], [cx - 56, cy + 20]], C.blue) + text(cx, cy + 6, 'أدخل', { size: 15, weight: 700, fill: '#fff' })],
        ['تنفيذ عملية أو أمر', 'مستطيل', (cx, cy) => `<rect x="${cx - 52}" y="${cy - 20}" width="104" height="40" rx="3" fill="${C.top}"/>` + text(cx, cy + 6, 'تحرّك', { size: 15, weight: 700 })],
        ['اتخاذ قرار (نعم/لا)', 'معيّن', (cx, cy) => poly([[cx, cy - 30], [cx + 56, cy], [cx, cy + 30], [cx - 56, cy]], '#fdebd3', `stroke="${C.amber}" stroke-width="2.5"`) + text(cx, cy + 6, 'هل؟', { size: 15, weight: 700 })],
      ];
      return svg(640, 300, 'أشكال المخطط الانسيابي ومعنى كل شكل', items.map(([label, sub, icon], i) => {
        const x = 478 - i * 154;
        return card(x, 14, 144, 210) + icon(x + 72, 80) + text(x + 72, 160, label, { size: 15, weight: 700 }) + text(x + 72, 188, sub, { size: 13, weight: 500, fill: C.muted });
      }).join('')
        + arrow(470, 262, 170, 262, C.ink) + text(320, 292, 'الأسهم تربط الأشكال وتوضح ترتيب الخطوات', { size: 15, weight: 600, fill: C.muted }));
    },

    'g5-costumes'() {
      const dino = (cx, cy, pose) => {
        const leg = pose % 2 === 0 ? [[-12, 30], [8, 30]] : [[-20, 28], [16, 26]];
        return `<g transform="translate(${cx} ${cy})">`
          + `<path d="M-30 18 Q-48 30 -52 40 Q-30 34 -16 26 Z" fill="#7da83a"/>`
          + `<ellipse cx="0" cy="8" rx="24" ry="28" fill="#94c447"/>`
          + `<rect x="${leg[0][0] - 5}" y="24" width="10" height="${leg[0][1] - 10}" rx="3" fill="#7da83a"/><rect x="${leg[1][0] - 5}" y="24" width="10" height="${leg[1][1] - 10}" rx="3" fill="#7da83a"/>`
          + `<path d="M-6 -16 Q-4 -40 16 -40 Q36 -40 38 -28 Q38 ${pose === 3 ? -12 : -20} 16 ${pose === 3 ? -12 : -18} Z" fill="#94c447"/>`
          + (pose === 3 ? `<path d="M14 -24 L36 -26 L34 -16 L16 -14 Z" fill="${C.ink}"/>` : '')
          + `<circle cx="20" cy="-32" r="3" fill="${C.ink}"/></g>`;
      };
      let row = '';
      for (let i = 0; i < 4; i++) {
        const x = 520 - i * 128;
        row += card(x - 54, 14, 108, 134) + dino(x, 72, i) + text(x, 138, `dinosaur4-${'abcd'[i]}`, { size: 12, weight: 600, fill: C.muted, ltr: true });
        if (i < 3) row += arrow(x - 58, 81, x - 70, 81, C.amber);
      }
      return svg(640, 300, 'مظاهر الكائن: تغيير المظهر بسرعة يجعل الكائن يبدو متحركًا', row
        + hat(600, 176, 210, 'عند نقر هذا الكائن', EV)
        + sblock(600, 226, 170, 'المظهر التالي', LOOK)
        + text(190, 222, 'كل نقرة = مظهر جديد', { size: 17, weight: 700, fill: C.right })
        + text(190, 252, 'مثل صفحات كتاب الرسوم المتحركة', { size: 14, weight: 500, fill: C.muted }));
    },

    'g5-compare-ops'() {
      const rows = [['50 &gt; 30', 'أكبر من', 'صحيحة', '#1f8f5c'], ['20 &lt; 12', 'أصغر من', 'خطأ', C.rose], ['7 = 7', 'يساوي', 'صحيحة', '#1f8f5c']];
      let out = '';
      rows.forEach(([expr, name, res, col], i) => {
        const y = 52 + i * 80;
        out += hexagon(420, y, 190, 50, OPS, '') + text(420, y + 7, expr, { size: 20, weight: 700, fill: '#fff', ltr: true })
          + text(626, y + 6, name, { size: 16, weight: 700, anchor: 'start' })
          + arrow(316, y, 266, y, C.muted)
          + `<rect x="160" y="${y - 22}" width="100" height="44" rx="22" fill="${col === C.rose ? '#fdeceb' : '#e2f4e8'}" stroke="${col}" stroke-width="2"/>`
          + text(210, y + 6, res, { size: 16, weight: 700, fill: col });
      });
      return svg(640, 300, 'المعاملات الشرطية: أكبر من وأصغر من ويساوي ونتيجتها صحيحة أو خطأ', out
        + `<rect x="20" y="30" width="130" height="200" rx="16" fill="${C.soft}"/>`
        + text(85, 70, 'الشرط', { size: 16, weight: 700 }) + text(85, 96, 'يقارن', { size: 14, weight: 500, fill: C.muted }) + text(85, 118, 'قيمتين', { size: 14, weight: 500, fill: C.muted })
        + text(85, 160, 'النتيجة', { size: 16, weight: 700 }) + text(85, 186, 'صحيحة', { size: 14, weight: 600, fill: '#1f8f5c' }) + text(85, 208, 'أو خطأ', { size: 14, weight: 600, fill: C.rose })
        + text(380, 288, 'تُستخدم داخل لبنة «إذا ( ) ثم» لاتخاذ القرار', { size: 15, weight: 600, fill: C.muted }));
    },

    'g5-direction-dial'() {
      const cx = 220, cy = 160, r = 112;
      const marks = [[0, 'أعلى'], [90, 'يمين'], [180, 'أسفل'], [-90, 'يسار']];
      let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.soft}" stroke="${C.line}" stroke-width="2"/>`;
      for (let d = -180; d < 180; d += 45) {
        const a = ((d - 90) * Math.PI) / 180;
        out += line(cx + (r - 10) * Math.cos(a), cy + (r - 10) * Math.sin(a), cx + r * Math.cos(a), cy + r * Math.sin(a), C.muted, 2);
      }
      marks.forEach(([d, label]) => {
        const a = ((d - 90) * Math.PI) / 180, x = cx + (r - 34) * Math.cos(a), y = cy + (r - 34) * Math.sin(a);
        out += arrow(cx, cy, cx + (r - 52) * Math.cos(a), cy + (r - 52) * Math.sin(a), d === 90 ? C.amber : C.blue)
          + text(x, y + 6, String(d), { size: 16, weight: 700, ltr: true })
          + text(cx + (r + 22) * Math.cos(a), cy + (r + 22) * Math.sin(a) + 6, label, { size: 14, weight: 600, fill: C.muted });
      });
      out += sprite(cx, cy + 8, 0.42);
      return svg(640, 320, 'اتجاهات الكائن في سكراتش: 0 أعلى و90 يمين و180 أسفل و-90 يسار', out
        + sblock(610, 40, 230, 'اتجه نحو الاتجاه 90', MOT)
        + sblock(610, 96, 230, 'ارتد إذا كنت عند الحافة', MOT)
        + sblock(610, 152, 230, 'اجعل نمط الدوران يمين - يسار', MOT, 14)
        + `<rect x="380" y="214" width="230" height="86" rx="14" fill="#fdebd3"/>`
        + text(495, 244, 'القيمة الافتراضية 90', { size: 15, weight: 700 })
        + text(495, 270, 'ويمكنك كتابة أي زاوية', { size: 13, weight: 500, fill: C.muted }));
    },

    'g5-broadcast'() {
      const env = (cx, cy) => `<rect x="${cx - 26}" y="${cy - 17}" width="52" height="34" rx="4" fill="#fff" stroke="${C.amber}" stroke-width="2.5"/>`
        + `<path d="M${cx - 26} ${cy - 15} L${cx} ${cy + 4} L${cx + 26} ${cy - 15}" fill="none" stroke="${C.amber}" stroke-width="2.5"/>`;
      return svg(640, 310, 'رسائل البث: كائن يرسل رسالة وكائن آخر يتلقاها',
        card(390, 14, 236, 200) + card(14, 14, 236, 200)
        + sprite(508, 80, 0.7) + `<g transform="translate(132 80)"><circle r="34" fill="#a07b5b"/><circle cx="-11" cy="-4" r="5" fill="#fff"/><circle cx="11" cy="-4" r="5" fill="#fff"/><path d="M-8 12 Q0 18 8 12" fill="none" stroke="${C.ink}" stroke-width="2.5"/></g>`
        + text(508, 150, 'الكائن المرسِل', { size: 16, weight: 700 }) + text(132, 150, 'الكائن المستقبِل', { size: 16, weight: 700 })
        + `<rect x="402" y="164" width="212" height="38" rx="10" fill="${EV}"/>` + text(508, 189, 'بث الرسالة 1 وانتظر', { size: 15, weight: 700, fill: '#fff' })
        + `<rect x="26" y="164" width="212" height="38" rx="10" fill="${EV}"/>` + text(132, 189, 'عندما أتلقى الرسالة 1', { size: 15, weight: 700, fill: '#fff' })
        + `<path d="M380 100 Q320 40 262 100" fill="none" stroke="${C.amber}" stroke-width="3" stroke-dasharray="7 6"/>` + head(300, 76, 262, 100, C.amber)
        + env(320, 66)
        + `<rect x="60" y="232" width="520" height="64" rx="16" fill="${C.soft}"/>`
        + text(320, 260, 'الرسالة تنقل الدور من مقطع برمجي إلى آخر', { size: 16, weight: 700 })
        + text(320, 284, 'فيتحاور الكائنان بالترتيب الصحيح', { size: 14, weight: 500, fill: C.muted }));
    },

    'g5-touching'() {
      const items = [
        ['ملامس لـ مؤشر الفأرة؟', 'هل يلمس الكائن الفأرة؟', (cx, cy) => sprite(cx + 8, cy + 8, 0.42) + poly([[cx - 26, cy - 22], [cx - 26, cy + 4], [cx - 19, cy - 3], [cx - 13, cy + 8], [cx - 9, cy + 6], [cx - 15, cy - 5], [cx - 6, cy - 6]], C.ink)],
        ['ملامس لـ الحافة؟', 'هل وصل إلى حافة المنصة؟', (cx, cy) => `<rect x="${cx - 34}" y="${cy - 30}" width="48" height="60" fill="none" stroke="${C.rose}" stroke-width="3"/>` + sprite(cx + 8, cy + 8, 0.42)],
        ['ملامس لـ كائن آخر؟', 'مثل البالون Balloon1', (cx, cy) => sprite(cx - 12, cy + 8, 0.42) + `<ellipse cx="${cx + 22}" cy="${cy - 10}" rx="14" ry="18" fill="${C.blue}"/>` + line(cx + 22, cy + 8, cx + 20, cy + 30, C.ink, 1.5)],
        ['ملامس للون؟', 'هل يلمس لونًا محددًا؟', (cx, cy) => `<rect x="${cx - 32}" y="${cy - 30}" width="64" height="60" rx="10" fill="#d6eef8"/><circle cx="${cx + 14}" cy="${cy - 8}" r="14" fill="#2ab0e6"/>` + `<circle cx="${cx - 12}" cy="${cy + 10}" r="12" fill="#ffab19"/>`],
      ];
      return svg(640, 300, 'لبنات الملامسة في فئة الاستشعار', items.map(([label, sub, icon], i) => {
        const x = i % 2 === 0 ? 326 : 14, y = i < 2 ? 14 : 156;
        return card(x, y, 300, 130)
          + `<circle cx="${x + 244}" cy="${y + 65}" r="46" fill="${C.soft}"/>` + icon(x + 244, y + 65)
          + hexagon(x + 106, y + 52, 186, 34, SENSE, '') + text(x + 106, y + 58, label, { size: 14, weight: 700, fill: '#fff' })
          + text(x + 106, y + 98, sub, { size: 13, weight: 500, fill: C.muted });
      }).join(''));
    },
  });
})();
