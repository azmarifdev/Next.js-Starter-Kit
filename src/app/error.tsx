"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="content-shell">
      <div className="card stack">
        <h1>Something went wrong</h1>
        <p className="muted">We could not load this page. Please try again.</p>
        <button type="button" className="btn" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}
