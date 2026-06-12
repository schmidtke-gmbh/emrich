/* JS aktiv markieren (CSS versteckt Animations-Elemente nur dann) */
document.documentElement.classList.add('js');

/* Mobile-Menü */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

/* Akkordeon (Expertise + FAQ) */
document.querySelectorAll('.acc-head').forEach((head) => {
  head.addEventListener('click', () => head.closest('.acc-item').classList.toggle('open'));
});

/* Header-Schatten beim Scrollen */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== Parallax für Hintergrund-Kreise (Hero) ===== */
(function () {
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  function update() {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const host = el.closest('section') || el.parentElement;
      const r = host.getBoundingClientRect();
      const progress = (r.top + r.height / 2) - vh / 2;
      el.style.transform = 'translate3d(0,' + (-progress * parseFloat(el.dataset.parallax)) + 'px,0)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* ===== Scroll-Reveal-Animationen ===== */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // Einzel-Elemente, die eingeblendet werden
  const flat = [
    '.hero .badge', '.hero h1', '.hero__sub', '.hero p:not(.hero__sub)',
    '.hero__actions', '.hero__img',
    'main h2', 'main h3', '.lead', '.eyebrow',
    '.card-block', '.expertise__img', '.accordion',
    '.cta-band__inner', '.know__img', '.know__list',
    '.map-wrap', '.slider', '.faq', '.cr', '.cr__footer'
  ];
  flat.forEach((sel) => document.querySelectorAll(sel).forEach((el) => el.classList.add('reveal')));

  // Gruppen, deren Kinder gestaffelt erscheinen
  const groups = [
    ['.pills', '.pill'],
    ['.bento', '.bento__card'],
    ['.sympt-grid', '.sympt-card'],
    ['.reviews', '.review'],
    ['.testi-grid', '.testi'],
    ['.four-grid', '.four-card'],
    ['.challenge-grid', '.challenge'],
    ['.standort-fotos', '.ph'],
    ['.img-grid', '.ph'],
    ['.gallery', '.ph'],
    ['.cr__stage', '.cr__node'],
    ['.methods-grid', '.method-pill'],
    ['.stats__grid', '.stat'],
    ['.vs-grid', '.vs-col'],
    ['.trust-badges', '.trust-badge'],
    ['.firstvisit-grid', '.fv-card'],
    ['.greviews__grid', '.greview']
  ];
  groups.forEach(([parent, child]) => {
    document.querySelectorAll(parent).forEach((par) => {
      par.querySelectorAll(child).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--d', (i * 0.12).toFixed(2) + 's');
      });
    });
  });

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('.reveal, .cr').forEach((el) => io.observe(el));
})();

/* ===== Timeline „So geht es weiter": Scroll-Fortschritt + wandernde Zahl ===== */
(function () {
  const tl = document.getElementById('timeline');
  if (!tl) return;
  const fill = document.getElementById('tlFill');
  const dot = document.getElementById('tlDot');
  const steps = Array.prototype.slice.call(tl.querySelectorAll('.tl-step'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function update() {
    const rect = tl.getBoundingClientRect();
    const ref = window.innerHeight * 0.55;
    let p = reduce ? 1 : clamp((ref - rect.top) / rect.height, 0, 1);
    if (fill) fill.style.height = (p * 100) + '%';
    if (dot) dot.style.top = (p * rect.height) + 'px';
    const active = Math.ceil(p * steps.length);
    steps.forEach((s, i) => {
      s.classList.toggle('on', active > 0 && i + 1 <= active);
      s.classList.toggle('current', i + 1 === active);
    });
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

/* ===== Aus- & Weiterbildungen aufklappen (alle .quali-Boxen) ===== */
(function () {
  document.querySelectorAll('.quali').forEach(function (box) {
    const btn = box.querySelector('.quali__more');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const open = box.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Weniger anzeigen' : 'Mehr erfahren';
    });
  });
})();
