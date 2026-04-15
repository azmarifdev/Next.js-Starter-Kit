"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { apiPost } from "@/services/apiClient";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await apiPost("/api/v1/auth/login", { email, password });
      } else {
        await apiPost("/api/v1/auth/register", { name, email, password });
      }

      router.push("/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card form">
      <h1>{mode === "login" ? "Login" : "Register"}</h1>
      {mode === "register" ? (
        <input
          className="input"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      ) : null}
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error ? <p className="error">{error}</p> : null}
      <button className="btn" disabled={loading} type="submit">
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
      </button>
      <p>
        {mode === "login" ? "Need an account?" : "Already have an account?"} {" "}
        <Link href={mode === "login" ? "/register" : "/login"}>
          {mode === "login" ? "Register" : "Login"}
        </Link>
      </p>
    </form>
  );
}
