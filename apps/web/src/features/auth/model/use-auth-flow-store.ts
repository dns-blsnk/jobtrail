import type { AuthMode } from '@job-search-tracker/types';
import { create } from 'zustand';

interface AuthFlowStore {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

export const useAuthFlowStore = create<AuthFlowStore>((set) => ({
  mode: 'login',
  setMode: (mode) => set({ mode }),
}));
