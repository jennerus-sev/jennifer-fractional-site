(() => {
  const viewer = document.querySelector('.artifact-viewer');
  const artifactStage = viewer.querySelector('.artifact-stage');
  const zoomToggle = viewer.querySelector('[data-artifact-zoom]');
  const roadmapOpener = document.querySelector('[data-roadmap-open]');
  const roadmapDetail = document.querySelector('#phase-two-detail');

  function setZoom(zoomed) {
    viewer.classList.toggle('is-zoomed', zoomed);
    zoomToggle.setAttribute('aria-pressed', String(zoomed));
    zoomToggle.textContent = zoomed ? 'Zoom out' : 'Zoom in';
    artifactStage.scrollTo(0, 0);
  }

  roadmapOpener.addEventListener('click', () => {
    artifactStage.replaceChildren(roadmapDetail.content.cloneNode(true));
    setZoom(false);
    viewer.showModal();
  });
  viewer.querySelector('[data-artifact-close]').addEventListener('click', () => viewer.close());
  zoomToggle.addEventListener('click', () => setZoom(!viewer.classList.contains('is-zoomed')));
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('close', () => {
    artifactStage.replaceChildren();
    roadmapOpener.focus();
  });

  const roadmap = document.querySelector('.ama-roadmap-stage');
  const laptop = document.querySelector('[data-laptop-parallax]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let parallaxFrame;
  function updateParallax() {
    parallaxFrame = undefined;
    const viewport = window.innerHeight;
    const roadmapBounds = roadmap.getBoundingClientRect();
    const laptopBounds = laptop.getBoundingClientRect();
    const progress = ({ top, height }) => Math.max(0, Math.min(1, (viewport - top) / (viewport + height)));
    const roadmapOffset = reducedMotion.matches ? 0 : -roadmapBounds.height * .065 * progress(roadmapBounds);
    const laptopOffset = reducedMotion.matches ? 0 : laptopBounds.height * .065 * (progress(laptopBounds) * 2 - 1);
    roadmap.style.setProperty('--roadmap-shift', `${roadmapOffset.toFixed(1)}px`);
    laptop.style.setProperty('--laptop-shift', `${laptopOffset.toFixed(1)}px`);
  }
  function queueParallax() {
    if (parallaxFrame === undefined) parallaxFrame = requestAnimationFrame(updateParallax);
  }
  window.addEventListener('scroll', queueParallax, { passive: true });
  window.addEventListener('resize', queueParallax);
  reducedMotion.addEventListener('change', queueParallax);
  updateParallax();
})();
