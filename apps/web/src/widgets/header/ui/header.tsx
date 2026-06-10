'use client';

import Link from 'next/link';
import { type RefObject, useCallback, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
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

const NAV_LOGGED = [
  { label: 'Dashboard', icon: 'layoutDashboard' as const, href: '/dashboard' },
  { label: 'Jobs', icon: 'briefcase' as const, href: '/jobs' },
  { label: 'Applications', icon: 'fileText' as const, href: '/applications' },
  { label: 'Analytics', icon: 'barChart' as const, href: '/analytics' },
];

const NAV_GUEST = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/#about' },
];

export function Header() {
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

  const navItems = loggedIn ? NAV_LOGGED : NAV_GUEST;

  if (isMobile) {
    return (
      <header className={styles.header}>
        <div className={`${styles.inner} ${styles.innerMobile}`}>
          <div className={styles.left}>
            <IconButton icon="menu" label="Open menu" onClick={() => setDrawerOpen(true)} />
            <Logo size={28} />
          </div>

          <div className={styles.right}>
            {loggedIn ? (
              <>
                <button aria-label="Add job" className={styles.addBtn} type="button">
                  <Icon name="plus" size={18} strokeWidth={2} />
                </button>
                <button
                  aria-label="User menu"
                  className={styles.avatarTrigger}
                  type="button"
                  onClick={() => setMenuOpen(true)}
                >
                  <Avatar avatarMode="initials" loggedIn={loggedIn} size={36} user={user} />
                </button>
              </>
            ) : (
              <button className={styles.outlineBtn} type="button" onClick={() => setDrawerOpen(true)}>
                Log in
              </button>
            )}
          </div>
        </div>

        <NavDrawer label="Navigation" open={drawerOpen} onClose={closeDrawer}>
          <div className={styles.drawerHeader}>
            <Logo size={28} />
            <IconButton icon="x" label="Close menu" onClick={closeDrawer} />
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
                Add job
              </button>
            ) : (
              <>
                <Link className={styles.primaryBtn} href="/auth" onClick={closeDrawer}>
                  Sign up
                </Link>
                <Link className={`${styles.outlineBtn} ${styles.fullWidth}`} href="/auth" onClick={closeDrawer}>
                  Log in
                </Link>
              </>
            )}
          </div>
        </NavDrawer>

        <BottomSheet label="User menu" open={menuOpen} onClose={closeMenu}>
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
              <IconButton icon="search" label="Search" />
              <IconButton dot icon="bell" label="Notifications" />
              <span className={styles.divider} />
              <button className={styles.primaryBtn} type="button">
                <Icon name="plus" size={18} strokeWidth={2} />
                Add job
              </button>
              <div ref={avatarWrapRef as RefObject<HTMLDivElement>} className={styles.avatarWrap}>
                <button
                  aria-expanded={menuOpen}
                  aria-label="User menu"
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
                Log in
              </Link>
              <Link className={styles.primaryBtn} href="/auth">
                Sign up
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
  return (
    <Link aria-label="Jobtrail home" className={styles.logo} href="/">
      <span className={styles.logoMark} style={{ width: size, height: size }}>
        <Icon name="briefcase" size={Math.round(size * 0.6)} strokeWidth={2.1} />
      </span>
      <span className={styles.logoWord}>Jobtrail</span>
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
