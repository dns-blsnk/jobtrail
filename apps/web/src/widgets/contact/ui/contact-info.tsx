'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import styles from './contact-info.module.scss';

const SOCIAL_LINKS = [
  {
    key: 'github' as const,
    icon: 'github' as const,
    href: 'https://github.com/dns-blsnk',
  },
  {
    key: 'linkedin' as const,
    icon: 'linkedin' as const,
    href: 'https://linkedin.com/in/dns-blsnk',
  },
  {
    key: 'telegram' as const,
    icon: 'send' as const,
    href: 'https://t.me/dns_blsnk',
  },
];

export function ContactInfo() {
  const t = useTranslations('contactPage.info');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(t('email')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>{t('heading')}</h2>

      <div className={styles.emailBlock}>
        <span className={styles.emailLabel}>{t('emailLabel')}</span>
        <div className={styles.emailRow}>
          <a className={styles.emailLink} href={`mailto:${t('email')}`}>
            {t('email')}
          </a>
          <button
            aria-label={copied ? t('copiedLabel') : t('copyLabel')}
            className={`${styles.copyBtn} ${copied ? styles.copyBtnActive : ''}`}
            type="button"
            onClick={handleCopy}
          >
            <Icon name={copied ? 'check' : 'copy'} size={15} strokeWidth={2} />
            <span>{copied ? t('copiedLabel') : t('copyLabel')}</span>
          </button>
        </div>
      </div>

      <div className={styles.socialList}>
        {SOCIAL_LINKS.map(({ key, icon, href }) => (
          <a
            key={key}
            aria-label={t(`${key}Label`)}
            className={styles.socialLink}
            href={href}
            rel="noreferrer"
            target="_blank"
          >
            <Icon name={icon} size={18} strokeWidth={1.9} />
            <span>{t(`${key}Label`)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
