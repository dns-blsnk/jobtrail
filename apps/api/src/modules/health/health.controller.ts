import { Controller, Get } from '@nestjs/common';
import { HealthService, type HealthStatusResponse } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getStatus(): HealthStatusResponse {
    return this.healthService.getStatus();
  }
}
