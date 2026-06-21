'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { clsx } from 'clsx';
import s from './contact-info.module.scss';

const SOCIAL_LINKS = [
  {
    key: 'github' as const,
    icon: GitHubIcon,
    href: 'https://github.com/dns-blsnk',
  },
  {
    key: 'linkedin' as const,
    icon: LinkedInIcon,
    href: 'https://linkedin.com/in/denys-bilousenko',
  },
  {
    key: 'telegram' as const,
    icon: SendOutlinedIcon,
    href: 'https://t.me/dmaat1',
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

  const CopyIcon = copied ? CheckOutlinedIcon : ContentCopyOutlinedIcon;

  return (
    <section className={s.root}>
      <h2 className={s.heading}>{t('heading')}</h2>

      <div className={s.emailBlock}>
        <span className={s.emailLabel}>{t('emailLabel')}</span>
        <div className={s.emailRow}>
          <a className={s.emailLink} href={`mailto:${t('email')}`}>
            {t('email')}
          </a>
          <button
            aria-label={copied ? t('copiedLabel') : t('copyLabel')}
            className={clsx(s.copyBtn, copied && s.copyBtnActive)}
            type="button"
            onClick={handleCopy}
          >
            <CopyIcon sx={{ fontSize: 15 }} />
            <span>{copied ? t('copiedLabel') : t('copyLabel')}</span>
          </button>
        </div>
      </div>

      <div className={s.socialList}>
        {SOCIAL_LINKS.map(({ key, icon: SocialIcon, href }) => (
          <a
            key={key}
            aria-label={t(`${key}Label`)}
            className={s.socialLink}
            href={href}
            rel="noreferrer"
            target="_blank"
          >
            <SocialIcon sx={{ fontSize: 18 }} />
            <span>{t(`${key}Label`)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
