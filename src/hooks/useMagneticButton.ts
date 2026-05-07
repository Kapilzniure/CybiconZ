import { useRef, useEffect } from 'react'

export function useMagneticButton(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if ('ontouchstart' in window) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)
      const threshold = 120

      if (distance < threshold) {
        const pull = (1 - distance / threshold) * strength
        el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`
        const inner = el.querySelector('.magnetic-inner') as HTMLElement
        if (inner) {
          inner.style.transform = `translate(${distX * pull * 0.4}px, ${distY * pull * 0.4}px)`
        }
      } else {
        el.style.transform = 'translate(0px, 0px)'
        const inner = el.querySelector('.magnetic-inner') as HTMLElement
        if (inner) inner.style.transform = 'translate(0px, 0px)'
      }
    }

    const handleMouseLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      el.style.transform = 'translate(0px, 0px)'
      const inner = el.querySelector('.magnetic-inner') as HTMLElement
      if (inner) {
        inner.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        inner.style.transform = 'translate(0px, 0px)'
      }
      setTimeout(() => {
        el.style.transition = ''
        if (inner) inner.style.transition = ''
      }, 500)
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}