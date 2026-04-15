import { fail, ok } from "@/lib/api";
import { getSessionUser } from "@/lib/auth/session";
import { addProject, getProjects } from "@/lib/data";

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return fail("Unauthorized", 401);
  }

  return ok(getProjects());
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return fail("Unauthorized", 401);
  }

  const body = (await request.json().catch(() => null)) as { name?: string; owner?: string } | null;
  const name = body?.name?.trim();
  const owner = body?.owner?.trim();

  if (!name || !owner) {
    return fail("Name and owner are required", 400);
  }

  return ok(addProject(name, owner), 201);
}
