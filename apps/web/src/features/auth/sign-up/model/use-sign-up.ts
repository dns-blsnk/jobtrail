import type { AuthResponse } from '@job-search-tracker/types';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/entities/session/api/auth-api';
import { useSessionStore } from '@/entities/session/model/session-store';

export function useSignUp() {
  const setSession = useSessionStore((state) => state.setSession);

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: (payload) => signUp(payload),
    onSuccess: (data) => {
      setSession(data.user, data.tokens);
    },
  });
}
