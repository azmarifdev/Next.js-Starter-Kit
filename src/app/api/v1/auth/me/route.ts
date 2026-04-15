import { getSessionUser } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-error";

// Return current authenticated user from session cookie.
export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return apiError("Unauthorized", { status: 401, code: "UNAUTHORIZED" });
  }

  return apiSuccess(user);
}
