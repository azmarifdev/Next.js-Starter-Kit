"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="content-shell">
      <Card className="stack">
        <h1>Something went wrong</h1>
        <p className="muted">We could not load this page. Please try again.</p>
        <Button type="button" onClick={reset}>
          Try again
        </Button>
      </Card>
    </section>
  );
}
