"use client";

import dynamic from "next/dynamic";

// @ts-ignore
const BackgroundPaths = dynamic(() => import("@/components/ui/background-paths").then(m => ({ default: m.BackgroundPaths })), { ssr: false });
// @ts-ignore
const AuroraFlow = dynamic(() => import("@/components/aurora-flow").then(m => ({ default: m.Component || m.default })), { ssr: false });
const ReunoHero = dynamic(() => import("@/components/hero"), { ssr: false });
const WrapShader = dynamic(() => import("@/components/wrap-shader"), { ssr: false });

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

      <HeroWrapper label="2. Aurora Flow">
        <AuroraFlow title="Omer Zaman" subtitle="Analytics Engineer" description="Building data pipelines that turn raw chaos into clean insights" />
      </HeroWrapper>

      <HeroWrapper label="3. Reuno Hero">
        <ReunoHero />
      </HeroWrapper>

      <HeroWrapper label="4. Wrap Shader">
        <WrapShader />
      </HeroWrapper>
    </div>
  );
}
