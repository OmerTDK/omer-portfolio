"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { bio } from "@/lib/data";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { GlobeFallback } from "./GlobeFallback";

const DataGlobe = dynamic(
  () => import("./DataGlobe").then((mod) => ({ default: mod.DataGlobe })),
  {
    ssr: false,
    loading: () => <GlobeFallback />,
  }
);

export function HeroSection() {
  const isMobile = useIsMobile();
  const webglSupported = useWebGLSupport();
  const showGlobe = !isMobile && webglSupported;

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-[#0a0e1a]" />
      {showGlobe ? <DataGlobe /> : <GlobeFallback />}

      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold tracking-tight text-[#f1f5f9] md:text-7xl"
        >
          {bio.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 font-mono text-lg text-[#60a5fa] md:text-xl"
        >
          {bio.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3 text-sm text-[#64748b] md:text-base"
        >
          {bio.tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-[#64748b]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
