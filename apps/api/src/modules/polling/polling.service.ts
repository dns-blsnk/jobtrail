import { Injectable } from '@nestjs/common';

export type PollingStatusResponse = {
  status: 'ready';
  timestamp: string;
  service: 'api';
};

@Injectable()
export class PollingService {
  getStatus(): PollingStatusResponse {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
      service: 'api',
    };
  }
}
