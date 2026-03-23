"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wrench, FlaskConical, BarChart3, ExternalLink, Github, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { projects, projectCategories } from "@/lib/data";
import type { Project } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  engineering: <Wrench className="h-3.5 w-3.5" />,
  science: <FlaskConical className="h-3.5 w-3.5" />,
  analytics: <BarChart3 className="h-3.5 w-3.5" />,
};

const categoryAccents: Record<string, string> = {
  engineering: "text-blue-600",
  science: "text-violet-600",
  analytics: "text-amber-600",
};

function FrostProjectCard({
  project,
  featured,
  onSelect,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  onSelect?: (p: Project) => void;
}) {
  const accent = categoryAccents[project.category] || "text-blue-600";

  const cardInner = (
    <div onClick={() => onSelect?.(project)} className="group cursor-pointer transition-all duration-300">
      {featured && (
        <div className="mb-5">
          <ProjectDiagram title={project.title} />
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={accent}>{categoryIcons[project.category]}</span>
            <h3
              className={cn(
                "font-semibold text-neutral-900 transition-colors group-hover:text-blue-600",
                featured ? "text-xl" : "text-lg",
              )}
            >
              {project.title}
            </h3>
          </div>
          <p className={cn("mt-2 leading-relaxed text-neutral-500", featured ? "text-sm md:text-base" : "text-sm")}>
            {project.description}
          </p>
        </div>
        <div className="ml-4 shrink-0 text-right">
          <span className={cn("font-mono font-bold", accent, featured ? "text-3xl" : "text-2xl")}>
            {project.metric}
          </span>
          <p className="text-xs text-neutral-500">{project.metricLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/30 bg-white/40 px-2.5 py-0.5 text-xs text-neutral-500">
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
      <div className="h-full overflow-hidden rounded-2xl border border-white/60 bg-white/85 p-8 shadow-lg shadow-black/8 backdrop-blur-xl transition-shadow hover:bg-white/80 hover:shadow-xl">
        {cardInner}
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-xl border border-white/60 bg-white/85 p-6 shadow-sm shadow-black/8 backdrop-blur-xl transition-shadow hover:bg-white/80 hover:shadow-md">
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-white/30 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/60 bg-white/92 p-8 shadow-2xl shadow-black/10 backdrop-blur-2xl sm:rounded-3xl sm:p-10"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-600"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-blue-600">{categoryIcons[project.category]}</span>
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {project.category === "engineering"
                  ? "Data Engineering"
                  : project.category === "science"
                    ? "Data Science"
                    : "Analytics"}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{project.title}</h2>
              <div className="shrink-0 text-right">
                <span className="font-mono text-3xl font-bold text-blue-600">{project.metric}</span>
                <p className="text-xs text-neutral-500">{project.metricLabel}</p>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">{project.description}</p>
            <div className="mt-6">
              <ProjectDiagram title={project.title} />
            </div>
            <div className="my-6 h-px bg-neutral-200/60" />
            <h3 className="mb-3 text-sm font-semibold text-neutral-900">Details</h3>
            <p className="text-sm leading-relaxed text-neutral-500">{project.longDescription}</p>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-neutral-900">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                  >
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
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
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

export function ProjectsSection() {
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
                      : "border border-white/60 bg-white/85 text-neutral-500 backdrop-blur-xl hover:bg-white/90 hover:text-neutral-700",
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
