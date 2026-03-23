import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-neutral-950">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-neutral-500">404</p>
        <h1 className="mt-4 text-4xl font-bold text-neutral-100">Page not found</h1>
        <p className="mt-4 text-neutral-400">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-neutral-100 px-8 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
