import type { Session } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ProfilePageClient } from './profile-page-client';

interface ProfilePageProps {
  session: Session;
}

export async function ProfilePage({ session }: ProfilePageProps) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider
      messages={{
        profileCard: messages.profileCard,
        profilePage: messages.profilePage,
      }}
    >
      <ProfilePageClient user={session.user} />
    </NextIntlClientProvider>
  );
}
