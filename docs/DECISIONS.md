# Architectural Decision Records

## [2026-03-19] Framework: Next.js 16 + Tailwind v4
**Context:** Need a modern React framework with good DX, SSR, and Vercel deployment
**Decision:** Next.js 16 (App Router, Turbopack)
**Reason:** Best Vercel integration, Server Components, shadcn/ui compatibility

## [2026-03-19] Anonymize employer references
**Decision:** Replace company names with descriptors — "Fintech Startup", "Banking Partner", "Healthcare Provider", "Data Solutions Firm"
**Reason:** Industry standard: keep technical depth, remove identifying details

## [2026-03-19] 21st.dev components over custom-built
**Decision:** Use designer-made components from 21st.dev community registry
**Reason:** Designer-made components have visual craft that AI-generated code lacks

## [2026-03-20] Three portfolio versions for comparison
**Decision:** /paths (light editorial), /reuno (dark mesh gradient), /frost (light frosted glass)
**Reason:** User couldn't decide, wanted to compare with friends/family

## [2026-03-20] Frost as primary version
**Decision:** Frost version became the primary focus for all new features
**Reason:** Combines mesh gradient (living background) with light readability and macOS frosted glass aesthetic

## [2026-03-20] Tubelight floating nav
**Decision:** Replaced traditional fixed nav with floating pill navbar (tubelight style from 21st.dev)
**Reason:** More unique, matches the frost aesthetic, works on both mobile (bottom) and desktop (top)

## [2026-03-20] Project detail modal (Apple sheet-style)
**Decision:** Click project cards → slides up a modal sheet with full details instead of inline expand
**Reason:** Apple uses sheet-style modals. Cleaner than inline expansion, focused reading experience

## [2026-03-20] Smooth gradient transitions via RGB interpolation
**Decision:** Custom per-channel RGB interpolation with cubic ease over 1.8s using requestAnimationFrame
**Reason:** MeshGradient shader doesn't support CSS transitions. Manual interpolation creates smooth color flow

## [2026-03-20] Remove GlowCard (spotlight-card)
**Decision:** Removed GlowCard component, reverted to clean frosted glass divs
**Reason:** GlowCard added a dark halo/gradient overlay that made cards look "dirty" instead of premium

## [2026-03-20] Real work projects from codebase
**Decision:** Added 5 projects from actual work: Deal Volume Forecasting, AI Document Extraction, Executive KPI Dashboard, Tax Invoice Parser, Banking Loan Sale Automation
**Reason:** Shows real production engineering depth, all anonymized

## Standing decisions
- **No "Co-Authored-By: Claude" in commits** — user preference
- **Commit regularly** — document progress in git history
- **Feature branches** — `omer/` prefix, squash merge to main
- **Formspree ID** — placeholder `YOUR_FORM_ID`, user to configure
- **Profile picture** — downloaded from GitHub, used in About section
- **Firecrawl** — 500 credits, use sparingly
