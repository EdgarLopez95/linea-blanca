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

  let userUnmuted = false; // Persistir decisión del usuario

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
    userUnmuted = !video.muted; // Persistir decisión del usuario
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
          // Video está visible, reproducir
          video.play().catch(error => {
            console.warn('Error al reproducir video:', error);
          });
        } else {
          // Video no está visible, pausar
          video.pause();
        }
      });
    }, observerOptions);

    observer.observe(video);
  }

  /**
   * Inicializa el video
   */
  function init() {
    // Configurar video
    video.muted = true; // Muted por defecto para permitir autoplay
    video.loop = true;
    video.playsInline = true;

    // Actualizar botón inicial
    updateMuteButton();

    // Event listeners
    if (muteBtn) {
      muteBtn.addEventListener('click', toggleMute);
    }

    // Configurar IntersectionObserver
    setupIntersectionObserver();

    // Manejar errores del video
    video.addEventListener('error', (e) => {
      console.error('Error en el video:', e);
    });
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

