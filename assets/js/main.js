const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (button && nav) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.textContent = open ? 'Menu' : 'Close';
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'Menu';
    nav.classList.remove('open');
  }));
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  const greenHeroCircle = document.querySelector('.hero-orbs i:nth-child(3)');
  const heroSection = document.querySelector('.hero');
  const heroCircles = document.querySelector('.hero-orbs');
  const peachBridge = document.querySelector('.bridge');
  if (greenHeroCircle && heroSection && heroCircles && peachBridge) {
    let greenDocumentTop = heroSection.offsetTop + heroCircles.offsetTop;
    const updateGreenCircle = () => {
      if (window.innerWidth <= 900) {
        greenHeroCircle.style.setProperty('--green-lock', '0px');
        return;
      }
      const maximumTravel = Math.max(0, peachBridge.offsetTop - greenDocumentTop);
      greenHeroCircle.style.setProperty('--green-lock', `${Math.min(window.scrollY, maximumTravel)}px`);
    };
    updateGreenCircle();
    window.addEventListener('scroll', updateGreenCircle, { passive: true });
    window.addEventListener('resize', () => {
      greenDocumentTop = heroSection.offsetTop + heroCircles.offsetTop;
      updateGreenCircle();
    });
  }
}
if (!reducedMotion) {
  const transformationSection = document.querySelector('.transformation');
  const transformationBall = document.querySelector('.transform-ball');
  if (transformationSection && transformationBall) {
    let previousBallTop = null;
    const updateTransformationBall = () => {
      if (window.innerWidth <= 900) {
        transformationBall.style.setProperty('--section-lock', '-118px');
        return;
      }
      const rect = transformationSection.getBoundingClientRect();
      const start = window.innerHeight * .72;
      const travelWindow = window.innerHeight * .72 + transformationSection.offsetHeight;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / travelWindow));
      const totalTravel = transformationSection.offsetHeight + 236;
      const ballTop = -118 + progress * totalTravel;
      transformationBall.style.setProperty('--section-lock', `${ballTop}px`);
      const centerTop = transformationSection.offsetHeight / 2 - 59;
      const crossedCenter = previousBallTop !== null && previousBallTop < centerTop && ballTop >= centerTop;
      if (crossedCenter || (previousBallTop === null && ballTop >= centerTop)) {
        transformationSection.classList.remove('has-imprint');
        window.requestAnimationFrame(() => transformationSection.classList.add('has-imprint'));
      }
      if (ballTop <= -118) transformationSection.classList.remove('has-imprint');
      previousBallTop = ballTop;
    };
    updateTransformationBall();
    window.addEventListener('scroll', updateTransformationBall, { passive: true });
    window.addEventListener('resize', updateTransformationBall);
  }
}
if (!reducedMotion) {
  const offersSection = document.querySelector('.offers');
  const offersBall = document.querySelector('.offers-ball');
  if (offersSection && offersBall) {
    let previousOffersBallTop = null;
    const updateOffersBall = () => {
      if (window.innerWidth <= 900) {
        offersBall.style.setProperty('--offers-lock', '-118px');
        return;
      }
      const rect = offersSection.getBoundingClientRect();
      const offerList = offersSection.querySelector('.offer-list');
      const travelEnd = offerList.offsetTop;
      offersSection.style.setProperty('--offers-path-end', `${travelEnd}px`);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / window.innerHeight));
      const totalTravel = travelEnd + 236;
      const ballTop = -118 + progress * totalTravel;
      offersBall.style.setProperty('--offers-lock', `${ballTop}px`);
      const centerTop = travelEnd / 2 - 59;
      const crossedCenter = previousOffersBallTop !== null && previousOffersBallTop < centerTop && ballTop >= centerTop;
      if (crossedCenter || (previousOffersBallTop === null && ballTop >= centerTop)) {
        offersSection.classList.remove('has-offers-imprint');
        window.requestAnimationFrame(() => offersSection.classList.add('has-offers-imprint'));
      }
      if (ballTop <= -118) offersSection.classList.remove('has-offers-imprint');
      previousOffersBallTop = ballTop;
    };
    updateOffersBall();
    window.addEventListener('scroll', updateOffersBall, { passive: true });
    window.addEventListener('resize', updateOffersBall);
  }
}
if (!reducedMotion) {
  const dotColors = ['#367d79', '#efa27e', '#f04d32'];
  document.querySelectorAll('.dot-field i, .contact-dot-row i').forEach((dot) => {
    let current = dotColors[Math.floor(Math.random() * dotColors.length)];
    dot.style.backgroundColor = current;
    const changeColor = () => {
      const choices = dotColors.filter((color) => color !== current);
      current = choices[Math.floor(Math.random() * choices.length)];
      dot.style.backgroundColor = current;
      window.setTimeout(changeColor, 4000 + Math.random() * 7000);
    };
    window.setTimeout(changeColor, Math.random() * 3000);
  });
}
const reveals = document.querySelectorAll('[data-reveal]');
if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: .16, rootMargin: '0px 0px -7% 0px' });
  reveals.forEach((target) => observer.observe(target));
} else {
  reveals.forEach((target) => target.classList.add('is-visible'));
}

const workSection = document.querySelector('.work');
if (workSection) {
  const firstWorkImage = workSection.querySelector('.case-image');
  const alignWorkRails = () => {
    if (!firstWorkImage) return;
    const sectionRect = workSection.getBoundingClientRect();
    const imageRect = firstWorkImage.getBoundingClientRect();
    const imageCenter = imageRect.left + imageRect.width / 2 - sectionRect.left;
    workSection.style.setProperty('--work-rails-left', `${imageCenter}px`);
  };
  alignWorkRails();
  window.addEventListener('resize', alignWorkRails);
}

const proofSection = document.querySelector('.proof');
const aboutSection = document.querySelector('.about');
const portrait = aboutSection?.querySelector('.portrait');
const continuingWorkBall = workSection?.querySelector('.work-ball');
if (proofSection && aboutSection && portrait && continuingWorkBall && workSection) {
  const alignPortraitPath = () => {
    if (window.innerWidth <= 900) return;
    const workImage = document.querySelector('.work .case-image');
    if (workImage) {
      portrait.style.removeProperty('--portrait-shift');
      const workCenter = workImage.getBoundingClientRect().left + workImage.offsetWidth / 2;
      const currentPortraitCenter = portrait.getBoundingClientRect().left + portrait.offsetWidth / 2;
      portrait.style.setProperty('--portrait-shift', `${workCenter - currentPortraitCenter}px`);
    }
    const proofRect = proofSection.getBoundingClientRect();
    const workRails = workSection.querySelector('.work-route');
    const portraitRect = portrait.getBoundingClientRect();
    const pathLeft = workRails.getBoundingClientRect().left + workRails.offsetWidth / 2 - proofRect.left;
    const pathEnd = portraitRect.top + portraitRect.height / 2 - proofRect.top;
    proofSection.style.setProperty('--portrait-path-left', `${pathLeft}px`);
    proofSection.style.setProperty('--portrait-path-end', `${pathEnd}px`);
  };
  const updateContinuousWorkBall = () => {
    if (window.innerWidth <= 900 || reducedMotion) {
      continuingWorkBall.style.setProperty('--work-lock', '-118px');
      proofSection.classList.remove('portrait-activated');
      return;
    }
    const workRect = workSection.getBoundingClientRect();
    const portraitRect = portrait.getBoundingClientRect();
    const portraitCenter = portraitRect.top + portraitRect.height / 2 - workRect.top;
    const endTop = portraitCenter - 59;
    workSection.style.setProperty('--work-path-height', `${portraitCenter + 59}px`);
    const ballTop = Math.min(endTop, window.innerHeight - workRect.top - 118);
    continuingWorkBall.style.setProperty('--work-lock', `${ballTop}px`);
    const ballCenter = ballTop + 59;
    workSection.querySelectorAll('.case-image').forEach((image) => {
      const imageRect = image.getBoundingClientRect();
      const imageCenter = imageRect.top + imageRect.height / 2 - workRect.top;
      image.classList.toggle('ball-activated', ballCenter >= imageCenter);
    });
    proofSection.classList.toggle('portrait-activated', ballTop >= endTop - 2);
  };
  const refreshPortraitPath = () => {
    portrait.style.removeProperty('--portrait-shift');
    alignPortraitPath();
    updateContinuousWorkBall();
  };
  alignPortraitPath();
  updateContinuousWorkBall();
  window.addEventListener('scroll', updateContinuousWorkBall, { passive: true });
  window.addEventListener('resize', refreshPortraitPath);
}

const carousel = document.querySelector('.testimonial-carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const cards = [...carousel.querySelectorAll('.quote-card')];
  const mobileQuery = window.matchMedia('(max-width: 680px)');
  let current = 0;
  let mobileCard = 0;
  let dots = [];
  const buildDots = (count) => {
    dotsWrap.innerHTML = '';
    dots = Array.from({ length: count }, (_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.dataset.slide = String(i);
      dot.setAttribute('aria-label', `Show testimonial${mobileQuery.matches ? '' : ' group'} ${i + 1}`);
      dot.addEventListener('click', () => show(i));
      dotsWrap.appendChild(dot);
      return dot;
    });
  };
  const show = (index) => {
    const count = mobileQuery.matches ? cards.length : slides.length;
    const selected = (index + count) % count;
    if (mobileQuery.matches) {
      mobileCard = selected;
      track.style.transform = 'none';
      cards.forEach((card, i) => card.classList.toggle('mobile-active', i === mobileCard));
    } else {
      current = selected;
      cards.forEach((card) => card.classList.remove('mobile-active'));
      track.style.transform = `translateX(-${current * 100}%)`;
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === selected);
      dot.setAttribute('aria-current', i === selected ? 'true' : 'false');
    });
  };
  const resetCarousel = () => { buildDots(mobileQuery.matches ? cards.length : slides.length); show(0); };
  carousel.querySelector('.carousel-prev').addEventListener('click', () => show((mobileQuery.matches ? mobileCard : current) - 1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => show((mobileQuery.matches ? mobileCard : current) + 1));
  mobileQuery.addEventListener('change', resetCarousel);
  resetCarousel();
}
