import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useTextReveal } from "@/hooks/useTextReveal";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const location = useLocation();

  useTextReveal('.section-headline-reveal', { stagger: 0.05 });
  useTextReveal('.service-desc-reveal', { stagger: 0.03, start: 'top 90%' });

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
