import { cookies } from "next/headers";

import { fail, ok } from "@/lib/api";
import { AUTH_COOKIE_NAME, createSessionToken } from "@/lib/auth/session";
import { createAuthUser } from "@/lib/auth/users";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { name?: string; email?: string; password?: string }
    | null;

  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password?.trim();

  if (!name || !email || !password) {
    return fail("Name, email, and password are required", 400);
  }

  try {
    const created = await createAuthUser({ name, email, password });

    const token = createSessionToken({
      id: created.id,
      name: created.name,
      email: created.email,
      role: created.role
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24
    });

    return ok({ id: created.id, name: created.name, email: created.email, role: created.role }, 201);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Registration failed", 409);
  }
}
