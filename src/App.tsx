import { useEffect, useRef, useState } from 'react'
import { Button } from '@heroui/react'
import { ArrowDown, ArrowUpRight, Github, Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProximityGrid } from './components/blocks/interactive-grid-hero/proximity-grid'
import { ScrollTextReveal } from './components/spaceui/scroll-text-reveal'

gsap.registerPlugin(ScrollTrigger)

type Project = { name: string; label: string; role: string; description: string; url: string; kind: string }
const projects: Project[] = [
  { name: 'W.A Coding', label: 'Estudio de software', role: 'Fundador · Desarrollo', description: 'Desarrollo de sitios, aplicaciones y software a medida desde Puebla.', url: 'https://wacoding.org/', kind: 'wa' },
  { name: 'Habitatum', label: 'Experiencia inmobiliaria', role: 'Desarrollo · W.A Coding', description: 'Una presencia digital para explorar propiedades y tomar decisiones con claridad.', url: 'https://habitatum.com.mx/', kind: 'habitatum' },
  { name: 'Luna', label: 'Plataforma de eventos', role: 'Coordinación técnica · Desarrollo', description: 'Infraestructura y experiencia para conectar la vida universitaria con sus eventos.', url: 'https://luna.alf4.org/', kind: 'luna' },
  { name: 'Radar Cultural', label: 'Cultura y comunidad', role: 'Coordinación de desarrollo técnico', description: 'Una agenda para dar visibilidad a la actividad cultural, nacida en el Hackatón BAM BUAP.', url: 'https://radarcultural.mx/', kind: 'radar' },
  { name: 'ALFA Media', label: 'Comunicación y contenidos', role: 'Diseño y desarrollo · W.A Coding', description: 'Plataforma editorial para una iniciativa de comunicación y contenidos.', url: 'https://alf4.org/', kind: 'alfa' },
]
const social = [
  ['GitHub', 'https://github.com/sergio-rubin'],
  ['Instagram', 'https://www.instagram.com/zoms.erchxd/'],
  ['Discord', 'https://discordapp.com/users/674052139789844551'],
  ['Facebook', 'https://www.facebook.com/profile.php?id=100063843164987&locale=es_LA'],
]

function ProjectVisual({ kind }: { kind: string }) {
  return <div className={'project-visual pv-' + kind} aria-hidden="true">
    <div className="preview-top"><span>● &nbsp; ● &nbsp; ●</span><span>PREVIEW / {kind.toUpperCase()}</span></div>
    {kind === 'wa' && <><div className="pv-wa-logo">W.A<span>®</span></div><div className="pv-wa-tiles"><i/><i/><i/></div><span className="pv-caption">DIGITAL PRODUCTS / MADE WITH INTENTION</span></>}
    {kind === 'habitatum' && <><div className="pv-hab-type">habitatum<span>®</span></div><div className="pv-hab-building"><i/><i/><i/><i/></div><span className="pv-caption">ESPACIOS ELEGIDOS CON CRITERIO</span></>}
    {kind === 'luna' && <><div className="pv-luna-word">LUNA<span> / 01</span></div><div className="pv-luna-calendar"><i>LU</i><i>MA</i><i>MI</i><i>JU</i><i>VI</i><i>SA</i><i>DO</i></div><span className="pv-caption">EVENTOS EN UN SOLO LUGAR</span></>}
    {kind === 'radar' && <><div className="pv-radar-title">RADAR<br/><span>CULTURAL</span></div><div className="pv-radar-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div><span className="pv-caption">CULTURA / PUEBLA / COMUNIDAD</span></>}
    {kind === 'alfa' && <><div className="pv-alfa-title">ALFA<span>MEDIA</span></div><div className="pv-alfa-lines"><i/><i/><i/><i/></div><span className="pv-caption">COMUNICACIÓN EN MOVIMIENTO</span></>}
    <div className="preview-bottom"><span>DESIGNED TO CONNECT</span><span>↗</span></div>
  </div>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const work = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!root.current || !work.current || !track.current) return
    const context = gsap.context(() => {
      if (!reduced) gsap.from('.reveal', { opacity: 0, y: 32, duration: 0.9, stagger: 0.11, ease: 'power3.out', delay: 0.1, clearProps: 'all' })
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const parallax = gsap.to('.hero-playground', {
          y: 48,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        })
        const headings = gsap.utils.toArray<HTMLElement>('.section-heading h2, .about-layout h2, .more-head h2, .experience-section h2, .contact-main h2')
        const reveals = headings.map((heading) => gsap.from(heading, {
          y: 35,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
        }))
        return () => { parallax.kill(); reveals.forEach((animation) => animation.kill()) }
      })
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const section = work.current!
        const rail = track.current!
        const distance = () => Math.max(0, rail.scrollWidth - section.clientWidth + 40)
        const tween = gsap.to(rail, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top top', end: () => '+=' + distance(),
            scrub: 0.9, pin: true, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: self => {
              const bar = section.querySelector<HTMLElement>('.progress-fill')
              if (bar) bar.style.transform = 'scaleX(' + self.progress + ')'
            },
          },
        })
        return () => tween.kill()
      })
      document.fonts.ready.then(() => ScrollTrigger.refresh())
      return () => mm.revert()
    }, root)
    return () => context.revert()
  }, [reduced])

  const closeMenu = () => setMenuOpen(false)
  const goToWork = () => document.getElementById('trabajos')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  return <div ref={root} className="site-shell">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <a className="brand" href="#inicio" onClick={closeMenu}>Sergio Rubín<span className="brand-cursor">_</span></a>
      <span className="header-location">DESARROLLADOR DE SOFTWARE / PUEBLA, MX</span>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button>
      <nav id="primary-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
        <a href="#trabajos" onClick={closeMenu}>Proyectos</a><a href="#sobre-mi" onClick={closeMenu}>Sobre mí</a><a href="#contacto" onClick={closeMenu}>Contacto</a>
      </nav>
    </header>
    <main id="contenido">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-main">
          <div className="hero-content">
            <p className="eyebrow reveal"><span className="slashes">//</span> DESARROLLO DE SOFTWARE · FUNDADOR DE W.A CODING</p>
            <h1 id="hero-title" className="hero-title reveal">Hola, soy Sergio.<br/><span>Construyo ideas</span><br/>que se usan<span className="title-dot">.</span></h1>
            <p className="hero-intro reveal">Diseño y desarrollo productos digitales con intención, desde la primera interacción hasta el sistema que los sostiene.</p>
            <div className="hero-actions reveal"><Button className="primary-button" variant="primary" onPress={goToWork}>Ver proyectos <ArrowUpRight size={18}/></Button><a className="outline-button" href="https://github.com/sergio-rubin" target="_blank" rel="noreferrer"><Github size={19}/> GitHub</a></div>
          </div>
          <div className="hero-playground reveal" aria-label="Cuadrícula interactiva que responde al cursor">
            <ProximityGrid cellSize={5} gap={17} proximity={24} inset={30} radius="full" className="hero-grid"/>
            <div className="playground-corners" aria-hidden="true"><i/><i/><i/><i/></div>
            <div className="playground-code" aria-hidden="true"><span>&gt; sergio.rubin()</span><span>&nbsp; origin: Puebla, MX</span><span>&nbsp; role: software developer</span><span>&nbsp; founder: W.A Coding</span><span>&nbsp; focus: products / web / systems</span><span className="terminal-cursor">▌</span></div>
          </div>
        </div>
        <div className="hero-bottom"><span>01 / INTRODUCCIÓN</span><span>DESLIZA PARA EXPLORAR <ArrowDown size={14}/></span></div>
      </section>

      <section className="work-section" id="trabajos" ref={work} aria-labelledby="work-title">
        <div className="section-heading"><div><span className="eyebrow"><span className="slashes">//</span> PROYECTOS DESTACADOS</span><h2 id="work-title">Trabajo seleccionado<span className="title-dot">.</span></h2></div><span className="section-count">01 — 05<br/>SCROLL HORIZONTAL →</span></div>
        <div className="work-viewport"><div className="work-track" ref={track}>
          {projects.map((project, index) => <article className="project-card" key={project.name}>
            <div className="project-info"><div className="project-counter">{String(index + 1).padStart(2, '0')} / 05 <span>{project.label}</span></div><div className="project-text"><h3>{project.name}</h3><p>{project.description}</p><span className="project-role">{project.role}</span><a href={project.url} target="_blank" rel="noreferrer">Ver proyecto <ArrowUpRight size={17}/></a></div></div>
            <ProjectVisual kind={project.kind}/>
          </article>)}
        </div></div>
        <div className="work-footer"><span>DESLIZA PARA VER MÁS PROYECTOS</span><div className="progress-track"><div className="progress-fill"/></div><span>05 PROYECTOS</span></div>
      </section>

      <section className="about-section" id="sobre-mi" aria-labelledby="about-title">
        <div className="about-label"><span className="eyebrow"><span className="slashes">//</span> SOBRE MÍ</span><span>02 / PERSONA DETRÁS DEL CÓDIGO</span></div>
        <div className="about-layout"><h2 id="about-title">Curiosidad como motor.<br/>Código como lenguaje<span className="title-dot">.</span></h2><div className="about-copy"><span className="file-label">~/sergio/about.txt</span><p>Soy Sergio Rubín, estudiante de Ingeniería en Ciencias de la Computación en la BUAP y fundador de <a href="https://wacoding.org/" target="_blank" rel="noreferrer">W.A Coding ↗</a>.</p><p>Trabajo entre producto, frontend, infraestructura y coordinación técnica. Me gusta unir ideas ambiciosas con decisiones claras y software que resista el uso real.</p><div className="about-meta"><span>PUEBLA, MÉXICO</span><span>WEB / SISTEMAS / EXPERIENCIAS</span></div></div></div>
      </section>
      <section className="manifesto-section" aria-label="Forma de trabajar"><span className="eyebrow"><span className="slashes">//</span> UNA IDEA QUE ME GUÍA</span>{reduced ? <p className="manifesto">No me conformo con que funcione. Quiero que cada interacción tenga intención.</p> : <ScrollTextReveal as="p" text="No me conformo con que funcione. Quiero que cada interacción tenga intención." splitBy="word" className="manifesto" inactiveOpacity={0.2} revealRatio={0.85}/>}</section>
      <section className="more-section" aria-labelledby="more-title"><div className="more-head"><span className="eyebrow"><span className="slashes">//</span> LABORATORIO PERSONAL</span><h2 id="more-title">También construyo<br/>por curiosidad<span className="title-dot">.</span></h2></div><div className="more-list">
        <a className="more-row" href="https://github.com/W-A-CODING/d-dev" target="_blank" rel="noreferrer"><span>01</span><div><h3>d-dev</h3><p>Aplicación de escritorio de cálculos y gráficas, desarrollada con Giovanny Vélez. Una parte especial de mis inicios.</p></div><ArrowUpRight size={20}/></a>
        <a className="more-row" href="https://github.com/sergio-rubin/grafIA" target="_blank" rel="noreferrer"><span>02</span><div><h3>grafIA</h3><p>Juegos matemáticos interactivos que exploran regresión polinomial y reconocimiento de funciones.</p></div><ArrowUpRight size={20}/></a>
        <div className="more-row"><span>03</span><div><h3>Stoqio</h3><p>Aplicación de inventario offline-first en desarrollo.</p></div><span className="row-status">EN PROCESO</span></div>
        <div className="more-row"><span>04</span><div><h3>Numeración maya + FPGA</h3><p>Conversor de decimal a numeración maya como experimento personal.</p></div><span className="row-status">EXPERIMENTO</span></div>
      </div></section>
      <section className="experience-section" aria-labelledby="experience-title"><span className="eyebrow"><span className="slashes">//</span> COLABORACIONES</span><h2 id="experience-title">Donde también he aportado<span className="title-dot">.</span></h2><div className="experience-grid"><div><span>FCC · BUAP</span><h3>Laboratorio ASR</h3><p>Participación como Frontend Architect para la Secretaría Académica.</p></div><div><span>FCC · BUAP</span><h3>Ingeniería en Ciberseguridad</h3><p>Colaboración en el frontend del sitio de la carrera.</p></div><div><span>HACKATONES</span><h3>Puebla + BAM BUAP</h3><p>Participación en Hackatón Puebla y Hackatón BAM BUAP 2025 y 2026.</p></div></div></section>
      <section className="contact-section" id="contacto" aria-labelledby="contact-title"><span className="eyebrow"><span className="slashes">//</span> CONTACTO</span><div className="contact-main"><h2 id="contact-title">¿Hacemos algo<br/>bueno juntos<span className="title-dot">?</span></h2><a className="contact-button" href="https://wacoding.org/" target="_blank" rel="noreferrer" aria-label="Contactar a través de W.A Coding"><ArrowUpRight size={32}/></a></div><div className="social-links">{social.map(([name, href]) => <a href={href} key={name} target="_blank" rel="noreferrer">{name}<ArrowUpRight size={15}/></a>)}</div></section>
    </main>
    <footer className="site-footer"><span>© 2026 SERGIO RUBÍN</span><span>HECHO CON INTENCIÓN Y UN POCO DE ASCII &lt;/&gt;</span><a href="#inicio">VOLVER ARRIBA ↑</a></footer>
  </div>
}

export default App
