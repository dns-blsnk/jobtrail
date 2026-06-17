'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Drawer from '@mui/material/Drawer';
import Popover from '@mui/material/Popover';
import { useProfile } from '@/entities/session/model/use-profile';
import { Icon } from '@/shared/ui/icon/icon';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { IconButton } from '@/shared/ui/icon-button/icon-button';
import { UserMenuBody } from '@/shared/ui/user-menu/user-menu-body';
import { useMobile } from '@/shared/lib/hooks/use-mobile';
import { NavDrawer } from './nav-drawer';
import { clsx } from 'clsx';
import s from './header.module.scss';

export function Header() {
  const tc = useTranslations('common');
  const th = useTranslations('header');
  const { user: profileUser, isLoggedIn } = useProfile();
  const isMobile = useMobile();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);
  const closeMenu = useCallback(() => setAnchorEl(null), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

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
      <header className={s.header}>
        <div className={clsx(s.inner, s.innerMobile)}>
          <div className={s.left}>
            <IconButton icon="menu" label={th('aria.openMenu')} onClick={() => setDrawerOpen(true)} />
            <Logo />
          </div>

          <div className={s.right}>
            {isLoggedIn ? (
              <>
                <button aria-label={th('aria.addJob')} className={s.addBtn} type="button">
                  <Icon name="plus" size={18} strokeWidth={2} />
                </button>
                <button
                  aria-label={th('aria.userMenu')}
                  className={s.avatarTrigger}
                  type="button"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <Avatar loggedIn={isLoggedIn} size={36} user={user} />
                </button>
              </>
            ) : (
              <button className={s.outlineBtn} type="button" onClick={() => setDrawerOpen(true)}>
                {tc('logIn')}
              </button>
            )}
          </div>
        </div>

        <NavDrawer label={th('drawer.navLabel')} open={drawerOpen} onClose={closeDrawer}>
          <div className={s.drawerHeader}>
            <Logo />
            <IconButton icon="x" label={th('aria.closeMenu')} onClick={closeDrawer} />
          </div>
          <nav className={s.drawerNav}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                className={s.drawerLink}
                href={item.href}
                onClick={closeDrawer}
              >
                {'icon' in item && typeof item.icon === 'string' && (
                  <Icon className={s.drawerLinkIcon} name={item.icon as import('@/shared/ui/icon/icon').IconName} size={19} strokeWidth={1.9} />
                )}
                {item.label}
                <Icon className={s.drawerChevron} name="chevronRight" size={16} />
              </Link>
            ))}
          </nav>
          <div className={s.drawerFooter}>
            {isLoggedIn ? (
              <button className={s.primaryBtn} type="button">
                <Icon name="plus" size={16} strokeWidth={2} />
                {tc('addJob')}
              </button>
            ) : (
              <>
                <Link className={s.primaryBtn} href="/auth" onClick={closeDrawer}>
                  {tc('signUp')}
                </Link>
                <Link className={clsx(s.outlineBtn, s.fullWidth)} href="/auth" onClick={closeDrawer}>
                  {tc('logIn')}
                </Link>
              </>
            )}
          </div>
        </NavDrawer>

        <Drawer
          anchor="bottom"
          open={menuOpen}
          onClose={closeMenu}
          slotProps={{
            paper: { sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '85vh' } },
          }}
        >
          {user && (
            <UserMenuBody
              user={user}
              onClose={closeMenu}
              onLogout={() => { closeMenu(); void signOut(); }}
            />
          )}
        </Drawer>
      </header>
    );
  }

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <Logo />
          <nav className={s.nav}>
            {navItems.map((item, i) => (
              <NavLink key={item.label} active={isLoggedIn && i === 0} item={item} />
            ))}
          </nav>
        </div>

        <div className={s.right}>
          {isLoggedIn ? (
            <>
              <IconButton icon="search" label={th('aria.search')} />
              <IconButton dot icon="bell" label={th('aria.notifications')} />
              <span className={s.divider} />
              <button className={s.primaryBtn} type="button">
                <Icon name="plus" size={18} strokeWidth={2} />
                {tc('addJob')}
              </button>
              <>
                <button
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  aria-label={th('aria.userMenu')}
                  className={clsx(s.avatarTrigger, menuOpen && s.avatarTriggerOpen)}
                  type="button"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <Avatar loggedIn={isLoggedIn} size={34} user={user} />
                  <Icon
                    className={clsx(s.chevron, menuOpen && s.chevronOpen)}
                    name="chevronDown"
                    size={16}
                  />
                </button>
                <Popover
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  open={menuOpen}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  slotProps={{ paper: { sx: { width: 288, mt: 1.25, borderRadius: 2 } } }}
                  onClose={closeMenu}
                >
                  {user && (
                    <UserMenuBody
                      user={user}
                      onClose={closeMenu}
                      onLogout={() => { closeMenu(); void signOut(); }}
                    />
                  )}
                </Popover>
              </>
            </>
          ) : (
            <>
              <Link className={s.ghostBtn} href="/auth">
                {tc('logIn')}
              </Link>
              <Link className={s.primaryBtn} href="/auth">
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
    <Link aria-label={tc('logoAriaLabel')} className={s.logo} href="/">
      <span className={s.logoMark} style={{ width: size, height: size }}>
        <Icon name="briefcase" size={Math.round(size * 0.6)} strokeWidth={2.1} />
      </span>
      <span className={s.logoWord}>{tc('appName')}</span>
    </Link>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      className={clsx(s.navLink, active && s.navLinkActive)}
      href={item.href}
    >
      {item.icon && <Icon name={item.icon} size={17} strokeWidth={1.9} />}
      {item.label}
    </Link>
  );
}
