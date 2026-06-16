import type { Metadata } from 'next';
import '@job-search-tracker/tokens/css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { auth } from '@/shared/auth/auth';
import { Footer } from '@/widgets/footer/ui/footer';
import { Header } from '@/widgets/header/ui/header';
import { Providers } from './providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Jobtrail — Job Search Tracker',
  description: 'Track your job applications in one place',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [session, locale, messages] = await Promise.all([auth(), getLocale(), getMessages()]);

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <Providers session={session}>
              <Header />
              <main>{children}</main>
              <Footer />
            </Providers>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
