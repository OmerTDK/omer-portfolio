# Architectural Decision Records

## [2026-03-19] Hybrid 3D approach
**Context:** Need impressive 3D visuals without killing mobile performance
**Options:** Full Three.js everywhere, CSS-only, Hybrid
**Decision:** Three.js for hero only, Framer Motion + CSS 3D for rest
**Reason:** Hero gets 80% of first impressions; rest benefits more from speed than WebGL

## [2026-03-19] No GSAP pinning for Skills/Timeline
**Context:** Spec called for pinned sections using GSAP ScrollTrigger for both Skills and Experience
**Options:** Pin both, pin one, pin neither
**Decision:** No pinning — use scroll-triggered entrance animations instead
**Reason:** Two pinned sections on a single-page scroll site causes UX confusion. Entrance animations achieve the progressive reveal effect without breaking scroll flow.

## [2026-03-19] Hardcoded hex values in Tailwind classes
**Context:** CSS custom properties defined in globals.css, but Tailwind arbitrary values use hex directly
**Options:** Use hsl(var(--accent-blue)) everywhere, or use hex directly
**Decision:** Hardcoded hex in Tailwind classes (e.g., text-[#60a5fa])
**Reason:** Simpler, more readable, no dark/light mode toggle needed (dark only).

## [2026-03-19] Custom canvas particles instead of tsParticles
**Context:** About section needs particle constellation background
**Options:** tsParticles library, custom canvas, CSS-only
**Decision:** Custom canvas implementation (~50 lines)
**Reason:** tsParticles has unverified React 19 compatibility. Custom canvas is lighter, zero-dependency.
