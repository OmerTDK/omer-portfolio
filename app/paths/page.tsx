"use client";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio, skills, projects, projectCategories, experience, links } from "@/lib/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, GraduationCap, Github, Linkedin, Mail, Send, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

/* ---------------------------------------------------------------------------
   INLINE LIGHT NAV (no Navbar import — built specifically for this version)
   --------------------------------------------------------------------------- */

function LightNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navSections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const section of navSections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-base font-semibold text-neutral-900 tracking-tight transition-opacity hover:opacity-60"
        >
          Omer
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={cn(
                "relative text-sm transition-colors pb-0.5",
                activeSection === section.id
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div
                  layoutId="paths-nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-neutral-900"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className="text-neutral-400 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <span className="text-sm font-medium">Close</span>
          ) : (
            <span className="text-sm font-medium">Menu</span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/95 backdrop-blur-md border-b border-neutral-200 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "text-left text-sm transition-colors",
                    activeSection === section.id ? "text-neutral-900 font-medium" : "text-neutral-400"
                  )}
                >
                  {section.label}
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
   FEATURED PROJECT CARD (large, for first 3 projects)
   --------------------------------------------------------------------------- */

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-neutral-300 hover:shadow-lg group"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              {project.category === "engineering" ? "Data Engineering" : project.category === "science" ? "Data Science" : "Analytics"}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-neutral-500 max-w-xl">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-500">
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
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              View on GitHub <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <div className="text-left md:text-right shrink-0">
          <span className="font-mono text-4xl font-bold text-neutral-900">{project.metric}</span>
          <p className="text-sm text-neutral-400 mt-1">{project.metricLabel}</p>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-6 border-t border-neutral-100 pt-6 text-sm leading-relaxed text-neutral-500">
              {project.longDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   COMPACT PROJECT CARD (for remaining projects in tighter grid)
   --------------------------------------------------------------------------- */

function CompactProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
          <p className="mt-2 text-sm text-neutral-500">{project.description}</p>
        </div>
        <div className="ml-4 text-right shrink-0">
          <span className="font-mono text-2xl font-bold text-neutral-900">{project.metric}</span>
          <p className="text-xs text-neutral-400">{project.metricLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-500">
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
          className="mt-3 inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
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
            <p className="mt-4 border-t border-neutral-100 pt-4 text-sm text-neutral-500">{project.longDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   SECTION LABEL
   --------------------------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">{children}</p>;
}

/* ---------------------------------------------------------------------------
   MAIN PAGE
   --------------------------------------------------------------------------- */

export default function PathsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);
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

  const skillCategories = ["core", "data", "infra", "viz"] as const;
  const categoryMeta = {
    core: { label: "Core Stack" },
    data: { label: "Data Science" },
    infra: { label: "Infrastructure" },
    viz: { label: "Visualization" },
  } as const;

  const featuredProjects = filtered.slice(0, 3);
  const remainingProjects = filtered.slice(3);

  return (
    <div className="bg-white text-neutral-900">
      <LightNav />

      <div className="fixed top-4 right-4 z-50">
        <a
          href="/"
          className="rounded-full border border-neutral-200 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-100 transition-all shadow-sm"
        >
          Compare versions
        </a>
      </div>

      {/* ======================== HERO ======================== */}
      <BackgroundPaths title="Omer Zaman" />

      {/* ======================== ABOUT — Magazine editorial ======================== */}
      <section id="about" className="bg-neutral-50 px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>About</SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-8 text-3xl font-bold leading-snug md:text-5xl lg:text-6xl max-w-4xl">
              <span className="text-neutral-900">I build the data infrastructure</span>{" "}
              <span className="text-neutral-400">teams depend on for real decisions.</span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-16 md:grid-cols-[1fr_280px] md:items-start lg:grid-cols-[1fr_300px]">
            <div>
              <ScrollReveal delay={0.2}>
                <p className="text-lg leading-relaxed text-neutral-600 max-w-lg">{bio.about[0]}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="mt-6 text-base leading-relaxed text-neutral-400 max-w-lg">{bio.about[2]}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-6">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                    {bio.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <GraduationCap className="h-3.5 w-3.5 text-neutral-400" />
                    {bio.education}
                  </span>
                </div>
              </ScrollReveal>

              {/* Stats as large mono numbers in a horizontal row */}
              <ScrollReveal delay={0.5}>
                <div className="mt-16 flex gap-16">
                  {bio.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-mono text-5xl font-bold text-neutral-900">
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="mt-2 text-xs uppercase tracking-widest text-neutral-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Photo with editorial rotation */}
            <ScrollReveal delay={0.3}>
              <div className="mx-auto w-64 md:w-full">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={bio.profileImage}
                    alt="Omer Zaman"
                    width={300}
                    height={380}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ======================== SKILLS — Horizontal pills ======================== */}
      <section id="skills" className="bg-white px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Skills</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              The tools I use to turn data into decisions.
            </h2>
          </ScrollReveal>

          <div className="mt-16 space-y-8">
            {skillCategories.map((cat, i) => {
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
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 transition-colors"
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

      {/* ======================== PROJECTS — Featured + grid ======================== */}
      <section id="projects" className="bg-neutral-50 px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Projects</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Things I&apos;ve built and explored.</h2>
          </ScrollReveal>

          {/* Category filters as text tabs with underline */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-6">
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "relative pb-1.5 text-sm font-medium transition-colors",
                    activeCategory === cat.id ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                  )}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="paths-project-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Featured large cards */}
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
                  <FeaturedProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Remaining projects in tighter grid */}
          {remainingProjects.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {remainingProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <CompactProjectCard project={project} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ======================== EXPERIENCE — Clean left-aligned timeline ======================== */}
      <section id="experience" className="bg-white px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Where I&apos;ve been. What I&apos;ve built.</h2>
          </ScrollReveal>

          <div className="mt-16 max-w-2xl space-y-16">
            {experience.map((entry) => (
              <ScrollReveal key={entry.date}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center pt-2">
                    <div
                      className={cn(
                        "h-3 w-3 shrink-0 rounded-full",
                        entry.isCurrent ? "bg-neutral-900" : "bg-neutral-300"
                      )}
                    />
                    <div className="mt-2 w-px flex-1 bg-neutral-200" />
                  </div>
                  <div className="pb-4">
                    <p className="font-mono text-sm text-neutral-400">{entry.date}</p>
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

      {/* ======================== CONTACT — Centered minimal ======================== */}
      <section id="contact" className="bg-neutral-50 px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-xl text-center">
          <ScrollReveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">Let&apos;s Connect</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-neutral-500">
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
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-400 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-400 transition-colors"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-400 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all",
                  status === "sent"
                    ? "bg-emerald-100 text-emerald-700"
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

          {/* Social as text links */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 flex justify-center gap-8">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={links.email}
                className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                Email
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-24 text-xs text-neutral-300">&copy; 2026 Omer Zaman</div>
        </div>
      </section>
    </div>
  );
}
