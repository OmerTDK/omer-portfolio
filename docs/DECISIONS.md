# Architectural Decision Records

## [2026-03-19] Framework: Next.js 16 + Tailwind v4
**Context:** Need a modern React framework with good DX, SSR, and Vercel deployment
**Options:** Next.js 16, Astro, plain Vite+React
**Decision:** Next.js 16 (App Router, Turbopack)
**Reason:** Best Vercel integration, Server Components for performance, shadcn/ui compatibility, Geist fonts built-in

## [2026-03-19] Initial approach: Hybrid 3D (Three.js hero + Framer Motion)
**Context:** User wanted "super cool 3D animations"
**Options:** Full Three.js everywhere, CSS-only, Hybrid
**Decision:** Three.js Data Globe for hero, Framer Motion for scroll animations
**Reason:** Hero gets 80% of first impressions; rest benefits more from speed than WebGL
**Status:** SUPERSEDED — user found the globe generic, pivoted to designer-made components

## [2026-03-19] Color palette v1: Blue Spectrum (cold navy)
**Context:** User chose "Blue Spectrum" from 4 palette options
**Decision:** Dark base (#050810), blue (#60a5fa), violet (#8b5cf6), cyan (#22d3ee)
**Status:** SUPERSEDED — user found it too cold/sterile, pivoted to warm charcoal then to Reuno aesthetic

## [2026-03-19] Color palette v2: Warm charcoal
**Context:** Cold navy felt "generic and AI-made"
**Decision:** Warm charcoal (#1a1a1a), frosted glass effects, same accent colors
**Status:** SUPERSEDED — still felt like color swaps, not a real redesign

## [2026-03-19] Anonymize employer references
**Context:** Original content named Cloover, BAWAG, Bubble.io directly
**Options:** Keep real names, fully anonymize, partial anonymize
**Decision:** Replace with descriptors — "Fintech Startup", "Banking Partner"
**Reason:** Industry standard: keep technical depth, remove identifying details. Protects employer while showcasing skills.

## [2026-03-19] Include all projects (not just current role)
**Context:** Initial build only had 4 Cloover projects, user has 14 GitHub repos + old portfolio projects
**Decision:** Include 9 projects spanning Data Engineering, Data Science, and Analytics categories
**Reason:** Shows breadth and depth, includes GitHub links for credibility

## [2026-03-19] Contact form with Formspree (no backend)
**Context:** User wanted contact form, not just links
**Options:** Server Action + email API, Formspree, Calendly embed, links only
**Decision:** Formspree for the form + social links alongside
**Reason:** No backend needed, free tier sufficient, form + links is modern standard

## [2026-03-19] Ditch custom-built components for 21st.dev
**Context:** Multiple iterations of custom heroes/sections felt "generic" and "AI-made"
**Options:** Keep iterating on custom components, use 21st.dev pre-built components, use v0
**Decision:** Install and evaluate 21st.dev community components (shadcn-compatible)
**Reason:** Designer-made components have visual craft that AI-generated code lacks. They install via `npx shadcn@latest add` and are fully customizable.

## [2026-03-19] Hero finalists from 21st.dev
**Context:** Installed 9 hero components, user narrowed to 4, then 3 favorites
**Components evaluated:** Background Paths, Aurora Flow, Hero 01, Reuno Hero, Easemize Hero, Wrap Shader, Splite, Glowy Waves, Spatial Showcase
**User's top 3:** Background Paths (#1), Reuno Hero (#3), Wrap Shader (#4)
**Reason for elimination:** Aurora Flow had WebGL issues; others didn't match user's aesthetic preference

## [2026-03-20] Two-version approach
**Context:** User couldn't choose between Background Paths (clean/Apple) and Reuno (dark/immersive)
**Options:** Pick one, combine elements, build both
**Decision:** Build two fully separate versions at /paths and /reuno with a chooser at /
**Reason:** User wants to compare with friends/family before committing. Each version is cohesive — one visual language throughout.

## [2026-03-20] Reuno version: ONE persistent mesh gradient
**Context:** Earlier attempts mixed different visual styles per section (globe, particles, shaders) — felt incoherent
**Decision:** Single fixed MeshGradient background for entire page, all content scrolls over it
**Reason:** Sites user admired (anime.js, igloo.inc) all have one consistent visual identity. Glass cards + consistent cyan/orange accents unify the sections.

## [2026-03-20] Paths version: Light/white aesthetic
**Context:** Background Paths component is naturally light/neutral
**Decision:** White background, neutral gray borders, black text — fully separate from dark version
**Reason:** Matches Apple-like clean aesthetic. No dark mode, no glass effects — a completely different visual language.

## [2026-03-20] Unique section layouts per version (not just color swaps)
**Context:** Both versions had identical section layouts with just colors changed — felt like the same site
**Options:** Shared components with theme props, fully separate pages
**Decision:** Each version is a fully self-contained page with unique layouts per section
**Reason:** The Paths version uses editorial layouts (tilted photo, horizontal pills, featured+compact cards, text links) while Reuno uses immersive layouts (glass panels, glowing grids, horizontal scroll timeline). They should feel like different websites.

## [2026-03-20] Reuno palette: monochrome + subtle blue (Apple-like)
**Context:** Original Reuno had vibrant cyan + orange — too colorful, not Apple-like
**Options:** Keep vibrant, go monochrome, muted single accent
**Decision:** Monochrome mesh gradient (`#000, #1a1a1a, #2a2a2a, #0a0a0a, #1e3a5f`) with blue-400 as single accent
**Reason:** Apple product pages use near-monochrome with one subtle accent. Deep blacks with a barely-there blue feels premium and restrained.

## Standing decisions
- **No "Co-Authored-By: Claude" in commits** — user preference
- **Commit regularly** — document progress in git history
- **Feature branches** — `omer/` prefix, squash merge to main
- **Formspree ID** — placeholder `YOUR_FORM_ID`, user to configure after choosing version
- **Profile picture** — downloaded from GitHub, used in About section
