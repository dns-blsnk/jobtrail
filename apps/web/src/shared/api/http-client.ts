import { API_BASE_URL } from '@/shared/config/api.config';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string | string[],
  ) {
    super(Array.isArray(message) ? message.join(', ') : message);
    this.name = 'ApiError';
  }
}

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, token } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    const message =
      typeof data['message'] === 'string' || Array.isArray(data['message'])
        ? (data['message'] as string | string[])
        : 'Something went wrong';
    throw new ApiError(response.status, message);
  }

  return data as T;
}
