import Image from "next/image";

export function DemoPreviewSection() {
  return (
    <section id="demo" className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">Demo-ready from day one</h2>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--muted)" }}>
            Includes practical dashboard screens and demo credentials so anyone can experience the product flow in
            minutes.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="border-b px-4 py-3 text-sm font-medium"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              Dashboard
            </div>
            <Image
              src="/assets/dashboard-screenshot.png"
              alt="Dashboard screenshot"
              width={1400}
              height={800}
              className="h-auto w-full"
            />
          </article>

          <article
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="border-b px-4 py-3 text-sm font-medium"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              Login
            </div>
            <Image
              src="/assets/login-screenshot.png"
              alt="Login screenshot"
              width={1400}
              height={800}
              className="h-auto w-full"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
