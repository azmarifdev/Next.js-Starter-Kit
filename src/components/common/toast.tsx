"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, type, message }]);
    setTimeout(() => removeToast(id), 3200);
  }, [removeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[70] grid gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="min-w-[220px] rounded-lg border px-3 py-2 text-sm shadow-md"
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
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
