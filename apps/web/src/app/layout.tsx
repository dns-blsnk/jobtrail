import type { Metadata } from 'next';
import { JetBrains_Mono, Manrope, Space_Grotesk } from 'next/font/google';
import { Footer } from '@/widgets/footer/ui/footer';
import { Header } from '@/widgets/header/ui/header';
import { Providers } from './providers';
import './globals.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jobtrail — Job Search Tracker',
  description: 'Track your job applications in one place',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
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
