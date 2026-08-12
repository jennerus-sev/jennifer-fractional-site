const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.textContent = isOpen ? 'Menu' : 'Close';
    navigation.classList.toggle('open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    navigation.classList.remove('open');
  }));
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  reveals.forEach((item) => revealObserver.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('in-view'));
}

const aboutSection = document.querySelector('.about');
if (aboutSection && 'IntersectionObserver' in window) {
  const aboutObserver = new IntersectionObserver(([entry]) => {
    aboutSection.classList.toggle('is-active', entry.isIntersecting);
  }, { threshold: 0.45 });
  aboutObserver.observe(aboutSection);
}

const journeyDot = document.querySelector('.journey-dot');
const waypointSections = [...document.querySelectorAll('[data-waypoint]')];
let ticking = false;

function updateJourney() {
  ticking = false;
  if (!journeyDot || reducedMotion || window.innerWidth < 681) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
  const x = Math.sin(progress * Math.PI * 5.2) * Math.min(window.innerWidth * .18, 220);
  const y = Math.cos(progress * Math.PI * 2.1) * 28;
  journeyDot.style.setProperty('--dot-x', `${x}px`);
  journeyDot.style.setProperty('--dot-y', `${y}px`);
  journeyDot.classList.toggle('visible', progress > .015 && progress < .985);

  const center = window.innerHeight * .5;
  let nearest = null;
  let distance = Infinity;
  waypointSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const delta = Math.abs(sectionCenter - center);
    if (delta < distance) { distance = delta; nearest = section; }
  });
  journeyDot.classList.remove('orange', 'peach');
  const color = nearest?.dataset.waypoint;
  if (color === 'orange') journeyDot.classList.add('orange');
  if (color === 'peach') journeyDot.classList.add('peach');
}

function requestJourneyUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateJourney);
    ticking = true;
  }
}

window.addEventListener('scroll', requestJourneyUpdate, { passive: true });
window.addEventListener('resize', requestJourneyUpdate);
updateJourney();
