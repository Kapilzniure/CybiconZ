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
        className="relative overflow-hidden bg-[#050507] pt-28 pb-16"
      >
        <div className="container relative" style={{ maxWidth: 720 }}>
          <motion.div {...fadeUp(0)}>
            <Link to="/blog" className="font-mono text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              ← Back to Thinking
            </Link>
          </motion.div>
          
          <motion.div className="flex items-center gap-3 mt-8" {...fadeUp(0.1)}>
            <span
              className="text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/5 text-white/65 border border-white/10"
            >
              {post.category}
            </span>
            <span className="font-mono text-[11px] text-white/45">{formatDate(post.date)}</span>
            <span className="font-mono text-[11px] text-white/45">·</span>
            <span className="font-mono text-[11px] text-white/45">{post.readTime}</span>
          </motion.div>

          <h1
            className="font-display font-extrabold text-white mt-6 leading-[1.05]"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.04em" }}
          >
            <SplitText as="span">{post.title}</SplitText>
          </h1>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: "#050507", padding: "60px 0 100px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          {/* Excerpt as lead */}
          <motion.p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 20,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              fontStyle: "italic",
              borderLeft: "2px solid rgba(255,255,255,0.1)",
              paddingLeft: 24,
              marginBottom: 48,
            }}
            {...fadeUp(0.2)}
          >
            {post.excerpt}
          </motion.p>

          {post.content.trim().split(/\n\n+/).map((paragraph, index) => (
            <motion.p
              key={index}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.85,
                marginBottom: 28,
              }}
              {...fadeUp(0.3 + index * 0.05)}
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} {...fadeUp(0.4)}>
            <Link to="/blog" className="font-mono text-[11px] uppercase tracking-widest text-white/65 hover:text-white transition-colors">
              ← Return to all posts
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
