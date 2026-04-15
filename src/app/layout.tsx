import "@/styles/globals.css";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { LogoutButton } from "@/components/common/logout-button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { ToastProvider } from "@/components/common/toast";
import { getSessionUser } from "@/lib/auth";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: env.appName,
  description: "A clean, developer-focused and scalable Next.js Starter-Kit by A. Z. M. Arif"
};

const themeInitScript = `
  (function () {
    try {
      var saved = localStorage.getItem("theme");
      var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var theme = saved === "light" || saved === "dark" ? saved : system;
      document.documentElement.setAttribute("data-theme", theme);
    } catch (_error) {}
  })();
`;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getSessionUser();
  const githubRepoUrl = "https://github.com/azmarifdev/Next.js-Starter-Kit";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <ToastProvider>
          <header
            className="sticky top-0 z-50 border-b backdrop-blur-xl"
            style={{ borderColor: "var(--border)", background: "var(--header-bg)" }}
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-semibold no-underline"
                style={{ color: "var(--text)" }}
              >
                <Image src="/assets/nextjs-mark.svg" alt="azmarifdev logo" width={28} height={28} />
                <span className="hidden text-sm tracking-tight sm:inline">{env.appName}</span>
              </Link>

              <nav
                className="hidden items-center gap-5 rounded-full border px-4 py-2 text-sm lg:flex"
                style={{ borderColor: "var(--border)", background: "var(--header-pill)", color: "var(--header-link)" }}
              >
                <Link className="transition no-underline hover:opacity-90" href="/#features">
                  Features
                </Link>
                <a className="transition no-underline hover:opacity-90" href={githubRepoUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <Link className="transition no-underline hover:opacity-90" href="/marketing">
                  Docs
                </Link>
              </nav>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                {session ? (
                  <>
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
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </header>

          <main className="w-full">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
