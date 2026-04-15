"use client";

import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ className = "", error, ...props }: InputProps) {
  const borderColor = error ? "#ef4444" : "var(--border)";

  return (
    <input
      {...props}
      className={`input ${className}`.trim()}
      style={{ borderColor }}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${props.name || props.id || "field"}-error` : undefined}
    />
  );
}
