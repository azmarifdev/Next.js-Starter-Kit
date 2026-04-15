"use client";

import { useEffect, useState } from "react";

import type { AppUser } from "@/modules/user/types";
import { apiGet } from "@/services/apiClient";

export function UserList() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<AppUser[]>("/api/v1/users")
      .then(setUsers)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Failed to load users");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="card">
      <h2>Users</h2>
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
