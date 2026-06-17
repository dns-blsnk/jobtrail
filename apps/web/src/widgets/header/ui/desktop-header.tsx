'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { useProfile } from '@/entities/session/model/use-profile';
import { Icon } from '@/shared/ui/icon/icon';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { IconButton } from '@/shared/ui/icon-button/icon-button';
import s from './header.module.scss';

const UserMenuPopover = dynamic(
  () => import('./user-menu-popover').then((m) => ({ default: m.UserMenuPopover })),
  { ssr: false }
);

interface NavItem {
  label: string;
  href: string;
  icon?: 'layoutDashboard' | 'briefcase' | 'fileText' | 'barChart';
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

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      prefetch={false}
      className={clsx(s.navLink, active && s.navLinkActive)}
    >
      {item.icon && <Icon name={item.icon} size={17} strokeWidth={1.9} />}
      {item.label}
    </Link>
  );
}

export function DesktopHeader() {
  const tc = useTranslations('common');
  const th = useTranslations('header');
  const { user: profileUser, isLoggedIn } = useProfile();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const menuOpen = Boolean(anchorEl);
  const closeMenu = useCallback(() => setAnchorEl(null), []);

  const user = profileUser
    ? { name: profileUser.name ?? null, email: profileUser.email }
    : null;

  const navLogged: NavItem[] = [
    { label: th('nav.dashboard'), icon: 'layoutDashboard', href: '/dashboard' },
    { label: th('nav.jobs'), icon: 'briefcase', href: '/jobs' },
    { label: th('nav.applications'), icon: 'fileText', href: '/applications' },
    { label: th('nav.analytics'), icon: 'barChart', href: '/analytics' },
  ];

  const navGuest: NavItem[] = [
    { label: th('nav.features'), href: '/#features' },
    { label: th('nav.pricing'), href: '/#pricing' },
    { label: th('nav.about'), href: '/about' },
  ];

  const navItems = isLoggedIn ? navLogged : navGuest;

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <Logo />
          <nav className={s.nav}>
            {navItems.map((item, i) => (
              <NavLink key={item.href} active={isLoggedIn && i === 0} item={item} />
            ))}
          </nav>
        </div>

        <div className={s.right}>
          {isLoggedIn ? (
            <>
              <IconButton icon="search" label={th('aria.search')} />
              <IconButton dot icon="bell" label={th('aria.notifications')} />
              <span className={s.divider} />
              <button type="button" className={s.addJobBtn}>
                <Icon name="plus" size={16} strokeWidth={2.3} />
                {tc('addJob')}
              </button>
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label={th('aria.userMenu')}
                className={clsx(s.avatarTrigger, menuOpen && s.avatarTriggerOpen)}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Avatar loggedIn={isLoggedIn} size={34} user={user} />
                <Icon
                  className={clsx(s.chevron, menuOpen && s.chevronOpen)}
                  name="chevronDown"
                  size={16}
                />
              </button>
              {user && (
                <UserMenuPopover
                  anchorEl={anchorEl}
                  user={user}
                  onClose={closeMenu}
                  onLogout={() => { closeMenu(); void signOut(); }}
                />
              )}
            </>
          ) : (
            <>
              <Link href="/auth" prefetch={false} className={s.ghostBtn}>
                {tc('logIn')}
              </Link>
              <Link href="/auth" prefetch={false} className={s.primaryBtn}>
                {tc('signUp')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
