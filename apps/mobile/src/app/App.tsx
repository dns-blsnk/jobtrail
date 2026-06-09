import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSessionStore } from '../entities/session/model/session-store';
import AuthScreen from '../pages/auth/ui/AuthScreen';
import HomeScreen from '../pages/home/ui/HomeScreen';
import { theme } from '../shared/config/theme';

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

  return user ? <HomeScreen /> : <AuthScreen />;
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
