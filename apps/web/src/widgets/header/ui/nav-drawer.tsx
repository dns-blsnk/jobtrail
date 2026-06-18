'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import type { IconName } from '@/shared/ui/icon/icon';
import { Avatar } from '@/shared/ui/avatar/avatar';
import s from './nav-drawer.module.scss';

interface NavDrawerProps {
  open: boolean;
  isLoggedIn: boolean;
  user: { name: string | null; email: string } | null;
  onClose: () => void;
  onLinkClick: () => void;
  onAvatarClick: () => void;
}

interface DrawerLinkProps {
  href: string;
  label: string;
  icon?: IconName;
  onClick: () => void;
}

function DrawerLink({ href, label, icon, onClick }: DrawerLinkProps) {
  return (
    <Link href={href} prefetch={false} className={s.link} onClick={onClick}>
      {icon && <Icon className={s.linkIcon} name={icon} size={18} strokeWidth={1.9} />}
      {label}
    </Link>
  );
}

function Logo() {
  const tc = useTranslations('common');
  return (
    <Link href="/" prefetch={false} className={s.logo}>
      <span className={s.logoMark} style={{ width: 30, height: 30 }}>
        <Icon name="briefcase" size={18} strokeWidth={2.1} />
      </span>
      <span className={s.logoWord}>{tc('appName')}</span>
    </Link>
  );
}

export function NavDrawer({ open, isLoggedIn, user, onClose, onLinkClick, onAvatarClick }: NavDrawerProps) {
  const tc = useTranslations('common');
  const th = useTranslations('header');

  return (
    <>
      <div aria-hidden className={clsx(s.scrim, open && s.scrimVisible)} onClick={onClose} />

      <div role="dialog" aria-label={th('drawer.navLabel')} className={clsx(s.drawer, open && s.open)}>
        <div className={s.drawerHead}>
          <Logo />
          <button type="button" aria-label={th('aria.closeMenu')} className={s.closeBtn} onClick={onClose}>
            <Icon name="x" size={20} strokeWidth={2} />
          </button>
        </div>

        {isLoggedIn && user && (
          <button type="button" className={s.avatarSection} onClick={onAvatarClick}>
            <Avatar loggedIn size={42} user={user} />
            <div className={s.avatarInfo}>
              <span className={s.avatarName}>{user.name ?? tc('appName')}</span>
              <span className={s.avatarEmail}>{user.email}</span>
            </div>
            <Icon className={s.avatarChevron} name="chevronRight" size={16} />
          </button>
        )}

        <nav className={s.nav} aria-label="Main navigation">
          {isLoggedIn ? (
            <>
              <DrawerLink href="/dashboard" icon="layoutDashboard" label={th('nav.dashboard')} onClick={onLinkClick} />
              <DrawerLink href="/jobs" icon="briefcase" label={th('nav.jobs')} onClick={onLinkClick} />
              <DrawerLink href="/applications" icon="fileText" label={th('nav.applications')} onClick={onLinkClick} />
              <DrawerLink href="/resume" icon="fileText" label="Resume" onClick={onLinkClick} />
              <DrawerLink href="/analytics" icon="barChart" label={th('nav.analytics')} onClick={onLinkClick} />
            </>
          ) : (
            <>
              <DrawerLink href="/#features" label={th('nav.features')} onClick={onLinkClick} />
              <DrawerLink href="/#pricing" label={th('nav.pricing')} onClick={onLinkClick} />
              <DrawerLink href="/about" label={th('nav.about')} onClick={onLinkClick} />
            </>
          )}
        </nav>

        <div className={s.divider} />

        <nav className={s.nav} aria-label="Discover">
          <DrawerLink href="/blog" icon="bookmark" label="Blog" onClick={onLinkClick} />
          <DrawerLink href="/help" label="Help" onClick={onLinkClick} />
          <DrawerLink href="/contact" icon="mail" label="Contact" onClick={onLinkClick} />
        </nav>

        <div className={s.spacer} />

        <div className={s.footer}>
          {isLoggedIn ? (
            <button type="button" className={s.addJobBtn}>
              <Icon name="plus" size={16} strokeWidth={2.2} />
              {tc('addJob')}
            </button>
          ) : (
            <>
              <Link href="/auth" prefetch={false} className={s.signUpBtn} onClick={onLinkClick}>
                {tc('signUp')}
              </Link>
              <Link href="/auth" prefetch={false} className={s.logInBtn} onClick={onLinkClick}>
                {tc('logIn')}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
