export function DeveloperExperienceSection() {
  const points = [
    "5-minute onboarding with setup + seed commands.",
    "Opinionated defaults without unnecessary complexity.",
    "Clear module boundaries for fast team collaboration.",
    "Demo-friendly UI you can show to clients immediately."
  ];

  return (
    <section id="docs" className="px-4 py-14 sm:px-6">
      <div
        className="mx-auto grid max-w-6xl gap-8 rounded-3xl border p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "0 8px 24px var(--ring)" }}
      >
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">Built to impress, easy to maintain</h2>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--muted)" }}>
            This Starter Kit gives you production-like behavior with beginner-friendly clarity, so you can build fast
            and still keep the codebase clean.
          </p>
        </div>

        <ul className="space-y-3 text-sm" style={{ color: "var(--text)" }}>
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 rounded-xl border px-4 py-3"
              style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}
            >
              <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--primary)" }} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
