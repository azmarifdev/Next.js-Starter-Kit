"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { useToast } from "@/components/common/toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    <Card className="form">
      <form onSubmit={onSubmit} className="form">
        <h1>{isRegister ? "Register" : "Login"}</h1>

        {isRegister ? (
          <>
            <Input
              name="name"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={errors.name}
              required
            />
            {errors.name ? <p id="name-error" className="error">{errors.name}</p> : null}
          </>
        ) : null}

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          required
        />
        {errors.email ? <p id="email-error" className="error">{errors.email}</p> : null}

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          required
        />
        {errors.password ? <p id="password-error" className="error">{errors.password}</p> : null}

        {errors.form ? <p className="error">{errors.form}</p> : null}

        <Button disabled={loading} type="submit">
          {loading ? "Please wait..." : isRegister ? "Create account" : "Login"}
        </Button>

        <p>
          {isRegister ? "Already have an account?" : "Need an account?"} {" "}
          <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Login" : "Register"}</Link>
        </p>
      </form>
    </Card>
  );
}
