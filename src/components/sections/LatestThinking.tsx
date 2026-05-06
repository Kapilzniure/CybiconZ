import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { posts } from "@/data/posts";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const featured = posts.slice(0, 3);

export default function LatestThinking() {
  return (
    <section className="surface-light" style={{ padding: "80px 0" }}>
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="label-eyebrow text-violet">Blog &amp; News</span>
            <h2
              className="section-headline-reveal font-display font-extrabold mt-3"
              style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.03em", color: "#0A0B14" }}
            >
              Latest Thinking
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1 text-[13px] font-bold shrink-0 mb-1"
            style={{ color: "hsl(var(--accent-from))" }}
          >
            View all posts →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-[13px] font-bold"
            style={{ color: "hsl(var(--accent-from))" }}
          >
            View all posts →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
