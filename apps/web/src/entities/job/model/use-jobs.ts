'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
  createJob,
  deleteJob,
  fetchJobs,
  fetchStackStats,
  parseJobUrl,
  updateJob,
} from '@/entities/job/api/jobs-api';
import type {
  CreateJobPayload,
  Job,
  JobFilters,
  UpdateJobPayload,
} from '@/entities/job/model/types';

const JOBS_LIMIT = 20;

function useToken(): string {
  const { data: session } = useSession();
  return session?.accessToken ?? '';
}

export function useJobs(filters: JobFilters) {
  const token = useToken();
  return useInfiniteQuery({
    queryKey: ['jobs', filters] as const,
    queryFn: ({ pageParam }) =>
      fetchJobs({ ...filters, page: pageParam, limit: JOBS_LIMIT }, token),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
    enabled: !!token,
  });
}

export function useStackStats() {
  const token = useToken();
  return useQuery({
    queryKey: ['jobs-stack-stats'] as const,
    queryFn: () => fetchStackStats(token),
    enabled: !!token,
    staleTime: 5 * 60_000,
  });
}

export function useParseJobUrl() {
  const token = useToken();
  const queryClient = useQueryClient();
  return useMutation<Job, Error, string>({
    mutationFn: (url) => parseJobUrl(url, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['jobs'] });
      void queryClient.invalidateQueries({ queryKey: ['jobs-stack-stats'] });
    },
  });
}

export function useCreateJob() {
  const token = useToken();
  const queryClient = useQueryClient();
  return useMutation<Job, Error, CreateJobPayload>({
    mutationFn: (payload) => createJob(payload, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['jobs'] });
      void queryClient.invalidateQueries({ queryKey: ['jobs-stack-stats'] });
    },
  });
}

export function useUpdateJob() {
  const token = useToken();
  const queryClient = useQueryClient();
  return useMutation<Job, Error, { id: string; payload: UpdateJobPayload }>({
    mutationFn: ({ id, payload }) => updateJob(id, payload, token),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ['jobs'] });
      const previousData = queryClient.getQueriesData({ queryKey: ['jobs'] });
      queryClient.setQueriesData(
        { queryKey: ['jobs'] },
        (old: { pages?: { data: Job[] }[] } | undefined) => {
          if (!old?.pages) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((job) => (job.id === id ? { ...job, ...payload } : job)),
            })),
          };
        },
      );
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      const ctx = context as { previousData?: [unknown, unknown][] } | undefined;
      if (ctx?.previousData) {
        ctx.previousData.forEach(([key, value]) => {
          queryClient.setQueryData(key as Parameters<typeof queryClient.setQueryData>[0], value);
        });
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useDeleteJob() {
  const token = useToken();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteJob(id, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['jobs'] });
      void queryClient.invalidateQueries({ queryKey: ['jobs-stack-stats'] });
    },
  });
}
