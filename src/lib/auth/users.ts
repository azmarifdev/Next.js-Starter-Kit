import { getMongoDb } from "@/lib/db/providers/mongo";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

let localUsers: AuthUser[] = [
  {
    id: "u_admin",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: "u_user",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user"
  }
];

export async function findAuthUserByEmail(email: string): Promise<AuthUser | null> {
  const normalizedEmail = email.toLowerCase();
  const db = await getMongoDb();

  if (!db) {
    return localUsers.find((user) => user.email === normalizedEmail) ?? null;
  }

  return db.collection<AuthUser>("auth_users").findOne({ email: normalizedEmail });
}

export async function createAuthUser(input: Omit<AuthUser, "id" | "role">): Promise<AuthUser> {
  const normalizedEmail = input.email.toLowerCase();
  const existing = await findAuthUserByEmail(normalizedEmail);
  if (existing) {
    throw new Error("Email already exists");
  }

  const created: AuthUser = {
    id: `u_${crypto.randomUUID()}`,
    name: input.name,
    email: normalizedEmail,
    password: input.password,
    role: "user"
  };

  const db = await getMongoDb();
  if (!db) {
    localUsers = [created, ...localUsers];
    return created;
  }

  await db.collection<AuthUser>("auth_users").insertOne(created);
  return created;
}
