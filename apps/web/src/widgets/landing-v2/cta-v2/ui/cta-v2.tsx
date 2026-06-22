'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import s from './cta-v2.module.scss';

export function CtaV2() {
  const t = useTranslations('landingV2Page.cta');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isValid = email.trim().length > 0 && email.includes('@') && email.includes('.');
    if (!isValid) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/auth?email=${encodeURIComponent(email.trim())}`);
  }

  return (
    <section className={s.root} aria-labelledby="cta-v2-heading">
      <div className={s.inner}>
        <h2 id="cta-v2-heading" className={s.heading}>
          {t('heading')}
        </h2>
        <p className={s.sub}>{t('sub')}</p>

        <form className={s.form} onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            className={clsx(s.input, error && s.inputError)}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(false);
            }}
            placeholder={t('placeholder')}
            aria-label="Email address"
            aria-invalid={error}
            aria-describedby={error ? 'cta-email-error' : undefined}
          />
          <button type="submit" className={s.btn}>
            {t('button')}
          </button>
        </form>

        {error && (
          <p id="cta-email-error" className={s.errorMsg} role="alert">
            Please enter a valid email address.
          </p>
        )}

        <p className={s.facts}>{t('facts')}</p>
      </div>
    </section>
  );
}
