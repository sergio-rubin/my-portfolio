# Dirección visual — Sergio Rubín

Documento de referencia para las siguientes iteraciones del portafolio. Se basa en observación directa de las páginas, no en imágenes generadas.

## Lo que observé

| Referencia | Interacción y composición | Aprendizaje aplicable |
| --- | --- | --- |
| [Space UI](https://www.spaceui.one/) | Componentes pequeños con respuesta táctil, tarjetas oscuras de contraste controlado y una navegación compacta. La galería muestra cada comportamiento en su contexto. | Usar componentes interactivos como detalles precisos, sin llenar todas las secciones de efectos. |
| [HeroUI](https://heroui.com/) | Portada de tipografía limpia, pocas llamadas a la acción y módulos con estados legibles. La transición entre secciones conserva ritmo y espacio. | Mantener la jerarquía clara y controles accesibles, con movimiento que refuerce el contenido. |
| [Kott Studio](https://kott.studio/) | Una escena de apertura dominante evoluciona con el scroll; el trabajo aparece en una composición partida de nombres grandes y vista previa. Los casos incluyen contexto y decisiones, además de imágenes. | Darle a la portada una pieza propia y reservar el mayor movimiento para el recorrido de proyectos. |
| [Cipher](https://cipher.tv/) | Lienzo negro de pantalla completa; el desplazamiento recorre un conjunto de piezas y destaca una a la vez mientras atenúa las demás. | Usar foco y profundidad para indicar qué proyecto está activo. Evitar una interfaz cargada. |
| [Mike Wilcock](https://mikewilcockdesign.com/) | Nombre a escala monumental, presentación breve en los extremos, proyectos con vista previa sincronizada y otra galería que admite arrastre o scroll. Ofrece un control para pausar el movimiento. | Hacer que el nombre y el trabajo sean protagonistas y conservar una alternativa clara para usuarios con movimiento reducido. |

## Sistema para este sitio

- **Color:** negro `#070707`, superficie `#101010`, gris oscuro `#191919`, texto `#f3f3f3`, secundario `#a9a9a9`. Solo modo oscuro.
- **Tipo:** Bricolage Grotesque Variable para titulares y texto, Azeret Mono para datos de terminal y arte ASCII.
- **Estructura:** presentación y pieza interactiva al inicio; proyectos principales en un recorrido horizontal; información personal y colaboraciones en secciones de lectura vertical.
- **Movimiento:** entrada coordinada de la portada, desplazamiento horizontal ligado al scroll, parallax discreto y revelado de un manifiesto. Respetar `prefers-reduced-motion` y ofrecer pausa manual con galería desplazable.
- **Identidad:** usar un monograma ASCII propio y pequeñas señales de terminal. No usar planetas, órbitas ni símbolos espaciales para representar Space UI.
- **Contenido:** conservar nombres, roles y enlaces reales; distinguir proyectos en desarrollo de los publicados. Las gráficas en CSS son interpretaciones editoriales, no capturas.

## Revisión antes de añadir efectos

1. ¿Ayuda a entender una acción, el cambio de sección o el proyecto activo?
2. ¿Funciona también con teclado, tacto y movimiento reducido?
3. ¿Sigue siendo fácil encontrar proyectos y contacto sin esperar una animación?

Si la respuesta es no, simplificar el efecto.
