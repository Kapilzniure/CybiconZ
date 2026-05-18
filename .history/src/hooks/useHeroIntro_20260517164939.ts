import { useEffect, } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";

interface UseHeroIntroOptions {
  canvasWrapperRef: RefObject<HTMLElement>;
  eyebrowRef: RefObject<HTMLElement>;
  line1Ref: RefObject<HTMLElement>;
  line2Ref: RefObject<HTMLElement>;
  line3Ref: RefObject<HTMLElement>;
  subtitleRef: RefObject<HTMLElement>;
  ctaRowRef: RefObject<HTMLElement>;
  statsRef: RefObject<HTMLElement>;
  scrollIndicatorRef: RefObject<HTMLElement>;
  prefersReduced: boolean;
  onLine2Complete?: () => void;
}

export function useHeroIntro({
  canvasWrapperRef,
  eyebrowRef,
  line1Ref,
  line2Ref,
  line3Ref,
  subtitleRef,
  ctaRowRef,
  statsRef,
  scrollIndicatorRef,
  prefersReduced,
  onLine2Complete,
}: UseHeroIntroOptions): void {
  // Stable ref so the GSAP closure always calls the latest callback version
  const onLine2CompleteRef = useRef(onLine2Complete);
  onLine2CompleteRef.current = onLine2Complete;
  useEffect(() => {
    let breathingTween: gsap.core.Tween | null = null;
    let breathingTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollCleanup: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // ── Reduced motion: skip animations, snap to final state ──
      if (prefersReduced) {
        gsap.set(canvasWrapperRef.current, { opacity: 0.4 });
        gsap.set(eyebrowRef.current, { clipPath: "inset(0 0% 0 0)" });
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { yPercent: 0 });
        gsap.set([subtitleRef.current, ctaRowRef.current], { opacity: 1, y: 0 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0.4 });
        if (statsRef.current) {
          gsap.set(statsRef.current.querySelectorAll("[data-stat-item]"), { opacity: 1, y: 0 });
        }
        return;
      }

      // ── Initial invisible states ──
      gsap.set(canvasWrapperRef.current, { opacity: 0 });
      gsap.set(eyebrowRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(line1Ref.current, { yPercent: 110 });
      gsap.set(line2Ref.current, {
        yPercent: 110,
        textShadow: "0 0 80px rgba(0,196,255,0.5), 0 0 160px rgba(0,196,255,0.15)",
      });
      gsap.set(line3Ref.current, { yPercent: 110 });
      gsap.set([subtitleRef.current, ctaRowRef.current], { opacity: 0, y: 16 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      if (statsRef.current) {
        gsap.set(statsRef.current.querySelectorAll("[data-stat-item]"), { opacity: 0, y: 8 });
      }

      // ── Master timeline ──
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // t=0ms   — Three.js canvas fades in
      tl.to(canvasWrapperRef.current, { opacity: 0.4, duration: 0.8, ease: "power1.inOut" }, 0);

      // t=200ms — eyebrow pill reveals left→right
      tl.to(eyebrowRef.current, { clipPath: "inset(0 0% 0 0)", duration: 0.5 }, 0.2);

      // t=400ms — headline line 1
      tl.to(line1Ref.current, { yPercent: 0, duration: 0.9, ease: "expo.out" }, 0.4);

      // t=540ms — headline line 2; onComplete triggers ScrambleText
      tl.to(
        line2Ref.current,
        {
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
          onComplete: () => onLine2CompleteRef.current?.(),
        },
        0.54,
      );

      // t=680ms — headline line 3
      tl.to(line3Ref.current, { yPercent: 0, duration: 0.9, ease: "expo.out" }, 0.68);

      // t=900ms — subheadline
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.9);

      // t=1100ms — CTA row
      tl.to(ctaRowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.1);

      // t=1300ms — stats strip stagger
      if (statsRef.current) {
        tl.to(
          statsRef.current.querySelectorAll("[data-stat-item]"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          1.3,
        );
      }

      // t=1500ms — scroll indicator
      tl.to(scrollIndicatorRef.current, { opacity: 0.4, duration: 0.5 }, 1.5);
    });

    // t=1440ms — breathing glow on "digital" (after line 2 reveal finishes)
    // Created outside ctx so it isn't reverted on cleanup; killed manually.
    if (!prefersReduced) {
      breathingTimer = setTimeout(() => {
        breathingTween = gsap.to(line2Ref.current, {
          textShadow:
            "0 0 100px rgba(0,196,255,0.8), 0 0 200px rgba(0,196,255,0.3)",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }, 1440);

      // t=1600ms — scroll listener to dismiss scroll indicator
      scrollTimer = setTimeout(() => {
        const onScroll = () => {
          if (window.scrollY > 80) {
            gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 });
            window.removeEventListener("scroll", onScroll);
            scrollCleanup = null;
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        scrollCleanup = () => window.removeEventListener("scroll", onScroll);
      }, 1600);
    }

    return () => {
      ctx.revert();
      breathingTween?.kill();
      if (breathingTimer !== null) clearTimeout(breathingTimer);
      if (scrollTimer !== null) clearTimeout(scrollTimer);
      scrollCleanup?.();
    };
  }, [prefersReduced]); // eslint-disable-line react-hooks/exhaustive-deps
}
