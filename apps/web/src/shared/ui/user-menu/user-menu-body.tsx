'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon, type IconName } from '@/shared/ui/icon/icon';
import { Avatar, type AvatarMode, type AvatarUser } from '@/shared/ui/avatar/avatar';
import { SegmentedControl } from '@/shared/ui/segmented-control/segmented-control';
import { clsx } from 'clsx';
import s from './user-menu-body.module.scss';

interface UserMenuBodyProps {
  user: AvatarUser;
  avatarMode?: AvatarMode;
  tone?: 'light' | 'deep';
  onClose: () => void;
  onLogout: () => void;
}

export function UserMenuBody({ user, avatarMode = 'photo', tone = 'light', onClose, onLogout }: UserMenuBodyProps) {
  const t = useTranslations('userMenu');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const deep = tone === 'deep';

  const themeOptions = [
    { label: t('themeLight'), value: 'light' as const },
    { label: t('themeDark'), value: 'dark' as const },
  ];

  return (
    <div className={clsx(s.root, deep && s.deep)}>
      <div className={s.identity}>
        <Avatar loggedIn avatarMode={avatarMode} size={44} user={user} />
        <div className={s.identityText}>
          <span className={s.name}>{user.name ?? t('fallbackName')}</span>
          <span className={s.email}>{user.email}</span>
        </div>
      </div>

      <div className={s.divider} />

      <div className={s.group}>
        <MenuRow icon="userCircle" label={t('profile')} onPress={onClose} />
        <MenuRow badge="12" icon="bookmark" label={t('myApplications')} onPress={onClose} />
        <MenuRow icon="creditCard" label={t('subscription')} meta={t('subscriptionFree')} onPress={onClose} />
        <MenuRow icon="settings" label={t('settings')} onPress={onClose} />
      </div>

      <div className={s.divider} />

      <div className={s.themeRow}>
        <span className={s.themeLabel}>
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={19} strokeWidth={1.9} />
          {t('theme')}
        </span>
        <SegmentedControl
          options={themeOptions}
          value={theme}
          onChange={setTheme}
        />
      </div>

      <div className={s.divider} />

      <MenuRow danger icon="logOut" label={t('logOut')} onPress={onLogout} />
    </div>
  );
}

interface MenuRowProps {
  icon: IconName;
  label: string;
  badge?: string;
  meta?: string;
  danger?: boolean;
  onPress: () => void;
}

function MenuRow({ icon, label, badge, meta, danger, onPress }: MenuRowProps) {
  return (
    <button
      className={clsx(s.row, danger && s.danger)}
      type="button"
      onClick={onPress}
    >
      <Icon className={s.rowIcon} name={icon} size={19} strokeWidth={1.9} />
      <span className={s.rowLabel}>{label}</span>
      {badge && <span className={s.badge}>{badge}</span>}
      {meta && <span className={s.meta}>{meta}</span>}
    </button>
  );
}
