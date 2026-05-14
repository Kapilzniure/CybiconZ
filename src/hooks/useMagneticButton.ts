import { useMotionValue, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function useMagneticButton(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const innerX = useMotionValue(0)
  const innerY = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el || 'ontouchstart' in window) return

    const activeSpring = { type: 'spring' as const, stiffness: 200, damping: 18, mass: 1.2 }
    const releaseSpring = { type: 'spring' as const, stiffness: 120, damping: 16, mass: 1.2 }
    const maxTranslate = 12
    let pointerInside = false

    const updateTargets = (event: PointerEvent) => {
      if (!pointerInside) return
      const rect = el.getBoundingClientRect()
      const offsetX = event.clientX - (rect.left + rect.width / 2)
      const offsetY = event.clientY - (rect.top + rect.height / 2)

      const targetX = clamp(offsetX * strength, -maxTranslate, maxTranslate)
      const targetY = clamp(offsetY * strength, -maxTranslate, maxTranslate)
      const innerTargetX = targetX * 0.6
      const innerTargetY = targetY * 0.6
      const targetRotateY = clamp(targetX * 0.1, -3, 3)
      const targetRotateX = clamp(-targetY * 0.1, -3, 3)

      animate(x, targetX, activeSpring)
      animate(y, targetY, activeSpring)
      animate(innerX, innerTargetX, activeSpring)
      animate(innerY, innerTargetY, activeSpring)
      animate(rotateX, targetRotateX, activeSpring)
      animate(rotateY, targetRotateY, activeSpring)
    }

    const resetSprings = () => {
      animate(x, 0, releaseSpring)
      animate(y, 0, releaseSpring)
      animate(innerX, 0, releaseSpring)
      animate(innerY, 0, releaseSpring)
      animate(rotateX, 0, releaseSpring)
      animate(rotateY, 0, releaseSpring)
    }

    const handlePointerEnter = () => {
      pointerInside = true
    }

    const handlePointerMove = (event: PointerEvent) => {
      updateTargets(event)
    }

    const handlePointerLeave = () => {
      pointerInside = false
      resetSprings()
    }

    el.addEventListener('pointerenter', handlePointerEnter)
    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      el.removeEventListener('pointerenter', handlePointerEnter)
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [strength, x, y, innerX, innerY, rotateX, rotateY])

  return { ref, x, y, rotateX, rotateY, innerX, innerY }
}
