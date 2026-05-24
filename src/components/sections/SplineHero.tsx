import { lazy, Suspense, Component, useState, useEffect } from "react";
import type { ReactNode } from "react";

const SplineScene = lazy(() =>
  import("@splinetool/react-spline").then((m) => ({ default: m.default }))
);

class SplineErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

interface SplineHeroProps {
  onLoad?: () => void;
}

export default function SplineHero({ onLoad }: SplineHeroProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const schedule = typeof window.requestIdleCallback === "function"
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 2500 })
      : (cb: () => void) => setTimeout(cb, 500);
    schedule(() => setShow(true));
  }, []);

  if (!show) return null;

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <SplineErrorBoundary>
        <Suspense fallback={null}>
          <SplineScene
            scene="https://prod.spline.design/Muui7g5HLutyfcP4/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            onLoad={onLoad}
            // @ts-ignore - crossOrigin is passed to the internal canvas element
            crossOrigin="anonymous"
          />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
