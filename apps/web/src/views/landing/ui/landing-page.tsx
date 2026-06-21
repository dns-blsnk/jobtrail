import { LandingCta } from '@/widgets/landing-cta/ui/landing-cta';
import { LandingFeatures } from '@/widgets/landing-features/ui/landing-features';
import { LandingHero } from '@/widgets/landing-hero/ui/landing-hero';
import { LandingHowItWorks } from '@/widgets/landing-how-it-works/ui/landing-how-it-works';
import { LandingStats } from '@/widgets/landing-stats/ui/landing-stats';

export function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingCta />
    </>
  );
}
