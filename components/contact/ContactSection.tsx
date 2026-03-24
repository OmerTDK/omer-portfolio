"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Globe } from "@/components/ui/globe";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/meerdbvn", {
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
    <section id="contact" className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24">
      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 opacity-40 lg:block">
        <Globe className="relative h-full w-full max-w-none" />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Contact</p>
          <h2 className="mt-4 text-4xl font-bold text-neutral-900 md:text-5xl">
            Let&apos;s build something together.
          </h2>
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
              name="_gotcha"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label htmlFor="contact-name" className="sr-only">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Name"
              required
              aria-label="Your name"
              className="w-full rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm shadow-black/8 outline-none backdrop-blur-xl transition-all focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10"
            />
            <label htmlFor="contact-email" className="sr-only">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Email"
              required
              aria-label="Your email"
              className="w-full rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm shadow-black/8 outline-none backdrop-blur-xl transition-all focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10"
            />
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Message"
              rows={4}
              required
              aria-label="Your message"
              className="w-full resize-none rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm shadow-black/8 outline-none backdrop-blur-xl transition-all focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/10"
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium shadow-lg shadow-black/10 transition-all active:scale-[0.97]",
                status === "sent"
                  ? "bg-emerald-500 text-white"
                  : "bg-neutral-900 text-white hover:bg-neutral-800",
              )}
            >
              {status === "sending" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              )}
              {status === "sent" && <span>Sent!</span>}
              {status === "error" && <span>Try again</span>}
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
