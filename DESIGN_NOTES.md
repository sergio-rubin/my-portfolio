# Dirección visual — Sergio Rubín

La identidad toma el lenguaje del código y la curiosidad técnica de Sergio. **Space UI** se refiere a la biblioteca de [spaceui.one](https://spaceui.one/), no a una estética espacial. Todas las referencias se observaron en sus sitios; no se generaron imágenes para esta investigación.

## Referencias observadas

| Sitio | Hallazgo | Decisión aplicada |
| --- | --- | --- |
| [Space UI](https://spaceui.one/) | Componentes táctiles de apariencia sobria y revelados que acompañan la lectura. | `ScrollTextReveal` en el manifiesto, sin extenderlo a cada bloque. |
| [HeroUI](https://heroui.com/) | Controles claros, estados accesibles y superficies oscuras cuidadas. | Botón principal compuesto con HeroUI y navegación contrastada. |
| [ReactBits](https://reactbits.dev/) | `DecryptedText` ofrece un pequeño momento interactivo de terminal. | Saludo descifrado, limitado a una línea. |
| [Kott Studio](https://kott.studio/) | Una pieza dominante se transforma con el scroll; los trabajos alternan escala tipográfica e imagen. | Escultura WebGL en la portada y casos activos de gran formato. |
| [Cipher](https://cipher.tv/) | El foco cambia entre proyectos, mientras el resto queda atenuado. | Lista con vista previa que pasa de desenfoque a nitidez. |
| [Mike Wilcock](https://mikewilcockdesign.com/) | Nombre monumental, imágenes reales y galería horizontal en una secuencia narrativa. | Portada con el nombre como arquitectura, vista fija del trabajo y archivo horizontal. |

## Sistema

- **Color:** negro `#050505`, superficie `#090909`, gris `#777`, blanco cálido `#f2f2ef`, pausa de lectura `#e7e7e3`. Solo modo oscuro para la interfaz; las dos secciones claras son escenas de contraste, no un tema claro.
- **Tipo:** Bricolage Grotesque Variable con peso alto y espaciado comprimido para la firma y titulares; Azeret Mono para la gramática ASCII, ubicaciones y metadatos.
- **Composición:** portada fija durante el primer scroll; la escultura `SR` en profundidad cruza la firma. El manifiesto cambia el ritmo antes del trabajo. La imagen activa permanece fija frente a nombres y contexto. El archivo se mueve horizontalmente mientras se desplaza en vertical.
- **Movimiento:** una entrada coordinada, una transición de portada, cambios de foco entre casos y un recorrido horizontal. El control de pausa detiene WebGL y GSAP, y convierte el archivo en un carrusel manual. `prefers-reduced-motion` activa el mismo comportamiento.
- **Material real:** fotografía de Habitatum, recursos de Radar Cultural, marca de ALFA y retrato del perfil de GitHub. La imagen de Luna se expresa con tipografía y estructura gráfica porque no se incorporó una captura del sitio.
- **Accesibilidad:** enlace para saltar al contenido, etiquetas de navegación, foco visible, enlaces directos a los proyectos, imagen con texto alternativo, interacción usable con teclado y una experiencia móvil sin fijación horizontal.

## Próximas decisiones de contenido

Las descripciones actuales son deliberadamente breves y se basan en los datos facilitados por Sergio y las páginas públicas. Los proyectos podrían crecer a casos individuales si Sergio aporta proceso, alcance, resultados y capturas aprobadas.
