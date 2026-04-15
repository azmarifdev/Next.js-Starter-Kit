const year = new Date().getFullYear();

export function FooterSection() {
  return (
    <footer className="border-t px-4 py-8 sm:px-6" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-sm sm:flex-row" style={{ color: "var(--muted)" }}>
        <p>© {year} Next.js Starter Kit. All rights reserved.</p>
        <a
          href="https://github.com/your-username/nextjs-starter-kit"
          target="_blank"
          rel="noreferrer"
          className="no-underline"
          style={{ color: "var(--text)" }}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
