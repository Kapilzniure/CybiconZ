# CybiconZ — Week 2 Prompts
# About, Services, Contact Form, Case Studies
# All content based on real founder information

---

## PROMPT 1 — ABOUT PAGE

```
Read CLAUDE.md and docs/DESIGN_SYSTEM.md before starting.

Rebuild the About page completely at src/pages/About.tsx.
Use only real content provided below. No placeholder text.

---

REAL CONTENT TO USE:

Founder: Niure Kapil
Location: Tokyo, Japan
Background: Self-taught developer and designer. Started with HTML, CSS, JavaScript and
built projects independently. Over time became focused on understanding how digital
products actually help businesses — not just how they look.
Why CybiconZ: Noticed most websites either look good but don't perform, or are too
technical and confusing for business owners. Started CybiconZ to build simple, clear,
and effective digital systems that actually help businesses grow.

---

PAGE STRUCTURE:

SECTION 1 — HERO (dark bg #07080E, padding-top 140px pb-24):
  Max-w 1280px centered
  Two columns: text left (60%), photo right (40%)

  Left:
    Eyebrow: "About us" — DM Mono, violet color, with left line
    H1: "A focused team." — Bricolage 800, white, clamp(48px,7vw,88px), tracking -0.04em
    H1 line 2: "Building real products." — same style
    Body paragraph 1 (Plus Jakarta 16px, text-muted, leading-relaxed, max-w-lg, mt-6):
      "CybiconZ is a digital agency based in Tokyo, Japan. We build websites,
      e-commerce systems, and applications for businesses that need their digital
      presence to actually work — not just exist."
    Body paragraph 2:
      "The agency is led directly by the founder. Every project gets personal
      attention from the person making decisions — not an account manager, not
      outsourced development."

  Right:
    Placeholder image card (for now — real photo to be added):
    bg #0D0E1C, border 1px rgba(255,255,255,0.08), rounded-3xl, overflow hidden
    aspect-ratio 3/4
    Image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80
    Overlay gradient bottom 30%: linear-gradient(to top, #07080E, transparent)
    // TODO: Replace with real founder photo
    Small badge bottom-left of image:
      bg rgba(13,14,28,0.9), border rgba(255,255,255,0.08), rounded-xl, p-3, backdrop-blur
      "Niure Kapil" — Bricolage 700 14px white
      "Founder, CybiconZ · Tokyo" — Plus Jakarta 12px text-muted

SECTION 2 — THE STORY (light bg #F8F6FF, py-24):
  Max-w 960px centered
  
  Eyebrow: "The story" — DM Mono, amber color
  H2: "Why CybiconZ exists." — Bricolage 800, dark, clamp(36px,5vw,56px)
  
  Two-column text layout (gap 48px):
  Left column:
    "Most businesses face the same problem: their website either looks good but
    doesn't convert, or it's functional but confusing for the people who need
    to use it. Either way, it's not doing what it should."

    "I started CybiconZ after noticing this gap repeatedly. Business owners
    were spending money on digital work and getting results that didn't match
    what they needed. The problem wasn't always the technology — it was the
    approach."

  Right column:
    "CybiconZ exists to build digital systems that are simple for the
    business owner to understand and effective for the customers who use them.
    No unnecessary complexity. No jargon. Just finished products that work."

    "We're based in Tokyo and work with clients globally. The team is
    small by design — focused work produces better results than
    large teams spread thin."

SECTION 3 — VALUES (dark bg #07080E, py-24):
  Max-w 1280px centered
  
  Eyebrow: "What we stand for" — DM Mono, cyan color
  H2: "Three things we never compromise on." — Bricolage 800, white

  3-column card grid (gap 24px, mt-16):

  Card 1 (bg #0D0E1C, border, rounded-2xl, p-8):
    Top accent bar: 3px, gradient violet→pink, rounded-full, w-12, mb-8
    Title: "We build things that work." — Bricolage 700 22px white, mb-4
    Body: "A design that looks good in Figma but breaks on mobile isn't finished.
    We build to completion — tested, functional, and ready for real users.
    Not demos. Not prototypes. Finished products."
    — Plus Jakarta 15px text-muted, line-height 1.75

  Card 2:
    Top accent: amber
    Title: "We're direct."
    Body: "If something won't serve your business goals, we say so before you pay
    for it. If a project is outside our current scope, we say that too. No
    runaround, no overselling. Honest communication at every stage."

  Card 3:
    Top accent: emerald
    Title: "We take handoffs seriously."
    Body: "Every project ends with documentation. You should be able to
    understand what was built, how it runs, and how to manage it — without
    depending on us for everything. You own what we build."

SECTION 4 — PARTNER (light bg #F8F6FF, py-20):
  Max-w 960px centered
  
  Eyebrow: "Infrastructure partner" — DM Mono, violet color
  H2: "We trust ZenHost." — Bricolage 800, dark, clamp(32px,4vw,48px)
  
  Two columns: text left (55%), visual right (45%)

  Left text:
    "For hosting and managed infrastructure on client projects, we work with
    ZenHost. It's a deliberate choice — infrastructure we've evaluated, tested,
    and stand behind."

    "When your project goes live, it lives on infrastructure we'd use ourselves.
    Not the cheapest option. Not a random hosting service. A vetted partner."

    Link: "Visit ZenHost →" — accent-gradient text, 700 14px, hover gap increases
    href="https://zenhost.com" target="_blank"

  Right:
    Card (bg white, border rgba(0,0,0,0.08), rounded-2xl, p-8, shadow):
    Server icon (inline SVG, 32px, violet color) mb-4
    "ZenHost" — Bricolage 800 24px dark
    "Managed hosting & infrastructure" — Plus Jakarta 14px muted, mb-6
    3 feature lines with checkmarks:
      "✓ Managed hosting" — 14px dark, mb-2
      "✓ Reliable uptime" — 14px dark, mb-2
      "✓ Infrastructure we've vetted" — 14px dark

SECTION 5 — CTA (dark #07080E, py-20):
  Centered, max-w-2xl
  
  H2: "Work with us." — Bricolage 800, white, clamp(36px,5vw,56px)
  Body: "Tell us about your project. We'll tell you honestly if we're the right fit."
  CTA: "Start a conversation →" — accent-gradient button
  Email below: hello@cybiconz.com — text-muted, hover white

Animations: all sections use whileInView, opacity 0→1, y 20→0, once:true
Cards: stagger 0.09s each
```

---

## PROMPT 2 — SERVICES PAGE

```
Read CLAUDE.md and docs/DESIGN_SYSTEM.md before starting.

Rebuild the Services page at src/pages/Services.tsx with full detail for each service.
Use real content below. No placeholder text except where marked // TODO.

---

PAGE STRUCTURE:

SECTION 1 — HERO (dark, pt-40 pb-24):
  Max-w 1280px centered

  Eyebrow: "Services" — DM Mono, violet
  H1: "What we build," — Bricolage 800, white, clamp(52px,8vw,96px), tracking -0.04em
  H1 line 2: "and how we build it." — same, opacity 0.7
  Body: "Every engagement is scoped to your situation — not a package from a dropdown."
  — Plus Jakarta 17px text-muted, max-w-lg, mt-6

SECTION 2 — SERVICE DETAIL BLOCKS (alternating layout, light bg #F8F6FF):
  Each service gets a full section with alternating text/image layout
  5 services total
  Odd services: text left, visual right
  Even services: text right, visual left

  For each service block (py-20, border-bottom 1px rgba(0,0,0,0.06)):

  Left/Right TEXT SIDE:
    Category badge: colored pill (matching service color)
    Service name: Bricolage 800, dark, clamp(32px,4vw,48px)
    "Who it's for": Plus Jakarta 600 13px uppercase tracking-wider, muted, mt-8 mb-3
    Who text: 15px dark-muted
    "What we deliver": same label style
    Delivery list: 4-5 items, each with colored dot + text, 15px dark-muted
    "Typical timeline": same label
    Timeline text: Bricolage 700 18px dark
    CTA: "Start this project →" colored text link with arrow

  Right/Left VISUAL SIDE:
    Image in rounded-2xl with perspective tilt (same as homepage service cards)
    transform: perspective(900px) rotateY(±8deg) rotateX(4deg) — direction flips with layout
    Image has gradient overlay at bottom

  SERVICE DATA:

  SERVICE 1 — Website Development
  Color: violet (#7C3AED)
  Image: https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80
  Who it's for: "Businesses that need to look and perform credibly online. If your
  current site is embarrassing, outdated, or simply not working — this is for you."
  What we deliver:
    · Discovery and goal-setting session
    · Custom visual design (not a template)
    · Responsive development — works on all devices
    · Content integration and copy review
    · Performance optimization before launch
    · Handoff documentation
  Timeline: 3 – 6 weeks
  
  SERVICE 2 — E-Commerce Systems
  Color: amber (#F59E0B)
  Image: https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80
  Who it's for: "Businesses selling products online — especially those with complex
  requirements like multiple markets, currencies, or delivery systems. If you need
  a real commercial infrastructure, not a basic shop template."
  What we deliver:
    · Full storefront design and development
    · Multi-country and multi-currency configuration
    · Payment gateway integration (Stripe, local options)
    · Delivery partner integrations
    · Admin system for managing products and orders
    · Mobile-first, performance-optimized
  Timeline: 6 – 10 weeks
  Real example note: "We are currently building this for LwangBlack Coffee —
  a global multi-country e-commerce platform." (italic, muted, small)

  SERVICE 3 — Web Applications
  Color: cyan (#06B6D4)
  Image: https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=700&q=80
  Who it's for: "Teams that need internal tools, client portals, booking systems,
  or dashboards. If you need something that does a specific job for your business
  and no off-the-shelf tool does it well enough."
  What we deliver:
    · Requirements mapping (no technical knowledge needed from you)
    · UI/UX design before development starts
    · Full-stack development
    · User testing and QA
    · Deployment and hosting setup
    · Documentation and handoff
  Timeline: 8 – 14 weeks

  SERVICE 4 — UI/UX Design
  Color: pink (#EC4899)
  Image: https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80
  Who it's for: "Businesses whose product exists but the interface is confusing,
  inconsistent, or losing users. Also for teams who want design completed before
  development begins — the right way to build."
  What we deliver:
    · User research and flow mapping
    · Wireframes and prototypes
    · Full interface design in Figma
    · Design system and component library
    · Developer handoff specifications
  Timeline: 4 – 8 weeks

  SERVICE 5 — Digital Marketing
  Color: emerald (#10B981)
  Image: https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=700&q=80
  Who it's for: "Selected clients — businesses that need to build or grow their
  digital presence alongside their web product. We take on marketing work when
  it connects directly to a digital product we've built or are building."
  What we deliver:
    · Social media strategy and content
    · Platform management and posting
    · Audience growth and engagement
    · Performance reporting
    · Content direction and brand voice
  Timeline: Ongoing, minimum 3 months
  Note: "We handled digital marketing for Johnnies Liquor alongside their
  website build." (italic, muted, small)

SECTION 3 — PROCESS (dark bg, reuse homepage process section component):
  Import and render the Process section component here
  Add heading above: "The same process, every project."

SECTION 4 — FAQ (reuse FAQ component from homepage):
  Import and render the FAQ component
  Different heading: "Common questions about our services."

SECTION 5 — CLOSING CTA (dark):
  H2: "Ready to scope something?"
  Body: "Tell us what you need. We'll tell you honestly what's involved,
  how long it takes, and whether we're the right fit."
  CTA: "Tell us about your project →"

All sections: whileInView animations, once:true, stagger on lists
```

---

## PROMPT 3 — CONTACT FORM WITH EMAILJS

```
Read CLAUDE.md before starting.

Set up the contact form on the Contact page to actually send emails using EmailJS.
This requires both package setup and page rebuild.

STEP 1 — Install EmailJS:
Run: npm install @emailjs/browser

STEP 2 — Create EmailJS config file:
Create: src/lib/emailjs.ts

Content:
export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',     // TODO: Replace after EmailJS setup
  templateId: 'YOUR_TEMPLATE_ID',   // TODO: Replace after EmailJS setup
  publicKey: 'YOUR_PUBLIC_KEY',     // TODO: Replace after EmailJS setup
}

// EmailJS setup instructions:
// 1. Go to https://www.emailjs.com and create free account
// 2. Add Email Service → connect Gmail → use kapilniure4@gmail.com
// 3. Note the Service ID
// 4. Create Email Template with these variables:
//    {{from_name}}, {{from_company}}, {{from_email}}, {{service_needed}},
//    {{project_description}}, {{budget}}, {{timeline}}, {{to_email}}
// 5. Note the Template ID
// 6. Go to Account → API Keys → note your Public Key
// 7. Replace the three TODO values above with real IDs

STEP 3 — Rebuild Contact page at src/pages/Contact.tsx:

PAGE LAYOUT:
Background: #07080E
Padding-top: 140px

HERO (dark, pb-16):
  Max-w 1280px centered
  Eyebrow: "Contact" — DM Mono, violet
  H1: "Let's build something together." — Bricolage 800, white, clamp(40px,6vw,72px)
  Body: "Tell us about your project. We respond within one business day.
  If we're not the right fit, we'll say so honestly."
  — Plus Jakarta 16px text-muted, max-w-md, mt-4

MAIN CONTENT (py-16):
  Max-w 1280px centered
  Two columns: left 40% (contact info), right 60% (form)
  Gap: 64px

LEFT COLUMN — Contact info:
  Three contact cards stacked, gap 14px:

  Card 1 — Email:
    bg #0D0E1C, border rgba(255,255,255,0.08), rounded-2xl, p-6
    Icon area: 40px square, bg rgba(124,58,237,0.1), rounded-xl, centered
      SVG: envelope (inline, 20px, #9333EA)
    Label: "Send a brief" — DM Mono 11px uppercase text-muted, mt-4, mb-1
    Value: "kapilniure4@gmail.com" — Plus Jakarta 600 15px white
    Sub: "Reply within 1 business day" — 12px text-muted

  Card 2 — Status:
    Same card style
    Icon: green pulse dot (animated, 12px)
    Label: "Current status"
    Value: "Available for new projects" — color #10B981
    Sub: "Taking on new clients now"

  Card 3 — Location:
    Icon: location SVG
    Label: "Based in"
    Value: "Tokyo, Japan" — white
    Sub: "Working with clients globally"

  Trust pills below cards (flex wrap, gap 10px, mt-6):
    "100% private" · "No spam" · "1 day reply" · "Data stays private"
    Each: bg rgba(255,255,255,0.04), border rgba(255,255,255,0.07), rounded-full
    px-4 py-2, Plus Jakarta 12px text-muted
    Small checkmark (✓) in emerald before each

RIGHT COLUMN — Form:
  bg #0D0E1C, border rgba(255,255,255,0.08), rounded-3xl, p-10

  Title: "Start a Project" — Bricolage 700 24px white, mb-8

  FORM FIELDS (use React Hook Form):

  Row 1 (2 cols, gap 16px):
    - Name: label "Your name" | input placeholder "Niure Kapil"
    - Company: label "Business name" | placeholder "LwangBlack Coffee"

  Row 2 (full width):
    - Email: label "Email address" | placeholder "you@company.com" | type email | required

  Row 3 (full width):
    - Service select: label "What do you need?"
      Options: 
        "Select a service..." (disabled, default)
        "Website Development"
        "E-Commerce System"
        "Web Application"
        "UI/UX Design"
        "Digital Marketing"
        "Not sure yet — let's talk"

  Row 4 (full width):
    - Textarea: label "Tell us about your project"
      placeholder "Describe what you're building, what problem you're solving,
      and what you need from us..."
      rows: 5
      required

  Row 5 (2 cols):
    - Budget select: label "Approximate budget"
      Options: "Under $2,000" | "$2,000 – $5,000" | "$5,000 – $15,000" | "$15,000+" | "Not sure yet"
    - Timeline select: label "When do you need this?"
      Options: "As soon as possible" | "1 – 3 months" | "3 – 6 months" | "Just exploring"

  Submit button (full width, mt-6):
    bg: accent-gradient
    text: "Send Project Brief →"
    Bricolage 700 16px white
    py-4 rounded-xl
    shadow: 0 8px 32px rgba(109,40,217,0.35)
    hover: translateY(-2px), shadow increases
    disabled state: opacity 0.6, cursor not-allowed (while sending)

  FORM STATES:

  IDLE state: show form as above

  SENDING state (when submit clicked):
    Disable all inputs and button
    Button text changes to "Sending..." with a subtle spinner (CSS animation)
    spinner: 16px circle, border 2px, border-top white, border-rest transparent, rotates

  SUCCESS state (replace form content, keep card):
    Center content vertically
    Large checkmark SVG (48px, emerald color, animated: scale 0→1 with spring)
    H3: "Brief received." — Bricolage 800 28px white, mt-6
    Body: "We'll review it and be in touch within one business day."
    — Plus Jakarta 16px text-muted, mt-3
    Small note: "Sent to kapilniure4@gmail.com" — 13px text-muted, mt-2

  ERROR state (if EmailJS fails):
    Keep form visible
    Show error card above submit button:
    bg rgba(239,68,68,0.08), border rgba(239,68,68,0.2), rounded-xl, p-4
    Text: "Something went wrong. Please email us directly at kapilniure4@gmail.com"
    — 14px #FCA5A5

  FORM LOGIC (React Hook Form + EmailJS):
  import { useForm } from 'react-hook-form'
  import emailjs from '@emailjs/browser'
  import { EMAILJS_CONFIG } from '@/lib/emailjs'

  On submit:
  1. Validate all required fields (name, email, project description)
  2. Set state to 'sending'
  3. Call emailjs.send() with form data
  4. On success: set state to 'success'
  5. On error: set state to 'error'

  Field styling (all inputs/selects/textarea):
    bg rgba(255,255,255,0.04)
    border 1px rgba(255,255,255,0.08)
    border-radius 10px
    padding: 12px 16px
    color white
    font: Plus Jakarta 14px
    outline none
    transition border-color 200ms
    focus: border-color rgba(124,58,237,0.5), bg rgba(255,255,255,0.06)
    placeholder: text-muted color

  Labels: DM Mono 11px uppercase tracking-wider text-muted, display block, mb-2

Animations:
  Page entry: stagger left column cards and right column form
  Success state: spring animation on checkmark
  All whileInView with once:true
```

---

## PROMPT 4 — CASE STUDIES (LwangBlack + Johnnies)

```
Read CLAUDE.md and docs/DESIGN_SYSTEM.md before starting.

Update the two case study pages with real content.
The projects are both in progress — frame them as current work, not completed.
This is more honest and actually more credible.

Update src/data/projects.ts with this complete data:

export const projects = [
  {
    slug: 'lwangblack',
    name: 'LwangBlack Coffee',
    sector: 'Coffee Brand',
    year: '2024',
    service: 'E-Commerce System',
    serviceColor: '#F59E0B',
    status: 'In Development',
    statusColor: '#F59E0B',
    outcome: 'Building a global e-commerce infrastructure with multi-country support, multi-currency checkout, and delivery integrations.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
    tags: ['E-Commerce', 'Multi-Country', 'Multi-Currency', 'Delivery Integration'],
    featured: true,

    situation: 'LwangBlack Coffee needed a digital infrastructure that could operate globally — not a basic online shop, but a full commercial system capable of handling different countries, currencies, and delivery partners from a single platform.',

    challenge: 'Building for multiple countries means more than just translating a website. It means country-specific pricing, currency conversion, different delivery partners per region, and an admin system that the team can actually manage without technical help.',

    approach: 'We are building the system in layers. The foundation is a mobile-first storefront designed for clarity — no confusion at checkout, no unnecessary steps. On top of that, we are building the multi-country configuration, payment gateway integration, and delivery partner hooks. An admin role system gives the LwangBlack team full control without needing a developer for every change.',

    inProgress: true,
    inProgressNote: 'This project is currently in active development. The architecture is complete and core features are being built and tested.',

    delivering: [
      'Global e-commerce storefront (mobile-first)',
      'Multi-country support with localized experiences',
      'Multi-currency pricing and checkout',
      'Country-based pricing configuration',
      'Multiple delivery partner integrations',
      'Role-based admin system',
      'Performance-optimized across all markets',
    ],
  },
  {
    slug: 'johnnies-liquor',
    name: 'Johnnies Liquor',
    sector: 'Liquor Retail',
    year: '2024',
    service: 'Website + Digital Marketing',
    serviceColor: '#EC4899',
    status: 'In Progress',
    statusColor: '#EC4899',
    outcome: 'Building consistent digital presence through website development and active social media management.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80',
    tags: ['Website', 'Digital Marketing', 'Social Media', 'Brand Consistency'],
    featured: false,

    situation: 'Johnnies Liquor had an inconsistent online presence. No structured digital strategy, irregular social media, and a website that did not reflect the quality of the business.',

    challenge: 'For a retail business, digital presence is how people find you and decide whether to trust you before they walk in. Inconsistency — in posting, in branding, in the website — reads as unprofessional. The fix is not dramatic. It is consistent, structured, and on-brand.',

    approach: 'We built a clean, modern website that reflects the business properly. Alongside the site, we handle their social media — consistent posting, on-brand content, and a strategy focused on building a real audience rather than chasing vanity metrics.',

    inProgress: true,
    inProgressNote: 'Website is live. Digital marketing is ongoing — we manage their social media and digital presence actively.',

    delivering: [
      'Custom website — clean, modern, user-friendly',
      'Social media management and content creation',
      'Consistent brand voice across all platforms',
      'Digital marketing strategy',
      'Regular performance reviews',
    ],
  },
]

---

Now rebuild src/pages/CaseStudy.tsx to render this data properly.

PAGE STRUCTURE (renders from projects data by slug):

HERO SECTION (dark #07080E, pt-40 pb-0):
  Max-w 1280px centered

  Top row: back link "← Work" + status badge
  Status badge: if inProgress:
    bg rgba(color,0.1), border rgba(color,0.2), rounded-full, px-4 py-1.5
    Small dot (animated pulse) + "In Development" or "In Progress"
    Color matches project.statusColor

  Project name: Bricolage 800, white, clamp(52px,8vw,96px), tracking -0.04em, mt-6
  Service + Sector + Year:
    DM Mono 13px text-muted
    "E-Commerce System · Coffee Brand · 2024"

  If inProgress — honest banner (important):
    mt-8, bg rgba(245,158,11,0.06), border 1px rgba(245,158,11,0.15)
    border-radius 12px, p-5
    Icon: info circle SVG (amber, 20px)
    Text: "This project is currently in active development.
    Case study content reflects work in progress — outcomes and final results
    will be documented at completion."
    Plus Jakarta 14px, rgba(245,158,11,0.8)

  Full-width image below hero text:
    mt-12, rounded-t-3xl, overflow hidden
    aspect-ratio: 21/9 on desktop, 16/9 on mobile
    Image fills fully, object-fit cover
    Gradient overlay top: linear-gradient(to bottom, #07080E 0%, transparent 30%)

CONTENT SECTION (light bg #F8F6FF, py-20):
  Two columns: sidebar left (30%), main content right (70%)
  Max-w 1280px centered, gap 64px

  SIDEBAR:
    Sticky (top: 100px)
    "Project details" — DM Mono 11px uppercase text-dark-muted, mb-6

    Detail rows:
    Each: border-bottom 1px rgba(0,0,0,0.07), py-4
    Label: DM Mono 11px uppercase #6B6E8F, mb-1
    Value: Plus Jakarta 600 14px #0A0B14

    Show: Service / Sector / Year / Status / Timeline (if available)

    "What we're building" label — DM Mono 11px uppercase, mt-8, mb-4
    Delivery list: each item with colored checkmark dot
    Plus Jakarta 14px #0A0B14, leading-relaxed

  MAIN CONTENT:

  Block 1 — "The situation":
    Label: DM Mono 11px uppercase, project color, mb-3
    H3: "What was needed" — Bricolage 700 28px dark
    Body: project.situation — Plus Jakarta 16px #444, leading 1.8

  Block 2 — "The challenge":
    Same label style: "The challenge"
    H3: "What made it complex"
    Body: project.challenge

  Block 3 — "Our approach":
    Label: "How we approached it"
    H3: "The build process"
    Body: project.approach

  Divider: 1px rgba(0,0,0,0.08), my-12

  Block 4 — What we're delivering:
    H3: "What we're building" (or "What was delivered" if complete)
    Delivery list: each item in a card
    bg white, border rgba(0,0,0,0.06), rounded-xl, p-4, mb-3
    Left: small colored circle + Plus Jakarta 500 15px dark

CTA SECTION (dark #07080E, py-20):
  Centered, max-w 2xl

  H2: "Building something similar?" — Bricolage 800, white
  Body: "Tell us about your project. We'll tell you what's involved and whether we're the right fit."
  CTA: "Start a conversation →" — accent-gradient button
  Email: hello@cybiconz.com below

---

Also update the Work page (src/pages/Work.tsx):

Change the page headline to:
H1: "Work we're building." — (not "shipped" — these are in progress)
H2 line 2: "Current and recent projects."
Subtext: "We document our work honestly — including projects in active development."

This framing is more credible than pretending things are complete when they aren't.

Animations: all whileInView, once:true, standard entry pattern
```

---

## AFTER ALL 4 PROMPTS — UPDATE PROGRESS.MD

```
Update docs/PROGRESS.md.

Move these to ✅ COMPLETED:
- About page: real founder content, story, values, ZenHost partner section
- Services page: full detail for all 5 services
- Contact form: EmailJS integration, success/error states
- Case studies: real content for LwangBlack and Johnnies
- Work page: updated framing (in progress vs completed)

Add to 🐛 KNOWN ISSUES:
- EmailJS credentials not yet set up (see src/lib/emailjs.ts for instructions)
- Founder photo is placeholder (// TODO: real photo needed)
- Project screenshots are Unsplash placeholders (// TODO: real screenshots)
- Testimonials not yet collected

Update last updated date to today.
```

---

## ORDER TO RUN THESE

1. Prompt 1 (About page) — visual, no external dependencies
2. Prompt 2 (Services page) — visual, no external dependencies
3. Prompt 3 (Contact form) — requires EmailJS setup after running
4. Prompt 4 (Case studies) — data file update + page rebuild

After each prompt:
- Run npm run dev
- Open the page in browser
- Check on mobile (375px) — resize browser window
- If anything looks wrong, fix it before moving to next prompt

For the contact form specifically:
After Prompt 3 runs, go to emailjs.com and set up the account.
Then replace the three TODO values in src/lib/emailjs.ts.
Then test the form by submitting a real message to yourself.