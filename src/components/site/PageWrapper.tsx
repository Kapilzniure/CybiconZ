import { ReactNode, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal } from "@/hooks/useTextReveal";
import { triggerTransition, triggerTransitionIn } from "@/components/ui/TransitionOverlay";
import { lenisInstance } from "@/hooks/useLenis";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const location = useLocation();
  const isFirstLoad = useRef<boolean>(true);
  const isNavigating = useRef(false);
  const prevPathname = useRef(location.pathname);

  useTextReveal('.section-headline-reveal', { stagger: 0.05, delay: 0.3 });
  useTextReveal('.service-desc-reveal', { stagger: 0.03, start: 'top 90%', delay: 0.3 });

  useLayoutEffect(() => {
    // No-op if pathname hasn't actually changed (StrictMode double-invoke guard)
    if (prevPathname.current === location.pathname) return;
    prevPathname.current = location.pathname;

    // Skip wipe on first render — preloader handles first-visit reveal
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Prevent stacked transitions if a wipe is already in flight
    if (isNavigating.current) return;
    isNavigating.current = true;

    triggerTransition(() => {
      // Screen fully covered — safe to jump scroll position
      window.scrollTo(0, 0);
      lenisInstance?.scrollTo(0, { immediate: true });

      // Refresh ScrollTrigger after scroll jump so all triggers recalculate
      ScrollTrigger.refresh();

      triggerTransitionIn(ref.current, () => {
        isNavigating.current = false;
      });
    });
  }, [location.pathname]);

  return (
    <main ref={ref} className="flex-grow flex flex-col">
      {children}
    </main>
  );
}
