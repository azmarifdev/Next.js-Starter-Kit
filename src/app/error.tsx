"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="content-shell">
      <Card className="stack">
        <h1>Something went wrong</h1>
        <p className="muted">We could not load this page right now. Please try again.</p>
        <div className="row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Link href="/" className="btn secondary">
            Go home
          </Link>
        </div>
      </Card>
    </section>
  );
}
