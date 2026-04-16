"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoutButton } from "@/components/shared/logout-button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import type { SessionUser } from "@/lib/auth";
import { env } from "@/lib/env";

type NavbarProps = {
  session: SessionUser | null;
};

const privateNavLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/tasks", label: "Tasks" },
  { href: "/users", label: "Users" }
] as const;

const publicNavLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" }
] as const;

function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--border)", background: "var(--header-bg)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 font-semibold no-underline" style={{ color: "var(--text)" }}>
            <Image src="/assets/nextjs-mark.svg" alt="Next.js Starter-Kit logo" width={28} height={28} />
            <span className="hidden text-sm tracking-tight sm:inline">{env.appName}</span>
          </Link>
        </div>

        <nav className="nav-group flex" aria-label="Main navigation">
          {(session ? privateNavLinks : publicNavLinks).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActiveLink(pathname, link.href) ? "active" : ""}`.trim()}
              aria-current={isActiveLink(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <ThemeToggle />
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
