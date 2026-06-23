import { LandingHero } from '@/widgets/landing-hero/ui/landing-hero';
import { LandingFeatures } from '@/widgets/landing-features/ui/landing-features';
import { LandingHowItWorks } from '@/widgets/landing-how-it-works/ui/landing-how-it-works';
import { LandingCta } from '@/widgets/landing-cta/ui/landing-cta';

export function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingCta />
    </>
  );
}
