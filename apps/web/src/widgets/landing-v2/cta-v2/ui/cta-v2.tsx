'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import CheckRounded from '@mui/icons-material/CheckRounded';
import s from './cta-v2.module.scss';

export function CtaV2() {
  const t = useTranslations('landingV2Page.cta');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const features = t.raw('features') as string[];

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
        <div className={s.card}>
          <p className={s.eyebrow}>{t('eyebrow')}</p>
          <h2 id="cta-v2-heading" className={s.heading}>
            {t('heading')}
          </h2>
          <p className={s.sub}>{t('sub')}</p>

          <form className={s.form} onSubmit={handleSubmit} noValidate>
            <div className={s.inputWrap}>
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
            </div>
            {error && (
              <p id="cta-email-error" className={s.errorMsg} role="alert">
                {t('errorMsg')}
              </p>
            )}
          </form>

          <ul className={s.features} aria-label="Included features">
            {features.map((feat) => (
              <li key={feat} className={s.featureItem}>
                <CheckRounded className={s.featureIcon} fontSize="small" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
