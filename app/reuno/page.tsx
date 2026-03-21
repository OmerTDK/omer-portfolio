"use client";

import { Navbar } from "@/components/nav/Navbar";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio, skills, projects, projectCategories, experience, links } from "@/lib/data";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { MapPin, GraduationCap, Github, Linkedin, Mail, Send, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-8"
        >
          <span className="text-white/70 text-xs font-medium tracking-wide">
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
              background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 40%, #93c5fd 70%, #ffffff 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Omer
          </span>
          <span className="block text-white drop-shadow-2xl">Zaman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 mx-auto max-w-lg text-lg text-white/50"
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
            className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 text-white text-sm font-semibold hover:from-blue-400 hover:to-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   ABOUT — Single floating glass panel
   --------------------------------------------------------------------------- */

function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400 mb-8">About</p>

            <div className="grid gap-10 md:grid-cols-[240px_1fr] md:items-start">
              {/* Photo */}
              <div className="mx-auto w-48 md:w-full">
                <div className="overflow-hidden rounded-2xl border border-white/10">
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

              {/* Text */}
              <div>
                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                  I build the data infrastructure teams depend on.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-white/60">{bio.about[0]}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/40">{bio.about[2]}</p>

                <div className="mt-6 flex flex-wrap gap-6">
                  <span className="inline-flex items-center gap-2 text-sm text-white/50">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    {bio.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-white/50">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-300" />
                    {bio.education}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row at the bottom of the glass panel */}
            <div className="mt-10 border-t border-white/5 pt-8 flex justify-around">
              {bio.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-mono text-3xl font-bold text-white md:text-4xl">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-white/30">{stat.label}</div>
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
   SKILLS — Animated grid with glowing dots
   --------------------------------------------------------------------------- */

const skillCategoryConfig = {
  core: { label: "Core Stack", color: "#60a5fa" },
  data: { label: "Data Science", color: "#93c5fd" },
  infra: { label: "Infrastructure", color: "#22d3ee" },
  viz: { label: "Visualization", color: "#fb923c" },
} as const;

function SkillsSection() {
  const categories = ["core", "data", "infra", "viz"] as const;

  return (
    <section id="skills" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300">Skills</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            The tools I use to turn data into decisions.
          </h2>
        </ScrollReveal>

        {/* Category legend */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-6">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: skillCategoryConfig[cat].color }} />
                <span className="text-xs text-white/40">{skillCategoryConfig[cat].label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 4-column grid of skills */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {skills.map((skill, i) => {
            const config = skillCategoryConfig[skill.category];
            return (
              <ScrollReveal key={skill.name} delay={i * 0.03}>
                <motion.div
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.06)" }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition-colors cursor-default"
                >
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: config.color,
                      boxShadow: `0 0 8px ${config.color}60`,
                    }}
                  />
                  <span className="text-sm text-white/70">{skill.name}</span>
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
   PROJECTS — Stacked cards with depth + pipeline flow
   --------------------------------------------------------------------------- */

const pipelineStages = [
  { label: "RAW", color: "#60a5fa" },
  { label: "STG", color: "#0891b2" },
  { label: "DWH", color: "#22d3ee" },
  { label: "GOLD", color: "#60a5fa" },
];

function GlowProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => setExpanded(!expanded)}
      className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] h-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/50">{project.description}</p>
        </div>
        <div className="ml-4 text-right shrink-0">
          <span className="font-mono text-2xl font-bold text-blue-400">{project.metric}</span>
          <p className="text-xs text-white/30">{project.metricLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-xs text-white/40"
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
          className="mt-3 inline-flex items-center gap-1 text-xs text-blue-400 hover:underline"
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
            <p className="mt-4 border-t border-white/5 pt-4 text-sm leading-relaxed text-white/50">
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
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">Projects</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            Things I&apos;ve built and explored.
          </h2>
        </ScrollReveal>

        {/* Pipeline flow with animated glow particles */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex items-center justify-center gap-2 py-8 md:gap-4">
            {pipelineStages.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-2 md:gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border text-xs font-semibold md:h-14 md:w-14"
                  style={{
                    borderColor: `${stage.color}40`,
                    backgroundColor: `${stage.color}10`,
                    color: stage.color,
                    boxShadow: `0 0 20px ${stage.color}15`,
                  }}
                >
                  {stage.label}
                </motion.div>
                {i < pipelineStages.length - 1 && (
                  <div className="relative h-0.5 w-6 md:w-12">
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ backgroundColor: stage.color }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delay={0.2}>
          <div className="mt-6 flex flex-wrap gap-3">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "border-blue-400/40 bg-blue-400/10 text-blue-400"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Stacked cards with depth offset */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <GlowProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   EXPERIENCE — Horizontal scrolling timeline
   --------------------------------------------------------------------------- */

function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300">Experience</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            Where I&apos;ve been. What I&apos;ve built.
          </h2>
        </ScrollReveal>

        {/* Horizontal scrolling timeline */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 relative">
            {/* Horizontal line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {experience.map((entry, i) => (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={cn(
                    "relative shrink-0 snap-start w-80 md:w-96 pt-12 first:ml-0",
                  )}
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute top-4 left-6 h-4 w-4 rounded-full border-2",
                      entry.isCurrent
                        ? "border-blue-400 bg-blue-400/30"
                        : "border-blue-300 bg-blue-300/20"
                    )}
                    style={{
                      boxShadow: entry.isCurrent
                        ? "0 0 16px rgba(6,182,212,0.5)"
                        : "0 0 12px rgba(249,115,22,0.3)",
                    }}
                  />

                  <div
                    className={cn(
                      "rounded-2xl border p-6 backdrop-blur-sm h-full",
                      entry.isCurrent
                        ? "border-blue-400/20 bg-white/[0.04]"
                        : "border-white/[0.06] bg-white/[0.02]"
                    )}
                    style={
                      entry.isCurrent
                        ? { boxShadow: "0 0 40px rgba(6,182,212,0.08)" }
                        : undefined
                    }
                  >
                    <p className="font-mono text-sm text-blue-400">{entry.date}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{entry.role}</h3>
                    <p className="text-sm font-medium text-white/40">{entry.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{entry.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   CONTACT — Glass form, gradient button
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
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">Contact</p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">Let&apos;s Connect</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-white/40">
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
              className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400/30 transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400/30 transition-colors"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400/30 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all",
                status === "sent"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-gradient-to-r from-blue-500 to-blue-300 text-white hover:from-blue-400 hover:to-blue-300"
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

        {/* Social icons as glass circles */}
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
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <Icon className="h-5 w-5 text-white/40 transition-colors group-hover:text-white/80" />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-24 text-center text-xs text-white/20">
          <p>Built by Omer Zaman</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   MAIN PAGE
   --------------------------------------------------------------------------- */

export default function ReunoPage() {
  return (
    <div className="relative min-h-screen">
      {/* ONE persistent mesh gradient background for the entire site */}
      <div className="fixed inset-0 z-0">
        <MeshGradient
          style={{ height: "100%", width: "100%" }}
          colors={["#000000", "#1a1a1a", "#2a2a2a", "#0a0a0a", "#1e3a5f"]}
          speed={0.1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Compare versions link */}
        <div className="fixed top-4 right-4 z-50">
          <a
            href="/"
            className="rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-4 py-2 text-xs font-medium text-white/60 hover:bg-white/10 transition-all"
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
