# CybiconZ — Phase 2 Plan
# What to fix, what to add, exact prompts for Claude Code

---

## THE FULL PICTURE — WHAT NEEDS TO HAPPEN

### Problems to fix (in priority order)
1. Hero right side — meaningless rotating object → replace with real work showcase
2. Black/white imbalance — sections feel either too dark or too washed out
3. Missing content — FAQ, Blog/News, richer section copy
4. Every page needs more depth

### New sections to add
- FAQ section (homepage + services page)
- Blog / CybiconZ News (new page + homepage teaser)
- Richer About page
- More detail in every service

---

## PROMPT 1 — HERO REDESIGN
### Give this to Claude Code first. One task only.

```
I need to completely replace the hero right-side section in src/components/sections/Hero.tsx (or wherever the hero is).

RIGHT NOW: A Three.js rotating torus knot object that looks like a screensaver and has no connection to the website.

REPLACE WITH: A "live work showcase" — a floating device mockup showing real project work.

Here is exactly what to build:

OUTER CONTAINER:
- Position relative, height 100%, display flex, align items center, justify center
- Subtle purple ambient glow behind: absolute, 600px circle, radial-gradient rgba(124,58,237,0.12), blur 100px

MAIN DEVICE FRAME (browser mockup):
- A browser window frame component
- Frame: bg #0D0E18, border 1px rgba(255,255,255,0.1), border-radius 16px
- Top bar of browser: height 36px, bg #131524, border-bottom 1px rgba(255,255,255,0.06)
  - Three dots: 8px circles, colors #FF5F57 / #FEBC2E / #28C840, gap 6px, ml-12px
  - URL bar: bg rgba(255,255,255,0.06), border-radius 6px, width 200px, height 20px, centered in bar
  - URL text inside: "lwangblack.com" — DM Mono 11px rgba(255,255,255,0.3)
- Content area: overflow hidden, border-radius 0 0 16px 16px
  - Show this image: https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80
  - Image: width 100%, object-fit cover
  - Gradient overlay at bottom: linear-gradient(to top, #0D0E18 0%, transparent 40%)
- Box shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)

DEVICE TILT (CSS only, no Three.js):
- transform: perspective(1200px) rotateY(-8deg) rotateX(4deg)
- This creates genuine 3D depth without Three.js
- On mouse move over the hero section:
  - JavaScript: track mouse position relative to hero section
  - Update transform: perspective(1200px) rotateY(calc(-8deg + mouseXOffset)) rotateX(calc(4deg + mouseYOffset))
  - mouseXOffset range: -6deg to +6deg based on mouse X position
  - mouseYOffset range: -4deg to +4deg based on mouse Y position  
  - Use CSS transition: transform 0.1s ease for smooth tracking
  - On mouse leave: transition back to default over 0.6s

FRAMER MOTION float animation on the whole device:
- y: [0, -12, 0], duration: 5s, repeat Infinity, ease: easeInOut

THREE FLOATING CARDS (position absolute over the device):

Card 1 — Project badge (bottom-left, -translate-x-8 translate-y-4):
  bg rgba(13,14,24,0.9), border 1px rgba(255,255,255,0.08), rounded-2xl, p-4, backdrop-blur-md
  Top row: small colored dot (amber) + "E-Commerce" label — DM Mono 10px uppercase rgba(255,255,255,0.4)
  Title: "LwangBlack Coffee" — Bricolage Grotesque 700 14px white
  Sub: "Global · Multi-currency · Delivered" — 11px rgba(255,255,255,0.35)
  Small checkmark icon (inline SVG) in emerald color before "Delivered"
  Framer: y [0, -8, 0], 4s, infinite

Card 2 — Status pill (top-right of device, translate-x-4 -translate-y-2):
  bg rgba(13,14,24,0.9), border 1px rgba(16,185,129,0.2), rounded-full, px-4 py-2
  Content: green pulse dot + "Live & Running" — Plus Jakarta 600 12px white
  Framer: y [0, -6, 0], 5.5s, infinite, starts delayed 0.8s

Card 3 — Tech stack (right side, translate-x-10 at ~60% height):
  bg rgba(13,14,24,0.9), border 1px rgba(255,255,255,0.07), rounded-xl, p-3
  Label: "Built with" — DM Mono 10px rgba(255,255,255,0.3), mb-2
  Three pills stacked:
    "React" — border 1px rgba(124,58,237,0.4), bg rgba(124,58,237,0.08), text #A78BFA, 11px, px-3 py-1, rounded-full
    "Node.js" — border 1px rgba(16,185,129,0.3), bg rgba(16,185,129,0.06), text #6EE7B7, same sizing
    "Stripe" — border 1px rgba(245,158,11,0.3), bg rgba(245,158,11,0.06), text #FCD34D, same sizing
  Framer: y [0, 10, 0], 4.8s, infinite, starts delayed 1.2s

Remove: All Three.js imports, canvas element, and any @react-three/fiber or @react-three/drei imports from this component. Remove those packages from package.json too if they're only used here.

Do not touch any other component or file. Only the hero right side.
```

---

## PROMPT 2 — COLOR SYSTEM FIX
### Run this after Prompt 1 is done and looks good

```
The website has a color balance problem. Some dark sections feel too black and flat. Some light sections feel too white and disconnected. Fix this across the whole site.

Here is the updated color system. Apply these changes:

DARK SECTIONS — add more depth:
Current problem: pure flat dark (#07080E or #0D0E18) with no variation
Fix: Add a very subtle blue-purple undertone to dark backgrounds

Update these CSS variables / Tailwind tokens:
  bg-page: #07080E → keep as base
  bg-card: #0D0E18 → add subtle purple: use #0D0E1C
  bg-raised: #131524 → keep
  
  Add a noise texture to all dark sections:
  In index.css, add this utility class:
  .dark-texture {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
  }
  Apply .dark-texture to: Hero section, Stats section, Closing CTA section, Footer

LIGHT SECTIONS — warm up slightly:
Current problem: #F6F5FF looks cold/purple and doesn't feel warm or welcoming
Fix: 
  Light section bg: #F6F5FF → #F8F6FF (slightly warmer purple-white)
  Light section cards: white (#FFFFFF) → #FEFEFE (unchanged, keep white)
  
  Add a very subtle gradient to light section backgrounds:
  background: linear-gradient(180deg, #F8F6FF 0%, #F4F2FF 100%)
  Apply to: Services section, Portfolio section, Testimonials section

BORDERS — make more visible:
  Dark section borders: rgba(255,255,255,0.07) → rgba(255,255,255,0.09)
  Light section borders: rgba(0,0,0,0.08) → rgba(0,0,0,0.1)

TRANSITION BETWEEN SECTIONS:
  Where a dark section meets a light section, add a 1px border:
  border-bottom: 1px solid rgba(0,0,0,0.08) on dark sections that precede light ones
  This prevents the jarring jump between bg colors

ACCENT GRADIENT — make slightly richer:
  Current: linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)
  Updated: linear-gradient(135deg, #6D28D9, #9333EA, #DB2777)
  Slightly deeper — more premium, less neon
  Update in tailwind.config or wherever this gradient is defined
  Also update the hero H1 "Builds." text gradient to match

Apply all changes to CSS variables and Tailwind config only.
Do not rebuild any components — just update color values.
After changes, check that navbar, announcement bar, all buttons, and gradient text still look correct.
```

---

## PROMPT 3 — FAQ SECTION
### Add to homepage (between Testimonials and CybiLearn) and Services page

```
Add a FAQ section to the homepage. Insert it between the Testimonials section and the CybiLearn section in Home.tsx.

Create file: src/components/sections/FAQ.tsx

DESIGN:
Background: #07080E (dark, same as hero)
Border-top: 1px solid rgba(255,255,255,0.06)
Padding: 100px top/bottom

Layout (max-w 960px centered):
  Section label: "FAQ" — DM Mono 11px uppercase, violet color, with left 16px line
  H2: "Questions We Get Asked" — Bricolage Grotesque 800, white, clamp(36px,5vw,56px)
  Subtext: "Straight answers. No runaround." — Plus Jakarta 400 16px text-muted, mt-3

Accordion list (mt-12):
  Each item: border-bottom 1px rgba(255,255,255,0.06)
  Last item: no border

ACCORDION BEHAVIOR (Framer Motion AnimatePresence):
  Default: only question visible
  On click: answer expands with height animation (overflow hidden, animate height)
  Open state: chevron rotates 180deg
  Only one item open at a time

QUESTION ROW:
  padding: 24px 0
  cursor pointer
  Left: question text — Plus Jakarta 600 17px white
  Right: chevron SVG (inline, 20px, rgba(255,255,255,0.4))
  On hover: question color → #A78BFA (purple)

ANSWER:
  padding: 0 0 24px 0
  Plus Jakarta 400 15px rgba(255,255,255,0.55) line-height 1.75
  max-w 720px

FAQ CONTENT (use this exact content):

Q1: "Do you work with clients who already have a website?"
A1: "Yes. Most of our clients come to us with an existing site that isn't working — whether it's outdated, slow, or just not converting. We audit what's there, tell you honestly what's worth keeping, and rebuild from there. No pressure to start from scratch if you don't need to."

Q2: "What do you need from me to get started?"
A2: "Just a clear idea of what you're trying to achieve — not a technical brief. Tell us what your business does, who your customers are, and what problem you're trying to solve. We handle the rest. We'll ask the right questions during discovery."

Q3: "How do you price your work?"
A3: "Every project is scoped individually because every project is different. After your initial brief, we'll tell you honestly whether it's a $2,000 job or a $15,000 job — and why. We don't have packages because packages exist for agencies, not for clients."

Q4: "Do you offer support after launch?"
A4: "Yes. Every project includes a handoff period where we make sure you understand what was built and how to manage it. For ongoing support, maintenance, or future work, we offer flexible arrangements — no lock-in contracts."

Q5: "How long does a project take?"
A5: "A focused website: 3–5 weeks. An e-commerce system: 6–10 weeks. A web application: 8–14 weeks. These are real timelines, not sales timelines. If something will take longer, we tell you before we start."

Q6: "What makes CybiconZ different from other agencies?"
A6: "You work directly with the person making decisions — not an account manager who relays messages. Every project gets documented and handed over properly. And if something isn't right for your goals, we'll tell you before you pay for it."

Also add this same FAQ to the Services page (/services) at the bottom, before the closing CTA.
```

---

## PROMPT 4 — BLOG / NEWS PAGE + HOMEPAGE TEASER
### New page + section

```
Create a Blog/News feature for CybiconZ. This shows the agency is active, thinking, and worth following.

STEP 1 — Create the data file:
src/data/posts.ts

Content:
export const posts = [
  {
    slug: 'what-to-ask-before-hiring-an-agency',
    title: 'What to Ask Before Hiring a Digital Agency',
    excerpt: 'Most businesses get burned by agencies because they asked the wrong questions upfront. Here are the five questions that separate serious agencies from time-wasters.',
    category: 'Advice',
    date: '2024-11-15',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    // TODO: Add full article content
  },
  {
    slug: 'why-your-website-is-not-converting',
    title: "Why Your Website Isn't Converting (And How to Fix It)",
    excerpt: "Traffic without conversion is just vanity. We break down the five most common reasons business websites fail to turn visitors into clients — and what to do about each one.",
    category: 'Strategy',
    date: '2024-10-28',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    // TODO: Add full article content
  },
  {
    slug: 'ecommerce-mistakes-that-cost-you-sales',
    title: '7 E-Commerce Mistakes That Cost You Sales Every Day',
    excerpt: "After building global e-commerce systems, we've seen the same mistakes repeated. From checkout friction to currency display — here's what kills conversions.",
    category: 'E-Commerce',
    date: '2024-10-10',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    // TODO: Add full article content
  },
  {
    slug: 'cybiconz-building-in-public',
    title: 'Building in Public: How CybiconZ Is Growing',
    excerpt: "We're a small team building something serious. This is an honest update on where we are, what we've built, and where we're going — no inflated stats, no startup fluff.",
    category: 'Company',
    date: '2024-09-22',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    // TODO: Add full article content
  },
]

STEP 2 — Create the Blog page:
src/pages/Blog.tsx — route: /blog

PAGE DESIGN:
Background: #F8F6FF (light)
Hero area (dark, #07080E):
  padding: 80px top/bottom
  Label: "Blog & News" — DM Mono, violet
  H1: "Insights from the Build" — Bricolage 800, white, clamp(40px,6vw,72px)
  Sub: "Practical thinking on digital products, agency work, and growing a business online."

Posts grid (light bg, padding 80px top/bottom):
  max-w 1280px centered
  3-column grid desktop, 2 tablet, 1 mobile
  gap: 24px

Each post card (bg white, rounded-2xl, overflow hidden, border shadow):
  Image: aspect 16/9, overflow hidden, img scales 1.06 on hover (500ms transition)
  Category pill: top-left on image, bg rgba(0,0,0,0.5) backdrop-blur, white 11px
  Date: 12px DM Mono rgba(0,0,0,0.35) mt-4 px-6
  Title: Bricolage 700 20px #0A0B14, px-6 mt-2, line-height 1.3
  Excerpt: Plus Jakarta 400 14px #6B6E8F, px-6 mt-3, line-height 1.65, 3 lines max (overflow ellipsis)
  Bottom row: px-6 pb-6 mt-4 flex justify-between items-center
    Read time: DM Mono 11px muted
    "Read more →" link: accent-gradient text, 700 13px

STEP 3 — Add /blog to Navbar:
In the navbar, add "Blog" link after "Careers"
Also add it to the Footer under Company column

STEP 4 — Add blog teaser to Homepage:
Add a "Latest Thinking" section to Home.tsx
Insert it between CybiLearn section and Closing CTA.

HOMEPAGE TEASER DESIGN:
Background: #F8F6FF (light)
Border-top: 1px rgba(0,0,0,0.06)
Padding: 80px top/bottom

Header row: 
  Left: eyebrow "Blog & News" (amber) + H2 "Latest Thinking" Bricolage 800 dark
  Right: "View all posts →" link

Show only first 3 posts from posts.ts
Same card design as blog page
On click: navigate to /blog/[slug]

STEP 5 — Create individual post page:
src/pages/BlogPost.tsx — route: /blog/:slug

Design: clean reading layout, max-w 720px centered
Dark header bar with post title and metadata
Light body area
Content: show post.excerpt + "Full article coming soon. Subscribe to be notified." if no content
Back link: "← Back to Blog"
```

---

## PROMPT 5 — RICHER SECTION CONTENT
### More information in existing sections

```
Several sections on the homepage need more content depth. Update each one:

1. SERVICES SECTION — Add a "View all services →" link and a 5th service card:
   Add Applications/Web Apps as a 5th card (Web Applications, gradient cyan→emerald)
   Currently 4 cards → make it 4 on desktop but show 5th in a second row or change to 3+2 layout

2. PORTFOLIO SECTION — Add outcome metrics to the featured project card:
   Below the description in the LwangBlack card, add 3 metric pills:
   "Multi-country" (amber pill) + "Multi-currency" (violet pill) + "Live since 2024" (emerald pill)
   Each pill: small, bg rgba color matching its color, rounded-full, DM Mono 11px

3. STATS SECTION — Add sub-labels that mean something:
   "2+" Projects → sub: "Real clients, real outcomes"
   "100%" Delivery Rate → sub: "No abandoned projects ever"
   "1 day" Response → sub: "Guaranteed, always"
   "2022" Founded → sub: "Building since"

4. PROCESS SECTION — Add a "What happens next?" micro-section:
   After the 4 steps (still in the right light column), add a thin card at the bottom:
   bg rgba(124,58,237,0.05), border 1px rgba(124,58,237,0.15), rounded-xl, p-4
   Text: "Ready to start? →" with a link to /contact
   This creates a natural flow from process → action

5. TESTIMONIALS SECTION — Add a note below the 3 cards:
   Centered, 14px text-muted italic:
   "Testimonials collected from real clients. Names withheld by client preference."
   This is honest and actually increases trust more than fake full names would

6. FOOTER — Add a "Built by CybiconZ" credit in the bottom bar:
   In the footer bottom bar, add center text:
   "Designed and built by CybiconZ" — 12px rgba(255,255,255,0.15)
   This is subtle but reinforces the brand

Do each of these one at a time and confirm each looks correct before proceeding.
```

---

## PROMPT 6 — HERO HEADLINE FIX
### The text-gradient on "Builds." may look washed out. Fix it.

```
The hero headline second line "Builds." uses a CSS gradient for the text color.
Depending on the font rendering and background, gradient text can look washed out or hard to read.

Check the current rendering. If it looks weak, apply this fix:

Option A (if gradient looks good — just enhance):
  Update the gradient: background: linear-gradient(135deg, #9333EA 0%, #C026D3 50%, #DB2777 100%)
  Make it slightly brighter — more magenta in the middle

Option B (if gradient looks washed out or hard to read):
  Remove the gradient text entirely
  Replace with: color: #A855F7 (solid purple) — clean, premium, readable
  This is actually more premium than gradient text — gradient text is overused

Also check the hero tagline italic text:
  "Not a template shop. Not a disappearing freelancer."
  This should be clearly readable. If it blends into the background:
  Update color from rgba(255,255,255,0.5) to rgba(255,255,255,0.65)
  Also verify the left border (3px solid #7C3AED) is visible
```

---

## FULL ROADMAP — WHAT COMES AFTER THESE 6 PROMPTS

### Week 1 (current) — Foundation fixes
- Prompt 1: Hero redesign (replace Three.js with device mockup)
- Prompt 2: Color system fix
- Prompt 3: FAQ section
- Prompt 4: Blog page
- Prompt 5: Richer content
- Prompt 6: Hero text fix

### Week 2 — Page depth
- About page: add real founder section, values, ZenHost story, timeline
- Services page: full detail for each service (who it's for, what's included, timeline, real example)
- Contact page: verify form works, add success state
- Case studies: write real LwangBlack and Johnnies Liquor content

### Week 3 — Polish
- Mobile audit: every page at 375px
- Animation review: too much? too little? timing feels right?
- Typography audit: every heading level consistent?
- Image audit: any placeholder images that need real ones?

### Week 4 — Content & Launch
- Replace all // TODO placeholder content with real copy
- Add real founder photo (About page)
- Add real project screenshots (Portfolio)
- Real testimonials (when available)
- Meta tags, OG images, favicon
- Performance check (Lighthouse score > 90)
- Deploy to ZenHost

---

## RULES FOR WORKING WITH CLAUDE CODE

ONE PROMPT = ONE TASK. Never combine.

Good: "Add the FAQ section between Testimonials and CybiLearn"
Bad: "Add FAQ, fix colors, and update the blog and also make the hero better"

After each prompt:
1. Run the dev server
2. Look at what changed
3. Tell Claude exactly what's wrong (specific, visual)
4. Fix it before moving to next prompt

Never move to Prompt 2 before Prompt 1 looks right.

The six prompts above are in the right order. Start with Prompt 1.
