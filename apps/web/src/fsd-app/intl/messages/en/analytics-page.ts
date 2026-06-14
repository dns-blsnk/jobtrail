export const analyticsPage = {
  title: 'Analytics',
  subtitle: 'Insights into your job search',
  empty: 'Not enough data yet',
  emptyHint: 'Track more applications to unlock analytics.',
} as const;

export type AnalyticsPageMessages = typeof analyticsPage;
