import { ReactNode } from "react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title = "No data yet", description, action }: EmptyStateProps) {
  return (
    <div className="list-row stack" style={{ textAlign: "center" }}>
      <strong>{title}</strong>
      {description ? <p className="muted">{description}</p> : null}
      {action ?? null}
    </div>
  );
}
