import type { Session } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import s from './profile-page.module.scss';

interface ProfilePageProps {
  session: Session;
}

export async function ProfilePage({ session }: ProfilePageProps) {
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
}
