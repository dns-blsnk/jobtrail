import { request } from '@job-search-tracker/api-client';
import type {
  CreateJobPayload,
  Job,
  JobFilters,
  PaginatedJobs,
  StackStat,
  UpdateJobPayload,
} from '@/entities/job/model/types';

export interface JobsQueryParams extends JobFilters {
  page: number;
  limit: number;
}

export async function fetchJobs(params: JobsQueryParams, token: string): Promise<PaginatedJobs> {
  const search = new URLSearchParams();
  search.set('page', String(params.page));
  search.set('limit', String(params.limit));
  if (params.status) search.set('status', params.status);
  if (params.remote === true) search.set('remote', 'true');
  if (params.stack?.length) {
    params.stack.forEach((s) => search.append('stack', s));
  }
  if (params.minMatchScore !== undefined) {
    search.set('minMatchScore', String(params.minMatchScore));
  }
  return request<PaginatedJobs>(`/jobs?${search.toString()}`, { token });
}

export async function parseJobUrl(url: string, token: string): Promise<Job> {
  return request<Job>('/jobs/parse', { method: 'POST', body: { url }, token });
}

export async function createJob(payload: CreateJobPayload, token: string): Promise<Job> {
  return request<Job>('/jobs', { method: 'POST', body: payload, token });
}

export async function updateJob(
  id: string,
  payload: UpdateJobPayload,
  token: string,
): Promise<Job> {
  return request<Job>(`/jobs/${id}`, { method: 'PATCH', body: payload, token });
}

export async function deleteJob(id: string, token: string): Promise<void> {
  await request<void>(`/jobs/${id}`, { method: 'DELETE', token });
}

export async function fetchStackStats(token: string): Promise<StackStat[]> {
  return request<StackStat[]>('/jobs/stack-stats', { token });
}
