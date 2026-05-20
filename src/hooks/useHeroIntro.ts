import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";

interface UseHeroIntroOptions {
  canvasWrapperRef: RefObject<HTMLElement>;
  prefersReduced: boolean;
}

export function useHeroIntro({
  canvasWrapperRef,
  prefersReduced,
}: UseHeroIntroOptions): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(canvasWrapperRef.current, { opacity: 1 });
        return;
      }

      gsap.set(canvasWrapperRef.current, { opacity: 0 });
      gsap.to(canvasWrapperRef.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, [prefersReduced, canvasWrapperRef]);
}
