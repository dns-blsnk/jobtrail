'use client';

import type { AuthMode } from '@job-search-tracker/types';
import { useState } from 'react';
import { useTranslations } from '@/fsd-app/intl/intl-provider';
import { useAuthFlowStore } from '@/features/auth/model/use-auth-flow-store';
import { useSignIn } from '@/features/auth/sign-in/model/use-sign-in';
import { useSignUp } from '@/features/auth/sign-up/model/use-sign-up';
import { type AuthFormErrors, validateAuthForm } from '@/shared/lib/validation/auth-schema';
import { Button } from '@/shared/ui/button/button';
import { SegmentedControl } from '@/shared/ui/segmented-control/segmented-control';
import { TextField } from '@/shared/ui/text-field/text-field';
import styles from './auth-form-section.module.scss';

export function AuthFormSection() {
  const t = useTranslations();
  const { mode, setMode } = useAuthFlowStore();
  const signIn = useSignIn();
  const signUp = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const modeOptions: { label: string; value: AuthMode }[] = [
    { label: t.auth.form.modeLogin, value: 'login' },
    { label: t.auth.form.modeRegister, value: 'register' },
  ];

  const isPending = signIn.isPending || signUp.isPending;
  const submitError = signIn.error ?? signUp.error ?? null;

  const handleChangeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    signIn.reset();
    signUp.reset();
  };

  const handleSubmit = () => {
    const values = { email: email.trim(), password: password.trim() };
    const validationErrors = validateAuthForm(values, t.auth.validation);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (mode === 'login') {
      void signIn.mutate(values);
    } else {
      void signUp.mutate(values);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <h1 className={styles.title}>{t.auth.form.title}</h1>
        <p className={styles.subtitle}>{t.auth.form.subtitle}</p>
      </div>

      <SegmentedControl options={modeOptions} value={mode} onChange={handleChangeMode} />

      <div className={styles.fields}>
        <TextField
          autoComplete="email"
          error={errors.email}
          label={t.auth.form.emailLabel}
          placeholder={t.auth.form.emailPlaceholder}
          type="email"
          value={email}
          onChange={setEmail}
        />
        <TextField
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          error={errors.password}
          label={t.auth.form.passwordLabel}
          placeholder={t.auth.form.passwordPlaceholder}
          type="password"
          value={password}
          onChange={setPassword}
        />
      </div>

      <div className={styles.actions}>
        <Button
          disabled={isPending}
          loading={isPending}
          title={mode === 'login' ? t.auth.form.modeLogin : t.auth.form.modeRegister}
          onClick={handleSubmit}
        />
      </div>

      <div className={styles.submitErrorSlot}>
        {submitError && <p className={styles.submitError}>{submitError}</p>}
      </div>
    </div>
  );
}
