import { redirect } from "next/navigation";

import { DemoBanner } from "@/components/shared/demo-banner";
import { getSessionUser } from "@/lib/auth";
import { demoProjects, demoTasks, demoUsers } from "@/modules/demo/sample-data";

export default async function DashboardPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="content-shell stack">
      <DemoBanner />

      <div className="card stack">
        <div>
          <h1>Welcome back, {session.name}</h1>
          <p className="muted">You are logged in and ready to start building.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="muted">Role</p>
            <strong>{session.role}</strong>
          </div>
          <div className="stat-card">
            <p className="muted">Email</p>
            <strong>{session.email}</strong>
          </div>
          <div className="stat-card">
            <p className="muted">Projects</p>
            <strong>{demoProjects.length}</strong>
          </div>
          <div className="stat-card">
            <p className="muted">Tasks</p>
            <strong>{demoTasks.length}</strong>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Sample Data Snapshot</h2>
        <p className="muted">
          Demo mode includes {demoUsers.length} users, {demoProjects.length} projects, and {demoTasks.length} tasks.
        </p>
      </div>
    </section>
  );
}
