"use client";

import { FormEvent, useMemo, useState } from "react";

import { useToast } from "@/components/common/toast";
import { demoProjects } from "@/modules/demo/sample-data";
import type { Project } from "@/modules/project/types";

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("Admin User");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { showToast } = useToast();

  function onCreate(event: FormEvent) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedOwner = owner.trim();

    if (!trimmedName || !trimmedOwner) {
      showToast("Project name and owner are required", "error");
      return;
    }

    const nextProject: Project = {
      id: `p_${crypto.randomUUID()}`,
      name: trimmedName,
      owner: trimmedOwner,
      status: "planning"
    };

    setProjects((current) => [nextProject, ...current]);
    setName("");
    showToast("Project added", "success");
  }

  function onDelete(id: string) {
    setProjects((current) => current.filter((project) => project.id !== id));
    showToast("Project deleted", "info");
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchQuery = [project.name, project.owner].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" ? true : project.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [projects, query, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter((project) => project.status === "active").length,
      planning: projects.filter((project) => project.status === "planning").length,
      showing: filteredProjects.length
    };
  }, [projects, filteredProjects]);

  const hasFilters = query.trim().length > 0 || statusFilter !== "all";

  return (
    <div className="card stack">
      <div>
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">Projects</h2>
        <p className="muted">Manage sample projects with quick filtering.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="muted">Total</p>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Active</p>
          <strong>{stats.active}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Planning</p>
          <strong>{stats.planning}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Showing</p>
          <strong>{stats.showing}</strong>
        </div>
      </div>

      <form onSubmit={onCreate} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
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
        <button className="btn sm:min-w-[92px]" type="submit">
          Add
        </button>
      </form>

      <div className="toolbar sm:grid-cols-2">
        <input
          className="input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by project or owner"
        />
        <select className="input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="planning">Planning</option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="list-row stack" style={{ textAlign: "center" }}>
          <strong>No projects yet</strong>
          <p className="muted">Create your first project or clear filters.</p>
          {hasFilters ? (
            <button type="button" className="btn secondary" onClick={() => { setQuery(""); setStatusFilter("all"); }}>
              Clear filters
            </button>
          ) : null}
        </div>
      ) : (
        <ul className="list">
          {filteredProjects.map((project) => (
            <li key={project.id} className="list-row flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{project.name}</p>
                <p className="muted text-sm">{project.owner}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="badge">{project.status}</span>
                <button className="btn danger" onClick={() => onDelete(project.id)} type="button">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
