import type { Metadata } from 'next';
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
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
