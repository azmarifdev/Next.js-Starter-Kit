import Link from "next/link";
import { redirect } from "next/navigation";

import { DemoBanner } from "@/components/common/demo-banner";
import { getSessionUser } from "@/lib/auth";
import { demoProjects, demoTasks, demoUsers } from "@/modules/demo/sample-data";

export default async function DashboardPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="stack">
      <DemoBanner />

      <div className="card">
        <h1>Dashboard</h1>
        <p>Welcome, {session.name}.</p>
        <p className="muted">Email: {session.email}</p>
        <p className="muted">Role: {session.role}</p>
      </div>

      <div className="card">
        <h2>Sample Data Snapshot</h2>
        <p className="muted">
          Demo mode includes {demoUsers.length} users, {demoProjects.length} projects, and {demoTasks.length} tasks.
        </p>
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
