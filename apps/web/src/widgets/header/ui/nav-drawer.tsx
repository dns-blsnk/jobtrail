'use client';

import type { ComponentType } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
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

type IconComponent = ComponentType<{ sx?: object; className?: string }>;

interface DrawerLinkProps {
  href: string;
  label: string;
  icon?: IconComponent;
  onClick: () => void;
}

function DrawerLink({ href, label, icon: NavIcon, onClick }: DrawerLinkProps) {
  return (
    <Link href={href} prefetch={false} className={s.link} onClick={onClick}>
      {NavIcon && <NavIcon className={s.linkIcon} sx={{ fontSize: 18 }} />}
      {label}
    </Link>
  );
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

export function NavDrawer({
  open,
  isLoggedIn,
  user,
  onClose,
  onLinkClick,
  onAvatarClick,
}: NavDrawerProps) {
  const tc = useTranslations('common');
  const th = useTranslations('header');

  return (
    <>
      <div aria-hidden className={clsx(s.scrim, open && s.scrimVisible)} onClick={onClose} />

      <div
        role="dialog"
        aria-label={th('drawer.navLabel')}
        className={clsx(s.drawer, open && s.open)}
      >
        <div className={s.drawerHead}>
          <Logo />
          <button
            type="button"
            aria-label={th('aria.closeMenu')}
            className={s.closeBtn}
            onClick={onClose}
          >
            <CloseOutlinedIcon sx={{ fontSize: 20 }} />
          </button>
        </div>

        {isLoggedIn && user && (
          <button type="button" className={s.avatarSection} onClick={onAvatarClick}>
            <Avatar loggedIn size={42} user={user} />
            <div className={s.avatarInfo}>
              <span className={s.avatarName}>{user.name ?? tc('appName')}</span>
              <span className={s.avatarEmail}>{user.email}</span>
            </div>
            <ChevronRightOutlinedIcon className={s.avatarChevron} sx={{ fontSize: 16 }} />
          </button>
        )}

        <nav className={s.nav} aria-label="Main navigation">
          {isLoggedIn ? (
            <>
              <DrawerLink
                href="/dashboard"
                icon={DashboardOutlinedIcon}
                label={th('nav.dashboard')}
                onClick={onLinkClick}
              />
              <DrawerLink
                href="/jobs"
                icon={WorkOutlinedIcon}
                label={th('nav.jobs')}
                onClick={onLinkClick}
              />
              <DrawerLink
                href="/applications"
                icon={ArticleOutlinedIcon}
                label={th('nav.applications')}
                onClick={onLinkClick}
              />
              <DrawerLink href="/resume" icon={ArticleOutlinedIcon} label="Resume" onClick={onLinkClick} />
              <DrawerLink
                href="/analytics"
                icon={BarChartOutlinedIcon}
                label={th('nav.analytics')}
                onClick={onLinkClick}
              />
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
          <DrawerLink href="/blog" icon={BookmarkBorderOutlinedIcon} label="Blog" onClick={onLinkClick} />
          <DrawerLink href="/help" label="Help" onClick={onLinkClick} />
          <DrawerLink href="/contact" icon={MailOutlinedIcon} label="Contact" onClick={onLinkClick} />
        </nav>

        <div className={s.spacer} />

        <div className={s.footer}>
          {isLoggedIn ? (
            <button type="button" className={s.addJobBtn}>
              <AddOutlinedIcon sx={{ fontSize: 16 }} />
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
