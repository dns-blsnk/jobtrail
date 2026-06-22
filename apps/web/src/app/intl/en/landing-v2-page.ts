export const landingV2Page = {
  hero: {
    label: 'Match your skills to any role →',
    headingLine1: 'Get hired for roles',
    headingLine2: "you're actually",
    headingAccent: 'matched',
    headingEnd: 'for.',
    subtitle:
      "Paste a job URL. See exactly which skills you have, which you're missing, and what your resume needs to say.",
    ctaPrimary: 'Start free — it takes 2 minutes',
    ctaSecondary: 'Watch how it works',
    trust: 'Used by engineers at Stripe, Vercel, Linear and 200+ companies',
  },
  matrix: {
    basedOn: 'Based on your stack · updated live',
    matched: 'matched',
    of: 'of',
  },
  problem: {
    without: 'Job searching without Jobtrail',
    with: 'With Jobtrail',
  },
  gapDemo: {
    title: "What's in your way?",
    subtitle:
      "Type your stack below. We'll show which roles you're close to and what's holding you back.",
    placeholder: 'Add a skill (React, Docker…)',
    presetFrontend: 'Frontend',
    presetBackend: 'Backend',
    presetFullstack: 'Fullstack',
    cta: 'See this against real job postings →',
    missing: 'Missing:',
  },
  cta: {
    heading: 'Two minutes to your first match score.',
    sub: 'Free. No credit card. Works with any job board.',
    placeholder: 'you@email.com',
    button: 'Get started →',
    facts: 'ATS score on every resume · Unlimited job tracking · Skill gap analysis',
  },
} as const;

export type LandingV2PageMessages = typeof landingV2Page;
