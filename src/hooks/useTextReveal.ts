import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useTextReveal(selector: string, options?: {
  delay?: number
  stagger?: number
  start?: string
}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      elements.forEach(el => {
        // Split text into word spans
        const text = el.textContent || ''
        const words = text.split(' ').filter(w => w.length > 0)

        el.innerHTML = words
          .map(word => `<span class="reveal-word" style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em"><span class="reveal-inner" style="display:inline-block;transform:translateY(110%)">${word}</span></span>`)
          .join('')

        gsap.to(el.querySelectorAll('.reveal-inner'), {
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: options?.stagger ?? 0.06,
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? 'top 85%',
            once: true,
          }
        })
      })
    })

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector])
}
