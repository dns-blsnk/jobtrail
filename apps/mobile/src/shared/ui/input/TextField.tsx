import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from 'react-native';
import { theme } from '../../config/theme';

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  leftIcon: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  onRightActionPress?: () => void;
  rightActionIcon?: string;
  error?: string;
}

export const TextField = ({
  label,
  value,
  onChangeText,
  placeholder,
  leftIcon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  onRightActionPress,
  rightActionIcon,
  error,
}: TextFieldProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputArea, !!error && styles.inputAreaError]}>
        <View style={styles.leftArea}>
          <Text style={styles.leftIcon}>{leftIcon}</Text>
          <TextInput
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.iconMuted}
            secureTextEntry={secureTextEntry}
            selectionColor={theme.colors.primary}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
        {onRightActionPress ? (
          <Pressable accessibilityRole="button" hitSlop={8} onPress={onRightActionPress}>
            <Text style={styles.rightIcon}>{rightActionIcon ?? ''}</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 2,
  },
  label: {
    color: theme.colors.mutedText,
    fontSize: 12,
    lineHeight: 19,
    fontWeight: '500',
  },
  inputArea: {
    minHeight: 46,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputAreaError: {
    borderColor: '#E5484D',
  },
  leftArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leftIcon: {
    width: 16,
    color: theme.colors.iconMuted,
    textAlign: 'center',
    fontSize: 14,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    paddingVertical: 0,
  },
  rightIcon: {
    width: 16,
    color: theme.colors.iconMuted,
    textAlign: 'center',
    fontSize: 14,
  },
  error: {
    color: '#E5484D',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
});
