'use client';

import { useCallback } from 'react';

export function useAnalytics() {
  const capture = useCallback((event: string, properties?: Record<string, unknown>) => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    import('posthog-js').then(({ default: posthog }) => {
      posthog.capture(event, properties);
    });
  }, []);

  return { capture };
}
