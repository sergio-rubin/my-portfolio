import type { CSSProperties } from 'react'

const streams = ['0\n1\n+\n0', '1\n0\n/\n1', '+\n0\n1\n+', '1\n>\n0\n1']
const drops = Array.from({ length: 28 }, (_, index) => ({
  x: (index * 37 + 11) % 100,
  delay: -((index * 19) % 67) / 10,
  duration: 4.2 + (index % 5) * 0.67,
  stream: streams[index % streams.length],
}))
const impacts = Array.from({ length: 9 }, (_, index) => ({
  x: (index * 31 + 17) % 100,
  y: 28 + (index % 4) * 18,
  delay: -((index * 11) % 43) / 10,
}))

export function AsciiRain() {
  return <div className="ascii-rain" aria-hidden="true">
    {drops.map((drop, index) => <pre className="ascii-rain-drop" key={index} style={{ '--x': `${drop.x}%`, '--delay': `${drop.delay}s`, '--duration': `${drop.duration}s` } as CSSProperties}>{drop.stream}</pre>)}
    {impacts.map((impact, index) => <div className="ascii-rain-impact" key={index} style={{ '--x': `${impact.x}%`, '--y': `${impact.y}%`, '--delay': `${impact.delay}s` } as CSSProperties}><span>0 · 1 · 0 · 1</span><span>+ 0 + 1 + 0 +</span></div>)}
  </div>
}
