"use client";

import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center p-4"
      style={{ background: "rgba(2, 6, 23, 0.45)" }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="card stack w-full max-w-lg">
        <div className="row between">
          <h3>{title}</h3>
          <button type="button" className="btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
