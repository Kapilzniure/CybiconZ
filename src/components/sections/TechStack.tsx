import { motion } from "framer-motion";

const row1 = [
  { i: "⚛️", n: "React", c: "Library" },
  { i: "▲", n: "Next.js", c: "Framework" },
  { i: "🔷", n: "TypeScript", c: "Language" },
  { i: "🟢", n: "Node.js", c: "Runtime" },
  { i: "🐘", n: "PostgreSQL", c: "Database" },
  { i: "🎨", n: "Figma", c: "Design" },
  { i: "💳", n: "Stripe", c: "Payments" },
  { i: "☁️", n: "AWS", c: "Cloud" },
  { i: "🐳", n: "Docker", c: "DevOps" },
  { i: "🟥", n: "Redis", c: "Cache" },
];
const row2 = [
  { i: "💨", n: "Tailwind CSS", c: "Styling" },
  { i: "🐙", n: "GitHub", c: "Source" },
  { i: "▲", n: "Vercel", c: "Hosting" },
  { i: "📷", n: "Cloudinary", c: "Media" },
  { i: "🔥", n: "Firebase", c: "BaaS" },
  { i: "🔺", n: "Prisma", c: "ORM" },
  { i: "🛍️", n: "Shopify", c: "Commerce" },
  { i: "🎬", n: "Framer", c: "Motion" },
  { i: "🧊", n: "Three.js", c: "3D" },
  { i: "🌊", n: "Webflow", c: "CMS" },
];

function Item({ i, n, c }: { i: string; n: string; c: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 transition hover:border-violet/30 hover:bg-violet/5 mx-1.5">
      <span className="text-lg">{i}</span>
      <div>
        <div className="text-[13px] font-semibold text-white/70 leading-none">{n}</div>
        <div className="font-mono text-[10px] text-white/25 mt-1 uppercase tracking-wider">{c}</div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section data-section="tech-section" className="py-[100px] bg-brand-base overflow-hidden dark-texture" style={{ position: "relative" }}>
      {/* Glow Story - Tech Stack */}
      {/* Violet glow — left-center */}
      <div aria-hidden style={{ position: "absolute", top: "50%", left: "-100px", transform: "translateY(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(rgba(79,70,229,0.08), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      <motion.div
        className="container relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="label-eyebrow text-violet">Tech</span>
        <h2 className="font-display font-extrabold text-ink mt-3 mb-12" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>Our Tech Stack</h2>
      </motion.div>
      <div className="space-y-3.5">
        <div className="overflow-hidden">
          <div className="flex animate-marquee-fast w-max">
            {[...row1, ...row1].map((it, i) => <Item key={i} {...it} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-marquee-slow w-max">
            {[...row2, ...row2].map((it, i) => <Item key={i} {...it} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
