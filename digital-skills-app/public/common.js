// Shared helpers for the lesson pages and the slide presenter.
// Content text is always inserted as text nodes; only built-in illustrations use markup.

// Text between backticks (e.g. `=B2*C2`) is a formula: keep it left-to-right
// inside Arabic sentences so symbols and numbers are not reordered.
function richText(value) {
  const str = String(value);
  if (!str.includes('`')) return document.createTextNode(str);
  const frag = document.createDocumentFragment();
  str.split('`').forEach((part, i) => {
    if (!part) return;
    if (i % 2) {
      const formula = document.createElement('bdi');
      formula.dir = 'ltr';
      formula.className = 'formula';
      formula.textContent = part;
      frag.append(formula);
    } else {
      frag.append(part);
    }
  });
  return frag;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (typeof value === 'function') node.addEventListener(key.replace(/^on/, ''), value);
    else if (key === 'class') node.className = value;
    else node.setAttribute(key, value === true ? '' : value);
  }
  for (const child of [].concat(children)) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : richText(child));
  }
  return node;
}

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function visual(name) {
  const make = window.Visuals && window.Visuals[name];
  if (!make) return null;
  const box = el('div', { class: 'visual' });
  box.innerHTML = make();
  return box;
}

function figure(block) {
  const art = block.type === 'visual'
    ? visual(block.name)
    : el('img', { src: block.src, alt: block.alt || '', loading: 'lazy' });
  if (!art) return null;
  return el('figure', { class: 'figure' }, [art, block.caption ? el('figcaption', {}, block.caption) : null]);
}

const STATUS_LABELS = { ready: 'جاهز', draft: 'مسودة', pending: 'قيد الإعداد' };

function statusChip(status) {
  return el('span', { class: `chip chip-${status}` }, STATUS_LABELS[status] || status);
}

function storage(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); preferences are optional.
  }
  return null;
}
