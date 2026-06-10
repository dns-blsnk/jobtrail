import type { LoginDto } from '@job-search-tracker/types';
import { useState } from 'react';
import { signIn } from '../../../../entities/session/api/auth-api';
import { useSessionStore } from '../../../../entities/session/model/session-store';

export function useSignIn() {
  const setSession = useSessionStore((state) => state.setSession);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (values: LoginDto) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await signIn(values);
      setSession(result.user, result.tokens);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setIsPending(false);
    }
  };

  const reset = () => setError(null);

  return { mutate, isPending, error, reset };
}
