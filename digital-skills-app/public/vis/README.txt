Extra illustrations. Each file registers drawings on window.Visuals using window.VisualKit, e.g.:
(function () {
  const { C, svg, text } = window.VisualKit;
  Object.assign(window.Visuals, { 'my-visual'() { return svg(640, 300, 'label', text(320, 150, 'مرحبا')); } });
})();
