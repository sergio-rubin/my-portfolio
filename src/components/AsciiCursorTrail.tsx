import { useEffect, useRef } from 'react'

type Mark = { x: number; y: number; born: number; glyph: string; size: number }
const glyphs = ['0', '1', '+', '/', '·', '<', '>', ':']

export function AsciiCursorTrail({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canvas || paused || !finePointer) return
    const context = canvas.getContext('2d')
    if (!context) return

    let frame = 0
    let count = 0
    let lastX = -100
    let lastY = -100
    let pointerX = -100
    let pointerY = -100
    let pointerVisible = false
    const marks: Mark[] = []
    const requestDraw = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(draw)
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * ratio)
      canvas.height = Math.round(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      if (pointerVisible || marks.length) requestDraw()
    }

    const move = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      pointerVisible = true
      requestDraw()
      if (Math.hypot(pointerX - lastX, pointerY - lastY) < 14) return
      lastX = pointerX
      lastY = pointerY
      const now = performance.now()
      // A small deterministic cluster reads as a pattern without filling the screen.
      for (let i = 0; i < 3; i += 1) {
        const angle = count * 2.4 + i * 2.1
        const radius = i === 0 ? 0 : 10 + i * 4
        marks.push({
          x: pointerX + Math.cos(angle) * radius,
          y: pointerY + Math.sin(angle) * radius,
          born: now,
          glyph: glyphs[(count + i) % glyphs.length],
          size: i === 0 ? 14 : 10,
        })
      }
      count += 1
      if (marks.length > 72) marks.splice(0, marks.length - 72)
    }

    const draw = (now: number) => {
      frame = 0
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = '#f5f5f2'
      for (let i = marks.length - 1; i >= 0; i -= 1) {
        const age = (now - marks[i].born) / 740
        if (age >= 1) { marks.splice(i, 1); continue }
        const mark = marks[i]
        context.globalAlpha = (1 - age) ** 1.5 * (mark.size === 14 ? 0.88 : 0.65)
        context.font = `${mark.size}px "Azeret Mono", monospace`
        context.fillText(mark.glyph, mark.x, mark.y)
      }
      if (pointerVisible) {
        context.globalAlpha = 0.8
        context.font = '14px "Azeret Mono", monospace'
        context.fillText('✳', pointerX, pointerY - 22)
      }
      context.globalAlpha = 1
      if (marks.length) requestDraw()
    }

    const leave = () => { pointerVisible = false; requestDraw() }
    const visibility = () => {
      if (!document.hidden) return
      marks.length = 0
      pointerVisible = false
      cancelAnimationFrame(frame)
      frame = 0
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', leave)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', leave)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [paused])

  return <canvas className="ascii-cursor-trail" ref={canvasRef} aria-hidden="true" />
}
