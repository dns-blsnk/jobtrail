'use client';

import { useTranslations } from 'next-intl';
import { useParseUrlForm } from '@/features/jobs/parse-url/model/use-parse-url-form';
import s from './parse-url-input.module.scss';

export function ParseUrlInput() {
  const t = useTranslations('jobsPage.urlInput');
  const { url, setUrl, submit, isPending, isError, isValid } = useParseUrlForm();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid && !isPending) submit();
  };

  return (
    <div className={s.root}>
      <div className={s.inputRow}>
        <input
          className={s.input}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('placeholder')}
          disabled={isPending}
          aria-label={t('placeholder')}
        />
        <button
          className={s.button}
          type="button"
          onClick={submit}
          disabled={!isValid || isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <span className={s.loadingText}>{t('loading')}</span>
          ) : (
            t('button')
          )}
        </button>
      </div>
      {isError && (
        <p className={s.error} role="alert">
          {t('error')}
        </p>
      )}
    </div>
  );
}
