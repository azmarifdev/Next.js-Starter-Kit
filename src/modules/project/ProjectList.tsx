"use client";

import { FormEvent, useMemo, useState } from "react";

import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { demoProjects } from "@/modules/demo/sample-data";
import { createProject, filterProjects, getProjectStats } from "@/modules/project/service";
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

    const nextProject = createProject(trimmedName, trimmedOwner);

    setProjects((current) => [nextProject, ...current]);
    setName("");
    showToast("Project added", "success");
  }

  function onDelete(id: string) {
    setProjects((current) => current.filter((project) => project.id !== id));
    showToast("Project deleted", "info");
  }

  const filteredProjects = useMemo(() => filterProjects(projects, query, statusFilter), [projects, query, statusFilter]);
  const stats = useMemo(() => getProjectStats(projects, filteredProjects.length), [projects, filteredProjects.length]);
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
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Project name" required />
        <Input value={owner} onChange={(event) => setOwner(event.target.value)} placeholder="Owner" required />
        <Button className="sm:min-w-[92px]" type="submit">
          Add
        </Button>
      </form>

      <div className="toolbar sm:grid-cols-2">
        <Input
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
        <EmptyState
          description="Create your first project or clear filters."
          action={
            hasFilters ? (
              <Button type="button" variant="secondary" onClick={() => { setQuery(""); setStatusFilter("all"); }}>
                Clear filters
              </Button>
            ) : null
          }
        />
      ) : (
        <ul className="list">
          {filteredProjects.map((project) => (
            <li key={project.id} className="list-row flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{project.name}</p>
                <p className="muted text-sm">{project.owner}</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge>{project.status}</Badge>
                <Button variant="danger" onClick={() => onDelete(project.id)} type="button">
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
