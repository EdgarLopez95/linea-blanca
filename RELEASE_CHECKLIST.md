# CIERRE FINAL – QA y checklist de release

**Fecha:** Release check previo a publicación  
**Sitio:** https://www.lineablancapalmira.com/

---

## 1. Estructura y contenido

| Check | Estado | Notas |
|-------|--------|--------|
| Existe exactamente **1 solo H1** en toda la página | ✅ | Único H1: `id="hero-title"` en hero (index.html ~L171). |
| Anchors del menú funcionan | ✅ | Enlaces en drawer: `#services`, `#testimonials`, `#faq`, `#location`. Secciones con mismos `id` en el HTML. |
| Sticky móvil solo en móvil | ✅ | `.sticky-cta { display: none }` por defecto; `display: flex` en `@media (max-width: 768px)`. |
| Sticky no tapa el footer | ✅ | `main { padding-bottom: 80px }` en `@media (max-width: 768px)` (sections.css). |
| No hay botón flotante duplicado de WhatsApp | ✅ | Solo barra `.sticky-cta` (Agendar + Llamar). Comentario en CSS: "reemplaza botón flotante WhatsApp". |
| CTAs según estándar | ✅ | Hero/secciones: "Agendar por WhatsApp" / "Llamar ahora". Cards: "Agendar". Sticky: "Agendar" / "Llamar". |

---

## 2. SEO técnico

| Check | Estado | Notas |
|-------|--------|--------|
| `<title>` existe y es único | ✅ | Un solo `<title>`: "Reparación de Neveras y Lavadoras en Palmira \| Línea Blanca (A Domicilio)". |
| `<meta name="description">` existe y es único | ✅ | Una sola meta description en el `<head>`. |
| `<link rel="canonical">` | ✅ | `href="https://www.lineablancapalmira.com/"`. |
| OG tags presentes y sin duplicados | ✅ | og:type, og:url, og:title, og:description, og:image, og:locale (uno por propiedad). |
| Twitter tags presentes y sin duplicados | ✅ | twitter:card, twitter:title, twitter:description, twitter:image (uno por propiedad). |
| robots.txt existe | ✅ | Contenido: `User-agent: *`, `Allow: /`, `Sitemap: https://www.lineablancapalmira.com/sitemap.xml`. |
| sitemap.xml existe | ✅ | Una entrada: `<loc>https://www.lineablancapalmira.com/</loc>`. |
| Schema JSON-LD con dominio nuevo | ✅ | `@id` y `url` usan `https://www.lineablancapalmira.com/` (LocalBusiness, Service, FAQPage). |

---

## 3. Accesibilidad

| Check | Estado | Notas |
|-------|--------|--------|
| Focus visible en links y botones | ✅ | `:focus-visible` global en reset.css (a, button, [role="button"], input, textarea, select) con outline azul rey y offset. |
| Aria-labels en CTAs / toggle / menú / carrusel | ✅ | Sticky: "Agendar por WhatsApp", "Llamar ahora". Nav: "Navegación principal". Carrusel: "Anterior", "Siguiente", "Navegación por diapositivas", "Imagen 1"…8. Mute: "Activar sonido". Cerrar menú, logo "Ir al inicio". |
| Hover/active/focus con contraste correcto | ✅ | Botones con color explícito por estado. "Ver más reseñas en Google" con hover/focus-visible: fondo claro y `color: var(--brand-blue)`. |

---

## 4. Performance

| Check | Estado | Notas |
|-------|--------|--------|
| Imágenes optimizadas y lazy-load | ✅ | Hero: preload WebP + `fetchpriority="high"`. Galería slide 1: `loading="eager"`; 2–8: `loading="lazy"`. Logos, servicios, footer: `loading="lazy"` y `decoding="async"`. |
| LCP no lazy | ✅ | LCP = fondo hero (CSS). Preload de `hero-bg.webp`. Primera slide del carrusel con `loading="eager"`. |
| Reserva de espacio para evitar CLS | ✅ | width/height o aspect-ratio en imágenes; `.slide` con aspect-ratio; `.services__media` con aspect-ratio; hero-answer con max-height y transición. |
| Scripts con defer | ✅ | `js/analytics.js` y `js/main.js` con `defer`. `main.js` además `type="module"`. |

---

## 5. Resumen

- **Checks OK:** Todos los ítems del checklist han pasado.
- **Issues encontrados:** Ninguno. No se detectan regresiones que impidan publicar.

---

## 6. Archivos clave revisados

- `index.html` – Estructura, H1, anchors, CTAs, meta, canonical, OG/Twitter, JSON-LD, scripts, aria-labels, loading de imágenes.
- `robots.txt` – Sitemap y Allow.
- `sitemap.xml` – URL principal.
- `css/base/reset.css` – Focus visible global.
- `css/base/variables.css` – Focus ring.
- `css/components/buttons.css` – Estados focus/contraste.
- `css/layout/sections.css` – Sticky, padding-bottom main, testimonials google link, hero answer.

---

**Resultado:** Checklist final aprobado para publicar. Sin issues críticos ni regresiones detectadas.
