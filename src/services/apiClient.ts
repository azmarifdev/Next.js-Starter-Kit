export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path, { credentials: "include" });
  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data as T;
}

export async function apiPost<T, TPayload = unknown>(path: string, body?: TPayload): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data as T;
}

export async function apiDelete<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    method: "DELETE",
    credentials: "include"
  });
  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data as T;
}

export async function apiPatch<T, TPayload = unknown>(path: string, body?: TPayload): Promise<T> {
  const response = await fetch(path, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data as T;
}
