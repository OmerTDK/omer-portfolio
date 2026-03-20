import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white/10">404</h1>
        <p className="mt-4 text-lg text-white/40">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
