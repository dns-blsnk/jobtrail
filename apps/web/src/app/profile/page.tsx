import { getTranslations } from 'next-intl/server';
import { withAuthGuard } from '@/fsd-app/auth/with-auth-guard';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import s from './page.module.scss';

export default withAuthGuard(async ({ session }) => {
  const t = await getTranslations('profilePage');
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.pageHeader}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>
        <ProfileCard user={session.user} />
      </div>
    </div>
  );
});
