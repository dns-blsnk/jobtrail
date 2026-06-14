import { en } from '@/fsd-app/intl/messages/en';
import { AuthFormSection } from '@/widgets/auth-form/ui/auth-form-section';
import styles from './auth-page.module.scss';

export function AuthPage() {
  const t = en;
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoMark} aria-hidden>{t.auth.page.logoMark}</div>
          <span className={styles.logoName}>{t.auth.page.logoName}</span>
        </div>
        <AuthFormSection />
      </div>
    </main>
  );
}
