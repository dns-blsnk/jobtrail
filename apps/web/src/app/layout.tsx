import type { Metadata } from 'next';
import { Footer } from '@/widgets/footer/ui/footer';
import { Header } from '@/widgets/header/ui/header';
import { Providers } from './providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Jobtrail — Job Search Tracker',
  description: 'Track your job applications in one place',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
