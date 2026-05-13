import { useMotionValue, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

export function useMagneticButton(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)
  
  // Motion values for the button body
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  
  // Parallax motion values for the inner content (60% of button movement)
  const innerX = useMotionValue(0)
  const innerY = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el || 'ontouchstart' in window) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      
      const distance = Math.sqrt(distX * distX + distY * distY)
      // Use the diagonal/larger dimension as a threshold for a smoother entry
      const threshold = Math.max(rect.width, rect.height) * 1.5

      if (distance < threshold) {
        const pull = (1 - distance / threshold) * strength
        const targetX = distX * pull
        const targetY = distY * pull
        
        // Active spring: Snappy and responsive attraction
        const springConfig = { type: 'spring' as const, stiffness: 200, damping: 18, mass: 1.2 }
        
        animate(x, targetX, springConfig)
        animate(y, targetY, springConfig)
        
        // Parallax inner movement (60%)
        animate(innerX, targetX * 0.6, springConfig)
        animate(innerY, targetY * 0.6, springConfig)
        
        // 3D Tilt based on mouse offset (rotateY for X offset, rotateX for Y offset)
        // Max tilt approx ±3deg
        animate(rotateY, targetX * 0.1, springConfig)
        animate(rotateX, -targetY * 0.1, springConfig)
      } else {
        resetSprings()
      }
    }

    const resetSprings = () => {
      // Release spring: Slower, satisfying return to origin
      const releaseConfig = { type: 'spring' as const, stiffness: 120, damping: 16 }
      
      animate(x, 0, releaseConfig)
      animate(y, 0, releaseConfig)
      animate(innerX, 0, releaseConfig)
      animate(innerY, 0, releaseConfig)
      animate(rotateX, 0, releaseConfig)
      animate(rotateY, 0, releaseConfig)
    }

    const handleMouseLeave = () => {
      resetSprings()
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, x, y, innerX, innerY, rotateX, rotateY])

  return { ref, x, y, rotateX, rotateY, innerX, innerY }
}
