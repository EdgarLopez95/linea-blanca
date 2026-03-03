import { initMenu } from './modules/menu.js';
import { initVideo } from './modules/video.js';
import { initCoverflowSlider } from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initVideo();
  initCoverflowSlider();
});

