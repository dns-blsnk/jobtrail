export type AuthMode = 'login' | 'register';

export interface LoginDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
}
