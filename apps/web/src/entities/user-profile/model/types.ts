export type ExperienceLevel = 'INTERN' | 'JUNIOR' | 'MIDDLE' | 'SENIOR' | 'LEAD' | 'PRINCIPAL';
export type WorkFormat = 'REMOTE' | 'HYBRID' | 'ONSITE' | 'ANY';
export type SearchStatus = 'ACTIVELY_LOOKING' | 'OPEN_TO_OPPORTUNITIES' | 'NOT_LOOKING';

export interface UserProfile {
  id: string;
  userId: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  avatarUrl: string | null;
  experienceLevel: ExperienceLevel | null;
  targetRoles: string[];
  preferredStack: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  workFormat: WorkFormat | null;
  availableFrom: string | null;
  searchStatus: SearchStatus;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UpdateProfilePayload = Partial<
  Omit<UserProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
>;
