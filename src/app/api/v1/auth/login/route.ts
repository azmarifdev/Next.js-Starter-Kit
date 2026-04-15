import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, createSessionToken, findUserByEmail } from "@/lib/auth";

// Log in an existing user and issue an auth cookie.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email?.trim().toLowerCase();
  const password = body?.password?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
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

  return NextResponse.json({
    success: true,
    data: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}
