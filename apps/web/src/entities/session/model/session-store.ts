import type { AuthTokens, IUser } from '@job-search-tracker/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionStore {
  user: IUser | null;
  tokens: AuthTokens | null;
  _hasHydrated: boolean;
  setSession: (user: IUser, tokens: AuthTokens) => void;
  clearSession: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      _hasHydrated: false,
      setSession: (user, tokens) => set({ user, tokens }),
      clearSession: () => set({ user: null, tokens: null }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'web-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, tokens: state.tokens }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
