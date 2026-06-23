import { HeroV2 } from '@/widgets/landing-v2/hero-v2/ui/hero-v2';
import { ProblemStrip } from '@/widgets/landing-v2/problem-strip/ui/problem-strip';
import { ResumeStrip } from '@/widgets/landing-v2/resume-strip/ui/resume-strip';
import { MatchingStrip } from '@/widgets/landing-v2/matching-strip/ui/matching-strip';
import { SkillCloudStrip } from '@/widgets/landing-v2/skill-cloud/ui/skill-cloud';
import { TrackingStrip } from '@/widgets/landing-v2/tracking-strip/ui/tracking-strip';
import { GapDemo } from '@/widgets/landing-v2/gap-demo/ui/gap-demo';
import { CtaV2 } from '@/widgets/landing-v2/cta-v2/ui/cta-v2';
import { RevealWrapper } from './reveal-wrapper';
import s from './landing-page-v2.module.scss';

export function LandingPageV2() {
  return (
    <div className={s.landingV2Root}>
      <HeroV2 />
      <RevealWrapper>
        <ProblemStrip />
      </RevealWrapper>
      <RevealWrapper>
        <ResumeStrip />
      </RevealWrapper>
      <RevealWrapper>
        <MatchingStrip />
      </RevealWrapper>
      <RevealWrapper>
        <SkillCloudStrip />
      </RevealWrapper>
      <RevealWrapper>
        <TrackingStrip />
      </RevealWrapper>
      <RevealWrapper>
        <GapDemo />
      </RevealWrapper>
      <RevealWrapper>
        <CtaV2 />
      </RevealWrapper>
    </div>
  );
}
