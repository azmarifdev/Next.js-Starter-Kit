"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/common/toast";
import { Button } from "@/components/ui/button";
import { apiPost } from "@/services/apiClient";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  async function onLogout() {
    setLoading(true);

    try {
      await apiPost<{ loggedOut: boolean }>("/api/v1/auth/logout");
      showToast("Logged out successfully", "success");
      router.push("/login");
      router.refresh();
    } catch {
      showToast("Logout failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button type="button" variant="secondary" className="px-3.5 py-2 text-sm font-semibold" onClick={onLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
