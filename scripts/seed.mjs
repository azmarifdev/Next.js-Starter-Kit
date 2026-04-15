import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "nextjs_starter_template";

if (!uri) {
  console.log("Skipped seed: MONGODB_URI is not set.");
  process.exit(0);
}

const client = new MongoClient(uri);
await client.connect();

const db = client.db(dbName);
const authUsers = db.collection("auth_users");
const users = db.collection("users");
const projects = db.collection("projects");
const tasks = db.collection("tasks");

const now = new Date();

await authUsers.updateOne(
  { email: "admin@example.com" },
  {
    $setOnInsert: {
      id: "u_admin",
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      createdAt: now
    }
  },
  { upsert: true }
);

await authUsers.updateOne(
  { email: "user@example.com" },
  {
    $setOnInsert: {
      id: "u_user",
      name: "Regular User",
      email: "user@example.com",
      password: "user123",
      role: "user",
      createdAt: now
    }
  },
  { upsert: true }
);

await users.updateOne(
  { id: "u_admin" },
  { $setOnInsert: { id: "u_admin", name: "Admin User", role: "admin", createdAt: now } },
  { upsert: true }
);

await users.updateOne(
  { id: "u_user" },
  { $setOnInsert: { id: "u_user", name: "Regular User", role: "user", createdAt: now } },
  { upsert: true }
);

await projects.updateOne(
  { id: "p_starter" },
  {
    $setOnInsert: {
      id: "p_starter",
      name: "Starter Website",
      owner: "Admin User",
      status: "active",
      createdAt: now
    }
  },
  { upsert: true }
);

await tasks.updateOne(
  { id: "t_setup" },
  {
    $setOnInsert: {
      id: "t_setup",
      title: "Set up project",
      assignee: "Admin User",
      priority: "high",
      status: "done",
      createdAt: now
    }
  },
  { upsert: true }
);

await client.close();

console.log("Seed complete.");
console.log("Auth users: admin@example.com/admin123, user@example.com/user123");
console.log("Sample collections: users, projects, tasks");
