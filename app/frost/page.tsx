"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio, skills, projects, projectCategories, experience, links } from "@/lib/data";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
// Dock component removed — caused runtime crash. Using custom dock instead.
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Globe } from "@/components/ui/globe";
import type { Project } from "@/lib/data";

/* ---------------------------------------------------------------------------
   DYNAMIC MESH BACKGROUND — scroll-triggered color shifts per section
   --------------------------------------------------------------------------- */

const sectionColorMap: Record<string, string[]> = {
  hero:       ["#ffffff", "#ffffff", "#c7d2fe", "#ffffff", "#93c5fd"],
  about:      ["#ffffff", "#ffffff", "#ddd6fe", "#ffffff", "#c4b5fd"],
  skills:     ["#ffffff", "#ffffff", "#a5f3fc", "#ffffff", "#99f6e4"],
  projects:   ["#ffffff", "#ffffff", "#bfdbfe", "#ffffff", "#a5b4fc"],
  experience: ["#ffffff", "#ffffff", "#fecdd3", "#ffffff", "#fda4af"],
  contact:    ["#ffffff", "#ffffff", "#c7d2fe", "#ffffff", "#93c5fd"],
};

const sectionIds = ["about", "skills", "projects", "experience", "contact"];

function DynamicMeshBackground() {
  const [colors, setColors] = useState(sectionColorMap.hero);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (scrollY < vh * 0.5) {
        setColors(sectionColorMap.hero);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= vh * 0.5) {
          setColors(sectionColorMap[sectionIds[i]]);
          return;
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 transition-colors duration-1000">
      <MeshGradient
        style={{ height: "100%", width: "100%" }}
        colors={colors}
        speed={0.8}
      />
      <div className="absolute inset-0 bg-white/20" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   INLINE NAV — Frosted glass, macOS style, with mobile menu
   --------------------------------------------------------------------------- */

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function FrostNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-white/75 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-black/8"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-sm font-medium text-neutral-900 tracking-tight">
          Omer
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative text-sm font-medium transition-colors duration-200",
                activeSection === link.id ? "text-blue-600" : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="frost-nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-blue-600"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className="text-neutral-500 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/75 backdrop-blur-xl border-b border-white/60 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={cn(
                    "text-left text-sm transition-colors",
                    activeSection === link.id ? "text-blue-600 font-medium" : "text-neutral-400"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
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
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function checkDesktop() {
      setIsDesktop(window.innerWidth >= 768);
    }
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      className="fixed pointer-events-none z-20 w-[400px] h-[400px] rounded-full opacity-30 blur-[80px] transition-all duration-300"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background: "radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)",
      }}
    />
  );
}

/* ---------------------------------------------------------------------------
   HERO — with per-character staggered animation
   --------------------------------------------------------------------------- */

function AnimatedName({ text, className, style, startDelay = 0.4 }: { text: string; className?: string; style?: React.CSSProperties; startDelay?: number }) {
  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: startDelay + i * 0.04,
            type: "spring",
            stiffness: 150,
            damping: 25,
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function HeroContent() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 backdrop-blur-xl px-4 py-1.5 mb-8 shadow-sm shadow-black/8"
        >
          <span className="text-neutral-500 text-xs font-medium tracking-wide">
            Analytics Engineer &middot; Berlin
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]">
          <AnimatedName
            text="Omer"
            startDelay={0.4}
            className="block"
            style={{
              background: "linear-gradient(135deg, #171717 0%, #2563eb 45%, #171717 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
          <AnimatedName text="Zaman" startDelay={0.35} className="block text-neutral-900" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 mx-auto max-w-lg text-lg text-neutral-400"
        >
          {bio.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-300 shadow-lg shadow-black/10"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-neutral-700 text-sm font-medium hover:bg-white/80 transition-all duration-300 shadow-sm shadow-black/8"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-neutral-400 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 text-neutral-400" />
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
      <div className="mt-1 text-xs uppercase tracking-wider text-neutral-400">{label}</div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="relative rounded-3xl">
            <GlowingEffect spread={60} glow={true} disabled={false} proximity={80} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8 md:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600 mb-8">About</p>

            <div className="grid gap-10 md:grid-cols-[240px_1fr] md:items-start">
              <div className="mx-auto w-48 md:w-full">
                <div className="overflow-hidden rounded-2xl border border-white/60 shadow-md shadow-black/8" style={{ transform: "translateZ(0)" }}>
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    <Image
                      src={bio.profileImage}
                      alt="Omer Zaman"
                      width={240}
                      height={300}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </motion.div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
                  I build the data infrastructure teams depend on.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-neutral-600">{bio.about[0]}</p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">{bio.about[2]}</p>

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
          </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   TECH MARQUEE — scrolling tech stack names
   --------------------------------------------------------------------------- */

function TechMarquee() {
  const techStack = [
    "BigQuery", "dbt", "SQL", "Python", "Pandas", "GCP", "Docker",
    "Metabase", "Streamlit", "TensorFlow", "Git", "Cloud Run",
  ];

  return (
    <div className="py-16 overflow-hidden">
      <div className="flex animate-marquee gap-8">
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={i}
            className="shrink-0 text-sm font-medium text-neutral-300 whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Skills</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            The tools I use to turn data into decisions.
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-8">
          {categories.map((cat, i) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <ScrollReveal key={cat} delay={i * 0.1}>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                  <h3 className="shrink-0 w-36 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    {categoryMeta[cat].label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm shadow-black/8 px-4 py-2 text-sm text-neutral-700 hover:bg-white/80 hover:shadow-md transition-all"
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
   PIPELINE FLOW — RAW → STG → DWH → GOLD animation
   --------------------------------------------------------------------------- */

const pipelineStages = [
  { label: "RAW", sublabel: "Extract" },
  { label: "STG", sublabel: "Clean" },
  { label: "DWH", sublabel: "Model" },
  { label: "GOLD", sublabel: "Serve" },
];

function PipelineFlow() {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 py-8">
      {pipelineStages.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-2 md:gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center gap-1 rounded-xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm shadow-black/8 px-4 py-3 md:px-6 md:py-4"
          >
            <span className="font-mono text-xs font-bold text-blue-600">{stage.label}</span>
            <span className="text-[10px] text-neutral-400">{stage.sublabel}</span>
          </motion.div>
          {i < pipelineStages.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
              className="h-px w-6 bg-blue-300 md:w-10 origin-left"
            />
          )}
        </div>
      ))}
    </div>
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
  engineering: "from-blue-100 to-indigo-100",
  science: "from-violet-100 to-purple-100",
  analytics: "from-cyan-100 to-teal-100",
};

function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    engineering: <Wrench className={className} />,
    science: <FlaskConical className={className} />,
    analytics: <BarChart3 className={className} />,
  };
  return <>{icons[category] || null}</>;
}

function FrostProjectCard({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "group cursor-pointer backdrop-blur-xl transition-all duration-300 h-full overflow-hidden",
        featured
          ? "relative bg-white/70 border border-white/60 shadow-lg shadow-black/8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl p-8 hover:bg-white/80 hover:shadow-xl"
          : "bg-white/70 border border-white/60 shadow-sm shadow-black/8 rounded-xl p-6 hover:bg-white/80 hover:shadow-md"
      )}
    >
      <div className={cn(
        "flex items-center justify-center bg-gradient-to-br",
        categoryGradients[project.category] || "from-neutral-100 to-neutral-50",
        featured
          ? "-mx-8 -mt-8 mb-4 h-32 rounded-t-2xl"
          : "-mx-6 -mt-6 mb-4 h-20 rounded-t-xl"
      )}>
        <CategoryIcon
          category={project.category}
          className={cn(
            "text-white/60",
            featured ? "h-10 w-10" : "h-7 w-7"
          )}
        />
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">{categoryIcons[project.category]}</span>
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
          {featured && (
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {project.longDescription}
            </p>
          )}
        </div>
        <div className="ml-4 text-right shrink-0">
          <span className={cn(
            "font-mono font-bold text-blue-600",
            featured ? "text-3xl" : "text-2xl"
          )}>
            {project.metric}
          </span>
          <p className="text-xs text-neutral-400">{project.metricLabel}</p>
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
          className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
        >
          View on GitHub <ExternalLink className="h-3 w-3" />
        </a>
      )}
      {!featured && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-4 border-t border-neutral-200/50 pt-4 text-sm leading-relaxed text-neutral-500">
                {project.longDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );

  if (featured) {
    return (
      <div className="relative rounded-2xl">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={60} />
        {cardContent}
      </div>
    );
  }

  return cardContent;
}

const filterTabDescriptions: Record<string, string> = {
  all: "Everything I've built",
  engineering: "Pipelines, models, infrastructure",
  science: "ML, statistics, predictions",
  analytics: "Dashboards, reports, insights",
};

function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = filtered.slice(0, 3);
  const remainingProjects = filtered.slice(3);

  return (
    <section id="projects" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Projects</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Things I&apos;ve built and explored.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <PipelineFlow />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-4">
            <div className="flex flex-wrap gap-6">
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 pb-1",
                    activeCategory === cat.id
                      ? "text-blue-600"
                      : "text-neutral-400 hover:text-neutral-600"
                  )}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="frost-project-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-xs text-neutral-400"
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
                <FrostProjectCard project={project} index={i} featured />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {remainingProjects.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <FrostProjectCard project={project} index={i + 3} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Experience</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Where I&apos;ve been. What I&apos;ve built.
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
                      entry.isCurrent ? "bg-blue-600" : "bg-neutral-300"
                    )}
                  />
                  <div className="mt-2 w-px flex-1 bg-neutral-200/50" />
                </div>
                <div className="pb-4">
                  <p className="font-mono text-sm text-blue-600">{entry.date}</p>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-900">{entry.role}</h3>
                  <p className="text-sm text-neutral-400">{entry.company}</p>
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
    role: "Client",
    linkedin: "https://www.linkedin.com/in/adnan-zafar-%F0%9F%87%AC%F0%9F%87%A7-%F0%9F%87%A6%F0%9F%87%BA-%F0%9F%87%AA%F0%9F%87%BA-1875a0218/",
  },
  {
    quote: "Working with Omer is always a great experience. He brings a unique combination of analytical thinking and engineering rigor that consistently delivers results above expectations.",
    name: "M. Zain R.",
    role: "Client",
    linkedin: "https://www.linkedin.com/in/mzainr99/",
  },
  {
    quote: "Omer's dedication to his craft is truly inspiring. He doesn't just build pipelines — he thinks deeply about data quality and how it impacts every downstream decision. A brilliant mind with a collaborative spirit.",
    name: "Esra Ilbay",
    role: "Client",
    linkedin: "https://www.linkedin.com/in/esrailbay/",
  },
  {
    quote: "One of the most detail-oriented data engineers I've worked with. Built our entire pipeline from scratch and it just works.",
    name: "Engineering Lead",
    role: "Fintech Startup, Berlin",
  },
  {
    quote: "Omer brings a rare combination of technical depth and clear communication. He can architect a complex data platform and explain it to stakeholders in the same breath. A pleasure to work with.",
    name: "Robin Aguilera",
    role: "Client",
    linkedin: "https://www.linkedin.com/in/robin-aguilera-503a092a/",
  },
  {
    quote: "Omer's dbt models transformed how we think about data quality. Zero downtime, zero data loss during the migration.",
    name: "Product Manager",
    role: "Fintech Startup, Berlin",
  },
  {
    quote: "The automated reporting pipeline saved our team 20+ hours per week. Reliable, well-documented, and easy to maintain.",
    name: "Finance Director",
    role: "Banking Partner",
  },
];

function TestimonialsSection() {
  return (
    <section className="relative px-6 py-32 md:px-12 lg:px-24 overflow-hidden">
      <div className="mx-auto max-w-6xl mb-12">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Testimonials</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            What people say.
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-slow gap-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[350px] rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/8 p-6"
            >
              <p className="text-sm leading-relaxed text-neutral-600 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 border-t border-neutral-200/50 pt-4">
                <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                <p className="text-xs text-neutral-400">{t.role}</p>
              </div>
            </div>
          ))}
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
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
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
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block w-[400px] h-[400px]">
        <Globe className="relative w-full h-full max-w-none" />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Contact</p>
          <h2 className="mt-4 text-4xl font-bold text-neutral-900 md:text-5xl">Let&apos;s Connect</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-neutral-400">
            Have a project in mind, a question about data, or just want to say hi?
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-4 text-left">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-xl bg-white/60 backdrop-blur-md border border-white/60 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/8"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-xl bg-white/60 backdrop-blur-md border border-white/60 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/8"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full resize-none rounded-xl bg-white/60 backdrop-blur-md border border-white/60 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/8"
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
              {status === "sending" && "Sending..."}
              {status === "sent" && "Sent!"}
              {status === "error" && "Try again"}
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
          <p className="text-sm text-neutral-400">Built by Omer Zaman</p>

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
                className="text-neutral-400 transition-colors hover:text-neutral-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm shadow-black/8 transition-all hover:bg-white/80"
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/10 px-3 py-2">
        {dockItems.map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            aria-label={label}
            whileHover={{ scale: 1.3, y: -8 }}
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
  return (
    <div className="relative min-h-screen">
      <DynamicMeshBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <ScrollProgress />
        <FrostNav />
        <CursorGlow />

        <div className="fixed top-4 right-4 z-50">
          <a
            href="/"
            className="rounded-full border border-white/60 bg-white/70 backdrop-blur-xl px-4 py-2 text-xs font-medium text-neutral-500 hover:bg-white/80 hover:text-neutral-700 transition-all shadow-sm shadow-black/8"
          >
            Compare versions
          </a>
        </div>

        <main>
          <HeroContent />
          <AboutSection />
          <TechMarquee />
          <SkillsSection />
          <ProjectsSection />
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
