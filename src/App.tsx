import { useEffect, useRef, useState } from 'react'
import { Button } from '@heroui/react'
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, Pause, Play, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlyphSculpture } from './components/GlyphSculpture'
import { ScrollTextReveal } from './components/spaceui/scroll-text-reveal'
import DecryptedText from './components/DecryptedText'

gsap.registerPlugin(ScrollTrigger)

type Project = { name: string; field: string; role: string; year: string; story: string; url: string; visual: string }
const projects: Project[] = [
  { name: 'W.A Coding', field: 'Estudio / producto digital', role: 'Fundador, desarrollo y dirección técnica', year: '2024 —', story: 'Fundé un espacio para convertir ideas en productos digitales que funcionan en el mundo real.', url: 'https://wacoding.org/', visual: 'wa' },
  { name: 'Habitatum', field: 'Plataforma inmobiliaria', role: 'Desarrollo web con W.A Coding', year: '2026', story: 'Una experiencia editorial para descubrir espacios y tomar decisiones con claridad.', url: 'https://habitatum.com.mx/', visual: 'habitatum' },
  { name: 'Radar Cultural', field: 'Cultura / código abierto', role: 'Coordinación de desarrollo técnico', year: '2025 —', story: 'De una agenda creada en un hackatón a una infraestructura abierta para compartir cultura.', url: 'https://radarcultural.mx/', visual: 'radar' },
  { name: 'Luna', field: 'Vida universitaria', role: 'Coordinación técnica, desarrollo e infraestructura', year: '2026', story: 'Una plataforma para que los encuentros de la comunidad BUAP sean fáciles de encontrar.', url: 'https://luna.alf4.org/', visual: 'luna' },
  { name: 'ALFA Media', field: 'Medios / contenidos', role: 'Diseño y desarrollo con W.A Coding', year: '2026', story: 'Un sistema digital para una iniciativa de comunicación, producción y contenidos.', url: 'https://alf4.org/', visual: 'alfa' },
]
const archive = [
  { title: 'd-dev', type: 'Aplicación de escritorio', detail: 'Cálculos y gráficas con Giovanny Vélez. Un punto de partida que todavía me importa.', href: 'https://github.com/W-A-CODING/d-dev', glyph: '∫ f(x) dx' },
  { title: 'grafIA', type: 'Aprendizaje interactivo', detail: 'Juegos matemáticos para explorar funciones y gráficas en la Feria de las Matemáticas BUAP.', href: 'https://github.com/sergio-rubin/grafIA', glyph: 'y = f(x)' },
  { title: 'Stoqio', type: 'En desarrollo', detail: 'Inventario offline-first pensado para seguir funcionando cuando la conexión desaparece.', glyph: '▰▰▰' },
  { title: 'Maya + FPGA', type: 'Experimento', detail: 'Un conversor de decimal a numeración maya construido por curiosidad.', glyph: '𝋠 𝋡 𝋢' },
]
const socials = [
  ['GitHub', 'https://github.com/sergio-rubin'],
  ['Instagram', 'https://www.instagram.com/zoms.erchxd/'],
  ['Discord', 'https://discordapp.com/users/674052139789844551'],
  ['Facebook', 'https://www.facebook.com/profile.php?id=100063843164987&locale=es_LA'],
]

function ProjectFrame({ project }: { project: Project }) {
  return <div className={`project-frame frame-${project.visual}`} aria-label={`Vista visual de ${project.name}`}>
    <div className="frame-chrome"><span><i/><i/><i/></span><span>{project.url.replace('https://', '')}</span><ArrowUpRight size={13}/></div>
    {project.visual === 'wa' && <div className="wa-composition"><div className="wa-photo"><img src="/media/habitatum.webp" alt="" /></div><div className="wa-photo wa-second"><img src="/media/radar-dance.webp" alt="" /></div><strong>W.A<br/>CODING</strong><small>Ideas que toman forma.</small></div>}
    {project.visual === 'habitatum' && <div className="image-composition"><img src="/media/habitatum.webp" alt="Arquitectura del sitio Habitatum"/><div className="image-shade"/><span className="image-overline">ESTUDIO INMOBILIARIO · PUEBLA</span><strong>habitatum<span>®</span></strong><small>ESPACIOS ELEGIDOS CON CRITERIO</small></div>}
    {project.visual === 'radar' && <div className="image-composition"><img src="/media/radar-dance.webp" alt="Imagen del proyecto Radar Cultural"/><div className="image-shade"/><span className="image-overline">CÓDIGO ABIERTO · COMUNIDAD</span><strong>Radar<br/>Cultural</strong><small>LA CULTURA SUCEDE. QUE NADIE SE LA PIERDA.</small></div>}
    {project.visual === 'luna' && <div className="luna-composition"><span className="luna-circle">◯</span><strong>LUNA</strong><small>LA VIDA UNIVERSITARIA TIENE UN LUGAR DONDE ENCONTRARSE</small><div className="luna-event"><span>DESCUBRE EVENTOS</span><ArrowUpRight size={14}/></div></div>}
    {project.visual === 'alfa' && <div className="alfa-composition"><img src="/media/alfa-logo.png" alt="Logotipo original de ALFA"/><strong>ALFA</strong><small>PRODUCCIÓN AUDIOVISUAL & MEDIOS CREATIVOS</small></div>}
    <div className="frame-bottom"><span>VISUAL / {project.name.toUpperCase()}</span><span>© SERGIO RUBÍN</span></div>
  </div>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const archiveSection = useRef<HTMLElement>(null)
  const archiveTrack = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const motionOff = paused || reduced

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])
  useEffect(() => {
    if (!root.current || motionOff) return
    const context = gsap.context(() => {
      gsap.fromTo('.hero-name .line', { yPercent: 105 }, { yPercent: 0, duration: 1.15, stagger: 0.13, ease: 'power4.out', delay: 0.12 })
      gsap.fromTo('.hero-intro, .hero-caption, .scroll-cue', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out', delay: 0.6 })
      gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.1 } })
        .to('.hero-name', { scale: 1.27, yPercent: -10, opacity: 0.18, ease: 'none' }, 0)
        .to('.hero-intro', { yPercent: -80, opacity: 0, ease: 'none' }, 0)
        .to('.hero-sculpture-wrap', { scale: 1.35, yPercent: 9, opacity: 0.42, ease: 'none' }, 0)
        .fromTo('.hero-outro', { opacity: 0, y: 80 }, { opacity: 1, y: 0, ease: 'none' }, 0.48)
      gsap.utils.toArray<HTMLElement>('.work-row').forEach((row, index) => {
        ScrollTrigger.create({ trigger: row, start: 'top 55%', end: 'bottom 45%', onEnter: () => setActive(index), onEnterBack: () => setActive(index) })
      })
      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px)', () => {
        if (!archiveSection.current || !archiveTrack.current) return
        const section = archiveSection.current
        const rail = archiveTrack.current
        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + 80)
        const tween = gsap.to(rail, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance()}`, scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: self => { const bar = section.querySelector<HTMLElement>('.archive-progress-fill'); if (bar) bar.style.transform = `scaleX(${self.progress})` } } })
        return () => tween.kill()
      })
      document.fonts.ready.then(() => ScrollTrigger.refresh())
      return () => mm.revert()
    }, root)
    return () => context.revert()
  }, [motionOff])

  return <div className={`portfolio ${motionOff ? 'motion-off' : ''}`} ref={root}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header"><a className="site-mark" href="#inicio" onClick={() => setMenuOpen(false)} aria-label="Sergio Rubín, inicio"><span>sr</span><b>_</b></a><span className="header-coordinate">Puebla, México <span className="header-signal">●</span> disponible para colaborar</span><div className="header-actions"><a className="header-contact" href="#contacto">Hablemos <ArrowUpRight size={14}/></a><button className="icon-button motion-button" type="button" aria-label={motionOff ? 'Activar animaciones' : 'Pausar animaciones'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{motionOff ? <Play size={17}/> : <Pause size={17}/>}</button><button className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div></header>
    <div className={`menu-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}><nav aria-label="Navegación principal"><a href="#trabajo" onClick={() => setMenuOpen(false)}>Trabajo <span>01</span></a><a href="#archivo" onClick={() => setMenuOpen(false)}>Archivo <span>02</span></a><a href="#sobre-mi" onClick={() => setMenuOpen(false)}>Sobre mí <span>03</span></a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto <span>04</span></a></nav><p>Sergio Rubín / Desarrollador de software</p></div>
    <main id="contenido"><section className="hero" id="inicio" aria-labelledby="hero-title"><div className="hero-stage"><div className="hero-topline"><span>Portfolio / 2026</span><span>Software, dirección técnica<br/>e ideas en construcción</span></div><div className="hero-sculpture-wrap"><GlyphSculpture paused={motionOff}/><span className="hero-sculpture-caption">[ Mueve el cursor / observa ]</span></div><div className="hero-intro"><span className="intro-prompt">{motionOff ? '> hola, soy Sergio' : <DecryptedText text="> hola, soy Sergio" animateOn="view" speed={28} sequential characters="/<>_01SERGIO"/>}</span><p>Desarrollo productos digitales con intención: desde la primera interacción hasta la infraestructura que los sostiene.</p><Button className="hero-cta" variant="primary" onPress={() => document.getElementById('trabajo')?.scrollIntoView({ behavior: motionOff ? 'auto' : 'smooth' })}>Explorar mi trabajo <ArrowUpRight size={16}/></Button></div><h1 id="hero-title" className="hero-name"><span className="line-wrap"><span className="line">SERGIO</span></span><span className="line-wrap second"><span className="line">RUBÍN<span className="name-period">.</span></span></span></h1><div className="hero-caption"><span>Desarrollador de software</span><span>Fundador de W.A Coding</span></div><div className="scroll-cue"><span>Desliza para entrar</span><ArrowDown size={16}/></div><div className="hero-outro"><span>&lt; idea / sistema &gt;</span><p>Me interesa lo que pasa<br/>cuando una idea <em>se vuelve real.</em></p></div></div></section>
      <section className="statement" aria-labelledby="statement-title"><span className="section-side-label">[ Una forma de hacer ]</span><div><h2 id="statement-title">Del primer píxel<br/>al sistema completo.</h2>{motionOff ? <p>Diseño, desarrollo y coordino tecnología para que las buenas ideas puedan vivir fuera de la pantalla.</p> : <ScrollTextReveal as="p" text="Diseño, desarrollo y coordino tecnología para que las buenas ideas puedan vivir fuera de la pantalla." splitBy="word" inactiveOpacity={0.22} revealRatio={0.9}/>}</div><div className="statement-ascii" aria-hidden="true"><span>+-----------+</span><span>| idea → 01 |</span><span>| code → 10 |</span><span>| live → ∞  |</span><span>+-----------+</span></div></section>
      <section className="selected-work" id="trabajo" aria-labelledby="work-title"><div className="work-heading"><span>[ Trabajo seleccionado ]</span><h2 id="work-title">Obras que<br/><i>ya existen.</i></h2><p>Cada proyecto tiene un contexto, un equipo y un reto distinto. Aquí están algunos de los que ayudé a llevar al mundo.</p></div><div className="work-body"><div className="work-list">{projects.map((project, i) => <a className={`work-row ${active === i ? 'is-active' : ''}`} href={project.url} target="_blank" rel="noreferrer" key={project.name} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}><span className="work-row-index">{String(i + 1).padStart(2, '0')}</span><div><h3>{project.name}</h3><span className="work-row-type">{project.field}</span><p>{project.story}</p><span className="work-row-role">{project.role}</span></div><ArrowUpRight size={27}/></a>)}</div><div className="work-preview"><div className="preview-stack">{projects.map((project, i) => <div className={`preview-layer ${active === i ? 'is-active' : ''}`} aria-hidden={active !== i} key={project.name}><ProjectFrame project={project}/></div>)}</div><div className="preview-meta"><span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><span>{projects[active].year} &nbsp; · &nbsp; {projects[active].role}</span></div></div></div></section>
      <section className="interlude" aria-label="Manifiesto"><span className="interlude-code">&lt; build what matters /&gt;</span><p>Curiosidad para empezar.<br/><span>Criterio para terminar.</span></p><div className="interlude-lines" aria-hidden="true">{'/ '.repeat(36)}</div></section>
      <section className="archive-section" id="archivo" ref={archiveSection} aria-labelledby="archive-title"><div className="archive-header"><div><span>[ Archivo / laboratorio ]</span><h2 id="archive-title">Fuera del encargo.</h2></div><p>También construyo para aprender. Algunos proyectos siguen creciendo; otros me recuerdan dónde empezó todo.</p></div><div className="archive-viewport"><div className="archive-track" ref={archiveTrack}>{archive.map((item, i) => <article className={`archive-card archive-${i}`} key={item.title}><div className="archive-card-top"><span>{item.type}</span><span>0{i + 1} / 04</span></div><div className="archive-art" aria-hidden="true"><span>{item.glyph}</span><small>{'+ / × : '.repeat(13)}</small></div><div className="archive-card-bottom"><h3>{item.title}</h3><p>{item.detail}</p>{item.href ? <a href={item.href} target="_blank" rel="noreferrer">Ver repositorio <ArrowUpRight size={17}/></a> : <span className="archive-status">En proceso</span>}</div></article>)}</div></div><div className="archive-progress"><span>Desliza / explora</span><div><i className="archive-progress-fill"/></div><ArrowRight size={18}/></div></section>
      <section className="about-section" id="sobre-mi" aria-labelledby="about-title"><div className="about-aside"><span>[ Detrás del código ]</span><div className="portrait"><img src="/media/sergio-avatar.png" alt="Retrato de Sergio Rubín, tomado de su perfil de GitHub"/><span>Sergio Rubín / Puebla, MX</span></div></div><div className="about-main"><h2 id="about-title">Me gusta estar<br/>entre <i>disciplinas.</i></h2><p>Estudio Ingeniería en Ciencias de la Computación en la BUAP y fundé <a href="https://wacoding.org/" target="_blank" rel="noreferrer">W.A Coding <ArrowUpRight size={15}/></a>. Trabajo entre frontend, producto, infraestructura y coordinación técnica.</p><p>En la FCC-BUAP participé como Frontend Architect en el Laboratorio ASR y colaboré en el sitio de Ingeniería en Ciberseguridad. Hackatón Puebla y BAM BUAP forman parte de mi camino.</p><div className="about-facts"><span><b>01</b> Desarrollo</span><span><b>02</b> Dirección técnica</span><span><b>03</b> Exploración</span></div></div></section>
      <section className="contact-section" id="contacto" aria-labelledby="contact-title"><div className="contact-background" aria-hidden="true">&lt;/&gt; &lt;/&gt; &lt;/&gt;</div><span>[ Siguiente conversación ]</span><h2 id="contact-title">¿Qué hacemos<br/><i>ahora?</i></h2><div className="contact-actions"><a className="contact-primary" href="https://wacoding.org/contacto" target="_blank" rel="noreferrer">Cuéntame tu idea <ArrowUpRight size={28}/></a><p>Si tienes un proyecto, una colaboración o una buena pregunta, podemos empezar por ahí.</p></div><div className="contact-socials">{socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={16}/></a>)}</div></section></main><footer className="site-footer"><span>© {new Date().getFullYear()} Sergio Rubín</span><span>Hecho con intención y un poco de ASCII &lt;/&gt;</span><a href="#inicio">Volver arriba ↑</a></footer>
  </div>
}
export default App
