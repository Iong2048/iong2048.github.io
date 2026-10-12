// content.js gets the same ?v= as main.js, so all three files always match
const { site, categories, themes } = await import(`./content.js${new URL(import.meta.url).search}`);

const ICONS = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  user: 'M12 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM3 21c0-4.4 4-7.5 9-7.5s9 3.1 9 7.5z',
  flask: 'M8.5 2h7v2h-1.2v4.6l5.9 10.2A2.2 2.2 0 0 1 18.3 22H5.7a2.2 2.2 0 0 1-1.9-3.2l5.9-10.2V4H8.5z',
  folder: 'M2 6a2 2 0 0 1 2-2h5.2l2 2.2H20a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z',
  pen: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z',
  gear: 'M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.4 7.4 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z',
  palette: 'M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z',
  school: 'M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm16 4V6l-8 5-8-5v2l8 5z',
  doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z',
  mic: 'M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72z',
  star: 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  code: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z',
};
const svg = (it) => `<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="${ICONS[it.icon]}"/></svg>`;

const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch { return null; } };
const root = document.documentElement.style;
function applyTheme(name) {
  const [a, b] = themes[name] || Object.values(themes)[new Date().getMonth()];
  root.setProperty('--c1', a); root.setProperty('--c2', b);
}
applyTheme(store('theme') || 'Purple');

// Settings rows are options lists: Enter opens the picker strip, moving previews, Enter keeps.
const SETTINGS = [
  { title: 'Colour', desc: 'Sets the colour of the background.', key: 'theme', def: 'Purple',
    options: ['Auto', ...Object.keys(themes)], apply: applyTheme },
  { title: 'Intro', desc: 'Plays the startup sequence when the site opens.', key: 'intro', def: 'On', options: ['On', 'Off'] },
  { title: 'Clock', desc: 'Sets how the time is shown.', key: 'clock', def: '24-Hour', options: ['24-Hour', '12-Hour'], apply: (o) => tick(o) },
];
const val = (r) => (r.key ? store(r.key) || r.def : r.value || '');
const swatch = (o) => (themes[o] ? themes[o][0] : 'conic-gradient(#dcc46e, #6cc064, #62c6c3, #7fb4e8, #a98ad3, #dc6e6e, #dcc46e)');

const cats = [{
  title: 'Settings', icon: 'gear', items: [
    { title: 'Theme Settings', sub: 'Adjusts the appearance of the site.', icon: 'palette', rows: SETTINGS },
  ],
}, ...categories];

// ---- build DOM ----
const $ = (s) => document.querySelector(s);
const xmb = $('#xmb'), sub = $('#sub'), pick = $('#pick'), arrow = $('#arrow');
const el = (cls, html, parent = xmb) => { const e = document.createElement('div'); e.className = cls; e.innerHTML = html; parent.append(e); return e; };
// level 0 = XMB, 1 = an item's options list, 2 = the picker strip for one option
const state = { cat: 1, item: cats.map(() => 0), level: 0, row: 0, opt: 0 };
const cur = () => cats[state.cat].items[state.item[state.cat]];
const rows = () => cur().rows || [];
let optEls = [];

cats.forEach((c, ci) => {
  c.el = el('cat', `${svg(c)}<span>${c.title}</span>`);
  c.el.onclick = () => { state.level = 0; state.cat = ci; render(); };
  c.items.forEach((it, ii) => {
    it.el = el('item', `${svg(it)}<div><b>${it.title}</b><small>${it.sub || ''}</small></div>`);
    it.el.onclick = () => {
      if (state.level) { state.level = 0; return render(); }
      state.cat === ci && state.item[ci] === ii ? activate() : (state.item[ci] = ii, render());
    };
  });
});
arrow.onclick = () => back();

const esc = (t) => String(t).replace(/[&<>"]/g, (ch) => `&#${ch.charCodeAt(0)};`);
const link = (href, text) => (href ? `<a href="${href}">${text}</a>` : text);
$('#plain').innerHTML = categories.map((c) => `<section><h2>${c.title}</h2>${c.items.map((it) =>
  `<article><h3>${link(it.href, it.title)}</h3><p>${it.sub || ''}</p><ul>${(it.rows || []).map((r) =>
    `<li>${link(r.href, r.title)}${r.value ? `: ${r.value}` : ''}${r.desc ? `. ${r.desc}` : ''}</li>`).join('')}</ul></article>`).join('')}</section>`).join('');

// ---- layout ----
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const L = {};
function render() {
  const W = innerWidth, H = innerHeight;
  const psp = W < 700 || H < 500, tall = psp && H > W;
  // Proportions measured off real PS3 (1080p) and PSP (480x272) screens. s = 1 at 1080p.
  // Upright phones: one continuous column on the left third, the bar crossing it,
  // evenly spaced same-size icons, selection marked by glow rather than size.
  const s = tall ? W / 820 : psp ? Math.min(H / 782, W / 700) : clamp(Math.min(H / 1080, W / 1500), 0.45, 1.6);
  const y0 = H * (tall ? 0.42 : psp ? 0.25 : 0.267);
  const ySel = tall ? y0 + H * 0.105 : H * (psp ? 0.496 : 0.466);
  const step = tall ? H * 0.09 : 80 * s, first = tall ? H * 0.025 : 177 * s, above = tall ? H * 0.092 : 170 * s;
  Object.assign(L, { s, psp, y0, x0: W * (tall ? 0.33 : psp ? 0.22 : 0.294), gap: tall ? W * 0.25 : Math.max(W * (psp ? 0.177 : 0.107), 135 * s) });
  const deep = state.level > 0;
  document.body.classList.toggle('psp', psp); document.body.classList.toggle('tall', tall);
  document.body.classList.toggle('deep', deep); document.body.classList.toggle('picking', state.level === 2);
  root.setProperty('--s', s);
  const pos = (e, x, y, sc, op) => { e.style.transform = `translate(${x}px,${y}px) scale(${sc})`; e.style.opacity = op; };
  // Options-list layout, measured off the PS3 Theme Settings screen: the bar slides to the
  // top-left, the item icon holds the horizon, rows hang off it with values in a right column.
  const F = tall
    ? { col: .13, catY: .1, hor: .3, arrow: .215, dot: .28, label: .34, val: 1, up: .12, down: .15, rstep: .085, ostep: .05 }
    : { col: .115, catY: .12, hor: .34, arrow: .195, dot: .255, label: .295, val: .67, up: .18, down: .177, rstep: .08, ostep: .041 };

  cats.forEach((c, ci) => {
    const d = ci - state.cat, on = d === 0;
    c.el.classList.toggle('on', on);
    if (deep) pos(c.el, F.col * W + d * L.gap, F.catY * H, 0.8, on ? 1 : 0);
    else pos(c.el, L.x0 + d * L.gap, y0, on ? 1 : tall ? 0.85 : 0.74, on ? 1 : 0.7);
    c.items.forEach((it, ii) => {
      const k = ii - state.item[ci];
      it.el.classList.toggle('on', on && k === 0); it.el.classList.toggle('up', k < 0);
      it.el.style.pointerEvents = on ? '' : 'none';
      if (deep) {
        // the rest of the column tucks in small beside and below the open item
        if (k === 0) pos(it.el, F.col * W + d * L.gap, F.hor * H, 1, on ? 1 : 0);
        else pos(it.el, (F.col + 0.075) * W + d * L.gap, (F.hor + 0.24 + (k - 1) * 0.075) * H, 0.4, on && k > 0 ? 0.55 : 0);
        return;
      }
      // selected item sits below the bar; earlier items stack above it, later ones below
      const y = k === 0 ? ySel : k > 0 ? ySel + first + k * step - (tall ? 0 : step) : y0 - above + (k + 1) * step;
      pos(it.el, L.x0 + d * L.gap, y, k === 0 ? 1 : tall ? 0.9 : 0.6, !on ? 0 : k === 0 ? 1 : 0.75);
    });
  });

  pos(arrow, F.arrow * W, F.hor * H, 1, deep ? 1 : 0);
  sub.style.setProperty('--lx', `${(F.label - F.dot) * W}px`);
  sub.style.setProperty('--vx', `${(F.val - F.dot) * W}px`);
  sub.style.setProperty('--dw', `${(F.val - F.label) * W - 24}px`);
  rows().forEach((r, ri) => {
    if (!r.el) return;
    const k = ri - state.row;
    const y = F.hor + (k === 0 ? 0 : k > 0 ? F.down + (k - 1) * F.rstep : -F.up + (k + 1) * F.rstep);
    r.el.classList.toggle('on', k === 0);
    r.el.querySelector('.val').textContent = val(r);
    pos(r.el, F.dot * W, y * H, 1, 1);
  });
  pick.classList.toggle('open', state.level === 2);
  optEls.forEach((e, oi) => {
    e.classList.toggle('on', oi === state.opt);
    e.style.transform = `translateY(${(F.hor + (oi - state.opt) * F.ostep) * H}px)`;
  });
}

// ---- navigation ----
const booting = () => document.body.classList.contains('booting');
const go = (href) => (href.startsWith('mailto:') ? (location.href = href) : open(href, '_blank', 'noopener'));
function enter() { // level 0 -> 1
  const it = cur();
  if (!it.rows) return it.href && go(it.href);
  state.level = 1; state.row = 0; sub.innerHTML = '';
  it.rows.forEach((r, ri) => {
    r.el = el('row', `<i></i><div><b>${esc(r.title)}</b><em class="val"></em><small>${esc(r.desc || '')}</small></div>`, sub);
    r.el.onclick = (e) => { e.stopPropagation(); if (state.level === 2) back(); ri === state.row ? activate() : (state.row = ri, render()); };
  });
  render();
}
function openPicker(r) { // level 1 -> 2
  state.level = 2; state.opt = Math.max(0, r.options.indexOf(val(r))); pick.innerHTML = '';
  optEls = r.options.map((o, oi) => {
    const e = el(r.key === 'theme' ? 'opt sw' : 'opt', `${r.key === 'theme' ? `<i style="background:${swatch(o)}"></i>` : ''}<span>${o}</span>`, pick);
    e.onclick = (ev) => { ev.stopPropagation(); state.opt = oi; activate(); };
    return e;
  });
  render();
}
function activate() {
  if (booting()) return;
  if (state.level === 0) return enter();
  const r = rows()[state.row];
  if (state.level === 1) return r.options ? openPicker(r) : r.href && go(r.href);
  store(r.key, r.options[state.opt]); r.apply?.(r.options[state.opt]); // keep the previewed choice
  state.level = 1; render();
}
function back() {
  if (state.level === 2) rows()[state.row].apply?.(val(rows()[state.row])); // undo the preview
  if (state.level > 0) { state.level--; render(); }
}
function move(dc, di) {
  if (booting()) return;
  const snap = () => `${state.cat}:${state.item[state.cat]}:${state.level}:${state.row}:${state.opt}`, before = snap();
  if (state.level === 0) {
    state.cat = clamp(state.cat + dc, 0, cats.length - 1);
    state.item[state.cat] = clamp(state.item[state.cat] + di, 0, cats[state.cat].items.length - 1);
  } else if (dc < 0) back(); // left goes back a level, right goes in, like the PS3
  else if (dc > 0) activate();
  else if (state.level === 1) state.row = clamp(state.row + di, 0, rows().length - 1);
  else {
    const r = rows()[state.row];
    state.opt = clamp(state.opt + di, 0, r.options.length - 1);
    r.apply?.(r.options[state.opt]); // live preview
  }
  if (before !== snap()) navigator.vibrate?.(6); // the PS3 'tick', on phones that allow it
  render();
}

addEventListener('keydown', (e) => {
  const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
  if (k) { e.preventDefault(); move(...k); }
  else if (e.key === 'Enter' || e.key === ' ') activate();
  else if (e.key === 'Escape' || e.key === 'Backspace') back();
});

// Wheel over the category row scrolls categories; anywhere else scrolls items.
let acc = 0, last = 0;
addEventListener('wheel', (e) => {
  e.preventDefault();
  const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY);
  acc += sideways ? e.deltaX : e.deltaY;
  const now = performance.now();
  if (Math.abs(acc) < 40 || now - last < 110) return; // one step per notch, throttles trackpads
  const dir = Math.sign(acc); acc = 0; last = now;
  if (state.level) return sideways ? null : move(0, dir); // in a list, only vertical scrolling
  sideways || Math.abs(e.clientY - L.y0) < 90 * L.s ? move(dir, 0) : move(0, dir);
}, { passive: false });

let p0 = null;
addEventListener('pointerdown', (e) => { p0 = e; });
addEventListener('pointerup', (e) => {
  // Android: a tap in landscape goes real fullscreen so the browser bars stop popping up.
  // (iPhone Safari has no page fullscreen; Add to Home Screen covers it.)
  if (e.pointerType === 'touch' && L.psp && innerWidth > innerHeight && !document.fullscreenElement)
    document.documentElement.requestFullscreen?.({ navigationUI: 'hide' }).catch(() => {});
  if (!p0) return;
  const dx = e.clientX - p0.clientX, dy = e.clientY - p0.clientY; p0 = null;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 40) return;
  Math.abs(dx) > Math.abs(dy) ? move(-Math.sign(dx), 0) : move(0, -Math.sign(dy));
});
addEventListener('resize', render);
render();

// ---- clock + time-of-day dimming ----
function tick(fmt = store('clock')) {
  const d = new Date(), p = (n) => String(n).padStart(2, '0'), h = d.getHours();
  const t = fmt === '12-Hour' ? `${h % 12 || 12}:${p(d.getMinutes())} ${h < 12 ? 'AM' : 'PM'}` : `${p(h)}:${p(d.getMinutes())}`;
  $('#clock').textContent = `${d.getDate()}/${d.getMonth() + 1}  ${t}`;
  root.setProperty('--night', h < 6 ? 0.2 : h < 9 ? 0.08 : h < 17 ? 0 : h < 20 ? 0.06 : 0.15);
}
tick(); setInterval(tick, 10000);

// ---- wave (WebGL) ----
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FRAG = `precision highp float;
uniform vec2 R; uniform float T, Y, V;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float center(float x, float ph) {
  // upright phones (V=1) run the ribbon top to bottom; across the narrow axis the bends
  // need to be much bigger to sweep like curtains instead of reading as a straight beam
  return Y - .05 * x + (1. + 2.4 * V) * (.055 * sin(x * 1.6 + T * .18 + ph) + .02 * sin(x * 3.1 - T * .27 + ph * 1.7));
}
// One silk ribbon: strands spread across a width that twists through zero,
// so it reads as a see-through sheet that pinches into a bright edge.
float ribbon(vec2 p, float ph) {
  float c = center(p.x, ph);
  float w = (.11 + .13 * V) * sin(p.x * 1.15 - T * .13 + ph * 2.3);
  float lines = 0.;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    // uneven spacing + slow drift per strand, so it reads as silk, not stripes
    float y = c + (fi / 8. - .5 + .06 * sin(fi * 2.7)) * w + .01 * sin(p.x * 2.3 + T * .3 + fi * 1.9);
    lines += (.4 + .6 * fract(fi * .618)) * .0001 / (abs(p.y - y) + .0012);
  }
  float dc = abs(p.y - c), hw = abs(w) * .5;
  float fill = smoothstep(hw + .02, hw - .01, dc) * (.07 + .003 / (abs(w) + .015));
  float glow = exp(-dc * dc / (hw * hw + .0015)) * .07;
  return lines + (fill + glow) * (1. + .5 * V);   // upright: a bit more sheet, like the mockup's curtains
}
void main() {
  vec2 p = gl_FragCoord.xy / R.y;
  if (V > .5) p = vec2((R.y - gl_FragCoord.y) / R.x, gl_FragCoord.x / R.x);
  float c = ribbon(p, 0.) + (.5 + .2 * V) * ribbon(p, 2.4);
  vec2 g = (p + vec2(T * .006, 0.)) * 90.;
  vec2 id = floor(g), f = fract(g) - .5;
  float r = h(id);
  vec2 o = vec2(h(id + 3.1), h(id + 7.7)) - .5;
  float sp = smoothstep(.12, 0., length(f - o * .7)) * step(.92, r) * (.5 + .5 * sin(T * 3. + r * 60.));
  c += sp * exp(-abs(p.y - center(p.x, 0.)) * 9.) * .7;
  c = min(c * (1. - .35 * V), 1.);
  gl_FragColor = vec4(vec3(c), c);
}`;
const cv = $('#wave'), gl = cv.getContext('webgl');
if (gl) {
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a; void main() { gl_Position = vec4(a, 0., 1.); }'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(prog, 'R'), uT = gl.getUniformLocation(prog, 'T'), uY = gl.getUniformLocation(prog, 'Y'), uV = gl.getUniformLocation(prog, 'V');
    const frame = (t) => {
    const dpr = Math.min(devicePixelRatio, 1.5), w = innerWidth * dpr | 0, h = innerHeight * dpr | 0;
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
    gl.uniform2f(uR, w, h); gl.uniform1f(uT, still ? 20 : t / 1000); const tall = document.body.classList.contains('tall'); gl.uniform1f(uY, tall ? .56 : .5); gl.uniform1f(uV, tall ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!still) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

// ---- boot: black -> wave -> name -> notice -> menu. Plays every load; any input skips. ----
document.title = site.name;
$('#logo b').textContent = site.name; $('#logo small').textContent = site.tagline;
$('#notice b').textContent = site.notice[0]; $('#notice p').textContent = site.notice[1];
let wake = null, skipped = false;
const sleep = (ms) => (skipped ? null : new Promise((r) => { wake = r; setTimeout(r, ms); }));
const show = (id, on) => $(id).classList.toggle('show', on);
async function boot() {
  if (store('intro') === 'Off') { $('#black').remove(); return document.body.classList.remove('booting'); }
  const t0 = performance.now(), stop = new AbortController();
  const skip = (e) => { if (performance.now() - t0 < 600 || e.metaKey || e.ctrlKey || e.key === 'Meta' || e.key === 'Control') return; skipped = true; wake?.(); };
  for (const ev of ['keydown', 'pointerdown']) addEventListener(ev, skip, { signal: stop.signal });
  await sleep(150); $('#black').classList.add('gone');
  await sleep(1600); show('#logo', true);
  await sleep(2800); show('#logo', false);
  await sleep(1000); show('#notice', true);
  await sleep(4500); show('#notice', false);
  await sleep(800);
  stop.abort(); show('#logo', false); show('#notice', false);
  $('#black').classList.add('gone'); document.body.classList.remove('booting');
}
boot();
