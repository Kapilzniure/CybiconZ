import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useCountUp } from "@/hooks/useCountUp";
import { useScramble } from "@/hooks/useScramble";

const proofPoints = [
  { value: "100%", label: "Project completion rate", color: "#39FF14" },
  { value: "< 24h", label: "Response time guaranteed", color: "#00C4FF" },
  { value: "2", label: "Clients per time slot", detail: "You're never a number", color: "#F59E0B" },
  { value: "Tokyo", label: "Based in Japan, global clients", color: "#fff" },
  { value: "0", label: "Abandoned projects. Ever.", color: "#39FF14" },
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
  color: string;
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
    index !== proofPoints.length - 1 ? "lg:border-r" : "",
    index % 2 === 0 ? "sm:border-r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={`proof-bar-item relative flex min-h-[72px] items-center border-white/10 ${dividerClasses} py-5 md:py-0 md:h-[72px] px-4 sm:px-5 lg:px-6`}
      {...fadeUp(index * 0.08)}
    >
      <div className="w-full">
        <div
          className="proof-value font-display font-extrabold text-[22px] leading-none"
          style={{ color: point.color, opacity: 0.6 }}
          ref={countRef as RefObject<HTMLSpanElement>}
        >
          {displayValue}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/30">
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
      className="relative bg-[#060608] border-t border-b border-white/5"
      onViewportEnter={() => setScrambleActive(true)}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5 border-white/10">
        {proofPoints.map((point, index) => (
          <ProofPointItem key={point.label} point={point} index={index} active={scrambleActive} />
        ))}
      </div>
    </motion.section>
  );
}
