'use client';

import { useEffect, useRef } from 'react';

interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const initialized = useRef(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || initialized.current) return;
    initialized.current = true;

    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: 'https://us.i.posthog.com',
        capture_pageview: false,
        autocapture: false,
      });
      posthog.capture('landing_viewed');
    });
  }, []);

  return <>{children}</>;
}
