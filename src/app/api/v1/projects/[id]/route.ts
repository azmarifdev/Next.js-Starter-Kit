import { fail, ok } from "@/lib/api";
import { getSessionUser } from "@/lib/auth/session";
import { deleteProject } from "@/lib/data";

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser();
  if (!session) {
    return fail("Unauthorized", 401);
  }

  const { id } = await context.params;
  const deleted = deleteProject(id);

  if (!deleted) {
    return fail("Project not found", 404);
  }

  return ok({ deleted: true });
}
