import type { IUser } from '@job-search-tracker/types';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { AnalyticsDashboardDto } from './dto/analytics-response.dto';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @SkipThrottle()
  @ApiOperation({ summary: 'Get analytics dashboard data for the current user' })
  @ApiResponse({ status: 200, type: AnalyticsDashboardDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getDashboard(@CurrentUser() user: IUser): Promise<AnalyticsDashboardDto> {
    return this.analyticsService.getDashboard(user.id);
  }
}
