import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const tools = [
  { name: 'TypeScript', kind: 'LENGUAJE', glyph: 'type T = idea;', note: 'Interfaces claras para productos que siguen creciendo.' },
  { name: 'JavaScript', kind: 'LENGUAJE', glyph: 'const idea = () =>', note: 'La base flexible de muchas experiencias web.' },
  { name: 'React', kind: 'FRONTEND', glyph: '<Interface />', note: 'Experiencias rápidas, expresivas y fáciles de usar.' },
  { name: 'Python', kind: 'LENGUAJE', glyph: 'def construir():', note: 'Lógica, automatización y nuevas formas de explorar.' },
  { name: 'Django', kind: 'BACKEND', glyph: 'request → response', note: 'La estructura detrás de plataformas reales.' },
  { name: 'PostgreSQL', kind: 'DATOS', glyph: 'SELECT futuro;', note: 'Datos consistentes para decisiones confiables.' },
  { name: 'SQLite', kind: 'DATOS', glyph: 'local.db / 01', note: 'Persistencia ligera para prototipos y herramientas locales.' },
  { name: 'C/C++', kind: 'LENGUAJE', glyph: '#include <idea>', note: 'Pensar cerca del sistema y entender su funcionamiento.' },
  { name: 'C#', kind: 'LENGUAJE', glyph: 'public class Idea', note: 'Otra vía para construir software con estructura.' },
  { name: 'Cloudflare', kind: 'INFRAESTRUCTURA', glyph: 'edge → mundo', note: 'Infraestructura para llevar productos a más personas.' },
  { name: 'Three.js', kind: 'CREATIVE CODE', glyph: 'x · y · z', note: 'Profundidad e interacción cuando aportan a la historia.' },
  { name: 'GSAP', kind: 'MOTION', glyph: 't = 0 → ∞', note: 'Movimiento preciso al servicio del contenido.' },
  { name: 'Linux', kind: 'SISTEMAS', glyph: '$ ./construir', note: 'Un entorno cotidiano para explorar, desarrollar y entregar.' },
]

export function StackCarousel({ motionOff }: { motionOff: boolean }) {
  const [active, setActive] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  const select = (index: number) => {
    const next = (index + tools.length) % tools.length
    setActive(next)
    const rail = railRef.current
    const card = rail?.children[next] as HTMLElement | undefined
    if (rail && card) rail.scrollTo({
      left: card.offsetLeft - rail.offsetLeft - (rail.clientWidth - card.clientWidth) / 2,
      behavior: motionOff ? 'instant' : 'smooth',
    })
  }

  return <section className="stack-section" id="stack" aria-labelledby="stack-title">
    <div className="stack-heading"><span>[ Herramientas / {String(tools.length).padStart(2, '0')} ]</span><div><h2 id="stack-title">Mi lenguaje<br/><i>de trabajo.</i></h2><p>Un stack para resolver problemas reales. Cada herramienta entra cuando la idea la necesita.</p></div></div>
    <div className="stack-stage" aria-live="polite">
      <div className="stack-spotlight"><span>{String(active + 1).padStart(2, '0')} / {String(tools.length).padStart(2, '0')} — {tools[active].kind}</span><strong key={tools[active].glyph}>{tools[active].glyph}</strong><p>{tools[active].note}</p></div>
      <div className="stack-controls"><button type="button" onClick={() => select(active - 1)} aria-label="Tecnología anterior"><ArrowLeft size={19}/></button><button type="button" onClick={() => select(active + 1)} aria-label="Siguiente tecnología"><ArrowRight size={19}/></button></div>
    </div>
    <div className="stack-rail" ref={railRef} aria-label="Tecnologías y herramientas">
      {tools.map((tool, index) => <button className={`stack-card ${index === active ? 'is-active' : ''}`} type="button" aria-pressed={index === active} key={tool.name} onClick={() => select(index)} onMouseEnter={() => setActive(index)}>
        <span>{String(index + 1).padStart(2, '0')} / {tool.kind}</span><strong>{tool.name}</strong><small>{tool.glyph}</small><span className="stack-card-plus" aria-hidden="true">+</span>
      </button>)}
    </div>
    <div className="stack-foot"><span>{'0 1 / + '.repeat(9)}</span><span>Elige una herramienta ↗</span></div>
  </section>
}
