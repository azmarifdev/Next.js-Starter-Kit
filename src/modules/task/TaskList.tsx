"use client";

import { useMemo, useState } from "react";

import { useToast } from "@/components/common/toast";
import { demoTasks } from "@/modules/demo/sample-data";
import type { Task } from "@/modules/task/types";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { showToast } = useToast();

  function onStatusChange(id: string, status: Task["status"]) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return { ...task, status };
      })
    );

    showToast("Task status updated", "success");
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchQuery = [task.title, task.assignee].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" ? true : task.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [tasks, query, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      progress: tasks.filter((task) => task.status === "in-progress").length,
      done: tasks.filter((task) => task.status === "done").length
    };
  }, [tasks]);

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
        <input
          className="input"
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
        <div className="list-row stack" style={{ textAlign: "center" }}>
          <strong>No tasks yet</strong>
          <p className="muted">Create tasks or clear filters to view data.</p>
          {hasFilters ? (
            <button type="button" className="btn secondary" onClick={() => { setQuery(""); setStatusFilter("all"); }}>
              Clear filters
            </button>
          ) : null}
        </div>
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
