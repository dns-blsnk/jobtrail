import { getTranslations } from 'next-intl/server';
import { AuthFormSection } from '@/widgets/auth-form/ui/auth-form-section';
import s from './auth-page.module.scss';

export async function AuthPage() {
  const t = await getTranslations('authPage');
  return (
    <main className={s.root}>
      <div className={s.inner}>
        <div className={s.logo}>
          <div aria-hidden className={s.logoMark}>{t('logoMark')}</div>
          <span className={s.logoName}>{t('logoName')}</span>
        </div>
        <AuthFormSection />
      </div>
    </main>
  );
}
