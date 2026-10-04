// Vinayak Mishra: portfolio behavior
// Avatar swap, rolling words, pointer parallax and the active nav link.

const $ = (s) => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero = $('.hero');

/* ---------- Avatar: the "VM" monogram stands in until assets/avatar.png loads ---------- */
const avatar = $('.avatar');
const showAvatar = () => { avatar.hidden = false; $('.mono').hidden = true; };
avatar.addEventListener('load', showAvatar);
if (avatar.complete && avatar.naturalWidth) showAvatar();

/* ---------- Pointer parallax (mouse and trackpad only) ---------- */
if (!reduced && matchMedia('(pointer: fine)').matches) {
  addEventListener('pointermove', (e) => {
    hero.style.setProperty('--mx', (e.clientX / innerWidth - 0.5) * 2);
    hero.style.setProperty('--my', (e.clientY / innerHeight - 0.5) * 2);
  }, { passive: true });
}

/* ---------- Rolling words ---------- */
const roller = $('.roller');
const words = [...roller.children];
if (words.length > 1 && !reduced) {
  const copy = words[0].cloneNode(true); // repeat the first word so the loop is seamless
  copy.setAttribute('aria-hidden', 'true');
  roller.append(copy);
  const n = words.length;
  const hold = 2400;
  const move = 600;
  const step = hold + move;
  const total = n * step;
  const frames = [];
  for (let k = 0; k < n; k++) {
    const y = `translateY(${-k * 100}%)`;
    frames.push({ transform: y, offset: (k * step) / total });
    frames.push({ transform: y, offset: (k * step + hold) / total, easing: 'cubic-bezier(0.7, 0, 0.3, 1)' });
  }
  frames.push({ transform: `translateY(${-n * 100}%)`, offset: 1 });
  [...roller.children].forEach((li) => li.animate(frames, { duration: total, iterations: Infinity }));
}

/* ---------- Mark the current section in the nav ---------- */
const links = [...document.querySelectorAll('#nav a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => (a.hash === '#' + e.target.id
      ? a.setAttribute('aria-current', 'true')
      : a.removeAttribute('aria-current')));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

$('#year').textContent = new Date().getFullYear();