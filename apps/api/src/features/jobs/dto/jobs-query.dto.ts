import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import type { JobStatus } from '@prisma/client';

export class JobsQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    enum: ['SAVED', 'APPLYING', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'ARCHIVED'],
  })
  @IsOptional()
  @IsEnum(['SAVED', 'APPLYING', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'ARCHIVED'])
  status?: JobStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value === 'true')
  @IsBoolean()
  remote?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  stack?: string[];

  @ApiPropertyOptional({ minimum: 0, maximum: 100 })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  @Max(100)
  minMatchScore?: number;
}
