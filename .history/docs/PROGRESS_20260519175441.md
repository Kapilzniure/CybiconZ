## FIX — Hero Critical Bugs (4 issues resolved)

**Problem 1: Canvas was invisible (black screen)**
- Root cause: `useHeroIntro` called `gsap.set(canvasWrapperRef, {opacity:0})` on mount; if the GSAP timeline didn't complete, the canvas stayed at 0.
- Fix: Canvas wrapper `opacity: 0.4` now set directly in JSX. GSAP no longer controls canvas opacity. City is always visible.
- Also fixed: building opacity values were 0.22–0.50 (too dim at 40% canvas opacity). Raised to 0.48–0.92 so wireframes are actually visible.

**Problem 2: Dark box behind "digital"**
- Root cause: The `overflow:"hidden"` parent div created a GPU compositing layer filled with the page background (#020408). Compounded by `-webkit-text-fill-color` triggering WebKit's text rendering path.
- Fix: Added `background:"transparent"` to the overflow parent. Removed `WebkitTextFillColor` (redundant — `color:"#00C4FF"` is sufficient). Reduced text-shadow from `60px/120px` to single `40px` to stay within the compositing rect.

**Problem 3: GSAP eyebrow animation unreliable**
- Root cause: Eyebrow used `clipPath: "inset(0 100% 0 0)"` initial state, which can fail in some browsers/GSAP builds without explicit CSS support.
- Fix: Eyebrow now uses `opacity: 0, x: -12` as initial state and `opacity: 1, x: 0` as target — reliable across all browsers.

**Problem 4: Scroll cinematics (verified working)**
- `CameraRig` correctly reads `window.scrollY` and moves camera from z=12→4 over 2 viewport heights. No code change needed — this was masked by Problem 1.

**Files changed:**
- `src/components/sections/Hero.tsx`
- `src/hooks/useHeroIntro.ts`
- `src/components/sections/HeroCanvas.tsx`

---

## UPGRADE 18 — "SIGNAL" Hero Concept (Complete Rebuild)

**Concept:** "Receiving a transmission from the future." Fast. Precise. Alive. Tokyo at night meets a control room.

**HeroCanvas.tsx — complete rewrite (cityscape → data field):**
- 2000 InstancedMesh data points (SphereGeometry radius 0.012, 5×4 segments)
- Per-instance data baked at module load (stable across re-renders, avoids useMemo churn)
- Color distribution: 70% white, 20% cyan (#00C4FF), 10% green (#39FF14)
- Each point bobs: `y += sin(time * speed + phase) * 0.08` (unique speed 0.3–1.0, unique phase)
- Scene rotation: `group.rotation.y += 0.0008` per frame
- Camera parallax: lerps toward `mouseX * 1.5` and `-mouseY * 0.8` at 0.04 factor
- `frustumCulled={false}` prevents instances being culled as camera shifts
- `<color attach="background" args={["#000000"]} />` for pure black backdrop
- `dpr={[1, 1.5]}` for performance on high-DPI screens

**Hero.tsx — complete rebuild (SIGNAL layout):**
- Background: `bg-black`, Three.js scene at full opacity (gradient overlays handle readability)
- Three gradient vignettes: left (0.82→0.08), bottom (0.92→0), top (0.45→0)
- Precision rings: right edge, SVG, unchanged from Upgrade 17
- **Vertical "TOKYO · JAPAN" label**: left edge, full height, `writing-mode: vertical-rl` + `rotate(180deg)`, 9px mono, white/15 — luxury print aesthetic
- **Top-right AVAILABLE badge**: `top:18px, right:8vw`, pulsing green dot
- **Scanning label**: thin cyan line (`scaleX: 0→1` via GSAP) + "Est. 2024 ———— Custom Digital Products" text fade
- Headline: "We build" (mono, 12–18px, 30% opacity) / "digital" (display 800, 72–140px, cyan) / "products." (same, white 90%)
- Signal flicker: "digital" word flickers opacity 1→0.5→1→0.7→... every 6–14s, making it feel alive like a neon sign
- Mouse parallax spring: stiffness 28, damping 14, ±4px/±2.5px on HTML content
- Removed: HeroParticles, spotlight canvas, scanlines, all non-essential glows
- Removed: `scrambleFired` state, ScrambleText, canvasWrapperRef opacity:0 in JSX

**useHeroIntro.ts — full rewrite:**
- All layout refs now optional (canvasWrapperRef, verticalLabelRef, availableRef, scanLineRef, scanTextRef, eyebrowRef, topBarRef)
- New timeline: t=0 canvas + verticalLabel | t=200 available+topBar | t=400 scanLine draw | t=700 scanText | t=600 line1 | t=740 line2 | t=880 line3 | t=1100 subtitle | t=1300 CTAs | t=1400 stats | t=1600 scroll indicator
- Signal flicker: recursive `scheduleFlicker()` started 1600ms after mount; 6–14s random delay; GSAP timeline sequence; `mounted` flag + `clearTimeout` + `flickerTl.kill()` for clean unmount
- Breathing glow on "digital": starts 1640ms after mount, `textShadow` 0→strong→0, 3.5s yoyo repeat
- All optional refs use `?.current` guards — null refs are silent no-ops

---

## UPGRADE 17 — Hero Section Full Redesign

**Goal:** Fix a bottom-heavy, over-effects-laden hero. Replace with a clean, confident, vertically-centered layout that has one memorable visual identity element.

**Problem diagnosis:**
- All content was pinned to `bottom-0`, leaving the top 60% of the viewport dead
- Seven competing effects (Three.js city + 180 particles + scanlines + multiple glows + scramble text + aura + canvas trail) cancelled each other out — none shone
- Three.js city was invisible at 40% opacity with `blur(1px)` — pure CPU waste
- Scramble text distracted from headline hierarchy

**Design decisions:**
- Content vertically centered (`flex flex-col justify-center` with `pt-80 pb-130` to account for top bar + stats)
- Precision rings (SVG, right edge): outer at 8% cyan, dashed inner at 5% violet, 4 accent dots, 90s/55s counter-rotation — signature element that reads "precision" without competing with type
- Cursor spotlight: single canvas rAF loop, 420px radial gradient at 4.5% cyan, 0.055 lerp — barely perceptible, adds depth
- Top info bar: location left, availability right, 1px bottom border — better information architecture and fills the dead top zone
- Horizontal rule between H1 and content block: thin gradient line anchoring the two areas

**Files changed:**
- `src/components/sections/Hero.tsx` — complete rewrite: removed `HeroCanvas`, `HeroParticles`, `ScrambleText`, scanlines, and 4 of 6 glow layers; added cursor spotlight canvas; added rotating SVG rings (desktop only, right edge, hidden md:block); added top info bar; restructured layout from `absolute bottom-0` to vertically centered flex; added horizontal rule; removed `scrambleFired` state; removed `canvasWrapperRef`; CTAs and subtitle now side-by-side on desktop
- `src/hooks/useHeroIntro.ts` — removed `canvasWrapperRef` (was for Three.js, now gone); added optional `topBarRef`; topBar animates from `opacity:0, y:-8` to final at t=0ms; all timestamps shifted 150ms earlier; breathing glow starts at 1380ms; reduced initial textShadow to match new glow values

---

## UPGRADE 16 — ScrambleText + Cursor Explore State + Particle Dual-Zone

**Goal:** Three simultaneous Hero polish passes: text scramble on "digital", explore cursor state for the hero section, gravitational lensing particle interaction.

**Files changed:**
- `src/components/sections/ScrambleText.tsx` — new component: rAF-based char scramble that fires once when `trigger` flips true; chars settle left-to-right via `settleAt(i) = (i / text.length) * duration * 0.8`; merges internal ref with forwarded `innerRef` via `useCallback` setter (handles function refs + object refs); writes directly to `el.textContent` — zero React re-renders during animation; renders `<div>{text}</div>` so initial content is visible during GSAP slide-up before scramble triggers.
- `src/components/sections/Hero.tsx` — added `const [scrambleFired, setScrambleFired] = useState(false)`; replaced line2 `<div ref={line2Ref}>digital</div>` with `<ScrambleText text="digital" trigger={scrambleFired} innerRef={line2Ref} style={{...}} />`; passed `onLine2Complete: () => setScrambleFired(true)` to `useHeroIntro`; added `data-cursor="explore"` to the `<section>` element.
- `src/hooks/useHeroIntro.ts` — added `onLine2Complete?: () => void` to interface; stable ref pattern (`onLine2CompleteRef`) to avoid stale closure inside GSAP `onComplete`; fires callback after line2 slide-up completes at t=540ms+900ms.
- `src/components/ui/Cursor.tsx` — `cursorState` type extended to `"default" | "hover" | "view" | "explore"`; `ringSize` 56px for explore; `ringBackground` and `auraOpacity` include explore branch; `handleMouseMove` detects `[data-cursor='explore']` excluding `a/button/[role='button']` targets; ring `animate.rotate` uses continuous rotation for both "view" and "explore"; `AnimatePresence` shows `✦` symbol when state is "explore"; added `key` props to both AnimatePresence children.
- `src/components/sections/HeroParticles.tsx` — renamed `REPEL_RADIUS` to `INTERACTION_RADIUS = 120`; added `ATTRACT_RADIUS = 60`; replaced single repel block with dual-zone logic: attract (pull toward cursor) within 60px, repel (push away) between 60–120px; velocity clamping moved outside the if-else so it applies to both zones.

---

## UPGRADE 15 — Stats Strip Visual Weight + HeroCanvas Depth Layers

**Goal:** Elevate stats strip from footnote to trust signal; add foreground depth to the Three.js city.

**Files changed:**
- `src/components/sections/Hero.tsx` — new STATS array (per-item `color` field, longer labels, "Tokyo" → "Japan · Global reach"); value font-size 22px; label font-size 10px, color rgba(255,255,255,0.35); gradient deepened (`rgba(2,4,8,1)` floor); `borderTop: 1px solid rgba(255,255,255,0.06)`; padding 32px/20px; added 5th `data-stat-item` availability badge (pulsing green dot + "Available for projects") — appears inline after divider on desktop, full-width below grid on mobile; mobile keeps 2×2 layout via `w-1/2 md:w-auto`.
- `src/components/sections/HeroCanvas.tsx` — 4 near-foreground canyon buildings added (z≈-1 to -1.5, very wide/tall) at `baseOpacity: 0.015`; `HorizonLine` component: single `THREE.BufferGeometry` line at y=-0.5, z=-4, x spans ±30, opacity 0.06 — anchors city at ground level; `GlowingGrid` plane expanded 45→80 units and moved to z=4 (extends toward camera, stronger perspective runway).

---

## UPGRADE 13 — Cinematic Hero Entrance (GSAP) + HeroCanvas Cinematic Polish

**Goal:** Replace framer-motion entrance animations with a coordinated GSAP timeline (award-winning level choreography) and deepen the Three.js backdrop.

**Files changed:**
- `src/hooks/useHeroIntro.ts` — new hook: single GSAP timeline managing full intro sequence (t=0 canvas fade, t=200 eyebrow clip-path, t=400/540/680 H1 line reveals via expo.out, t=900 subtitle, t=1100 CTAs, t=1300 stats stagger, t=1500 scroll indicator); breathing glow on "digital" via setTimeout at t=1440ms (separate from context for manual kill); scroll indicator removal via passive scroll listener added at t=1600ms; `prefersReduced`: skips all animation, snaps to final state via gsap.set; full cleanup on unmount (ctx.revert, breathingTween.kill, timer clears, scroll listener removal).
- `src/components/sections/Hero.tsx` — removed all framer-motion initial/animate entrance; added 9 GSAP refs (canvasWrapperRef, eyebrowRef, line1/2/3Ref, subtitleRef, ctaRowRef, statsRef, scrollIndicatorRef); kept framer-motion only for mouse parallax spring and scroll exit; inline initial CSS states prevent flash-of-content before GSAP runs; stats strip simplified to single 4-item flex-wrap (no desktop/mobile duplication), `data-stat-item` on each for GSAP stagger; `ScrollIndicator` sub-component removed (hook handles scroll removal).
- `src/components/sections/HeroCanvas.tsx` — fog density 0.024 (was 0.018), fog color 0x010306; building opacity reduced (0.04/0.025/0.012); BuildingLights gets `buildingIndex` prop, district flicker via sin(time*0.5+buildingIndex*1.3+i*0.2)>0.7 for every 3rd building, random flicker halved to 0.001; grid shader: removed scanlines and secondary pulse, replaced with directed radial pulse in brand cyan, hardcoded colors (removed uColorA/uColorB uniforms); mist alpha 0.12 + wave updated; camera lerp 0.008, targetX 0.3×, targetY 0.8-0.2×, z drift via sin; ambient intensity 0.2; added cold side light [-8,5,8] 0x001122; added orbiting beacon (0x003366, r=15, h=20, speed=0.04); FloatingParticles count=60, size=0.010, opacity=0.25, green 5% only.

---

## UPGRADE 11 — "Tokyo Transmission" Hero Rebuild

**Goal:** Replace the split-layout hero with a full-bleed cinematic hero. Typography IS the hero — no split, no device mockup.

**Files changed:**
- `src/components/sections/Hero.tsx` — full rewrite: 100vh full-bleed layout, 5-layer z-stack (Three.js → particles → atmospheric gradient → scanlines → content), massive 3-line H1 with overflow-hidden translateY reveal, eyebrow pill clipPath reveal, subheadline + MagneticButton CTAs, bottom stats strip (desktop flex / mobile 2×2 grid), scroll-based content exit (y 0→-80px, opacity 0→350), mouse parallax on content block only (±6px/±4px, spring 30/15), per-CSS breathing animation on "digital" text-shadow, responsive h1 clamp (52→72px mobile, 72→140px desktop), scroll indicator hides on first scroll.
- `src/components/sections/HeroParticles.tsx` — new component: 180-particle canvas system (75% white / 20% cyan / 5% green), breathing opacity via sine, cursor repulsion within 120px, velocity damping back to base drift, scroll opacity fade (0→400), 1200ms galaxy-materialise reveal, ResizeObserver, prefers-reduced-motion (30 particles, no cursor, opacity halved), cyan glow via shadowBlur.

**Removed from Hero:** split layout, HeroMockup import, avatar row, stats pill grid, social proof copy.
**Kept:** HeroCanvas (z-0 at 40% opacity + blur(1px)), mouse motion spring, useScroll/useTransform, prefers-reduced-motion guard, MagneticButton.

---

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
