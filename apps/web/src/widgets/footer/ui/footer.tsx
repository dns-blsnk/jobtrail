'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { LangSwitch } from './lang-switch';
import s from './footer.module.scss';

const NAV_LINKS = [
  { href: '/blog', key: 'blog' },
  { href: '/help', key: 'help' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
  { href: '/privacy', key: 'privacy' },
  { href: '/terms', key: 'terms' },
] as const;

type NavKey = (typeof NAV_LINKS)[number]['key'];

export function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <nav aria-label="Footer navigation" className={s.nav}>
          {NAV_LINKS.map(({ href, key }) => (
            <Link key={key} className={clsx(s.link, pathname === href && s.linkActive)} href={href}>
              {t(`nav.${key as NavKey}`)}
            </Link>
          ))}
        </nav>

        <div className={s.bottom}>
          <span className={s.copyright}>{t('copyright')}</span>
          <LangSwitch up />
        </div>
      </div>
    </footer>
  );
}
