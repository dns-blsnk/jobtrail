import { redirect } from 'next/navigation';
import { auth } from '@/shared/auth/auth';
import { LandingPage } from '@/views/landing/ui/landing-page';

export default async function RootPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return <LandingPage />;
}
