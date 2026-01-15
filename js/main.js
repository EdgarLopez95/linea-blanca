import { initMenu } from './modules/menu.js';
import { initVideo } from './modules/video.js';

// Inicializar módulos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initVideo();
});

