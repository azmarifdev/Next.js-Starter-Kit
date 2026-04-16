import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <section className="content-shell">
      <Card className="stack">
        <h1>Page not found</h1>
        <p className="muted">The page you requested does not exist or may have been moved.</p>
        <div className="row">
          <Link href="/" className="btn" style={{ width: "fit-content" }}>
            Back to home
          </Link>
          <Link href="/dashboard" className="btn secondary" style={{ width: "fit-content" }}>
            Open dashboard
          </Link>
        </div>
      </Card>
    </section>
  );
}
