export type FunnelStatus = 'SAVED' | 'APPLYING' | 'APPLIED' | 'INTERVIEW' | 'OFFER';

export interface FunnelStep {
  status: FunnelStatus;
  count: number;
}

export interface SkillGap {
  tech: string;
  count: number;
  coverageIfAdded: number;
}

export interface SalaryInsights {
  median: number | null;
  min: number | null;
  max: number | null;
  count: number;
}

export interface WeekActivity {
  week: string;
  count: number;
}

export interface SourceCount {
  source: string;
  count: number;
}

export interface AnalyticsDashboard {
  totalJobs: number;
  avgMatchScore: number | null;
  remoteRatio: number;
  responseRate: number | null;
  funnel: FunnelStep[];
  skillsGap: SkillGap[];
  hasProfileStack: boolean;
  salary: SalaryInsights;
  activity: WeekActivity[];
  sources: SourceCount[];
}
