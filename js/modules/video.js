/**
 * Módulo para manejar el video reel con autoplay cuando está visible
 */
export function initVideo() {
  const video = document.querySelector('.video-reel__video');
  const muteBtn = document.querySelector('.video-reel__mute');

  // Si no existe el video, salir
  if (!video) {
    return;
  }

  /**
   * Actualiza el estado visual del botón de mute
   */
  function updateMuteButton() {
    if (!muteBtn) return;

    const isMuted = video.muted;
    muteBtn.setAttribute('aria-pressed', isMuted ? 'false' : 'true');
    muteBtn.setAttribute('aria-label', isMuted ? 'Activar sonido' : 'Silenciar');
  }

  /**
   * Alterna el estado de mute del video
   */
  function toggleMute() {
    video.muted = !video.muted;
    updateMuteButton();
  }

  /**
   * Maneja la visibilidad del video con IntersectionObserver
   */
  function setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, observerOptions);

    observer.observe(video);
  }

  function init() {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    updateMuteButton();

    if (muteBtn) {
      muteBtn.addEventListener('click', toggleMute);
    }

    setupIntersectionObserver();

    video.addEventListener('error', (e) => {
      console.error('Error en el video:', e);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

