"use client";

import { useMemo, useState } from "react";

import { useToast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { demoTasks } from "@/modules/demo/sample-data";
import { filterTasks, getTaskStats, updateTaskStatus } from "@/modules/task/service";
import type { Task } from "@/modules/task/types";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { showToast } = useToast();

  function onStatusChange(id: string, status: Task["status"]) {
    setTasks((current) => updateTaskStatus(current, id, status));
    showToast("Task status updated", "success");
  }

  const filteredTasks = useMemo(() => filterTasks(tasks, query, statusFilter), [tasks, query, statusFilter]);
  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const hasFilters = query.trim().length > 0 || statusFilter !== "all";

  return (
    <div className="card stack">
      <div>
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">Tasks</h2>
        <p className="muted">Track task status with searchable demo data.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="muted">Total</p>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Todo</p>
          <strong>{stats.todo}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">In Progress</p>
          <strong>{stats.progress}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Done</p>
          <strong>{stats.done}</strong>
        </div>
      </div>

      <div className="toolbar sm:grid-cols-2">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by task title or assignee"
        />
        <select className="input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          description="Create tasks or clear filters to view data."
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
          {filteredTasks.map((task) => (
            <li key={task.id} className="list-row flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="muted text-sm">
                  {task.assignee} · <span className="uppercase">{task.priority}</span>
                </p>
              </div>

              <select
                className="input status"
                value={task.status}
                onChange={(event) => onStatusChange(task.id, event.target.value as Task["status"])}
              >
                <option value="todo">todo</option>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
