export function HeroTerminal({ motionOff }: { motionOff: boolean }) {
  return <div className="hero-terminal" aria-label="Terminal: cd Proyectos">
    <div className="terminal-top"><span className="terminal-lights" aria-hidden="true"><i/><i/><i/></span><span>sergio@portfolio:~</span><span>01 / 06</span></div>
    <div className="terminal-body">
      <span className="terminal-line-number" aria-hidden="true">01</span>
      <span className="terminal-prompt" aria-hidden="true">~/sergio <b>❯</b></span>
      <span className="terminal-command">cd Proyectos</span>
      <span className="terminal-caret" aria-hidden="true">_</span>
    </div>
    <div className="terminal-bottom"><span className="terminal-response">6 proyectos encontrados. Abriendo directorio…</span><button type="button" className="terminal-enter" onClick={() => document.getElementById('trabajo')?.scrollIntoView({ behavior: motionOff ? 'auto' : 'smooth' })} aria-label="Entrar a proyectos">Enter ↵</button></div>
  </div>
}
