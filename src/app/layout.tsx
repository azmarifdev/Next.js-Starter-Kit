import "@/styles/globals.css";

import type { Metadata } from "next";
import { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import { getSessionUser } from "@/lib/auth";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: env.appName,
  description: "A clean, minimal and production-like Next.js starter kit"
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ToastProvider>
          <Navbar session={session} />
          <main className="w-full">{children}</main>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
