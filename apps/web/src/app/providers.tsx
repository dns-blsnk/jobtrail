'use client';

import type { Session } from 'next-auth';
import { initApiClient } from '@job-search-tracker/api-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { MuiThemeProvider } from '@/shared/ui/theme/MuiThemeProvider';

initApiClient({
  baseUrl: process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4001/api/v1',
});

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 1 },
          mutations: { retry: 0 },
        },
      }),
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
