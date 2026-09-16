import { initMenu } from "./modules/menu.js";
import { initVideo } from "./modules/video.js";
import { initCoverflowSlider } from "./modules/slider.js";
import { initHeroAnswer } from "./modules/hero-answer.js";
import { initAnimations } from "./modules/animations.js";
import { initModals } from "./modules/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initVideo();
  initCoverflowSlider();
  initHeroAnswer();
  initAnimations();
  initModals();

  // Dynamic Year for Copyright
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
