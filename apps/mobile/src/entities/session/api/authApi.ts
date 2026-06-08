import type { AuthResponse, LoginDto, RegisterDto } from '@job-search-tracker/types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createAuthResponse = (email: string): AuthResponse => ({
  user: {
    id: `user_${email.toLowerCase()}`,
    email: email.toLowerCase(),
    name: email.split('@')[0],
    role: 'USER' as const,
    createdAt: new Date(),
  },
  tokens: {
    accessToken: 'mock_access_token',
    refreshToken: 'mock_refresh_token',
  },
});

export const signIn = async (payload: LoginDto): Promise<AuthResponse> => {
  await wait(450);
  return createAuthResponse(payload.email);
};

export const signUp = async (payload: RegisterDto): Promise<AuthResponse> => {
  await wait(600);
  return createAuthResponse(payload.email);
};
