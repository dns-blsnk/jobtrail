'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from '@/fsd-app/intl/intl-provider';
import styles from './profile-card.module.scss';

interface ProfileUser {
  email?: string | null;
  name?: string | null;
}

interface ProfileCardProps {
  user: ProfileUser;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const t = useTranslations();
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
        {t.profileCard.logOut}
      </button>
    </div>
  );
}
