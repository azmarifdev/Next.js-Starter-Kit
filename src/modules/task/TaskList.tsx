"use client";

import { useState } from "react";

import type { Task } from "@/modules/task/types";

const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Set up authentication",
    assignee: "Admin User",
    priority: "high",
    status: "done"
  },
  {
    id: "t2",
    title: "Polish landing page",
    assignee: "Regular User",
    priority: "medium",
    status: "in-progress"
  }
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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
