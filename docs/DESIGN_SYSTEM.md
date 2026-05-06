# CybiconZ — Design System
## Single source of truth. Never change without updating this file.

---

## Colors

### Dark Backgrounds
bg-page:      #060608   — base of all dark sections
bg-card:      #0C0C12   — cards, raised surfaces in dark
bg-raised:    #111118   — hover backgrounds, inner surfaces
bg-hover:     #191C2E   — deepest raised element

### Light Backgrounds  
bg-light:     #F8F6FF   — light sections (Services, Portfolio, Testimonials)
bg-light-card: #FFFFFF  — cards within light sections

### Text
text-primary:  #EDECFA  — main text on dark backgrounds
text-muted:    #6B6E8F  — secondary text on dark
text-dark:     #0A0B14  — main text on light backgrounds
text-dark-muted: #6B6E8F — secondary text on light

### Accent (Primary — violet only)
accent:       #7C3AED  — primary violet accent

Use violet (#7C3AED) on:
- Primary CTA buttons: bg #7C3AED, hover #6D28D9
- Logo "Z" character
- Eyebrow labels: color rgba(124,58,237,0.8)
- Active states and focus rings
- Subtle ambient glows (one per page, behind text)

REMOVE secondary accents (amber, cyan, emerald, pink) from:
- Process step numbers
- Stats numbers
- Testimonial top bars
- Service panel accent lines
- Section eyebrows (now all use same violet accent)

### Borders
border-dark:  rgba(255,255,255,0.09)
border-light: rgba(0,0,0,0.08)

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
- Color: #7C3AED (violet)
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
