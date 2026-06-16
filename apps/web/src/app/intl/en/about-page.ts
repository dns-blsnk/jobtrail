export const aboutPage = {
  title: 'About Jobtrail',
  subtitle: 'Built to simplify your job search — one link at a time.',
  introTitle: 'What is Jobtrail?',
  introBody:
    'Jobtrail is a smart job-search tracker that eliminates the busywork of managing your applications. Paste a job posting URL and Jobtrail automatically extracts the title, company, location, requirements, and salary range — so you spend less time copy-pasting and more time preparing.',
  missionTitle: 'Our mission',
  missionBody:
    'To give every job seeker clarity and control over their search. Finding a job is already stressful enough; the tools you use should reduce that stress, not add to it. We believe a well-organised pipeline directly improves your confidence and your results.',
  goalsTitle: 'What we are building toward',
  goal1Title: 'Intelligent job parsing',
  goal1Body:
    'Our AI reads job descriptions and surfaces the skills and keywords that actually matter, so you can tailor every application with precision.',
  goal2Title: 'Full pipeline visibility',
  goal2Body:
    'From first click to final offer, every stage of every application lives in one place. No more lost emails or forgotten follow-ups.',
  goal3Title: 'Actionable analytics',
  goal3Body:
    'See your response rate, average time-to-reply, and which job boards convert best. Data that helps you iterate and improve week over week.',
  storyTitle: 'The story behind it',
  storyBody:
    'Jobtrail was built after a frustrating personal job search that involved three spreadsheets, two browser-tab graveyards, and one missed deadline. The experience made one thing clear: there had to be a better way. We set out to build it.',
} as const;

export type AboutPageMessages = typeof aboutPage;
