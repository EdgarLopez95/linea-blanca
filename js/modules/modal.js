/**
 * Módulo para gestionar la apertura y cierre de modales de legales (Privacidad y Términos).
 */
export function initModals() {
  const modalLinks = document.querySelectorAll(".legal-link");
  const modals = document.querySelectorAll(".legal-modal");

  if (!modalLinks.length || !modals.length) return;

  let activeModal = null;
  let previouslyFocused = null;

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function getFocusableElements(modal) {
    return Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => {
      return !el.hasAttribute("disabled") && el.offsetParent !== null;
    });
  }

  function openModal(modalId) {
    const targetModal = document.querySelector(modalId);
    if (!targetModal) return;

    previouslyFocused = document.activeElement;
    activeModal = targetModal;

    targetModal.classList.add("is-active");
    targetModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    const closeBtn = targetModal.querySelector(".legal-modal__close");
    if (closeBtn) closeBtn.focus();

    document.addEventListener("keydown", handleKeydown);
  }

  function closeModal(modal) {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", handleKeydown);

    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }

    activeModal = null;
    previouslyFocused = null;
  }

  function handleKeydown(e) {
    if (!activeModal) return;

    if (e.key === "Escape") {
      closeModal(activeModal);
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = getFocusableElements(activeModal);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  modalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      openModal(targetId);
    });
  });

  modals.forEach((modal) => {
    const closeElements = modal.querySelectorAll("[data-close-modal]");
    closeElements.forEach((el) => {
      el.addEventListener("click", () => {
        closeModal(modal);
      });
    });
  });
}
