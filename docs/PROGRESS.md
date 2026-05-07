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
