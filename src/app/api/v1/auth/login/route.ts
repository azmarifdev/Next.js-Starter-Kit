import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, createSessionToken, findUserByEmail } from "@/lib/auth";
import {
  apiError,
  apiSuccess,
  AppApiError,
  handleApiError,
  isValidEmail,
  parseJsonBody
} from "@/lib/api-error";

type LoginBody = {
  email?: string;
  password?: string;
};

// Log in an existing user and issue an auth cookie.
export async function POST(request: Request) {
  try {
    const body = await parseJsonBody<LoginBody>(request);

    if (!body) {
      return apiError("Invalid JSON payload", { status: 400, code: "INVALID_JSON" });
    }

    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password?.trim() ?? "";

    if (!email || !password) {
      return apiError("Email and password are required", {
        status: 400,
        code: "VALIDATION_ERROR",
        details: {
          email: email ? "" : "Email is required",
          password: password ? "" : "Password is required"
        }
      });
    }

    if (!isValidEmail(email)) {
      return apiError("Please provide a valid email address", {
        status: 400,
        code: "VALIDATION_ERROR",
        details: { email: "Invalid email format" }
      });
    }

    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return apiError("Invalid email or password", { status: 401, code: "INVALID_CREDENTIALS" });
    }

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

    return apiSuccess({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    return handleApiError(error instanceof Error ? error : new AppApiError("Login failed"));
  }
}
