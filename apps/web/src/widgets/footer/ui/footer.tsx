'use client';

import Link from 'next/link';
import { Icon } from '@/shared/ui/icon/icon';
import { useMobile } from '@/shared/lib/hooks/use-mobile';
import { LangSwitch } from './lang-switch';
import styles from './footer.module.scss';

const FOOTER_COLS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Job parsing', 'Analytics', 'Roadmap'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Job-search guides', 'Resume templates', 'Help'],
  },
  {
    title: 'Company',
    links: ['About', 'Contact', 'Privacy', 'Terms'],
  },
];

const SOCIAL = [
  { icon: 'linkedin' as const, label: 'LinkedIn', href: 'https://linkedin.com/in/dns-blsnk' },
  { icon: 'github' as const, label: 'GitHub', href: 'https://github.com/dns-blsnk' },
  { icon: 'fileText' as const, label: 'Blog', href: '#' },
];

const YEAR = 2026;

export function Footer() {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <footer className={styles.footer}>
        <div className={styles.mobileTop}>
          <Logo />
          <p className={styles.desc}>
            Drop in job links — we parse them and gather the key details in one place.
          </p>
          <SocialRow />
        </div>

        <div className={styles.accordion}>
          {FOOTER_COLS.map((col) => (
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
          <span className={styles.copyright}>© {YEAR} Jobtrail · Built by Denys</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.desc}>
            Drop in job links — Jobtrail parses the description, extracts the key requirements, and keeps everything in one tracker.
          </p>
          <SocialRow />
        </div>

        {FOOTER_COLS.map((col) => (
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
        <span className={styles.copyright}>© {YEAR} Jobtrail · Built by Denys</span>
        <LangSwitch up />
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <Link aria-label="Jobtrail home" className={styles.logo} href="/">
      <span className={styles.logoMark}>
        <Icon name="briefcase" size={18} strokeWidth={2.1} />
      </span>
      <span className={styles.logoWord}>Jobtrail</span>
    </Link>
  );
}

function SocialRow() {
  return (
    <div className={styles.social}>
      {SOCIAL.map((s) => (
        <a
          key={s.label}
          aria-label={s.label}
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
  return (
    <Link className={styles.footLink} href="#">
      {label}
    </Link>
  );
}
