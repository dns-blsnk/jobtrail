import type { AuthResponse, LoginDto, RegisterDto } from '@job-search-tracker/types';
import { request } from '@/shared/api/http-client';

export function signIn(payload: LoginDto): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', { method: 'POST', body: payload });
}

export function signUp(payload: RegisterDto): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', { method: 'POST', body: payload });
}
