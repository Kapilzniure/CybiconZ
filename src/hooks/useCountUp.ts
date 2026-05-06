import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  decimals?: number
  suffix?: string
  startOnView?: boolean
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  startOnView = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!startOnView) {
      start()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          start()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted])

  function start() {
    const startTime = performance.now()
    const startValue = 0

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (end - startValue) * eased
      setCount(parseFloat(current.toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(update)
      else setCount(end)
    }

    requestAnimationFrame(update)
  }

  return { count, ref, suffix }
}
