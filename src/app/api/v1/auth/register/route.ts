import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, createSessionToken, createUser } from "@/lib/auth";

// Register a new user and immediately sign them in.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { name?: string; email?: string; password?: string }
    | null;

  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password?.trim();

  if (!name || !email || !password) {
    return NextResponse.json(
      { success: false, message: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await createUser({ name, email, password });

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

    return NextResponse.json(
      {
        success: true,
        data: { id: user.id, name: user.name, email: user.email, role: user.role }
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Registration failed" },
      { status: 409 }
    );
  }
}
