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
   * Reproduce o pausa según visibilidad (muted = permitido por políticas de autoplay)
   */
  function setPlaying(play) {
    if (play) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  /**
   * Observa el contenedor del reproductor para play/pause según visibilidad.
   * threshold 0 = dispara en cuanto cualquier parte es visible.
   */
  function setupIntersectionObserver() {
    const container = video.closest('.video-reel__player-wrap') || video;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setPlaying(entry.isIntersecting);
        });
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    );
    observer.observe(container);
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

    requestAnimationFrame(() => {
      setPlaying(true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

