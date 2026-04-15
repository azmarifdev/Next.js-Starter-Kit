type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error?: {
    code?: string;
    message?: string;
  };
  message?: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as ApiSuccess<T> | ApiFailure | null;

  if (!response.ok || !payload?.success) {
    const message =
      payload && "error" in payload ? payload.error?.message : payload && "message" in payload ? payload.message : undefined;
    throw new Error(message || "Request failed");
  }

  return payload.data;
}

export async function apiPost<T, TPayload = unknown>(path: string, body?: TPayload): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });

  return parseResponse<T>(response);
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include"
  });

  return parseResponse<T>(response);
}
