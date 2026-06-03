import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('CybiconZ ErrorBoundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020408',
          flexDirection: 'column',
          gap: 24,
          padding: 40,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.2em',
            color: '#00C4FF',
            textTransform: 'uppercase',
          }}>
            Something went wrong
          </div>
          <h1 style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            margin: 0,
          }}>
            Unexpected error.
          </h1>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 15,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 400,
            margin: 0,
          }}>
            Something broke on our end. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #00C4FF, #0066FF)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 32px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Refresh page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
