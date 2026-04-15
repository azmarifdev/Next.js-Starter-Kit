import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--hero-glow),_transparent_55%)]" />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p
          className="mb-4 rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-[0.12em]"
          style={{ borderColor: "var(--border)", background: "var(--surface-soft)", color: "var(--muted)" }}
        >
          Next.js Starter-Kit
        </p>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Next.js Starter-Kit
        </h1>

        <p className="mt-5 max-w-2xl text-base sm:text-lg" style={{ color: "var(--muted)" }}>
          A clean, developer-focused and scalable Next.js starter with practical defaults for authentication, API routes,
          UI states, and maintainable architecture.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className="btn rounded-xl px-5 py-3 text-sm font-semibold text-black no-underline">
            Get Started
          </Link>
          <a
            href="https://github.com/azmarifdev/Next.js-Starter-Kit"
            target="_blank"
            rel="noreferrer"
            className="btn secondary rounded-xl px-5 py-3 text-sm font-semibold no-underline"
          >
            View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
