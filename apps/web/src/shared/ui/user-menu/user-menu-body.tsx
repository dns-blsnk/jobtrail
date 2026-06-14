'use client';

import { useState } from 'react';
import { useTranslations } from '@/fsd-app/intl/intl-provider';
import { Icon, type IconName } from '@/shared/ui/icon/icon';
import { Avatar, type AvatarMode, type AvatarUser } from '@/shared/ui/avatar/avatar';
import { SegmentedControl } from '@/shared/ui/segmented-control/segmented-control';
import styles from './user-menu-body.module.scss';

interface UserMenuBodyProps {
  user: AvatarUser;
  avatarMode?: AvatarMode;
  tone?: 'light' | 'deep';
  onClose: () => void;
  onLogout: () => void;
}

export function UserMenuBody({ user, avatarMode = 'photo', tone = 'light', onClose, onLogout }: UserMenuBodyProps) {
  const t = useTranslations();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const deep = tone === 'deep';

  const themeOptions = [
    { label: t.userMenu.themeLight, value: 'light' as const },
    { label: t.userMenu.themeDark, value: 'dark' as const },
  ];

  return (
    <div className={`${styles.root} ${deep ? styles.deep : ''}`}>
      <div className={styles.identity}>
        <Avatar loggedIn avatarMode={avatarMode} size={44} user={user} />
        <div className={styles.identityText}>
          <span className={styles.name}>{user.name ?? t.userMenu.fallbackName}</span>
          <span className={styles.email}>{user.email}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <MenuRow icon="userCircle" label={t.userMenu.profile} onPress={onClose} />
        <MenuRow badge="12" icon="bookmark" label={t.userMenu.myApplications} onPress={onClose} />
        <MenuRow icon="creditCard" label={t.userMenu.subscription} meta={t.userMenu.subscriptionFree} onPress={onClose} />
        <MenuRow icon="settings" label={t.userMenu.settings} onPress={onClose} />
      </div>

      <div className={styles.divider} />

      <div className={styles.themeRow}>
        <span className={styles.themeLabel}>
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={19} strokeWidth={1.9} />
          {t.userMenu.theme}
        </span>
        <SegmentedControl
          options={themeOptions}
          value={theme}
          onChange={setTheme}
        />
      </div>

      <div className={styles.divider} />

      <MenuRow danger icon="logOut" label={t.userMenu.logOut} onPress={onLogout} />
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
      className={`${styles.row} ${danger ? styles.danger : ''}`}
      type="button"
      onClick={onPress}
    >
      <Icon className={styles.rowIcon} name={icon} size={19} strokeWidth={1.9} />
      <span className={styles.rowLabel}>{label}</span>
      {badge && <span className={styles.badge}>{badge}</span>}
      {meta && <span className={styles.meta}>{meta}</span>}
    </button>
  );
}
