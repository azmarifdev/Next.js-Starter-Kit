import { cookies } from "next/headers";

import { fail, ok } from "@/lib/api";
import { findAuthUserByEmail } from "@/lib/auth/users";
import { AUTH_COOKIE_NAME, createSessionToken } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim().toLowerCase();
  const password = body?.password?.trim();

  if (!email || !password) {
    return fail("Email and password are required", 400);
  }

  const user = await findAuthUserByEmail(email);

  if (!user || user.password !== password) {
    return fail("Invalid email or password", 401);
  }

  const token = createSessionToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  return ok({ id: user.id, name: user.name, email: user.email, role: user.role });
}
