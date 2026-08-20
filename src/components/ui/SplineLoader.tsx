import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Component, type ReactNode } from 'react'
import { useLoadingManager } from '@/contexts/LoadingContext'

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
  critical?: boolean
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
  critical = false,
}: SplineLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(critical)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  let loadingManager: any = null;
  try {
    loadingManager = useLoadingManager();
  } catch (e) {
    // Ignore if not in context
  }

  useEffect(() => {
    if (critical && loadingManager) {
      loadingManager.registerAsset();
    }
  }, [critical, loadingManager]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !critical && !shouldLoad) {
          setShouldLoad(true);
        }
      },
      { rootMargin }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [rootMargin, critical, shouldLoad])

  function handleLoad() {
    setIsLoaded(true)
    if (critical && loadingManager) {
      loadingManager.markAssetLoaded();
    }
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
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            display: isVisible ? 'block' : 'none' 
          }}
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

function RobotSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
          width: 60, height: 60, borderRadius: '50%',
          border: '2px solid rgba(0,196,255,0.2)',
          borderTopColor: '#00C4FF',
          animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// Pure CSS hero placeholder (won't lag)
export function HeroPlaceholder() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050507', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '2px solid rgba(0,196,255,0.2)',
          borderTopColor: '#39FF14',
          animation: 'spin 1s linear infinite'
      }} />
    </div>
  )
}
