/**
 * Slider 3D tipo Coverflow / Center-mode.
 * Solo HTML, CSS y Vanilla JS; sin librerías.
 */
export function initCoverflowSlider() {
  const container = document.querySelector('[data-coverflow]');
  if (!container) return;

  const slides = container.querySelectorAll('[data-slide]');
  const dotsWrapper = container.querySelector('[data-dots]');
  const dots = dotsWrapper ? Array.from(dotsWrapper.querySelectorAll('.dot')) : [];

  const total = slides.length;
  if (total === 0) return;

  let currentIndex = 0;

  /**
   * Asigna clases .active, .prev, .next y .hidden de forma circular.
   * @param {number} index - Índice actual (se normaliza 0..total-1).
   */
  function updateSlider(index) {
    currentIndex = ((index % total) + total) % total;

    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev', 'next', 'hidden');

      if (i === currentIndex) {
        slide.classList.add('active');
      } else if (i === (currentIndex - 1 + total) % total) {
        slide.classList.add('prev');
      } else if (i === (currentIndex + 1) % total) {
        slide.classList.add('next');
      } else {
        slide.classList.add('hidden');
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });
  }

  // Click en dots: ir a esa imagen
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlider(i));
  });

  const prevBtn = container.querySelector('#prevBtn');
  const nextBtn = container.querySelector('#nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));

  // Click en slide lateral: .prev -> anterior, .next -> siguiente
  container.addEventListener('click', (e) => {
    const prevSlide = e.target.closest('.slide.prev');
    const nextSlide = e.target.closest('.slide.next');
    if (prevSlide) updateSlider(currentIndex - 1);
    else if (nextSlide) updateSlider(currentIndex + 1);
  });

  // Swipe en móvil: touchstart / touchend
  let touchStartX = 0;
  container.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  container.addEventListener(
    'touchend',
    (e) => {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) updateSlider(currentIndex + 1);
        else updateSlider(currentIndex - 1);
      }
    },
    { passive: true }
  );

  // Inicializar estado
  updateSlider(0);
}
