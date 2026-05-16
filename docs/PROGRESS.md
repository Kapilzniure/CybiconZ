## UPGRADE 10 — Hero Split Layout + Device Mockup

**Goal:** Redesign Hero from centered logo layout to a cinematic split layout with a floating browser mockup on the right.

**Files changed:**
- `src/components/sections/Hero.tsx` — full rewrite: split layout (55/45), eyebrow pill with pulsing dot, 3-line staggered H1, subheadline, CTAs (full-width mobile), social proof avatars, stats pill row (moved from bottom bar), Three.js canvas at 60% opacity, mouse parallax (stiffness 30/damping 15), scroll-based right-side fade+y exit via `useScroll`/`useTransform`.
- `src/components/sections/HeroMockup.tsx` — new component: browser chrome with traffic lights + URL bar, LwangBlack Coffee placeholder mock (gradient bg, fake nav, hero image, product cards), two floating metric cards (100% Delivery top-right 5s, Live since 2024 bottom-left 7s opposite phase), browser float animation 6s loop.

---

## UPGRADE 9 — Performance & Polish Fixes

**All five fixes complete. Zero type errors. Build passes.**

**FIX 1 — delay-[50ms] replaced:**
- `src/components/sections/Services.tsx:161` — `delay-[50ms]` → `delay-50`
- `tailwind.config.ts` — rewrote file: fixed broken structure (was 87 lines, missing closing braces, `transitionDelay` buried inside a wrongly-nested `theme.extend.theme` block); `transitionDelay: { '50': '50ms' }` now lives in the correct `extend` block.

**FIX 2 — use-toast stub deleted:**
- `src/components/ui/use-toast.ts` deleted (was a 1-line comment stub; `toaster.tsx` already imported from `@/hooks/use-toast` directly).

**FIX 3 — Image loading attributes:**
- All non-hero images already have `loading="lazy"`. Hero images have `loading="eager"`. No changes needed.

**FIX 4 — will-change for animated elements:**
- Already present in `src/index.css` (lines 15–20). No changes needed.

**FIX 5 — Stale imports:**
- No remaining imports of `SectionBridge`, `Cursor`, `CursorOrb`, or `CustomCursor` found anywhere. Already clean from Upgrade 8.

---

## UPGRADE 8 — Cursor Consolidation (Performance)

**Goal:** Eliminate three concurrent cursor components running separate rAF loops. Replace with one `UnifiedCursor` that handles dot, ring, and orb in a single animation loop.

**Changes:**
- Created `src/components/ui/UnifiedCursor.tsx` — single rAF loop, touch-device guard, dot + ring + orb.
- `src/App.tsx` — removed `Cursor` and `CursorOrb` imports/renders; added `<UnifiedCursor />`.
- `src/components/site/SiteShell.tsx` — removed duplicate `<Cursor />` render and its import.
- Deleted `src/components/ui/Cursor.tsx` (replaced).
- Deleted `src/components/ui/CursorOrb.tsx` (replaced).
- Deleted `src/components/ui/CustomCursor.tsx` (was never rendered, now removed).
- Deleted `src/components/ui/SectionBridge.tsx` (ghost component, unused).
- Kept `src/hooks/useMagneticButton.ts` (still used by `MagneticButton.tsx`).

---

## UPGRADE 7 — Section Ambient Glows (Week 4)

**Goal:** Each section gets a unique colored ambient glow defining its personality. Creates the glow story: Violet → Orange → Cyan → Pink → Emerald → Violet → Fade.

**Glow story implemented:**
- `Hero.tsx`: violet top-right (700px, 0.15) + pink bottom-left (400px, 0.06) — added
- `Services.tsx`: violet top-right — already existed ✅
- `Process.tsx`: orange bottom-left (500px, 0.08) — added
- `Stats.tsx`: orange center — already existed ✅
- `Portfolio.tsx`: cyan top-right (600px, 0.09) + cyan bottom-left (400px, 0.04) — added
- `TechStack.tsx`: violet left-center (500px, 0.08) — added
- `Testimonials.tsx`: pink top-center (600px, 0.08) + per-card micro-glows (violet/cyan/orange) — added
- `CybiLearn.tsx`: emerald bottom-left (500px, 0.10) + cyan top-right (400px, 0.06) — added (violet left already existed)
- `LatestThinking.tsx`: soft purple top-right (500px, 0.08) — added
- `ClosingCTA.tsx`: center violet 800px (0.14) + pink top-right (400px, 0.06) warmth — added (existing violet blurs kept)
- `Footer.tsx`: dim violet top-center (400px, 0.05) — added

---

## UPGRADE 6 — Full Dark Mode Conversion (Week 4)

**Goal:** Convert every light section to dark. Site is now one continuous dark experience.

**CSS / Config:**
- `src/index.css`: Updated `.surface-light` → `background: #0A0A12`, dark text, white border-top. Updated `--bg-light` and `--bg-light-card` CSS vars to dark values.

**Home page:**
- `src/pages/Index.tsx`: Removed all `<SectionBridge />` imports and usage (6 removed).

**Section components converted:**
- `src/components/sections/Process.tsx`: Full dark (left #060608, right #0A0A12), step borders white/6, step text white, CTA text white.
- `src/components/sections/Portfolio.tsx`: Dark (#0A0A12), filter tabs dark, ghost text white opacity, project cards #0F0F1C, placeholder cards dark.
- `src/components/sections/Testimonials.tsx`: Dark (#060608), cards #0F0F1C, quote text white/65, author name #F0EEFF.
- `src/components/sections/CybiLearn.tsx`: Both halves dark (#060608 / #0A0A12), feature cards #0F0F1C with violet left border.
- `src/components/sections/LatestThinking.tsx`: Dark (#060608), heading white.
- `src/components/sections/PostCard.tsx`: Card #0F0F1C, white/7 border, text converted to white opacity values.

**Pages converted:**
- `src/pages/About.tsx`: Story section + Partner section → #0A0A12, ZenHost card → #0F0F1C.
- `src/pages/Services.tsx`: Service detail blocks alternate #060608/#0A0A12, all dark text tokens.
- `src/pages/CybiLearn.tsx`: Topics grid → #0A0A12, cards #0F0F1C.
- `src/pages/Careers.tsx`: Culture section → #0A0A12, culture cards #0F0F1C.
- `src/pages/Work.tsx`: Project grid → #0A0A12, project cards #0F0F1C.
- `src/pages/Blog.tsx`: Posts grid → #0A0A12.
- `src/pages/BlogPost.tsx`: Body section → #0A0A12, all dark text converted to white opacity.
- `src/pages/CaseStudy.tsx`: Content section → #0A0A12, sidebar and content blocks converted.

**Design System:**
- `docs/DESIGN_SYSTEM.md`: Removed all light section references. Updated alternation rule to depth-only dark levels.

---

## UPGRADE 5 — Portfolio Horizontal Scroll & Color System Refinement

**Portfolio Section:**
- Implemented GSAP ScrollTrigger for horizontal scrolling on desktop.
- Restructured Portfolio section with a pinned outer wrapper (`#portfolio-section`) and a horizontally scrolling track (`#portfolio-track`).
- Adjusted card widths and heights for desktop horizontal layout.
- Applied specific designs for header, featured (LwangBlack), Johnnies, and placeholder cards.
- Implemented mobile fallback to vertical stacking.
- Filter tabs are positioned above the pinned section.

**Color System Refinement:**
- Updated `docs/DESIGN_SYSTEM.md` with single violet accent (#7C3AED), new background tokens (`bg-page`, `bg-card`, `bg-raised`), and removal of secondary accents.
- Applied color restraints across components:
    - Hero: Pure black background, violet CTAs.
    - Services: White numbers (low opacity), white accent line, violet eyebrows.
    - Process: White step numbers (low opacity), violet eyebrow.
    - Stats: White numbers, no gradient text.
    - Testimonials: Subtle white top border.
    - Logo 'Z': Violet.
    - Navbar CTA: Violet accent.
    - Contact/Careers/CybiLearn/ClosingCTA: Standardized eyebrows and CTAs to violet.
- Verified no secondary accents are used on decorative elements.
