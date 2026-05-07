import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  radius: number
  seed: number
  colorIndex: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = [
      'rgba(79,70,229,',
      'rgba(129,140,248,',
      'rgba(6,182,212,',
      'rgba(236,72,153,',
    ]

    let particles: Particle[] = []
    let animId: number
    let scrollY = 0

    const handleScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', handleScroll, { passive: true })

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    function initParticles() {
      if (!canvas) return
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.5,
        radius: 1 + Math.random() * 1.5,
        seed: Math.random() * Math.PI * 2,
        colorIndex: Math.floor(Math.random() * colors.length),
      }))
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const scrollMult = 1 + scrollY * 0.004

      particles.forEach(p => {
        p.y -= p.speed * scrollMult
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }

        const opacity = 0.2 + Math.abs(Math.sin(Date.now() * 0.001 + p.seed)) * 0.6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = colors[p.colorIndex] + opacity + ')'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}