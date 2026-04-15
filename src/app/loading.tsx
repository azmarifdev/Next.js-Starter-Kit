export default function Loading() {
  return (
    <section className="content-shell">
      <div className="card" style={{ display: "grid", placeItems: "center", minHeight: "220px", gap: "12px" }}>
        <div
          aria-label="Loading"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "999px",
            border: "3px solid var(--border)",
            borderTopColor: "var(--primary)",
            animation: "spin 0.8s linear infinite"
          }}
        />
        <p className="muted">Loading...</p>
      </div>
    </section>
  );
}
