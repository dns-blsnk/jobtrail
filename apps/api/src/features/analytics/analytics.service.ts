import { Injectable } from '@nestjs/common';
import type { Job } from '@prisma/client';
import { PrismaService } from '../../shared/database/prisma.service';
import type {
  AnalyticsDashboardDto,
  FunnelStepDto,
  SalaryInsightsDto,
  SkillGapDto,
  SourceCountDto,
  WeekActivityDto,
} from './dto/analytics-response.dto';

const FUNNEL_STATUSES = ['SAVED', 'APPLYING', 'APPLIED', 'INTERVIEW', 'OFFER'] as const;

const KNOWN_HOSTS: Record<string, string> = {
  'linkedin.com': 'LinkedIn',
  'indeed.com': 'Indeed',
  'glassdoor.com': 'Glassdoor',
  'djinni.co': 'Djinni',
  'dou.ua': 'DOU',
  'ashbyhq.com': 'Ashby',
  'jobs.ashbyhq.com': 'Ashby',
  'greenhouse.io': 'Greenhouse',
  'boards.greenhouse.io': 'Greenhouse',
  'lever.co': 'Lever',
  'jobs.lever.co': 'Lever',
  'wellfound.com': 'Wellfound',
  'angel.co': 'Wellfound',
  'workday.com': 'Workday',
  'myworkdayjobs.com': 'Workday',
  'smartrecruiters.com': 'SmartRecruiters',
};

const ENUM_LABELS: Record<string, string> = {
  LINKEDIN: 'LinkedIn',
  INDEED: 'Indeed',
  GLASSDOOR: 'Glassdoor',
  DJINNI: 'Djinni',
  DOU: 'DOU',
  OTHER: 'Other',
};

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(userId: string): Promise<AnalyticsDashboardDto> {
    const [jobs, profile] = await Promise.all([
      this.prisma.job.findMany({ where: { userId } }),
      this.prisma.userProfile.findUnique({ where: { userId } }),
    ]);

    const userStack = profile?.preferredStack ?? [];

    return {
      totalJobs: jobs.length,
      avgMatchScore: this.calcAvgMatchScore(jobs),
      remoteRatio: this.calcRemoteRatio(jobs),
      responseRate: this.calcResponseRate(jobs),
      funnel: this.calcFunnel(jobs),
      skillsGap: this.calcSkillsGap(jobs, userStack),
      hasProfileStack: userStack.length > 0,
      salary: this.calcSalaryInsights(jobs),
      activity: this.calcActivityByWeek(jobs),
      sources: this.calcSourceBreakdown(jobs),
    };
  }

  private calcAvgMatchScore(jobs: Job[]): number | null {
    const scored = jobs.filter((j) => j.matchScore !== null);
    if (!scored.length) return null;
    return Math.round(scored.reduce((s, j) => s + (j.matchScore ?? 0), 0) / scored.length);
  }

  private calcRemoteRatio(jobs: Job[]): number {
    if (!jobs.length) return 0;
    return Math.round((jobs.filter((j) => j.remote).length / jobs.length) * 100);
  }

  private calcResponseRate(jobs: Job[]): number | null {
    const applied = jobs.filter((j) => j.status === 'APPLIED').length;
    if (applied === 0) return null;
    const responded = jobs.filter((j) => j.status === 'INTERVIEW' || j.status === 'OFFER').length;
    return Math.round((responded / applied) * 100);
  }

  private calcFunnel(jobs: Job[]): FunnelStepDto[] {
    return FUNNEL_STATUSES.map((status) => ({
      status,
      count: jobs.filter((j) => j.status === status).length,
    }));
  }

  private calcSkillsGap(jobs: Job[], userStack: string[]): SkillGapDto[] {
    const counts = new Map<string, number>();
    for (const job of jobs) {
      for (const tech of job.techStack) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    const lower = userStack.map((s) => s.toLowerCase());
    return [...counts.entries()]
      .filter(([tech]) => !lower.includes(tech.toLowerCase()))
      .map(([tech, count]) => ({
        tech,
        count,
        coverageIfAdded: jobs.length > 0 ? Math.round((count / jobs.length) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private calcSalaryInsights(jobs: Job[]): SalaryInsightsDto {
    const withSalary = jobs.filter((j) => j.salaryMin !== null && j.salaryCurrency === 'USD');
    if (withSalary.length < 3) return { median: null, min: null, max: null, count: withSalary.length };
    const mins = withSalary.map((j) => j.salaryMin as number).sort((a, b) => a - b);
    return {
      median: mins[Math.floor(mins.length / 2)],
      min: Math.min(...mins),
      max: Math.max(...withSalary.map((j) => j.salaryMax ?? (j.salaryMin as number))),
      count: withSalary.length,
    };
  }

  private calcActivityByWeek(jobs: Job[]): WeekActivityDto[] {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    return Array.from({ length: 12 }, (_, i) => {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - daysSinceMonday - (11 - i) * 7);
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);

      return {
        week: `W${String(this.getISOWeek(weekStart)).padStart(2, '0')}`,
        count: jobs.filter((j) => {
          const d = new Date(j.createdAt);
          return d >= weekStart && d < weekEnd;
        }).length,
      };
    });
  }

  private getISOWeek(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  private resolveSourceLabel(job: Pick<Job, 'sourceUrl' | 'source'>): string {
    if (job.sourceUrl) {
      try {
        const hostname = new URL(job.sourceUrl).hostname.replace(/^www\./, '');
        for (const [key, label] of Object.entries(KNOWN_HOSTS)) {
          if (hostname === key || hostname.endsWith(`.${key}`)) return label;
        }
        // Unknown host: capitalize the first subdomain part (e.g. "ashby" from "jobs.ashby.io")
        const parts = hostname.split('.');
        const name = parts.length > 1 ? parts[parts.length - 2] : parts[0];
        return name.charAt(0).toUpperCase() + name.slice(1);
      } catch {
        // Invalid URL — fall through
      }
    }

    if (job.source) return ENUM_LABELS[job.source] ?? job.source;
    return 'Other';
  }

  private calcSourceBreakdown(jobs: Job[]): SourceCountDto[] {
    const counts = new Map<string, number>();
    for (const job of jobs) {
      const label = this.resolveSourceLabel(job);
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);
  }
}
