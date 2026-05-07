import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
    );
  }, [location.pathname]);

  return <main ref={ref}>{children}</main>;
}
