import { initApiClient } from '@job-search-tracker/api-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSessionStore } from '../entities/session/model/session-store';
import AuthScreen from '../pages/auth/ui/AuthScreen';
import HomeScreen from '../pages/home/ui/HomeScreen';
import { theme } from '../shared/config/theme';

initApiClient({
  baseUrl: process.env['EXPO_PUBLIC_API_URL'] ?? 'http://localhost:4001/api/v1',
  getToken: () => useSessionStore.getState().tokens?.accessToken ?? null,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
    mutations: { retry: 0 },
  },
});

export const App = () => {
  const user = useSessionStore((state) => state.user);
  const hasHydrated = useSessionStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {user ? <HomeScreen /> : <AuthScreen />}
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
