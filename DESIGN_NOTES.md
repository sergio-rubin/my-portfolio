# Dirección visual — Sergio Rubín

La identidad toma el lenguaje del código y la curiosidad técnica de Sergio. **Space UI** se refiere a la biblioteca de [spaceui.one](https://spaceui.one/), no a una estética espacial. Todas las referencias se observaron en sus sitios; no se generaron imágenes para esta investigación.

## Referencias observadas

| Sitio | Hallazgo | Decisión aplicada |
| --- | --- | --- |
| [Space UI](https://spaceui.one/) | Componentes táctiles de apariencia sobria y revelados que acompañan la lectura. | `ScrollTextReveal` en la presentación, sin extenderlo a cada bloque. |
| [HeroUI](https://heroui.com/) | Controles claros, estados accesibles y superficies oscuras cuidadas. | Botón principal compuesto con HeroUI y navegación contrastada. |
| [ReactBits](https://reactbits.dev/) | `DecryptedText` ofrece un pequeño momento interactivo de terminal. | Saludo descifrado, limitado a una línea. |
| [Kott Studio](https://kott.studio/) | Una pieza dominante se transforma con el scroll; los trabajos alternan escala tipográfica e imagen. | Escultura WebGL en la portada y casos activos de gran formato. |
| [Cipher](https://cipher.tv/) | El foco cambia entre proyectos, mientras el resto queda atenuado. | Cada escena responde al cursor y concentra la atención en un solo caso. |
| [Mike Wilcock](https://mikewilcockdesign.com/) | Nombre monumental, imágenes reales y una secuencia narrativa de proyectos. | Portada con el nombre como arquitectura y capítulos verticales para el trabajo y el archivo. |
| [MacMillan Studio](https://macmillan.studio/) | Los trabajos seleccionados se presentan como momentos grandes y sucesivos. | Escenas individuales de pantalla completa con un medio protagonista y texto contextual. |
| [BlueSQX](https://www.bluesqx.com/) y [Incroy](https://www.incroy.com/) | Ritmo de transición y profundidad entre escenas. | El comando terminal conduce a una onda de apertura; el color de cada proyecto transforma su entorno. |

## Sistema

- **Color:** negro `#050505`, superficie `#090909`, pausas de lectura `#161616` y `#202020`, gris `#777`, blanco cálido `#f2f2ef` y bermellón `#ff6248` para guiar la narración. Todas las escenas permanecen en modo oscuro.
- **Tipo:** Bricolage Grotesque Variable con peso alto y espaciado comprimido para la firma y titulares; Azeret Mono para la gramática ASCII, ubicaciones y metadatos.
- **Composición:** portada fija durante el primer scroll con retícula; la escultura de puntos deja paso a una terminal que escribe `cd Proyectos`. El botón principal se detiene en el comando completo y la tecla Enter se centra y abre una onda antes de revelar seis escenas de trabajo. Estas alternan texto e imagen en escritorio y se apilan antes de que puedan solaparse en tableta. Después, una frase anclada ilumina palabras y conduce al stack; el carrusel está rodeado por lluvia de caracteres cuyas ondas continúan en el manifiesto. El archivo avanza en cuatro capítulos verticales de posición alterna siguiendo un camino de bits sinuoso.
- **Movimiento:** entrada coordinada, parallax en portada, escritura y transición de la terminal ligadas al scroll, escenas con escala y desplazamiento progresivos, marcos que responden suavemente al cursor y una acción de abrir que sigue su posición dentro de la visual, zoom de lectura, carrusel automático que cede ante la interacción y lluvia ASCII. El control de pausa detiene WebGL, GSAP, el carrusel, la lluvia y la estela. `prefers-reduced-motion` activa el mismo comportamiento. La lluvia y la marquesina también se pausan fuera del stack.
- **Scroll:** GSAP ScrollSmoother suaviza el desplazamiento nativo; ScrollTrigger fija el hero, la lectura y el manifiesto dentro del contenedor transformado. La barra conserva el comportamiento nativo con una apariencia bermellón. Al pausar se desmonta ScrollSmoother para mantener el contenido desplazable; al reactivar se recupera la posición. El historial también conduce a la sección correspondiente. La transición de Enter apaga por completo la portada, revela el directorio de frente y separa la salida del texto de lectura de la pregunta siguiente. Los títulos de proyectos se desplazan verticalmente y permanecen dentro del ancho visible; entre 621 y 1000 píxeles las composiciones se apilan para que texto e imagen no se crucen.
- **Material real:** símbolo original de W.A Coding, fotografía de Habitatum, recursos de Radar Cultural, marca de ALFA y retrato del perfil de GitHub. Luna y Stoqio se expresan con tipografía y estructura gráfica; no se incorporaron capturas de sus interfaces.
- **Accesibilidad:** enlace para saltar al contenido, etiquetas de navegación, foco visible, enlaces directos a los proyectos, imagen con texto alternativo, interacción usable con teclado y una experiencia móvil sin fijación horizontal.

## Próximas decisiones de contenido

Las descripciones actuales son deliberadamente breves y se basan en los datos facilitados por Sergio y las páginas públicas. Los proyectos podrían crecer a casos individuales si Sergio aporta proceso, alcance, resultados y capturas aprobadas.
