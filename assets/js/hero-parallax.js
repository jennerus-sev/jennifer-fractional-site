(() => {
  const hero = document.querySelector('[data-hero-parallax]');
  const art = hero.querySelector('[data-hero-parallax-art]');
  const allowMotion = window.matchMedia('(min-width: 601px) and (prefers-reduced-motion: no-preference)');
  let pendingFrame;

  function updateLayers() {
    pendingFrame = undefined;
    const scrollRange = hero.offsetHeight * 0.7;
    const progress = allowMotion.matches
      ? Math.min(1, Math.max(0, window.scrollY / scrollRange))
      : 0;
    art.style.setProperty('--hero-scroll', progress.toFixed(4));
  }

  function queueUpdate() {
    if (pendingFrame === undefined) pendingFrame = window.requestAnimationFrame(updateLayers);
  }

  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate);
  allowMotion.addEventListener('change', queueUpdate);
  updateLayers();
})();
