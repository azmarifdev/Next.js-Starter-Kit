import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth/session";
import { ProjectList } from "@/modules/project/ProjectList";

export default async function ProjectsPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return <ProjectList />;
}
