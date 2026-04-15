"use client";

import { useMemo } from "react";

import { demoUsers } from "@/modules/demo/sample-data";

export function UserList() {
  const users = useMemo(() => demoUsers, []);

  return (
    <div className="card">
      <h2>Users</h2>
      <p className="muted">Starter-friendly sample data (replace with your backend later).</p>
      <ul className="list">
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
