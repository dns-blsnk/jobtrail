'use client';

import Link from 'next/link';
import { useTranslations } from '@/fsd-app/intl/intl-provider';
import { Icon } from '@/shared/ui/icon/icon';
import { useMobile } from '@/shared/lib/hooks/use-mobile';
import { LangSwitch } from './lang-switch';
import styles from './footer.module.scss';

const SOCIAL_HREFS = [
  { icon: 'linkedin' as const, key: 'linkedin' as const, href: 'https://linkedin.com/in/dns-blsnk' },
  { icon: 'github' as const, key: 'github' as const, href: 'https://github.com/dns-blsnk' },
  { icon: 'fileText' as const, key: 'blog' as const, href: '/blog' },
];

const LINK_HREFS: Record<string, string> = {
  Features: '/#features',
  Pricing: '/#pricing',
  'Job parsing': '/#job-parsing',
  Analytics: '/#analytics',
  Roadmap: '/#roadmap',
  Blog: '/blog',
  'Job-search guides': '/job-search-guides',
  'Resume templates': '/resume-templates',
  Help: '/help',
  About: '/about',
  Contact: '/contact',
  Privacy: '/privacy',
  Terms: '/terms',
};

export function Footer() {
  const t = useTranslations();
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <footer className={styles.footer}>
        <div className={styles.mobileTop}>
          <Logo />
          <p className={styles.desc}>{t.footer.descMobile}</p>
          <SocialRow />
        </div>

        <div className={styles.accordion}>
          {t.footer.columns.map((col) => (
            <details key={col.title} className={styles.details}>
              <summary className={styles.summary}>
                {col.title}
                <Icon className={styles.summaryIcon} name="chevronDown" size={18} />
              </summary>
              <div className={styles.colLinks}>
                {col.links.map((l) => (
                  <FootLink key={l} label={l} />
                ))}
              </div>
            </details>
          ))}
        </div>

        <div className={styles.mobileBottom}>
          <LangSwitch up />
          <span className={styles.copyright}>{t.footer.copyright}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.desc}>{t.footer.descDesktop}</p>
          <SocialRow />
        </div>

        {t.footer.columns.map((col) => (
          <div key={col.title} className={styles.col}>
            <h4 className={styles.colTitle}>{col.title}</h4>
            <div className={styles.colLinks}>
              {col.links.map((l) => (
                <FootLink key={l} label={l} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span className={styles.copyright}>{t.footer.copyright}</span>
        <LangSwitch up />
      </div>
    </footer>
  );
}

function Logo() {
  const t = useTranslations();
  return (
    <Link aria-label={t.common.logoAriaLabel} className={styles.logo} href="/">
      <span className={styles.logoMark}>
        <Icon name="briefcase" size={18} strokeWidth={2.1} />
      </span>
      <span className={styles.logoWord}>{t.common.appName}</span>
    </Link>
  );
}

function SocialRow() {
  const t = useTranslations();
  return (
    <div className={styles.social}>
      {SOCIAL_HREFS.map((s) => (
        <a
          key={s.key}
          aria-label={t.footer.social[s.key]}
          className={styles.socialBtn}
          href={s.href}
          rel="noreferrer"
          target="_blank"
        >
          <Icon name={s.icon} size={19} strokeWidth={1.9} />
        </a>
      ))}
    </div>
  );
}

function FootLink({ label }: { label: string }) {
  const href = LINK_HREFS[label] ?? '#';
  return (
    <Link className={styles.footLink} href={href}>
      {label}
    </Link>
  );
}
