import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth/session";
import { UserList } from "@/modules/user/UserList";

export default async function UsersPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return <UserList />;
}
