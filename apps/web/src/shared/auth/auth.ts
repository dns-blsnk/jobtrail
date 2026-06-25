import type { AuthResponse } from '@job-search-tracker/types';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

const API_URL = process.env['API_URL'] ?? 'http://localhost:4001/api/v1';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        mode: { label: 'Mode', type: 'text' },
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;
        const mode = credentials.mode as 'login' | 'register';

        const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';

        const res = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
          const message =
            typeof body['message'] === 'string' ? body['message'] : 'Authentication failed';
          throw new Error(message);
        }

        const data = (await res.json()) as AuthResponse;

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name ?? null,
          role: data.user.role,
          accessToken: data.tokens.accessToken,
          refreshToken: data.tokens.refreshToken,
        };
      },
    }),
  ],
});
