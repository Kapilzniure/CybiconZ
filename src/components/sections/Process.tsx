import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { FloatingGeometry } from "@/components/ui/FloatingGeometry";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    name: "Discovery",
    d: "We learn about your goals, your customers, and what success actually looks like for your business.",
    guarantee: "No cost. No commitment.",
    clientFeels: "\"I'm not sure if they'll understand my business\"",
    youGet: ["Honest scope assessment", "Clear timeline and cost range", "Decision to proceed — or not"],
    color: "#00C4FF"
  },
  {
    n: "02",
    name: "Design",
    d: "Visual direction is built and approved before a single line of code is written.",
    guarantee: "Nothing moves forward without your sign-off.",
    clientFeels: "\"What if I don't like what they build?\"",
    youGet: ["Full visual mockup in Figma", "2 rounds of revisions included", "Your approval before development"],
    color: "#4F46E5"
  },
  {
    n: "03",
    name: "Build",
    d: "Development happens in milestones. You see real progress, not a black box.",
    guarantee: "Weekly updates. Always reachable.",
    clientFeels: "\"What's actually happening? Are they still working on it?\"",
    youGet: ["Staging URL you can check anytime", "Milestone sign-offs before proceeding", "Direct line to the developer"],
    color: "#39FF14"
  },
  {
    n: "04",
    name: "Handoff",
    d: "You leave with everything — the product, the knowledge to run it, and documentation.",
    guarantee: "You'll never need us just to make a change.",
    clientFeels: "\"I'm going to be dependent on them forever\"",
    youGet: ["Video walkthrough of everything built", "Written documentation", "30-day support window included"],
    color: "#F97316"
  }
];

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }
  }
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } }
};

const youGetVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

export default function Process() {
  const velocity   = useScrollVelocity();
  const floatSpeed = Math.max(3, 7 - velocity * 0.3);

  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep,  setActiveStep]  = useState(-1);
  const [flashStep,   setFlashStep]   = useState<number | null>(null);
  const [ctaHovered,  setCtaHovered]  = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const prevActive = useRef(-1);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Progress line fill tied to scroll through section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });
  const progressLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // GSAP entrance — each step slides in from x:28 when "top 75%" hits viewport
  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { x: 28, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [prefersReduced]);

  // IntersectionObserver — step becomes active when it crosses the middle 40% band
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.getAttribute("data-step-index"));
            setActiveStep(i);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    const els = stepRefs.current;
    els.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Brief horizontal flash when active step changes
  useEffect(() => {
    if (prefersReduced || activeStep < 0 || activeStep === prevActive.current) return;
    prevActive.current = activeStep;
    setFlashStep(activeStep);
    const t = setTimeout(() => setFlashStep(null), 450);
    return () => clearTimeout(t);
  }, [activeStep, prefersReduced]);

  return (
    <section
      ref={sectionRef}
      data-section="process-section"
      className="grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", "--float-speed": floatSpeed } as CSSProperties}
    >
      {/* Ambient orange glow */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: "-150px", left: "-150px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(rgba(249,115,22,0.09), transparent 65%)",
          pointerEvents: "none", zIndex: 0, filter: "blur(1px)",
        }}
      />
      {!prefersReduced && (
        <FloatingGeometry
          variant="cube" color="#F97316" size={80} opacity={0.15}
          position={{ bottom: "10%", right: "5%" }} speed={7}
        />
      )}

      {/* ── LEFT PANEL — cinematic sticky ───────────────────────── */}
      <div className="bg-[#060608] p-8 sm:p-16 md:p-20 flex flex-col justify-center relative z-10 lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        {/* Step-reactive background glow — color crossfades with active step */}
        <AnimatePresence>
          {activeStep >= 0 && !prefersReduced && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.04 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${steps[activeStep].color}, transparent)`,
                filter: "blur(120px)",
              }}
            />
          )}
        </AnimatePresence>

        <span className="relative z-10 label-eyebrow text-violet mb-4">Process</span>

        <div className="relative z-10">
          <h2
            className="section-headline-reveal font-display font-extrabold text-ink leading-[0.95]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}
          >
            How an Engagement Works
          </h2>
          
          <div className="mt-4 font-mono text-[11px] text-white/30 uppercase tracking-widest">
            From first call to handoff: typically 3–14 weeks depending on scope.
          </div>

          {/* Active step label — fades out old, fades in new */}
          <div className="h-6 mt-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeStep >= 0 && (
                <motion.span
                  key={activeStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="block font-mono"
                  style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}
                >
                  Step {steps[activeStep].n}: {steps[activeStep].name}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="relative z-10 text-ink-muted text-base mt-6 max-w-md">
          You stay in control at every stage. No surprises.
        </p>

        {/* Progress dots — brighten and glow with active step */}
        <div className="relative z-10 mt-8 flex flex-row gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
              animate={{
                opacity:   activeStep === i ? 1.0 : 0.45,
                boxShadow: (activeStep === i && !prefersReduced)
                  ? `0 0 8px ${s.color}, 0 0 14px ${s.color}60`
                  : "none",
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>

        {/* Trust Signals */}
        <div className="relative z-10 mt-12 space-y-3">
          {[
            "Fixed price. No surprise invoices.",
            "You own everything we build.",
            "We work with 2-3 clients at a time. You're never deprioritized."
          ].map((signal, i) => (
            <div key={i} className="flex items-center gap-3">
              <span 
                className="text-[14px] leading-none" 
                style={{ color: activeStep >= 0 ? steps[activeStep].color : "rgba(255,255,255,0.5)" }}
              >
                ✓
              </span>
              <span className="font-sans text-[13px] text-white/50">{signal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — steps ─────────────────────────────────── */}
      <div className="bg-[#0A0A12] p-8 sm:p-16 md:p-20 relative">
        {/* Vertical scroll progress line */}
        <div
          className="absolute top-[8%] bottom-[8%] w-px"
          style={{ left: 0, background: "rgba(255,255,255,0.04)" }}
        >
          <motion.div
            className="w-full"
            style={{
              height: progressLineHeight,
              background: "linear-gradient(to bottom, #00C4FF, #4F46E5, #39FF14, #F97316)",
              originY: 0,
            }}
          />
        </div>

        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => { stepRefs.current[i] = el; }}
              data-step-index={i}
              className={`relative flex items-start gap-6 py-10 px-4 -mx-4 rounded-2xl transition-colors duration-200 hover:bg-white/[0.025] ${prefersReduced ? 'opacity-100' : 'opacity-0'} animate-gpu`}
              style={{
                borderBottom: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transform: "translateZ(0)"
              }}
            >
              {/* Horizontal flash at step boundary */}
              {flashStep === i && !prefersReduced && (
                <motion.div
                  key={`flash-${i}-${flashStep}`}
                  className="absolute left-4 right-4 top-0 h-px pointer-events-none z-10"
                  style={{ background: s.color }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.4, ease: "easeOut", times: [0, 0.3, 1] }}
                />
              )}

              {/* Step number — pulses to 0.85 opacity + glow when active */}
              <motion.div
                className="font-display font-extrabold text-[52px] leading-none shrink-0 tabular-nums"
                style={{ color: s.color }}
                animate={{
                  opacity:    activeStep === i ? 0.85 : 0.12,
                  textShadow: (activeStep === i && !prefersReduced)
                    ? `0 0 24px ${s.color}90, 0 0 48px ${s.color}40`
                    : "none",
                }}
                transition={{ duration: 0.4 }}
              >
                {s.n}
              </motion.div>

              {/* Step content */}
              <div className="pt-1 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: s.color, boxShadow: (activeStep === i && !prefersReduced) ? `0 0 8px ${s.color}60` : "none" }}
                  />
                  {/* Name grows with scale + brightens when active */}
                  <motion.h3
                    className="font-display font-bold origin-left"
                    animate={{
                      scale: activeStep === i ? 1.1 : 1,
                      color: activeStep === i ? "#FFFFFF" : "#F0EEFF",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: "18px" }}
                  >
                    {s.name}
                  </motion.h3>
                </div>
                
                {/* Description */}
                <motion.p
                  className="text-sm leading-relaxed max-w-sm"
                  animate={{
                    color: activeStep >= 0 && activeStep !== i
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(255,255,255,0.45)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {s.d}
                </motion.p>

                {/* You Get ( deliverables list ) */}
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.ul className="mt-5 space-y-2">
                      {s.youGet.map((item, idx) => (
                        <motion.li
                          key={item}
                          custom={idx}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={youGetVariants}
                          className="flex items-center gap-2 text-[12px] text-white/60"
                        >
                          <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Guarantee Pill */}
                <div className="mt-6 flex">
                  <span 
                    className="font-mono text-[10px] px-2.5 py-1 rounded-[4px] border uppercase tracking-wider"
                    style={{ 
                      background: `${s.color}1a`,
                      borderColor: `${s.color}4d`,
                      color: s.color,
                      fontWeight: 700
                    }}
                  >
                    {s.guarantee}
                  </span>
                </div>

                {/* Client Feels */}
                <div className="mt-3">
                  <span className="italic text-[13px] text-white/30">
                    {s.clientFeels}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={prefersReduced ? reducedVariants : ctaVariants}
            className="mt-6 rounded-xl px-5 py-4 border-t-0 animate-gpu"
            style={{ transform: "translateZ(0)" }}
          >
            <div
              className="rounded-xl px-5 py-4"
              style={{
                background: ctaHovered ? "rgba(79,70,229,0.08)" : "rgba(79,70,229,0.05)",
                border:     `1px solid ${ctaHovered ? "rgba(79,70,229,0.3)" : "rgba(79,70,229,0.15)"}`,
                transition: "background 0.3s ease, border-color 0.3s ease",
              }}
            >
              <Link
                to="/contact"
                className="flex items-center justify-between"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
              >
                <span className="text-[14px] font-semibold text-[#F0EEFF]">
                  Ready to start?
                </span>
                <span
                  className="flex items-center gap-2 text-[13px] font-bold"
                  style={{ color: "hsl(var(--accent-from))" }}
                >
                  {/* Pulsing indigo dot */}
                  <motion.span
                    className="block w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={{ background: "#4F46E5" }}
                    animate={prefersReduced ? { opacity: 1 } : { opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Get in touch
                  {/* Arrow slides right on hover */}
                  <motion.span
                    animate={{ x: ctaHovered ? 4 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
