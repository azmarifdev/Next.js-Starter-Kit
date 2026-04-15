"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { useToast } from "@/components/common/toast";
import { apiPost } from "@/services/apiClient";

type AuthFormProps = {
  mode: "login" | "register";
  redirectTo?: string;
};

type AuthErrors = {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function AuthForm({ mode, redirectTo = "/dashboard" }: AuthFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);

  const isRegister = useMemo(() => mode === "register", [mode]);

  function validate(): AuthErrors {
    const nextErrors: AuthErrors = {};

    if (isRegister && name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    }

    if (!isValidEmail(email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    return nextErrors;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix form errors", "error");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await apiPost("/api/v1/auth/login", { email, password });
        showToast("Login successful", "success");
      } else {
        await apiPost("/api/v1/auth/register", { name, email, password });
        showToast("Registration successful", "success");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Something went wrong";
      setErrors({ form: message });
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card form">
      <h1>{isRegister ? "Register" : "Login"}</h1>

      {isRegister ? (
        <>
          <input
            className="input"
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          {errors.name ? <p className="error">{errors.name}</p> : null}
        </>
      ) : null}

      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      {errors.email ? <p className="error">{errors.email}</p> : null}

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {errors.password ? <p className="error">{errors.password}</p> : null}

      {errors.form ? <p className="error">{errors.form}</p> : null}

      <button className="btn" disabled={loading} type="submit">
        {loading ? "Please wait..." : isRegister ? "Create account" : "Login"}
      </button>

      <p>
        {isRegister ? "Already have an account?" : "Need an account?"} {" "}
        <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Login" : "Register"}</Link>
      </p>
    </form>
  );
}
