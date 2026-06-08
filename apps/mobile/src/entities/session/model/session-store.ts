import type { AuthTokens, IUser } from '@job-search-tracker/types';
import * as SecureStore from 'expo-secure-store';
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
      name: 'app-session',
      storage: createJSONStorage(() => ({
        getItem: (key: string) => SecureStore.getItemAsync(key),
        setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
      })),
      partialize: (state) => ({ user: state.user, tokens: state.tokens }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
