# Sergio Rubín — Portafolio

Portafolio personal de Sergio Rubín: proyectos de software, colaboraciones y experimentos. La dirección visual combina tipografía expresiva, una paleta monocromática, detalles de terminal y movimiento ligado al desplazamiento.

## Desarrollo local

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Tecnología

React, TypeScript, Vite, Tailwind CSS, HeroUI, componentes de Space UI, GSAP ScrollTrigger y Motion. La galería horizontal se adapta a una lista deslizable en pantallas pequeñas y respeta `prefers-reduced-motion`.

El control **Pausar movimiento** también cambia la galería a desplazamiento manual. Las skills oficiales de HeroUI y Space Motion están disponibles solo en este proyecto, dentro de `.agents/skills/`.

## Contenido

Los enlaces de proyectos y redes se mantienen en [`src/App.tsx`](src/App.tsx). Las vistas de las tarjetas son composiciones de CSS; no se presentan como capturas de los sitios enlazados.

Las observaciones de las referencias y las decisiones visuales están en [`DESIGN_NOTES.md`](DESIGN_NOTES.md).

Hecho con intención y un poco de ASCII `</>`.
