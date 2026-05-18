import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";

interface UseHeroIntroOptions {
  canvasWrapperRef:   RefObject<HTMLElement>;
  eyebrowRef:         RefObject<HTMLElement>;
  line1Ref:           RefObject<HTMLElement>;
  line2Ref:           RefObject<HTMLElement>;
  line3Ref:           RefObject<HTMLElement>;
  subtitleRef:        RefObject<HTMLElement>;
  ctaRowRef:          RefObject<HTMLElement>;
  statsRef:           RefObject<HTMLElement>;
  scrollIndicatorRef: RefObject<HTMLElement>;
  prefersReduced:     boolean;
  onLine2Complete?:   () => void;
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
  const onLine2CompleteRef = useRef(onLine2Complete);
  onLine2CompleteRef.current = onLine2Complete;

  useEffect(() => {
    let breathingTween:  gsap.core.Tween | null = null;
    let breathingTimer:  ReturnType<typeof setTimeout> | null = null;
    let scrollTimer:     ReturnType<typeof setTimeout> | null = null;
    let scrollCleanup:   (() => void) | null = null;

    const ctx = gsap.context(() => {

      // ── Reduced motion: snap everything to final state ──────────
      if (prefersReduced) {
        gsap.set(canvasWrapperRef.current,  { opacity: 0.4 });
        gsap.set(eyebrowRef.current,        { clipPath: "inset(0 0% 0 0)" });
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { yPercent: 0 });
        gsap.set([subtitleRef.current, ctaRowRef.current], { opacity: 1, y: 0 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0.4 });
        if (statsRef.current) {
          gsap.set(statsRef.current.querySelectorAll("[data-stat-item]"), { opacity: 1, y: 0 });
        }
        return;
      }

      // ── Set initial hidden states — GSAP owns these, NOT JSX ────
      gsap.set(canvasWrapperRef.current,  { opacity: 0 });
      gsap.set(eyebrowRef.current,        { clipPath: "inset(0 100% 0 0)" });
      gsap.set(line1Ref.current,          { yPercent: 110 });
      gsap.set(line2Ref.current,          { yPercent: 110 });
      gsap.set(line3Ref.current,          { yPercent: 110 });
      gsap.set([subtitleRef.current, ctaRowRef.current], { opacity: 0, y: 16 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      if (statsRef.current) {
        gsap.set(statsRef.current.querySelectorAll("[data-stat-item]"), { opacity: 0, y: 8 });
      }

      // ── Master timeline ──────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // t=0    — canvas fades in
      tl.to(canvasWrapperRef.current,  { opacity: 0.4, duration: 1.2, ease: "power1.inOut" }, 0);

      // t=0.16 — eyebrow clips in left→right
      tl.to(eyebrowRef.current,        { clipPath: "inset(0 0% 0 0)", duration: 0.8 }, 0.16);

      // t=0.38 — "We build" rises
      tl.to(line1Ref.current,          { yPercent: 0, duration: 0.9 }, 0.38);

      // t=0.52 — "digital" rises
      tl.to(line2Ref.current,          { yPercent: 0, duration: 0.9 }, 0.52);

      // t=0.66 — "products." rises
      tl.to(line3Ref.current,          {
        yPercent: 0, duration: 0.9,
        onComplete: () => onLine2CompleteRef.current?.(),
      }, 0.66);

      // t=0.90 — subtitle fades up
      tl.to(subtitleRef.current,       { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.90);

      // t=1.08 — CTAs fade up
      tl.to(ctaRowRef.current,         { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.08);

      // t=1.28 — stats stagger in
      if (statsRef.current) {
        tl.to(statsRef.current.querySelectorAll("[data-stat-item]"), {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.08,
        }, 1.28);
      }

      // t=1.48 — scroll indicator
      tl.to(scrollIndicatorRef.current, { opacity: 0.4, duration: 0.5, ease: "power1.out" }, 1.48);
    });

    // Breathing glow on "digital" — starts after reveal completes
    if (!prefersReduced) {
      breathingTimer = setTimeout(() => {
        breathingTween = gsap.to(line2Ref.current, {
          textShadow: "0 0 100px rgba(0,196,255,0.8), 0 0 200px rgba(0,196,255,0.3)",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }, 1500);

      // Dismiss scroll indicator on first scroll
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
      if (breathingTimer) clearTimeout(breathingTimer);
      if (scrollTimer)    clearTimeout(scrollTimer);
      scrollCleanup?.();
    };
  }, [prefersReduced]); // eslint-disable-line react-hooks/exhaustive-deps
}