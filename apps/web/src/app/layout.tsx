import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Job Search Tracker',
  description: 'Track your job applications in one place',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
