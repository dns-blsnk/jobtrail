'use client';

import type { ComponentType } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useProfile } from '@/entities/session/model/use-profile';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { IconButton } from '@/shared/ui/icon-button/icon-button';
import s from './header.module.scss';

const UserMenuPopover = dynamic(
  () => import('./user-menu-popover').then((m) => ({ default: m.UserMenuPopover })),
  { ssr: false },
);

type IconComponent = ComponentType<{ sx?: object; className?: string }>;

interface NavItem {
  label: string;
  href: string;
  icon?: IconComponent;
}

function Logo() {
  const tc = useTranslations('common');
  return (
    <Link href="/" prefetch={false} className={s.logo}>
      <span className={s.logoMark} style={{ width: 30, height: 30 }}>
        <WorkOutlinedIcon sx={{ fontSize: 18 }} />
      </span>
      <span className={s.logoWord}>{tc('appName')}</span>
    </Link>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const NavIcon = item.icon;
  return (
    <Link href={item.href} prefetch={false} className={clsx(s.navLink, active && s.navLinkActive)}>
      {NavIcon && <NavIcon sx={{ fontSize: 17 }} />}
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

  const user = profileUser ? { name: profileUser.name ?? null, email: profileUser.email } : null;

  const navLogged: NavItem[] = [
    { label: th('nav.dashboard'), icon: DashboardOutlinedIcon, href: '/dashboard' },
    { label: th('nav.jobs'), icon: WorkOutlinedIcon, href: '/jobs' },
    { label: th('nav.applications'), icon: ArticleOutlinedIcon, href: '/applications' },
    { label: 'Resume', icon: ArticleOutlinedIcon, href: '/resume' },
    { label: th('nav.analytics'), icon: BarChartOutlinedIcon, href: '/analytics' },
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
              <IconButton icon={SearchOutlinedIcon} label={th('aria.search')} />
              <IconButton dot icon={NotificationsNoneOutlinedIcon} label={th('aria.notifications')} />
              <span className={s.divider} />
              <button type="button" className={s.addJobBtn}>
                <AddOutlinedIcon sx={{ fontSize: 16 }} />
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
                <KeyboardArrowDownOutlinedIcon
                  className={clsx(s.chevron, menuOpen && s.chevronOpen)}
                  sx={{ fontSize: 16 }}
                />
              </button>
              {user && (
                <UserMenuPopover
                  anchorEl={anchorEl}
                  user={user}
                  onClose={closeMenu}
                  onLogout={() => {
                    closeMenu();
                    void signOut();
                  }}
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
