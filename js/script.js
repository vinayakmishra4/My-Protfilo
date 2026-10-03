// Vinayak Mishra: portfolio behavior
// Theme toggle, mobile menu, active nav link, and the k-means plot in the hero.

const root = document.documentElement;
const $ = (s) => document.querySelector(s);
const prefersDark = matchMedia('(prefers-color-scheme: dark)');
const mode = () => root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');

try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch {}

/* ---------- Theme ---------- */
const themeBtn = $('.theme-btn');
const label = () => { themeBtn.textContent = mode() === 'dark' ? 'Light mode' : 'Dark mode'; };
themeBtn.addEventListener('click', () => {
  const next = mode() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
  label();
  draw();
});
prefersDark.addEventListener('change', () => { label(); draw(); });

/* ---------- Mobile menu ---------- */
const nav = $('#nav');
const menuBtn = $('.menu-btn');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
};
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

/* ---------- Mark the current section in the nav ---------- */
const links = [...nav.querySelectorAll('a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => (a.hash === '#' + e.target.id
      ? a.setAttribute('aria-current', 'true')
      : a.removeAttribute('aria-current')));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

/* ---------- Hero: k-means clustering demo ---------- */
const canvas = $('#plot');
const ctx = canvas.getContext('2d');
// Same hues as the site accent, one set per theme.
const PAL = {
  light: { groups: ['#1f4fd8', '#e0457b', '#139a74'], idle: '#9fb1ad', grid: '#d5dfdc', ink: '#0f2a2e' },
  dark: { groups: ['#7b9bff', '#ff7aa6', '#3fd0a3'], idle: '#5d716f', grid: '#1f3236', ink: '#e4eeec' },
};
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const noise = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.22;
const clamp = (v) => Math.min(0.96, Math.max(0.04, v));
let pts = [];
let cents = [];
let run = 0;

function seed() {
  const centres = [[0.24, 0.32], [0.74, 0.3], [0.5, 0.76]];
  pts = Array.from({ length: 90 }, (_, i) => {
    const [cx, cy] = centres[i % 3];
    return { x: clamp(cx + noise()), y: clamp(cy + noise()), c: -1 };
  });
  // Start one center inside each group so the demo always settles cleanly.
  cents = [0, 1, 2].map((k) => {
    const p = pts[k + 3 * Math.floor(Math.random() * 30)];
    return { x: p.x, y: p.y };
  });
}

function assign() {
  let moved = false;
  for (const p of pts) {
    let best = 0;
    let bestD = Infinity;
    cents.forEach((c, i) => {
      const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
      if (d < bestD) { bestD = d; best = i; }
    });
    if (p.c !== best) { p.c = best; moved = true; }
  }
  return moved;
}

function update() {
  cents.forEach((c, i) => {
    const m = pts.filter((p) => p.c === i);
    if (!m.length) return;
    c.x = m.reduce((s, p) => s + p.x, 0) / m.length;
    c.y = m.reduce((s, p) => s + p.y, 0) / m.length;
  });
}

function size() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const pal = PAL[mode()];
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = pal.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i < 8; i++) { const x = Math.round((w * i) / 8) + 0.5; ctx.moveTo(x, 0); ctx.lineTo(x, h); }
  for (let i = 1; i < 6; i++) { const y = Math.round((h * i) / 6) + 0.5; ctx.moveTo(0, y); ctx.lineTo(w, y); }
  ctx.stroke();

  for (const p of pts) {
    ctx.fillStyle = p.c < 0 ? pal.idle : pal.groups[p.c];
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  cents.forEach((c, i) => {
    ctx.fillStyle = pal.groups[i];
    ctx.strokeStyle = pal.ink;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(c.x * w, c.y * h, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
}

// Plays once on load: grey points get colored by nearest center, centers move, repeat until stable.
async function cluster() {
  const id = ++run; // a newer run cancels this one
  seed();
  draw();
  if (reduced) {
    for (let i = 0; i < 30 && assign(); i++) update();
    draw();
    return;
  }
  for (let i = 0; i < 30; i++) {
    await sleep(i ? 700 : 800);
    if (id !== run) return;
    const moved = assign();
    draw();
    if (!moved) return;
    await sleep(700);
    if (id !== run) return;
    update();
    draw();
  }
}

$('#rerun').addEventListener('click', cluster);
new ResizeObserver(() => { size(); draw(); }).observe(canvas);

size();
cluster();
label();
$('#year').textContent = new Date().getFullYear();