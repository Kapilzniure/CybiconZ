import { useEffect, useRef } from 'react'

const sectionColors: Record<string, string> = {
  'hero-section':         'rgba(79,70,229,0.12)',
  'services-section':     'rgba(79,70,229,0.10)',
  'process-section':      'rgba(249,115,22,0.08)',
  'stats-section':        'rgba(249,115,22,0.10)',
  'portfolio-section':    'rgba(6,182,212,0.09)',
  'tech-section':         'rgba(79,70,229,0.08)',
  'testimonials-section': 'rgba(236,72,153,0.08)',
  'cybilearn-section':    'rgba(16,185,129,0.09)',
  'cta-section':          'rgba(79,70,229,0.12)',
}

export function CursorOrb() {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const orb = orbRef.current
    if (!orb) return

    const BASE_SIZE = 400
    let targetX = -300
    let targetY = -300
    let currentX = -300
    let currentY = -300
    let animId: number
    let currentColor = 'rgba(79,70,229,0.10)'
    let lastScroll = window.scrollY
    let scrollVelocity = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        const section = el.closest('[data-section]') as HTMLElement | null
        if (section) {
          const id = section.dataset.section ?? ''
          currentColor = sectionColors[id] ?? 'rgba(79,70,229,0.10)'
        }
      }
    }

    const handleScroll = () => {
      scrollVelocity = Math.abs(window.scrollY - lastScroll)
      lastScroll = window.scrollY
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      const scrollBoost = Math.min(scrollVelocity * 3, 200)
      const orbSize = BASE_SIZE + scrollBoost
      const halfDiff = orbSize / 2 - BASE_SIZE / 2

      orb.style.width = `${orbSize}px`
      orb.style.height = `${orbSize}px`
      orb.style.marginLeft = `${-halfDiff}px`
      orb.style.marginTop = `${-halfDiff}px`
      orb.style.transform = `translate(${currentX - BASE_SIZE / 2}px, ${currentY - BASE_SIZE / 2}px)`
      orb.style.background = `radial-gradient(circle, ${currentColor}, transparent 70%)`

      scrollVelocity *= 0.85

      animId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={orbRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
        willChange: 'transform',
        background: 'radial-gradient(circle, rgba(79,70,229,0.10), transparent 70%)',
      }}
    />
  )
}
