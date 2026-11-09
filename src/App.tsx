import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Button } from '@heroui/react'
import { ArrowDown, ArrowUpRight, Menu, Pause, Play, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { AsciiCursorTrail } from './components/AsciiCursorTrail'
import { StackCarousel } from './components/StackCarousel'
import { StatementSequence } from './components/StatementSequence'
import { HeroTerminal } from './components/HeroTerminal'
import { BinaryPath } from './components/BinaryPath'
import { ScrollTextReveal } from './components/spaceui/scroll-text-reveal'
import DecryptedText from './components/DecryptedText'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
const GlyphSculpture = lazy(() => import('./components/GlyphSculpture').then(module => ({ default: module.GlyphSculpture })))
const sculptureFallback = <div className="glyph-sculpture glyph-fallback"><span className="glyph-static">SR</span></div>

type Project = { name: string; field: string; role: string; year: string; story: string; url?: string; visual: string; scene: string }
const projects: Project[] = [
  { name: 'W.A Coding', field: 'Estudio / producto digital', role: 'Fundador, desarrollo y dirección técnica', year: '2024 —', story: 'Fundé un espacio para convertir ideas en productos digitales que funcionan en el mundo real.', url: 'https://wacoding.org/', visual: 'wa', scene: String.raw`{ idea }
   ↓
[ producto ]` },
  { name: 'Habitatum', field: 'Plataforma inmobiliaria', role: 'Desarrollo web con W.A Coding', year: '2026', story: 'Una experiencia editorial para descubrir espacios y tomar decisiones con claridad.', url: 'https://habitatum.com.mx/', visual: 'habitatum', scene: String.raw`┌───┬────┐
│   │    │
├───┘    │
└────────┘` },
  { name: 'Radar Cultural', field: 'Cultura / código abierto', role: 'Coordinación de desarrollo técnico', year: '2025 —', story: 'De una agenda creada en un hackatón a una infraestructura abierta para compartir cultura.', url: 'https://radarcultural.mx/', visual: 'radar', scene: String.raw`   ((●))
  ((   ))
 ((     ))` },
  { name: 'Luna', field: 'Vida universitaria', role: 'Coordinación técnica, desarrollo e infraestructura', year: '2026', story: 'Una plataforma para que los encuentros de la comunidad BUAP sean fáciles de encontrar.', url: 'https://luna.alf4.org/', visual: 'luna', scene: String.raw`   .---.
  /  ◯  \
  \     /
   '---'` },
  { name: 'ALFA Media', field: 'Medios / contenidos', role: 'Diseño y desarrollo con W.A Coding', year: '2026', story: 'Un sistema digital para una iniciativa de comunicación, producción y contenidos.', url: 'https://alf4.org/', visual: 'alfa', scene: String.raw`┌─ REC ● ─┐
│  ▶ ▶ ▶  │
└─────────┘` },
  { name: 'Stoqio', field: 'Producto en desarrollo / offline-first', role: 'Diseño y desarrollo de producto', year: 'En proceso', story: 'Una aplicación de inventario que quiere seguir siendo útil incluso cuando la conexión desaparece.', visual: 'stoqio', scene: String.raw`[■■■□□]
STOCK  03/05
OFFLINE ✓` },
]
const archive = [
  { title: 'd-dev', type: 'Aplicación de escritorio', detail: 'Cálculos y gráficas desarrollados con Giovanny Vélez. Fue una parte especial de mis inicios: convertir problemas matemáticos en una herramienta que se puede usar y explorar.', href: 'https://github.com/W-A-CODING/d-dev', glyph: '∫ f(x) dx', tag: 'ORIGEN / CÓDIGO + MATEMÁTICAS', status: '' },
  { title: 'grafIA', type: 'Aprendizaje interactivo', detail: 'Juegos matemáticos para explorar funciones y gráficas en la Feria de las Matemáticas BUAP. Una forma de volver visible y manipulable lo que a veces solo se ve en el papel.', href: 'https://github.com/sergio-rubin/grafIA', glyph: 'y = f(x)', tag: 'APRENDER / INTERACCIÓN', status: '' },
  { title: 'Maya + FPGA', type: 'Experimento en progreso', detail: 'Un conversor de decimal a numeración maya hecho por curiosidad. Une lógica digital, representación de números y el placer de construir algo que no nació de un encargo.', glyph: '𝋠 𝋡 𝋢', tag: 'HARDWARE / CURIOSIDAD', status: 'En progreso' },
  { title: 'Hackatones', type: 'Comunidad y prototipos', detail: 'Hackatón Puebla y Hackatón BAM BUAP 2025 y 2026 forman parte de mi recorrido. Son espacios para pensar con otras personas, ensayar ideas y aprender con el tiempo en contra.', glyph: '</>', tag: 'COLABORACIÓN / IDEAS', status: 'Experiencia compartida' },
]
const archiveArt = [
  `∫ f(x) dx  /  01  +  ∞`,
  `  y ↑\n    |   /\n  0 +──/──→ x\n    | /`,
  `•••••\n─────\n •••\n─────\n  •`,
  `┌─ IDEA ─┐\n│ 01 → ∞ │\n└────────┘`,
]
const penguinArt = String.raw`   .--.
  |o_o |
  |:_/ |
 //   \
(|     |)
 /'\_/'\
 \___)=(___/`
const socials = [
  ['GitHub', 'https://github.com/sergio-rubin'],
  ['Instagram', 'https://www.instagram.com/zoms.erchxd/'],
  ['Discord', 'https://discordapp.com/users/674052139789844551'],
  ['Facebook', 'https://www.facebook.com/profile.php?id=100063843164987&locale=es_LA'],
]

function ProjectFrame({ project }: { project: Project }) {
  return <div className={`project-frame frame-${project.visual}`} aria-label={`Vista visual de ${project.name}`}>
    <div className="frame-chrome"><span><i/><i/><i/></span><span>{project.url?.replace('https://', '') ?? 'stoqio / prototipo local'}</span>{project.url ? <ArrowUpRight size={13}/> : <span aria-hidden="true">●</span>}</div>
    {project.visual === 'wa' && <div className="wa-composition"><div className="wa-orbit wa-orbit-one"/><div className="wa-orbit wa-orbit-two"/><img className="wa-mark-original" src="/media/wa-mark.svg" alt="Símbolo original de W.A Coding"/><span className="wa-scene-kicker">ESTUDIO DE SOFTWARE / PUEBLA, MX</span><strong>Ideas que<br/>toman forma<span className="accent-period">.</span></strong><small>DISEÑO · DESARROLLO · PRODUCTO DIGITAL</small></div>}
    {project.visual === 'habitatum' && <div className="image-composition"><img src="/media/habitatum.webp" alt="Arquitectura del sitio Habitatum"/><div className="image-shade"/><span className="image-overline">ESTUDIO INMOBILIARIO · PUEBLA</span><strong>habitatum<span>®</span></strong><small>ESPACIOS ELEGIDOS CON CRITERIO</small></div>}
    {project.visual === 'radar' && <div className="image-composition"><img src="/media/radar-dance.webp" alt="Imagen del proyecto Radar Cultural"/><div className="image-shade"/><span className="image-overline">CÓDIGO ABIERTO · COMUNIDAD</span><strong>Radar<br/>Cultural</strong><small>LA CULTURA SUCEDE. QUE NADIE SE LA PIERDA.</small></div>}
    {project.visual === 'luna' && <div className="luna-composition"><div className="luna-orbit luna-orbit-one"/><div className="luna-orbit luna-orbit-two"/><div className="luna-moon" aria-hidden="true"><i/><i/><i/><i/></div><img className="luna-brand-mark" src="/media/luna-icon.png" alt="" loading="lazy"/><span className="luna-kicker">CULTURA · ACADEMIA · COMUNIDAD</span><strong>LUNA</strong><small>LA PLATAFORMA DE EVENTOS DE LA COMUNIDAD BUAP</small><div className="luna-event"><span>EXPLORA LA PLATAFORMA</span><ArrowUpRight size={14}/></div></div>}
    {project.visual === 'alfa' && <div className="alfa-composition"><img src="/media/alfa-logo.png" alt="Logotipo original de ALFA"/><strong>ALFA</strong><small>PRODUCCIÓN AUDIOVISUAL & MEDIOS CREATIVOS</small></div>}
    {project.visual === 'stoqio' && <div className="stoqio-composition"><div className="stoqio-top"><span>stoqio<span className="accent-period">.</span></span><span>OFFLINE / READY ●</span></div><div className="stoqio-chart"><span>INVENTARIO EN TUS MANOS</span><strong>Todo en orden.<br/>Incluso sin red.</strong><div className="stoqio-bars"><i/><i/><i/><i/><i/><i/><i/></div></div><div className="stoqio-row"><span>01 &nbsp; PRODUCTOS</span><span>DISPONIBLE</span></div><div className="stoqio-row"><span>02 &nbsp; MOVIMIENTOS</span><span>SINCRONIZAR DESPUÉS</span></div></div>}
    <div className="frame-bottom"><span>VISUAL / {project.name.toUpperCase()}</span><span>© SERGIO RUBÍN</span></div>
  </div>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuPanel = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const motionOff = paused || reduced

  useEffect(() => {
    if (reduced || paused) return
    document.documentElement.classList.add('has-scroll-smoother')
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.05,
      smoothTouch: 0.12,
      effects: false,
      onFocusIn: (_self, event) =>
        event.target instanceof HTMLElement && event.target.getAttribute('tabindex') === '-1'
          ? false
          : undefined,
    })
    return () => {
      smoother.kill()
      document.documentElement.classList.remove('has-scroll-smoother')
    }
  }, [reduced, paused])

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      window.requestAnimationFrame(() => {
        if (cancelled) return
        const target = document.getElementById(id)
        if (!target) return
        const smoother = ScrollSmoother.get()
        if (smoother) smoother.scrollTo(target, false, 'top top')
        else target.scrollIntoView({ behavior: 'instant', block: 'start' })
        ScrollTrigger.refresh()
      })
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const syncHistory = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = id ? document.getElementById(id) : null
      const smoother = ScrollSmoother.get()
      if (smoother) smoother.scrollTo(target ?? 0, false, 'top top')
      else if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
    const onPopState = () => window.requestAnimationFrame(syncHistory)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  const navigateTo = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    const smoother = ScrollSmoother.get()
    if (smoother) smoother.scrollTo(target, !motionOff, 'top top')
    else target.scrollIntoView({ behavior: motionOff ? 'instant' : 'smooth', block: 'start' })
  }

  const visitSection = (id: string) => {
    setMenuOpen(false)
    navigateTo(id)
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${id} h2`)?.focus({ preventScroll: true }))
  }

  const exploreWork = () => {
    if (motionOff) {
      const work = document.getElementById('trabajo')
      if (work) {
        const smoother = ScrollSmoother.get()
        if (smoother) smoother.scrollTo(work, false, 'top top')
        else work.scrollIntoView({ behavior: 'instant' })
      }
      return
    }
    const hero = document.getElementById('inicio')
    if (!hero) return
    const terminalMoment = hero.offsetTop + Math.max(0, hero.offsetHeight - window.innerHeight) + Math.min(80, window.innerHeight * 0.08)
    const smoother = ScrollSmoother.get()
    if (smoother) smoother.scrollTo(terminalMoment, true)
    else window.scrollTo({ top: terminalMoment, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const links = Array.from(menuPanel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
    links[0]?.focus()
    const focusable: HTMLElement[] = [menuButton.current, ...links].filter((item): item is HTMLButtonElement | HTMLAnchorElement => item !== null)
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
      if (event.key === 'Tab' && focusable.length) {
        event.preventDefault()
        const index = focusable.indexOf(document.activeElement as HTMLElement)
        const next = event.shiftKey ? (index <= 0 ? focusable.length - 1 : index - 1) : (index + 1) % focusable.length
        focusable[next].focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.documentElement.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const moveProject = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (motionOff || event.pointerType === 'touch') return
    const scene = event.currentTarget
    const rect = scene.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    scene.style.setProperty('--pointer-x', `${x * 100}%`)
    scene.style.setProperty('--pointer-y', `${y * 100}%`)
    scene.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`)
    scene.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`)
    const visual = scene.querySelector<HTMLElement>('.project-scene-visual')
    if (!visual) return
    const visualRect = visual.getBoundingClientRect()
    const visualX = (event.clientX - visualRect.left) / visualRect.width
    const visualY = (event.clientY - visualRect.top) / visualRect.height
    scene.style.setProperty('--visual-pointer-x', `${visualX * 100}%`)
    scene.style.setProperty('--visual-pointer-y', `${visualY * 100}%`)
    scene.style.setProperty('--open-x', `${Math.min(88, Math.max(12, visualX * 100))}%`)
    scene.style.setProperty('--open-y', `${Math.min(82, Math.max(18, visualY * 100))}%`)
  }

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
      for (const [section, stage] of [
        ['.hero', '.hero-stage'],
        ['.statement', '.statement-stage'],
        ['.interlude', '.interlude-stage'],
      ]) {
        ScrollTrigger.create({ trigger: section, start: 'top top', end: 'bottom bottom', pin: stage, pinSpacing: false, anticipatePin: 1 })
      }
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero-film-grid i', { scaleY: 0 }, { scaleY: 1, duration: 1.1, stagger: 0.08 }, 0)
        .fromTo('.hero-name .line', { yPercent: 105 }, { yPercent: 0, duration: 1.25, stagger: 0.12, ease: 'power4.out' }, 0.22)
        .fromTo('.hero-intro, .hero-caption, .scroll-cue', { y: 18, clipPath: 'inset(0 0 100% 0)' }, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75, stagger: 0.1 }, 0.55)
        .fromTo('.hero-scan', { yPercent: -110, opacity: 0 }, { yPercent: 140, opacity: 0.65, duration: 1.45, ease: 'power1.inOut' }, 0.05)
      gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.15 } })
        .to('.hero-name', { scale: 1.3, yPercent: -13, opacity: 0.1, ease: 'none' }, 0)
        .to('.hero-intro', { yPercent: -95, autoAlpha: 0, ease: 'none', duration: 0.5 }, 0.03)
        .to('.hero-caption, .scroll-cue, .hero-topline', { opacity: 0, ease: 'none', duration: 0.28 }, 0.2)
        .to('.hero-sculpture-wrap', { scale: 1.68, yPercent: 7, opacity: 0.28, ease: 'none' }, 0)
        .to('.hero-film-grid', { scale: 1.16, opacity: 0, ease: 'none' }, 0.18)
        .fromTo('.hero-terminal', { autoAlpha: 0, y: 65, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, ease: 'none', duration: 0.38 }, 0.34)
        .fromTo('.terminal-command', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'steps(12)', duration: 0.26 }, 0.59)
        .fromTo('.terminal-enter', { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: 'none', duration: 0.11 }, 0.86)
        .fromTo('.terminal-response', { opacity: 0, y: 8 }, { opacity: 1, y: 0, ease: 'none', duration: 0.08 }, 0.92)
      gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'bottom 90%', end: 'bottom top', scrub: 0.55 } })
        .fromTo('.terminal-bridge', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 0)
        .fromTo('.bridge-key', { x: () => { const r = document.querySelector('.terminal-enter')!.getBoundingClientRect(); return r.left + r.width / 2 - window.innerWidth / 2 }, y: () => { const r = document.querySelector('.terminal-enter')!.getBoundingClientRect(); return r.top + r.height / 2 - window.innerHeight / 2 }, scale: 0.75 }, { x: 0, y: 0, scale: 1.75, ease: 'power2.inOut', duration: 0.34 }, 0.03)
        .fromTo('.bridge-ring', { scale: 0.15, autoAlpha: 0 }, { scale: 2.5, autoAlpha: 1, ease: 'power2.out', duration: 0.36 }, 0.2)
        .fromTo('.bridge-wipe', { scale: 0, autoAlpha: 1 }, { scale: 18, autoAlpha: 1, ease: 'power2.in', duration: 0.34 }, 0.28)
        .to('.bridge-key', { autoAlpha: 0, scale: 2.15, duration: 0.14 }, 0.48)
        .to('.terminal-bridge', { autoAlpha: 0, duration: 0.23 }, 0.77)
        .fromTo('.work-entry-bar, .work-heading', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.24 }, 0.76)
      gsap.fromTo('.work-heading h2, .work-heading p', { y: 65, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.work-heading', start: 'top 90%' } })
      gsap.utils.toArray<HTMLElement>('.project-scene').forEach((scene, index) => {
        ScrollTrigger.create({ trigger: scene, start: 'top 58%', end: 'bottom 42%', onEnter: () => setActive(index), onEnterBack: () => setActive(index) })
        const visual = scene.querySelector('.project-scene-visual')
        const title = scene.querySelector('.project-scene-title')
        gsap.fromTo(visual, { yPercent: 13, scale: 0.92, clipPath: 'inset(4% 0% 4% 0% round 18px)' }, { yPercent: -6, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)', ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 0.65 } })
        gsap.fromTo(title, { yPercent: 8, opacity: 0.55 }, { yPercent: -3, opacity: 1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom 55%', scrub: 0.7 } })
      })
      const statementWords = gsap.utils.toArray<HTMLElement>('.statement-word')
      const compactStatement = window.matchMedia('(max-width: 620px)').matches
      let lastWord = -1
      gsap.timeline({ scrollTrigger: { trigger: '.statement', start: 'top top', end: 'bottom bottom', scrub: 0.7, onUpdate: self => {
        const current = Math.min(statementWords.length - 1, Math.floor(gsap.utils.mapRange(0.08, 0.7, 0, statementWords.length, self.progress)))
        if (current === lastWord) return
        statementWords.forEach((word, index) => { word.classList.toggle('is-lit', index <= current && self.progress >= 0.08); word.classList.toggle('is-current', index === current && self.progress >= 0.08 && self.progress < 0.72) })
        lastWord = current
      } } })
        .fromTo('.statement-content', { scale: 0.94, y: 32 }, { scale: compactStatement ? 1.01 : 1.08, y: compactStatement ? -10 : -28, ease: 'none', duration: 0.7 }, 0)
        .to('.statement-content', { scale: compactStatement ? 1.07 : 1.17, y: compactStatement ? -42 : -86, opacity: 0, ease: 'none', duration: 0.12 }, 0.69)
        .fromTo('.statement-next', { opacity: 0, y: 34, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.17 }, 0.83)
      gsap.fromTo('.stack-heading, .stack-stage', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.13, ease: 'power3.out', scrollTrigger: { trigger: '.stack-section', start: 'top 76%' } })
      gsap.fromTo('.stack-card', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.055, ease: 'power3.out', scrollTrigger: { trigger: '.stack-rail', start: 'top 88%' } })
      gsap.timeline({ scrollTrigger: { trigger: '.interlude', start: 'top 82%', end: 'bottom bottom', scrub: 0.65 } })
        .fromTo('.interlude-logo', { opacity: 0.75, scale: 0.85, y: 24 }, { opacity: 1, scale: 1, y: -20, ease: 'none', duration: 0.7 }, 0)
        .fromTo('.interlude p', { scale: 0.95, y: 25 }, { scale: 1.08, y: -20, ease: 'none', duration: 0.85 }, 0)
        .fromTo('.interlude-penguin', { opacity: 0, y: 35, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.35 }, 0.32)
      gsap.utils.toArray<HTMLElement>('.signal-wave').forEach((wave, index) => {
        gsap.fromTo(wave, { y: 90 + index * 24, x: index % 2 ? -35 : 35, scale: 0.8 + index * 0.04 }, { y: -100 - index * 18, x: index % 2 ? 45 : -45, scale: 1.25 + index * 0.04, ease: 'none', scrollTrigger: { trigger: '.interlude', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
      })
      gsap.utils.toArray<HTMLElement>('.archive-story').forEach((story, index) => {
        gsap.fromTo(story, { opacity: 0, y: 80, x: index % 2 ? 60 : -60, rotation: index % 2 ? 4 : -4, clipPath: 'inset(0 0 16% 0)' }, { opacity: 1, y: 0, x: 0, rotation: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: story, start: 'top 87%', toggleActions: 'play none none reverse' } })
      })
      gsap.timeline({ scrollTrigger: { trigger: '.about-section', start: 'top 78%', toggleActions: 'play none none reverse' }, defaults: { ease: 'power3.out' } })
        .fromTo('.about-seam', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .fromTo('.portrait', { clipPath: 'inset(0 0 100% 0)', y: 36 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1 }, 0.12)
        .fromTo('.about-main h2', { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.95 }, 0.18)
        .fromTo('.about-main > p, .about-facts', { y: 23, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.09 }, 0.34)
      const routeDigits = gsap.utils.toArray<HTMLElement>('.binary-path-digit')
      let lastLit = -1
      ScrollTrigger.create({ trigger: '.archive-journey', start: 'top 68%', end: 'bottom 45%', onUpdate: self => {
        const next = Math.floor(self.progress * routeDigits.length)
        if (next === lastLit) return
        if (next > lastLit) for (let i = Math.max(0, lastLit + 1); i <= next && i < routeDigits.length; i += 1) routeDigits[i].classList.add('is-lit')
        else for (let i = next + 1; i <= lastLit && i < routeDigits.length; i += 1) routeDigits[i].classList.remove('is-lit')
        lastLit = next
      } })
      gsap.to('.site-progress-fill', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#smooth-content', start: 'top top', end: 'bottom bottom', scrub: 0.35 } })
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }, root)
    return () => context.revert()
  }, [motionOff])

  return <div className={`portfolio ${motionOff ? 'motion-off' : ''}`} ref={root}>
    <AsciiCursorTrail paused={motionOff}/>
    <a className="skip-link" href="#contenido" onClick={event => { event.preventDefault(); navigateTo('contenido'); document.getElementById('contenido')?.focus({ preventScroll: true }) }}>Saltar al contenido</a>
    <header className="site-header"><a className="site-mark" href="#inicio" onClick={event => { event.preventDefault(); setMenuOpen(false); navigateTo('inicio') }} aria-label="Sergio Rubín, inicio"><span>sr</span><b>_</b></a><span className="header-coordinate">Puebla, México <span className="header-signal">●</span> disponible para colaborar</span><div className="header-actions"><a className="header-contact" href="#contacto" onClick={event => { event.preventDefault(); navigateTo('contacto') }}>Hablemos <ArrowUpRight size={14}/></a><button className="icon-button motion-button" type="button" aria-label={reduced ? 'Movimiento reducido por preferencia del sistema' : motionOff ? 'Activar animaciones' : 'Pausar animaciones'} aria-pressed={motionOff} disabled={reduced} onClick={() => setPaused(!paused)}>{reduced ? <Pause size={17}/> : motionOff ? <Play size={17}/> : <Pause size={17}/>}</button><button ref={menuButton} className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div></header>
    <div className="site-progress" aria-hidden="true"><i className="site-progress-fill"/></div>
    <div className="terminal-bridge" aria-hidden="true"><i className="bridge-ring"/><i className="bridge-wipe"/><span className="bridge-key">Enter ↵</span></div>
    <div id="site-menu" ref={menuPanel} className={`menu-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}><nav aria-label="Navegación principal"><a href="#trabajo" onClick={event => { event.preventDefault(); visitSection('trabajo') }}>Trabajo <span>01</span></a><a href="#stack" onClick={event => { event.preventDefault(); visitSection('stack') }}>Stack <span>02</span></a><a href="#archivo" onClick={event => { event.preventDefault(); visitSection('archivo') }}>Archivo <span>03</span></a><a href="#sobre-mi" onClick={event => { event.preventDefault(); visitSection('sobre-mi') }}>Sobre mí <span>04</span></a><a href="#contacto" onClick={event => { event.preventDefault(); visitSection('contacto') }}>Contacto <span>05</span></a></nav><p>Sergio Rubín / Desarrollador de software</p></div>
    <div id="smooth-wrapper"><div id="smooth-content"><main id="contenido" tabIndex={-1} inert={menuOpen}><section className="hero" id="inicio" aria-labelledby="hero-title"><div className="hero-stage"><div className="hero-topline"><span>Portfolio / 2026</span><span>Software, dirección técnica<br/>e ideas en construcción</span></div><div className="hero-film-grid" aria-hidden="true"><i/><i/><i/><i/></div><div className="hero-scan" aria-hidden="true"/><div className="hero-sculpture-wrap">{motionOff ? sculptureFallback : <Suspense fallback={sculptureFallback}><GlyphSculpture paused={false}/></Suspense>}<span className="hero-sculpture-caption">[ Mueve el cursor / observa ]</span></div><div className="hero-intro"><span className="intro-prompt">{motionOff ? '> hola, soy Sergio' : <DecryptedText text="> hola, soy Sergio" animateOn="view" speed={28} sequential characters="/<>_01SERGIO"/>}</span><p>Desarrollo productos digitales con intención: desde la primera interacción hasta la infraestructura que los sostiene.</p><Button className="hero-cta" variant="primary" onPress={exploreWork}>Explorar mi trabajo <ArrowUpRight size={16}/></Button></div><h1 id="hero-title" className="hero-name"><span className="line-wrap"><span className="line">SERGIO</span></span><span className="line-wrap second"><span className="line">RUBÍN<span className="name-period">.</span></span></span></h1><div className="hero-caption"><span>Desarrollador de software</span><span>Fundador de W.A Coding</span></div><div className="scroll-cue"><span>Desliza para entrar</span><ArrowDown size={16}/></div><HeroTerminal motionOff={motionOff}/></div></section>
      <section className="selected-work" id="trabajo" aria-labelledby="work-title">
        <div className="work-entry-bar"><span>sergio@portfolio:~/Proyectos</span><span>06 historias / desplázate para explorar</span></div>
        <div className="work-heading"><span>[ Trabajo seleccionado / 06 ]</span><h2 id="work-title" tabIndex={-1}>Trabajo que<br/><i>toma forma.</i></h2><p>Productos publicados y uno que todavía estoy construyendo. Cada historia tiene su contexto, equipo y reto.</p><span className="work-heading-cue">↓ &nbsp; BAJA PARA EXPLORAR</span></div>
        <div className="project-gallery" aria-label="Proyectos seleccionados">{projects.map((project, i) => {
          const inner = <><div className="project-scene-ambient" aria-hidden="true"><span>{project.name}</span><pre>{project.scene}</pre></div><div className="project-scene-top"><span>{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><span>{project.field}</span></div><div className="project-scene-title"><span>PROYECTO {String(i + 1).padStart(2, '0')}</span><h3>{project.name}</h3><p>{project.story}</p><small>{project.role}</small></div><div className="project-scene-visual"><ProjectFrame project={project}/><span className="project-scene-open">{project.url ? 'ABRIR PROYECTO ↗' : 'EN DESARROLLO'}</span></div><div className="project-scene-foot"><span>{project.year}</span><span>{project.url ? 'ABRIR SITIO ↗' : 'PRÓXIMAMENTE'}</span></div></>
          return project.url ? <a href={project.url} target="_blank" rel="noreferrer" className={`project-scene scene-${project.visual} ${active === i ? 'is-active' : ''}`} key={project.name} onPointerMove={moveProject} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>{inner}</a> : <article className={`project-scene scene-${project.visual} ${active === i ? 'is-active' : ''}`} key={project.name}>{inner}</article>
        })}</div>
        <div className="work-outro"><span>06 / 06 — FIN DEL DIRECTORIO</span><strong>El trabajo continúa.</strong><span>↓ &nbsp; SIGUIENTE: CÓMO PIENSO</span></div>
      </section>
      <StatementSequence motionOff={motionOff}/>
      <StackCarousel motionOff={motionOff}/>
      <section className="interlude" aria-label="Manifiesto"><div className="interlude-stage">
        <div className="signal-waves" aria-hidden="true"><i className="signal-wave wave-one"/><i className="signal-wave wave-two"/><i className="signal-wave wave-three"/><i className="signal-wave wave-four"/><span className="signal-tick tick-one">01 / ∞</span><span className="signal-tick tick-two">+ + +</span><span className="signal-tick tick-three">101101</span></div>
        <div className="interlude-logo" aria-hidden="true"><span>sr</span><i>_</i><small>UNA FIRMA / MUCHAS FORMAS DE CONSTRUIR</small></div><span className="interlude-code">&lt; build what matters /&gt;</span><p>Curiosidad para empezar.<br/><span>Criterio para terminar.</span></p><pre className="interlude-penguin" aria-label="Pingüino de Linux en arte ASCII">{penguinArt}</pre><div className="interlude-lines" aria-hidden="true">{'/ '.repeat(36)}</div>
      </div></section>
      <section className="archive-section" id="archivo" aria-labelledby="archive-title">
        <div className="archive-header"><div><span>[ Archivo / laboratorio ]</span><h2 id="archive-title" tabIndex={-1}>El laboratorio<br/><i>sigue abierto.</i></h2></div><p>Algunas preguntas se convierten en productos. Otras abren caminos que sigo explorando, solo o con otras personas.</p></div>
        <div className="archive-journey"><BinaryPath/>
          <pre className="archive-doodle doodle-one" aria-hidden="true">{`     ┌───── [ idea ] ─────┐
     │   0 1 0 1 0 1     │
     └───────┬───────────┘
             ↓
          [ hecho ]`}</pre>
          <pre className="archive-doodle doodle-two" aria-hidden="true">{`        +
      /   \\
     / 01  \\
    +───────+
     \\ 10  /
      \\   /
        +`}</pre>
          {archive.map((item, i) => <article className={`archive-story story-${i}`} key={item.title}>
            <div className="archive-story-heading"><span>0{i + 1} / 04</span><span>{item.type}</span></div>
            <div className="archive-story-body"><div className="archive-story-copy"><span className="archive-story-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.detail}</p>{item.href ? <a href={item.href} target="_blank" rel="noreferrer">Explorar proyecto <ArrowUpRight size={16}/></a> : <span className="archive-story-status">{item.status}</span>}</div><div className="archive-story-art" aria-hidden="true"><span>{item.glyph}</span><pre>{archiveArt[i]}</pre></div></div>
            <div className="archive-story-binary" aria-hidden="true">{i % 2 ? '101001 010011 110010 001101' : '001110 101100 011001 110010'}</div>
          </article>)}
        </div>
        <div className="archive-end">[ 04 / 04 ] &nbsp; CONTINUAR DESCUBRIENDO ↓</div>
      </section>
      <section className="about-section" id="sobre-mi" aria-labelledby="about-title"><div className="about-seam" aria-hidden="true"/><div className="about-aside"><span>[ Detrás del código ]</span><div className="portrait"><img src="/media/sergio-avatar.png" alt="Retrato de Sergio Rubín, tomado de su perfil de GitHub"/><span>Sergio Rubín / Puebla, MX</span></div></div><div className="about-main"><h2 id="about-title" tabIndex={-1}>Me gusta estar<br/>entre <i>disciplinas.</i></h2><p>Estudio Ingeniería en Ciencias de la Computación en la BUAP y fundé <a href="https://wacoding.org/" target="_blank" rel="noreferrer">W.A Coding <ArrowUpRight size={15}/></a>. Trabajo entre frontend, producto, infraestructura y coordinación técnica.</p><p>En la FCC-BUAP participé como Frontend Architect en el Laboratorio ASR y colaboré en el sitio de Ingeniería en Ciberseguridad. Hackatón Puebla y BAM BUAP forman parte de mi camino.</p>{motionOff ? <p>Me interesa conectar interfaces, sistemas y personas.</p> : <ScrollTextReveal as="p" text="Me interesa conectar interfaces, sistemas y personas." splitBy="word" inactiveOpacity={0.22} revealRatio={0.9}/>}<div className="about-facts"><span><b>01</b> Desarrollo</span><span><b>02</b> Dirección técnica</span><span><b>03</b> Exploración</span></div></div></section>
      <section className="contact-section" id="contacto" aria-labelledby="contact-title"><div className="contact-background" aria-hidden="true">&lt;/&gt; &lt;/&gt; &lt;/&gt;</div><span>[ Siguiente conversación ]</span><h2 id="contact-title" tabIndex={-1}>¿Qué hacemos<br/><i>ahora?</i></h2><div className="contact-actions"><a className="contact-primary" href="https://wacoding.org/contacto" target="_blank" rel="noreferrer">Cuéntame tu idea <ArrowUpRight size={28}/></a><p>Si tienes un proyecto, una colaboración o una buena pregunta, podemos empezar por ahí.</p></div><div className="contact-socials">{socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={16}/></a>)}</div></section></main><footer className="site-footer" inert={menuOpen}><span>© {new Date().getFullYear()} Sergio Rubín</span><span>Hecho con intención y un poco de ASCII &lt;/&gt;</span><a href="#inicio" onClick={event => { event.preventDefault(); navigateTo('inicio') }}>Volver arriba ↑</a></footer></div></div>
  </div>
}
export default App
