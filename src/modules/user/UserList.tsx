"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { demoUsers } from "@/modules/demo/sample-data";
import { filterUsers, getUserStats } from "@/modules/user/service";

export function UserList() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => filterUsers(demoUsers, query, roleFilter), [query, roleFilter]);
  const stats = useMemo(() => getUserStats(demoUsers, filteredUsers.length), [filteredUsers.length]);
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
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email" />
        <select className="input" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          description="Try changing your search or role filter."
          action={
            hasFilters ? (
              <Button type="button" variant="secondary" onClick={() => { setQuery(""); setRoleFilter("all"); }}>
                Clear filters
              </Button>
            ) : null
          }
        />
      ) : (
        <ul className="list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="list-row flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="muted text-sm">{user.email}</p>
              </div>
              <Badge className="w-fit">{user.role}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
