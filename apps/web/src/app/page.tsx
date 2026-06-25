import { redirect } from 'next/navigation';
import { auth } from '@/shared/auth/auth';
import { LandingPage } from '@/views/landing/ui/landing-page';
import { LandingPageV2 } from '@/views/landing-v2/ui/landing-page-v2';
import { landingVariantFlag } from '@/flags';

export default async function RootPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');

  const variant = await landingVariantFlag();

  return variant === 'v2' ? <LandingPageV2 /> : <LandingPage />;
}
