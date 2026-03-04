# Lighthouse – Validación y ajustes (Paso 44)

## Cómo ejecutar Lighthouse (Mobile)

1. Abre Chrome y ve a **https://www.lineablancapalmira.com/**
2. Abre DevTools (F12) → pestaña **Lighthouse**
3. Selecciona **Performance**, **Best Practices**, **SEO**
4. Device: **Mobile**
5. Pulsa **Analyze page load**

## Qué ya está aplicado en el código (mitigación de rojos)

- **LCP:** Preload de `hero-bg.webp` con `fetchpriority="high"`; imagen en WebP; sin lazy en hero.
- **Imágenes:** `width`/`height` o `aspect-ratio` en galería, servicios, logos; WebP donde aplica; `loading="lazy"` en below-the-fold; primera slide del carrusel `loading="eager"`.
- **Recursos no bloqueantes:** Fuentes con preload + `onload` (async); scripts con `defer` (analytics.js, main.js).
- **CLS:** Reserva de espacio en hero answer (max-height + transition), `.services__media` con aspect-ratio, slides con 380×380.
- **INP:** Scroll con listener pasivo + rAF; sin `setInterval` en carrusel; flags para no duplicar listeners.
- **SEO:** title, meta description, canonical, robots, OG/Twitter, JSON-LD, sitemap en robots.txt.

## Si Lighthouse sigue marcando rojos

| Área | Posible causa | Acción |
|------|----------------|--------|
| **LCP** | Servidor/CDN lento | Revisar hosting; considerar CDN o cache headers. |
| **Imágenes** | “Properly size images” | Comprobar que las imágenes servidas no sean mucho más grandes que el tamaño de display; usar srcset si hace falta. |
| **Render-blocking** | `css/main.css` | Es el CSS principal; dejarlo bloqueante evita FOUC. Si se quiere, se puede extraer “critical CSS” y cargar el resto async. |
| **Cache** | “Serve static assets with efficient cache policy” | En GitHub Pages no se configuran headers; con dominio propio (ej. Cloudflare) se pueden definir reglas de cache. |
| **Total Blocking Time** | Scripts o tareas largas | Revisar en Performance panel qué script o tarea ocupa más tiempo y reducir trabajo en el hilo principal. |

## Registro de una pasada (ejemplo)

- **Performance:** ___  
- **LCP:** ___  
- **INP:** ___  
- **CLS:** ___  
- **Top Opportunities:** ___  
- **Top Diagnostics:** ___

Rellena tras ejecutar Lighthouse y, si hay issues rojos concretos, se pueden aplicar fixes dirigidos.
