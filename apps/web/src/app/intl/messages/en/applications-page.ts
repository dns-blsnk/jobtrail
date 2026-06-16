export const applicationsPage = {
  title: 'Applications',
  subtitle: 'Track your application progress',
  empty: 'No applications yet',
  emptyHint: 'Applications you submit will appear here.',
} as const;

export type ApplicationsPageMessages = typeof applicationsPage;
