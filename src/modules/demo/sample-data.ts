import type { Project } from "@/modules/project/types";
import type { Task } from "@/modules/task/types";
import type { AppUser } from "@/modules/user/types";

export const demoUsers: AppUser[] = [
  { id: "u_admin", name: "Admin User", email: "admin@example.com", role: "admin" },
  { id: "u_user", name: "Regular User", email: "user@example.com", role: "user" }
];

export const demoProjects: Project[] = [
  { id: "p1", name: "Starter Website", owner: "Admin User", status: "active" },
  { id: "p2", name: "Landing Refresh", owner: "Regular User", status: "planning" }
];

export const demoTasks: Task[] = [
  {
    id: "t1",
    title: "Set up authentication",
    assignee: "Admin User",
    priority: "high",
    status: "done"
  },
  {
    id: "t2",
    title: "Polish landing page",
    assignee: "Regular User",
    priority: "medium",
    status: "in-progress"
  }
];
