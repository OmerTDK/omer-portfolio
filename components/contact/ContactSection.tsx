"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { links } from "@/lib/data";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: links.github, icon: Github, label: "GitHub" },
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: links.email, icon: Mail, label: "Email" },
];

export function ContactSection() {
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
    <section
      id="contact"
      className="section-dark relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="glow-line absolute top-0 left-0 w-full" />

      <ScrollReveal>
        <p className="text-center font-mono text-sm uppercase tracking-widest text-[#60a5fa]">Contact</p>
        <h2 className="mt-4 text-center text-5xl font-bold text-white md:text-7xl">
          Let&apos;s Connect
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="mt-4 max-w-md text-center text-[#94a3b8]">
          Have a project in mind, a question about data, or just want to say hi?
        </p>
      </ScrollReveal>

      {/* Form + Links side by side on desktop */}
      <ScrollReveal delay={0.2} className="mt-12 w-full max-w-2xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-lg border border-[#1a2040] bg-[#0a0e1a] px-4 py-3 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none transition-colors focus:border-[#60a5fa]/50"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-lg border border-[#1a2040] bg-[#0a0e1a] px-4 py-3 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none transition-colors focus:border-[#60a5fa]/50"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full resize-none rounded-lg border border-[#1a2040] bg-[#0a0e1a] px-4 py-3 text-sm text-[#f1f5f9] placeholder-[#64748b] outline-none transition-colors focus:border-[#60a5fa]/50"
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all",
                status === "sent"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-[#60a5fa] text-[#020617] hover:bg-[#60a5fa]/90"
              )}
            >
              {status === "sending" && "Sending..."}
              {status === "sent" && "Sent!"}
              {status === "error" && "Try again"}
              {status === "idle" && (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Social links — vertical on desktop */}
          <div className="flex gap-4 md:flex-col md:justify-center">
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
        </div>
      </ScrollReveal>

      <footer className="mt-24 text-center text-xs text-[#64748b]">
        <p>Built with Next.js, Three.js, and Framer Motion</p>
        <p className="mt-1">&copy; 2026 Omer Zaman</p>
      </footer>
    </section>
  );
}
