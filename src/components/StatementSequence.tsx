const sentence = 'Diseño, desarrollo y coordino tecnología para que las buenas ideas puedan vivir fuera de la pantalla.'

export function StatementSequence({ motionOff }: { motionOff: boolean }) {
  return <section className="statement" aria-labelledby="statement-title">
    <div className="statement-stage">
      <span className="section-side-label">[ Una forma de hacer / 02 ]</span>
      <div className="statement-content">
        <span className="statement-kicker">DE LA INTUICIÓN A LA INFRAESTRUCTURA</span>
        <h2 id="statement-title">Del primer <em>píxel</em><br/>al sistema completo<span className="accent-period">.</span></h2>
        <p className="statement-reading" aria-label={sentence}>
          {sentence.split(' ').map((word, index) => <span className="statement-word" key={`${word}-${index}`} aria-hidden="true">{word}{' '}</span>)}
        </p>
      </div>
      <div className="statement-measure" aria-hidden="true"><span>01 — ENTENDER</span><span>02 — CONSTRUIR</span><span>03 — LLEVAR AL MUNDO</span></div>
      <div className="statement-next" aria-hidden="true"><span>¿Con qué construyo?</span><strong>↓</strong><small>herramientas / sistemas / curiosidad</small></div>
      <div className="statement-continue" aria-hidden="true">{motionOff ? 'CONTINÚA ↓' : 'SIGUE LA LECTURA ↓'}</div>
    </div>
  </section>
}
