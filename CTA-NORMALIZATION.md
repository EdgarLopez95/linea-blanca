# Normalización de CTAs – Resumen

## CTAs globales definidos

| Tipo   | Texto visible                               | Destino |
|--------|---------------------------------------------|---------|
| **Primario (WhatsApp)** | Cotizar y agendar por WhatsApp | `https://wa.me/573183180948?text=Hola,%20quiero%20cotizar%20y%20agendar%20en%20Palmira` |
| **Secundario (Llamar)** | Llamar ahora (318 318 0948)     | `tel:+573183180948` |

---

## Secciones donde se ajustaron CTAs

| Sección | Cambios |
|---------|---------|
| **Header – Drawer (menú móvil)** | Botón WA: texto → "Cotizar y agendar por WhatsApp", href único. Botón tel: → "Llamar ahora (318 318 0948)". |
| **Header – nav__actions (desktop)** | Un solo botón WA: texto → "Cotizar y agendar por WhatsApp", mismo href. |
| **Hero** | CTA primario y secundario con textos y enlaces únicos. |
| **Video reel** | Eliminados 4 enlaces "Diagnosticar ahora →" de las cards (reemplazados por texto no clicable "Cotizar y agendar por WhatsApp"). Un solo CTA clicable en el bloque: "Cotizar y agendar por WhatsApp" + "Llamar ahora (318 318 0948)" con mismo href y tel. |
| **Process (Así trabajamos)** | Botón WA → "Cotizar y agendar por WhatsApp" y href único. Añadido CTA secundario "Llamar ahora (318 318 0948)". |
| **Services** | Los 5 botones de cada tarjeta (Neveras, Lavadoras, Aires, Mantenimiento, Repuestos) usan el mismo texto "Cotizar y agendar por WhatsApp" y el mismo href. |
| **FAQ** | Botón WA → "Cotizar y agendar por WhatsApp" y href único. Añadido "Llamar ahora (318 318 0948)". |
| **Location** | Enlace de teléfono en datos de contacto → "Llamar ahora (318 318 0948)". |
| **Footer** | Enlace de teléfono en Contáctanos → "Llamar ahora (318 318 0948)". |
| **Botón flotante WhatsApp** | Mismo href único; `aria-label` → "Cotizar y agendar por WhatsApp". |

---

## Confirmaciones

- **WhatsApp:** todos los enlaces que abren WhatsApp usan el mismo destino:  
  `https://wa.me/573183180948?text=Hola,%20quiero%20cotizar%20y%20agendar%20en%20Palmira`
- **Llamar:** todos los enlaces de teléfono usan `tel:+573183180948` y el texto "Llamar ahora (318 318 0948)" donde aplica.
- **Textos:** en la landing solo se usan estos dos textos para estos CTAs: "Cotizar y agendar por WhatsApp" (primario) y "Llamar ahora (318 318 0948)" (secundario).
- **Duplicados:** en el bloque de video reel se redujeron 5 enlaces WA a 1 CTA primario + 1 secundario (Llamar). En el resto de bloques se mantienen como máximo 2 CTAs (primario + secundario) o un solo primario por tarjeta (Services).

---

## Nota

- No se modificaron colores, padding ni estructura de bloques; solo textos, `href` y eliminación de enlaces duplicados en el mismo bloque.
- El número en el topbar (solo texto, no enlace) se dejó como "318 318 0948".
