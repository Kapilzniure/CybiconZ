import { lazy, Suspense, Component, useState, useEffect, useRef } from "react";
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

export default function SplineServices() {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <SplineErrorBoundary>
        <Suspense fallback={null}>
          {show && (
            <SplineScene
              scene="https://prod.spline.design/Lhok2-1bzJCNFvXo/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
