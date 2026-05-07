<!-- # CybiconZ — 3D Connected Experience
# The plan, the color change, and the prompts

---

## THE CONCEPT: ONE 3D OBJECT THAT TRAVELS THE SITE

The idea that creates genuine connection:
The hero sphere doesn't just sit in the hero.
As you scroll, it transforms and echoes through the site.

This is achieved without WebGL shaders using three techniques:

1. HERO: Sphere reacts to mouse (done) + reacts to scroll (morphs/stretches)
2. THROUGHOUT: A persistent floating orb follows the cursor everywhere
   — subtle, 60-80px, glows in the section's accent color
   — this is the "one object connecting everything"
3. SECTION TRANSITIONS: Each section has a 3D element that enters
   from where the last one exited

This creates the illusion of one continuous 3D world.

---

## THE COLOR CHANGE FIRST (run this before anything else)

### PROMPT ZERO — Color System Update

```
Read CLAUDE.md and docs/DESIGN_SYSTEM.md before starting.

Replace every instance of the current purple accent color with Electric Indigo.

OLD VALUES TO REPLACE:
  #7C3AED → #4F46E5
  #6D28D9 → #4338CA (hover state)
  #A855F7 → #818CF8 (lighter variant)
  rgba(109,40,217,...) → rgba(79,70,229,...)
  rgba(124,58,237,...) → rgba(79,70,229,...)
  rgba(168,85,247,...) → rgba(129,140,248,...)
  0x7C3AED (Three.js) → 0x4F46E5
  0x6D28D9 (Three.js) → 0x4338CA
  0xA855F7 (Three.js) → 0x818CF8

NEW VALUES:
  Primary accent:    #4F46E5  (electric indigo)
  Accent hover:      #4338CA  (darker on hover)
  Accent light:      #818CF8  (lighter variant, used for glows)
  Accent glow:       rgba(79,70,229,0.15)  (ambient backgrounds)

WHERE TO UPDATE:
1. tailwind.config.ts — all accent color values
2. index.css — all CSS variables and hardcoded color values
3. Hero.tsx — Three.js light colors and material colors
4. Every component that has hardcoded #7C3AED, #6D28D9, rgba(124,58,237...)
5. docs/DESIGN_SYSTEM.md — update the color documentation

Also update the Three.js sphere in Hero.tsx:
  Main sphere color: 0x1E1B4B (very deep indigo, almost black)
  Wireframe color: 0x4F46E5 (electric indigo, clearly visible)
  Outer wireframe: 0x818CF8 (lighter indigo)
  PointLight 1: color 0x4F46E5, intensity 6
  PointLight 2: color 0xEC4899 (keep pink — contrast with indigo looks premium)
  PointLight 3: color 0x06B6D4 (keep cyan — three color lighting)

After updating, verify:
- Navbar CTA button is now indigo
- Logo Z is now indigo
- Hero sphere wireframe glows indigo
- All section eyebrow labels are indigo
- Scroll progress bar gradient starts with indigo

Run npm run check. List every file changed.
```

---

## PROMPT 1 — Hero Scroll Morphing (sphere reacts to scroll)

```
Read CLAUDE.md before starting.

Currently the hero sphere follows the mouse but doesn't react to scroll.
Add scroll-driven morphing to the Three.js sphere.

As the user scrolls past the hero:
1. Sphere scales up (grows larger as page scrolls)
2. Sphere moves upward (floats up and out)
3. Wireframe opacity increases (becomes more visible briefly)
4. Then everything fades as hero exits viewport

In Hero.tsx, find the Three.js animation loop (the useFrame or requestAnimationFrame).

Add scroll tracking:
let currentScroll = 0
const handleScroll = () => { currentScroll = window.scrollY }
window.addEventListener('scroll', handleScroll, { passive: true })

In the animation loop, add scroll-driven transforms:
const heroHeight = window.innerHeight
const scrollProgress = Math.min(currentScroll / heroHeight, 1)
// scrollProgress goes 0 → 1 as user scrolls through hero

// Sphere grows and floats up
const scaleTarget = 1 + scrollProgress * 0.8  // 1 → 1.8
sphere.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.08)

// Move sphere upward
sphere.position.y = scrollProgress * 3  // floats up 3 units

// Wireframe becomes more visible as page scrolls
wireMat.opacity = 0.18 + scrollProgress * 0.25  // 0.18 → 0.43

// Main sphere fades out as it exits
sphereMat.opacity = 0.85 * (1 - scrollProgress * 1.2)  // fades to 0

// Camera pulls back slightly
camera.position.z = 7 + scrollProgress * 2  // 7 → 9

Clean up the event listener in the return of useEffect:
return () => window.removeEventListener('scroll', handleScroll)

NOTE: THREE.Vector3 lerp — import Vector3 from three if not already imported.
Use: sphere.scale.x += (scaleTarget - sphere.scale.x) * 0.08
     sphere.scale.y = sphere.scale.x
     sphere.scale.z = sphere.scale.x
If lerp on scale doesn't work cleanly.

After this change:
- Scroll slowly through the hero
- The sphere should grow and rise upward
- It should fade as the hero exits
- Combined with the existing text parallax exit, 
  the whole hero "leaves" as you scroll into the site

Run npm run check. List files changed.
```

---

## PROMPT 2 — Persistent Cursor Orb (connects everything)

```
Read CLAUDE.md before starting.

This is the key to making the site feel connected.
A soft glowing orb follows the cursor everywhere on the site —
not just in the hero, not just in dark sections — everywhere.

It's different from the cursor ring (which is sharp and precise).
This is a large, soft, ambient glow that drifts behind the cursor
with significant lag — like the cursor has a presence, an aura.

Create: src/components/ui/CursorOrb.tsx

import { useEffect, useRef } from 'react'

export function CursorOrb() {
  const orbRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    
    const orb = orbRef.current
    if (!orb) return
    
    let targetX = -300
    let targetY = -300
    let currentX = -300
    let currentY = -300
    let animId: number
    
    // Track which section the cursor is in
    // and change orb color accordingly
    const sectionColors: Record<string, string> = {
      'hero-section':        'rgba(79,70,229,0.12)',
      'services-section':    'rgba(79,70,229,0.10)',
      'process-section':     'rgba(249,115,22,0.08)',
      'stats-section':       'rgba(249,115,22,0.10)',
      'portfolio-section':   'rgba(6,182,212,0.09)',
      'tech-section':        'rgba(79,70,229,0.08)',
      'testimonials-section':'rgba(236,72,153,0.08)',
      'cybilearn-section':   'rgba(16,185,129,0.09)',
      'cta-section':         'rgba(79,70,229,0.12)',
    }
    
    let currentColor = 'rgba(79,70,229,0.10)'
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      
      // Detect which section cursor is in
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        let section = el.closest('[data-section]') as HTMLElement
        if (section) {
          const sectionId = section.dataset.section || ''
          currentColor = sectionColors[sectionId] || 'rgba(79,70,229,0.10)'
        }
      }
    }
    
    const animate = () => {
      // Very slow lerp — orb drifts toward cursor
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      
      orb.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`
      orb.style.background = `radial-gradient(circle, ${currentColor}, transparent 70%)`
      
      animId = requestAnimationFrame(animate)
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])
  
  return (
    <div
      ref={orbRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
        willChange: 'transform',
        background: 'radial-gradient(circle, rgba(79,70,229,0.10), transparent 70%)',
      }}
    />
  )
}

Add <CursorOrb /> to App.tsx at root level.
It renders on every page, always following the cursor.

STEP 2 — Add data-section attributes to sections:
In Home.tsx, add data-section to each section element:
  <section id="hero-section" data-section="hero-section" ...>
  <section data-section="services-section" ...>
  <section data-section="process-section" ...>
  etc.

Do the same for major sections on inner pages:
  About page hero: data-section="hero-section"
  Services page hero: data-section="hero-section"
  etc.

STEP 3 — Make the orb respond to scroll speed:
In the CursorOrb animate loop, track scroll velocity:
let lastScroll = 0
let scrollVelocity = 0

In a scroll listener:
window.addEventListener('scroll', () => {
  scrollVelocity = Math.abs(window.scrollY - lastScroll)
  lastScroll = window.scrollY
}, { passive: true })

In the animate loop, make the orb larger when scrolling fast:
const baseSize = 400
const scrollBoost = Math.min(scrollVelocity * 3, 200)
const orbSize = baseSize + scrollBoost
orb.style.width = orbSize + 'px'
orb.style.height = orbSize + 'px'
orb.style.marginLeft = -(orbSize/2 - 200) + 'px'
orb.style.marginTop = -(orbSize/2 - 200) + 'px'

// Decay scroll velocity
scrollVelocity *= 0.85

This makes the orb bloom and expand when the user scrolls fast,
then contract back to normal. Creates a breathing, living quality.

Run npm run check. List files changed.
```

---

## PROMPT 3 — 3D Floating Elements Per Section

```
Read CLAUDE.md before starting.

Add a floating 3D geometric element to specific sections.
These are CSS 3D transforms — no Three.js, no extra bundle size.
They create the feeling that the 3D world from the hero extends
into the rest of the site.

Create: src/components/ui/FloatingGeometry.tsx

interface FloatingGeometryProps {
  variant: 'ring' | 'cube' | 'pyramid' | 'torus'
  color: string
  size?: number
  opacity?: number
  position?: { top?: string; right?: string; bottom?: string; left?: string }
  speed?: number
}

export function FloatingGeometry({
  variant,
  color,
  size = 120,
  opacity = 0.15,
  position = { top: '10%', right: '5%' },
  speed = 8,
}: FloatingGeometryProps) {
  
  // Each variant is pure CSS 3D
  const renderShape = () => {
    switch (variant) {
      case 'ring':
        return (
          <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            opacity,
            animation: `float3d ${speed}s ease-in-out infinite, spin3d ${speed * 3}s linear infinite`,
            transform: 'perspective(400px) rotateX(60deg)',
            boxShadow: `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
          }} />
        )
      
      case 'cube':
        return (
          <div style={{
            width: size * 0.6,
            height: size * 0.6,
            border: `1.5px solid ${color}`,
            opacity,
            animation: `float3d ${speed}s ease-in-out infinite, rotateCube ${speed * 2}s linear infinite`,
            transform: 'perspective(400px) rotateX(45deg) rotateY(45deg)',
            boxShadow: `0 0 20px ${color}30`,
          }} />
        )
      
      case 'pyramid':
        return (
          <div style={{
            width: 0,
            height: 0,
            borderLeft: `${size * 0.4}px solid transparent`,
            borderRight: `${size * 0.4}px solid transparent`,
            borderBottom: `${size * 0.7}px solid ${color}`,
            opacity: opacity * 0.8,
            animation: `float3d ${speed}s ease-in-out infinite`,
            filter: `drop-shadow(0 0 15px ${color}60)`,
          }} />
        )
      
      case 'torus':
        // Approximated with nested rings
        return (
          <div style={{ position: 'relative', width: size, height: size, animation: `float3d ${speed}s ease-in-out infinite` }}>
            {[0, 30, 60, 90, 120, 150].map(angle => (
              <div key={angle} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: size,
                height: size * 0.3,
                borderRadius: '50%',
                border: `1px solid ${color}`,
                opacity: opacity * 0.6,
                transform: `translate(-50%, -50%) rotateY(${angle}deg)`,
                boxShadow: `0 0 10px ${color}30`,
              }} />
            ))}
          </div>
        )
    }
  }
  
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 0,
        ...position,
      }}
    >
      {renderShape()}
    </div>
  )
}

Add to index.css:
@keyframes float3d {
  0%, 100% { transform: translateY(0px) perspective(400px) rotateX(60deg); }
  50% { transform: translateY(-20px) perspective(400px) rotateX(60deg); }
}
@keyframes spin3d {
  from { transform: perspective(400px) rotateX(60deg) rotateZ(0deg); }
  to { transform: perspective(400px) rotateX(60deg) rotateZ(360deg); }
}
@keyframes rotateCube {
  from { transform: perspective(400px) rotateX(45deg) rotateY(0deg); }
  to { transform: perspective(400px) rotateX(45deg) rotateY(360deg); }
}

PLACE FloatingGeometry in these sections:

Services section (top-right):
  <FloatingGeometry variant="ring" color="#4F46E5" size={160}
    opacity={0.12} position={{ top: '8%', right: '3%' }} speed={9} />

Process section (bottom-right of left column):
  <FloatingGeometry variant="cube" color="#F97316" size={80}
    opacity={0.15} position={{ bottom: '10%', right: '5%' }} speed={7} />

Stats section (top-left):
  <FloatingGeometry variant="pyramid" color="#F97316" size={100}
    opacity={0.12} position={{ top: '5%', left: '3%' }} speed={11} />

Portfolio section (top-right):
  <FloatingGeometry variant="torus" color="#06B6D4" size={140}
    opacity={0.10} position={{ top: '5%', right: '4%' }} speed={10} />

Testimonials section (bottom-left):
  <FloatingGeometry variant="ring" color="#EC4899" size={120}
    opacity={0.10} position={{ bottom: '5%', left: '2%' }} speed={8} />

Closing CTA section (center-right):
  <FloatingGeometry variant="cube" color="#4F46E5" size={100}
    opacity={0.12} position={{ top: '20%', right: '8%' }} speed={6} />

Each section needs: position: relative, overflow: hidden (if not already set)

The shapes are:
- Subtle (8-15% opacity) — they add depth without competing with content
- Different per section — ring, cube, pyramid, torus cycle through
- Different colors matching section glow — they reinforce the color story
- Always float gently — the continuous motion creates life

Run npm run check. List files changed.
```

---

## PROMPT 4 — Scroll Velocity Effects

```
Read CLAUDE.md before starting.

Add scroll velocity detection that affects multiple visual elements.
When scrolling fast: effects intensify. When slow/stopped: elements settle.
This creates a physical, alive feeling — the site responds to how you scroll.

Create: src/hooks/useScrollVelocity.ts

import { useEffect, useRef, useState } from 'react'

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())
  const rafRef = useRef<number>()
  const velocityRef = useRef(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const dt = now - lastTime.current
      const dy = Math.abs(window.scrollY - lastScrollY.current)
      
      if (dt > 0) {
        velocityRef.current = dy / dt * 10
      }
      
      lastScrollY.current = window.scrollY
      lastTime.current = now
    }
    
    const decay = () => {
      velocityRef.current *= 0.92
      setVelocity(velocityRef.current)
      rafRef.current = requestAnimationFrame(decay)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(decay)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])
  
  return velocity
}

Apply scroll velocity to THREE things:

THING 1 — Marquee speed:
In the marquee strip component, import useScrollVelocity
const velocity = useScrollVelocity()

Apply to the marquee animation duration:
<div style={{
  animation: `marquee ${Math.max(8, 35 - velocity * 2)}s linear infinite`
}}>

When scrolling fast: marquee speeds up dramatically (8s minimum)
When stopped: returns to normal 35s speed
This creates a visceral connection between scrolling and the marquee

THING 2 — Particle field speed:
In ParticleField.tsx, the particles already accelerate on scroll
Verify this is working from Week 2 Prompt A
If not: re-add the scrollVelocity multiplier

THING 3 — FloatingGeometry rotation speed:
Pass velocity to FloatingGeometry components
When velocity > 5: increase animation speed by 30%
Use CSS custom property:

In the parent section, set:
style={{ '--float-speed': `${Math.max(3, speed - velocity * 0.3)}s` }}

In FloatingGeometry, use var(--float-speed) in animation duration

THING 4 — Cursor orb size (already done in Prompt 2):
Verify the orb expands on fast scroll
If not working, simplify: just track window.scrollY change per frame

THING 5 — Section reveal threshold:
When scrolling very fast (velocity > 20):
  ScrollTrigger.config({ limitCallbacks: true })
  This prevents animation pile-up when scrubbing through quickly

When slow:
  ScrollTrigger.config({ limitCallbacks: false })

Add this to a useEffect in App.tsx:
import { useScrollVelocity } from '@/hooks/useScrollVelocity'
const velocity = useScrollVelocity()
useEffect(() => {
  if (velocity > 20) {
    ScrollTrigger.config({ limitCallbacks: true })
  } else {
    ScrollTrigger.config({ limitCallbacks: false })
  }
}, [velocity > 20])

Run npm run check. List files changed.
```

---

## PROMPT 5 — Final Color Update Across All Pages

```
Read CLAUDE.md before starting.

Do a complete search-and-replace for any remaining purple values
that were missed in Prompt Zero.

Run these searches in the codebase:

Search for and replace:
  purple-500 → indigo-500 (Tailwind classes)
  purple-600 → indigo-600
  purple-700 → indigo-700
  purple-400 → indigo-400
  from-purple → from-indigo
  to-purple → to-indigo
  via-purple → via-indigo
  ring-purple → ring-indigo

Also search for any remaining hex values:
  #7B2FBE → #4F46E5
  #9333EA → #4F46E5
  #8B5CF6 → #818CF8

Update the Three.js sphere in Hero.tsx if not done already:
Verify the wireframe glow color is now indigo not purple.
If you see 0x7C3AED anywhere in Hero.tsx → replace with 0x4F46E5

After replacing, check:
1. Navbar CTA button: should be indigo
2. Logo Z: should be indigo
3. Scroll progress bar: should start indigo
4. Hero sphere wireframe: should glow indigo
5. Magnetic button shadow: should be indigo glow

Also update the Three.js point light in hero to match:
  pL1.color = new THREE.Color(0x4F46E5)  -- indigo
  pL2.color = new THREE.Color(0xEC4899)  -- pink (keep)
  pL3.color = new THREE.Color(0x06B6D4)  -- cyan (keep)

The three-color lighting (indigo + pink + cyan) creates
rich color variation on the sphere surface.

Run npm run check. List all replacements made.
```

---

## RUN ORDER

0 → 1 → 2 → 3 → 4 → 5

After 0: Does the site look indigo instead of purple?
After 1: Does the sphere grow and float upward as you scroll?
After 2: Does a soft glow follow your cursor everywhere?
         Does it change color as you move between sections?
After 3: Can you see subtle geometric shapes in sections?
After 4: Does the marquee speed up when you scroll fast?
After 5: Is all purple gone from the entire site?

---

## AFTER ALL PROMPTS

The site will have:
- One accent color (indigo) used consistently everywhere
- Hero sphere that grows and exits on scroll
- Soft cursor orb that follows everywhere + changes color per section
- Floating 3D geometry in every major section
- Scroll velocity affecting marquee speed + particles + orb size
- Completely unified dark experience

Update docs/PROGRESS.md after completing all prompts.
Mark as: "3D Connected Experience — Complete"

WHAT REMAINS BEFORE LAUNCH:
1. Real founder photo
2. Real project screenshots
3. EmailJS contact form
4. Real testimonials
5. Deploy to ZenHost

These are content tasks. No more code needed until content is ready. -->