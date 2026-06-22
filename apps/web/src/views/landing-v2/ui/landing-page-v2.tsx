import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { HeroV2 } from '@/widgets/landing-v2/hero-v2/ui/hero-v2';
import { ProblemStrip } from '@/widgets/landing-v2/problem-strip/ui/problem-strip';
import { FeaturesDeep } from '@/widgets/landing-v2/features-deep/ui/features-deep';
import { GapDemo } from '@/widgets/landing-v2/gap-demo/ui/gap-demo';
import { CtaV2 } from '@/widgets/landing-v2/cta-v2/ui/cta-v2';
import { RevealWrapper } from './reveal-wrapper';
import s from './landing-page-v2.module.scss';

export async function LandingPageV2() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={{ landingV2Page: messages['landingV2Page'] }}>
      <div className={s.landingV2Root}>
        <HeroV2 />
        <RevealWrapper>
          <ProblemStrip />
        </RevealWrapper>
        <RevealWrapper>
          <FeaturesDeep />
        </RevealWrapper>
        <RevealWrapper>
          <GapDemo />
        </RevealWrapper>
        <RevealWrapper>
          <CtaV2 />
        </RevealWrapper>
      </div>
    </NextIntlClientProvider>
  );
}
