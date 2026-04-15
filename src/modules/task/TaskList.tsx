"use client";

import { useEffect, useState } from "react";

import type { Task } from "@/modules/task/types";
import { apiGet, apiPatch } from "@/services/apiClient";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    const data = await apiGet<Task[]>("/api/v1/tasks");
    setTasks(data);
  }

  useEffect(() => {
    loadTasks()
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, []);

  async function onStatusChange(id: string, status: Task["status"]) {
    try {
      await apiPatch(`/api/v1/tasks/${id}`, { status });
      await loadTasks();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to update task");
    }
  }

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="card">
      <h2>Tasks</h2>
      {error ? <p className="error">{error}</p> : null}
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className="row between">
            <span>
              <strong>{task.title}</strong> - {task.assignee} ({task.priority})
            </span>
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
    </div>
  );
}
