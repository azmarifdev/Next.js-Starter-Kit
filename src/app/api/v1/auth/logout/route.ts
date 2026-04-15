import { cookies } from "next/headers";

import { ok } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0)
  });

  return ok({ loggedOut: true });
}
