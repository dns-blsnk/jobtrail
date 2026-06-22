import { LandingCtaV2 } from '@/widgets/landing-cta-v2/ui/landing-cta-v2';
import { LandingFeaturesV2 } from '@/widgets/landing-features-v2/ui/landing-features-v2';
import { LandingHeroV2 } from '@/widgets/landing-hero-v2/ui/landing-hero-v2';
import { LandingHowItWorksV2 } from '@/widgets/landing-how-it-works-v2/ui/landing-how-it-works-v2';

export function LandingPage() {
  return (
    <>
      <LandingHeroV2 />
      <LandingFeaturesV2 />
      <LandingHowItWorksV2 />
      <LandingCtaV2 />
    </>
  );
}
