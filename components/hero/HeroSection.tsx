"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { bio } from "@/lib/data";

function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a]" />
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, -40, 20, 0], y: [0, 20, -30, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <MeshGradient />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-sm uppercase tracking-[0.3em] text-[#a3a3a3]">
          {bio.title}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-6xl font-bold leading-[0.95] tracking-tight text-[#f5f5f5] md:text-8xl lg:text-9xl">
          {bio.name}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-8 max-w-lg text-lg text-[#737373] md:text-xl">
          {bio.tagline}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-4">
          <a href="#projects" className="glass glass-hover rounded-full px-6 py-3 text-sm font-medium text-[#f5f5f5] transition-all">
            View my work
          </a>
          <a href="#contact" className="rounded-full bg-[#f5f5f5] px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#e5e5e5]">
            Get in touch
          </a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 text-[#525252]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
