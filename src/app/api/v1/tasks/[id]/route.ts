import { fail, ok } from "@/lib/api";
import { getSessionUser } from "@/lib/auth/session";
import { updateTaskStatus } from "@/lib/data";
import type { Task } from "@/modules/task/types";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser();
  if (!session) {
    return fail("Unauthorized", 401);
  }

  const body = (await request.json().catch(() => null)) as { status?: Task["status"] } | null;

  if (!body?.status) {
    return fail("Status is required", 400);
  }

  const { id } = await context.params;
  const updated = updateTaskStatus(id, body.status);

  if (!updated) {
    return fail("Task not found", 404);
  }

  return ok(updated);
}
