import { ReactNode, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTextReveal } from "@/hooks/useTextReveal";
import { triggerTransition, triggerTransitionIn } from "@/components/ui/TransitionOverlay";
import { lenisInstance } from "@/hooks/useLenis";

let isFirstLoad = true;

export default function PageWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const location = useLocation();

  // Text reveals fire AFTER transition completes (300ms delay)
  useTextReveal('.section-headline-reveal', { stagger: 0.05, delay: 0.3 });
  useTextReveal('.service-desc-reveal', { stagger: 0.03, start: 'top 90%', delay: 0.3 });

  useLayoutEffect(() => {
    // Skip transition on the very first load/mount
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }

    // Subsequent navigations: Trigger cinematic wipe out
    triggerTransition(() => {
      // Screen is now fully covered by the wipe panel
      // Scroll to top immediately (invisible jump)
      window.scrollTo(0, 0);
      lenisInstance?.scrollTo(0, { immediate: true });
      
      // Trigger cinematic wipe in and content reveal
      triggerTransitionIn(ref.current);
    });

  }, [location.pathname]);

  return (
    <main 
      ref={ref} 
      className="flex-grow flex flex-col"
    >
      {children}
    </main>
  );
}
