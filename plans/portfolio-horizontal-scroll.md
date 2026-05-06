# Plan: Portfolio Section Horizontal Scroll

Objective: Transform the Portfolio section into a horizontal scrolling experience on desktop, while maintaining a standard vertical layout on mobile.

## Key Files & Context
- `src/components/sections/Portfolio.tsx`: This file will be refactored to implement the horizontal scroll.
- `src/index.css` or `tailwind.config.ts`: May need global CSS or utility classes if specific scroll-related styles are required.
- GSAP libraries will be used as specified.

## Current State Analysis
The current Portfolio section displays a featured project followed by a grid of other projects. This needs to be changed to a linear horizontal arrangement for desktop scrolling.

## Design & Planning

### 1. Structure for Horizontal Scroll (Desktop)
-   **Outer Wrapper (`#portfolio-section`):**
    -   `position: relative;`
    -   `height: 100vh;` (fixed viewport height to contain the scrollable content)
    -   `overflow: hidden;` (to clip the horizontal movement)
-   **Horizontal Track (`#portfolio-track`):**
    -   `display: flex;`
    -   `flex-direction: row;` (stacks cards horizontally)
    -   `align-items: center;`
    *   `height: 100%;`
    *   `will-change: transform;` (performance hint)
    *   `padding: 0 80px;` (desktop horizontal padding)
    *   `gap: 24px;`

### 2. Card Sizing and Content
-   **Section Header Card:** `width: 400px`. Styles: transparent background, specific eyebrow/H2/subtext.
-   **Featured LwangBlack Card:** `width: 700px`, `height: 480px`. Styles: specific background, border, image, info layout.
-   **Johnnies Card:** `width: 560px`, `height: 480px`. Styles similar to LwangBlack card.
-   **Placeholder Cards ("Coming soon"):** `width: 400px`, `height: 480px`. Styles: dashed border, ghost number, specific text.
-   **Other Project Cards:** Not explicitly sized for horizontal track but will be inside it. Their default width will be controlled by the flex container.

### 3. GSAP ScrollTrigger Logic
-   **Imports:** `gsap`, `ScrollTrigger`.
-   **`useEffect` Hook:**
    -   Get references to `#portfolio-track` and `#portfolio-section`.
    -   Calculate `totalWidth = track.scrollWidth - window.innerWidth`.
    -   Use `gsap.to(track, { x: -totalWidth, ease: 'none', scrollTrigger: { trigger: section, pin: true, scrub: 1, start: 'top top', end: () => `+=${totalWidth}`, invalidateOnRefresh: true, anticipatePin: 1 } })`.
    -   Return `ctx.revert()` for cleanup.

### 4. Mobile Fallback
-   Wrap GSAP logic and potentially structural changes within `if (window.innerWidth < 768) return;`.
-   On mobile:
    -   Revert to vertical layout (`flex-direction: column`, `height: auto`, `overflow: visible`).
    -   Cards: `width: 100%`, `height: auto`, `aspect-ratio: 4/3`.
    *   Padding: `0 20px`.

### 5. Filter Tabs
-   Place tabs above the pinned section. They should remain static and visible.

## Implementation Steps

1.  **Modify `src/components/sections/Portfolio.tsx`:**
    *   Import `gsap` and `ScrollTrigger`.
    *   Refactor the JSX structure to include the outer wrapper (`#portfolio-section`) and the horizontal track (`#portfolio-track`).
    *   Adjust card styling (width, height, positioning) for the horizontal layout.
    *   Implement the specific designs for the header, featured, Johnnies, and placeholder cards.
    *   Add the `useEffect` hook with GSAP ScrollTrigger logic.
    *   Implement the mobile fallback using `window.innerWidth` check within `useEffect` or conditionally render different structures.
    *   Ensure filter tabs are placed correctly above the horizontal scroll area.
2.  **Update `docs/PROGRESS.md`:** Add a note about the Portfolio section horizontal scroll implementation.

## Verification Plan
-   **Desktop:**
    *   Verify vertical scrolling causes horizontal movement of projects within the pinned section.
    *   Check that all cards are visible and scroll smoothly.
    *   Inspect header, featured, Johnnies, and placeholder card designs.
    *   Confirm filter tabs are visible above the pinned section.
-   **Mobile:**
    *   Verify the layout reverts to normal vertical stacking.
    *   Check card responsiveness and layout.
-   Confirm no horizontal scrollbars appear on desktop except within the intended track.
-   Check console for GSAP or React errors.
