"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme = getPreferredTheme();
    document.documentElement.setAttribute("data-theme", initialTheme);
    setTheme(initialTheme);
  }, []);

  function onToggle() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6M18.8 18.8l-1.6-1.6M6.8 6.8 5.2 5.2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7.2 7.2 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
