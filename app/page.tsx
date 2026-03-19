import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">Omer Zaman</h1>
        <p className="mt-4 text-white/40">Choose a design direction</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link
            href="/paths"
            className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-white/20 hover:bg-white/10"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-white/40">Version A</div>
            <h2 className="mt-2 text-xl font-bold text-white">Background Paths</h2>
            <p className="mt-2 text-sm text-white/40">Clean, elegant, Apple-like. Flowing SVG curves with bold typography.</p>
            <div className="mt-4 text-sm font-medium text-white/60 group-hover:text-white transition-colors">View →</div>
          </Link>

          <Link
            href="/reuno"
            className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-cyan-400/30 hover:bg-white/10"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400/60">Version B</div>
            <h2 className="mt-2 text-xl font-bold text-white">Mesh Gradient</h2>
            <p className="mt-2 text-sm text-white/40">Dark, immersive, dynamic. Living shader background with glass UI.</p>
            <div className="mt-4 text-sm font-medium text-cyan-400/60 group-hover:text-cyan-400 transition-colors">View →</div>
          </Link>

          <Link
            href="/frost"
            className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-blue-400/30 hover:bg-white/10"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400/60">Version C</div>
            <h2 className="mt-2 text-xl font-bold text-white">Frosted Glass</h2>
            <p className="mt-2 text-sm text-white/40">Light, premium, macOS-inspired. Mesh gradient with frosted glass cards.</p>
            <div className="mt-4 text-sm font-medium text-blue-400/60 group-hover:text-blue-400 transition-colors">View →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
