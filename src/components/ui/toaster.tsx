"use client";

import { useToast } from "@/components/ui/toast";

export type ToastType = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  type: ToastType;
  title: string;
};

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[70] grid gap-2">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismissToast(toast.id)}
          className="min-w-[240px] rounded-xl border px-3 py-2 text-left text-sm shadow-md transition"
          style={{
            borderColor:
              toast.type === "success"
                ? "#16a34a"
                : toast.type === "error"
                  ? "#ef4444"
                  : "var(--border)",
            background:
              toast.type === "success"
                ? "rgba(22,163,74,0.12)"
                : toast.type === "error"
                  ? "rgba(239,68,68,0.12)"
                  : "var(--surface)",
            color: "var(--text)"
          }}
          aria-label="Dismiss notification"
        >
          {toast.title}
        </button>
      ))}
    </div>
  );
}
