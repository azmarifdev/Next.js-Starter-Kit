import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { apiSuccess } from "@/lib/api-error";

// Clear session cookie to log out current user.
export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0)
  });

  return apiSuccess({ loggedOut: true });
}
