import SiteShell from "@/components/site/SiteShell";
import PostCard from "@/components/sections/PostCard";
import { posts } from "@/data/posts";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Blog() {
  return (
    <SiteShell>
      {/* Dark hero */}
      <section
        className="relative overflow-hidden bg-[#060608] pt-32 pb-20"
      >
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }} />
        
        <div className="container relative">
          <motion.span className="label-eyebrow text-violet" {...fadeUp(0)}>Blog &amp; News</motion.span>
          <h1
            className="section-headline-reveal font-display font-extrabold text-ink mt-5 leading-[0.95]"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em" }}
          >
            <SplitText as="span" className="block">Insights from</SplitText>
            <SplitText as="span" className="block text-gradient" delay={0.2}>the Build.</SplitText>
          </h1>
          <motion.p 
            className="text-ink-muted text-[16px] mt-6 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Practical thinking on digital products, agency work, and growing a business online.
          </motion.p>
        </div>
      </section>

      {/* Posts grid */}
      <section style={{ background: "#0A0A12", padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
