'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
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
  const tf = useTranslations('footer');
  const tc = useTranslations('common');
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <footer className={styles.footer}>
        <div className={styles.mobileTop}>
          <Logo tc={tc} />
          <p className={styles.desc}>{tf('descMobile')}</p>
          <SocialRow tf={tf} />
        </div>

        <div className={styles.accordion}>
          {([0, 1, 2] as const).map((i) => (
            <details key={tf(`columns.${i}.title`)} className={styles.details}>
              <summary className={styles.summary}>
                {tf(`columns.${i}.title`)}
                <Icon className={styles.summaryIcon} name="chevronDown" size={18} />
              </summary>
              <div className={styles.colLinks}>
                {getColumnLinks(i).map((l) => (
                  <FootLink key={l} label={l} />
                ))}
              </div>
            </details>
          ))}
        </div>

        <div className={styles.mobileBottom}>
          <LangSwitch up />
          <span className={styles.copyright}>{tf('copyright')}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Logo tc={tc} />
          <p className={styles.desc}>{tf('descDesktop')}</p>
          <SocialRow tf={tf} />
        </div>

        {([0, 1, 2] as const).map((i) => (
          <div key={tf(`columns.${i}.title`)} className={styles.col}>
            <h4 className={styles.colTitle}>{tf(`columns.${i}.title`)}</h4>
            <div className={styles.colLinks}>
              {getColumnLinks(i).map((l) => (
                <FootLink key={l} label={l} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span className={styles.copyright}>{tf('copyright')}</span>
        <LangSwitch up />
      </div>
    </footer>
  );
}

function getColumnLinks(colIndex: 0 | 1 | 2): string[] {
  const cols = [
    ['Features', 'Pricing', 'Job parsing', 'Analytics', 'Roadmap'],
    ['Blog', 'Job-search guides', 'Resume templates', 'Help'],
    ['About', 'Contact', 'Privacy', 'Terms'],
  ];
  return cols[colIndex];
}

interface LogoProps {
  tc: ReturnType<typeof useTranslations<'common'>>;
}

function Logo({ tc }: LogoProps) {
  return (
    <Link aria-label={tc('logoAriaLabel')} className={styles.logo} href="/">
      <span className={styles.logoMark}>
        <Icon name="briefcase" size={18} strokeWidth={2.1} />
      </span>
      <span className={styles.logoWord}>{tc('appName')}</span>
    </Link>
  );
}

interface SocialRowProps {
  tf: ReturnType<typeof useTranslations<'footer'>>;
}

function SocialRow({ tf }: SocialRowProps) {
  return (
    <div className={styles.social}>
      {SOCIAL_HREFS.map((s) => (
        <a
          key={s.key}
          aria-label={tf(`social.${s.key}`)}
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
