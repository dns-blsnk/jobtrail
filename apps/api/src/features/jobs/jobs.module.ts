import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsParserService } from './jobs-parser.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobsParserService],
})
export class JobsModule {}
