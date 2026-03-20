"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio, skills, projects, projectCategories, experience, links } from "@/lib/data";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { MapPin, GraduationCap, Github, Linkedin, Mail, Send, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

/* ---------------------------------------------------------------------------
   INLINE NAV — Frosted glass, macOS style
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

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-sm shadow-black/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold text-neutral-900">
          Omer
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
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
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ---------------------------------------------------------------------------
   HERO
   --------------------------------------------------------------------------- */

function HeroContent() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 backdrop-blur-xl px-4 py-1.5 mb-8 shadow-sm shadow-black/5"
        >
          <span className="text-neutral-500 text-xs font-medium tracking-wide">
            Analytics Engineer &middot; Berlin
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]"
        >
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #171717 0%, #2563eb 45%, #171717 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Omer
          </span>
          <span className="block text-neutral-900">Zaman</span>
        </motion.h1>

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
            className="px-8 py-3 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-neutral-700 text-sm font-medium hover:bg-white/80 transition-all duration-300 shadow-sm shadow-black/5"
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
   ABOUT — Frosted glass panel
   --------------------------------------------------------------------------- */

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
            className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5 p-8 md:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600 mb-8">About</p>

            <div className="grid gap-10 md:grid-cols-[240px_1fr] md:items-start">
              <div className="mx-auto w-48 md:w-full">
                <div className="overflow-hidden rounded-2xl border border-white/50 shadow-md shadow-black/5">
                  <Image
                    src={bio.profileImage}
                    alt="Omer Zaman"
                    width={240}
                    height={300}
                    className="h-auto w-full object-cover"
                    priority
                  />
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
                <div key={stat.label} className="text-center">
                  <div className="font-mono text-3xl font-bold text-neutral-900 md:text-4xl">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   SKILLS — 4-column frosted glass cards
   --------------------------------------------------------------------------- */

const skillCategoryConfig = {
  core: { label: "Core Stack", color: "#2563eb" },
  data: { label: "Data Science", color: "#3b82f6" },
  infra: { label: "Infrastructure", color: "#0284c7" },
  viz: { label: "Visualization", color: "#6366f1" },
} as const;

function SkillsSection() {
  const categories = ["core", "data", "infra", "viz"] as const;

  return (
    <section id="skills" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Skills</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            The tools I use to turn data into decisions.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-6">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: skillCategoryConfig[cat].color }} />
                <span className="text-xs text-neutral-400">{skillCategoryConfig[cat].label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {skills.map((skill, i) => {
            const config = skillCategoryConfig[skill.category];
            return (
              <ScrollReveal key={skill.name} delay={i * 0.03}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm shadow-black/5 px-4 py-3.5 transition-all hover:bg-white/70 hover:shadow-md hover:shadow-black/10 cursor-default"
                >
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-sm text-neutral-600">{skill.name}</span>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   PROJECTS — Frosted glass cards with text-tab filters
   --------------------------------------------------------------------------- */

function FrostProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => setExpanded(!expanded)}
      className="group cursor-pointer rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5 p-6 transition-all duration-300 hover:bg-white/70 hover:shadow-xl hover:shadow-black/10 h-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">{project.description}</p>
        </div>
        <div className="ml-4 text-right shrink-0">
          <span className="font-mono text-2xl font-bold text-blue-600">{project.metric}</span>
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
    </motion.div>
  );
}

function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Projects</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Things I&apos;ve built and explored.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-6">
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
                    layoutId="frost-project-filter"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <FrostProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   EXPERIENCE — Vertical timeline with blue dots
   --------------------------------------------------------------------------- */

function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Experience</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Where I&apos;ve been. What I&apos;ve built.
          </h2>
        </ScrollReveal>

        <div className="mt-16 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-200/60" />

          <div className="space-y-10">
            {experience.map((entry, i) => (
              <ScrollReveal key={entry.date} delay={i * 0.1}>
                <div className="relative pl-16">
                  <div
                    className={cn(
                      "absolute left-4 top-2 h-5 w-5 rounded-full border-2",
                      entry.isCurrent
                        ? "border-blue-600 bg-blue-100"
                        : "border-neutral-300 bg-neutral-100"
                    )}
                  >
                    {entry.isCurrent && (
                      <div className="absolute inset-1 rounded-full bg-blue-600 animate-pulse" />
                    )}
                  </div>

                  <div className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5 p-6 transition-all hover:bg-white/70 hover:shadow-xl hover:shadow-black/10">
                    <p className="font-mono text-sm text-blue-600">{entry.date}</p>
                    <h3 className="mt-2 text-lg font-semibold text-neutral-900">{entry.role}</h3>
                    <p className="text-sm font-medium text-neutral-400">{entry.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">{entry.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
    <section id="contact" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl text-center">
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
              className="w-full rounded-xl bg-white/50 backdrop-blur-md border border-white/50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/5"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-xl bg-white/50 backdrop-blur-md border border-white/50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/5"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full resize-none rounded-xl bg-white/50 backdrop-blur-md border border-white/50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-sm shadow-black/5"
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

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex justify-center gap-4">
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
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-sm shadow-black/5 transition-all hover:bg-white/70 hover:shadow-md hover:shadow-black/10"
              >
                <Icon className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-neutral-700" />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-24 text-center text-xs text-neutral-400">
          <p>Built by Omer Zaman</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   MAIN PAGE
   --------------------------------------------------------------------------- */

export default function FrostPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <MeshGradient
          style={{ height: "100%", width: "100%" }}
          colors={["#c7d2fe", "#93c5fd", "#a5b4fc", "#7dd3fc", "#c4b5fd"]}
          speed={0.8}
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="relative z-10">
        <FrostNav />

        <div className="fixed top-4 right-4 z-50">
          <a
            href="/"
            className="rounded-full border border-white/50 bg-white/60 backdrop-blur-xl px-4 py-2 text-xs font-medium text-neutral-500 hover:bg-white/80 hover:text-neutral-700 transition-all shadow-sm shadow-black/5"
          >
            Compare versions
          </a>
        </div>

        <main>
          <HeroContent />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
