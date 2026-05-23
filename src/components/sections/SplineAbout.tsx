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
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function SplineAbout() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <SplineErrorBoundary>
        <Suspense fallback={null}>
          <SplineScene
            scene="https://prod.spline.design/8BNM2v6Tv0F86S2F/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
