"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "btn";
  const tone =
    variant === "secondary" ? "btn secondary" : variant === "danger" ? "btn danger" : "btn";

  return <button {...props} className={`${base} ${tone} ${className}`.trim()} />;
}
