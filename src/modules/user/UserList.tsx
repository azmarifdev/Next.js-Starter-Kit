"use client";

import { useMemo } from "react";

import type { AppUser } from "@/modules/user/types";

const demoUsers: AppUser[] = [
  { id: "u_admin", name: "Admin User", email: "admin@example.com", role: "admin" },
  { id: "u_user", name: "Regular User", email: "user@example.com", role: "user" }
];

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
