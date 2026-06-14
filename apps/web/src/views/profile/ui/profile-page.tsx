'use client';

import { signOut, useSession } from 'next-auth/react';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import styles from './profile-page.module.scss';

export function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Spinner />;
  if (!session) return null;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.logoMark} aria-hidden>JT</div>
          <span className={styles.logoName}>Job Tracker</span>
        </div>
        <ProfileCard
          user={session.user}
          onLogout={() => void signOut({ callbackUrl: '/auth' })}
        />
      </div>
    </div>
  );
}
