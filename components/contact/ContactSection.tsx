import { Github, Linkedin, Mail } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { links } from "@/lib/data";

const socialLinks = [
  { href: links.github, icon: Github, label: "GitHub" },
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: links.email, icon: Mail, label: "Email" },
];

export function ContactSection() {
  return (
    <SectionWrapper
      id="contact"
      className="flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-transparent to-[#020617]"
    >
      <ScrollReveal>
        <h2 className="text-center text-3xl font-semibold text-[#f1f5f9]">Let&apos;s Connect</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="mt-4 max-w-md text-center text-[#94a3b8]">
          Always open to interesting conversations about data, engineering, and building things that matter.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="mt-8 flex gap-6">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#1a2040] bg-[#0a0e1a] transition-all hover:border-[#60a5fa]/40 hover:shadow-[0_0_20px_rgba(96,165,250,0.1)]"
            >
              <Icon className="h-5 w-5 text-[#64748b] transition-colors group-hover:text-[#60a5fa]" />
            </a>
          ))}
        </div>
      </ScrollReveal>
      <footer className="mt-24 text-center text-xs text-[#64748b]">
        <p>Built with Next.js, Three.js, and Framer Motion</p>
        <p className="mt-1">&copy; 2026 Omer Zaman</p>
      </footer>
    </SectionWrapper>
  );
}
