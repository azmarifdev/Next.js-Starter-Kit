export function DeveloperExperienceSection() {
  const points = [
    "5-minute onboarding with setup + seed commands.",
    "Opinionated defaults without unnecessary complexity.",
    "Clear module boundaries for fast team collaboration.",
    "Naming aligned for future kits: azmarifdev-starter, azmarifdev-advanced, azmarifdev-saas."
  ];

  return (
    <section id="docs" className="px-4 py-14 sm:px-6">
      <div
        className="mx-auto grid max-w-6xl gap-8 rounded-3xl border p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "0 8px 24px var(--ring)" }}
      >
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">Built for developers, branded for growth</h2>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--muted)" }}>
            This starter kit reflects A. Z. M. Arif's engineering style: clean architecture, practical defaults, and
            documentation-first developer experience.
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
