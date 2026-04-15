const year = new Date().getFullYear();

export function FooterSection() {
  return (
    <footer className="border-t px-4 py-8 sm:px-6" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-sm sm:flex-row" style={{ color: "var(--muted)" }}>
        <p>© {year} Next.js Starter-Kit. Built by A. Z. M. Arif.</p>
        <div className="row">
          <a href="https://azmarif.dev" target="_blank" rel="noreferrer" className="no-underline" style={{ color: "var(--text)" }}>
            azmarif.dev
          </a>
          <a href="https://github.com/azmarifdev" target="_blank" rel="noreferrer" className="no-underline" style={{ color: "var(--text)" }}>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
