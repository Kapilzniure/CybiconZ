import { useScroll, useVelocity, useTransform, motion } from "framer-motion";

const items = [
  "Website Development",
  "E-Commerce Systems",
  "UI/UX Design",
  "Web Applications",
  "Digital Marketing",
  "Design Systems",
  "Brand Identity",
  "Performance Optimization",
];

export default function Marquee() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Map scroll velocity (0 to ~1000) to animation duration (80s down to 30s)
  const duration = useTransform(scrollVelocity, [-1000, 0, 1000], [30, 80, 30]);

  return (
    <div className="h-[52px] overflow-hidden border-y border-white/5 bg-white/[0.015] flex items-center group">
      <motion.div
        className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{ animationName: "marquee", animationTimingFunction: "linear", animationIterationCount: "infinite", animationDuration: duration }}
      >
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-8">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00C4FF" }} />
            <span className="text-ink-muted text-sm font-medium">{it}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
