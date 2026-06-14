'use client';

import Link from 'next/link';
import { type RefObject, useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useProfile } from '@/entities/session/model/use-profile';
import { Icon } from '@/shared/ui/icon/icon';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { IconButton } from '@/shared/ui/icon-button/icon-button';
import { UserMenuBody } from '@/shared/ui/user-menu/user-menu-body';
import { useDismiss } from '@/shared/lib/hooks/use-dismiss';
import { useMobile } from '@/shared/lib/hooks/use-mobile';
import { BottomSheet } from './bottom-sheet';
import { Dropdown } from './dropdown';
import { NavDrawer } from './nav-drawer';
import styles from './header.module.scss';

export function Header() {
  const tc = useTranslations('common');
  const th = useTranslations('header');
  const { user: profileUser, isLoggedIn } = useProfile();
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const avatarWrapRef = useDismiss(menuOpen, closeMenu);

  const user = profileUser
    ? { name: profileUser.name ?? null, email: profileUser.email }
    : null;

  const navLogged = [
    { label: th('nav.dashboard'), icon: 'layoutDashboard' as const, href: '/dashboard' },
    { label: th('nav.jobs'), icon: 'briefcase' as const, href: '/jobs' },
    { label: th('nav.applications'), icon: 'fileText' as const, href: '/applications' },
    { label: th('nav.analytics'), icon: 'barChart' as const, href: '/analytics' },
  ];

  const navGuest = [
    { label: th('nav.features'), href: '/#features' },
    { label: th('nav.pricing'), href: '/#pricing' },
    { label: th('nav.about'), href: '/#about' },
  ];

  const navItems = isLoggedIn ? navLogged : navGuest;

  if (isMobile) {
    return (
      <header className={styles.header}>
        <div className={`${styles.inner} ${styles.innerMobile}`}>
          <div className={styles.left}>
            <IconButton icon="menu" label={th('aria.openMenu')} onClick={() => setDrawerOpen(true)} />
            <Logo />
          </div>

          <div className={styles.right}>
            {isLoggedIn ? (
              <>
                <button aria-label={th('aria.addJob')} className={styles.addBtn} type="button">
                  <Icon name="plus" size={18} strokeWidth={2} />
                </button>
                <button
                  aria-label={th('aria.userMenu')}
                  className={styles.avatarTrigger}
                  type="button"
                  onClick={() => setMenuOpen(true)}
                >
                  <Avatar avatarMode="initials" loggedIn={isLoggedIn} size={36} user={user} />
                </button>
              </>
            ) : (
              <button className={styles.outlineBtn} type="button" onClick={() => setDrawerOpen(true)}>
                {tc('logIn')}
              </button>
            )}
          </div>
        </div>

        <NavDrawer label={th('drawer.navLabel')} open={drawerOpen} onClose={closeDrawer}>
          <div className={styles.drawerHeader}>
            <Logo />
            <IconButton icon="x" label={th('aria.closeMenu')} onClick={closeDrawer} />
          </div>
          <nav className={styles.drawerNav}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                className={styles.drawerLink}
                href={item.href}
                onClick={closeDrawer}
              >
                {'icon' in item && typeof item.icon === 'string' && (
                  <Icon className={styles.drawerLinkIcon} name={item.icon as import('@/shared/ui/icon/icon').IconName} size={19} strokeWidth={1.9} />
                )}
                {item.label}
                <Icon className={styles.drawerChevron} name="chevronRight" size={16} />
              </Link>
            ))}
          </nav>
          <div className={styles.drawerFooter}>
            {isLoggedIn ? (
              <button className={styles.primaryBtn} type="button">
                <Icon name="plus" size={16} strokeWidth={2} />
                {tc('addJob')}
              </button>
            ) : (
              <>
                <Link className={styles.primaryBtn} href="/auth" onClick={closeDrawer}>
                  {tc('signUp')}
                </Link>
                <Link className={`${styles.outlineBtn} ${styles.fullWidth}`} href="/auth" onClick={closeDrawer}>
                  {tc('logIn')}
                </Link>
              </>
            )}
          </div>
        </NavDrawer>

        <BottomSheet label={th('drawer.userMenuLabel')} open={menuOpen} onClose={closeMenu}>
          {user && (
            <UserMenuBody
              avatarMode="initials"
              user={user}
              onClose={closeMenu}
              onLogout={() => { closeMenu(); void signOut(); }}
            />
          )}
        </BottomSheet>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Logo />
          <nav className={styles.nav}>
            {navItems.map((item, i) => (
              <NavLink key={item.label} active={isLoggedIn && i === 0} item={item} />
            ))}
          </nav>
        </div>

        <div className={styles.right}>
          {isLoggedIn ? (
            <>
              <IconButton icon="search" label={th('aria.search')} />
              <IconButton dot icon="bell" label={th('aria.notifications')} />
              <span className={styles.divider} />
              <button className={styles.primaryBtn} type="button">
                <Icon name="plus" size={18} strokeWidth={2} />
                {tc('addJob')}
              </button>
              <div ref={avatarWrapRef as RefObject<HTMLDivElement>} className={styles.avatarWrap}>
                <button
                  aria-expanded={menuOpen}
                  aria-label={th('aria.userMenu')}
                  className={`${styles.avatarTrigger} ${menuOpen ? styles.avatarTriggerOpen : ''}`}
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <Avatar avatarMode="initials" loggedIn={isLoggedIn} size={34} user={user} />
                  <Icon
                    className={`${styles.chevron} ${menuOpen ? styles.chevronOpen : ''}`}
                    name="chevronDown"
                    size={16}
                  />
                </button>
                <Dropdown open={menuOpen}>
                  {user && (
                    <UserMenuBody
                      avatarMode="initials"
                      user={user}
                      onClose={closeMenu}
                      onLogout={() => { closeMenu(); void signOut(); }}
                    />
                  )}
                </Dropdown>
              </div>
            </>
          ) : (
            <>
              <Link className={styles.ghostBtn} href="/auth">
                {tc('logIn')}
              </Link>
              <Link className={styles.primaryBtn} href="/auth">
                {tc('signUp')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

interface NavItem {
  label: string;
  href: string;
  icon?: 'layoutDashboard' | 'briefcase' | 'fileText' | 'barChart';
}

function Logo({ size = 30 }: { size?: number }) {
  const tc = useTranslations('common');
  return (
    <Link aria-label={tc('logoAriaLabel')} className={styles.logo} href="/">
      <span className={styles.logoMark} style={{ width: size, height: size }}>
        <Icon name="briefcase" size={Math.round(size * 0.6)} strokeWidth={2.1} />
      </span>
      <span className={styles.logoWord}>{tc('appName')}</span>
    </Link>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
      href={item.href}
    >
      {item.icon && <Icon name={item.icon} size={17} strokeWidth={1.9} />}
      {item.label}
    </Link>
  );
}
