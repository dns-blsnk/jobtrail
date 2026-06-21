export const landingPage = {
  hero: {
    eyebrow: 'AI-Powered Job Search',
    title: 'Land your next job faster with AI',
    titleAccent: 'faster with AI',
    subtitle:
      'Build ATS-friendly resumes, track applications, and match your skills to job postings — all in one place.',
    ctaPrimary: 'Build your resume free',
    ctaSecondary: 'See how it works',
  },
  stats: {
    items: [
      { value: '5,200+', label: 'Resumes created' },
      { value: '1,800+', label: 'Jobs tracked' },
      { value: '340+', label: 'Interviews landed' },
    ],
  },
  features: {
    title: 'Everything you need to land the job',
    subtitle: 'One platform to build, track, and optimize your entire job search.',
    resumeBuilder: {
      title: 'Resume Builder',
      description:
        'Create polished, ATS-optimized resumes with multiple templates and real-time preview.',
    },
    jobTracker: {
      title: 'Job Tracker',
      description:
        'Save job postings by URL — we extract the tech stack, salary, and requirements automatically.',
    },
    resumeMatching: {
      title: 'Resume Matching',
      description: 'See your match score for each job based on skills gap analysis.',
    },
    analytics: {
      title: 'Analytics',
      description:
        'Track response rates, interview conversion, and identify which skills to learn next.',
    },
  },
  howItWorks: {
    title: 'How it works',
    subtitle: 'Get from zero to interview-ready in three steps.',
    step1: {
      number: '01',
      title: 'Build your resume',
      description:
        'Fill in your experience, choose a template, and download a polished PDF in minutes.',
    },
    step2: {
      number: '02',
      title: 'Collect job postings',
      description:
        'Paste a job URL and we automatically parse the tech stack, salary, and requirements.',
    },
    step3: {
      number: '03',
      title: 'Track & improve',
      description:
        'See your match score, mark application statuses, and grow with actionable analytics.',
    },
  },
  cta: {
    title: 'Ready to supercharge your job search?',
    subtitle: 'Join thousands of job seekers who landed their next role with Jobtrail.',
    button: 'Get started for free',
  },
} as const;

export type LandingPageMessages = typeof landingPage;
