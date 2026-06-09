import { Injectable } from '@nestjs/common';

export type HealthStatusResponse = {
  status: 'ok';
};

@Injectable()
export class HealthService {
  getStatus(): HealthStatusResponse {
    return { status: 'ok' };
  }
}
