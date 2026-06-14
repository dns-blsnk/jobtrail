import type { IUser } from '@job-search-tracker/types';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getMe } from '../../../entities/session/api/auth-api';
import { useSessionStore } from '../../../entities/session/model/session-store';
import { theme } from '../../../shared/config/theme';
import { AppHeader } from '../../../widgets/header/ui/AppHeader';

const HomeScreen = () => {
  const cachedUser = useSessionStore((state) => state.user);
  const tokens = useSessionStore((state) => state.tokens);
  const clearSession = useSessionStore((state) => state.clearSession);
  const [freshUser, setFreshUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!tokens?.accessToken) return;
    getMe(tokens.accessToken)
      .then(setFreshUser)
      .catch(() => null);
  }, [tokens?.accessToken]);

  const user = freshUser ?? cachedUser;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <AppHeader
        loggedIn
        user={user ? { name: user.name, email: user.email } : null}
        onLogout={clearSession}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.welcome}>Welcome back!</Text>
          <Text style={styles.email}>{user?.name ?? user?.email}</Text>
          {user?.name ? <Text style={styles.emailSub}>{user.email}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.xl,
    gap: theme.spacing.xl,
  },
  card: {
    padding: 24,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.heading,
  },
  email: {
    fontSize: 16,
    color: theme.colors.text,
    marginTop: 8,
  },
  emailSub: {
    fontSize: 13,
    color: theme.colors.mutedText,
  },
});
