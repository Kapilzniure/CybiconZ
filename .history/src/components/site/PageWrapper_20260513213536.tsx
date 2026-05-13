import { ReactNode, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTextReveal } from "@/hooks/useTextReveal";
import { triggerTransition, triggerTransitionIn } from "@/components/ui/TransitionOverlay";

let isFirstLoad = true;

export default function PageWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const location = useLocation();

  // Text reveals with delay — they fire after transition completes
  useTextReveal('.section-headline-reveal', { stagger: 0.05, delay: 0.3 });
  useTextReveal('.service-desc-reveal', { stagger: 0.03, start: 'top 90%', delay: 0.3 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // First load: just fade in, no transition
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }

    // Subsequent navigations: use the cinematic transition system
    triggerTransition(() => {
      // Route change happens here (wipe panel covers screen)
      // Content will update and then transition in
    });

    // Start transition in after a brief delay
    const inTimer = setTimeout(() => {
      triggerTransitionIn();
    }, 420);

    return () => clearTimeout(inTimer);
  }, [location.pathname]);

  return <main ref={ref}>{children}</main>;
}

