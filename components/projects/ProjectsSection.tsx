import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { PipelineFlow } from "./PipelineFlow";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <ScrollReveal>
        <h2 className="text-center text-3xl font-semibold text-[#f1f5f9]">Projects</h2>
      </ScrollReveal>
      <PipelineFlow />
      <div className="mx-auto mt-8 grid max-w-4xl gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
