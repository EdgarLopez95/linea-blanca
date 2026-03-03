import { initMenu } from './modules/menu.js';
import { initVideo } from './modules/video.js';
import { initCoverflowSlider } from './modules/slider.js';
import { initHeroAnswer } from './modules/hero-answer.js';

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initVideo();
  initCoverflowSlider();
  initHeroAnswer();
});

