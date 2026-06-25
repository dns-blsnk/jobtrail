import type { AnalyticsDashboard } from '@/entities/analytics/model/types';

export const MOCK_ANALYTICS_DASHBOARD: AnalyticsDashboard = {
  totalJobs: 24,
  avgMatchScore: 71,
  remoteRatio: 58,
  responseRate: 12,

  funnel: [
    { status: 'SAVED',     count: 24 },
    { status: 'APPLYING',  count: 18 },
    { status: 'APPLIED',   count: 12 },
    { status: 'INTERVIEW', count:  4 },
    { status: 'OFFER',     count:  1 },
  ],

  skillsGap: [
    { tech: 'Docker',     count: 14, coverageIfAdded: 58 },
    { tech: 'AWS',        count: 11, coverageIfAdded: 46 },
    { tech: 'GraphQL',    count:  9, coverageIfAdded: 38 },
    { tech: 'Kubernetes', count:  7, coverageIfAdded: 29 },
    { tech: 'Terraform',  count:  5, coverageIfAdded: 21 },
    { tech: 'Go',         count:  4, coverageIfAdded: 17 },
    { tech: 'Redis',      count:  3, coverageIfAdded: 13 },
  ],
  hasProfileStack: true,

  salary: {
    median: 130_000,
    min:     80_000,
    max:    185_000,
    count: 11,
  },

  activity: [
    { week: 'W14', count: 0 },
    { week: 'W15', count: 1 },
    { week: 'W16', count: 2 },
    { week: 'W17', count: 0 },
    { week: 'W18', count: 3 },
    { week: 'W19', count: 1 },
    { week: 'W20', count: 4 },
    { week: 'W21', count: 2 },
    { week: 'W22', count: 5 },
    { week: 'W23', count: 3 },
    { week: 'W24', count: 2 },
    { week: 'W25', count: 1 },
  ],

  sources: [
    { source: 'LinkedIn', count: 12 },
    { source: 'Djinni',   count:  6 },
    { source: 'DOU',      count:  3 },
    { source: 'Other',    count:  3 },
  ],
};
