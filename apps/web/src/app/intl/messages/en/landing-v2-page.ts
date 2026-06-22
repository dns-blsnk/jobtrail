export const landingV2Page = {
  hero: {
    label: 'Match your skills to any role',
    headingLine1: 'Get hired for roles',
    headingLine2: "you're actually",
    headingAccent: 'matched',
    headingEnd: 'for.',
    subtitle:
      "Paste a job URL. See exactly which skills you have, which you're missing, and what your resume needs to say.",
    ctaPrimary: 'Start free, takes 2 minutes',
    ctaSecondary: 'Watch how it works',
    trust: 'Used by engineers at Stripe, Vercel, Linear and 200+ companies',
  },
  matrix: {
    basedOn: 'Based on your stack · updated live',
    matched: 'matched',
    of: 'of',
  },
  problem: {
    without: 'Without Jobtrail',
    with: 'With Jobtrail',
    withoutItems: [
      'Copy-paste the same resume for every role',
      'Google what skills each company uses',
      'Track applications in a spreadsheet already out of date',
      'Send 50 applications, hear back from 3 with no idea why',
      'Realize weeks later your resume had an ATS keyword problem',
    ],
    withItems: [
      'One resume tailored per role in one click',
      'Parse any job URL with tech stack extracted automatically',
      'Every application tracked with status, deadline and match score',
      'See your response rate and know which roles fit your stack',
      'ATS score shown before you apply',
    ],
  },
  resumeStrip: {
    label: 'Resume',
    title: 'One resume, rewritten for each role',
    body: 'Your base resume lives in Jobtrail. When you find a job, we highlight exactly which sections to update and which keywords to add for that specific posting.',
    updateLabel: 'Update this section',
    keywordsLabel: '3 keywords to add',
    keywords: ['Docker', 'Terraform', 'gRPC'],
  },
  matchingStrip: {
    label: 'Matching',
    title: 'See your score before you apply',
    body: 'Every saved job shows a match percentage based on your profile stack. The score breaks down by skill category so you know whether it is a frontend gap, a DevOps gap, or just one missing keyword.',
    strongFit: 'Strong fit',
    goodFit: 'Good fit',
    partialFit: 'Partial fit',
    weakFit: 'Weak fit',
    companies: [
      { name: 'GitHub', role: 'Senior Frontend Engineer', score: 94 },
      { name: 'Figma', role: 'Product Engineer', score: 87 },
      { name: 'Shopify', role: 'Frontend Developer', score: 61 },
      { name: 'Discord', role: 'Full-Stack Engineer', score: 43 },
    ],
  },
  trackingStrip: {
    label: 'Tracking',
    title: 'Your whole search, not just the applications',
    body: 'Set deadlines, add recruiter notes, mark interviews. See your response rate update in real time. Know when a company is worth following up.',
    columns: [
      {
        label: 'Saved',
        accent: false,
        cards: [
          { company: 'Notion', role: 'SWE', date: 'Jun 5' },
          { company: 'Loom', role: 'Frontend', date: 'Jun 8' },
          { company: 'Codeium', role: 'Engineer', date: 'Jun 9' },
        ],
      },
      {
        label: 'Applied',
        accent: false,
        cards: [
          { company: 'Linear', role: 'Frontend', date: 'Jun 3' },
          { company: 'Raycast', role: 'Engineer', date: 'Jun 6' },
        ],
      },
      {
        label: 'Interview',
        accent: true,
        cards: [
          { company: 'Vercel', role: 'SWE', date: 'Jun 10' },
          { company: 'Stripe', role: 'Frontend', date: 'Jun 11' },
        ],
      },
      {
        label: 'Offer',
        accent: true,
        cards: [{ company: 'GitHub', role: 'Engineer', date: 'Jun 12' }],
      },
    ],
  },
  gapDemo: {
    title: "What's in your way?",
    subtitle:
      "Type your stack below. We'll show which roles you're close to and what's holding you back.",
    placeholder: 'Add a skill (React, Docker...)',
    presetFrontend: 'Frontend',
    presetBackend: 'Backend',
    presetFullstack: 'Fullstack',
    tryLabel: 'Try:',
    cta: 'See this against real job postings',
    missing: 'Missing:',
  },
  cta: {
    eyebrow: 'Get started free',
    heading: 'Start free in 2 minutes',
    sub: 'No credit card. Works with any job board.',
    placeholder: 'you@email.com',
    button: 'Get my match score',
    features: ['ATS score on every resume', 'Unlimited job tracking', 'Skill gap analysis'],
    errorMsg: 'Please enter a valid email address.',
  },
} as const;

export type LandingV2PageMessages = typeof landingV2Page;
