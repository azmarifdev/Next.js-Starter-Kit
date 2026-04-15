import Link from "next/link";

export default function NotFound() {
  return (
    <section className="content-shell">
      <div className="card stack">
        <h1>Page not found</h1>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link href="/" className="btn" style={{ width: "fit-content" }}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
