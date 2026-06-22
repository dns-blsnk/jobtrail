import { LandingCta } from '@/widgets/landing-cta/ui/landing-cta';
import { LandingFeatures } from '@/widgets/landing-features/ui/landing-features';
import { LandingHeroV2 } from '@/widgets/landing-hero-v2/ui/landing-hero-v2';
import { LandingHowItWorks } from '@/widgets/landing-how-it-works/ui/landing-how-it-works';
import { LandingStats } from '@/widgets/landing-stats/ui/landing-stats';

export function LandingPage() {
  return (
    <>
      <LandingHeroV2 />
      <LandingStats />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingCta />
    </>
  );
}
