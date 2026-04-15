import type { Project } from "@/modules/project/types";
import type { Task } from "@/modules/task/types";
import type { AppUser } from "@/modules/user/types";

let users: AppUser[] = [
  { id: "u_admin", name: "Admin User", email: "admin@example.com", role: "admin" },
  { id: "u_user", name: "Regular User", email: "user@example.com", role: "user" }
];

let projects: Project[] = [
  { id: "p1", name: "Landing Page", owner: "Admin User", status: "active" },
  { id: "p2", name: "Auth Screens", owner: "Regular User", status: "planning" }
];

let tasks: Task[] = [
  {
    id: "t1",
    title: "Set up project",
    assignee: "Admin User",
    priority: "high",
    status: "done"
  },
  {
    id: "t2",
    title: "Create API routes",
    assignee: "Regular User",
    priority: "medium",
    status: "in-progress"
  }
];

export function getUsers(): AppUser[] {
  return users;
}

export function getProjects(): Project[] {
  return projects;
}

export function addProject(name: string, owner: string): Project {
  const project: Project = {
    id: `p_${crypto.randomUUID()}`,
    name,
    owner,
    status: "planning"
  };

  projects = [project, ...projects];
  return project;
}

export function deleteProject(id: string): boolean {
  const next = projects.filter((project) => project.id !== id);
  const deleted = next.length !== projects.length;
  projects = next;
  return deleted;
}

export function getTasks(): Task[] {
  return tasks;
}

export function updateTaskStatus(id: string, status: Task["status"]): Task | null {
  let updated: Task | null = null;
  tasks = tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    updated = { ...task, status };
    return updated;
  });

  return updated;
}
