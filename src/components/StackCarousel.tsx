import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AsciiRain } from './AsciiRain'

type Tool = { name: string; kind: string; glyph: string; note: string; color: string; art: string }
const tools: Tool[] = [
  { name: 'TypeScript', kind: 'LENGUAJE', glyph: 'type T = idea;', note: 'Interfaces claras para productos que siguen creciendo.', color: '#4D9BE9', art: String.raw`┏━━━━━━━━┓
┃   TS   ┃
┗━━━━━━━━┛` },
  { name: 'JavaScript', kind: 'LENGUAJE', glyph: 'const idea = () =>', note: 'La base flexible de muchas experiencias web.', color: '#F2D553', art: String.raw`┏━━━━━━━━┓
┃   JS   ┃
┗━━━━━━━━┛` },
  { name: 'React', kind: 'FRONTEND', glyph: '<Interface />', note: 'Experiencias rápidas, expresivas y fáciles de usar.', color: '#67D5E7', art: String.raw`  .---.
--(  ●  )--
  '---'` },
  { name: 'Python', kind: 'LENGUAJE', glyph: 'def construir():', note: 'Lógica, automatización y nuevas formas de explorar.', color: '#E9C75C', art: String.raw`╭── py ──╮
╰─╮  ╭──╯
╭─╯  ╰──╮
╰── PY ─╯` },
  { name: 'Django', kind: 'BACKEND', glyph: 'request → response', note: 'La estructura detrás de plataformas reales.', color: '#58B98C', art: String.raw`django
request()
   ↳ 200 OK` },
  { name: 'PostgreSQL', kind: 'DATOS', glyph: 'SELECT futuro;', note: 'Datos consistentes para decisiones confiables.', color: '#75A5DF', art: String.raw`  __  __
 /  \/  \
(  o  o  )
 \   __/│
  \_/   │` },
  { name: 'SQLite', kind: 'DATOS', glyph: 'local.db / 01', note: 'Persistencia ligera para herramientas locales.', color: '#74B5D9', art: String.raw`    /)
   //
  ///___
 (______)` },
  { name: 'C/C++', kind: 'LENGUAJE', glyph: '#include <idea>', note: 'Pensar cerca del sistema y entender su funcionamiento.', color: '#8797EB', art: String.raw`  _______
 / C ++  \
|  < >    |
 \_______/` },
  { name: 'C#', kind: 'LENGUAJE', glyph: 'public class Idea', note: 'Otra vía para construir software con estructura.', color: '#B484D9', art: String.raw`   ______
  / C # /|
 /_____/ |
 |_____|/` },
  { name: 'Cloudflare', kind: 'INFRAESTRUCTURA', glyph: 'edge → mundo', note: 'Infraestructura para llevar productos a más personas.', color: '#F4A554', art: String.raw`   \ | /
 -- ( ) --
  .-----.
 (______)` },
  { name: 'Linux', kind: 'SISTEMAS', glyph: '$ ./construir', note: 'Un entorno cotidiano para explorar, desarrollar y entregar.', color: '#E6C96B', art: String.raw`   .--.
  |o_o |
  |:_/ |
 //   \
(|     |)` },
]

export function StackCarousel({ motionOff }: { motionOff: boolean }) {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const activeRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  const select = useCallback((index: number, scrollRail = true) => {
    const next = (index + tools.length) % tools.length
    activeRef.current = next
    setActive(next)
    const rail = railRef.current
    const card = rail?.children[next] as HTMLElement | undefined
    if (scrollRail && rail && card) rail.scrollTo({
      left: card.offsetLeft - rail.offsetLeft - (rail.clientWidth - card.clientWidth) / 2,
      behavior: motionOff ? 'instant' : 'smooth',
    })
  }, [motionOff])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio > 0.18), { threshold: [0, 0.18, 0.5] })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || interacting || motionOff) return
    const timer = window.setInterval(() => select(activeRef.current + 1), 3400)
    return () => window.clearInterval(timer)
  }, [visible, interacting, motionOff, select])

  const current = tools[active]
  return <section className={`stack-section ${visible ? 'is-visible' : ''}`} id="stack" aria-labelledby="stack-title" ref={sectionRef} onPointerMove={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }} onTouchStart={() => setInteracting(true)} onTouchEnd={() => setInteracting(false)}>
    <AsciiRain/>
    <div className="stack-marquee" aria-hidden="true"><div>{[...tools, ...tools].map((tool, index) => <span key={`${tool.name}-${index}`}>{tool.name}<i> / </i></span>)}</div></div>
    <div className="stack-heading"><span>[ Herramientas / {String(tools.length).padStart(2, '0')} ]</span><div><h2 id="stack-title" tabIndex={-1}>Mi lenguaje<br/><i>de trabajo.</i></h2><p>Un stack para resolver problemas reales. Cada herramienta entra cuando la idea la necesita.</p></div></div>
    <div className="stack-stage" style={{ '--brand': current.color } as CSSProperties} aria-live={interacting ? 'polite' : 'off'}>
      <div className="stack-spotlight"><span>{String(active + 1).padStart(2, '0')} / {String(tools.length).padStart(2, '0')} — {current.kind}</span><strong key={current.glyph}>{current.glyph}</strong><p>{current.note}</p></div>
      <pre className="stack-hero-art" aria-hidden="true" key={current.name}>{current.art}</pre>
      <div className="stack-controls"><button type="button" onClick={() => select(active - 1)} aria-label="Tecnología anterior"><ArrowLeft size={19}/></button><button type="button" onClick={() => select(active + 1)} aria-label="Siguiente tecnología"><ArrowRight size={19}/></button></div>
    </div>
    <div className="stack-rail" ref={railRef} aria-label="Tecnologías y herramientas">
      {tools.map((tool, index) => <button className={`stack-card ${index === active ? 'is-active' : ''}`} style={{ '--brand': tool.color } as CSSProperties} type="button" aria-pressed={index === active} key={tool.name} onClick={() => select(index)} onMouseEnter={() => select(index, false)}>
        <span>{String(index + 1).padStart(2, '0')} / {tool.kind}</span><pre className="stack-card-art" aria-hidden="true">{tool.art}</pre><strong>{tool.name}</strong><small>{tool.glyph}</small><span className="stack-card-plus" aria-hidden="true">+</span>
      </button>)}
    </div>
    <div className="stack-foot"><span>{'0 1 / + '.repeat(9)}</span><span>{motionOff ? 'Elige una herramienta ↗' : interacting ? 'Explora a tu ritmo ↗' : 'Recorrido automático · pasa el cursor para explorar'}</span></div>
  </section>
}
