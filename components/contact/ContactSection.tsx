"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";
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
      className="relative flex min-h-[80vh] flex-col items-center justify-center bg-[#141414] px-6 py-24 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <MeshGradient
          style={{ height: "100%", width: "100%" }}
          colors={["#1a1a1a", "#60a5fa", "#1a1a1a", "#a78bfa", "#1a1a1a"]}
          speed={0.2}
        />
      </div>
      <div className="section-divider absolute top-0 left-0 w-full" />

      <ScrollReveal>
        <p className="text-center font-mono text-sm uppercase tracking-widest text-[#60a5fa]">Contact</p>
        <h2 className="mt-4 text-center text-5xl font-bold text-[#f5f5f5] md:text-7xl">
          Let&apos;s Connect
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="mt-4 max-w-md text-center text-[#a3a3a3]">
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
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#737373] outline-none transition-colors focus:border-white/25"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#737373] outline-none transition-colors focus:border-white/25"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              required
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f5f5f5] placeholder-[#737373] outline-none transition-colors focus:border-white/25"
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all",
                status === "sent"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5]"
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
                className="group glass glass-hover flex h-12 w-12 items-center justify-center rounded-full transition-all"
              >
                <Icon className="h-5 w-5 text-[#737373] transition-colors group-hover:text-[#f5f5f5]" />
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <footer className="mt-24 text-center text-xs text-[#737373]">
        <p>Built with Next.js, Three.js, and Framer Motion</p>
        <p className="mt-1">&copy; 2026 Omer Zaman</p>
      </footer>
    </section>
  );
}
