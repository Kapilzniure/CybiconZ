import { Link } from "react-router-dom";
import type { Post } from "@/data/posts";
import { motion } from "framer-motion";

function formatDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  if (featured) {
    return (
      <motion.div
        initial="initial"
        whileHover="hover"
        className="h-full"
      >
        <Link
          to={`/blog/${post.slug}`}
          className="group relative block h-full rounded-2xl overflow-hidden"
          style={{ background: "#0F0F1C" }}
        >
          {/* Image Container */}
          <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden relative">
            <motion.img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
              variants={{
                hover: { scale: 1.05 }
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" 
              style={{ zIndex: 1 }}
            />
            
            {/* Category Badge */}
            <span
              className="absolute top-6 left-6 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
              style={{ 
                background: "rgba(129, 140, 248, 0.2)", 
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(129, 140, 248, 0.3)",
                zIndex: 2 
              }}
            >
              {post.category}
            </span>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10" style={{ zIndex: 2 }}>
              <div className="font-mono text-[12px] text-white/40 mb-3">
                {formatDate(post.date)} — {post.readTime}
              </div>
              <h3
                className="font-display font-bold text-white leading-[1.2] mb-6"
                style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
              >
                {post.title}
              </h3>
              
              <div className="flex items-center gap-2 overflow-hidden">
                <motion.span 
                  className="text-[#818CF8] font-bold text-[14px] flex items-center gap-1"
                  variants={{
                    initial: { x: -8, opacity: 0 },
                    hover: { x: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Read more →
                </motion.span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Secondary / Compact Layout
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block p-4 transition-all duration-300 rounded-xl"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "transparent",
      }}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-white/5">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#818CF8]">
              {post.category}
            </span>
            <span className="text-[10px] text-white/20">•</span>
            <span className="text-[10px] text-white/30 font-mono">
              {post.readTime}
            </span>
          </div>
          <h3
            className="font-display font-bold text-[16px] leading-tight text-white/75 group-hover:text-white transition-colors duration-300"
          >
            {post.title}
          </h3>
          <p className="text-[13px] text-white/40 line-clamp-1 mt-1 font-light">
            {post.excerpt}
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .group:hover {
          border-color: rgba(129, 140, 248, 0.3) !important;
          background: rgba(129, 140, 248, 0.02) !important;
        }
      `}} />
    </Link>
  );
}
