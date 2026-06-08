import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../../config/theme';

interface SocialLoginButtonProps {
  icon: string;
  onPress: () => void;
}

export const SocialLoginButton = ({ icon, onPress }: SocialLoginButtonProps) => {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
      <Text style={styles.icon}>{icon}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 71,
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: theme.colors.heading,
    fontSize: 18,
    fontWeight: '600',
  },
});
