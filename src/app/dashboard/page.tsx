import Link from "next/link";
import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="stack">
      <div className="card">
        <h1>Dashboard</h1>
        <p>Welcome, {session.name}.</p>
        <p className="muted">Email: {session.email}</p>
        <p className="muted">Role: {session.role}</p>
      </div>

      <div className="row">
        <Link className="btn secondary" href="/users">
          Users
        </Link>
        <Link className="btn secondary" href="/projects">
          Projects
        </Link>
        <Link className="btn secondary" href="/tasks">
          Tasks
        </Link>
      </div>
    </section>
  );
}
