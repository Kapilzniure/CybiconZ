import SiteShell from "@/components/site/SiteShell";
import PostCard from "@/components/sections/PostCard";
import { posts } from "@/data/posts";

export default function Blog() {
  return (
    <SiteShell>
      {/* Dark hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#07080E", padding: "80px 0" }}
      >
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(109,40,217,0.1)", filter: "blur(120px)" }} />
        <div className="container relative">
          <span className="label-eyebrow text-violet">Blog &amp; News</span>
          <h1
            className="font-display font-extrabold text-ink mt-5 leading-[0.95]"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em" }}
          >
            Insights from the Build
          </h1>
          <p className="text-ink-muted text-[16px] mt-4 max-w-xl leading-relaxed">
            Practical thinking on digital products, agency work, and growing a business online.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="surface-light" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
