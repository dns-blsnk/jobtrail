import type { IUser } from '@job-search-tracker/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ParseJobUrlDto } from './dto/parse-job-url.dto';
import { JobsQueryDto } from './dto/jobs-query.dto';
import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('parse')
  @Throttle({ default: { ttl: 3600_000, limit: 20 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Parse a job URL and save it' })
  @ApiResponse({ status: 201, description: 'Job parsed and saved' })
  @ApiResponse({ status: 422, description: 'Could not parse the URL' })
  parseUrl(@CurrentUser() user: IUser, @Body() dto: ParseJobUrlDto) {
    return this.jobsService.parseAndCreate(user.id, dto.url);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a job manually' })
  @ApiResponse({ status: 201, description: 'Job created' })
  create(@CurrentUser() user: IUser, @Body() dto: CreateJobDto) {
    return this.jobsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List saved jobs with filters and pagination' })
  @ApiResponse({ status: 200, description: 'Paginated job list' })
  findAll(@CurrentUser() user: IUser, @Query() query: JobsQueryDto) {
    return this.jobsService.findAll(user.id, query);
  }

  @Get('stack-stats')
  @ApiOperation({ summary: 'Get tech stack statistics across saved jobs' })
  @ApiResponse({ status: 200, description: 'Stack stats array' })
  getStackStats(@CurrentUser() user: IUser) {
    return this.jobsService.getStackStats(user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job (status, notes, etc.)' })
  @ApiResponse({ status: 200, description: 'Job updated' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  update(@CurrentUser() user: IUser, @Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.jobsService.update(user.id, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a job' })
  @ApiResponse({ status: 204, description: 'Job deleted' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  remove(@CurrentUser() user: IUser, @Param('id') id: string) {
    return this.jobsService.remove(user.id, id);
  }
}
