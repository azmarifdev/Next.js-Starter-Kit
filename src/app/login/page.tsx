import { redirect } from "next/navigation";

import { DemoBanner } from "@/components/common/demo-banner";
import { getSessionUser } from "@/lib/auth";
import { AuthForm } from "@/modules/auth/AuthForm";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSessionUser();
  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const next = params.next;
  const redirectTo = next?.startsWith("/") ? next : "/dashboard";

  return (
    <section className="content-shell center stack narrow">
      <DemoBanner />
      <AuthForm mode="login" redirectTo={redirectTo} />
    </section>
  );
}
