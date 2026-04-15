import "@/styles/globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: env.appName,
  description: "Minimal Next.js starter template"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container row between">
            <Link href="/" className="brand">
              {env.appName}
            </Link>
            <nav className="row nav">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/users">Users</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/tasks">Tasks</Link>
              <Link href="/login">Login</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
