import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FunnelStepDto {
  @ApiProperty() status: string;
  @ApiProperty() count: number;
}

export class SkillGapDto {
  @ApiProperty() tech: string;
  @ApiProperty() count: number;
  @ApiProperty() coverageIfAdded: number;
}

export class SalaryInsightsDto {
  @ApiPropertyOptional({ nullable: true }) median: number | null;
  @ApiPropertyOptional({ nullable: true }) min: number | null;
  @ApiPropertyOptional({ nullable: true }) max: number | null;
  @ApiProperty() count: number;
}

export class WeekActivityDto {
  @ApiProperty() week: string;
  @ApiProperty() count: number;
}

export class SourceCountDto {
  @ApiProperty() source: string;
  @ApiProperty() count: number;
}

export class AnalyticsDashboardDto {
  @ApiProperty() totalJobs: number;
  @ApiPropertyOptional({ nullable: true }) avgMatchScore: number | null;
  @ApiProperty() remoteRatio: number;
  @ApiPropertyOptional({ nullable: true }) responseRate: number | null;
  @ApiProperty({ type: [FunnelStepDto] }) funnel: FunnelStepDto[];
  @ApiProperty({ type: [SkillGapDto] }) skillsGap: SkillGapDto[];
  @ApiProperty() hasProfileStack: boolean;
  @ApiProperty({ type: SalaryInsightsDto }) salary: SalaryInsightsDto;
  @ApiProperty({ type: [WeekActivityDto] }) activity: WeekActivityDto[];
  @ApiProperty({ type: [SourceCountDto] }) sources: SourceCountDto[];
}
