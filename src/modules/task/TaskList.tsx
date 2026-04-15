"use client";

import { useState } from "react";

import { demoTasks } from "@/modules/demo/sample-data";
import type { Task } from "@/modules/task/types";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);

  function onStatusChange(id: string, status: Task["status"]) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return { ...task, status };
      })
    );
  }

  return (
    <div className="card stack">
      <div>
        <h2>Tasks</h2>
        <p className="muted">Local demo tasks for quick onboarding.</p>
      </div>
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
