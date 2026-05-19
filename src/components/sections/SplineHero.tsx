import { lazy, Suspense, Component } from "react";
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

export default function SplineHero() {
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <SplineErrorBoundary>
      <Suspense fallback={null}>
        <SplineScene
          scene="https://prod.spline.design/Muui7g5HLutyfcP4/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
          // @ts-ignore - crossOrigin is passed to the internal canvas element
          crossOrigin="anonymous"
        />
      </Suspense>
    </SplineErrorBoundary>
  );
}
