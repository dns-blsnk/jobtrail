import { AuthFormSection } from '@/widgets/auth-form/ui/auth-form-section';
import styles from './auth-page.module.scss';

export function AuthPage() {
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
