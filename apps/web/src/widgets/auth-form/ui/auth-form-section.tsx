'use client';

import type { AuthMode } from '@job-search-tracker/types';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthFlowStore } from '@/features/auth/model/use-auth-flow-store';
import { useSignIn } from '@/features/auth/sign-in/model/use-sign-in';
import { useSignUp } from '@/features/auth/sign-up/model/use-sign-up';
import { type AuthFormErrors, type AuthValidationMessages, validateAuthForm } from '@/shared/lib/validation/auth-schema';
import { Button } from '@/shared/ui/button/button';
import { SegmentedControl } from '@/shared/ui/segmented-control/segmented-control';
import { TextField } from '@/shared/ui/text-field/text-field';
import styles from './auth-form-section.module.scss';

export function AuthFormSection() {
  const tf = useTranslations('auth.form');
  const tv = useTranslations('auth.validation');
  const { mode, setMode } = useAuthFlowStore();
  const signIn = useSignIn();
  const signUp = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const modeOptions: { label: string; value: AuthMode }[] = [
    { label: tf('modeLogin'), value: 'login' },
    { label: tf('modeRegister'), value: 'register' },
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
    const msgs: AuthValidationMessages = {
      emailRequired: tv('emailRequired'),
      emailInvalid: tv('emailInvalid'),
      passwordRequired: tv('passwordRequired'),
      passwordWeak: tv('passwordWeak'),
    };
    const validationErrors = validateAuthForm(values, msgs);
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
        <h1 className={styles.title}>{tf('title')}</h1>
        <p className={styles.subtitle}>{tf('subtitle')}</p>
      </div>

      <SegmentedControl options={modeOptions} value={mode} onChange={handleChangeMode} />

      <div className={styles.fields}>
        <TextField
          autoComplete="email"
          error={errors.email}
          label={tf('emailLabel')}
          placeholder={tf('emailPlaceholder')}
          type="email"
          value={email}
          onChange={setEmail}
        />
        <TextField
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          error={errors.password}
          label={tf('passwordLabel')}
          placeholder={tf('passwordPlaceholder')}
          type="password"
          value={password}
          onChange={setPassword}
        />
      </div>

      <div className={styles.actions}>
        <Button
          disabled={isPending}
          loading={isPending}
          title={mode === 'login' ? tf('modeLogin') : tf('modeRegister')}
          onClick={handleSubmit}
        />
      </div>

      <div className={styles.submitErrorSlot}>
        {submitError && <p className={styles.submitError}>{submitError}</p>}
      </div>
    </div>
  );
}
