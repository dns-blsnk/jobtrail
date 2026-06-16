'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import { useMobile } from '@/shared/lib/hooks/use-mobile';
import { LangSwitch } from './lang-switch';
import s from './footer.module.scss';

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
      <footer className={s.footer}>
        <div className={s.mobileTop}>
          <Logo tc={tc} />
          <p className={s.desc}>{tf('descMobile')}</p>
          <SocialRow tf={tf} />
        </div>

        <div className={s.accordion}>
          {([0, 1, 2] as const).map((i) => (
            <details key={tf(`columns.${i}.title`)} className={s.details}>
              <summary className={s.summary}>
                {tf(`columns.${i}.title`)}
                <Icon className={s.summaryIcon} name="chevronDown" size={18} />
              </summary>
              <div className={s.colLinks}>
                {getColumnLinks(i).map((l) => (
                  <FootLink key={l} label={l} />
                ))}
              </div>
            </details>
          ))}
        </div>

        <div className={s.mobileBottom}>
          <LangSwitch up />
          <span className={s.copyright}>{tf('copyright')}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className={s.footer}>
      <div className={s.grid}>
        <div className={s.brand}>
          <Logo tc={tc} />
          <p className={s.desc}>{tf('descDesktop')}</p>
          <SocialRow tf={tf} />
        </div>

        {([0, 1, 2] as const).map((i) => (
          <div key={tf(`columns.${i}.title`)} className={s.col}>
            <h4 className={s.colTitle}>{tf(`columns.${i}.title`)}</h4>
            <div className={s.colLinks}>
              {getColumnLinks(i).map((l) => (
                <FootLink key={l} label={l} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={s.bottom}>
        <span className={s.copyright}>{tf('copyright')}</span>
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
    <Link aria-label={tc('logoAriaLabel')} className={s.logo} href="/">
      <span className={s.logoMark}>
        <Icon name="briefcase" size={18} strokeWidth={2.1} />
      </span>
      <span className={s.logoWord}>{tc('appName')}</span>
    </Link>
  );
}

interface SocialRowProps {
  tf: ReturnType<typeof useTranslations<'footer'>>;
}

function SocialRow({ tf }: SocialRowProps) {
  return (
    <div className={s.social}>
      {SOCIAL_HREFS.map((link) => (
        <a
          key={link.key}
          aria-label={tf(`social.${link.key}`)}
          className={s.socialBtn}
          href={link.href}
          rel="noreferrer"
          target="_blank"
        >
          <Icon name={link.icon} size={19} strokeWidth={1.9} />
        </a>
      ))}
    </div>
  );
}

function FootLink({ label }: { label: string }) {
  const href = LINK_HREFS[label] ?? '#';
  return (
    <Link className={s.footLink} href={href}>
      {label}
    </Link>
  );
}
