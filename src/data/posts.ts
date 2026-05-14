export const posts = [
  {
    slug: 'what-to-ask-before-hiring-an-agency',
    title: 'What to Ask Before Hiring a Digital Agency',
    excerpt: 'Most businesses get burned by agencies because they asked the wrong questions upfront. Here are the five questions that separate serious agencies from time-wasters.',
    category: 'Advice',
    date: '2024-11-15',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=75',
    content: `Before you sign a contract, make sure the agency understands how your business makes money. Ask for concrete examples of work they have delivered for customers in your industry or with similar goals.

A good agency should explain how they measure success — not just how many pages they can build. Ask how they track lead generation, conversion rates, or direct revenue, because those are the numbers that matter to your business.

Finally, clarify the scope and communication process. A serious partner will be clear about what is included, how changes are managed, and how often you will hear from them. If you leave the call with more uncertainty than confidence, keep looking.
    `,
  },
  {
    slug: 'why-your-website-is-not-converting',
    title: "Why Your Website Isn't Converting (And How to Fix It)",
    excerpt: "Traffic without conversion is just vanity. We break down the five most common reasons business websites fail to turn visitors into clients — and what to do about each one.",
    category: 'Strategy',
    date: '2024-10-28',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=75',
    content: `If your website is getting visitors but not customers, the first place to start is your homepage. It should answer three questions immediately: what you do, who you serve, and what action the visitor should take next.

Second, review the path to conversion. Too many clicks, unclear pricing, or a crowded checkout flow kills momentum. Remove unnecessary steps and keep the next move obvious. For service businesses, a clear contact or booking path is more important than a flashy homepage.

Third, make trust visible. Add short client outcomes, how you work, and why your process is reliable. When a visitor is unsure, the website should reduce friction with clear outcomes and honest expectations — not more noise.
    `,
  },
  {
    slug: 'ecommerce-mistakes-that-cost-you-sales',
    title: '7 E-Commerce Mistakes That Cost You Sales Every Day',
    excerpt: "After building global e-commerce systems, we've seen the same mistakes repeated. From checkout friction to currency display — here's what kills conversions.",
    category: 'E-Commerce',
    date: '2024-10-10',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=75',
    content: `Mistake #1: forcing customers to register before purchase. Every extra step adds drop-off. Offer a guest checkout path first and ask for account creation after the sale, not before.

Mistake #2: hiding shipping and fees until the last page. Unexpected costs are the fastest way to lose a cart. Be transparent early with shipping estimates, delivery windows, and any duties or taxes.

Mistake #3: using one checkout experience for every audience. International shoppers need currency clarity and regional payment options. If your customer base is global, localize the experience rather than forcing everyone through the same form.
    `,
  },
  {
    slug: 'cybiconz-building-in-public',
    title: 'Building in Public: How CybiconZ Is Growing',
    excerpt: "We're a small team building something serious. This is an honest update on where we are, what we've built, and where we're going — no inflated stats, no startup fluff.",
    category: 'Company',
    date: '2024-09-22',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=75',
    content: `CybiconZ is small by design. That means every project gets direct attention from the founder and every decision is made with the client in mind. We are intentionally avoiding the agency model that layers in project managers and handoffs.

Right now we are focused on delivering real work, not building a marketing machine. That means fewer launches, but better outcomes for the businesses we partner with. We are prioritizing commerce systems, websites that convert, and digital operations that actually simplify work.

Going forward, we are building a clearer client experience. That means transparent pricing conversations, documented handoffs, and a stronger focus on post-launch support. We want clients to feel confident the work will keep working after it goes live.
    `,
  },
];

export type Post = typeof posts[number];
