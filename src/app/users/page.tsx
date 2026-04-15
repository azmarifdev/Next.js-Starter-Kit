import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth";
import { UserList } from "@/modules/user/UserList";

export default async function UsersPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="content-shell">
      <UserList />
    </section>
  );
}
