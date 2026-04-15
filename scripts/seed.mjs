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
const users = db.collection("auth_users");

await users.updateOne(
  { email: "admin@example.com" },
  {
    $setOnInsert: {
      id: "u_admin",
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin"
    }
  },
  { upsert: true }
);

await users.updateOne(
  { email: "user@example.com" },
  {
    $setOnInsert: {
      id: "u_user",
      name: "Regular User",
      email: "user@example.com",
      password: "user123",
      role: "user"
    }
  },
  { upsert: true }
);

await client.close();

console.log("Seed complete: auth_users demo credentials inserted.");
