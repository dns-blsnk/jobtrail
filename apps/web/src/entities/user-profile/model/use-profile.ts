'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { profileApi } from '../api/profile-api';
import type { UpdateProfilePayload, UserProfile } from './types';

export const USER_PROFILE_QUERY_KEY = ['user-profile'] as const;

export function useUserProfile() {
  const { data: session } = useSession();
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: () => profileApi.get(session!.accessToken),
    enabled: !!session?.accessToken,
  });
}

export function useMutateUserProfile() {
  const { data: session } = useSession();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => profileApi.update(session!.accessToken, data),
    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: USER_PROFILE_QUERY_KEY });
      const prev = qc.getQueryData<UserProfile>(USER_PROFILE_QUERY_KEY);
      qc.setQueryData<UserProfile>(USER_PROFILE_QUERY_KEY, (old) =>
        old ? { ...old, ...data } : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(USER_PROFILE_QUERY_KEY, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY }),
  });
}
