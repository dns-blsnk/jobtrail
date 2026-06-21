'use client';

import { useState } from 'react';
import { useParseJobUrl } from '@/entities/job/model/use-jobs';

export function useParseUrlForm() {
  const [url, setUrl] = useState('');
  const mutation = useParseJobUrl();

  const isValidUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const submit = () => {
    if (!isValidUrl(url)) return;
    mutation.mutate(url, {
      onSuccess: () => setUrl(''),
    });
  };

  return {
    url,
    setUrl,
    submit,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isValid: isValidUrl(url),
  };
}
