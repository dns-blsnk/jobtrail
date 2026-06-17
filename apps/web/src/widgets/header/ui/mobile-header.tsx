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

const NavDrawer = dynamic(
  () => import('./nav-drawer').then((m) => ({ default: m.NavDrawer })),
  { ssr: false }
);
const UserMenuDrawer = dynamic(
  () => import('./user-menu-drawer').then((m) => ({ default: m.UserMenuDrawer })),
  { ssr: false }
);

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

export function MobileHeader() {
  const tc = useTranslations('common');
  const th = useTranslations('header');
  const { user: profileUser, isLoggedIn } = useProfile();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openUserMenu = useCallback(() => {
    setDrawerOpen(false);
    setMenuOpen(true);
  }, []);

  const user = profileUser
    ? { name: profileUser.name ?? null, email: profileUser.email }
    : null;

  return (
    <>
      <header className={s.header}>
        <div className={clsx(s.inner, s.innerMobile)}>
          <div className={s.left}>
            <IconButton icon="menu" label={th('aria.openMenu')} onClick={() => setDrawerOpen(true)} />
            <Logo />
          </div>
          <div className={s.right}>
            {isLoggedIn ? (
              <>
                <button type="button" className={s.addBtn} aria-label={tc('addJob')}>
                  <Icon name="plus" size={18} strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  aria-label={th('aria.userMenu')}
                  className={clsx(s.avatarTrigger, s.avatarHideXs)}
                  onClick={openUserMenu}
                >
                  <Avatar loggedIn={isLoggedIn} size={34} user={user} />
                </button>
              </>
            ) : (
              <Link href="/auth" prefetch={false} className={s.outlineBtn}>
                {tc('logIn')}
              </Link>
            )}
          </div>
        </div>
      </header>

      <NavDrawer
        isLoggedIn={isLoggedIn}
        open={drawerOpen}
        user={user}
        onAvatarClick={openUserMenu}
        onClose={closeDrawer}
        onLinkClick={closeDrawer}
      />

      {user && (
        <UserMenuDrawer
          open={menuOpen}
          user={user}
          onClose={closeMenu}
          onLogout={() => { closeMenu(); void signOut(); }}
        />
      )}
    </>
  );
}
