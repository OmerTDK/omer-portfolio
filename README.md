# omerzaman.com

Personal portfolio for Omer Zaman — Analytics Engineer based in Berlin.

**Live:** [omerzaman.vercel.app](https://omerzaman.vercel.app)

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS 4, Geist font
- **Animations:** Motion (Framer Motion), MeshGradient shader, NumberFlow
- **Deployment:** Vercel (auto-deploy on push to main)
- **Analytics:** Vercel Analytics + Speed Insights

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format with Prettier |
| `npm run typecheck` | TypeScript type check |

## Project Structure

```
app/
  layout.tsx          # Root layout (fonts, analytics, smooth scroll)
  page.tsx            # Main portfolio page
  globals.css         # Global styles + CSS variables
  not-found.tsx       # 404 page
  opengraph-image.tsx # Dynamic OG image
  robots.ts           # SEO robots.txt
  sitemap.ts          # SEO sitemap
components/
  shared/             # Reusable components (ScrollReveal)
  smooth-scroll.tsx   # Lenis smooth scroll wrapper
  ui/                 # UI primitives (Globe)
hooks/
  useReducedMotion.ts # Accessibility: prefers-reduced-motion
lib/
  data.ts             # Portfolio content (projects, experience, skills)
  utils.ts            # Utility functions (cn)
```
