import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSessionStore } from '../../../entities/session/model/session-store';
import { theme } from '../../../shared/config/theme';

const HomeScreen = () => {
  const user = useSessionStore((state) => state.user);
  const clearSession = useSessionStore((state) => state.clearSession);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.brandMark}>*</Text>
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
    width: 27,
    height: 27,
    borderRadius: 7,
    backgroundColor: '#375DFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMark: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '700',
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
