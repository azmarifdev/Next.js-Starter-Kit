export type Project = {
  id: string;
  name: string;
  owner: string;
  status: "planning" | "active" | "completed";
};
