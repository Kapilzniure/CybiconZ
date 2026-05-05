const items = [
  { c: "#7C3AED", t: "Website Development" },
  { c: "#EC4899", t: "E-Commerce Systems" },
  { c: "#06B6D4", t: "UI/UX Design" },
  { c: "#F59E0B", t: "Web Applications" },
  { c: "#10B981", t: "Digital Marketing" },
  { c: "#A855F7", t: "Design Systems" },
  { c: "#06B6D4", t: "Brand Identity" },
  { c: "#F59E0B", t: "Performance Optimization" },
];

export default function Marquee() {
  return (
    <div className="h-[52px] overflow-hidden border-y border-white/5 bg-white/[0.015] flex items-center group">
      <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-8">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: it.c }} />
            <span className="text-ink-muted text-sm font-medium">{it.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
