import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { posts } from "@/data/posts";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const featuredPosts = posts.slice(0, 3);

const labelVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { 
    scaleX: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { 
    scaleX: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
  }
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, delay: 0.4 }
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
  }
};

export default function LatestThinking() {
  return (
    <section style={{ background: "#060608", padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
      {/* Atmosphere: Ghost Text */}
      <div 
        aria-hidden 
        className="absolute right-0 top-0 pointer-events-none select-none font-display font-black leading-none"
        style={{ 
          fontSize: "clamp(100px, 14vw, 200px)", 
          color: "rgba(255,255,255,0.015)",
          zIndex: 0
        }}
      >
        BLOG
      </div>

      {/* Soft indigo glow — expanded */}
      <div 
        aria-hidden 
        style={{ 
          position: "absolute", 
          top: "-120px", 
          right: "-120px", 
          width: "600px", 
          height: "600px", 
          borderRadius: "50%", 
          background: "radial-gradient(rgba(129,140,248,0.06), transparent 65%)", 
          pointerEvents: "none", 
          zIndex: 0 
        }} 
      />

      <div className="container relative z-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            {/* Label with line-draw animation */}
            <div className="overflow-hidden flex items-center gap-3">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={labelVariants}
                className="overflow-hidden whitespace-nowrap animate-gpu"
              >
                <span className="label-eyebrow text-[#818CF8] block">Blog &amp; News</span>
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={lineVariants}
                className="h-[1px] bg-[#818CF8]/30 flex-grow min-w-[40px] animate-gpu"
              />
            </div>

            <h2
              className="section-headline-reveal font-display font-extrabold mt-4"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "-0.03em", color: "#F0EEFF" }}
            >
              <SplitText delay={0.05}>Latest Thinking</SplitText>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={linkVariants}
            className="animate-gpu"
          >
            <Link
              to="/blog"
              className="group relative inline-flex items-center gap-1 text-[13px] font-bold py-2"
              style={{ color: "#818CF8" }}
            >
              View all posts <span className="transition-transform group-hover:translate-x-1">→</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-[#818CF8] origin-left animate-gpu"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Card (Left) */}
          <motion.div 
            className="lg:col-span-2 animate-gpu"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardContainerVariants}
          >
            <PostCard post={featuredPosts[0]} featured={true} />
          </motion.div>

          {/* Secondary Cards Column (Right) */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="animate-gpu"
            >
              <PostCard post={featuredPosts[1]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="animate-gpu"
            >
              <PostCard post={featuredPosts[2]} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
