"use client";

import dynamic from "next/dynamic";

// @ts-ignore
const BackgroundPaths = dynamic(() => import("@/components/ui/background-paths").then(m => ({ default: m.BackgroundPaths })), { ssr: false });
// @ts-ignore
const GlowyWaves = dynamic(() => import("@/components/glowy-waves-hero-shadcnui").then(m => ({ default: m.GlowyWavesHero })), { ssr: false });
// @ts-ignore
const AuroraFlow = dynamic(() => import("@/components/aurora-flow").then(m => ({ default: m.Component || m.default })), { ssr: false });
// @ts-ignore
const Hero01 = dynamic(() => import("@/components/hero-01").then(m => ({ default: m.HeroSection01 || m.default })), { ssr: false });
const ReunoHero = dynamic(() => import("@/components/hero"), { ssr: false });
// @ts-ignore
const EasemizeHero = dynamic(() => import("@/components/hero-1").then(m => ({ default: m.HeroLanding || m.default })), { ssr: false });
const WrapShader = dynamic(() => import("@/components/wrap-shader"), { ssr: false });
// @ts-ignore
const Splite = dynamic(() => import("@/components/ui/splite").then(m => ({ default: m.SplineScene || m.default })), { ssr: false });
const SpatialShowcase = dynamic(() => import("@/components/spatial-product-showcase"), { ssr: false });

function HeroWrapper({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden border-b-4 border-red-500">
      <div className="absolute top-4 left-4 z-50 rounded-full bg-black/70 backdrop-blur-md px-5 py-2.5 text-base font-bold font-mono text-white shadow-lg">
        {label}
      </div>
      {children}
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <div className="bg-black">
      <div className="fixed top-4 right-4 z-50">
        <a href="/" className="rounded-full bg-black/70 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-all">
          Back to site
        </a>
      </div>

      <HeroWrapper label="1. Background Paths">
        <BackgroundPaths title="Omer Zaman" />
      </HeroWrapper>

      <HeroWrapper label="2. Glowy Waves Hero">
        <GlowyWaves />
      </HeroWrapper>

      <HeroWrapper label="3. Aurora Flow">
        <AuroraFlow />
      </HeroWrapper>

      <HeroWrapper label="4. Hero 01 (Ali Imam)">
        <Hero01 />
      </HeroWrapper>

      <HeroWrapper label="5. Reuno Hero">
        <ReunoHero />
      </HeroWrapper>

      <HeroWrapper label="6. Easemize Hero">
        <EasemizeHero title="Omer Zaman" description="Analytics Engineer — Building data pipelines that scale" />
      </HeroWrapper>

      <HeroWrapper label="7. Wrap Shader">
        <WrapShader />
      </HeroWrapper>

      <HeroWrapper label="8. Splite (needs Spline scene URL)">
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white/50">
          Splite requires a Spline 3D scene URL — skipped for now
        </div>
      </HeroWrapper>

      <HeroWrapper label="9. Spatial Product Showcase">
        <SpatialShowcase />
      </HeroWrapper>
    </div>
  );
}
