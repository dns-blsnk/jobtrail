'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSessionStore } from '@/entities/session/model/session-store';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import styles from './profile-page.module.scss';

export function ProfilePage() {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);
  const hasHydrated = useSessionStore((state) => state._hasHydrated);
  const clearSession = useSessionStore((state) => state.clearSession);

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace('/auth');
    }
  }, [hasHydrated, user, router]);

  if (!hasHydrated || !user) {
    return <Spinner />;
  }

  const handleLogout = () => {
    clearSession();
    router.replace('/auth');
  };

  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.brand} aria-hidden>*</div>
          <h1 className={styles.title}>My Profile</h1>
        </div>
        <ProfileCard user={user} onLogout={handleLogout} />
      </div>
    </main>
  );
}
