import { redirect } from "next/navigation";

import { DemoBanner } from "@/components/common/demo-banner";
import { getSessionUser } from "@/lib/auth";
import { AuthForm } from "@/modules/auth/AuthForm";

export default async function LoginPage() {
  const session = await getSessionUser();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="center stack narrow">
      <DemoBanner />
      <AuthForm mode="login" />
    </section>
  );
}
