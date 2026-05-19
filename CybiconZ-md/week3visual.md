# CybiconZ — Week 3: Visual Depth
# Magnetic buttons, 3D service panels, page transitions, preloader

---

## PROMPT E — Magnetic Buttons

```
Read CLAUDE.md before starting.

Add magnetic attraction to all CTA buttons.
When the cursor comes within 100px of a button, the button
and its text shift slightly toward the cursor position.
This is a micro-interaction that makes the site feel alive.

STEP 1 — Create: src/hooks/useMagneticButton.ts

import { useRef, useEffect } from 'react'

export function useMagneticButton(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on touch devices
    if ('ontouchstart' in window) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)
      const threshold = 120

      if (distance < threshold) {
        const pull = (1 - distance / threshold) * strength
        el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`
        const inner = el.querySelector('.magnetic-inner') as HTMLElement
        if (inner) {
          inner.style.transform = `translate(${distX * pull * 0.4}px, ${distY * pull * 0.4}px)`
        }
      } else {
        el.style.transform = 'translate(0px, 0px)'
        const inner = el.querySelector('.magnetic-inner') as HTMLElement
        if (inner) inner.style.transform = 'translate(0px, 0px)'
      }
    }

    const handleMouseLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      el.style.transform = 'translate(0px, 0px)'
      const inner = el.querySelector('.magnetic-inner') as HTMLElement
      if (inner) {
        inner.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        inner.style.transform = 'translate(0px, 0px)'
      }
      setTimeout(() => {
        el.style.transition = ''
        if (inner) inner.style.transition = ''
      }, 500)
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}

STEP 2 — Create: src/components/ui/MagneticButton.tsx

import { useMagneticButton } from '@/hooks/useMagneticButton'
import { Link } from 'react-router-dom'

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  external?: boolean
  strength?: number
}

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useMagneticButton(strength)

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    willChange: 'transform',
    cursor: 'none',
  }

  const variantStyles = {
    primary: 'bg-[#6D28D9] text-white font-bold text-sm px-8 py-4 rounded-xl shadow-[0_0_40px_rgba(109,40,217,0.35)] hover:bg-[#5B21B6] hover:shadow-[0_0_60px_rgba(109,40,217,0.5)] transition-colors duration-200',
    secondary: 'border border-white/12 text-white/70 font-semibold text-sm px-8 py-4 rounded-xl bg-white/[0.02] hover:bg-white/5 hover:border-white/25 transition-colors duration-200',
    ghost: 'text-[#A855F7] font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all duration-200',
  }

  const inner = (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      style={baseStyles}
      className={`${variantStyles[variant]} ${className}`}
    >
      <span className="magnetic-inner" style={{ display: 'flex', alignItems: 'center', gap: 'inherit', pointerEvents: 'none' }}>
        {children}
      </span>
    </span>
  )

  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>{inner}</a>
  }

  return <Link to={href} style={{ display: 'inline-block' }}>{inner}</Link>
}

STEP 3 — Replace CTA buttons across the site:
Find every primary and secondary CTA button in:
  - Hero section (Start a Project, See our work)
  - Closing CTA section (Start a conversation)
  - About page CTA
  - Services page CTA
  - Contact page submit is a form button — skip this one

Replace each with <MagneticButton> component.

Example replacement:
BEFORE:
  <Link to="/contact" className="bg-[#7C3AED] text-white...">
    Start a Project
  </Link>

AFTER:
  <MagneticButton href="/contact" variant="primary">
    Start a Project →
  </MagneticButton>

Do not touch the contact form submit button — magnetic effect on forms is bad UX.
Do not touch nav links — too small for magnetic effect.

Run npm run check. List files changed.
```

---

## PROMPT F — Service Panel 3D Entrance on Scroll

```
Read CLAUDE.md before starting.

Enhance the service panels with 3D entrance animations on scroll.
Currently the panels reveal with a clipPath wipe.
Add: as each panel enters viewport, it starts slightly rotated
then snaps flat — like a door opening toward you.

Find: src/components/sections/Services.tsx (or ServicesSection.tsx)

STEP 1 — Add GSAP ScrollTrigger to service panels:
(ScrollTrigger should already be registered globally from Week 2)

Add this useEffect to the Services component:

useEffect(() => {
  const panels = document.querySelectorAll('.service-panel-3d')
  if (!panels.length) return

  const ctx = gsap.context(() => {
    panels.forEach((panel, i) => {
      // Set initial state
      gsap.set(panel, {
        rotateX: 8,
        rotateY: -4,
        transformPerspective: 1200,
        transformOrigin: 'center top',
        opacity: 0,
        y: 60,
      })

      gsap.to(panel, {
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          once: true,
        },
        delay: i * 0.08,
      })
    })
  })

  return () => ctx.revert()
}, [])

STEP 2 — Add class to each service panel:
Each service panel div needs: className includes 'service-panel-3d'
Add this class alongside existing classes, don't remove existing ones.

STEP 3 — Enhance hover interaction on service panels:
The current hover shows description and sweeps a line.
Add these additional hover effects:

On the panel element, add event listeners for mouseenter/mouseleave:
  mouseenter: slight brightness increase on the image
    panel.querySelector('img').style.filter = 'brightness(0.55) saturate(1.1)'
  mouseleave: reset
    panel.querySelector('img').style.filter = 'brightness(0.35) saturate(0.8)'

Also: when hovering a service panel, the cursor ring in CustomCursor
should grow to 80px and show the service category text.
This requires a global cursor state.

Create: src/store/cursorStore.ts (or use React context)

Simple approach with a custom event:
On service panel mouseenter:
  window.dispatchEvent(new CustomEvent('cursor:label', {
    detail: { label: 'Explore', size: 'large' }
  }))
On mouseleave:
  window.dispatchEvent(new CustomEvent('cursor:label', {
    detail: { label: null, size: 'normal' }
  }))

In CustomCursor.tsx, listen for this event:
  window.addEventListener('cursor:label', (e: CustomEvent) => {
    if (e.detail.size === 'large') {
      // Grow ring to 80px
      // Show label text inside ring if provided
    } else {
      // Reset to normal 36px
    }
  })

Update the ring element style accordingly.

Do not touch any other section.
Run npm run check. List files changed.
```

---

## PROMPT G — Page Transitions + Preloader

```
Read CLAUDE.md before starting.

Add two things:
1. A preloader that shows on first visit (not on every page navigation)
2. Smooth page transitions when navigating between routes

STEP 1 — Create the Preloader:
Create: src/components/ui/Preloader.tsx

The preloader:
- Shows for 2 seconds on first visit to the site
- After 2 seconds: slides upward and reveals the page
- Only shows once per session (sessionStorage flag)
- Dark background #050507
- CybiconZ wordmark builds letter by letter in the center

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const text = textRef.current
    if (!el || !text) return

    // Build the wordmark letter by letter
    const letters = 'CybiconZ'.split('')
    text.innerHTML = letters
      .map(l => `<span style="display:inline-block;opacity:0;transform:translateY(20px)">${l}</span>`)
      .join('')

    const spans = text.querySelectorAll('span')

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide preloader up
        gsap.to(el, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete()
            el.style.display = 'none'
          }
        })
      }
    })

    // Letters appear one by one
    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.04,
      stagger: 0.07,
      ease: 'power2.out',
    })
    // Hold for a moment
    tl.to({}, { duration: 0.8 })
    // Letters fade out together
    tl.to(spans, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power2.in',
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050507',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        ref={textRef}
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(32px, 6vw, 64px)',
          letterSpacing: '-0.04em',
          color: '#F0EEFF',
        }}
      />
      {/* Thin progress line */}
      <div style={{
        width: '120px',
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '1px',
        overflow: 'hidden',
        marginTop: '16px',
      }}>
        <div
          style={{
            height: '100%',
            background: '#6D28D9',
            borderRadius: '1px',
            animation: 'preloaderBar 1.8s ease forwards',
          }}
        />
      </div>
    </div>
  )
}

Add to index.css:
@keyframes preloaderBar {
  from { width: 0% }
  to { width: 100% }
}

STEP 2 — Integrate Preloader in App.tsx:

import { useState, useEffect } from 'react'
import { Preloader } from '@/components/ui/Preloader'

In App component:
const [showPreloader, setShowPreloader] = useState(() => {
  // Only show on first visit per session
  if (sessionStorage.getItem('visited')) return false
  sessionStorage.setItem('visited', '1')
  return true
})

In the JSX, render Preloader before everything else:
{showPreloader && (
  <Preloader onComplete={() => setShowPreloader(false)} />
)}

The rest of the app renders normally — the preloader overlays it.

STEP 3 — Page transition wrapper:
Update: src/components/layout/PageWrapper.tsx

The current wrapper probably uses Framer Motion AnimatePresence.
Replace with this GSAP-based approach:

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Page enter animation
    gsap.fromTo(el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
    )
  }, [location.pathname])

  return (
    <div ref={ref} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  )
}

STEP 4 — Link transition effect:
When any nav link or CTA is clicked, add a brief flash transition.
Create: src/components/ui/TransitionOverlay.tsx

A div that:
- Sits at z-index 9000 (above content, below preloader/cursor)
- Normally: opacity 0, pointer-events none
- On navigation: briefly flashes to opacity 0.15 then back to 0
- Color: #6D28D9 (the accent violet)

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

export function TransitionOverlay() {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(el,
      { opacity: 0.2 },
      { opacity: 0, duration: 0.5, ease: 'power2.out' }
    )
  }, [location.pathname])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050507',
        zIndex: 9000,
        pointerEvents: 'none',
        opacity: 0,
      }}
    />
  )
}

Add <TransitionOverlay /> to App.tsx alongside the router.

Run npm run check. List all files created and changed.
```

---

## PROMPT H — Noise Texture + Final Atmosphere

```
Read CLAUDE.md before starting.

Add three final atmosphere details that elevate every dark section:
1. Subtle noise texture on dark sections
2. Animated gradient border on primary CTA buttons
3. Scroll progress indicator

STEP 1 — Noise texture:
In index.css, this class should already exist from earlier work:
.dark-texture {
  background-image: url("data:image/svg+xml,...");
}

If it exists: apply it to these sections by adding the class:
- Hero section
- Stats section
- Tech stack section
- Closing CTA section
- Footer

If it doesn't exist, add to index.css:
.dark-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 0;
}
Add position: relative to sections that use .dark-texture.

STEP 2 — Scroll progress bar:
Create: src/components/ui/ScrollProgress.tsx

A thin line at the very top of the viewport that fills as user scrolls.

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current
      if (!el) return
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrolled / total, 1)
      el.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.05)',
      }}
    >
      <div
        ref={ref}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #6D28D9, #A855F7, #EC4899)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          transition: 'transform 0.1s linear',
        }}
      />
    </div>
  )
}

Add <ScrollProgress /> to App.tsx at root level.

STEP 3 — Animated gradient border on primary buttons:
In index.css, add:

@keyframes borderRotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.btn-animated-border {
  position: relative;
  z-index: 0;
}
.btn-animated-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    #6D28D9, #A855F7, #EC4899, #6D28D9
  );
  background-size: 300% 300%;
  animation: borderRotate 4s ease infinite;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.btn-animated-border:hover::before {
  opacity: 1;
}

Add class btn-animated-border to MagneticButton primary variant.
This creates an animated gradient border that appears on hover.

STEP 4 — Update CLAUDE.md to reflect completed state:
Add to CLAUDE.md under "Current State":

## Current Animations (Week 3 complete)
- Preloader: letter-by-letter on first visit
- Hero: parallax scroll exit + particle field
- Service panels: 3D entrance on scroll
- Stats: count-up on scroll entry
- Portfolio: horizontal scroll on desktop
- Headlines: word-by-word reveal on scroll
- Buttons: magnetic attraction within 120px
- Page transitions: fade + y on route change
- Scroll progress: gradient bar at top of viewport

Run npm run check. List ALL files created and changed.
```

---

## ORDER

E → F → G → H

After each: open browser, verify it works.

After E: hover a CTA button — does it pull toward cursor?
After F: scroll to services — do panels rotate then flatten as they enter?
After G: refresh the page — does preloader appear? Navigate between pages — does it transition?
After H: scroll any page — is there a gradient progress bar at top? Hover a primary button — does an animated border appear?

---

## AFTER ALL 4 COMPLETE

```
Update docs/PROGRESS.md.

Mark Week 3 complete:
- Magnetic CTA buttons with cursor attraction
- Service panels: 3D rotation entrance on scroll
- Cursor label on service panel hover
- Preloader: letter-by-letter on first visit (sessionStorage)
- Page transitions: fade + y
- Transition overlay: violet flash between routes
- Noise texture on dark sections
- Scroll progress bar: gradient line at top
- Animated gradient border on primary button hover

Move to ✅ COMPLETED.
Note any issues in Known Issues.
Update last updated date.
```