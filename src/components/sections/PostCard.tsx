import { Link } from "react-router-dom";
import type { Post } from "@/data/posts";

function formatDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:shadow-2xl"
      style={{
        background: "#0F0F1C",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden relative">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <span
          className="absolute top-3 left-3 text-white text-[11px] font-medium px-2.5 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div>
        <div
          className="font-mono text-[12px] px-6 mt-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {formatDate(post.date)}
        </div>
        <h3
          className="font-display font-bold text-[20px] px-6 mt-2"
          style={{ color: "#F0EEFF", lineHeight: 1.3 }}
        >
          {post.title}
        </h3>
        <p
          className="px-6 mt-3 text-[14px] line-clamp-3"
          style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}
        >
          {post.excerpt}
        </p>
        <div className="px-6 pb-6 mt-4 flex items-center justify-between">
          <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            {post.readTime}
          </span>
          <span className="text-gradient font-bold text-[13px]">Read more →</span>
        </div>
      </div>
    </Link>
  );
}
