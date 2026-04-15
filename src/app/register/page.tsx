import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth/session";
import { AuthForm } from "@/modules/auth/AuthForm";

export default async function RegisterPage() {
  const session = await getSessionUser();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="center">
      <AuthForm mode="register" />
    </section>
  );
}
