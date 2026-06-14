export const aboutPage = {
  title: 'About Jobtrail',
  subtitle: 'Built to simplify your job search',
  body: 'Jobtrail helps you stay organised during your job search. Paste a job link and we automatically parse the key details — title, company, requirements — so you can focus on applying, not copy-pasting.',
  missionTitle: 'Our mission',
  missionBody: 'To give every job seeker clarity and control over their search.',
} as const;

export type AboutPageMessages = typeof aboutPage;
