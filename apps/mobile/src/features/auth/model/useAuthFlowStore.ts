import type { AuthMode } from '@job-search-tracker/types';
import { create } from 'zustand';

interface AuthFlowStore {
  mode: AuthMode;
  rememberMe: boolean;
  isSubmitting: boolean;
  setMode: (mode: AuthMode) => void;
  toggleRememberMe: () => void;
  setSubmitting: (value: boolean) => void;
}

export const useAuthFlowStore = create<AuthFlowStore>((set) => ({
  mode: 'login',
  rememberMe: false,
  isSubmitting: false,
  setMode: (mode) => set({ mode }),
  toggleRememberMe: () => set((state) => ({ rememberMe: !state.rememberMe })),
  setSubmitting: (value) => set({ isSubmitting: value }),
}));
