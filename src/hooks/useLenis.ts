import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'

export let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    })

    lenisInstance = lenis

    // Drive Lenis from the GSAP ticker instead of a separate RAF loop.
    // gsap.ticker time is in seconds; lenis.raf expects milliseconds.
    gsap.ticker.lagSmoothing(0)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
