/**
 * Toggle expand/collapse del bloque Answer-First en el Hero (solo móvil).
 * Actualiza texto del botón "Ver más" / "Ver menos" y aria-expanded.
 */
export function initHeroAnswer() {
  const block = document.getElementById('hero-answer');
  const toggle = document.getElementById('hero-answer-toggle');
  if (!block || !toggle) return;

  toggle.addEventListener('click', () => {
    const expanded = block.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Ver menos' : 'Ver más';
  });
}
