import { site, categories, themes } from './content.js';

const ICONS = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  user: 'M12 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM3 21c0-4.4 4-7.5 9-7.5s9 3.1 9 7.5z',
  flask: 'M8.5 2h7v2h-1.2v4.6l5.9 10.2A2.2 2.2 0 0 1 18.3 22H5.7a2.2 2.2 0 0 1-1.9-3.2l5.9-10.2V4H8.5z',
  folder: 'M2 6a2 2 0 0 1 2-2h5.2l2 2.2H20a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z',
  pen: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z',
  gear: 'M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.4 7.4 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z',
  school: 'M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm16 4V6l-8 5-8-5v2l8 5z',
  doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z',
  mic: 'M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72z',
  star: 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  code: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z',
};
const svg = (it) => it.color
  ? `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" style="fill:${it.color}"/></svg>`
  : `<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="${ICONS[it.icon]}"/></svg>`;

const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch { return null; } };
const root = document.documentElement.style;
function applyTheme(name) {
  const [a, b] = themes[name] || Object.values(themes)[new Date().getMonth()];
  root.setProperty('--c1', a); root.setProperty('--c2', b);
  store('theme', name);
}
applyTheme(store('theme') || 'Purple');

const cats = [{
  title: 'Settings', icon: 'gear', items: [
    { title: 'Auto', sub: 'Theme follows the month', icon: 'star', theme: 'Auto' },
    ...Object.entries(themes).map(([name, [c]]) => ({ title: name, sub: 'Theme', color: c, theme: name })),
  ],
}, ...categories];

// ---- build DOM ----
const $ = (s) => document.querySelector(s);
const xmb = $('#xmb'), panel = $('#panel');
const el = (cls, html) => { const e = document.createElement('div'); e.className = cls; e.innerHTML = html; xmb.append(e); return e; };
const state = { cat: 1, item: cats.map(() => 0), open: false };

cats.forEach((c, ci) => {
  c.el = el('cat', `${svg(c)}<span>${c.title}</span>`);
  c.el.onclick = () => { state.cat = ci; render(); };
  c.items.forEach((it, ii) => {
    it.el = el('item', `${svg(it)}<div><b>${it.title}</b><small>${it.sub || ''}</small></div>`);
    it.el.onclick = () => (state.cat === ci && state.item[ci] === ii ? activate() : (state.item[ci] = ii, render()));
  });
});

$('#plain').innerHTML = categories.map((c) => `<section><h2>${c.title}</h2>${c.items.map((it) =>
  `<article><h3>${it.href ? `<a href="${it.href}">${it.title}</a>` : it.title}</h3><p>${it.sub || ''}</p>${it.body || ''}</article>`).join('')}</section>`).join('');

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
  document.body.classList.toggle('psp', psp); document.body.classList.toggle('tall', tall);
  root.setProperty('--s', s);
  const pos = (e, x, y, sc, op) => { e.style.transform = `translate(${x}px,${y}px) scale(${sc})`; e.style.opacity = op; };

  cats.forEach((c, ci) => {
    const d = ci - state.cat, on = d === 0, x = L.x0 + d * L.gap;
    c.el.classList.toggle('on', on);
    pos(c.el, x, y0, on ? 1 : tall ? 0.85 : 0.74, on ? 1 : 0.7);
    c.items.forEach((it, ii) => {
      const k = ii - state.item[ci];
      // selected item sits below the bar; earlier items stack above it, later ones below
      const y = k === 0 ? ySel : k > 0 ? ySel + first + k * step - (tall ? 0 : step) : y0 - above + (k + 1) * step;
      it.el.classList.toggle('on', on && k === 0); it.el.classList.toggle('up', k < 0);
      pos(it.el, x, y, k === 0 ? 1 : tall ? 0.9 : 0.6, !on ? 0 : k === 0 ? 1 : 0.75);
      it.el.style.pointerEvents = on ? '' : 'none';
    });
  });
}

// ---- input ----
const booting = () => document.body.classList.contains('booting');
function move(dc, di) {
  if (state.open || booting()) return;
  const before = `${state.cat}:${state.item[state.cat]}`;
  state.cat = clamp(state.cat + dc, 0, cats.length - 1);
  const c = state.cat;
  state.item[c] = clamp(state.item[c] + di, 0, cats[c].items.length - 1);
  if (before !== `${c}:${state.item[c]}`) navigator.vibrate?.(6); // the PS3 'tick', on phones that allow it
  render();
}
function activate() {
  if (booting()) return;
  const it = cats[state.cat].items[state.item[state.cat]];
  if (it.theme) return applyTheme(it.theme);
  if (it.href && !it.body) return void open(it.href, '_blank', 'noopener');
  $('#panel-body').innerHTML = `<h2>${it.title}</h2><h3>${it.sub || ''}</h3>${it.body || ''}`
    + (it.href ? `<p><a href="${it.href}" target="_blank" rel="noopener">Open ↗</a></p>` : '');
  panel.classList.add('open'); state.open = true; panel.scrollTop = 0;
}
function close() { panel.classList.remove('open'); state.open = false; }
$('#close').onclick = close;

addEventListener('keydown', (e) => {
  const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
  if (k) { e.preventDefault(); move(...k); }
  else if (e.key === 'Enter' || e.key === ' ') state.open ? null : activate();
  else if (e.key === 'Escape' || e.key === 'Backspace') close();
});

// Wheel over the category row scrolls categories; anywhere else scrolls items.
let acc = 0, last = 0;
addEventListener('wheel', (e) => {
  if (state.open) return; // let the panel scroll natively
  e.preventDefault();
  const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY);
  acc += sideways ? e.deltaX : e.deltaY;
  const now = performance.now();
  if (Math.abs(acc) < 40 || now - last < 110) return; // one step per notch, throttles trackpads
  const dir = Math.sign(acc); acc = 0; last = now;
  sideways || Math.abs(e.clientY - L.y0) < 90 * L.s ? move(dir, 0) : move(0, dir);
}, { passive: false });

let p0 = null;
addEventListener('pointerdown', (e) => { p0 = e.target.closest('#panel') ? null : e; });
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
function tick() {
  const d = new Date(), p = (n) => String(n).padStart(2, '0'), h = d.getHours();
  $('#clock').textContent = `${d.getDate()}/${d.getMonth() + 1}  ${p(h)}:${p(d.getMinutes())}`;
  root.setProperty('--night', h < 6 ? 0.2 : h < 9 ? 0.08 : h < 17 ? 0 : h < 20 ? 0.06 : 0.15);
}
tick(); setInterval(tick, 10000);

// ---- wave (WebGL) ----
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FRAG = `precision highp float;
uniform vec2 R; uniform float T, P, Y, V;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float center(float x, float ph) {
  // vertical mode measures across the narrow axis, so bends need to be bigger to read as curves
  return Y - .05 * x + (1. + 1.8 * V) * (.055 * sin(x * 1.6 + T * .18 + ph) + .02 * sin(x * 3.1 - T * .27 + ph * 1.7));
}
// One silk ribbon: strands spread across a width that twists through zero,
// so it reads as a see-through sheet that pinches into a bright edge.
float ribbon(vec2 p, float ph) {
  float c = center(p.x, ph);
  float w = (.11 + .08 * V) * sin(p.x * 1.15 - T * .13 + ph * 2.3);
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
  return lines * (1. - .6 * P) + (fill + glow) * (1. + P);   // PSP (P=1): softer, more sheet
}
void main() {
  vec2 p = gl_FragCoord.xy / R.y;
  if (V > .5) p = vec2((R.y - gl_FragCoord.y) / R.x, gl_FragCoord.x / R.x); // flows top to bottom
  float c = ribbon(p, 0.) + .5 * ribbon(p, 2.4);
  vec2 g = (p + vec2(T * .006, 0.)) * 90.;
  vec2 id = floor(g), f = fract(g) - .5;
  float r = h(id);
  vec2 o = vec2(h(id + 3.1), h(id + 7.7)) - .5;
  float sp = smoothstep(.12, 0., length(f - o * .7)) * step(.92, r) * (.5 + .5 * sin(T * 3. + r * 60.));
  c += sp * exp(-abs(p.y - center(p.x, 0.)) * 9.) * .7;
  c = min(c * (1. - .45 * V), 1.);
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
  const uR = gl.getUniformLocation(prog, 'R'), uT = gl.getUniformLocation(prog, 'T'), uP = gl.getUniformLocation(prog, 'P'), uY = gl.getUniformLocation(prog, 'Y'), uV = gl.getUniformLocation(prog, 'V');
    const frame = (t) => {
    const dpr = Math.min(devicePixelRatio, 1.5), w = innerWidth * dpr | 0, h = innerHeight * dpr | 0;
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); }
    gl.uniform2f(uR, w, h); gl.uniform1f(uT, still ? 20 : t / 1000); gl.uniform1f(uP, L.psp ? 1 : 0); const tall = document.body.classList.contains('tall'); gl.uniform1f(uY, tall ? .3 : .5); gl.uniform1f(uV, tall ? 1 : 0);
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
