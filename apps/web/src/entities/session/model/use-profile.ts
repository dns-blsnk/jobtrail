'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { profileKeys } from './profile-keys';

export interface ProfileUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export function useProfile() {
  const { data: session, status } = useSession();

  const ssrUser = (session?.user ?? null) as ProfileUser | null;

  const { data: user } = useQuery<ProfileUser | null>({
    queryKey: profileKeys.me(),
    queryFn: () => (session?.user as ProfileUser) ?? null,
    initialData: ssrUser,
    staleTime: Infinity,
    enabled: status !== 'loading',
  });

  const isLoggedIn = status === 'authenticated';

  return {
    user: isLoggedIn ? (user ?? null) : null,
    isLoggedIn,
    isLoading: status === 'loading',
  };
}
