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
  return (
    <div className="h-[52px] overflow-hidden border-y border-white/5 bg-white/[0.015] flex items-center group">
      <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-8">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7C3AED" }} />
            <span className="text-ink-muted text-sm font-medium">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
