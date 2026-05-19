# CybiconZ — Week 4: Full Dark + Connected + Inner Pages
# Run ONE prompt at a time. Check browser after each.

---

## PROMPT I — Convert ALL Light Sections to Dark

```
Read CLAUDE.md and docs/DESIGN_SYSTEM.md before starting.

Convert every light section on the site to dark.
No more white or #F4F2FF backgrounds anywhere.
The entire site becomes one continuous dark experience.

This is the single biggest visual change remaining.

DESIGN DIRECTION:
- All sections: dark backgrounds with varying depth
- Connection between sections: subtle colored glows, not background color changes
- Section separation: thin rgba(255,255,255,0.06) border-top lines
- The site should feel like moving through one continuous dark space

COLOR SYSTEM FOR DARK-ONLY:
bg-page:    #060608  ← deepest (hero, closing CTA, footer)
bg-section: #0A0A12  ← slightly lifted (alternating sections)
bg-card:    #0F0F1C  ← cards, raised surfaces
bg-raised:  #141428  ← hover states, inner cards

The alternation is now: deeper dark → slightly lighter dark → deeper dark
Not: dark → light → dark

STEP 1 — Update tailwind.config.ts or CSS variables:
Replace all light background values:
  --bg-light: was #F4F2FF → now #0A0A12
  --bg-light-card: was #FFFFFF → now #0F0F1C

Update the surface-light CSS class in index.css:
  .surface-light {
    background: #0A0A12;
    color: #F0EEFF;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
Remove: border-top: 1px solid rgba(0,0,0,0.08) (that was for light sections)

STEP 2 — Remove all SectionBridge components:
The gradient bridges between dark and light are no longer needed.
Find and remove all <SectionBridge /> components from Home.tsx.
The sections now connect seamlessly — no bridges needed.

STEP 3 — Update each formerly-light section:

SERVICES SECTION:
  Background: #0A0A12
  Section header text: stays white (#F0EEFF)
  Eyebrow: stays violet
  Panels: already dark — no change needed inside panels
  Add subtle top border: border-top: 1px solid rgba(255,255,255,0.05)

PROCESS SECTION:
  Was: 50/50 split (dark left, light right)
  Now: full dark, single background
  Background: #060608 (full width, no split)
  
  Left side (description): stays same content, same dark bg
  
  Right side (steps): convert from light to dark
    Container background: #0A0A12
    Step borders: rgba(255,255,255,0.06) instead of rgba(0,0,0,0.07)
    Step numbers: rgba(255,255,255,0.08) default → rgba(255,255,255,0.9) on hover
    Step names: #F0EEFF (was #0A0B14)
    Step descriptions: rgba(255,255,255,0.45) (was #6B6E8F)
    Step hover background: rgba(255,255,255,0.03) (was rgba(124,58,237,0.04))

PORTFOLIO SECTION:
  Background: #0A0A12
  Filter tabs (if not horizontal scroll yet):
    Active: bg white/10, border white/20, text white
    Inactive: border white/8, text white/30, hover border white/15
  Featured card: already dark bg — no change
  Smaller cards:
    Background: #0F0F1C (was white)
    Border: rgba(255,255,255,0.07)
    Category text: rgba(255,255,255,0.3)
    Project name: #F0EEFF
    Description: rgba(255,255,255,0.4)
  Placeholder cards:
    Background: rgba(255,255,255,0.02)
    Border: 1.5px dashed rgba(255,255,255,0.08)
    Ghost number: rgba(255,255,255,0.04)
    Text: rgba(255,255,255,0.2)

TESTIMONIALS SECTION:
  Background: #060608
  Cards (was white):
    Background: #0F0F1C
    Border: rgba(255,255,255,0.07)
    Top gradient bars: keep the colored gradients (tc1, tc2, tc3)
    Quote mark: rgba(255,255,255,0.06)
    Service badge: keep colored backgrounds (already low opacity)
    Quote text: rgba(255,255,255,0.65) italic (was #444)
    Author name: #F0EEFF (was #0A0B14)
    Author role: rgba(255,255,255,0.35) (was #999)
    Avatar border: rgba(255,255,255,0.1)

CYBILEARN SECTION:
  Was: 50/50 split (dark left, light right)
  Now: full dark, single layout
  Background: #060608 (full width)
  
  Left content: unchanged (was already dark)
  
  Right feature cards (was white):
    Background: #0F0F1C
    Border: rgba(255,255,255,0.07)
    Left border accent: keep the colors (clf1, clf2, clf3, clf4)
    Title: #F0EEFF
    Description: rgba(255,255,255,0.4)
    Hover: translateX(6px) + border left brightens slightly

ABOUT PAGE (all sections):
  Hero: already dark
  Story section: #0A0A12 (was #F4F2FF)
    Paragraph text: rgba(255,255,255,0.55)
  Values cards: #0F0F1C (was white), border rgba(255,255,255,0.07)
    Value names: #F0EEFF
    Value text: rgba(255,255,255,0.45)
  Partner section: #0A0A12
    ZenHost card: #0F0F1C, border rgba(255,255,255,0.07)
    Feature lines: rgba(255,255,255,0.5) with emerald checkmarks

SERVICES PAGE (detail blocks):
  Background: #0A0A12
  Each service block: alternates between #060608 and #0A0A12
  All text converts to dark theme values (same pattern as above)
  Image tilted cards: add dark overlay if images are too bright:
    After the img, add: background: rgba(6,6,8,0.3) as an overlay

BLOG TEASER (if it exists):
  Background: #060608
  Post cards:
    Background: #0F0F1C
    Border: rgba(255,255,255,0.07)
    Category on image: keep existing (dark overlay + white text)
    Date: rgba(255,255,255,0.25) DM Mono
    Title: #F0EEFF
    Excerpt: rgba(255,255,255,0.4)
    Read time: rgba(255,255,255,0.25)

FOOTER:
  Already darkest (#030305) — no change

STEP 4 — Update all border-light references:
Search the codebase for: rgba(0,0,0,0.08), rgba(0,0,0,0.06), rgba(0,0,0,0.1)
These were light-section borders. Replace all with: rgba(255,255,255,0.07)

STEP 5 — Update docs/DESIGN_SYSTEM.md:
Remove the light section colors entirely.
Update the alternation rule:
  Dark sections alternate between:
  Level 1 (deepest): #060608 — hero, CTA, footer, every other section
  Level 2 (lifted):  #0A0A12 — services, portfolio, testimonials, alternate sections
  Level 3 (cards):   #0F0F1C — all card surfaces everywhere
  Level 4 (raised):  #141428 — hover states, inner cards

After this change the site reads as one unified dark world.
Sections are separated by subtle depth changes and border lines,
not by background color flips.

Run npm run check. List every file changed.
```

---

## PROMPT J — Atmospheric Glows Per Section

```
Read CLAUDE.md before starting.

Now that every section is dark, the glows become the visual identity of each section.
Each section gets a unique colored ambient glow that defines its personality.
This is what creates the "connected" feeling — the glows overlap section boundaries.

Add a glow div to EVERY section. Pattern:

position: absolute
border-radius: 50%
background: radial-gradient(color at opacity, transparent 65%)
pointer-events: none
z-index: 0
width/height: 500-800px (large, diffuse)
Sections need: position: relative, overflow: hidden

SECTION GLOW MAP:

Hero: violet glow (already exists — verify it's there)
  Top-right: rgba(109,40,217,0.15), 700px circle
  Bottom-left: rgba(236,72,153,0.06), 400px circle

Marquee strip: no glow (too thin)

Services section:
  Top-right: rgba(109,40,217,0.10), 600px
  As user hovers each panel, that panel's color bleeds slightly
  (this is handled by the panel hover CSS — don't add more JS)

Process section:
  Bottom-left: rgba(249,115,22,0.08), 500px  ← warm orange
  Creates contrast with hero's violet — signals "different part of story"

Stats section:
  Center: rgba(249,115,22,0.12), 600px  ← orange (already added in Prompt B)
  Verify this exists, add if missing

Portfolio section:
  Top-right: rgba(6,182,212,0.09), 600px  ← cyan
  Bottom-left: rgba(6,182,212,0.04), 400px  ← cyan, dimmer

Tech stack section:
  Left-center: rgba(109,40,217,0.08), 500px  ← back to violet
  This connects back to hero, completing a visual loop

Testimonials section:
  Top-center: rgba(236,72,153,0.08), 600px  ← pink
  Each card also has its own small glow matching its top bar color:
    Card 1: rgba(109,40,217,0.05) behind it
    Card 2: rgba(6,182,212,0.05) behind it
    Card 3: rgba(249,115,22,0.05) behind it

CybiLearn section:
  Bottom-left: rgba(16,185,129,0.10), 500px  ← emerald (already likely exists)
  Top-right: rgba(6,182,212,0.06), 400px  ← cyan accent

Blog teaser (if exists):
  Top-right: rgba(168,85,247,0.08), 500px  ← soft purple

Closing CTA:
  Center: rgba(109,40,217,0.14), 800px  ← strong violet return
  This is the climax — the glow is at its most visible here
  Also: rgba(236,72,153,0.06) offset top-right for warmth

Footer:
  Top-center: rgba(109,40,217,0.05), 400px  ← very dim violet
  Barely visible — the story is ending, glow fades

THE GLOW STORY:
Violet (hero) → Orange (process/stats) → Cyan (portfolio) → Pink (testimonials) → Emerald (CybiLearn) → Violet (CTA) → Fade (footer)

This color journey is what makes the site feel like one connected experience.
Each section has a different emotional color but they flow into each other.

Add all glows. After adding:
Scroll through the site and verify each section has a distinct ambient color.
The glows should be subtle — visible but not overwhelming.
If any glow looks too strong, reduce opacity by 50%.

Run npm run check. List files changed.
```

---

## PROMPT K — Inner Pages Polish

```
Read CLAUDE.md before starting.

Apply the same scroll animations and visual depth to all inner pages.
Currently the homepage has all the animations.
Inner pages need the same treatment.

Pages to update: /services /about /contact /careers /work /blog

For EACH inner page, apply these in order:

1. HERO SECTION of each page:
   Add word-by-word reveal to the H1 using class: section-headline-reveal
   Add fade-in to the subheadline (opacity 0 → 1, y 10 → 0, delay 0.3s)
   Add fade-in to body text (delay 0.5s)
   Background: #060608 with grid overlay (same as homepage hero)
   Add violet ambient glow top-right

2. ALL SECTION H2s:
   Add class section-headline-reveal to every H2 on every inner page
   The useTextReveal hook in Home.tsx should also run on inner pages
   Move the useTextReveal call to a layout-level component or
   call it in each page component individually

3. SCROLL REVEAL on content blocks:
   Every major content block (service detail, value card, team section, etc.)
   should have the reveal animation:
   initial: opacity 0, y 24
   whileInView: opacity 1, y 0
   once: true
   If using Framer Motion: add these props
   If using GSAP ScrollTrigger: use the existing pattern from Week 2

4. ATMOSPHERIC GLOWS on inner pages:
   Services page:
     Hero: violet glow
     Each service section: alternating glows matching the service color
   
   About page:
     Hero: violet glow
     Story section: orange glow (warm, personal)
     Values section: cyan glow
     Partner section: emerald glow (ZenHost = trustworthy green)
   
   Contact page:
     Hero: violet glow
     Contact cards section: pink glow
     Form section: violet glow centered behind form
   
   Careers page:
     Hero: violet glow
     Culture cards: cyan glow
     Positions: alternating subtle glows

5. PAGE-SPECIFIC ENHANCEMENTS:

SERVICES PAGE:
  The alternating service detail blocks (image + text):
  Left-image blocks: image starts at x: -40, animates to x: 0 on scroll
  Right-image blocks: image starts at x: 40, animates to x: 0 on scroll
  Text blocks: standard y: 24 → 0 reveal
  This creates a "sliding in from the sides" entrance

ABOUT PAGE:
  Founder photo: add the same float animation as hero floating cards
  y: [0, -8, 0], duration: 5s, infinite
  Values cards: 3D entrance (same as service panels — rotateX 6deg → 0)

CONTACT PAGE:
  The 3 contact method cards:
  Entrance: staggered, each one comes in 0.1s after the previous
  The form card: slides in from the right (x: 40 → 0)

CAREERS PAGE:
  Open position accordion items:
  Each one: when clicked, content expands with height animation
  If using Framer Motion: AnimatePresence + motion.div with height auto
  If using CSS: max-height transition

6. ENSURE MAGNETIC BUTTONS ON ALL PAGES:
  Every primary CTA on every inner page should use <MagneticButton>
  Check: Services page CTA, About page CTA, Careers apply buttons

After updating all pages:
Verify on each page:
  - H1 reveals word by word
  - Sections have glow
  - Content blocks animate in on scroll
  - Primary CTAs are magnetic

Run npm run check. List all files changed.
```

---

## PROMPT L — Performance + Final Cleanup

```
Read CLAUDE.md before starting.

Optimize performance and clean up the codebase.
A beautiful site that loads slowly is not a premium site.

STEP 1 — Check bundle size:
Run: npm run build
Look at the output. If any chunk is above 500KB, flag it.
Three.js and GSAP are the likely culprits.

STEP 2 — Lazy load Three.js:
The Hero Three.js canvas is the heaviest import.
Lazy load it so it doesn't block the initial page render:

In Hero.tsx, replace the direct import with dynamic import:
import { Suspense, lazy } from 'react'
const HeroCanvas = lazy(() => import('./HeroCanvas'))

Create: src/components/sections/HeroCanvas.tsx
Move the Canvas + Sphere component into this file.

In Hero.tsx:
<Suspense fallback={<div style={{ position: 'absolute', inset: 0 }} />}>
  <HeroCanvas />
</Suspense>

STEP 3 — Image optimization:
Find every Unsplash image URL in the codebase.
Add these params to all of them if not already present:
  ?w=1200&q=75 for large images (service panels, featured portfolio)
  ?w=600&q=75 for medium images (cards)
  ?w=400&q=75 for small images (avatars, thumbnails)

Add loading="lazy" to every img tag that is NOT in the hero section.
Hero images: loading="eager" (above the fold)
Everything else: loading="lazy"

STEP 4 — GSAP ScrollTrigger cleanup:
Verify every useEffect that creates ScrollTrigger instances
has proper cleanup:
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  }
OR uses gsap.context():
  const ctx = gsap.context(() => { ... })
  return () => ctx.revert()

Missing cleanup causes memory leaks and animation bugs on navigation.
Check every component that uses ScrollTrigger.

STEP 5 — Remove console.logs:
Search for console.log in src/
Remove all of them.

STEP 6 — Add meta tags to every page:
In each page component, add or verify:

import { useEffect } from 'react'

// Call this in each page:
function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', description)
  }, [title, description])
}

Page titles:
  Home: 'CybiconZ — Digital Agency Tokyo'
  Services: 'Services — CybiconZ Digital Agency'
  Work: 'Our Work — CybiconZ'
  About: 'About — CybiconZ'
  Contact: 'Start a Project — CybiconZ'
  CybiLearn: 'CybiLearn — CybiconZ'
  Careers: 'Careers — CybiconZ'

Descriptions: 2-sentence descriptions for each, plain language.

STEP 7 — Add favicon:
In index.html, verify favicon is set.
If not, add a simple SVG favicon:

<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
<rect width='32' height='32' rx='6' fill='%23060608'/>
<text x='16' y='23' text-anchor='middle' font-family='sans-serif' 
font-weight='900' font-size='20' fill='%236D28D9'>Z</text>
</svg>">

This gives a violet Z on dark background as the browser tab icon.

STEP 8 — Final CLAUDE.md update:
Add to CLAUDE.md:

## Site Status: Week 4 Complete
The site is production-ready pending:
- Real founder photo (About page)
- Real project screenshots (Portfolio + Case Studies)
- EmailJS credentials (Contact form)
- Real testimonials with client permission

Do not add new features until real content is added.
Next step after content: deploy to ZenHost.

Run npm run build one final time.
If build succeeds with no errors: Week 4 is complete.
List all files changed.
```

---

## ORDER

I → J → K → L

After I: scroll the site — does everything look dark and connected?
After J: can you see different colored glows in different sections?
After K: visit /about, /services, /contact — do they animate like the homepage?
After L: run npm run build — does it succeed?

---

## WHAT COMES AFTER WEEK 4

Once these 4 prompts are done, the site is technically complete.

What remains before launch:
1. Real founder photo → About page
2. Real LwangBlack screenshots → Hero mockup + Portfolio + Case study
3. Real Johnnies screenshots → Portfolio + Case study
4. EmailJS setup → Contact form sends real emails
5. Real testimonials → Replace placeholder quotes
6. Deploy to ZenHost

None of these require prompts. They're content decisions.
When you have the real assets, come back and I'll write
the exact prompts to integrate them cleanly.

Update docs/PROGRESS.md after each prompt.