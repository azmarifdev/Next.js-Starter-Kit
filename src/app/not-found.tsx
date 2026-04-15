import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <section className="content-shell">
      <Card className="stack">
        <h1>Page not found</h1>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link href="/" className="btn" style={{ width: "fit-content" }}>
          Back to home
        </Link>
      </Card>
    </section>
  );
}
