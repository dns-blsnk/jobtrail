import type { Session } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import s from './profile-page.module.scss';

interface ProfilePageProps {
  session: Session;
}

export async function ProfilePage({ session }: ProfilePageProps) {
  const [t, messages] = await Promise.all([getTranslations('profilePage'), getMessages()]);
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.pageHeader}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>
        <NextIntlClientProvider messages={{ profileCard: messages.profileCard }}>
          <ProfileCard user={session.user} />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
