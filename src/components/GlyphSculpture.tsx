import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = { paused: boolean }

export function GlyphSculpture({ paused }: Props) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return

    const source = document.createElement('canvas')
    source.width = 580
    source.height = 320
    const ctx = source.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    ctx.fillStyle = '#fff'
    ctx.font = '900 280px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('SR', 290, 170)
    const pixels = ctx.getImageData(0, 0, 580, 320).data
    let seed = 73541
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }
    const positions: number[] = []
    const tones: number[] = []
    const phases: number[] = []
    for (let y = 28; y < 304; y += 4) {
      for (let x = 15; x < 568; x += 4) {
        const alpha = pixels[(y * 580 + x) * 4 + 3]
        if (alpha < 90 || random() > 0.8) continue
        const jitter = (random() - 0.5) * 0.018
        positions.push((x - 290) / 107 + jitter, (160 - y) / 107 + jitter, (random() - 0.5) * 1.15)
        const tone = 0.38 + random() * 0.62
        tones.push(tone, tone, tone)
        phases.push(random() * Math.PI * 2)
      }
    }

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' })
    } catch {
      element.classList.add('glyph-fallback')
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    element.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30)
    camera.position.z = 7.3
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(tones, 3))
    geometry.setAttribute('aPhase', new THREE.Float32BufferAttribute(phases, 1))
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uScroll: { value: 0 } },
      vertexShader: `attribute vec3 color; attribute float aPhase; varying vec3 vColor; uniform float uTime; uniform float uScroll; void main() { vColor = color; vec3 p = position; p.z += sin(p.x * 4.0 + aPhase + uTime * 0.4) * (0.06 + uScroll * 0.3); p.x += sin(aPhase + uTime * 0.22) * 0.015; vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = min(5.0, 3.8 * (7.3 / -mv.z)); }`,
      fragmentShader: `varying vec3 vColor; void main() { vec2 p = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.22, length(p)); gl_FragColor = vec4(vColor, a * 0.9); }`,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)
    const pointer = { x: 0, y: 0 }
    let scroll = 0
    let visible = true
    const onPointer = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    }
    const onScroll = () => { scroll = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1)) }
    const resize = () => {
      const { width, height } = element.getBoundingClientRect()
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      points.scale.setScalar(width < 620 ? 0.75 : width < 1000 ? 0.9 : 1.12)
      renderer.render(scene, camera)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    observer.observe(element)
    const ro = new ResizeObserver(resize)
    ro.observe(element)
    element.addEventListener('pointermove', onPointer)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    resize()
    const timer = new THREE.Timer()
    timer.connect(document)
    let elapsed = 0
    const render = () => {
      if (!visible || document.hidden) return
      timer.update()
      elapsed += timer.getDelta()
      material.uniforms.uTime.value = paused ? 0 : elapsed
      material.uniforms.uScroll.value = paused ? 0 : scroll
      points.rotation.y += ((paused ? 0 : pointer.x * 0.13 + scroll * 0.49) - points.rotation.y) * 0.035
      points.rotation.x += ((paused ? 0 : -pointer.y * 0.09 - scroll * 0.11) - points.rotation.x) * 0.035
      points.position.y += ((paused ? 0 : scroll * 0.35) - points.position.y) * 0.035
      renderer.render(scene, camera)
    }
    if (!paused) renderer.setAnimationLoop(render)
    else renderer.render(scene, camera)
    return () => {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      ro.disconnect()
      element.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [paused])

  return <div className="glyph-sculpture" ref={host}><span aria-hidden="true" className="glyph-static">SR</span></div>
}
