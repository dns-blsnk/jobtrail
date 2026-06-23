import { request } from '@job-search-tracker/api-client';
import type { AnalyticsDashboard } from '@/entities/analytics/model/types';

export async function fetchAnalyticsDashboard(token: string): Promise<AnalyticsDashboard> {
  return request<AnalyticsDashboard>('/analytics/dashboard', { token });
}
