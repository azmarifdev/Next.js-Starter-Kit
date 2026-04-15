import { NextResponse } from "next/server";

export type ApiErrorDetails = Record<string, string>;

export type ApiErrorPayload = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetails;
  };
};

export type ApiSuccessPayload<T> = {
  success: true;
  data: T;
};

export class AppApiError extends Error {
  status: number;
  code: string;
  details?: ApiErrorDetails;

  constructor(
    message: string,
    options?: { status?: number; code?: string; details?: ApiErrorDetails }
  ) {
    super(message);
    this.name = "AppApiError";
    this.status = options?.status ?? 400;
    this.code = options?.code ?? "BAD_REQUEST";
    this.details = options?.details;
  }
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccessPayload<T>>({ success: true, data }, { status });
}

export function apiError(
  message: string,
  options?: { status?: number; code?: string; details?: ApiErrorDetails }
) {
  return NextResponse.json<ApiErrorPayload>(
    {
      success: false,
      error: {
        code: options?.code ?? "BAD_REQUEST",
        message,
        details: options?.details
      }
    },
    { status: options?.status ?? 400 }
  );
}

export async function parseJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function handleApiError(error: unknown) {
  if (error instanceof AppApiError) {
    return apiError(error.message, {
      status: error.status,
      code: error.code,
      details: error.details
    });
  }

  return apiError("Internal server error", {
    status: 500,
    code: "INTERNAL_SERVER_ERROR"
  });
}
