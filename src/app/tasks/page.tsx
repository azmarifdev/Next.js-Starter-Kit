import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth";
import { TaskList } from "@/modules/task/TaskList";

export default async function TasksPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="content-shell">
      <TaskList />
    </section>
  );
}
