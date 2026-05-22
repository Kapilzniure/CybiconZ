import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useCountUp } from "@/hooks/useCountUp";
import { useScramble } from "@/hooks/useScramble";

const proofPoints = [
  { value: "25+",   label: "Projects delivered" },
  { value: "100%",  label: "Delivery rate"       },
  { value: "Tokyo", label: "Japan · Global reach" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function isNumericValue(value: string) {
  return /^\d+(?:\.\d+)?%?$/.test(value);
}

interface ProofPoint {
  value: string;
  label: string;
  detail?: string;
}

function ProofPointItem({ point, index, active }: { point: ProofPoint; index: number; active: boolean }) {
  const numeric = isNumericValue(point.value);
  const numericValue = numeric ? parseFloat(point.value.replace(/[^0-9.-]/g, "")) : 0;
  const numericSuffix = point.value.endsWith("%") ? "%" : "";
  const { count, ref: countRef, suffix } = useCountUp({
    end: numericValue,
    duration: 900,
    decimals: 0,
    suffix: numericSuffix,
    startOnView: true,
  });
  const scrambledValue = useScramble(point.value, active, 600);
  const displayValue = numeric ? `${count}${suffix}` : scrambledValue;

  const dividerClasses = [
    index !== proofPoints.length - 1 ? "sm:border-r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={`proof-bar-item relative flex min-h-[72px] items-center border-[rgba(255,255,255,0.06)] ${dividerClasses} py-5 md:py-0 md:h-[72px] px-4 sm:px-5 lg:px-6`}
      {...fadeUp(index * 0.08)}
    >
      <div className="w-full">
        <div
          className="proof-value font-display font-extrabold text-[clamp(28px,3.5vw,44px)] leading-none"
          style={{ color: "rgba(255,255,255,0.9)", opacity: 0.6 }}
          ref={countRef as RefObject<HTMLSpanElement>}
        >
          {displayValue}
        </div>
        <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[rgba(255,255,255,0.25)]">
          {point.label}
        </div>
        {point.detail ? (
          <div className="mt-1 text-[11px] text-white/50">{point.detail}</div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function ProofBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrambleActive, setScrambleActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".proof-value", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative bg-[#020408]"
      style={{ padding: "48px 0" }}
      onViewportEnter={() => setScrambleActive(true)}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(to bottom, #020408, transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-0 sm:grid-cols-3 lg:grid-cols-3">
        {proofPoints.map((point, index) => (
          <ProofPointItem key={point.label} point={point} index={index} active={scrambleActive} />
        ))}
      </div>
    </motion.section>
  );
}
