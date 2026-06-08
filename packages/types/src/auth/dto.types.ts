export type AuthMode = 'login' | 'register';

export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface LogoutDto {
  refreshToken: string;
}
