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
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let roadmapFrame;
  function updateRoadmap() {
    roadmapFrame = undefined;
    const { top, height } = roadmap.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (viewport - top) / (viewport + height)));
    const offset = reducedMotion.matches ? 0 : -height * .065 * progress;
    roadmap.style.setProperty('--roadmap-shift', `${offset.toFixed(1)}px`);
  }
  function queueRoadmap() {
    if (roadmapFrame === undefined) roadmapFrame = requestAnimationFrame(updateRoadmap);
  }
  window.addEventListener('scroll', queueRoadmap, { passive: true });
  window.addEventListener('resize', queueRoadmap);
  reducedMotion.addEventListener('change', queueRoadmap);
  updateRoadmap();
})();
