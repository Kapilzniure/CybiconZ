import { useMagneticButton } from '@/hooks/useMagneticButton'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import React from 'react'

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  external?: boolean
  strength?: number
}

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ml-1"
  >
    <motion.path
      d="M2 8H11M11 8L8 5M11 8L8 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      variants={{
        initial: { pathLength: 0, opacity: 0 },
        hover: { pathLength: 1, opacity: 1 }
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    />
  </svg>
)

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
  strength = 0.35,
}: MagneticButtonProps) {
  const { ref, x, y, rotateX, rotateY, innerX, innerY } = useMagneticButton(strength)

  const containerStyles: React.CSSProperties = {
    display: 'inline-block',
    perspective: '1000px',
  }

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    willChange: 'transform',
    textDecoration: 'none',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    overflow: 'hidden',
  }

  const variantConfigs = {
    primary: {
      className: `text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 btn-primary-magnetic ${className}`,
      style: {
        background: 'linear-gradient(135deg, #00C4FF 0%, #0066FF 100%)',
        boxShadow: '0 0 30px rgba(0,196,255,0.25)',
      },
      hoverTap: { boxShadow: '0 0 24px rgba(0,196,255,0.35)' },
    },
    secondary: {
      className: `text-white/70 font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-300 btn-secondary-magnetic ${className}`,
      style: {
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.12)',
      },
      hoverTap: {},
    },
    ghost: {
      className: `text-[#00C4FF] font-bold text-sm px-0 py-2 transition-all duration-300 btn-ghost-magnetic ${className}`,
      style: {
        background: 'transparent',
      },
      hoverTap: {},
    },
  }

  const config = variantConfigs[variant]

  const content = (
    <motion.span
      ref={ref as React.Ref<HTMLSpanElement>}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.96, ...(variant === 'primary' ? config.hoverTap : {}) }}
      transition={{ duration: 0.15 }}
      style={{
        ...baseStyles,
        ...config.style,
        x,
        y,
        rotateX,
        rotateY,
      }}
      className={config.className}
    >
      <motion.span
        className="magnetic-inner flex items-center gap-1 pointer-events-none"
        style={{ x: innerX, y: innerY }}
      >
        <span className="relative">
          {children}
          {variant === 'ghost' && (
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-[1px] bg-current origin-left"
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          )}
        </span>

        {variant === 'ghost' && <ArrowIcon />}
      </motion.span>

      <style dangerouslySetInnerHTML={{ __html: `
        .btn-primary-magnetic {
          overflow: hidden;
          position: relative;
          transition: background 0.3s ease, box-shadow 0.35s ease;
        }
        .btn-primary-magnetic::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
          background-size: 200% 100%;
          z-index: 0;
          pointer-events: none;
          transition: left 0.4s ease;
        }
        .btn-primary-magnetic:hover {
          background: linear-gradient(155deg, #00C4FF 0%, #0066FF 100%) !important;
          box-shadow: 0 0 50px rgba(0,196,255,0.45), 0 0 100px rgba(0,196,255,0.15) !important;
        }
        .btn-primary-magnetic:hover::before {
          left: 100%;
        }

        .btn-secondary-magnetic {
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
        }
        .btn-secondary-magnetic:hover {
          border-color: rgba(0,196,255,0.4) !important;
          background: rgba(0,196,255,0.04) !important;
          color: white !important;
          box-shadow: inset 0 0 20px rgba(0,196,255,0.06) !important;
        }

        .btn-ghost-magnetic {
          position: relative;
          display: inline-flex;
          align-items: center;
          transition: letter-spacing 0.3s ease, color 0.25s ease;
        }
        .btn-ghost-magnetic:hover {
          letter-spacing: 0.02em;
        }
        .btn-ghost-magnetic svg {
          position: relative;
          z-index: 1;
        }
      ` }} />
    </motion.span>
  )

  const wrapperProps = {
    style: containerStyles,
    'data-magnetic': 'true',
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...wrapperProps}>
        {content}
      </a>
    )
  }

  const MotionLink = motion(Link)

  return (
    <MotionLink to={href} {...wrapperProps}>
      {content}
    </MotionLink>
  )
}
