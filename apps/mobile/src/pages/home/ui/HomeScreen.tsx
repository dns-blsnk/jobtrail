import type { IUser } from '@job-search-tracker/types';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getMe } from '../../../entities/session/api/auth-api';
import { useSessionStore } from '../../../entities/session/model/session-store';
import { theme } from '../../../shared/config/theme';

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
      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.brandMark}>JT</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.welcome}>Welcome back!</Text>
          <Text style={styles.email}>{user?.name ?? user?.email}</Text>
          {user?.name ? <Text style={styles.emailSub}>{user.email}</Text> : null}
        </View>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}
          onPress={clearSession}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 24,
    gap: 24,
  },
  brand: {
    width: 40,
    height: 27,
    borderRadius: 7,
    backgroundColor: '#375DFB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  brandMark: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    width: '100%',
    padding: 24,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    alignItems: 'center',
    gap: 4,
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
  logoutButton: {
    width: '100%',
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonPressed: {
    opacity: 0.6,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
});
