# Build Progress

## [2026-03-19] Phase 1: Initial scaffold
- Created Next.js 16 project with Tailwind v4, TypeScript, shadcn/ui, Geist fonts
- Installed: React Three Fiber v9, motion (Framer Motion v11), GSAP, Vercel Analytics, lucide-react
- Set up Blue Spectrum color palette (cold navy dark theme)
- Created shared hooks: useScrollProgress, useReducedMotion, useMediaQuery, useWebGLSupport
- Created shared components: SectionWrapper, ScrollReveal
- Commits: `380591d` through `4a24bce`

## [2026-03-19] Phase 2: All sections built
- Navigation: Fixed top nav with scroll tracking, mobile hamburger, smooth scroll
- Hero: Three.js Data Globe with 200 nodes, wireframe sphere, mouse parallax, CSS fallback
- About: Canvas particle constellation, counting stats animation, profile photo
- Skills: Orbital system (CSS 3D rings), mobile grid fallback
- Projects: Pipeline flow animation (RAW→STG→DWH→GOLD), expandable cards
- Experience: GSAP ScrollTrigger timeline with scroll-triggered entries
- Contact: Social links + footer
- SEO: JSON-LD Person schema, OG image (Satori), robots.txt, sitemap.xml
- Commits: `1c3d3d2` through `4535da5`
- First deployment to Vercel: https://omer-portfolio-ten.vercel.app

## [2026-03-19] Phase 3: Content rework
- Expanded from 4 to 9 projects (added GitHub repos + old portfolio work)
- Anonymized Cloover references → "Fintech Startup", "Banking Partner"
- Added project categories with filter (Data Engineering, Data Science, Analytics)
- Added profile photo to About section (asymmetric layout)
- Replaced orbital skills with bento grid
- Added contact form (Formspree placeholder)
- Added GitHub links on project cards
- Commit: `266ee9d`

## [2026-03-19] Phase 4: Visual overhaul attempts
**User feedback:** "feels very AI made, lacks personality", "no Apple vibe"

### Attempt 1: Apple typography rework
- Made headings 5xl-6xl, added gradient text, section-specific accent colors
- Added glowing dividers between sections, distinct section backgrounds
- Result: Better typography but still felt like a template
- Commit: on `omer/apple-vibe-rework` branch

### Attempt 2: Warm charcoal + frosted glass
- Swapped cold navy (#050810) for warm charcoal (#1a1a1a)
- Added glassmorphism (backdrop-blur, bg-white/5, border-white/10)
- Added mesh gradient hero (replacing Three.js globe)
- Result: "feels very similar to our earlier version except its slightly brownish"
- Commit: `Visual rebuild: warm charcoal, frosted glass, mesh gradient hero, per-section accents`

### User research phase
User shared inspiration sites:
- **anime.js** — scroll-driven narrative, warm dark, per-section accent colors, interactive demos
- **igloo.inc** — full 3D immersive world, monochromatic, scroll-driven camera
- **hear.ai** — warm charcoal, elegant serif typography, subtle wireframe accents
- **celialopez.fr** — designer portfolio
- **webflow.com** — Apple-level polish
- **glaze.app / trylumnea.com** — frosted glass aesthetic
- **21st.dev** — component marketplace with 73+ hero components, shaders, backgrounds

**Key insight:** The sites user loved were designed by designers. Custom AI-generated components lack that craft. Solution: use designer-made components from 21st.dev.

## [2026-03-19] Phase 5: 21st.dev component evaluation
- Installed 9 hero components from 21st.dev community registry
- Created /showcase page to compare all 9 side by side
- User narrowed to 4 finalists: Background Paths, Aurora Flow, Reuno Hero, Wrap Shader
- Fixed Aurora Flow (missing "use client" directive)
- Customized all 4 with user's actual content (name, title, tagline)
- User's final favorites: Background Paths (#1), Reuno (#3), Wrap Shader (#4)
- Commits: `407e390`, `232161e`, `013f2e5`

## [2026-03-19] Phase 6: Reuno full rebuild
- User chose Reuno mesh gradient aesthetic
- Built entire site with ONE persistent MeshGradient as fixed background
- All sections scroll over the living gradient
- Glass cards, cyan/orange accent colors throughout
- Result: Cohesive but user wanted to also see Background Paths version
- Commit: `Full rebuild: Reuno mesh gradient as persistent background, cohesive aesthetic throughout`

## [2026-03-20] Phase 7: Two-version comparison (current)
- Created /paths — full portfolio with Background Paths hero, white/clean/Apple aesthetic
- Created /reuno — full portfolio with mesh gradient background, dark/immersive/glass
- Created / — chooser page linking to both versions
- Both share same content from lib/data.ts
- Deployed for user + friends/family feedback
- Commit: `aa07015`
- Live: https://omer-portfolio-ten.vercel.app

## [2026-03-20] Phase 8: Unique section designs per version
- **Paths version** completely rebuilt with light editorial aesthetic:
  - Light hero (white bg, dark flowing SVG lines — fixed framer-motion import)
  - Magazine-style About with tilted photo, two-tone heading, oversized stats
  - Horizontal pill layout for Skills (category label → pills flow right)
  - Featured + compact project cards with text-tab filters (animated underline)
  - Clean left-aligned timeline with dot+line connectors
  - Minimal centered contact with text social links
  - Custom inline light nav (no shared Navbar component)
- **Reuno version** completely rebuilt with dark immersive aesthetic:
  - Floating glass panel About (photo+text+stats in one container)
  - Glowing dot grid for Skills with color-coded categories
  - Stronger glass project cards with glow on hover
  - Horizontal scrolling timeline with snap points
  - Glass form inputs with gradient submit button
- Commits: `30aa284`, `ab7becc`

## [2026-03-20] Phase 9: Apple-like refinement for Reuno
- Changed mesh gradient from vibrant cyan/orange to monochrome with subtle blue
  - New colors: `["#000000", "#1a1a1a", "#2a2a2a", "#0a0a0a", "#1e3a5f"]`
  - Reduced dark overlay opacity for more gradient visibility
- Swapped all accent colors: cyan → blue-400, orange → blue-300
- Single muted blue accent throughout — much more Apple-like
- Updated nav active state to match (blue-400)
- Commit: `f32bece`

## Next steps
- [ ] User picks final version based on feedback
- [ ] Polish chosen version (animations, mobile, details)
- [ ] Set up Formspree account and configure contact form
- [ ] Buy omerzaman.com domain and configure on Vercel
- [ ] Performance audit (Lighthouse 90+)
- [ ] Merge `omer/apple-vibe-rework` to `main`

## Tech stack (current)
- Next.js 16.2.0 (App Router, Turbopack)
- Tailwind CSS v4
- shadcn/ui + 21st.dev community components
- @paper-design/shaders-react (MeshGradient for Reuno version)
- motion v11 (Framer Motion)
- GSAP + @gsap/react (timeline animations)
- Three.js + React Three Fiber v9 (Aurora Flow showcase)
- Geist Sans + Geist Mono
- Vercel Analytics
- Deployed on Vercel (free tier)
