'use client';

import Link from 'next/link';
import { type RefObject, useCallback, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from '@/fsd-app/intl/intl-provider';
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
  const t = useTranslations();
  const { data: session, status } = useSession();
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const avatarWrapRef = useDismiss(menuOpen, closeMenu);

  const loggedIn = status === 'authenticated';
  const user = session?.user
    ? { name: session.user.name ?? null, email: session.user.email ?? '' }
    : null;

  const navLogged = [
    { label: t.header.nav.dashboard, icon: 'layoutDashboard' as const, href: '/dashboard' },
    { label: t.header.nav.jobs, icon: 'briefcase' as const, href: '/jobs' },
    { label: t.header.nav.applications, icon: 'fileText' as const, href: '/applications' },
    { label: t.header.nav.analytics, icon: 'barChart' as const, href: '/analytics' },
  ];

  const navGuest = [
    { label: t.header.nav.features, href: '/#features' },
    { label: t.header.nav.pricing, href: '/#pricing' },
    { label: t.header.nav.about, href: '/#about' },
  ];

  const navItems = loggedIn ? navLogged : navGuest;

  if (isMobile) {
    return (
      <header className={styles.header}>
        <div className={`${styles.inner} ${styles.innerMobile}`}>
          <div className={styles.left}>
            <IconButton icon="menu" label={t.header.aria.openMenu} onClick={() => setDrawerOpen(true)} />
            <Logo size={28} />
          </div>

          <div className={styles.right}>
            {loggedIn ? (
              <>
                <button aria-label={t.header.aria.addJob} className={styles.addBtn} type="button">
                  <Icon name="plus" size={18} strokeWidth={2} />
                </button>
                <button
                  aria-label={t.header.aria.userMenu}
                  className={styles.avatarTrigger}
                  type="button"
                  onClick={() => setMenuOpen(true)}
                >
                  <Avatar avatarMode="initials" loggedIn={loggedIn} size={36} user={user} />
                </button>
              </>
            ) : (
              <button className={styles.outlineBtn} type="button" onClick={() => setDrawerOpen(true)}>
                {t.common.logIn}
              </button>
            )}
          </div>
        </div>

        <NavDrawer label={t.header.drawer.navLabel} open={drawerOpen} onClose={closeDrawer}>
          <div className={styles.drawerHeader}>
            <Logo size={28} />
            <IconButton icon="x" label={t.header.aria.closeMenu} onClick={closeDrawer} />
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
            {loggedIn ? (
              <button className={styles.primaryBtn} type="button">
                <Icon name="plus" size={16} strokeWidth={2} />
                {t.common.addJob}
              </button>
            ) : (
              <>
                <Link className={styles.primaryBtn} href="/auth" onClick={closeDrawer}>
                  {t.common.signUp}
                </Link>
                <Link className={`${styles.outlineBtn} ${styles.fullWidth}`} href="/auth" onClick={closeDrawer}>
                  {t.common.logIn}
                </Link>
              </>
            )}
          </div>
        </NavDrawer>

        <BottomSheet label={t.header.drawer.userMenuLabel} open={menuOpen} onClose={closeMenu}>
          {user && (
            <UserMenuBody
              avatarMode="initials"
              user={user}
              onClose={closeMenu}
              onLogout={() => { closeMenu(); signOut(); }}
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
              <NavLink key={item.label} active={loggedIn && i === 0} item={item} />
            ))}
          </nav>
        </div>

        <div className={styles.right}>
          {loggedIn ? (
            <>
              <IconButton icon="search" label={t.header.aria.search} />
              <IconButton dot icon="bell" label={t.header.aria.notifications} />
              <span className={styles.divider} />
              <button className={styles.primaryBtn} type="button">
                <Icon name="plus" size={18} strokeWidth={2} />
                {t.common.addJob}
              </button>
              <div ref={avatarWrapRef as RefObject<HTMLDivElement>} className={styles.avatarWrap}>
                <button
                  aria-expanded={menuOpen}
                  aria-label={t.header.aria.userMenu}
                  className={`${styles.avatarTrigger} ${menuOpen ? styles.avatarTriggerOpen : ''}`}
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <Avatar avatarMode="initials" loggedIn={loggedIn} size={34} user={user} />
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
                      onLogout={() => { closeMenu(); signOut(); }}
                    />
                  )}
                </Dropdown>
              </div>
            </>
          ) : (
            <>
              <Link className={styles.ghostBtn} href="/auth">
                {t.common.logIn}
              </Link>
              <Link className={styles.primaryBtn} href="/auth">
                {t.common.signUp}
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
  const t = useTranslations();
  return (
    <Link aria-label={t.common.logoAriaLabel} className={styles.logo} href="/">
      <span className={styles.logoMark} style={{ width: size, height: size }}>
        <Icon name="briefcase" size={Math.round(size * 0.6)} strokeWidth={2.1} />
      </span>
      <span className={styles.logoWord}>{t.common.appName}</span>
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
