'use client';

import { create } from 'zustand';
import type { JobFilters, JobStatus } from '@/entities/job/model/types';

interface JobStore {
  filters: JobFilters;
  selectedJobId: string | null;
  setStatus: (status: JobStatus | undefined) => void;
  setRemote: (remote: boolean | undefined) => void;
  setStack: (stack: string[]) => void;
  setMinMatchScore: (score: number | undefined) => void;
  clearFilters: () => void;
  selectJob: (id: string | null) => void;
}

const INITIAL_FILTERS: JobFilters = {};

export const useJobStore = create<JobStore>((set) => ({
  filters: INITIAL_FILTERS,
  selectedJobId: null,

  setStatus: (status) =>
    set((state) => ({ filters: { ...state.filters, status } })),

  setRemote: (remote) =>
    set((state) => ({ filters: { ...state.filters, remote } })),

  setStack: (stack) =>
    set((state) => ({ filters: { ...state.filters, stack: stack.length ? stack : undefined } })),

  setMinMatchScore: (minMatchScore) =>
    set((state) => ({ filters: { ...state.filters, minMatchScore } })),

  clearFilters: () => set({ filters: INITIAL_FILTERS }),

  selectJob: (id) => set({ selectedJobId: id }),
}));
