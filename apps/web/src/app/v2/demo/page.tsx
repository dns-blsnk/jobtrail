import { ParticleAssembly } from '@/widgets/landing-v2/hero-variants/ui/particle-assembly';
import { SkillBubbles } from '@/widgets/landing-v2/hero-variants/ui/skill-bubbles';
import { InkScanner } from '@/widgets/landing-v2/hero-variants/ui/ink-scanner';
import s from '@/widgets/landing-v2/hero-variants/ui/hero-variants-page.module.scss';

export default function HeroDemoPage() {
  return (
    <div className={s.page}>
      <div className={s.section}>
        <div className={s.sectionHead}>
          <p className={s.eyebrow}>01 · Particle Assembly</p>
          <h2 className={s.title}>Particles form a job match card</h2>
          <p className={s.sub}>
            Dots float freely and converge to assemble a company card with your match score.
            Cycles through GitHub, Figma, Shopify, Discord. Move your cursor to push particles.
          </p>
        </div>
        <ParticleAssembly />
      </div>

      <div className={s.section}>
        <div className={s.sectionHead}>
          <p className={s.eyebrow}>02 · Skill Bubbles</p>
          <h2 className={s.title}>Your skills as physical objects</h2>
          <p className={s.sub}>
            Blue bubbles are skills you have, dark ones are gaps. Move your cursor to push them
            around. Click a bubble to send it flying.
          </p>
        </div>
        <SkillBubbles />
      </div>

      <div className={s.section}>
        <div className={s.sectionHead}>
          <p className={s.eyebrow}>03 · Ink Scanner</p>
          <h2 className={s.title}>AI reads the job description live</h2>
          <p className={s.sub}>
            A scanning beam sweeps the job posting and extracts required skills in real time,
            building your match score as it goes.
          </p>
        </div>
        <InkScanner />
      </div>
    </div>
  );
}
