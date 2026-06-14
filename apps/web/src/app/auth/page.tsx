import { getTranslations } from 'next-intl/server';
import { AuthFormSection } from '@/widgets/auth-form/ui/auth-form-section';
import styles from './page.module.scss';

export default async function AuthRoute() {
  const t = await getTranslations('authPage');
  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div aria-hidden className={styles.logoMark}>{t('logoMark')}</div>
          <span className={styles.logoName}>{t('logoName')}</span>
        </div>
        <AuthFormSection />
      </div>
    </main>
  );
}
