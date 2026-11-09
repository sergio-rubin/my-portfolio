import { ScrollSmoother } from 'gsap/ScrollSmoother'

export function HeroTerminal({ motionOff }: { motionOff: boolean }) {
  const openProjects = () => {
    const work = document.getElementById('trabajo')
    if (!work) return
    const focusHeading = () => work.querySelector<HTMLElement>('#work-title')?.focus({ preventScroll: true })
    if (motionOff) {
      work.scrollIntoView({ behavior: 'instant' })
      focusHeading()
      return
    }
    if (Math.abs(work.getBoundingClientRect().top) < 80) {
      focusHeading()
      return
    }
    window.addEventListener('scrollend', () => {
      if (Math.abs(work.getBoundingClientRect().top) < 80) focusHeading()
    }, { once: true })
    const smoother = ScrollSmoother.get()
    if (smoother) smoother.scrollTo(work, true, 'top top')
    else work.scrollIntoView({ behavior: 'smooth' })
  }
  return <div className="hero-terminal" aria-label="Terminal: cd Proyectos">
    <div className="terminal-top"><span className="terminal-lights" aria-hidden="true"><i/><i/><i/></span><span>sergio@portfolio:~</span><span>01 / 06</span></div>
    <div className="terminal-body">
      <span className="terminal-line-number" aria-hidden="true">01</span>
      <span className="terminal-prompt" aria-hidden="true">~/sergio <b>❯</b></span>
      <span className="terminal-command">cd Proyectos</span>
      <span className="terminal-caret" aria-hidden="true">_</span>
    </div>
    <div className="terminal-bottom"><span className="terminal-response">6 proyectos encontrados. Presiona Enter para abrir.</span><button type="button" className="terminal-enter" onClick={openProjects} aria-label="Entrar a proyectos">Enter ↵</button></div>
  </div>
}
