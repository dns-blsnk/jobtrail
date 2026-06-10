import type { RegisterDto } from '@job-search-tracker/types';
import { useState } from 'react';
import { signUp } from '../../../../entities/session/api/auth-api';
import { useSessionStore } from '../../../../entities/session/model/session-store';

export function useSignUp() {
  const setSession = useSessionStore((state) => state.setSession);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (values: RegisterDto) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await signUp(values);
      setSession(result.user, result.tokens);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Email already in use or registration failed');
    } finally {
      setIsPending(false);
    }
  };

  const reset = () => setError(null);

  return { mutate, isPending, error, reset };
}
