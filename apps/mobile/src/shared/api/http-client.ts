import { API_BASE_URL } from '../config/api.config';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string | string[],
  ) {
    super(Array.isArray(message) ? message.join(', ') : message);
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string;
};

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({ message: 'Request failed' }))) as {
      message?: string | string[];
    };
    throw new ApiError(response.status, data.message ?? 'Request failed');
  }

  return response.json() as Promise<T>;
};
