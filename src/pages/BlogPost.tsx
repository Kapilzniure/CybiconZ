import { Link, useParams, Navigate } from "react-router-dom";
import SiteShell from "@/components/site/SiteShell";
import { posts } from "@/data/posts";

function formatDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <SiteShell>
      {/* Dark header */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#07080E", padding: "80px 0 60px" }}
      >
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(109,40,217,0.1)", filter: "blur(100px)" }} />
        <div className="container relative" style={{ maxWidth: 720 }}>
          <Link to="/blog" className="text-sm text-ink-muted hover:text-ink transition-colors">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3 mt-8">
            <span
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: "hsl(var(--accent-from) / 0.15)", color: "hsl(var(--accent-from))", border: "1px solid hsl(var(--accent-from) / 0.25)" }}
            >
              {post.category}
            </span>
            <span className="font-mono text-[12px] text-ink-muted">{formatDate(post.date)}</span>
            <span className="font-mono text-[12px] text-ink-muted">·</span>
            <span className="font-mono text-[12px] text-ink-muted">{post.readTime}</span>
          </div>
          <h1
            className="font-display font-extrabold text-ink mt-5 leading-[1.05]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* Light body */}
      <section className="surface-light" style={{ padding: "60px 0 100px" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          {/* Excerpt as lead */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 18,
              color: "#2D2F45",
              lineHeight: 1.75,
              fontStyle: "italic",
              borderLeft: "3px solid hsl(var(--accent-from))",
              paddingLeft: 20,
              marginBottom: 36,
            }}
          >
            {post.excerpt}
          </p>

          {/* Coming soon notice */}
          <div
            className="rounded-2xl"
            style={{
              background: "rgba(109,40,217,0.06)",
              border: "1px solid rgba(109,40,217,0.15)",
              padding: "28px 32px",
            }}
          >
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 15,
                color: "#4A4C6A",
                lineHeight: 1.7,
              }}
            >
              Full article coming soon.{" "}
              <a
                href="mailto:hello@cybiconz.com"
                className="font-semibold"
                style={{ color: "hsl(var(--accent-from))" }}
              >
                Subscribe to be notified
              </a>{" "}
              when it's published.
            </p>
          </div>

          <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <Link to="/blog" className="text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: "hsl(var(--accent-from))" }}>
              ← Back to all posts
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
