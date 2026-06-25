export type JobSource = 'LINKEDIN' | 'INDEED' | 'GLASSDOOR' | 'DJINNI' | 'DOU' | 'OTHER';

export type JobStatus =
  | 'SAVED'
  | 'APPLYING'
  | 'APPLIED'
  | 'INTERVIEW'
  | 'OFFER'
  | 'REJECTED'
  | 'ARCHIVED';

export type WorkFormat = 'REMOTE' | 'HYBRID' | 'ONSITE' | 'ANY';

export type ExperienceLevel = 'INTERN' | 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD' | 'PRINCIPAL';

export interface Job {
  id: string;
  userId: string;
  sourceUrl: string | null;
  source: JobSource | null;
  title: string;
  company: string;
  location: string | null;
  remote: boolean | null;
  workFormat: WorkFormat | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  description: string | null;
  requirements: string | null;
  techStack: string[];
  seniority: ExperienceLevel | null;
  matchScore: number | null;
  status: JobStatus;
  appliedAt: string | null;
  deadline: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedJobs {
  data: Job[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface StackStat {
  tech: string;
  count: number;
}

export interface JobFilters {
  status?: JobStatus;
  remote?: boolean;
  stack?: string[];
  minMatchScore?: number;
}

export interface CreateJobPayload {
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  workFormat?: WorkFormat;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  description?: string;
  requirements?: string;
  techStack?: string[];
  seniority?: ExperienceLevel;
  status?: JobStatus;
  deadline?: string;
  notes?: string;
  sourceUrl?: string;
  source?: JobSource;
}

export interface UpdateJobPayload {
  status?: JobStatus;
  notes?: string;
  deadline?: string;
  matchScore?: number;
  title?: string;
  company?: string;
  location?: string;
  remote?: boolean;
  workFormat?: WorkFormat;
  salaryMin?: number;
  salaryMax?: number;
  techStack?: string[];
}
