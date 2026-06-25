import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/database/prisma.service';
import { JobsParserService } from './jobs-parser.service';
import type { CreateJobDto } from './dto/create-job.dto';
import type { UpdateJobDto } from './dto/update-job.dto';
import type { JobsQueryDto } from './dto/jobs-query.dto';
import type { PaginatedJobsResponseDto, StackStatDto } from './dto/job-response.dto';

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parser: JobsParserService,
  ) {}

  async parseAndCreate(userId: string, url: string) {
    const parsed = await this.parser.parseUrl(url);
    const matchScore = await this.calcMatchScoreForUser(userId, parsed.techStack);

    return this.prisma.job.create({
      data: {
        userId,
        sourceUrl: parsed.sourceUrl,
        source: parsed.source,
        title: parsed.title,
        company: parsed.company,
        location: parsed.location,
        remote: parsed.remote,
        description: parsed.description,
        requirements: parsed.requirements,
        techStack: parsed.techStack,
        salaryMin: parsed.salaryMin,
        salaryMax: parsed.salaryMax,
        salaryCurrency: parsed.salaryCurrency ?? 'USD',
        matchScore,
      },
    });
  }

  async create(userId: string, dto: CreateJobDto) {
    const techStack = dto.techStack ?? [];
    const matchScore = dto.matchScore ?? (await this.calcMatchScoreForUser(userId, techStack));

    return this.prisma.job.create({
      data: {
        userId,
        sourceUrl: dto.sourceUrl,
        source: dto.source,
        title: dto.title,
        company: dto.company,
        location: dto.location,
        remote: dto.remote,
        workFormat: dto.workFormat,
        salaryMin: dto.salaryMin,
        salaryMax: dto.salaryMax,
        salaryCurrency: dto.salaryCurrency ?? 'USD',
        description: dto.description,
        requirements: dto.requirements,
        techStack,
        seniority: dto.seniority,
        matchScore,
        status: dto.status ?? 'SAVED',
        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
        notes: dto.notes,
      },
    });
  }

  async findAll(userId: string, query: JobsQueryDto): Promise<PaginatedJobsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = { userId };
    if (query.status) where.status = query.status;
    if (query.remote === true) where.remote = true;
    if (query.stack?.length) {
      where.techStack = { hasSome: query.stack };
    }
    if (query.minMatchScore !== undefined) {
      where.matchScore = { gte: query.minMatchScore };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.job.count({ where }),
    ]);

    return { data, total, page, limit, hasMore: skip + data.length < total };
  }

  async findOne(userId: string, id: string) {
    const job = await this.prisma.job.findFirst({ where: { id, userId } });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async update(userId: string, id: string, dto: UpdateJobDto) {
    await this.findOne(userId, id);
    return this.prisma.job.update({
      where: { id },
      data: {
        ...dto,
        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
        appliedAt: dto.status === 'APPLIED' ? new Date() : undefined,
        updatedAt: new Date(),
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.prisma.job.delete({ where: { id } });
  }

  async getStackStats(userId: string): Promise<StackStatDto[]> {
    const jobs = await this.prisma.job.findMany({
      where: { userId },
      select: { techStack: true },
    });

    const counts = new Map<string, number>();
    for (const job of jobs) {
      for (const tech of job.techStack) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }

    return [...counts.entries()]
      .map(([tech, count]) => ({ tech, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  private async calcMatchScoreForUser(userId: string, jobStack: string[]): Promise<number> {
    if (!jobStack.length) return 0;
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: { preferredStack: true },
    });
    if (!profile || !profile.preferredStack.length) return 0;
    const userStack = profile.preferredStack.map((s) => s.toLowerCase());
    const matches = jobStack.filter((t) => userStack.includes(t.toLowerCase()));
    return Math.round((matches.length / jobStack.length) * 100);
  }
}
