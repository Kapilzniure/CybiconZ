# CybiconZ — Week 2: Scroll Storytelling
# Run these prompts ONE AT A TIME in Claude Code (VS Code terminal)
# After each prompt: check browser, verify it works, THEN move to next

---

## PROMPT A — Hero Scroll Parallax + Particle Field

```
Read CLAUDE.md before starting.

Add scroll-based animation to the Hero section.
When the user scrolls past the hero, two things happen simultaneously:
1. The headline text scales up slightly and fades out (feels like "entering" the site)
2. Floating particles drift upward and disappear

This uses GSAP ScrollTrigger. Install if not already:
npm install gsap

STEP 1 — Register ScrollTrigger in main.tsx or App.tsx:
Add at the top:
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

Do NOT add it inside the Hero component — register once globally.

STEP 2 — Update Hero.tsx with scroll animations:

Inside the Hero component, add a new useEffect for scroll animations.
Keep the existing GSAP entrance animations (the ones on mount).
Add this AFTER the existing useEffect:

useEffect(() => {
  // Pin the hero content while scroll happens
  const heroSection = document.getElementById('hero-section')
  const headlineEl = document.getElementById('hero-headline')
  const subEl = document.getElementById('hero-sub')
  const ctaEl = document.getElementById('hero-ctas')
  
  if (!heroSection || !headlineEl) return

  // As user scrolls through hero:
  // Headline scales up + fades
  gsap.to(headlineEl, {
    scale: 1.08,
    opacity: 0,
    y: -40,
    ease: 'power2.in',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    }
  })

  // Subheadline fades faster
  gsap.to(subEl, {
    opacity: 0,
    y: -20,
    ease: 'power2.in',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: '60% top',
      scrub: 0.8,
    }
  })

  // CTAs fade out first
  gsap.to(ctaEl, {
    opacity: 0,
    y: -15,
    ease: 'power1.in',
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: '40% top',
      scrub: 0.6,
    }
  })

  return () => ScrollTrigger.getAll().forEach(t => t.kill())
}, [])

STEP 3 — Add IDs to hero elements:
Add id="hero-section" to the section element
Add id="hero-headline" to the div containing the three headline lines
Add id="hero-sub" to the subheadline paragraph
Add id="hero-ctas" to the CTAs div

STEP 4 — Add canvas particle field to Hero:
Below the Three.js canvas div, add a second canvas for particles.
Create a new component: src/components/ui/ParticleField.tsx

ParticleField component:
- Canvas fills the hero section (position absolute, inset 0, z-index 1)
- 60 particles: each is a small dot (radius 1-2px)
- Colors: cycle through rgba(124,58,237,0.6), rgba(168,85,247,0.4), rgba(6,182,212,0.3)
- Each particle starts at random x position, random y between 20% and 90% of height
- Particles drift UPWARD slowly (y -= 0.3 to 0.8 per frame, random per particle)
- When particle reaches top: reset to bottom with new random x
- Opacity pulses: Math.sin(Date.now() * 0.001 + particle.seed) maps to 0.2-0.8
- On scroll: drift speed multiplies by (1 + scrollY * 0.003)
  So scrolling makes particles rush upward faster

ParticleField.tsx:
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  radius: number
  seed: number
  colorIndex: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const colors = [
      'rgba(124,58,237,',
      'rgba(168,85,247,',
      'rgba(6,182,212,',
      'rgba(236,72,153,',
    ]
    
    let particles: Particle[] = []
    let animId: number
    let scrollY = 0
    
    const handleScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }
    
    function initParticles() {
      particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.5,
        radius: 1 + Math.random() * 1.5,
        seed: Math.random() * Math.PI * 2,
        colorIndex: Math.floor(Math.random() * colors.length),
      }))
    }
    
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const scrollMult = 1 + scrollY * 0.004
      
      particles.forEach(p => {
        p.y -= p.speed * scrollMult
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        
        const opacity = 0.2 + Math.abs(Math.sin(Date.now() * 0.001 + p.seed)) * 0.6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = colors[p.colorIndex] + opacity + ')'
        ctx.fill()
      })
      
      animId = requestAnimationFrame(draw)
    }
    
    new ResizeObserver(resize).observe(canvas)
    resize()
    draw()
    
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

Add <ParticleField /> inside the hero section, after the Three.js canvas div.

STEP 5 — Make hero section taller to give scroll room:
Change hero min-height from 100vh to 140vh
This gives the scroll animation time to play out before the next section appears.
The hero content should be centered vertically within the first 100vh,
so the extra 40vh is below the fold — scroll room only.

Do not change anything outside the Hero component and its new ParticleField.
Run npm run check after. List files changed.
```

---

## PROMPT B — Stats Counter Animation

```
Read CLAUDE.md before starting.

Add count-up animation to the Stats section.
When the stats scroll into view, numbers count up from 0 to their final value.

Find the Stats section component (likely src/components/sections/Stats.tsx or StatsSection.tsx).

STEP 1 — Create a counter hook:
Create src/hooks/useCountUp.ts

import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  decimals?: number
  suffix?: string
  startOnView?: boolean
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  startOnView = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!startOnView) {
      start()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          start()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  function start() {
    const startTime = performance.now()
    const startValue = 0

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (end - startValue) * eased
      setCount(parseFloat(current.toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(update)
      else setCount(end)
    }

    requestAnimationFrame(update)
  }

  return { count, ref, suffix }
}

STEP 2 — Update the Stats section:

The stats are: 2+ / 100% / 1 day / 2022

For each stat, use the hook:

import { useCountUp } from '@/hooks/useCountUp'

Inside the component, create refs for each stat:
const stat1 = useCountUp({ end: 2, suffix: '+', duration: 1500 })
const stat2 = useCountUp({ end: 100, suffix: '%', duration: 2000 })
// "1 day" and "2022" — don't animate these, they're text/year

For the number display, change from static text to:
<span ref={stat1.ref}>
  {stat1.count}{stat1.suffix}
</span>

"1 day" stays as static text (animating time units looks wrong).
"2022" stays as static text (year doesn't need counting).

STEP 3 — Add the atmospheric glow to Stats section:
Stats section has a purple-gradient background currently.
Add an orange warm glow behind the content:

Add to the Stats section container:
position: relative, overflow: hidden

Add inside (position absolute):
<div style={{
  position: 'absolute',
  top: '50%',
  left: '30%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(rgba(249,115,22,0.12), transparent 65%)',
  pointerEvents: 'none',
}} />

This adds a warm orange glow to the purple gradient background,
making the stats section feel different from the hero's violet.

Only change: Stats section + new useCountUp hook.
Run npm run check. List files changed.
```

---

## PROMPT C — Horizontal Scroll Portfolio

```
Read CLAUDE.md before starting.

Transform the Portfolio section into a horizontal scroll experience.
On desktop: user scrolls vertically but the projects move horizontally.
On mobile: normal vertical layout.

This uses GSAP ScrollTrigger's horizontal scroll technique.

STEP 1 — Verify ScrollTrigger is registered globally (from Prompt A).
If Prompt A was not run yet, add this to main.tsx:
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

STEP 2 — Update the Portfolio section:
Find: src/components/sections/Portfolio.tsx (or PortfolioSection.tsx)

Change the layout structure:

OUTER wrapper (this is what gets pinned):
  id="portfolio-section"
  position: relative
  height: 100vh (fixed viewport height — scroll happens inside this)
  overflow: hidden

HORIZONTAL TRACK (this moves left as you scroll):
  id="portfolio-track"  
  display: flex
  flex-direction: row
  align-items: center
  height: 100%
  will-change: transform
  padding: 0 80px
  gap: 24px

PROJECT CARDS inside the track:
Each card: flex-shrink: 0, width: 600px on desktop

Include:
- Section header card (not a project — just the title/eyebrow) width: 400px
- LwangBlack featured card: width: 700px, height: 480px
- Johnnies card: width: 560px, height: 480px  
- "03 Coming soon" placeholder: width: 400px, height: 480px
- "04 Coming soon" placeholder: width: 400px, height: 480px

STEP 3 — Add the GSAP horizontal scroll logic:
In a useEffect with cleanup:

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useEffect(() => {
  const track = document.getElementById('portfolio-track')
  const section = document.getElementById('portfolio-section')
  if (!track || !section) return

  // Calculate total scroll width
  const totalWidth = track.scrollWidth - window.innerWidth

  const ctx = gsap.context(() => {
    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    })
  })

  return () => ctx.revert()
}, [])

STEP 4 — Card designs for horizontal layout:

Header card (first card):
  No border, just text
  background: transparent
  Eyebrow: "Our Works" in DM Mono violet
  H2: "Work we're building." in Bricolage 800, white, 64px
  Subtext: 15px muted, max-w 280px

Project cards (LwangBlack, Johnnies):
  background: #0D0E1C
  border: 1px solid rgba(255,255,255,0.07)
  border-radius: 24px
  overflow: hidden
  position: relative
  
  Top 60%: image
    overflow: hidden
    img: width 100%, height 100%, object-fit cover
    img transition: transform 0.8s ease
    On card hover: img scale(1.06)
  
  Bottom 40%: info
    padding: 28px
    Status badge (top of info, if in progress):
      amber dot + "In Development" — DM Mono 10px
    Client: DM Mono 11px rgba(255,255,255,0.3) uppercase
    Title: Bricolage 700 22px white
    Description: Plus Jakarta 13px muted, 2 lines max
    Tags: small pills

Placeholder cards:
  background: rgba(255,255,255,0.02)
  border: 1.5px dashed rgba(255,255,255,0.08)
  border-radius: 24px
  display: flex, align-items: center, justify-content: center
  flex-direction: column, gap: 8px
  Large ghost number: Bricolage 900, 100px, rgba(255,255,255,0.04)
  Text: "Coming soon" — DM Mono 12px rgba(255,255,255,0.2)

STEP 5 — Mobile fallback:
Wrap the GSAP useEffect in a media query check:
if (window.innerWidth < 768) return

On mobile, the layout falls back to normal vertical stacking.
The horizontal track on mobile:
  flex-direction: column
  height: auto
  overflow: visible
  padding: 0 20px

Cards on mobile: width: 100%, height: auto, aspect-ratio: 4/3

STEP 6 — Filter tabs:
Place filter tabs ABOVE the portfolio section (outside the pinned area).
They stay visible above as the horizontal scroll happens.
They don't need to work functionally yet — just display correctly.

Do not touch any other section.
Run npm run check. List files changed.
```

---

## PROMPT D — Word-by-Word Text Reveal on Scroll

```
Read CLAUDE.md before starting.

Add word-by-word scroll-triggered text reveal to section headlines and 
service descriptions. Text reveals as user scrolls to it, not on page load.

This creates the "reading" feeling — text appears as your eye reaches it.

STEP 1 — Create a reusable hook:
Create src/hooks/useTextReveal.ts

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useTextReveal(selector: string, options?: {
  delay?: number
  stagger?: number
  start?: string
}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      elements.forEach(el => {
        // Split text into word spans
        const text = el.textContent || ''
        const words = text.split(' ').filter(w => w.length > 0)
        
        el.innerHTML = words
          .map(word => `<span class="reveal-word" style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em"><span class="reveal-inner" style="display:inline-block;transform:translateY(110%)">${word}</span></span>`)
          .join('')

        gsap.to(el.querySelectorAll('.reveal-inner'), {
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: options?.stagger ?? 0.06,
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? 'top 85%',
            once: true,
          }
        })
      })
    })

    return () => ctx.revert()
  }, [selector])
}

STEP 2 — Apply to section headlines:
In the main page component (Home.tsx), call the hook:

import { useTextReveal } from '@/hooks/useTextReveal'

Inside the component:
useTextReveal('.section-headline-reveal', { stagger: 0.05 })
useTextReveal('.service-desc-reveal', { stagger: 0.03, start: 'top 90%' })

STEP 3 — Add the class to headlines:
Add className="section-headline-reveal" to these elements:
- Services section H2
- Process section H2
- Portfolio section H2
- Testimonials section H2
- CybiLearn section H2
- About page H1 and H2s

Add className="service-desc-reveal" to:
- Each service panel description text
- Process step descriptions
- About page body paragraphs (first paragraph only per section)

IMPORTANT: Do NOT add this to the Hero headline.
The hero already has its own GSAP entrance animation.
This hook is for scroll-triggered reveals in other sections only.

STEP 4 — Add atmospheric section glows:
While in each section, add a position:absolute radial glow div.
These create the "one continuous scene" feeling.

In each dark section, add this pattern inside the section container
(position: relative, overflow: hidden required on the section):

// Services section: violet glow
<div style={{
  position:'absolute', top:'-200px', right:'-200px',
  width:'600px', height:'600px', borderRadius:'50%',
  background:'radial-gradient(rgba(109,40,217,0.1), transparent 65%)',
  pointerEvents:'none', zIndex:0,
}} />

// Stats section: orange glow (already added in Prompt B)

// CybiLearn section: emerald glow (probably already exists)

// Closing CTA section: violet glow, centered
<div style={{
  position:'absolute', top:'50%', left:'50%',
  transform:'translate(-50%,-50%)',
  width:'800px', height:'800px', borderRadius:'50%',
  background:'radial-gradient(rgba(109,40,217,0.12), transparent 65%)',
  pointerEvents:'none',
}} />

Add glows to: Hero (existing violet), Stats (orange from Prompt B),
CTA closing section (violet centered).
Check all dark sections have at least one glow.

Do not change light sections (#F4F2FF sections) — they don't need glows.

Run npm run check. List files changed.
```

---

## ORDER AND TIMING

Run one prompt at a time:

1. PROMPT A — Hero scroll + particles
   After running: scroll through the hero. Does text fade as you scroll?
   Do particles move? If yes → continue.

2. PROMPT B — Stats counter
   After running: scroll to stats. Do numbers count up from 0?
   Is the orange glow visible? If yes → continue.

3. PROMPT C — Horizontal portfolio  
   After running: scroll to portfolio. Does it scroll horizontally?
   Does it pin correctly? Test on mobile (resize browser to 375px) → continue.

4. PROMPT D — Text reveal + glows
   After running: scroll through the site. Do headlines reveal word by word?
   Are glows visible in dark sections? If yes → Week 2 complete.

---

## AFTER ALL 4 PROMPTS

Run this final prompt:

```
Update docs/PROGRESS.md.

Mark Week 2 as complete:
- Hero scroll parallax: text fades out as user scrolls past hero
- Particle field: particles drift upward and accelerate on scroll
- Stats counter: numbers count up on scroll entry
- Horizontal portfolio: projects scroll horizontally on desktop
- Word-by-word text reveal on all section headlines
- Atmospheric glows added to all dark sections

Move to ✅ COMPLETED.
Add to Known Issues anything that didn't work as expected.
Update last updated date.
```