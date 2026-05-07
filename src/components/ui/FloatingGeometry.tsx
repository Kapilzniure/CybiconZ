import type { CSSProperties } from 'react'

interface FloatingGeometryProps {
  variant: 'ring' | 'cube' | 'pyramid' | 'torus'
  color: string
  size?: number
  opacity?: number
  position?: { top?: string; right?: string; bottom?: string; left?: string }
  speed?: number
}

export function FloatingGeometry({
  variant,
  color,
  size = 120,
  opacity = 0.15,
  position = { top: '10%', right: '5%' },
  speed = 8,
}: FloatingGeometryProps) {

  const renderShape = (): React.ReactNode => {
    switch (variant) {
      case 'ring':
        return (
          <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            opacity,
            animation: `float3d calc(var(--float-speed, ${speed}) * 1s) ease-in-out infinite, spin3d calc(var(--float-speed, ${speed}) * 3s) linear infinite`,
            transform: 'perspective(400px) rotateX(60deg)',
            boxShadow: `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
          }} />
        )

      case 'cube':
        return (
          <div style={{
            width: size * 0.6,
            height: size * 0.6,
            border: `1.5px solid ${color}`,
            opacity,
            animation: `float3d calc(var(--float-speed, ${speed}) * 1s) ease-in-out infinite, rotateCube calc(var(--float-speed, ${speed}) * 2s) linear infinite`,
            transform: 'perspective(400px) rotateX(45deg) rotateY(45deg)',
            boxShadow: `0 0 20px ${color}30`,
          }} />
        )

      case 'pyramid':
        return (
          <div style={{
            width: 0,
            height: 0,
            borderLeft: `${size * 0.4}px solid transparent`,
            borderRight: `${size * 0.4}px solid transparent`,
            borderBottom: `${size * 0.7}px solid ${color}`,
            opacity: opacity * 0.8,
            animation: `float3d calc(var(--float-speed, ${speed}) * 1s) ease-in-out infinite`,
            filter: `drop-shadow(0 0 15px ${color}60)`,
          }} />
        )

      case 'torus':
        return (
          <div style={{
            position: 'relative',
            width: size,
            height: size,
            animation: `float3d calc(var(--float-speed, ${speed}) * 1s) ease-in-out infinite`,
          } as CSSProperties}>
            {[0, 30, 60, 90, 120, 150].map(angle => (
              <div key={angle} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: size,
                height: size * 0.3,
                borderRadius: '50%',
                border: `1px solid ${color}`,
                opacity: opacity * 0.6,
                transform: `translate(-50%, -50%) rotateY(${angle}deg)`,
                boxShadow: `0 0 10px ${color}30`,
              }} />
            ))}
          </div>
        )
    }
  }

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 0,
        ...position,
      }}
    >
      {renderShape()}
    </div>
  )
}
