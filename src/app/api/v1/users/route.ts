import { fail, ok } from "@/lib/api";
import { getSessionUser } from "@/lib/auth/session";
import { getUsers } from "@/lib/data";

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return fail("Unauthorized", 401);
  }

  return ok(getUsers());
}
