import type { AuthMode } from '@job-search-tracker/types';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { signInByEmail, signUpByEmail, useAuthFlowStore } from '../../../features';
import { type AuthFormErrors, type AuthFormValues, theme, validateAuthForm } from '../../../shared';
import { CheckboxField, PrimaryButton, SegmentedControl, SocialLoginButton, TextField, TextSeparator } from '../../../shared/ui';

const modeOptions: { label: string; value: AuthMode }[] = [
  { label: 'Log In', value: 'login' },
  { label: 'Sign Up', value: 'register' },
];

export const AuthFormSection = () => {
  const { mode, rememberMe, isSubmitting, setMode, toggleRememberMe, setSubmitting } = useAuthFlowStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitTitle = mode === 'login' ? 'Log In' : 'Sign Up';

  const socialOptions = useMemo(
    () => [
      { key: 'google', icon: 'G' },
      { key: 'facebook', icon: 'f' },
      { key: 'apple', icon: 'A' },
      { key: 'phone', icon: 'P' },
    ],
    []
  );

  const handleChangeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    setSubmitError(null);
    setSubmitMessage(null);
  };

  const handleSubmit = async () => {
    const values: AuthFormValues = {
      email: email.trim(),
      password: password.trim(),
    };
    const validationResult = validateAuthForm(values);

    setErrors(validationResult);

    if (Object.keys(validationResult).length > 0) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitMessage(null);

    try {
      if (mode === 'login') {
        const result = await signInByEmail({
          email: values.email,
          password: values.password,
          rememberMe,
        });
        setSubmitMessage(`Welcome back, ${result.user.fullName}`);
      } else {
        const result = await signUpByEmail({
          email: values.email,
          password: values.password,
        });
        setSubmitMessage(`Account created for ${result.user.email}`);
      }
    } catch {
      setSubmitError('Unable to continue. Please try again.');
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
          onRightActionPress={() => setPasswordVisible((current) => !current)}
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

      {submitMessage ? <Text style={styles.success}>{submitMessage}</Text> : null}
      {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24,
  },
  headline: {
    alignItems: 'center',
    gap: 12,
  },
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
  fieldGroup: {
    gap: 16,
  },
  linksRow: {
    minHeight: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgot: {
    color: theme.colors.link,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
  },
  actions: {
    gap: 24,
  },
  socialSection: {
    gap: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  success: {
    color: '#0A7D22',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  error: {
    color: '#E5484D',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});
