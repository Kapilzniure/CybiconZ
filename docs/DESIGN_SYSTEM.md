# CybiconZ — Design System
## Single source of truth. Never change without updating this file.

---

## Colors

### Dark Background Levels (site is fully dark — no light sections)
bg-page:      #060608   — deepest: hero, CTA, footer, testimonials, closing sections
bg-section:   #0A0A12   — lifted: services, portfolio, alternating sections
bg-card:      #0F0F1C   — all card surfaces everywhere
bg-raised:    #141428   — hover states, inner cards

Section alternation uses depth only — no color flips:
  Level 1 (deepest): #060608
  Level 2 (lifted):  #0A0A12
  Level 3 (cards):   #0F0F1C
  Level 4 (raised):  #141428

Section separation: 1px rgba(255,255,255,0.05–0.06) border-top lines

### Text
text-primary:  #F0EEFF  — #EDECFA approx — main text
text-muted:    rgba(255,255,255,0.4–0.55) — secondary text
text-subtle:   rgba(255,255,255,0.25) — timestamps, meta labels

### Accent (Primary — electric indigo)
accent:       #4F46E5  — primary electric indigo
accent-hover: #4338CA  — darker on hover
accent-light: #818CF8  — lighter variant (glows, ghost text)

Use indigo (#4F46E5) on:
- Primary CTA buttons: bg #4F46E5, hover #4338CA
- Logo "Z" character
- Eyebrow labels: color rgba(79,70,229,0.8)
- Active states and focus rings
- Subtle ambient glows (one per page, behind text)

### Atmospheric Glows (The Glow Story)
Large radial-gradient overlays positioned behind section content to define section personality. These are background overlays only — NEVER applied to text or borders.

- Hero glow:        Violet rgba(79,70,229,0.18) top-right, Pink rgba(236,72,153,0.08) bottom-left
- Services glow:    Violet rgba(79,70,229,0.1) top-right + per-service hover glows (Indigo, Amber, Pink, Cyan)
- Process glow:     Orange rgba(249,115,22,0.09) bottom-left
- Stats glow:       Orange rgba(249,115,22,0.12) center
- Portfolio glow:   Cyan rgba(6,182,212,0.1) top-right, rgba(6,182,212,0.05) bottom-left
- Tech Stack glow:  Violet rgba(79,70,229,0.08) left-center
- Testimonials glow: Pink rgba(236,72,153,0.09) top-center
- CybiLearn glow:   Emerald rgba(16,185,129,0.12) bottom-left, Cyan rgba(6,182,212,0.06) top-right
- Closing CTA glow: Violet rgba(79,70,229,0.15) center, Pink rgba(236,72,153,0.07) top-right
- Footer glow:      Dim Violet rgba(79,70,229,0.05) top-center

### Borders
border-dark:  rgba(255,255,255,0.07)  — standard card/section borders
border-sep:   rgba(255,255,255,0.05–0.06) — section separator top borders

---

## Typography

### Font Families
Headlines:  "Bricolage Grotesque", sans-serif — weights 400, 700, 800
Body:       "Plus Jakarta Sans", sans-serif — weights 400, 500, 600
Labels:     "DM Mono", monospace — weight 400

### Type Scale
Hero H1:     clamp(64px, 10vw, 140px) / 900 / tracking -0.04em / lh 0.95
Section H2:  clamp(40px, 6vw, 80px) / 800 / tracking -0.04em / lh 0.92
Impact Numbers: 96px desktop / 64px mobile / 600
Card H3:     20-24px / 700 / tracking -0.01em
Body large:  16-18px desktop / 15-16px mobile / lh 1.8
Body:        15-16px / 400 / lh 1.7
Label:       11-12px / 600 / uppercase / tracking 0.12em
Mono label:  11px / DM Mono / uppercase / tracking 0.1em

### Section Label Pattern (used everywhere)
Small eyebrow above every H2:
- DM Mono 11px uppercase tracking-wider
- Color: #4F46E5 (electric indigo)
- Display: flex, align-items center, gap 10px
- Before: 16px wide, 2px tall line, same color as text

---

## Spacing
Section vertical padding:  100px desktop / 80px tablet / 60px mobile
Card padding:               24-32px
Component gap:              20-24px
Max content width:          1280px
Horizontal page padding:    80px desktop / 40px tablet / 24px mobile

---

## Shape
Card border-radius:       20px
Button border-radius:     10px (never more)
Pill border-radius:       999px
Input border-radius:      10px

---

## Shadows
All cards:    0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)
CTA button:   0 8px 32px rgba(79,70,229,0.35)

---

## Section Alternation Rule
Site is ALL DARK. No light sections exist.
Sections alternate between depth levels only:

Homepage order:
1.  Hero (bg-page #060608)
2.  Marquee (bg-page #060608)
3.  Services (bg-page #060608)
4.  Process (left: #060608, right: #0A0A12)
5.  Stats (bg-page #060608)
6.  Portfolio (bg-section #0A0A12)
7.  TechStack (bg-page #060608)
8.  Testimonials (bg-page #060608)
9.  FAQ (bg-page #060608)
10. CybiLearn (bg-page #060608, right: #0A0A12)
11. LatestThinking (bg-page #060608)
12. ClosingCTA (bg-page #060608)
13. Footer (darkest #030305)

---

## Animation Rules
Entry animations:   whileInView, once: true — NEVER repeat
Viewport margin:    "-60px" on all whileInView
Standard entry:     opacity 0→1, y 20→0, duration 0.65s, ease [0.22,1,0.36,1]
Grid stagger:       each child delays index * 0.09s
Hover on cards:     translateY(-4px to -8px), no scale()
Hover transitions:  200-300ms ease
Float animation:    y oscillation ±10-12px, 4-6s, infinite, easeInOut

---

## Component Rules
Buttons:
  Primary: bg accent-gradient, white 700, px-8 py-4, rounded-xl
  Secondary: border 1px rgba(255,255,255,0.12), white 600, px-8 py-4, rounded-xl
  Never: background + border together, border-radius > 12px

Cards (all dark):
  bg: #0F0F1C, border: rgba(255,255,255,0.07), rounded-2xl or 3xl
  shadow: 0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)

Badges/Pills:
  Filled: bg rgba(color,0.1), border 1px rgba(color,0.2), text color, rounded-full
  Solid: bg accent-gradient, white text, rounded-full (only for "NEW", "Popular")
