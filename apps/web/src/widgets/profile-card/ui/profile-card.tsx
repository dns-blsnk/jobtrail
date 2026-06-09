'use client';

import type { IUser } from '@job-search-tracker/types';
import styles from './profile-card.module.scss';

interface ProfileCardProps {
  user: IUser;
  onLogout: () => void;
}

export function ProfileCard({ user, onLogout }: ProfileCardProps) {
  const displayName = user.name ?? user.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={styles.card}>
      <div aria-hidden className={styles.avatar}>{initial}</div>
      <p className={styles.name}>{displayName}</p>
      {user.name && <p className={styles.email}>{user.email}</p>}
      <button className={styles.logoutButton} type="button" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}
