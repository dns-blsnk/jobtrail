export type TemplateId = 'classic' | 'modern' | 'minimal';

export type BlockType =
  | 'header'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'languages'
  | 'certifications'
  | 'social-links'
  | 'awards'
  | 'custom';

export interface HeaderData {
  photoUrl?: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
}

export interface SummaryData {
  text: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  present: boolean;
  location: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface SkillsData {
  groups: Array<{ id: string; name: string; tags: string[] }>;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url?: string;
  startDate: string;
  endDate: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: 'Native' | 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  url?: string;
}

export type SocialPlatform = 'LinkedIn' | 'GitHub' | 'Portfolio' | 'Twitter' | 'Other';
export interface SocialLinkItem {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export interface AwardItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface CustomData {
  sectionTitle: string;
  content: string;
}

export type BlockData =
  | { type: 'header'; data: HeaderData }
  | { type: 'summary'; data: SummaryData }
  | { type: 'experience'; data: { items: ExperienceItem[] } }
  | { type: 'education'; data: { items: EducationItem[] } }
  | { type: 'skills'; data: SkillsData }
  | { type: 'projects'; data: { items: ProjectItem[] } }
  | { type: 'languages'; data: { items: LanguageItem[] } }
  | { type: 'certifications'; data: { items: CertificationItem[] } }
  | { type: 'social-links'; data: { items: SocialLinkItem[] } }
  | { type: 'awards'; data: { items: AwardItem[] } }
  | { type: 'custom'; data: CustomData };

export interface ResumeBlock {
  id: string;
  blockData: BlockData;
}

export interface Draft {
  id: string;
  name: string;
  templateId: TemplateId;
  createdAt: string;
  updatedAt: string;
  blocks: ResumeBlock[];
}
