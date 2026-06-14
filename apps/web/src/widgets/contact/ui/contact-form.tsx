'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import styles from './contact-form.module.scss';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: FormFields = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const t = useTranslations('contactPage.form');
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [status, setStatus] = useState<FormStatus>('idle');

  const set = (key: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFields(EMPTY);
    }, 1200);
  };

  if (status === 'success') {
    return (
      <section className={styles.root}>
        <div className={styles.successState}>
          <span className={styles.successIcon}>
            <Icon name="check" size={24} strokeWidth={2.5} />
          </span>
          <p className={styles.successText}>{t('successMessage')}</p>
          <button
            className={styles.resetBtn}
            type="button"
            onClick={() => setStatus('idle')}
          >
            Send another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>{t('heading')}</h2>

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-name">
              {t('nameLabel')}
            </label>
            <input
              className={styles.input}
              id="contact-name"
              name="user-name"
              placeholder={t('namePlaceholder')}
              required
              type="text"
              value={fields.name}
              onChange={set('name')}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-email">
              {t('emailLabel')}
            </label>
            <input
              className={styles.input}
              id="contact-email"
              name="user-email"
              placeholder={t('emailPlaceholder')}
              required
              type="email"
              value={fields.email}
              onChange={set('email')}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-subject">
            {t('subjectLabel')}
          </label>
          <input
            className={styles.input}
            id="contact-subject"
            name="message-subject"
            placeholder={t('subjectPlaceholder')}
            required
            type="text"
            value={fields.subject}
            onChange={set('subject')}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-message">
            {t('messageLabel')}
          </label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            id="contact-message"
            name="message-text"
            placeholder={t('messagePlaceholder')}
            required
            rows={5}
            value={fields.message}
            onChange={set('message')}
          />
        </div>

        <button
          className={styles.submitBtn}
          disabled={status === 'sending'}
          type="submit"
        >
          {status === 'sending' ? (
            <>
              <span className={styles.spinner} />
              {t('sendingLabel')}
            </>
          ) : (
            <>
              <Icon name="send" size={16} strokeWidth={2} />
              {t('submitLabel')}
            </>
          )}
        </button>
      </form>
    </section>
  );
}
