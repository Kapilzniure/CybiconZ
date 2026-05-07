import { Link, useParams, Navigate } from "react-router-dom";
import SiteShell from "@/components/site/SiteShell";
import { posts } from "@/data/posts";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

function formatDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <SiteShell>
      {/* Dark header */}
      <section
        className="relative overflow-hidden bg-[#060608] pt-32 pb-20"
      >
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }} />
        
        <div className="container relative" style={{ maxWidth: 720 }}>
          <motion.div {...fadeUp(0)}>
            <Link to="/blog" className="text-sm text-ink-muted hover:text-ink transition-colors">
              ← Back to Blog
            </Link>
          </motion.div>
          
          <motion.div className="flex items-center gap-3 mt-8" {...fadeUp(0.1)}>
            <span
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: "hsl(var(--accent-from) / 0.15)", color: "hsl(var(--accent-from))", border: "1px solid hsl(var(--accent-from) / 0.25)" }}
            >
              {post.category}
            </span>
            <span className="font-mono text-[12px] text-ink-muted">{formatDate(post.date)}</span>
            <span className="font-mono text-[12px] text-ink-muted">·</span>
            <span className="font-mono text-[12px] text-ink-muted">{post.readTime}</span>
          </motion.div>

          <h1
            className="section-headline-reveal font-display font-extrabold text-ink mt-5 leading-[1.05]"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}
          >
            <SplitText as="span">{post.title}</SplitText>
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: "#0A0A12", padding: "80px 0 120px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          {/* Excerpt as lead */}
          <motion.p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.75,
              fontStyle: "italic",
              borderLeft: "3px solid hsl(var(--accent-from))",
              paddingLeft: 24,
              marginBottom: 48,
            }}
            {...fadeUp(0.2)}
          >
            {post.excerpt}
          </motion.p>

          {/* Coming soon notice */}
          <motion.div
            className="rounded-2xl shadow-xl"
            style={{
              background: "rgba(124,58,237,0.06)",
              border: "1px solid rgba(124,58,237,0.15)",
              padding: "32px 40px",
            }}
            {...fadeUp(0.3)}
          >
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
              }}
            >
              Full article coming soon.{" "}
              <a
                href="mailto:hello@cybiconz.com"
                className="font-bold text-gradient hover:opacity-80 transition-opacity"
              >
                Subscribe to be notified
              </a>{" "}
              when it's published.
            </p>
          </motion.div>

          <motion.div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} {...fadeUp(0.4)}>
            <Link to="/blog" className="text-sm font-bold hover:opacity-80 transition-opacity" style={{ color: "hsl(var(--accent-from))" }}>
              ← Back to all posts
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
