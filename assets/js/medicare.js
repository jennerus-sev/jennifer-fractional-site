const menuButton = document.getElementById('menu-toggle');
const navigation = document.getElementById('site-nav');
const work = document.getElementById('work-nav');
const workButton = document.getElementById('work-toggle');
const workMenu = document.getElementById('work-menu');
const desktop = matchMedia('(min-width: 821px)');

function showWork(open) {
  workMenu.hidden = !open;
  workButton.setAttribute('aria-expanded', String(open));
}

menuButton.addEventListener('click', () => showWork(false));
workButton.addEventListener('click', (event) => {
  showWork(desktop.matches && event.detail > 0 ? true : workMenu.hidden);
});
work.addEventListener('pointerenter', () => {
  if (desktop.matches) showWork(true);
});
work.addEventListener('pointerleave', () => {
  if (desktop.matches && !work.contains(document.activeElement)) showWork(false);
});
work.addEventListener('focusout', (event) => {
  if (!work.contains(event.relatedTarget)) showWork(false);
});
workMenu.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  showWork(false);
});
document.addEventListener('click', (event) => {
  if (!work.contains(event.target)) showWork(false);
});
navigation.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!workMenu.hidden) {
    showWork(false);
    workButton.focus();
  } else if (navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    menuButton.focus();
  }
});
desktop.addEventListener('change', () => {
  showWork(false);
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
});

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const parallaxPanels = document.querySelectorAll('[data-parallax], [data-orbit-parallax]');
const orbitLabels = Array.from(document.querySelectorAll('[data-orbit-dot]'), (label) => ({
  label,
  dot: document.getElementById(label.dataset.orbitDot),
}));
let frame;
let orbitLayout;
function updateOrbit(panel, bounds, position) {
  const { left, top, width, height } = bounds;
  if (orbitLayout?.position === position && orbitLayout.width === width && orbitLayout.height === height) return;
  orbitLayout = { position, width, height };
  panel.style.setProperty('--orbit-scroll', position.toFixed(4));

  // Keep the text in the flat label layer and follow each projected dot.
  const projectedDots = orbitLabels.map(({ dot }) => dot.getBoundingClientRect());
  orbitLabels.forEach(({ label }, index) => {
    const dot = projectedDots[index];
    label.style.setProperty('--label-x', `${dot.left + dot.width / 2 - left}px`);
    label.style.setProperty('--label-y', `${dot.bottom - top + 6}px`);
  });
}
function updateParallax() {
  frame = undefined;
  const viewport = window.innerHeight;
  for (const panel of parallaxPanels) {
    const bounds = panel.getBoundingClientRect();
    const { top, height } = bounds;
    const progress = Math.max(0, Math.min(1, (viewport - top) / (viewport + height)));
    const position = reducedMotion.matches ? 0 : progress * 2 - 1;
    if (panel.dataset.parallax === undefined) {
      updateOrbit(panel, bounds, position);
    } else {
      const offset = position * height * Number(panel.dataset.parallax);
      panel.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
    }
  }
}
function queueParallax() {
  if (frame === undefined) frame = requestAnimationFrame(updateParallax);
}
window.addEventListener('scroll', queueParallax, { passive: true });
window.addEventListener('resize', queueParallax);
reducedMotion.addEventListener('change', queueParallax);
updateParallax();
