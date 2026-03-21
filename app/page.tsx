"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio, skills, projects, projectCategories, experience, links } from "@/lib/data";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Send,
  ExternalLink,
  ChevronDown,
  Wrench,
  FlaskConical,
  BarChart3,
  ArrowUp,
  Menu,
  X,
  User,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
// Dock component removed — caused runtime crash. Using custom dock instead.
// GlowCard removed — added dark halo around cards. Using clean glass instead.

import { Globe } from "@/components/ui/globe";
import type { Project } from "@/lib/data";

/* ---------------------------------------------------------------------------
   DYNAMIC MESH BACKGROUND — scroll-triggered color shifts per section
   --------------------------------------------------------------------------- */

const sectionColorMap: Record<string, string[]> = {
  hero:       ["#c7d2fe", "#a5b4fc", "#818cf8", "#93c5fd", "#6366f1"],
  about:      ["#ffffff", "#e0e7ff", "#c7d2fe", "#e9d5ff", "#bfdbfe"],
  skills:     ["#ffffff", "#dbeafe", "#c4b5fd", "#d4d4f8", "#a5d8ff"],
  projects:   ["#ffffff", "#d0d5ff", "#a5b4fc", "#c4b5fd", "#93c5fd"],
  experience: ["#ffffff", "#dbeafe", "#c7d2fe", "#d8d5f0", "#bfdbfe"],
  contact:    ["#ffffff", "#eef2ff", "#dbeafe", "#ede9fe", "#dbeafe"],
};

const sectionIds = ["about", "skills", "projects", "experience", "contact"];

// Parse hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

// RGB back to hex
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, "0")).join("");
}

// Lerp between two color arrays
function lerpColors(from: string[], to: string[], t: number): string[] {
  return from.map((fromHex, i) => {
    const [r1, g1, b1] = hexToRgb(fromHex);
    const [r2, g2, b2] = hexToRgb(to[i]);
    return rgbToHex(
      r1 + (r2 - r1) * t,
      g1 + (g2 - g1) * t,
      b1 + (b2 - b1) * t,
    );
  });
}

function DynamicMeshBackground() {
  const [colors, setColors] = useState(sectionColorMap.hero);
  const currentSection = useRef("hero");
  const fromColors = useRef(sectionColorMap.hero);
  const toColors = useRef(sectionColorMap.hero);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const displayedColors = useRef(sectionColorMap.hero);

  useEffect(() => {
    const duration = 1800;

    function tick(time: number) {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const interpolated = lerpColors(fromColors.current, toColors.current, eased);
      displayedColors.current = interpolated;
      setColors(interpolated);

      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        fromColors.current = [...toColors.current];
        animRef.current = null;
      }
    }

    function startTransition(targetSection: string) {
      fromColors.current = [...displayedColors.current];
      toColors.current = sectionColorMap[targetSection];
      startTimeRef.current = null;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(tick);
    }

    function handleScroll() {
      const vh = window.innerHeight;
      let newSection = "hero";

      if (window.scrollY >= vh * 0.5) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.getBoundingClientRect().top <= vh * 0.5) {
            newSection = sectionIds[i];
            break;
          }
        }
      }

      if (newSection !== currentSection.current) {
        currentSection.current = newSection;
        startTransition(newSection);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []); // empty deps — all state managed via refs

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 transition-opacity duration-[2000ms]">
        <MeshGradient
          style={{ height: "100%", width: "100%" }}
          colors={colors}
          speed={1.2}
        />
      </div>
      <div className="absolute inset-0 bg-white/25" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   INLINE NAV — Frosted glass, macOS style, with mobile menu
   --------------------------------------------------------------------------- */

const navLinks = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: BarChart3 },
  { id: "experience", label: "Experience", icon: MapPin },
  { id: "contact", label: "Contact", icon: Mail },
];

function FrostNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function handleScroll() {
      const ids = navLinks.map((l) => l.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(ids[i]);
          return;
        }
      }
      setActiveSection("");
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-40 mb-6 sm:pt-6 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/8 py-1 px-1 rounded-full">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-5 py-2 rounded-full transition-colors",
                isActive ? "text-blue-600" : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              <span className="hidden md:inline">{link.label}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 w-full bg-blue-50 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-400/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-400/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-400/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}

        {/* Social links — visible on mobile nav, hidden on lg where FloatingDock shows */}
        <div className="flex items-center gap-1 border-l border-neutral-200/50 pl-1 lg:hidden">
          {[
            { href: links.github, icon: Github, label: "GitHub" },
            { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <Icon size={16} strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SCROLL PROGRESS — thin line at top of page
   --------------------------------------------------------------------------- */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5">
      <div
        className="h-full bg-blue-600 transition-all duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   CURSOR GLOW — radial gradient following mouse (desktop only)
   --------------------------------------------------------------------------- */

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    function handleMove(e: MouseEvent) {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-30 w-[500px] h-[500px] rounded-full blur-[100px] hidden md:block"
      style={{
        willChange: "transform",
        opacity: 0.5,
        background: "radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, rgba(199, 210, 254, 0.25) 40%, transparent 70%)",
      }}
    />
  );
}

/* ---------------------------------------------------------------------------
   CINEMATIC PRELOADER — branded intro that reveals the site
   --------------------------------------------------------------------------- */

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1200);
    const t2 = setTimeout(onComplete, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950"
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Radial glow pulse */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1.3, 1], opacity: [0, 0.7, 0.3] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Monogram — just initials, teases the full name reveal */}
      <div className="relative overflow-hidden">
        <motion.span
          className="block font-bold text-6xl md:text-8xl tracking-tighter bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ y: 80, opacity: 0 }}
          animate={phase === "enter" ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          OZ
        </motion.span>
      </div>

      {/* Progress line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   MOUSE PARALLAX LAYER — shapes react to cursor position
   --------------------------------------------------------------------------- */

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

/* ---------------------------------------------------------------------------
   HERO — cinematic reveal with clip-path + parallax frosted pills
   --------------------------------------------------------------------------- */

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
          className="absolute inset-0 rounded-full border border-white/50 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${color}, transparent 70%)`,
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px rgba(100,120,220,0.12), inset 0 1px 1px rgba(255,255,255,0.6)",
          }}
        />
      </motion.div>
    </div>
  );
}

function HeroContent({ visible }: { visible: boolean }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden">
      {/* Parallax frosted pills — mouse-reactive depth layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HeroPill className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" width={600} height={140} rotate={12} color="rgba(99,102,241,0.30)" parallaxStrength={0.8} floatDuration={14} floatDistance={20} />
        <HeroPill className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" width={500} height={120} rotate={-15} color="rgba(56,189,248,0.28)" parallaxStrength={-0.6} floatDuration={10} floatDistance={18} />
        <HeroPill className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" width={300} height={80} rotate={-8} color="rgba(139,92,246,0.25)" parallaxStrength={1.2} floatDuration={16} floatDistance={12} />
        <HeroPill className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" width={200} height={60} rotate={20} color="rgba(14,165,233,0.24)" parallaxStrength={-1.0} floatDuration={9} floatDistance={22} />
        <HeroPill className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" width={150} height={40} rotate={-25} color="rgba(79,70,229,0.22)" parallaxStrength={0.5} floatDuration={11} floatDistance={16} />
      </div>

      {/* Frosted glass hero card */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Role — slide up */}
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

        {/* Name — clip-path reveal line by line */}
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

        {/* Tagline — fade up */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 mx-auto max-w-lg text-lg text-neutral-500"
        >
          {bio.tagline}
        </motion.p>

        {/* CTAs — scale in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-300 shadow-lg shadow-black/10 overflow-hidden"
          >
            <span className="relative z-10">View my work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-neutral-700 text-sm font-medium hover:bg-white/80 hover:border-indigo-200 transition-all duration-300 shadow-sm shadow-black/8"
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

/* ---------------------------------------------------------------------------
   ABOUT — Frosted glass panel with animated stat counters
   --------------------------------------------------------------------------- */

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) setDisplayValue(value);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-3xl font-bold text-neutral-900 md:text-4xl">
        <NumberFlow value={displayValue} />{suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-neutral-500">{label}</div>
    </div>
  );
}

function TiltPhoto({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mx-auto w-48 md:w-full h-full transition-transform duration-200 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-full">
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-400/20 via-violet-400/10 to-cyan-400/20 blur-xl" />
        <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-indigo-500/10 h-full">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/8 p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-500 mb-8">About</p>

            <div className="grid gap-10 md:grid-cols-[240px_1fr] md:items-stretch">
              <TiltPhoto src={bio.profileImage} alt="Omer Zaman" />

              <div>
                <h2 className="text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
                  I build the data infrastructure teams depend on.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-neutral-500">{bio.about[0]}</p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">{bio.about[1]}</p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">{bio.about[2]}</p>

                <div className="mt-6 flex flex-wrap gap-6">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    {bio.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                    {bio.education}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-neutral-200/50 pt-8 flex justify-around">
              {bio.stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* TechMarquee removed — redundant with Skills section */

/* ---------------------------------------------------------------------------
   SKILLS — Horizontal pills layout, frosted glass
   --------------------------------------------------------------------------- */

function SkillsSection() {
  const categories = ["core", "data", "infra", "viz"] as const;
  const categoryMeta = {
    core: { label: "Core Stack" },
    data: { label: "Data Science" },
    infra: { label: "Infrastructure" },
    viz: { label: "Visualization" },
  } as const;

  return (
    <section id="skills" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600">Skills</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            My toolkit.
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-8">
          {categories.map((cat, i) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <ScrollReveal key={cat} delay={i * 0.1}>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                  <h3 className="shrink-0 w-36 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    {categoryMeta[cat].label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-sm shadow-black/8 px-4 py-2 text-sm text-neutral-700 hover:bg-white/80 hover:shadow-md transition-all"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   PROJECTS — Frosted glass cards with text-tab filters and category icons
   --------------------------------------------------------------------------- */

const categoryIcons: Record<string, React.ReactNode> = {
  engineering: <Wrench className="h-3.5 w-3.5" />,
  science: <FlaskConical className="h-3.5 w-3.5" />,
  analytics: <BarChart3 className="h-3.5 w-3.5" />,
};

const categoryGradients: Record<string, string> = {
  engineering: "from-white/80 to-blue-50/50",
  science: "from-white/80 to-violet-50/50",
  analytics: "from-white/80 to-indigo-50/50",
};

function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    engineering: <Wrench className={className} />,
    science: <FlaskConical className={className} />,
    analytics: <BarChart3 className={className} />,
  };
  return <>{icons[category] || null}</>;
}

const categoryAccents: Record<string, string> = {
  engineering: "text-blue-600",
  science: "text-violet-600",
  analytics: "text-amber-600",
};

const categoryAccentBg: Record<string, string> = {
  engineering: "bg-blue-600",
  science: "bg-violet-600",
  analytics: "bg-amber-600",
};

function FrostProjectCard({ project, index, featured, onSelect }: { project: Project; index: number; featured?: boolean; onSelect?: (p: Project) => void }) {
  const accent = categoryAccents[project.category] || "text-blue-600";

  const cardInner = (
    <div
      onClick={() => onSelect?.(project)}
      className="group cursor-pointer transition-all duration-300"
    >
      {/* Show diagram inline on featured cards */}
      {featured && <div className="mb-5"><ProjectDiagram title={project.title} /></div>}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={accent}>{categoryIcons[project.category]}</span>
            <h3 className={cn(
              "font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors",
              featured ? "text-xl" : "text-lg"
            )}>
              {project.title}
            </h3>
          </div>
          <p className={cn(
            "mt-2 leading-relaxed text-neutral-500",
            featured ? "text-sm md:text-base" : "text-sm"
          )}>
            {project.description}
          </p>
        </div>
        <div className="ml-4 text-right shrink-0">
          <span className={cn(
            "font-mono font-bold",
            accent,
            featured ? "text-3xl" : "text-2xl"
          )}>
            {project.metric}
          </span>
          <p className="text-xs text-neutral-500">{project.metricLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/30 bg-white/40 px-2.5 py-0.5 text-xs text-neutral-500"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn("mt-3 inline-flex items-center gap-1 text-xs hover:underline", accent)}
        >
          View on GitHub <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );

  if (featured) {
    return (
      <div className="rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/8 p-8 h-full overflow-hidden hover:bg-white/80 hover:shadow-xl transition-shadow">
        {cardInner}
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-sm shadow-black/8 p-6 h-full overflow-hidden hover:bg-white/80 hover:shadow-md transition-shadow">
      {cardInner}
    </div>
  );
}

function ProjectDiagram({ title }: { title: string }) {
  const diagrams: Record<string, React.ReactNode> = {
    "Medallion Data Platform": (
      <svg viewBox="0 0 600 120" className="w-full h-auto" fill="none">
        {[
          { x: 0, label: "Bronze", sub: "Raw", color: "#dbeafe" },
          { x: 155, label: "Staging", sub: "Clean", color: "#c7d2fe" },
          { x: 310, label: "Silver", sub: "Transform", color: "#a5b4fc" },
          { x: 465, label: "Gold", sub: "Serve", color: "#818cf8" },
        ].map((node, i) => (
          <g key={node.label}>
            <rect x={node.x} y={20} width={120} height={70} rx={12} fill={node.color} stroke="#e2e8f0" strokeWidth={1} />
            <text x={node.x + 60} y={50} textAnchor="middle" className="text-xs font-semibold" fill="#1e293b">{node.label}</text>
            <text x={node.x + 60} y={68} textAnchor="middle" className="text-[10px]" fill="#64748b">{node.sub}</text>
            {i < 3 && <path d={`M${node.x + 125} 55 L${node.x + 150} 55`} stroke="#94a3b8" strokeWidth={1.5} markerEnd="url(#arrow)" />}
          </g>
        ))}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    ),

    "Deal Volume Forecasting": (
      <svg viewBox="0 0 600 140" className="w-full h-auto" fill="none">
        <rect x={40} y={10} width={540} height={110} rx={8} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />
        {[35, 60, 85].map(y => <line key={y} x1={60} y1={y} x2={560} y2={y} stroke="#f1f5f9" strokeWidth={1} />)}
        <polyline points="60,90 120,70 180,80 240,50 300,60 360,40 420,45 480,30 540,35" stroke="#2563eb" strokeWidth={2} fill="none" />
        <polyline points="60,85 120,75 180,78 240,55 300,58 360,42 420,40 480,35 540,32" stroke="#93c5fd" strokeWidth={2} fill="none" strokeDasharray="6,4" />
        <polygon points="360,35 420,30 480,22 540,20 540,45 480,48 420,55 360,50" fill="#2563eb" fillOpacity={0.08} />
        <line x1={70} y1={125} x2={90} y2={125} stroke="#2563eb" strokeWidth={2} />
        <text x={95} y={128} className="text-[9px]" fill="#64748b">Actual</text>
        <line x1={150} y1={125} x2={170} y2={125} stroke="#93c5fd" strokeWidth={2} strokeDasharray="4,3" />
        <text x={175} y={128} className="text-[9px]" fill="#64748b">Predicted</text>
        <rect x={230} y={120} width={30} height={10} rx={2} fill="#2563eb" fillOpacity={0.1} stroke="#2563eb" strokeWidth={0.5} />
        <text x={265} y={128} className="text-[9px]" fill="#64748b">Confidence</text>
      </svg>
    ),

    "AI Document Extraction": (
      <svg viewBox="0 0 600 120" className="w-full h-auto" fill="none">
        {[
          { x: 0, label: "PDF Upload", color: "#fee2e2", icon: "\uD83D\uDCC4" },
          { x: 155, label: "Gemini AI", color: "#dbeafe", icon: "\uD83E\uDD16" },
          { x: 310, label: "Validate", color: "#e0e7ff", icon: "\u2713" },
          { x: 465, label: "BigQuery", color: "#d1fae5", icon: "\uD83D\uDCCA" },
        ].map((node, i) => (
          <g key={node.label}>
            <rect x={node.x} y={20} width={120} height={70} rx={12} fill={node.color} stroke="#e2e8f0" strokeWidth={1} />
            <text x={node.x + 60} y={48} textAnchor="middle" fontSize={18}>{node.icon}</text>
            <text x={node.x + 60} y={72} textAnchor="middle" className="text-[10px] font-medium" fill="#374151">{node.label}</text>
            {i < 3 && <path d={`M${node.x + 125} 55 L${node.x + 150} 55`} stroke="#94a3b8" strokeWidth={1.5} markerEnd="url(#arrow2)" />}
          </g>
        ))}
        <defs>
          <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    ),

    "Automated Financial Reporting": (
      <svg viewBox="0 0 600 120" className="w-full h-auto" fill="none">
        {[
          { x: 0, label: "BigQuery", color: "#dbeafe", icon: "\uD83D\uDDC4" },
          { x: 155, label: "Transform", color: "#e0e7ff", icon: "\u2699\uFE0F" },
          { x: 310, label: "Sheets", color: "#d1fae5", icon: "\uD83D\uDCCB" },
          { x: 465, label: "Slack", color: "#fef3c7", icon: "\uD83D\uDD14" },
        ].map((node, i) => (
          <g key={node.label}>
            <rect x={node.x} y={20} width={120} height={70} rx={12} fill={node.color} stroke="#e2e8f0" strokeWidth={1} />
            <text x={node.x + 60} y={48} textAnchor="middle" fontSize={18}>{node.icon}</text>
            <text x={node.x + 60} y={72} textAnchor="middle" className="text-[10px] font-medium" fill="#374151">{node.label}</text>
            {i < 3 && <path d={`M${node.x + 125} 55 L${node.x + 150} 55`} stroke="#94a3b8" strokeWidth={1.5} markerEnd="url(#arrow3)" />}
          </g>
        ))}
        <defs>
          <marker id="arrow3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    ),

    "Tax Invoice Parser": (
      <svg viewBox="0 0 600 120" className="w-full h-auto" fill="none">
        {[
          { x: 0, label: "PDF Invoice", color: "#fee2e2", icon: "\uD83D\uDCC4" },
          { x: 155, label: "Regex Parse", color: "#dbeafe", icon: "\uD83D\uDD0D" },
          { x: 310, label: "Structured", color: "#d1fae5", icon: "\uD83D\uDCCA" },
          { x: 465, label: "BigQuery", color: "#e0e7ff", icon: "\uD83D\uDDC4" },
        ].map((node, i) => (
          <g key={node.label}>
            <rect x={node.x} y={20} width={120} height={70} rx={12} fill={node.color} stroke="#e2e8f0" strokeWidth={1} />
            <text x={node.x + 60} y={48} textAnchor="middle" fontSize={18}>{node.icon}</text>
            <text x={node.x + 60} y={72} textAnchor="middle" className="text-[10px] font-medium" fill="#374151">{node.label}</text>
            {i < 3 && <path d={`M${node.x + 125} 55 L${node.x + 150} 55`} stroke="#94a3b8" strokeWidth={1.5} markerEnd="url(#arrow4)" />}
          </g>
        ))}
        <defs>
          <marker id="arrow4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    ),

    "Executive KPI Dashboard": (
      <svg viewBox="0 0 600 140" className="w-full h-auto" fill="none">
        {[
          { x: 0, y: 10, label: "BigQuery", color: "#dbeafe" },
          { x: 0, y: 55, label: "HubSpot", color: "#fce7f3" },
          { x: 0, y: 100, label: "Personio", color: "#d1fae5" },
        ].map(src => (
          <g key={src.label}>
            <rect x={src.x} y={src.y} width={100} height={35} rx={8} fill={src.color} stroke="#e2e8f0" strokeWidth={1} />
            <text x={50} y={src.y + 22} textAnchor="middle" className="text-[10px] font-medium" fill="#374151">{src.label}</text>
            <path d={`M105 ${src.y + 17} L200 72`} stroke="#94a3b8" strokeWidth={1} />
          </g>
        ))}
        <rect x={200} y={45} width={120} height={50} rx={10} fill="#e0e7ff" stroke="#a5b4fc" strokeWidth={1.5} />
        <text x={260} y={72} textAnchor="middle" className="text-[11px] font-semibold" fill="#3730a3">Aggregator</text>
        <path d="M325 70 L380 70" stroke="#94a3b8" strokeWidth={1.5} markerEnd="url(#arrow5)" />
        <rect x={385} y={30} width={200} height={80} rx={10} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x={395 + (i % 3) * 62} y={40 + Math.floor(i / 3) * 35} width={52} height={28} rx={4} fill={i === 0 ? "#dbeafe" : i === 1 ? "#fce7f3" : i === 2 ? "#d1fae5" : i === 3 ? "#e0e7ff" : i === 4 ? "#fef3c7" : "#f1f5f9"} />
        ))}
        <text x={485} y={125} textAnchor="middle" className="text-[9px]" fill="#94a3b8">20+ KPIs</text>
        <defs>
          <marker id="arrow5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    ),

    "Data Quality Framework": (
      <svg viewBox="0 0 600 120" className="w-full h-auto" fill="none">
        {[
          { x: 0, label: "Raw", check: "Freshness", color: "#fef3c7" },
          { x: 155, label: "Staging", check: "Unique + Not Null", color: "#dbeafe" },
          { x: 310, label: "DWH", check: "Referential", color: "#e0e7ff" },
          { x: 465, label: "Marts", check: "Reconciliation", color: "#d1fae5" },
        ].map((node, i) => (
          <g key={node.label}>
            <rect x={node.x} y={15} width={120} height={80} rx={12} fill={node.color} stroke="#e2e8f0" strokeWidth={1} />
            <text x={node.x + 60} y={40} textAnchor="middle" className="text-xs font-semibold" fill="#1e293b">{node.label}</text>
            <text x={node.x + 60} y={58} textAnchor="middle" className="text-[9px]" fill="#64748b">{node.check}</text>
            <text x={node.x + 60} y={78} textAnchor="middle" fontSize={16} fill="#22c55e">{"\u2713"}</text>
            {i < 3 && <path d={`M${node.x + 125} 55 L${node.x + 150} 55`} stroke="#94a3b8" strokeWidth={1.5} markerEnd="url(#arrow6)" />}
          </g>
        ))}
        <defs>
          <marker id="arrow6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    ),

    "Banking Loan Sale Automation": (
      <svg viewBox="0 0 600 120" className="w-full h-auto" fill="none">
        {[
          { x: 0, label: "Query", color: "#dbeafe", icon: "\uD83D\uDDC4" },
          { x: 155, label: "Validate", color: "#fef3c7", icon: "\u2713" },
          { x: 310, label: "Filter", color: "#e0e7ff", icon: "\u2699\uFE0F" },
          { x: 465, label: "9-Tab Report", color: "#d1fae5", icon: "\uD83D\uDCCB" },
        ].map((node, i) => (
          <g key={node.label}>
            <rect x={node.x} y={20} width={120} height={70} rx={12} fill={node.color} stroke="#e2e8f0" strokeWidth={1} />
            <text x={node.x + 60} y={48} textAnchor="middle" fontSize={18}>{node.icon}</text>
            <text x={node.x + 60} y={72} textAnchor="middle" className="text-[10px] font-medium" fill="#374151">{node.label}</text>
            {i < 3 && <path d={`M${node.x + 125} 55 L${node.x + 150} 55`} stroke="#94a3b8" strokeWidth={1.5} markerEnd="url(#arrow7)" />}
          </g>
        ))}
        <defs>
          <marker id="arrow7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    ),
  };

  const diagram = diagrams[title];
  if (!diagram) return null;

  return (
    <div className="mb-6 rounded-xl bg-neutral-50 border border-neutral-200/60 p-4 overflow-hidden">
      {diagram}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          {/* Backdrop — separate motion for silky smooth blur fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 backdrop-blur-xl bg-white/30"
          />

          {/* Modal sheet — scale from center, no vertical slide */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white/92 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-black/10 p-8 sm:p-10"
          >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600">{categoryIcons[project.category]}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              {project.category === "engineering" ? "Data Engineering" : project.category === "science" ? "Data Science" : "Analytics"}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{project.title}</h2>
            <div className="text-right shrink-0">
              <span className="font-mono text-3xl font-bold text-blue-600">{project.metric}</span>
              <p className="text-xs text-neutral-500">{project.metricLabel}</p>
            </div>
          </div>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">{project.description}</p>

          <div className="mt-6"><ProjectDiagram title={project.title} /></div>
          <div className="my-6 h-px bg-neutral-200/60" />

          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Details</h3>
          <p className="text-sm leading-relaxed text-neutral-500">{project.longDescription}</p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          )}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

const filterTabDescriptions: Record<string, string> = {
  highlights: "Best work across all disciplines",
  all: "Everything I've built",
  engineering: "Pipelines, models, infrastructure",
  science: "ML, statistics, predictions",
  analytics: "Dashboards, reports, insights",
};

function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("highlights");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filtered =
    activeCategory === "highlights"
      ? projects.filter((p) => p.highlight)
      : activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = filtered.slice(0, 3);
  const remainingProjects = filtered.slice(3);

  return (
    <section id="projects" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">Projects</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Built in production. Backed by real metrics.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                    activeCategory === cat.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-white/85 backdrop-blur-xl border border-white/60 text-neutral-500 hover:text-neutral-700 hover:bg-white/90"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={activeCategory}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-xs text-neutral-500"
              >
                {filterTabDescriptions[activeCategory]}
              </motion.p>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-4">
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <FrostProjectCard project={project} index={i} featured onSelect={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {remainingProjects.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {remainingProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: (i + 3) * 0.05 }}
                >
                  <FrostProjectCard project={project} index={i + 3} onSelect={setSelectedProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   IMPACT BANNER — bold scroll-stopping stat strip
   --------------------------------------------------------------------------- */

function ImpactBanner() {
  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "32+", label: "Projects Delivered" },
    { value: "41", label: "dbt Models in Prod" },
    { value: "100ms", label: "Per Invoice Parsed" },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 opacity-[0.07] rounded-none" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-4xl font-bold text-neutral-900 md:text-5xl tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   EXPERIENCE — Clean dot timeline
   --------------------------------------------------------------------------- */

function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600">Experience</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            4+ years across startups, enterprise, and freelance.
          </h2>
        </ScrollReveal>

        <div className="mt-16 max-w-2xl space-y-16">
          {experience.map((entry) => (
            <ScrollReveal key={entry.date}>
              <div className="flex gap-6">
                <div className="flex flex-col items-center pt-2">
                  <div
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full",
                      entry.isCurrent ? "bg-amber-500" : "bg-neutral-300"
                    )}
                  />
                  <div className="mt-2 w-px flex-1 bg-neutral-200/50" />
                </div>
                <div className="pb-4">
                  <p className="font-mono text-sm text-amber-600">{entry.date}</p>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-900">{entry.role}</h3>
                  <p className="text-sm text-neutral-500">{entry.company}</p>
                  <p className="mt-3 text-base leading-relaxed text-neutral-500">{entry.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   TESTIMONIALS — Auto-scrolling testimonial cards
   --------------------------------------------------------------------------- */

const testimonials = [
  {
    quote: "Omer has an exceptional ability to turn complex data challenges into clean, reliable solutions. His attention to detail and deep understanding of data architecture make him an invaluable asset to any team.",
    name: "Adnan Zafar",
    role: "Freelance Client — Dashboard & Analytics",
    photo: "/assets/testimonials/adnan.jpg",
    linkedin: "https://www.linkedin.com/in/adnan-zafar-%F0%9F%87%AC%F0%9F%87%A7-%F0%9F%87%A6%F0%9F%87%BA-%F0%9F%87%AA%F0%9F%87%BA-1875a0218/",
  },
  {
    quote: "Working with Omer is always a great experience. He brings a unique combination of analytical thinking and engineering rigor that consistently delivers results above expectations.",
    name: "M. Zain R.",
    role: "Freelance Client — Data Pipeline Project",
    photo: "/assets/testimonials/zain.jpg",
    linkedin: "https://www.linkedin.com/in/mzainr99/",
  },
  {
    quote: "Omer's dedication to his craft is truly inspiring. He doesn't just build pipelines — he thinks deeply about data quality and how it impacts every downstream decision. A brilliant mind with a collaborative spirit.",
    name: "Esra Ilbay",
    role: "Freelance Client — Predictive Modeling",
    photo: "/assets/testimonials/esra.jpg",
    linkedin: "https://www.linkedin.com/in/esrailbay/",
  },
  {
    quote: "Omer brings a rare combination of technical depth and clear communication. He can architect a complex data platform and explain it to stakeholders in the same breath. A pleasure to work with.",
    name: "Robin Aguilera",
    role: "Freelance Client — Sales Strategy Analysis",
    photo: "/assets/testimonials/robin.jpg",
    linkedin: "https://www.linkedin.com/in/robin-aguilera-503a092a/",
  },
];

function TestimonialsSection() {
  return (
    <section className="relative px-6 py-32 md:px-12 lg:px-24 overflow-hidden">
      <div className="mx-auto max-w-6xl mb-12">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600">Testimonials</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Don&apos;t take my word for it.
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-slow gap-6">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => {
            const initials = t.name.split(" ").map(n => n[0]).join("").slice(0, 2);
            return (
              <div
                key={i}
                className="shrink-0 w-[350px] rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/8 p-6"
              >
                <p className="text-sm leading-relaxed text-neutral-500 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 border-t border-neutral-200/50 pt-4 flex items-center gap-3">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border border-white/60 shadow-sm"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {t.linkedin ? (
                        <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                          {t.name}
                        </a>
                      ) : t.name}
                    </p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   CONTACT — Frosted glass form
   --------------------------------------------------------------------------- */

function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/meerdbvn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none hidden lg:block w-[500px] h-[500px]">
        <Globe className="relative w-full h-full max-w-none" />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-rose-500">Contact</p>
          <h2 className="mt-4 text-4xl font-bold text-neutral-900 md:text-5xl">Let&apos;s build something together.</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-neutral-500">
            Have a project in mind, a question about data, or just want to say hi?
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-4 text-left">
            {/* Honeypot spam trap */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-xl bg-white/80 backdrop-blur-xl border border-white/70 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/8"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-xl bg-white/80 backdrop-blur-xl border border-white/70 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/8"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full resize-none rounded-xl bg-white/80 backdrop-blur-xl border border-white/70 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/8"
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all shadow-lg shadow-black/10",
                status === "sent"
                  ? "bg-emerald-500 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              )}
            >
              <span aria-live="polite">
                {status === "sending" && "Sending..."}
                {status === "sent" && "Sent!"}
                {status === "error" && "Try again"}
              </span>
              {status === "idle" && (
                <>
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </ScrollReveal>

      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   FOOTER — proper footer with social links and back-to-top
   --------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="h-px bg-neutral-200/40 mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-neutral-500">Built by Omer Zaman</p>

          <div className="flex items-center gap-4">
            {[
              { href: links.github, icon: Github, label: "GitHub" },
              { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: links.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-neutral-500 transition-colors hover:text-neutral-800"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-sm shadow-black/8 transition-all hover:bg-white/80"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5 text-neutral-500" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------------
   FLOATING DOCK — macOS-style social links bar
   --------------------------------------------------------------------------- */

function FloatingDock() {
  const dockItems = [
    { href: links.github, icon: Github, label: "GitHub" },
    { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: links.email, icon: Mail, label: "Email" },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden lg:block">
      <div className="pointer-events-auto flex flex-col items-center gap-2 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/10 px-2 py-3">
        {dockItems.map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            aria-label={label}
            whileHover={{ scale: 1.3, x: 8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 border border-white/50 shadow-sm shadow-black/5 text-neutral-500 hover:text-neutral-900 hover:shadow-md transition-colors"
          >
            <Icon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   MAIN PAGE
   --------------------------------------------------------------------------- */

export default function FrostPage() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>{!loaded && <Preloader onComplete={handleLoaded} />}</AnimatePresence>

      <DynamicMeshBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <ScrollProgress />
        <FrostNav />

        <main id="main-content">
          <HeroContent visible={loaded} />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ImpactBanner />
          <ExperienceSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingDock />
      </motion.div>
    </div>
  );
}
