"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { bio } from "@/lib/data";

export default function CurtainHero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa]">
      {/* Content behind curtains */}
      <div className="relative z-0 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 0.5 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-8 font-mono text-sm uppercase tracking-[0.4em] text-indigo-500/60"
          >
            Analytics Engineer
          </motion.p>

          <h1 className="text-7xl font-bold tracking-tighter md:text-9xl lg:text-[11rem]">
            <motion.span
              className="block text-neutral-900"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={revealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Omer
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={revealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Zaman
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={revealed ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mx-auto mt-8 max-w-md text-lg text-neutral-500"
          >
            {bio.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <a href="#" className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              View my work
            </a>
            <a href="#" className="rounded-full border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-400">
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 0.4 } : {}}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Curtain panels */}
      <AnimatePresence>
        {!revealed && (
          <>
            {/* Left curtain */}
            <motion.div
              className="fixed inset-y-0 left-0 z-20 w-1/2"
              initial={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="h-full w-full bg-neutral-950">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 to-neutral-900" />
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
              </div>
            </motion.div>

            {/* Right curtain */}
            <motion.div
              className="fixed inset-y-0 right-0 z-20 w-1/2"
              initial={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="h-full w-full bg-neutral-950">
                <div className="absolute inset-0 bg-gradient-to-l from-neutral-950 to-neutral-900" />
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
              </div>
            </motion.div>

            {/* Center glow line during closed state */}
            <motion.div
              className="fixed inset-y-0 left-1/2 z-30 w-[2px] -translate-x-1/2"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-full w-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent opacity-60" />
            </motion.div>

            {/* Teaser text on curtain */}
            <motion.div
              className="fixed inset-0 z-30 flex items-center justify-center"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-6xl font-bold tracking-tighter text-transparent md:text-8xl"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                OZ
              </motion.span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
