import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current
      if (!el) return
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrolled / total, 1)
      el.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.05)',
      }}
    >
      <div
        ref={ref}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #4338CA, #818CF8, #EC4899)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          transition: 'transform 0.1s linear',
        }}
      />
    </div>
  )
}
