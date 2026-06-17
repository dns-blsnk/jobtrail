import { ApiError } from './api-error';

interface ApiConfig {
  baseUrl: string;
  getToken?: () => string | null;
}

let _config: ApiConfig = { baseUrl: '' };

export function initApiClient(config: ApiConfig): void {
  _config = config;
}

export function getBaseUrl(): string {
  return _config.baseUrl;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, token } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const resolvedToken = token ?? _config.getToken?.() ?? null;
  if (resolvedToken) {
    requestHeaders['Authorization'] = `Bearer ${resolvedToken}`;
  }

  const response = await fetch(`${_config.baseUrl}${url}`, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({ message: 'Request failed' }))) as {
      message?: string | string[];
    };
    throw new ApiError(response.status, data.message ?? 'Request failed');
  }

  return response.json() as Promise<T>;
}
