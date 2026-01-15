/**
 * Módulo para manejar el menú móvil del header (drawer lateral)
 */
export function initMenu() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const overlay = document.querySelector('.nav__overlay');
  const closeBtn = document.querySelector('.nav__close');
  const drawerCtaButtons = document.querySelectorAll('.drawer__cta a, .drawer__cta button');
  const menuLinks = document.querySelectorAll('.drawer__links a');

  // Si no existen los elementos necesarios, salir
  if (!nav || !toggle || !menu) {
    return;
  }

  let isOpen = false;

  /**
   * Abre el menú
   */
  function openMenu() {
    if (isOpen) return;
    
    isOpen = true;
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Enfocar el primer botón del CTA o el primer link
    const firstFocusable = drawerCtaButtons.length > 0 
      ? drawerCtaButtons[0] 
      : (menuLinks.length > 0 ? menuLinks[0] : null);
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  /**
   * Cierra el menú
   */
  function closeMenu() {
    if (!isOpen) return;
    
    isOpen = false;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Devolver foco al botón toggle
    toggle.focus();
  }

  /**
   * Alterna el estado del menú
   */
  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /**
   * Maneja clicks en el overlay
   */
  function handleOverlayClick(event) {
    if (isOpen && event.target === overlay) {
      closeMenu();
    }
  }

  /**
   * Maneja la tecla Escape
   */
  function handleEscape(event) {
    if (event.key === 'Escape' && isOpen) {
      closeMenu();
    }
  }

  // Event listeners
  toggle.addEventListener('click', toggleMenu);

  // Cerrar con botón cerrar
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Cerrar al hacer click en el overlay
  if (overlay) {
    overlay.addEventListener('click', handleOverlayClick);
  }

  // Cerrar al hacer click en botones del CTA
  drawerCtaButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Cerrar al hacer click en cualquier link del menú
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', handleEscape);

  // Limpiar al desmontar (si es necesario)
  return () => {
    toggle.removeEventListener('click', toggleMenu);
    if (closeBtn) {
      closeBtn.removeEventListener('click', closeMenu);
    }
    if (overlay) {
      overlay.removeEventListener('click', handleOverlayClick);
    }
    drawerCtaButtons.forEach(button => {
      button.removeEventListener('click', closeMenu);
    });
    menuLinks.forEach(link => {
      link.removeEventListener('click', closeMenu);
    });
    document.removeEventListener('keydown', handleEscape);
  };
}

