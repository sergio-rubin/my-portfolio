# Sergio Rubín — Portafolio

Landing personal de Sergio Rubín. Presenta proyectos publicados, un producto en desarrollo, experimentos, colaboraciones y enlaces sociales en una narrativa oscura con un acento bermellón.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Experiencia

- Portada tipográfica con escultura `SR` de puntos WebGL en Three.js, retícula cinematográfica, estela ASCII y una terminal que escribe `cd Proyectos` durante el scroll. El botón principal conduce al comando y Enter abre los proyectos.
- Seis proyectos en escenas verticales de pantalla completa. Las composiciones alternan su dirección en escritorio; la visual responde al cursor y la acción de abrir lo sigue. Stoqio se identifica como producto en desarrollo.
- Lectura fija después de los casos, con zoom e iluminación progresiva de palabras, que conduce al stack.
- Carrusel automático de lenguajes y herramientas con controles, colores de marca atenuados, dibujos ASCII y lluvia de caracteres con ondas tipográficas.
- Manifiesto conectado a la lluvia del stack, con ondas, firma `sr_` y un pingüino ASCII que entran durante el scroll.
- Archivo experimental contado en cuatro capítulos verticales con diagramas ASCII y un camino sinuoso de bits que se ilumina.
- Navegación superpuesta, control de pausa y soporte para `prefers-reduced-motion`. WebGL y los efectos ASCII descansan cuando están pausados o fuera de pantalla.
- Scroll nativo suavizado con GSAP ScrollSmoother, barra personalizada y escenas fijadas con ScrollTrigger. Enter limpia el hero antes de revelar el directorio sin inclinación; los enlaces internos usan el desplazamiento del plugin.
- HeroUI para el control principal, Space UI `ScrollTextReveal` en la presentación y ReactBits `DecryptedText` para el saludo.

Los recursos locales en `public/media/` proceden de [W.A Coding](https://wacoding.org/), [Habitatum](https://habitatum.com.mx/), [Radar Cultural](https://radarcultural.mx/), [ALFA](https://alf4.org/) y el [perfil de GitHub de Sergio](https://github.com/sergio-rubin). Luna y Stoqio usan composiciones editoriales creadas con CSS. Las URLs, roles y textos están en `src/App.tsx`.

La investigación y las decisiones están en [DESIGN_NOTES.md](DESIGN_NOTES.md).
