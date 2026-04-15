export type Task = {
  id: string;
  title: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
};
