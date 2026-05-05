# CybiconZ — Design System
## Single source of truth. Never change without updating this file.

---

## Colors

### Dark Backgrounds
bg-page:      #07080E   — base of all dark sections
bg-card:      #0D0E1C   — cards, raised surfaces in dark
bg-raised:    #131524   — hover backgrounds, inner surfaces
bg-hover:     #191C2E   — deepest raised element

### Light Backgrounds  
bg-light:     #F8F6FF   — light sections (Services, Portfolio, Testimonials)
bg-light-card: #FFFFFF  — cards within light sections

### Text
text-primary:  #EDECFA  — main text on dark backgrounds
text-muted:    #6B6E8F  — secondary text on dark
text-dark:     #0A0B14  — main text on light backgrounds
text-dark-muted: #6B6E8F — secondary text on light

### Accent (Primary — violet-to-pink gradient)
accent-from:  #6D28D9
accent-mid:   #9333EA
accent-to:    #DB2777
accent-gradient: linear-gradient(135deg, #6D28D9, #9333EA, #DB2777)

Use accent-gradient on:
- Primary CTA buttons
- Hero H1 "Builds." text
- Logo "Z" character
- Active nav indicators
- Selected tab states
DO NOT use accent-gradient on: backgrounds, borders, large areas

### Secondary Accents (one per section)
violet:   #7C3AED — Services eyebrow, FAQ section
amber:    #F59E0B — Process step 02, Stats, Blog
cyan:     #06B6D4 — Process step 03, Tech stack
emerald:  #10B981 — Process step 04, CybiLearn, availability badge
pink:     #EC4899 — Process step 01, Stats

### Borders
border-dark:  rgba(255,255,255,0.09)
border-light: rgba(0,0,0,0.10)

---

## Typography

### Font Families
Headlines:  "Bricolage Grotesque", sans-serif — weights 400, 700, 800
Body:       "Plus Jakarta Sans", sans-serif — weights 400, 500, 600
Labels:     "DM Mono", monospace — weight 400

### Type Scale
Hero H1:     clamp(56px, 8vw, 112px) / 800 / tracking -0.04em / lh 0.92
Section H2:  clamp(36px, 5vw, 64px) / 800 / tracking -0.03em / lh 1.05
Card H3:     20-24px / 700 / tracking -0.01em
Body large:  17-18px / 400 / lh 1.75
Body:        15-16px / 400 / lh 1.7
Label:       11-12px / 600 / uppercase / tracking 0.12em
Mono label:  11px / DM Mono / uppercase / tracking 0.1em

### Section Label Pattern (used everywhere)
Small eyebrow above every H2:
- DM Mono 11px uppercase tracking-wider
- Color: section's accent color
- Display: flex, align-items center, gap 10px
- Before: 16px wide, 2px tall line, same color as text

---

## Spacing
Section vertical padding:  100px desktop / 64px mobile
Card padding:               24-32px
Component gap:              20-24px
Max content width:          1280px
Horizontal page padding:    80px desktop / 40px tablet / 20px mobile

---

## Shape
Card border-radius:       20px
Button border-radius:     10px (never more)
Pill border-radius:       999px
Input border-radius:      10px

---

## Shadows
Dark section cards:   0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)
Light section cards:  0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)
CTA button:           0 8px 32px rgba(109,40,217,0.35)

---

## Section Alternation Rule
ALWAYS: dark → light → dark → light
Homepage order:
1. Hero (dark)        2. Marquee (dark)      3. Services (LIGHT)
4. Process (split)    5. Stats (dark)         6. Portfolio (LIGHT)
7. Tech Stack (dark)  8. Testimonials (LIGHT) 9. CybiLearn (dark)
10. Blog teaser (LIGHT) 11. FAQ (dark)        12. Closing CTA (dark)
13. Footer (dark)

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

Cards (dark):
  bg: bg-card, border: border-dark, rounded-2xl or 3xl, shadow-card-dark

Cards (light):
  bg: white, border: border-light, rounded-2xl, shadow-card-light

Badges/Pills:
  Filled: bg rgba(color,0.1), border 1px rgba(color,0.2), text color, rounded-full
  Solid: bg accent-gradient, white text, rounded-full (only for "NEW", "Popular")