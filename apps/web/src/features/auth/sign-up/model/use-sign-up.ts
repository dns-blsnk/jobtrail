'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useSignUp() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (values: { email: string; password: string }) => {
    setIsPending(true);
    setError(null);

    const result = await signIn('credentials', {
      ...values,
      mode: 'register',
      redirect: false,
    });

    setIsPending(false);

    if (result?.error) {
      setError('Email already in use or registration failed');
      return;
    }

    router.push('/profile');
  };

  const reset = () => setError(null);

  return { mutate, isPending, error, reset };
}
