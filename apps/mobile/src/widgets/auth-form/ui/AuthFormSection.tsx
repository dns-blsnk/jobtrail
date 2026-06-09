import type { AuthMode } from '@job-search-tracker/types';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSessionStore } from '../../../entities/session/model/session-store';
import { useAuthFlowStore } from '../../../features/auth/model/use-auth-flow-store';
import { signInByEmail } from '../../../features/auth/sign-in/model/sign-in-by-email';
import { signUpByEmail } from '../../../features/auth/sign-up/model/sign-up-by-email';
import { theme } from '../../../shared/config/theme';
import { type AuthFormErrors, type AuthFormValues, validateAuthForm } from '../../../shared/lib/validation/auth-validation';
import { CheckboxField } from '../../../shared/ui/checkbox/CheckboxField';
import { PrimaryButton } from '../../../shared/ui/button/PrimaryButton';
import { SegmentedControl } from '../../../shared/ui/segmented-control/SegmentedControl';
import { SocialLoginButton } from '../../../shared/ui/social/SocialLoginButton';
import { TextField } from '../../../shared/ui/input/TextField';
import { TextSeparator } from '../../../shared/ui/separator/TextSeparator';

const modeOptions: { label: string; value: AuthMode }[] = [
  { label: 'Log In', value: 'login' },
  { label: 'Sign Up', value: 'register' },
];

export const AuthFormSection = () => {
  const { mode, rememberMe, isSubmitting, setMode, toggleRememberMe, setSubmitting } =
    useAuthFlowStore();
  const setSession = useSessionStore((state) => state.setSession);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitTitle = mode === 'login' ? 'Log In' : 'Sign Up';

  const socialOptions = useMemo(
    () => [
      { key: 'google', icon: 'G' },
      { key: 'facebook', icon: 'f' },
      { key: 'apple', icon: 'A' },
      { key: 'phone', icon: 'P' },
    ],
    [],
  );

  const handleChangeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    const values: AuthFormValues = { email: email.trim(), password: password.trim() };
    const validationResult = validateAuthForm(values);

    setErrors(validationResult);
    if (Object.keys(validationResult).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      if (mode === 'login') {
        const result = await signInByEmail({ email: values.email, password: values.password });
        setSession(result.user, result.tokens);
      } else {
        const result = await signUpByEmail({ email: values.email, password: values.password });
        setSession(result.user, result.tokens);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to continue. Please try again.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.title}>Get Started now</Text>
        <Text style={styles.subtitle}>Create an account or log in to explore about our app</Text>
      </View>

      <SegmentedControl options={modeOptions} value={mode} onChange={handleChangeMode} />

      <View style={styles.fieldGroup}>
        <TextField
          autoCapitalize="none"
          error={errors.email}
          keyboardType="email-address"
          label="Email"
          leftIcon="@"
          placeholder="yourname@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          error={errors.password}
          label="Password"
          leftIcon="*"
          placeholder="Password"
          rightActionIcon={passwordVisible ? 'H' : 'S'}
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          onRightActionPress={() => setPasswordVisible((v) => !v)}
        />
        <View style={styles.linksRow}>
          <CheckboxField checked={rememberMe} label="Remember me" onToggle={toggleRememberMe} />
          <Pressable accessibilityRole="button" hitSlop={8}>
            <Text style={styles.forgot}>Forgot Password ?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          disabled={isSubmitting}
          leftLabel="+"
          loading={isSubmitting}
          rightLabel=">"
          title={submitTitle}
          onPress={handleSubmit}
        />

        <View style={styles.socialSection}>
          <TextSeparator label="Or login with" />
          <View style={styles.socialRow}>
            {socialOptions.map((option) => (
              <SocialLoginButton key={option.key} icon={option.icon} onPress={() => undefined} />
            ))}
          </View>
        </View>
      </View>

      {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', gap: 24 },
  headline: { alignItems: 'center', gap: 12 },
  title: {
    color: theme.colors.heading,
    fontSize: 32,
    lineHeight: 42,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    width: 222,
    color: theme.colors.mutedText,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  fieldGroup: { gap: 16 },
  linksRow: {
    minHeight: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgot: { color: theme.colors.link, fontSize: 12, lineHeight: 17, fontWeight: '600' },
  actions: { gap: 24 },
  socialSection: { gap: 16 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  error: { color: '#E5484D', fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
