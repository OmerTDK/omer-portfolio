"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { createNoise2D } from "simplex-noise";
import { bio } from "@/lib/data";

function TopoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise2D = createNoise2D();
    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
    }

    function draw(time: number) {
      const t = time * 0.0003;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ctx!.clearRect(0, 0, w, h);

      const lineCount = 40;
      const colors = [
        "rgba(99,102,241,0.12)",
        "rgba(59,130,246,0.10)",
        "rgba(139,92,246,0.08)",
        "rgba(14,165,233,0.06)",
      ];

      for (let line = 0; line < lineCount; line++) {
        const baseY = (h / lineCount) * line;
        const colorIdx = line % colors.length;

        ctx!.beginPath();
        ctx!.strokeStyle = colors[colorIdx];
        ctx!.lineWidth = 1;

        for (let x = 0; x <= w; x += 3) {
          const nx = x / w;
          const ny = line / lineCount;

          const mouseInfluence =
            Math.exp(-((nx - mx) ** 2 + (ny - my) ** 2) * 8) * 40;

          const elevation =
            noise2D(nx * 3 + t, ny * 3 + t * 0.5) * 30 +
            noise2D(nx * 6 + t * 0.7, ny * 6) * 15 +
            mouseInfluence;

          const y = baseY + elevation;
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();

        if (line % 5 === 0) {
          ctx!.beginPath();
          ctx!.strokeStyle = colors[colorIdx].replace(/[\d.]+\)$/, "0.25)");
          ctx!.lineWidth = 1.5;
          for (let x = 0; x <= w; x += 3) {
            const nx = x / w;
            const ny = line / lineCount;
            const mouseInfluence =
              Math.exp(-((nx - mx) ** 2 + (ny - my) ** 2) * 8) * 40;
            const elevation =
              noise2D(nx * 3 + t, ny * 3 + t * 0.5) * 30 +
              noise2D(nx * 6 + t * 0.7, ny * 6) * 15 +
              mouseInfluence;
            const y = baseY + elevation;
            if (x === 0) ctx!.moveTo(x, y);
            else ctx!.lineTo(x, y);
          }
          ctx!.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export default function TopoHero() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa]">
      <TopoCanvas />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={entered ? { opacity: 0.5 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="mb-8 font-mono text-sm uppercase tracking-[0.4em] text-indigo-500/70"
          >
            Analytics Engineer
          </motion.p>

          <h1 className="text-7xl font-bold tracking-tighter md:text-9xl lg:text-[11rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-neutral-900"
                initial={{ y: "110%" }}
                animate={entered ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Omer
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
                initial={{ y: "110%" }}
                animate={entered ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Zaman
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mx-auto mt-8 max-w-md text-lg text-neutral-500"
          >
            {bio.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <a href="#" className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              View my work
            </a>
            <a href="#" className="rounded-full border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-400">
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 0.4 } : {}}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
