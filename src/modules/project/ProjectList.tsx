"use client";

import { FormEvent, useState } from "react";

import type { Project } from "@/modules/project/types";

const initialProjects: Project[] = [
  { id: "p1", name: "Starter Website", owner: "Admin User", status: "active" },
  { id: "p2", name: "Landing Refresh", owner: "Regular User", status: "planning" }
];

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("Admin User");

  function onCreate(event: FormEvent) {
    event.preventDefault();

    const nextProject: Project = {
      id: `p_${crypto.randomUUID()}`,
      name: name.trim(),
      owner: owner.trim(),
      status: "planning"
    };

    setProjects((current) => [nextProject, ...current]);
    setName("");
  }

  function onDelete(id: string) {
    setProjects((current) => current.filter((project) => project.id !== id));
  }

  return (
    <div className="card stack">
      <div>
        <h2>Projects</h2>
        <p className="muted">Local demo list to keep starter setup simple.</p>
      </div>
      <form onSubmit={onCreate} className="row">
        <input
          className="input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Project name"
          required
        />
        <input
          className="input"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          placeholder="Owner"
          required
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
      <ul className="list">
        {projects.map((project) => (
          <li key={project.id} className="row between">
            <span>
              <strong>{project.name}</strong> - {project.owner} ({project.status})
            </span>
            <button className="btn danger" onClick={() => onDelete(project.id)} type="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
