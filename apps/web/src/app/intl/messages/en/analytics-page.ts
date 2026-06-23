export const analyticsPage = {
  title: 'Analytics',
  subtitle: 'Insights into your job search',
  summary: {
    totalJobs: 'Total Jobs',
    avgMatch: 'Avg Match Score',
    remoteRatio: 'Remote Jobs',
    responseRate: 'Response Rate',
    noData: '—',
  },
  funnel: {
    title: 'Application funnel',
    conversionFrom: 'from previous',
  },
  skillsGap: {
    title: 'Skills to learn next',
    subtitle: 'Missing from your profile, found in your saved jobs',
    reach: '+{n}% reach',
    noProfile: 'Add your skills in Profile to see the skills gap.',
    noGap: 'Your profile covers all tech skills in your saved jobs.',
    cta: 'Update your profile',
  },
  salary: {
    title: 'Salary insights',
    basedOn: 'Based on {n} jobs (USD)',
    notEnough: 'Not enough salary data yet.',
  },
  activity: {
    title: 'Jobs saved per week',
  },
  sources: {
    title: 'Job sources',
  },
  empty: {
    title: 'Not enough data yet',
    hint: 'Save at least 3 jobs to unlock analytics.',
    cta: 'Browse jobs',
  },
} as const;

export type AnalyticsPageMessages = typeof analyticsPage;
