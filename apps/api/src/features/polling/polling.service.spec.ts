import { PollingService } from './polling.service';

describe('PollingService', () => {
  it('returns ready status payload', () => {
    const service = new PollingService();
    const result = service.getStatus();

    expect(result.status).toBe('ready');
    expect(result.service).toBe('api');
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });
});
