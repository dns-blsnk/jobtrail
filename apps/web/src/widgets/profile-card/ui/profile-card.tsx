'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import s from './profile-card.module.scss';

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
    <div className={s.card}>
      <div aria-hidden className={s.avatar}>{initial}</div>
      <p className={s.name}>{displayName}</p>
      {user.name && user.email && <p className={s.email}>{user.email}</p>}
      <button
        className={s.logoutButton}
        type="button"
        onClick={() => void signOut({ callbackUrl: '/auth' })}
      >
        {t('logOut')}
      </button>
    </div>
  );
}
