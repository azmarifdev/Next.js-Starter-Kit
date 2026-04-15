import { cookies } from "next/headers";
import { createHmac } from "node:crypto";

import { env } from "@/lib/env";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type SessionPayload = SessionUser & {
  exp: number;
};

export const AUTH_COOKIE_NAME = "auth_token";

function toBase64Url(input: string): string {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function sign(data: string): string {
  return createHmac("sha256", env.sessionSecret).update(data).digest("base64url");
}

export function createSessionToken(user: SessionUser): string {
  const payload: SessionPayload = {
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 24
  };
  const encoded = toBase64Url(JSON.stringify(payload));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string | undefined): SessionUser | null {
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
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
