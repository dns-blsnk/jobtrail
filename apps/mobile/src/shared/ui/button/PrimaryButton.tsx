import { ActivityIndicator, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '../../config/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  leftLabel,
  rightLabel,
  style,
}: PrimaryButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.icon}>{leftLabel ?? ''}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.icon}>{rightLabel ?? ''}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  icon: {
    width: 18,
    color: theme.colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
