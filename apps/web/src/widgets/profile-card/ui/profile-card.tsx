'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import styles from './profile-card.module.scss';

interface ProfileUser {
  email?: string | null;
  name?: string | null;
}

interface ProfileCardProps {
  user: ProfileUser;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const t = useTranslations('profileCard');
  const displayName = user.name ?? user.email ?? '';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={styles.card}>
      <div aria-hidden className={styles.avatar}>{initial}</div>
      <p className={styles.name}>{displayName}</p>
      {user.name && user.email && <p className={styles.email}>{user.email}</p>}
      <button
        className={styles.logoutButton}
        type="button"
        onClick={() => void signOut({ callbackUrl: '/auth' })}
      >
        {t('logOut')}
      </button>
    </div>
  );
}
