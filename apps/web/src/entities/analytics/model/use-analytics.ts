'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { fetchAnalyticsDashboard } from '@/entities/analytics/api/analytics-api';
import { analyticsKeys } from '@/entities/analytics/model/analytics-keys';
import { MOCK_ANALYTICS_DASHBOARD } from '@/entities/analytics/model/analytics-mock';
import { STALE_TIME_STANDARD } from '@/shared/lib/query/query-config';

export function useAnalyticsDashboard() {
  const { data: session } = useSession();
  const token = session?.accessToken ?? '';

  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: () =>
      fetchAnalyticsDashboard(token).catch(() => MOCK_ANALYTICS_DASHBOARD),
    enabled: !!token,
    placeholderData: MOCK_ANALYTICS_DASHBOARD,
    staleTime: STALE_TIME_STANDARD,
  });
}
