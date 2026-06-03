import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Component, type ReactNode } from 'react'

const SplineComponent = lazy(() =>
  import('@splinetool/react-spline').then((m) => ({ default: m.default }))
)

class SplineErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

interface SplineLoaderProps {
  scene: string
  width?: string | number
  height?: string | number
  className?: string
  placeholderColor?: string
  rootMargin?: string
  onLoad?: () => void
  placeholder?: ReactNode
}

export function SplineLoader({
  scene,
  width = '100%',
  height = '100%',
  className = '',
  placeholderColor = '#0A0A12',
  rootMargin = '300px',
  onLoad,
  placeholder,
}: SplineLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [rootMargin])

  function handleLoad() {
    setIsLoaded(true)
    onLoad?.()
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, position: 'relative', overflow: 'hidden' }}
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="skeleton"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: placeholder ? 'transparent' : placeholderColor,
              pointerEvents: 'none',
            }}
          >
            {placeholder ?? <RobotSkeleton />}
          </motion.div>
        )}
      </AnimatePresence>

      {shouldLoad && (
        <motion.div
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <SplineErrorBoundary>
            <Suspense fallback={null}>
              <SplineComponent
                scene={scene}
                style={{ width: '100%', height: '100%' }}
                onLoad={handleLoad}
              />
            </Suspense>
          </SplineErrorBoundary>
        </motion.div>
      )}
    </div>
  )
}

// Used by non-hero Spline scenes
function RobotSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,196,255,0.15), rgba(57,255,20,0.05), transparent)',
          border: '1px solid rgba(0,196,255,0.2)',
        }}
      />
      <div style={{ width: 80, height: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', borderRadius: 1 }}>
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            height: '100%',
            width: '60%',
            background: 'linear-gradient(to right, transparent, #00C4FF, transparent)',
          }}
        />
      </div>
      <motion.span
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 9,
          letterSpacing: '0.2em',
          color: 'rgba(0,196,255,0.5)',
          textTransform: 'uppercase',
        }}
      >
        Loading
      </motion.span>
    </div>
  )
}

// Hero-specific placeholder — mirrors the site preloader animation
export function HeroPlaceholder() {
  const letters = 'CybiconZ'.split('')

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050507',
      }}
    >
      {/* Letter-by-letter reveal, loops until robot is ready */}
      <div style={{ display: 'flex' }}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: [0, 1, 1, 0], y: [15, 0, 0, -15] }}
            transition={{
              duration: 1.8,
              times: [0, 0.25, 0.7, 1],
              delay: i * 0.045,
              repeat: Infinity,
              repeatDelay: 0.6,
              ease: 'easeOut',
            }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(40px, 7vw, 80px)',
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              display: 'inline-block',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Sliding gradient bar — same style as the real preloader */}
      <div
        style={{
          marginTop: 28,
          width: 200,
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.2,
          }}
          style={{
            height: '100%',
            width: '50%',
            background: 'linear-gradient(90deg, transparent, #00C4FF, #39FF14, transparent)',
          }}
        />
      </div>
    </div>
  )
}
