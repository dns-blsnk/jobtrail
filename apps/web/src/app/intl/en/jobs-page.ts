export const jobsPage = {
  title: 'Jobs',
  subtitle: 'Browse and save job opportunities',
  empty: 'No jobs added yet',
  emptyHint: 'Paste a job posting URL above to parse and save it automatically.',
  addFirst: 'Add your first job',
} as const;

export type JobsPageMessages = typeof jobsPage;
