import { cookies } from "next/headers";
import { createHmac } from "node:crypto";

import { getDb } from "@/lib/db";
import { env } from "@/lib/env";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type SessionUser = Omit<AuthUser, "password">;

type SessionPayload = SessionUser & {
  exp: number;
};

export const AUTH_COOKIE_NAME = "auth_token";

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

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function sign(value: string): string {
  return createHmac("sha256", env.sessionSecret).update(value).digest("base64url");
}

// Generate a signed, short-lived session token stored in an httpOnly cookie.
export function createSessionToken(user: SessionUser): string {
  const payload: SessionPayload = {
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 24
  };
  const encoded = toBase64Url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

function verifySessionToken(token: string | undefined): SessionUser | null {
  if (!token) {
    return null;
  }

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || sign(encoded) !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encoded)) as SessionPayload;

    if (Date.now() > payload.exp) {
      return null;
    }

    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role === "admin" ? "admin" : "user"
    };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(AUTH_COOKIE_NAME)?.value);
}

// Lookup demo users in memory, or MongoDB when configured.
export async function findUserByEmail(email: string): Promise<AuthUser | null> {
  const normalizedEmail = email.toLowerCase();
  const db = await getDb();

  if (!db) {
    return localUsers.find((user) => user.email === normalizedEmail) ?? null;
  }

  return db.collection<AuthUser>("auth_users").findOne({ email: normalizedEmail });
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  const normalizedEmail = input.email.toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const created: AuthUser = {
    id: `u_${crypto.randomUUID()}`,
    name: input.name,
    email: normalizedEmail,
    password: input.password,
    role: "user"
  };

  const db = await getDb();

  if (!db) {
    localUsers = [created, ...localUsers];
    return created;
  }

  await db.collection<AuthUser>("auth_users").insertOne(created);
  return created;
}
