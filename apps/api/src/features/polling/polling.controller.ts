import { Controller, Get } from '@nestjs/common';
import { PollingService, type PollingStatusResponse } from './polling.service';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Get('status')
  getStatus(): PollingStatusResponse {
    return this.pollingService.getStatus();
  }
}
