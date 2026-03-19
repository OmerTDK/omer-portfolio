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
  { ssr: false, loading: () => <GlobeFallback /> }
);

export function HeroSection() {
  const isMobile = useIsMobile();
  const webglSupported = useWebGLSupport();
  const showGlobe = !isMobile && webglSupported;

  return (
    <section className="section-dark relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050810] to-[#0a0e1a]" />
      {showGlobe ? <DataGlobe /> : <GlobeFallback />}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-sm tracking-widest text-[#60a5fa] uppercase"
        >
          {bio.title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-6xl font-bold leading-[1.05] tracking-tight text-white md:text-8xl lg:text-9xl"
        >
          {bio.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl text-lg text-[#94a3b8] md:text-xl"
        >
          {bio.tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-[#64748b]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
