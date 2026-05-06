import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import SiteShell from "@/components/site/SiteShell";
import { projects } from "@/data/projects";
import SplitText from "@/components/ui/SplitText";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const contentBlocks = (p: (typeof projects)[number]) => [
  { label: "The situation",      h3: "What was needed",       body: p.situation },
  { label: "The challenge",      h3: "What made it complex",  body: p.challenge },
  { label: "How we approached it", h3: "The build process",   body: p.approach  },
];

export default function CaseStudy() {
  const { slug } = useParams();
  const p = projects.find(x => x.slug === slug);
  if (!p) return <Navigate to="/work" replace />;

  const rgb = hexToRgb(p.statusColor);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-brand-base pt-40 pb-0 overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "rgba(124,58,237,0.08)", filter: "blur(120px)" }}
        />

        <div className="container relative">
          {/* Back + status row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/work"
              className="text-sm text-ink-muted hover:text-ink transition-colors"
            >
              ← Work
            </Link>
            {p.inProgress && (
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-[12px] font-semibold"
                style={{
                  background: `rgba(${rgb}, 0.1)`,
                  border: `1px solid rgba(${rgb}, 0.2)`,
                  color: p.statusColor,
                }}
              >
                <span
                  className="animate-pulse-dot shrink-0 w-[7px] h-[7px] rounded-full"
                  style={{ background: p.statusColor }}
                />
                {p.status}
              </span>
            )}
          </div>

          {/* Project name */}
          <SplitText
            as="h1"
            className="font-display font-extrabold text-ink leading-[0.95] mt-6"
            style={{ fontSize: "clamp(52px, 8vw, 96px)", letterSpacing: "-0.04em" }}
          >
            {p.name}
          </SplitText>

          {/* Service · Sector · Year */}
          <motion.div
            className="font-mono text-[13px] text-ink-muted mt-4 uppercase tracking-wider"
            {...fadeUp(0.1)}
          >
            {p.service} · {p.sector} · {p.year}
          </motion.div>

          {/* In-progress banner */}
          {p.inProgress && (
            <motion.div
              className="mt-8 flex items-start gap-4 rounded-xl p-5"
              style={{
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.15)",
              }}
              {...fadeUp(0.15)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{ flexShrink: 0, marginTop: 2 }}
              >
                <circle cx="10" cy="10" r="9" stroke="rgba(124,58,237,0.8)" strokeWidth="1.5" />
                <path d="M10 6v4.5" stroke="rgba(124,58,237,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="13.5" r="0.85" fill="rgba(124,58,237,0.8)" />
              </svg>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(124,58,237,0.9)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {p.inProgressNote}
              </p>
            </motion.div>
          )}
        </div>

        {/* Hero image — full container width, bleeds to top */}
        <motion.div
          className="container relative mt-12"
          {...fadeUp(0.2)}
        >
          <div className="relative rounded-t-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <img
              src={p.image}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, #060608 0%, transparent 30%)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="surface-light py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-16">
            {/* SIDEBAR */}
            <div className="md:w-[30%] shrink-0">
              <div className="md:sticky" style={{ top: 100 }}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-6">
                  Project details
                </p>

                {(
                  [
                    { label: "Service", value: p.service },
                    { label: "Sector",  value: p.sector  },
                    { label: "Year",    value: p.year    },
                    { label: "Status",  value: p.status  },
                  ] as const
                ).map(({ label, value }) => (
                  <div key={label} className="py-4 border-b border-black/[0.07]">
                    <p
                      className="font-mono text-[11px] uppercase tracking-wider mb-1"
                      style={{ color: "#6B6E8F" }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-sans font-semibold text-[14px]"
                      style={{ color: "#0A0B14" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}

                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mt-8 mb-4">
                  What we're building
                </p>
                <ul className="flex flex-col gap-3">
                  {p.delivering.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-[14px] leading-relaxed"
                      style={{ color: "#0A0B14" }}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <span
                        className="mt-[6px] shrink-0 w-[7px] h-[7px] rounded-full"
                        style={{ background: p.serviceColor }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">
              {contentBlocks(p).map((block, i) => (
                <motion.div
                  key={block.label}
                  className={i > 0 ? "mt-12" : ""}
                  {...fadeUp(i * 0.08)}
                >
                  <p
                    className="font-mono text-[11px] uppercase tracking-wider mb-3"
                    style={{ color: p.serviceColor }}
                  >
                    {block.label}
                  </p>
                  <h3
                    className="font-display font-bold text-ink-dark leading-tight"
                    style={{ fontSize: 28 }}
                  >
                    {block.h3}
                  </h3>
                  <p
                    className="mt-4"
                    style={{ fontSize: 16, color: "#444", lineHeight: 1.8 }}
                  >
                    {block.body}
                  </p>
                </motion.div>
              ))}

              <hr className="my-12 border-black/[0.08]" />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3
                  className="font-display font-bold text-ink-dark leading-tight mb-6"
                  style={{ fontSize: 28 }}
                >
                  What we're building
                </h3>
                <ul className="flex flex-col gap-3">
                  {p.delivering.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-4 bg-white rounded-xl p-4"
                      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <span
                        className="shrink-0 w-[10px] h-[10px] rounded-full"
                        style={{ background: p.serviceColor }}
                      />
                      <span
                        className="font-sans font-medium text-[15px]"
                        style={{ color: "#0A0B14" }}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, #060608, #0A0520, #060608)" }}
      >
        <div className="absolute inset-0 dark-texture pointer-events-none" />
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(124,58,237,0.15)", filter: "blur(140px)" }}
        />
        <div className="container relative max-w-2xl text-center">
          <h2 className="font-display font-extrabold text-ink leading-[0.95]" style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em" }}>
            <SplitText as="span" className="block">Building something</SplitText>
            <SplitText as="span" className="block" innerClassName="text-gradient" delay={0.24}>similar?</SplitText>
          </h2>
          <motion.p
            className="text-ink-muted mt-6 max-w-lg mx-auto leading-relaxed"
            style={{ fontSize: 16 }}
            {...fadeUp(0.1)}
          >
            Tell us about your project. We'll tell you what's involved and whether we're the right fit.
          </motion.p>
          <motion.div
            {...fadeUp(0.2)}
          >
            <Link
              to="/contact"
              className="inline-flex bg-accent-gradient text-white font-bold text-[15px] px-10 py-4 rounded-xl shadow-glow-purple mt-10 hover:opacity-95 transition"
            >
              Start a conversation →
            </Link>
            <div className="mt-6">
              <a
                href="mailto:hello@cybiconz.com"
                className="text-ink-muted hover:text-ink text-sm transition"
              >
                hello@cybiconz.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
