"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { bio, links } from "@/lib/data";
import { createNoise2D } from "simplex-noise";

/* ---------------------------------------------------------------------------
   OCEAN + STARS + AURORA — Vinland Saga / One Piece atmosphere
   Full production-grade canvas with:
   - Parallax star field (3 depth layers)
   - Animated ocean waves with reflections
   - Aurora borealis ribbons
   - Mouse-reactive horizon glow
   --------------------------------------------------------------------------- */

function VoyageCanvas() {
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
    let horizonY = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * Math.min(devicePixelRatio, 2);
      canvas!.height = h * Math.min(devicePixelRatio, 2);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(Math.min(devicePixelRatio, 2), 0, 0, Math.min(devicePixelRatio, 2), 0, 0);
      horizonY = h * 0.58;
    }
    resize();

    // Stars — 3 depth layers
    interface Star { x: number; y: number; size: number; brightness: number; twinkleSpeed: number; layer: number; }
    const stars: Star[] = [];
    for (let layer = 0; layer < 3; layer++) {
      const count = layer === 0 ? 80 : layer === 1 ? 50 : 20;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * horizonY * 0.95,
          size: layer === 0 ? 0.5 + Math.random() * 0.8 : layer === 1 ? 1 + Math.random() * 1 : 1.5 + Math.random() * 1.5,
          brightness: 0.3 + Math.random() * 0.7,
          twinkleSpeed: 0.5 + Math.random() * 2,
          layer,
        });
      }
    }

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
    }

    function draw(time: number) {
      const t = time * 0.001;
      const mx = mouseRef.current.x;

      // Sky gradient — deep navy to dark teal at horizon
      const skyGrad = ctx!.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, "#030812");
      skyGrad.addColorStop(0.4, "#071020");
      skyGrad.addColorStop(0.7, "#0a1628");
      skyGrad.addColorStop(1, "#0d1f35");
      ctx!.fillStyle = skyGrad;
      ctx!.fillRect(0, 0, w, horizonY);

      // Stars
      for (const star of stars) {
        const parallaxX = (mx - 0.5) * (star.layer + 1) * 8;
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.x);
        const alpha = star.brightness * twinkle;

        ctx!.save();
        ctx!.globalAlpha = alpha;
        ctx!.beginPath();
        ctx!.arc(star.x + parallaxX, star.y, star.size, 0, Math.PI * 2);
        ctx!.fillStyle = star.layer === 2 ? "#e8d5b0" : "#c8d8f0";
        ctx!.fill();

        // Glow for bright stars
        if (star.layer >= 1 && alpha > 0.5) {
          ctx!.globalAlpha = alpha * 0.15;
          ctx!.beginPath();
          ctx!.arc(star.x + parallaxX, star.y, star.size * 4, 0, Math.PI * 2);
          const gGrad = ctx!.createRadialGradient(
            star.x + parallaxX, star.y, 0,
            star.x + parallaxX, star.y, star.size * 4
          );
          gGrad.addColorStop(0, star.layer === 2 ? "#e8d5b0" : "#6ea0d0");
          gGrad.addColorStop(1, "transparent");
          ctx!.fillStyle = gGrad;
          ctx!.fill();
        }
        ctx!.restore();
      }

      // Aurora — 3 ribbons
      for (let ribbon = 0; ribbon < 3; ribbon++) {
        const ribbonY = horizonY * (0.15 + ribbon * 0.12);
        const amplitude = 25 + ribbon * 10;
        const speed = 0.15 + ribbon * 0.05;
        const hue = ribbon === 0 ? 160 : ribbon === 1 ? 200 : 130;

        ctx!.save();
        ctx!.globalAlpha = 0.06 + Math.sin(t * 0.3 + ribbon) * 0.02;

        ctx!.beginPath();
        ctx!.moveTo(0, ribbonY);
        for (let x = 0; x <= w; x += 4) {
          const n = noise2D(x * 0.002 + t * speed, ribbon * 10);
          const y = ribbonY + n * amplitude + Math.sin(x * 0.003 + t * 0.5) * 15;
          ctx!.lineTo(x, y);
        }
        ctx!.lineTo(w, ribbonY + 60);
        ctx!.lineTo(0, ribbonY + 60);
        ctx!.closePath();

        const aGrad = ctx!.createLinearGradient(0, ribbonY - amplitude, 0, ribbonY + 60);
        aGrad.addColorStop(0, "transparent");
        aGrad.addColorStop(0.3, `hsla(${hue}, 70%, 60%, 0.6)`);
        aGrad.addColorStop(0.6, `hsla(${hue}, 60%, 50%, 0.3)`);
        aGrad.addColorStop(1, "transparent");
        ctx!.fillStyle = aGrad;
        ctx!.fill();
        ctx!.restore();
      }

      // Horizon glow — warm line where sky meets water
      const hGrad = ctx!.createRadialGradient(
        w * (0.4 + mx * 0.2), horizonY, 0,
        w * (0.4 + mx * 0.2), horizonY, w * 0.5
      );
      hGrad.addColorStop(0, "rgba(180, 140, 90, 0.12)");
      hGrad.addColorStop(0.3, "rgba(120, 100, 80, 0.05)");
      hGrad.addColorStop(1, "transparent");
      ctx!.fillStyle = hGrad;
      ctx!.fillRect(0, horizonY - 100, w, 200);

      // Horizon line
      ctx!.save();
      ctx!.globalAlpha = 0.15;
      ctx!.strokeStyle = "#8899aa";
      ctx!.lineWidth = 0.5;
      ctx!.beginPath();
      ctx!.moveTo(0, horizonY);
      ctx!.lineTo(w, horizonY);
      ctx!.stroke();
      ctx!.restore();

      // Ocean — layered waves
      const oceanGrad = ctx!.createLinearGradient(0, horizonY, 0, h);
      oceanGrad.addColorStop(0, "#0a1525");
      oceanGrad.addColorStop(0.3, "#070f1e");
      oceanGrad.addColorStop(1, "#040a14");
      ctx!.fillStyle = oceanGrad;
      ctx!.fillRect(0, horizonY, w, h - horizonY);

      // Wave layers
      for (let layer = 0; layer < 5; layer++) {
        const baseY = horizonY + layer * 18 + 5;
        const waveAmplitude = 3 + layer * 1.5;
        const waveSpeed = 0.2 + layer * 0.08;
        const alpha = 0.08 - layer * 0.012;

        ctx!.save();
        ctx!.globalAlpha = Math.max(alpha, 0.01);
        ctx!.beginPath();
        ctx!.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 3) {
          const n = noise2D(x * 0.003 + t * waveSpeed, layer * 5 + t * 0.1);
          const y = baseY + n * waveAmplitude + Math.sin(x * 0.005 + t * 0.8 + layer) * 2;
          ctx!.lineTo(x, y);
        }
        ctx!.lineTo(w, h);
        ctx!.lineTo(0, h);
        ctx!.closePath();
        ctx!.fillStyle = layer < 2 ? "rgba(100, 150, 200, 0.3)" : "rgba(60, 100, 150, 0.2)";
        ctx!.fill();
        ctx!.restore();
      }

      // Star reflections in water — shimmering columns
      for (const star of stars) {
        if (star.layer < 1 || star.brightness < 0.5) continue;
        const parallaxX = (mx - 0.5) * (star.layer + 1) * 8;
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.x);
        if (twinkle < 0.4) continue;

        const refX = star.x + parallaxX;
        const refY = horizonY + (horizonY - star.y) * 0.15 + 10;
        const refH = 20 + star.layer * 15;

        ctx!.save();
        ctx!.globalAlpha = twinkle * 0.08;
        const rGrad = ctx!.createLinearGradient(refX, refY, refX, refY + refH);
        rGrad.addColorStop(0, star.layer === 2 ? "#e8d5b0" : "#6ea0d0");
        rGrad.addColorStop(1, "transparent");
        ctx!.fillStyle = rGrad;

        // Wavy reflection
        for (let dy = 0; dy < refH; dy += 2) {
          const waveX = Math.sin(dy * 0.3 + t * 2) * 2;
          ctx!.fillRect(refX + waveX - 0.5, refY + dy, 1, 2);
        }
        ctx!.restore();
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ---------------------------------------------------------------------------
   VOYAGE HERO PAGE
   --------------------------------------------------------------------------- */

export default function VoyageHero() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030812]">
      <VoyageCanvas />

      {/* Content — positioned on the horizon */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="relative text-center max-w-5xl mx-auto" style={{ marginTop: "-5vh" }}>
          {/* Role */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={entered ? { opacity: 0.4, letterSpacing: "0.4em" } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-mono text-xs uppercase text-blue-200/60 mb-10"
          >
            Analytics Engineer
          </motion.p>

          {/* Name — each line rises from the horizon */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white/90"
                initial={{ y: "110%" }}
                animate={entered ? { y: "0%" } : {}}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Omer
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={entered ? { y: "0%" } : {}}
                transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="bg-gradient-to-r from-blue-200 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                  Zaman
                </span>
              </motion.span>
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 0.5, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-10 mx-auto max-w-md text-lg text-neutral-400 font-light"
          >
            {bio.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.3 }}
            className="mt-12 flex items-center justify-center gap-5"
          >
            <a
              href="#"
              className="group relative px-8 py-3 rounded-full text-sm font-medium text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/15 to-blue-500/15 border border-white/10 rounded-full backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">View my work</span>
            </a>
            <a
              href="#"
              className="px-8 py-3 rounded-full text-sm font-medium text-white/40 border border-white/8 hover:text-white/70 hover:border-white/15 transition-all duration-300"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={entered ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2.8 }}
            className="mt-16 flex items-center justify-center gap-6"
          >
            {[
              { href: links.github, icon: Github, label: "GitHub" },
              { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: links.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-white/15 hover:text-white/50 transition-colors duration-300"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 0.3 } : {}}
          transition={{ delay: 3.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 text-white/25" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
