# Refactorización interna – Landing Linea Blanca

Refactorización de calidad interna manteniendo **resultado visual y funcional idéntico** (pixel perfect, mismo comportamiento).

---

## Cambios realizados

### CSS

1. **Eliminación de `!important`**
   - **sections.css:** `.faq__cta-btn` y `.faq__cta-btn:hover` usaban `!important` para sobrescribir `.btn--primary` dentro del bloque oscuro. Sustituido por mayor especificidad: `.faq__cta .faq__cta-btn` y `.faq__cta .faq__cta-btn:hover`, sin `!important`.

2. **Design tokens (variables.css)**
   - Añadidos: `--primary-hover`, `--border-hover`, `--brand-dark-hover`, `--section-padding-y`, `--section-padding-y-mobile`, `--section-padding-bottom-mobile`, `--focus-ring`, `--focus-ring-offset`.
   - Agrupación por comentarios: Colors, Spacing/layout, resto igual.

3. **Sustitución de valores hardcodeados**
   - **buttons.css:** Colores de hover y estados usan variables (`var(--primary-hover)`, `var(--border-hover)`, `var(--brand-dark-hover)`). `.btn--primary` y `.btn--instagram` usan `var(--primary)` / `var(--brand-dark)` y `#fff`.
   - **reset.css:** `:focus-visible` usa `var(--focus-ring)` y `var(--focus-ring-offset)`.
   - **utilities.css:** `.skip-link` usa `#fff` en lugar de `white` por consistencia.

4. **Limpieza de reglas duplicadas**
   - **sections.css:** Dos bloques `.process__item:last-child` (uno con `margin-bottom: 0`, otro con `padding-bottom: 0`) unificados en un solo selector con ambas propiedades.

5. **Documentación del layout**
   - Añadido bloque de comentario al inicio de **sections.css** describiendo orden (secciones en orden DOM, dependencias).

### JavaScript

1. **slider.js**
   - Un solo listener de `click` en el contenedor para slides laterales: se comprueba `.slide.prev` y `.slide.next` en el mismo handler y se llama a `updateSlider` una vez, evitando dos listeners duplicados.
   - `dots` obtenido con `Array.from(dotsWrapper.querySelectorAll('.dot'))` cuando `dotsWrapper` existe, para uso consistente de array (ya se comprobaba `dotsWrapper` antes).

2. **menu.js / video.js**
   - Sin cambios estructurales. Ya tenían comprobación de elementos necesarios y no había variables ni funciones no usadas. Se mantiene `console.error` en el handler de error del video (útil en producción).

### HTML

- Sin modificaciones. El DOM y los hooks (ids, clases, `data-*`) usados por CSS y JS se mantienen; no se eliminaron divs ni se alteró la estructura para no afectar estilos ni comportamiento.

---

## Elementos eliminados

| Qué | Dónde |
|-----|--------|
| 3 usos de `!important` | sections.css (FAQ CTA) |
| 1 regla duplicada (`.process__item:last-child`) | sections.css |
| Valores literales de color/hover en botones | buttons.css (sustituidos por variables) |
| Literal de outline en `:focus-visible` | reset.css (sustituido por variables) |

No se eliminaron clases ni selectores que no estén en el HTML: no se detectaron selectores muertos en los archivos revisados (todas las clases de sections.css, header.css y components corresponden al index.html).

---

## Decisiones estructurales

1. **Orden de carga CSS (main.css):** Se mantiene Variables → Reset → Typography → Utilities → Components → Layout. Es el orden lógico (tokens primero, layout último para poder sobrescribir) y no se cambió la estructura pública del proyecto.

2. **sections.css en un solo archivo:** Se mantiene un único archivo de layout de secciones para no multiplicar requests ni romper la cascada. La alternativa (un archivo por sección) aumentaría complejidad de mantenimiento sin beneficio claro en este tamaño.

3. **Variables de sección (`--section-padding-*`):** Añadidas para futura normalización de espaciados. No se sustituyeron todos los `60px`/`48px`/`56px` del archivo en esta pasada para reducir riesgo de regresiones visuales; se pueden ir sustituyendo de forma progresiva.

4. **JS sin IIFE ni namespaces:** Los módulos ya se cargan como ES modules; no se introdujeron variables globales. Cada módulo exporta una función `init*` y main.js las invoca en `DOMContentLoaded`.

---

## Confirmaciones

- **No se usa `!important`** en el proyecto tras la refactorización.
- **No queda CSS muerto** identificado: no se han eliminado clases que sigan en uso en el HTML.
- **No queda JS muerto** identificado: no hay variables ni funciones no usadas en los módulos revisados.
- **No se ha cambiado el comportamiento:** mismo menú, video, slider, enlaces, formularios y estilos responsive; la landing debe verse y comportarse igual (pixel perfect, misma UX).

---

## Cómo comprobar

1. Revisar visualmente la landing en viewport escritorio, tablet y móvil.
2. Probar: menú drawer (abrir/cerrar, overlay, Escape, enlaces), botón mute del video, slider (flechas, dots, swipe), acordeón FAQ, enlaces del footer y botón flotante de WhatsApp.
3. Buscar `!important` en el repo: `grep -r "!important" css/` debe devolver 0 resultados.
