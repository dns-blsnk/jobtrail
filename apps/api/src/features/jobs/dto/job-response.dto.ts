import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ExperienceLevel, JobSource, JobStatus, WorkFormat } from '@prisma/client';

export class JobResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiPropertyOptional() sourceUrl: string | null;
  @ApiPropertyOptional() source: JobSource | null;
  @ApiProperty() title: string;
  @ApiProperty() company: string;
  @ApiPropertyOptional() location: string | null;
  @ApiPropertyOptional() remote: boolean | null;
  @ApiPropertyOptional() workFormat: WorkFormat | null;
  @ApiPropertyOptional() salaryMin: number | null;
  @ApiPropertyOptional() salaryMax: number | null;
  @ApiPropertyOptional() salaryCurrency: string | null;
  @ApiPropertyOptional() description: string | null;
  @ApiPropertyOptional() requirements: string | null;
  @ApiProperty({ type: [String] }) techStack: string[];
  @ApiPropertyOptional() seniority: ExperienceLevel | null;
  @ApiPropertyOptional() matchScore: number | null;
  @ApiProperty() status: JobStatus;
  @ApiPropertyOptional() appliedAt: Date | null;
  @ApiPropertyOptional() deadline: Date | null;
  @ApiPropertyOptional() notes: string | null;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

export class PaginatedJobsResponseDto {
  @ApiProperty({ type: [JobResponseDto] }) data: JobResponseDto[];
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() hasMore: boolean;
}

export class StackStatDto {
  @ApiProperty() tech: string;
  @ApiProperty() count: number;
}
