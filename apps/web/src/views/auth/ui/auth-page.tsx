'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSessionStore } from '@/entities/session/model/session-store';
import { AuthFormSection } from '@/widgets/auth-form/ui/auth-form-section';
import styles from './auth-page.module.scss';

export function AuthPage() {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);
  const hasHydrated = useSessionStore((state) => state._hasHydrated);

  useEffect(() => {
    if (hasHydrated && user) {
      router.replace('/profile');
    }
  }, [hasHydrated, user, router]);

  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoMark} aria-hidden>JT</div>
          <span className={styles.logoName}>Job Tracker</span>
        </div>
        <AuthFormSection />
      </div>
    </main>
  );
}
