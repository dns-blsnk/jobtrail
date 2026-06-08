import type { AuthResponse, LoginDto, RegisterDto } from '@job-search-tracker/types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createAuthResponse = (email: string): AuthResponse => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24).toISOString();

  return {
    user: {
      id: `user_${email.toLowerCase()}`,
      email: email.toLowerCase(),
      fullName: email.split('@')[0],
      createdAt: now.toISOString(),
    },
    session: {
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
      expiresAt,
    },
  };
};

export const signIn = async (payload: LoginDto): Promise<AuthResponse> => {
  await wait(450);
  return createAuthResponse(payload.email);
};

export const signUp = async (payload: RegisterDto): Promise<AuthResponse> => {
  await wait(600);
  return createAuthResponse(payload.email);
};
