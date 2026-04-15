import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth/session";
import { TaskList } from "@/modules/task/TaskList";

export default async function TasksPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return <TaskList />;
}
