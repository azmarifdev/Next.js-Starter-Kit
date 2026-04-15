import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <h1>Next.js Minimal Starter Template</h1>
      <p>
        A beginner-friendly starter with simple custom auth, REST API routes, and four core modules:
        auth, user, project, and task.
      </p>
      <div className="row">
        <Link className="btn" href="/login">
          Get Started
        </Link>
        <Link className="btn secondary" href="/dashboard">
          Open Dashboard
        </Link>
      </div>
    </section>
  );
}
