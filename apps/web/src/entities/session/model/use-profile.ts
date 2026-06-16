'use client';

import { useSession } from 'next-auth/react';

export interface ProfileUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export function useProfile() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return {
    user: isLoggedIn ? ((session?.user as ProfileUser | null) ?? null) : null,
    isLoggedIn,
    isLoading: status === 'loading',
  };
}
