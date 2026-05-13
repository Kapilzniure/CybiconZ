import { useMagneticButton } from '@/hooks/useMagneticButton'
import { Link } from 'react-router-dom'

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  external?: boolean
  strength?: number
}

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useMagneticButton(strength)

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    willChange: 'transform',
  }

  const variantStyles = {
    primary: 'text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 btn-animated-border',
    secondary: 'border border-white/12 text-white/70 font-semibold text-sm px-8 py-4 rounded-xl bg-white/[0.02] hover:bg-white/5 hover:border-white/25 transition-colors duration-200',
    ghost: 'text-[#00C4FF] font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all duration-200',
  }

  const variantInlineStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #00C4FF 0%, #0066FF 100%)',
      boxShadow: '0 0 40px rgba(0,196,255,0.3)',
    },
    secondary: {},
    ghost: {},
  }

  const inner = (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      style={{ ...baseStyles, ...variantInlineStyles[variant] }}
      className={`${variantStyles[variant]} ${className}`}
    >
      <span className="magnetic-inner" style={{ display: 'flex', alignItems: 'center', gap: 'inherit', pointerEvents: 'none' }}>
        {children}
      </span>
    </span>
  )

  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>{inner}</a>
  }

  return <Link to={href} style={{ display: 'inline-block' }}>{inner}</Link>
}
