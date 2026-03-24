"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { bio } from "@/lib/data";

function useMouseParallax(strength: number = 1) {
  const x = useRef(0);
  const y = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    function handleMove(e: MouseEvent) {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      x.current = cx;
      y.current = cy;
      if (ref.current) {
        ref.current.style.transform = `translate(${cx * strength * 30}px, ${cy * strength * 20}px)`;
      }
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return ref;
}

function HeroPill({
  className,
  width,
  height,
  rotate,
  color,
  parallaxStrength,
  floatDuration = 12,
  floatDistance = 15,
}: {
  className: string;
  width: number;
  height: number;
  rotate: number;
  color: string;
  parallaxStrength: number;
  floatDuration?: number;
  floatDistance?: number;
}) {
  const ref = useMouseParallax(parallaxStrength);
  return (
    <div ref={ref} className={cn("absolute transition-transform duration-700 ease-out", className)}>
      <motion.div
        style={{ width, height, rotate }}
        animate={{
          y: [0, floatDistance, -floatDistance * 0.3, 0],
          rotate: [rotate, rotate + 3, rotate - 2, rotate],
          scale: [1, 1.04, 0.97, 1],
        }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full border border-white/60 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${color}, rgba(255,255,255,0.15) 70%)`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(100,120,220,0.18), inset 0 1px 2px rgba(255,255,255,0.7)",
          }}
        />
      </motion.div>
    </div>
  );
}

export function HeroContent({ visible }: { visible: boolean }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden">
      {/* Parallax frosted pills */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HeroPill className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" width={600} height={140} rotate={12} color="rgba(99,102,241,0.45)" parallaxStrength={0.8} floatDuration={14} floatDistance={20} />
        <HeroPill className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" width={500} height={120} rotate={-15} color="rgba(56,189,248,0.42)" parallaxStrength={-0.6} floatDuration={10} floatDistance={18} />
        <HeroPill className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" width={300} height={80} rotate={-8} color="rgba(139,92,246,0.38)" parallaxStrength={1.2} floatDuration={16} floatDistance={12} />
        <HeroPill className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" width={200} height={60} rotate={20} color="rgba(14,165,233,0.35)" parallaxStrength={-1.0} floatDuration={9} floatDistance={22} />
        <HeroPill className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" width={150} height={40} rotate={-25} color="rgba(79,70,229,0.32)" parallaxStrength={0.5} floatDuration={11} floatDistance={16} />
      </div>

      {/* Frosted glass hero card */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Role */}
        <div className="overflow-hidden mb-8">
          <motion.p
            initial={{ y: 40 }}
            animate={visible ? { y: 0 } : { y: 40 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-base md:text-lg uppercase tracking-[0.3em] text-neutral-400"
          >
            Analytics Engineer
          </motion.p>
        </div>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-neutral-900">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={visible ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Omer
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
              initial={{ y: "100%" }}
              animate={visible ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Zaman
            </motion.span>
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 mx-auto max-w-lg text-lg text-neutral-500"
        >
          {bio.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-black/10 overflow-hidden"
          >
            <span className="relative z-10">View my work</span>
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-neutral-700 text-sm font-medium hover:bg-white/80 hover:border-blue-200 active:scale-[0.97] transition-all duration-300 shadow-sm shadow-black/8"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-neutral-500 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
