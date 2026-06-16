export const dashboardPage = {
  title: 'Dashboard',
  subtitle: 'Your job search at a glance',
  welcome: 'Welcome back',
  recentActivity: 'Recent Activity',
  emptyActivity: 'No recent activity. Add a job to get started.',
  stats: {
    totalApplications: 'Total Applications',
    interviews: 'Interviews',
    offers: 'Offers',
  },
} as const;

export type DashboardPageMessages = typeof dashboardPage;
