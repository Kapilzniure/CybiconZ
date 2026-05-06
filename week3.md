# CybiconZ — Week 3 Prompts
# Polish, hero fix, service redesign, mobile audit

---

## PROMPT 1 — HERO FLOATING CARD POSITION FIX

```
Read CLAUDE.md before starting.

Two small position adjustments in the Hero section only.
Do not change anything else.

Find the hero right column in src/components/sections/Hero.tsx (or wherever HeroVisual/HeroRight is).

CHANGE 1 — Main device mockup:
The browser window mockup (the main device frame showing LwangBlack) needs to move up.
Find its container div and add or adjust: marginTop: '-40px' or translateY(-40px)
If it uses a Framer Motion animate prop, add y: -40 to the animate state.
Keep the float animation intact — just shift the baseline position upward by 40px.

CHANGE 2 — Floating badge card (the one showing "E-Commerce / LwangBlack Coffee / Global · Multi-currency · Delivered"):
This card needs to move down.
Find this specific floating card (it should be Card 1 / fb1 / the bottom-left badge).
Increase its bottom offset or decrease its translateY to push it further down.
Change: bottom: -20px → bottom: -48px (or equivalent in the positioning system used).
If positioned with Framer Motion, adjust the y translate value by +28px.

Show me the exact lines you changed after completing. Do not touch any other component.
```

---

## PROMPT 2 — SERVICES SECTION COMPLETE REDESIGN

```
Read CLAUDE.md and docs/DESIGN_SYSTEM.md before starting.

Replace the current services section entirely.
This is a complete redesign — remove all existing service card code and replace.

THE CONCEPT:
Instead of a card grid with 3D tilt, services are presented as full-width 
cinematic panels stacked vertically. Each service is a large dark panel with 
a background image, gradient overlay, and content. As each panel enters the 
viewport it slides up from below. On hover, the image zooms subtly and a 
colored accent line sweeps across the top. This is award-level design — 
immersive, dramatic, not a typical card grid.

FILE TO MODIFY: src/components/sections/Services.tsx (or ServicesSection.tsx)

---

SECTION WRAPPER:
background: #07080E
padding: 0 (panels are edge-to-edge, no padding on the section itself)
Section header is separate above the panels (has its own padding)

SECTION HEADER (padding: 80px 80px 60px, max-w 1280px centered):
  Eyebrow: "What we build" — DM Mono 11px uppercase, #7C3AED, with 16px left line
  H2: "Services" — Bricolage Grotesque 800, white, clamp(48px,7vw,96px), 
      tracking -0.04em, line-height 0.92
  Subtext right-aligned (position: absolute right 80px bottom-aligned with H2):
    "Every engagement scoped to your situation." — Plus Jakarta 400 16px text-muted
    Only visible on desktop (hidden mobile)

---

SERVICE PANELS:
5 panels total, stacked vertically, no gap between them
Each panel: position relative, overflow hidden

PANEL HEIGHT:
Desktop: 420px
Tablet: 360px  
Mobile: 280px

PANEL STRUCTURE (inside each panel):

1. Background image layer:
   position absolute, inset 0
   img: width 100%, height 100%, object-fit cover
   transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
   Default: transform scale(1.05) — slightly zoomed
   On panel hover: transform scale(1.12) — zooms further

2. Gradient overlay layer (position absolute, inset 0):
   background: linear-gradient(
     105deg,
     rgba(7,8,14,0.92) 0%,
     rgba(7,8,14,0.75) 40%,
     rgba(7,8,14,0.35) 70%,
     rgba(7,8,14,0.1) 100%
   )
   This creates a strong dark left side fading to show image on right

3. Colored accent line (position absolute, top 0, left 0, right 0, height 2px):
   background: service gradient (see per-service data below)
   transform: scaleX(0), transform-origin: left
   transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)
   On panel hover: transform scaleX(1)
   This is the signature hover effect — a line sweeps across the top

4. Content layer (position absolute, inset 0, display flex, align-items center):
   padding: 0 80px (desktop), 0 40px (tablet), 0 24px (mobile)
   max-w 1280px, margin 0 auto, width 100%
   
   Left side content (max-w 600px):

   SERVICE NUMBER + CATEGORY ROW (display flex, align-items center, gap 16px, mb-4):
     Number: "01" — DM Mono 13px, rgba(255,255,255,0.25)
     Separator: thin vertical line 1px, height 14px, rgba(255,255,255,0.15)
     Category: "Development" — DM Mono 11px uppercase tracking-wider, service accent color

   SERVICE NAME:
     Bricolage Grotesque 800
     Desktop: clamp(32px, 4vw, 52px)
     color: white
     letter-spacing: -0.03em
     line-height: 1.05
     margin-bottom: 16px
     transition: transform 0.3s ease
     On panel hover: translateX(8px) — subtle forward movement

   SERVICE DESCRIPTION:
     Plus Jakarta Sans 400, 15px, rgba(255,255,255,0.55), line-height 1.7
     max-width: 420px
     margin-bottom: 24px
     opacity 0 by default
     On panel hover: opacity 1, translateY(-4px)
     transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s

   BOTTOM ROW (display flex, align-items center, gap 24px):
     "Popular" badge IF applicable:
       bg service accent color at 15% opacity
       border 1px service accent color at 25% opacity  
       text: service accent color
       DM Mono 10px uppercase tracking-wider, px-3 py-1, rounded-full

     Arrow link "Learn more":
       display flex, align-items center, gap 8px
       Plus Jakarta 600 14px white
       opacity 0 by default
       On panel hover: opacity 1
       Arrow SVG: 16x16, white, transition gap increases on hover

   Right side (position absolute, right 80px):
     Large ghost service number — DM Mono 900, 180px
     rgba(255,255,255,0.03)
     line-height 1
     pointer-events none
     Hidden on mobile

5. Bottom border between panels:
   border-bottom: 1px solid rgba(255,255,255,0.05)
   Last panel: no border

---

SCROLL ENTRANCE ANIMATION (Framer Motion):
Each panel uses whileInView with once: true

Panel entrance — NOT a simple fade up. Use this sequence:
initial: { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" }
animate: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }
transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0 }
viewport: { once: true, margin: "-80px" }

Each panel animates independently as it enters viewport.
NO stagger between panels (each triggers on its own scroll entry).
This makes it feel cinematic as you scroll — panels reveal one by one.

The clipPath animation creates a "wipe up" reveal effect —
the panel appears to rise up from behind a mask. This is the award-level detail.

---

SERVICE DATA:

Panel 1 — Website Development
Number: 01
Category: Development
Color: #7C3AED (violet)
Gradient: linear-gradient(135deg, #7C3AED, #EC4899)
Image: https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&q=80
Description: "Custom design and development. Built to perform, not just to look good."
Popular: true

Panel 2 — E-Commerce Systems
Number: 02
Category: E-Commerce
Color: #F59E0B (amber)
Gradient: linear-gradient(135deg, #F59E0B, #10B981)
Image: https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80
Description: "Multi-currency storefronts, payment gateways, delivery integrations. Built for real commercial scale."
Popular: true

Panel 3 — UI/UX Design
Number: 03
Category: Design
Color: #06B6D4 (cyan)
Gradient: linear-gradient(135deg, #06B6D4, #7C3AED)
Image: https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80
Description: "User research, interface design, and design systems. Design that works for real people."
Popular: false

Panel 4 — Web Applications
Number: 04
Category: Development
Color: #10B981 (emerald)
Gradient: linear-gradient(135deg, #10B981, #06B6D4)
Image: https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1400&q=80
Description: "Client portals, dashboards, and custom tools. Built for the people who use them every day."
Popular: false

Panel 5 — Digital Marketing
Number: 05
Category: Marketing
Color: #EC4899 (pink)
Gradient: linear-gradient(135deg, #EC4899, #F59E0B)
Image: https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1400&q=80
Description: "Social media growth, content strategy, and analytics. For selected clients only."
Popular: false

---

After all panels, add a full-width row (dark, border-top rgba(255,255,255,0.06), py-6):
  max-w 1280px centered, display flex, justify-content space-between, align-items center
  Left: "5 services. Every one delivered end-to-end." — Plus Jakarta 500 14px text-muted
  Right: "View full breakdown →" link — accent-gradient text, 700 14px → /services

---

MOBILE (below 768px):
  Panel height: 260px
  Content padding: 0 24px
  Service name size: clamp(24px, 7vw, 36px)
  Description: hidden on mobile (too small to read)
  Ghost number: hidden
  Right padding adjustments applied
  Touch: tap panel → navigates to /services (no hover on mobile)
```

---

## PROMPT 3 — MOBILE AUDIT

```
Read CLAUDE.md before starting.

Perform a complete mobile audit. Test every page at 375px viewport width.
Fix all issues found. Work through pages in this order:
Home → Services → Work → About → Contact → CybiLearn → Careers

For each page, check and fix:

NAVBAR (all pages):
- Hamburger button visible and tappable (min 44x44px touch target)
- Logo not truncated
- Mobile menu opens/closes correctly
- All links work from mobile menu
- CTA button in mobile menu is full width

TYPOGRAPHY (all pages):
- No heading overflows its container horizontally
- Body text minimum 15px on mobile
- DM Mono labels minimum 11px, still readable
- Line-height feels comfortable (not too tight)
- No text gets cut off at screen edges

HERO (home page):
- Single column on mobile (stack left/right columns vertically)
- Device mockup: full width, not overflowing
- Floating cards: repositioned for mobile
  Card A (LwangBlack badge): below device, centered
  Card B (status pill): hide on mobile or show below headline
  Card C (tech stack): hide on mobile
- Stats row: 3 columns still work, or stack to 1 column if too cramped
- H1 sizes: verify clamp values produce readable sizes at 375px
  "CybiconZ" should be approximately 52-56px on mobile
  "Builds." same size
  "Digital Products." approximately 40-44px

SERVICES PANELS:
- Each panel height: 260px on mobile
- Text still readable over image
- Overlay gradient sufficient contrast
- Service name readable
- Number + category row visible

PROCESS SECTION:
- Split layout becomes stacked on mobile
  Left (dark): full width, padding 48px 24px
  Right (light): full width, padding 48px 24px
- Steps still have proper spacing
- Step numbers visible

STATS SECTION:
- 4 columns → 2x2 grid on mobile
- Numbers still large and impactful (min 48px)
- Dividers adapt to grid layout

PORTFOLIO:
- Featured project: stacks vertically (image top, info below)
- 3-col grid → 1 column on mobile
- Image aspect ratios maintained

TESTIMONIALS:
- 3-col grid → 1 column on mobile
- Cards full width with proper padding

CYBILEARN SPLIT:
- 50/50 split → stacked on mobile
- Left (dark) first, right (light) second

FOOTER:
- 4-col grid → 2x2 on tablet, 1 column on mobile
- Newsletter form: stacks to single column
- Input + button full width on mobile

CONTACT PAGE:
- 2-col layout → single column on mobile
- Form full width
- All inputs have adequate padding (44px min height for tap targets)
- Submit button full width

ABOUT PAGE:
- Hero: single column, image below text on mobile
- Values: 3-col → 1 column
- Partner: 2-col → stacked

GENERAL RULES:
- All horizontal padding minimum 20px on mobile
- No horizontal scroll anywhere
- No element wider than 100vw
- Touch targets minimum 44x44px for all interactive elements
- Images never overflow their containers

After completing each page, confirm:
"[Page name] mobile audit complete. Issues found and fixed: [list]"

Run through all pages before marking done.
```

---

## PROMPT 4 — ANIMATION AUDIT

```
Read CLAUDE.md before starting.

Review all animations across the site. The goal is animations that feel 
intentional and premium — I need too much animations, effects design...

AUDIT CHECKLIST — go through each of these:

1. HERO ENTRANCE SEQUENCE:
Check the stagger timing on hero text lines.
Should feel: confident, not rushed, not slow.
Correct timing if needed:
  Line 1 "CybiconZ": delay 0, duration 0.8s
  Line 2 "Builds.": delay 0.12s, duration 0.8s
  Line 3 "Digital Products.": delay 0.22s, duration 0.8s
  Tagline: delay 0.38s, duration 0.6s opacity fade
  Body: delay 0.48s, duration 0.6s
  CTAs: delay 0.58s, duration 0.6s
  Stats: delay 0.68s, duration 0.6s
  
  Easing for all: [0.22, 1, 0.36, 1] — snappy deceleration, feels intentional

2. FLOATING CARDS (hero):
Check all 3 float at different speeds and phases.
If they feel in sync, add offsets:
  Card A: y [0, -10, 0], duration 4.5s, delay 0
  Card B: y [0, -7, 0], duration 5.5s, delay 0.8s
  Card C: y [0, -12, 0], duration 3.8s, delay 1.5s

3. SERVICE PANELS entrance (new from Prompt 2):
Each should trigger independently as it enters viewport.
Check clipPath animation works smoothly.
If choppy, simplify to: initial opacity 0 y 40, animate opacity 1 y 0

4. SECTION ENTRIES across all pages:
All should use: opacity 0→1, y 20→0, duration 0.65s, ease [0.22,1,0.36,1]
Check these are NOT:
  - Too slow (above 0.8s feels sluggish)
  - Too fast (below 0.4s feels cheap)
  - Using bounce or spring (too playful for an agency)

5. CARD HOVER TRANSITIONS:
All interactive cards should have:
  transform: translateY(-6px), duration 0.25s ease
  box-shadow increase
  NO scale() transforms anywhere
  Check every card on: Services panels, Portfolio cards, Testimonials, Blog posts

6. NAVBAR scroll behavior:
  Should change background at exactly 80px scroll
  Transition: background 0.3s ease, backdrop-filter 0.3s ease
  Not instant, not slow

7. ANNOUNCEMENT BAR close:
  Height collapse: 0.3s ease
  Opacity fade: 0.3s ease  
  Both simultaneously

8. PROCESS section step hover:
  Number opacity 0.12→1: 0.2s ease
  Row background fill: 0.2s ease

REMOVE any animation that is:
- Looping/infinite except: floating hero cards, marquee strips, pulse dots
- On every scroll repeat (all whileInView must have once:true)
- A scale() transform on content cards
- Faster than 0.2s (feels glitchy)
- Slower than 0.9s for entrance (feels sluggish)

After audit, list: animations removed, animations adjusted, animations confirmed correct.
```

---

## PROMPT 5 — TYPOGRAPHY AUDIT

```
Read CLAUDE.md and docs/DESIGN_SYSTEM.md before starting.

Audit all typography across the site for consistency and hierarchy.
Fix everything that doesn't match the design system.

WHAT TO CHECK ON EVERY PAGE:

H1 HEADINGS (page heroes):
Should be: Bricolage Grotesque 800, clamp(52px,8vw,96px+), tracking -0.04em
Check: Home hero, Services hero, Work hero, About hero, Contact hero
Fix any that use wrong font, wrong weight, or wrong size

H2 HEADINGS (section headers):
Should be: Bricolage Grotesque 800, clamp(36px,5vw,64px), tracking -0.03em
Check every section H2 on homepage and inner pages
They should all feel the same weight and scale

H3 HEADINGS (card titles, sub-sections):
Should be: Bricolage Grotesque 700, 20-24px, tracking -0.01em
Check service names, card titles, value section titles

EYEBROW LABELS (above every H2):
Should be: DM Mono 400, 11-12px, uppercase, letter-spacing 0.12em, section accent color
With: 16px wide × 2px tall colored line before text
Check every section on every page has this treatment

BODY TEXT:
Should be: Plus Jakarta Sans 400, 15-17px, line-height 1.7-1.75
Color on dark: rgba(255,255,255,0.55) for secondary, rgba(255,255,255,0.75) for primary body
Color on light: #444 for body, #6B6E8F for secondary
Check all body paragraphs

METADATA/CAPTIONS:
Should be: DM Mono 400, 11-13px, rgba color depending on bg
Used for: project sectors, dates, tech tags, stats sub-labels
Check portfolio cards, case study headers, stats section

SPECIFIC FIXES TO VERIFY:
- Logo: "Cybicon" Bricolage 800 white + "Z" accent-gradient — correct on all pages
- Nav links: Plus Jakarta 500 14px — not bold, not light
- Footer column headers: DM Mono 11px uppercase
- Footer links: Plus Jakarta 400 13px
- Button text: Bricolage 700 (primary buttons) or Plus Jakarta 600 (secondary)
- Form labels: DM Mono 11px uppercase tracking-wider
- Form input text: Plus Jakarta 400 14px

COMMON ISSUES TO LOOK FOR:
- Any heading using Inter or system font (wrong)
- Body text using Bricolage (wrong — that's headline only)
- Labels not using DM Mono (wrong — all labels/eyebrows must be DM Mono)
- Inconsistent letter-spacing on eyebrows
- Heading sizes that jump too much between breakpoints

After audit, list every fix made with: [Page/Section] — [what was wrong] — [what it is now]
```

---

## PROMPT 6 — IMAGE AUDIT + PLACEHOLDER CLEANUP

```
Read CLAUDE.md and docs/CONTENT.md before starting.

Audit all images across the site. Identify every placeholder that needs 
a real image and mark clearly. Fix any broken images.

STEP 1 — Scan all image sources in the codebase:
Find every img tag and CSS background-image in src/
List them with their source URL and which component/page they're in

STEP 2 — Categorize each image:

KEEP AS-IS (Unsplash placeholders, visually appropriate):
- Service panel backgrounds (development, ecommerce, design, marketing images)
- Tech-related backgrounds that fit the context
These are fine temporarily until real project photos are available

MARK AS PRIORITY REPLACEMENT (add visible // TODO comment):
- Hero device mockup image (LwangBlack):
  File: wherever the browser mockup image is
  Add comment: // TODO PRIORITY: Replace with real LwangBlack Coffee screenshot
  
- About page founder photo:
  File: About.tsx or AboutHero component
  Add comment: // TODO PRIORITY: Replace with real photo of Niure Kapil

- Portfolio LwangBlack featured card:
  Add comment: // TODO PRIORITY: Replace with real LwangBlack project screenshot

- Portfolio Johnnies Liquor card:
  Add comment: // TODO PRIORITY: Replace with real Johnnies Liquor screenshot

- Case study pages (both):
  Add comments on main project images

MARK AS LOW PRIORITY (fine for launch):
- Blog post images (content not written yet anyway)
- Testimonial avatars (real photos needed with real testimonials)

STEP 3 — Fix any broken images:
If any image returns 404 or doesn't load, replace with the correct Unsplash URL
All Unsplash URLs should use format: https://images.unsplash.com/photo-[id]?w=800&q=80

STEP 4 — Create a TODO summary:
At the bottom of docs/PROGRESS.md, add a section:

## 🖼 IMAGES NEEDED (Priority order)
1. [ ] Niure Kapil founder photo → About page hero + floating card
2. [ ] LwangBlack Coffee screenshot → Hero mockup, Portfolio featured, Case study
3. [ ] Johnnies Liquor screenshot → Portfolio grid card, Case study
4. [ ] Real project screenshots for any future projects

Note: These are the only things blocking a "real" feel.
Everything else can launch with Unsplash placeholders temporarily.

STEP 5 — OG Image placeholder:
Create src/assets/og-image-placeholder.html with:
A simple dark HTML file showing:
  CybiconZ logo text (black bg, white text, colored Z)
  "Digital Agency · Tokyo" below
  1200x630px meta
// TODO: Replace with real designed OG image before launch

After audit, provide the full list of images found, their status, and all TODO comments added.
```

---

## ORDER TO RUN

1. Prompt 1 — Hero position fix (2 minutes, tiny change)
2. Prompt 2 — Services redesign (biggest change, do this second)
3. Prompt 3 — Mobile audit (after services look right on desktop)
4. Prompt 4 — Animation audit
5. Prompt 5 — Typography audit
6. Prompt 6 — Image audit

After each prompt: run dev server, check the result, confirm before next.

After all 6: update docs/PROGRESS.md
```
Update docs/PROGRESS.md.
Mark Week 3 items complete:
- Hero card positions adjusted
- Services section redesigned (cinematic panels)
- Mobile audit complete (list pages fixed)
- Animation audit complete
- Typography audit complete
- Image audit complete, TODO comments added
Add to Known Issues: EmailJS credentials still need setup if not done
Update last updated date.
```