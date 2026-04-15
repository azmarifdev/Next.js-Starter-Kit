const features = [
  {
    title: "Authentication + Route Guard",
    description: "Login, register, session cookie, and private route protection included by default.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3" />
      </svg>
    )
  },
  {
    title: "Modular Architecture",
    description: "Feature-first structure that stays readable as your codebase grows.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7.5 12 3l9 4.5-9 4.5L3 7.5Z" />
        <path d="M3 12l9 4.5 9-4.5" />
        <path d="M3 16.5 12 21l9-4.5" />
      </svg>
    )
  },
  {
    title: "API + Error Standardization",
    description: "Consistent API success/error shape and cleaner client-side error handling.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 7h10M7 12h10M7 17h10" />
        <rect x="3" y="4" width="18" height="16" rx="2" />
      </svg>
    )
  },
  {
    title: "Polished UX Defaults",
    description: "Loading, error, empty states, toast notifications, and theme toggle ready to use.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Minimal by design, complete in workflow</h2>
          <p className="mt-3" style={{ color: "var(--muted)" }}>
            The essentials you need for real projects, without enterprise complexity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "0 8px 24px var(--ring)" }}
            >
              <div
                className="mb-4 inline-flex rounded-lg border p-2"
                style={{
                  borderColor: "color-mix(in srgb, var(--primary) 40%, var(--border) 60%)",
                  color: "var(--primary)",
                  background: "color-mix(in srgb, var(--primary) 12%, var(--surface) 88%)"
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
