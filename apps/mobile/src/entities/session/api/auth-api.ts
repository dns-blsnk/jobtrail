import type { AuthResponse, IUser, LoginDto, RegisterDto } from '@job-search-tracker/types';
import { request } from '../../../shared/api/http-client';

export const signIn = (payload: LoginDto): Promise<AuthResponse> =>
  request<AuthResponse>('/auth/login', { method: 'POST', body: payload });

export const signUp = (payload: RegisterDto): Promise<AuthResponse> =>
  request<AuthResponse>('/auth/register', { method: 'POST', body: payload });

export const getMe = (token: string): Promise<IUser> =>
  request<IUser>('/users/me', { token });
