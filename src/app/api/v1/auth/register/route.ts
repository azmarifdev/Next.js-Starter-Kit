import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, createSessionToken, createUser } from "@/lib/auth";
import { apiError, apiSuccess, handleApiError, isValidEmail, parseJsonBody } from "@/lib/api-error";

type RegisterBody = {
  name?: string;
  email?: string;
  password?: string;
};

// Register a new user and immediately sign them in.
export async function POST(request: Request) {
  try {
    const body = await parseJsonBody<RegisterBody>(request);

    if (!body) {
      return apiError("Invalid JSON payload", { status: 400, code: "INVALID_JSON" });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password?.trim() ?? "";

    if (!name || !email || !password) {
      return apiError("Name, email, and password are required", {
        status: 400,
        code: "VALIDATION_ERROR",
        details: {
          name: name ? "" : "Name is required",
          email: email ? "" : "Email is required",
          password: password ? "" : "Password is required"
        }
      });
    }

    if (name.length < 2) {
      return apiError("Name must be at least 2 characters", {
        status: 400,
        code: "VALIDATION_ERROR",
        details: { name: "Too short" }
      });
    }

    if (!isValidEmail(email)) {
      return apiError("Please provide a valid email address", {
        status: 400,
        code: "VALIDATION_ERROR",
        details: { email: "Invalid email format" }
      });
    }

    if (password.length < 6) {
      return apiError("Password must be at least 6 characters", {
        status: 400,
        code: "VALIDATION_ERROR",
        details: { password: "Too short" }
      });
    }

    const user = await createUser({ name, email, password });

    const token = createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24
    });

    return apiSuccess({ id: user.id, name: user.name, email: user.email, role: user.role }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";

    if (message.toLowerCase().includes("already exists")) {
      return apiError("Email already exists", { status: 409, code: "EMAIL_CONFLICT" });
    }

    return handleApiError(error);
  }
}
