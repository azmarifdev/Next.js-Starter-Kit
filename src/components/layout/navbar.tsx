import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/components/shared/logout-button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import type { SessionUser } from "@/lib/auth";
import { env } from "@/lib/env";

type NavbarProps = {
  session: SessionUser | null;
};

const navLinks = [
  { href: "/dashboard", label: "Dashboard", protected: true },
  { href: "/projects", label: "Projects", protected: true },
  { href: "/tasks", label: "Tasks", protected: true },
  { href: "/users", label: "Users", protected: true },
  { href: "/marketing", label: "Docs", protected: false }
] as const;

export function Navbar({ session }: NavbarProps) {
  const visibleLinks = navLinks.filter((link) => (link.protected ? Boolean(session) : true));

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--border)", background: "var(--header-bg)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold no-underline" style={{ color: "var(--text)" }}>
          <Image src="/assets/nextjs-mark.svg" alt="Next.js Starter-Kit logo" width={28} height={28} />
          <span className="hidden text-sm tracking-tight sm:inline">{env.appName}</span>
        </Link>

        <nav
          className="hidden items-center gap-5 rounded-full border px-4 py-2 text-sm lg:flex"
          style={{ borderColor: "var(--border)", background: "var(--header-pill)", color: "var(--header-link)" }}
        >
          {visibleLinks.map((link) => (
            <Link key={link.href} className="transition no-underline hover:opacity-90" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session ? (
            <>
              <span className="hidden rounded-full border px-3 py-1 text-xs font-medium sm:inline-flex" style={{ borderColor: "var(--border)", background: "var(--header-pill)", color: "var(--muted)" }}>
                {session.email}
              </span>
              <Link href="/dashboard" className="btn secondary px-3.5 py-2 text-sm font-semibold no-underline">
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="btn secondary px-3.5 py-2 text-sm font-semibold no-underline">
                Login
              </Link>
              <Link href="/register" className="btn px-3.5 py-2 text-sm font-semibold text-black no-underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
