"use client";

import { FormEvent, useEffect, useState } from "react";

import type { Project } from "@/modules/project/types";
import { apiDelete, apiGet, apiPost } from "@/services/apiClient";

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("Admin User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    const data = await apiGet<Project[]>("/api/v1/projects");
    setProjects(data);
  }

  useEffect(() => {
    loadProjects()
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Failed to load projects");
      })
      .finally(() => setLoading(false));
  }, []);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      await apiPost("/api/v1/projects", { name, owner });
      setName("");
      await loadProjects();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to create project");
    }
  }

  async function onDelete(id: string) {
    setError("");

    try {
      await apiDelete(`/api/v1/projects/${id}`);
      await loadProjects();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to delete project");
    }
  }

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="card">
      <h2>Projects</h2>
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
        <button className="btn" type="submit">Add</button>
      </form>
      {error ? <p className="error">{error}</p> : null}
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
