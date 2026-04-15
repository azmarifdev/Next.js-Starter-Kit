"use client";

import { useMemo, useState } from "react";

import { demoUsers } from "@/modules/demo/sample-data";

export function UserList() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return demoUsers.filter((user) => {
      const matchQuery = [user.name, user.email].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchRole = roleFilter === "all" ? true : user.role === roleFilter;
      return matchQuery && matchRole;
    });
  }, [query, roleFilter]);

  const stats = useMemo(() => {
    return {
      total: demoUsers.length,
      admins: demoUsers.filter((user) => user.role === "admin").length,
      regular: demoUsers.filter((user) => user.role === "user").length,
      showing: filteredUsers.length
    };
  }, [filteredUsers]);

  const hasFilters = query.trim().length > 0 || roleFilter !== "all";

  return (
    <div className="card stack">
      <div>
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">Users</h2>
        <p className="muted">Starter-friendly sample data with search and filtering.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="muted">Total</p>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Admin</p>
          <strong>{stats.admins}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">User</p>
          <strong>{stats.regular}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Showing</p>
          <strong>{stats.showing}</strong>
        </div>
      </div>

      <div className="toolbar sm:grid-cols-2">
        <input
          className="input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or email"
        />
        <select className="input" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="list-row stack" style={{ textAlign: "center" }}>
          <strong>No users found</strong>
          <p className="muted">Try changing your search or role filter.</p>
          {hasFilters ? (
            <button type="button" className="btn secondary" onClick={() => { setQuery(""); setRoleFilter("all"); }}>
              Clear filters
            </button>
          ) : null}
        </div>
      ) : (
        <ul className="list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="list-row flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="muted text-sm">{user.email}</p>
              </div>
              <span className="badge w-fit">{user.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
