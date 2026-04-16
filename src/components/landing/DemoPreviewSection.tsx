export function DemoPreviewSection() {
  return (
    <section id="demo" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-2xl border p-6 sm:p-7" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <h2 className="text-2xl font-semibold sm:text-3xl">Try the demo in under a minute</h2>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--muted)" }}>
            Use a pre-seeded account to quickly explore the product flow from login to dashboard, projects, tasks, and users.
          </p>

          <div className="mt-5 rounded-xl border p-4 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}>
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-1 muted">Admin: admin@example.com / admin123</p>
            <p className="muted">User: user@example.com / user123</p>
          </div>
        </article>
      </div>
    </section>
  );
}
