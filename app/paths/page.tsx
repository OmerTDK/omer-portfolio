"use client";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio, skills, projects, projectCategories, experience, links } from "@/lib/data";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, GraduationCap, Github, Linkedin, Mail, Send, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-md"
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
          <span key={tag} className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-500">{tag}</span>
        ))}
      </div>
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          View on GitHub <ExternalLink className="h-3 w-3" />
        </a>
      )}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="mt-4 border-t border-neutral-100 pt-4 text-sm text-neutral-500">{project.longDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Divider() {
  return <div className="mx-auto max-w-6xl px-6"><div className="h-px bg-neutral-200" /></div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">{children}</p>;
}

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
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) { setStatus("sent"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  const categories = ["core", "data", "infra", "viz"] as const;
  const categoryMeta = {
    core: { label: "Core Stack" },
    data: { label: "Data Science" },
    infra: { label: "Infrastructure" },
    viz: { label: "Visualization" },
  } as const;

  return (
    <div className="bg-white text-neutral-900">
      <div className="fixed top-4 right-4 z-50">
        <a href="/" className="rounded-full border border-neutral-200 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-100 transition-all shadow-sm">
          ← Compare versions
        </a>
      </div>

      {/* HERO */}
      <BackgroundPaths title="Omer Zaman" />

      {/* ABOUT */}
      <section id="about" className="px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-[1fr_280px] md:items-center lg:grid-cols-[1fr_320px]">
            <div>
              <ScrollReveal>
                <SectionLabel>About</SectionLabel>
                <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
                  I build the data infrastructure teams depend on.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="mt-8 max-w-lg text-base leading-relaxed text-neutral-600">{bio.about[0]}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-400">{bio.about[2]}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-6">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" />{bio.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <GraduationCap className="h-3.5 w-3.5 text-neutral-400" />{bio.education}
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <div className="mt-12 flex gap-12">
                  {bio.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-mono text-4xl font-bold">{stat.value}{stat.suffix}</div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-neutral-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3}>
              <div className="mx-auto w-64 md:w-full">
                <div className="overflow-hidden rounded-2xl border border-neutral-200">
                  <Image src={bio.profileImage} alt="Omer Zaman" width={320} height={400} className="h-auto w-full object-cover" priority />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* SKILLS */}
      <section id="skills" className="px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Skills</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              The tools I use to turn data into decisions.
            </h2>
          </ScrollReveal>
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <ScrollReveal key={cat} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-neutral-300 hover:bg-white">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{categoryMeta[cat].label}</h3>
                    <div className="mt-6 flex flex-col gap-3">
                      {catSkills.map((skill) => (
                        <div key={skill.name} className="flex items-center gap-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                          <span className="text-sm text-neutral-700">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Projects</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Things I&apos;ve built and explored.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              {projectCategories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={cn("rounded-full border px-5 py-2 text-sm font-medium transition-all",
                    activeCategory === cat.id
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600")}>
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div key={project.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Divider />

      {/* EXPERIENCE */}
      <section id="experience" className="px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Where I&apos;ve been. What I&apos;ve built.</h2>
          </ScrollReveal>
          <div className="mt-16 space-y-12">
            {experience.map((entry) => (
              <ScrollReveal key={entry.date}>
                <div className="flex gap-4">
                  <div className={cn("mt-2 h-3 w-3 shrink-0 rounded-full", entry.isCurrent ? "bg-neutral-900" : "bg-neutral-300")} />
                  <div>
                    <p className="font-mono text-sm text-neutral-400">{entry.date}</p>
                    <h3 className="mt-1 text-lg font-semibold">{entry.role}</h3>
                    <p className="text-sm text-neutral-400">{entry.company}</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">{entry.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CONTACT */}
      <section id="contact" className="px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">Let&apos;s Connect</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-neutral-500">Have a project in mind, a question about data, or just want to say hi?</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="mt-12 space-y-4 text-left">
              <input type="text" name="name" placeholder="Name" required
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-neutral-400 transition-colors" />
              <input type="email" name="email" placeholder="Email" required
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-neutral-400 transition-colors" />
              <textarea name="message" placeholder="Message" rows={4} required
                className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm placeholder-neutral-400 outline-none focus:border-neutral-400 transition-colors" />
              <button type="submit" disabled={status === "sending" || status === "sent"}
                className={cn("inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all",
                  status === "sent" ? "bg-emerald-100 text-emerald-700" : "bg-neutral-900 text-white hover:bg-neutral-800")}>
                {status === "sending" && "Sending..."}
                {status === "sent" && "Sent!"}
                {status === "error" && "Try again"}
                {status === "idle" && <><span>Send Message</span><Send className="h-4 w-4" /></>}
              </button>
            </form>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-12 flex justify-center gap-4">
              {[{ href: links.github, icon: Github, label: "GitHub" }, { href: links.linkedin, icon: Linkedin, label: "LinkedIn" }, { href: links.email, icon: Mail, label: "Email" }].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 transition-all hover:border-neutral-400">
                  <Icon className="h-5 w-5 text-neutral-400" />
                </a>
              ))}
            </div>
          </ScrollReveal>
          <div className="mt-24 text-xs text-neutral-300">&copy; 2026 Omer Zaman</div>
        </div>
      </section>
    </div>
  );
}
