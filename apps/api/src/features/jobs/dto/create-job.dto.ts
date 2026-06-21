import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import type { ExperienceLevel, JobSource, JobStatus, WorkFormat } from '@prisma/client';

export class CreateJobDto {
  @ApiPropertyOptional({ example: 'https://linkedin.com/jobs/view/123' })
  @IsOptional()
  @IsUrl()
  sourceUrl?: string;

  @ApiPropertyOptional({ enum: ['LINKEDIN', 'INDEED', 'GLASSDOOR', 'DJINNI', 'DOU', 'OTHER'] })
  @IsOptional()
  @IsEnum(['LINKEDIN', 'INDEED', 'GLASSDOOR', 'DJINNI', 'DOU', 'OTHER'])
  source?: JobSource;

  @ApiProperty({ example: 'Senior React Developer' })
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  title: string;

  @ApiProperty({ example: 'Grammarly' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  company: string;

  @ApiPropertyOptional({ example: 'Kyiv, Ukraine' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  remote?: boolean;

  @ApiPropertyOptional({ enum: ['REMOTE', 'HYBRID', 'ONSITE', 'ANY'] })
  @IsOptional()
  @IsEnum(['REMOTE', 'HYBRID', 'ONSITE', 'ANY'])
  workFormat?: WorkFormat;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMax?: number;

  @ApiPropertyOptional({ default: 'USD' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  salaryCurrency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @ApiPropertyOptional({ enum: ['INTERN', 'JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD', 'PRINCIPAL'] })
  @IsOptional()
  @IsEnum(['INTERN', 'JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD', 'PRINCIPAL'])
  seniority?: ExperienceLevel;

  @ApiPropertyOptional({
    enum: ['SAVED', 'APPLYING', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'ARCHIVED'],
  })
  @IsOptional()
  @IsEnum(['SAVED', 'APPLYING', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'ARCHIVED'])
  status?: JobStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(300)
  deadline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ minimum: 0, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  matchScore?: number;
}
