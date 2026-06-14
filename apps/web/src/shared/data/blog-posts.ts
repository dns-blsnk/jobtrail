export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publicationDate: string;
  coverImageUrl: string;
  category: string;
  readTimeMinutes: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-track-job-applications',
    title: 'How to Track Your Job Applications Effectively',
    excerpt:
      'Staying organised during a job search can make or break your chances. Learn the strategies professionals use to manage dozens of open applications at once without losing track of a single one.',
    content: [
      'A job search without structure quickly becomes overwhelming. When you have five applications pending, it is manageable to keep everything in your head. At fifteen or twenty, details start slipping — you forget what version of your CV you sent, which recruiter you emailed, and whether a deadline passed two days ago or is still two days away.',
      'The first step is to centralise all activity into one place. A spreadsheet works, but a purpose-built tracker like Jobtrail goes further by auto-parsing job postings so you never have to copy and paste key requirements by hand. Every entry should capture at minimum: company name, role title, application date, current status, and the contact person if you have one.',
      'Update your tracker the moment something changes. Sent a follow-up? Log it. Got a rejection? Mark it and note the reason if any was given — patterns in rejections are as valuable as interview invites. Reviewing your tracker once a week takes ten minutes and keeps your pipeline clear, letting you focus energy on the applications most likely to convert.',
    ],
    publicationDate: '2026-05-12',
    coverImageUrl: 'https://picsum.photos/seed/jobtrack/800/450',
    category: 'Productivity',
    readTimeMinutes: 5,
  },
  {
    id: '2',
    slug: 'writing-cv-that-passes-ats',
    title: 'Writing a CV That Gets Past ATS Filters',
    excerpt:
      'Most large employers use automated screening software before a human ever sees your CV. Here is how to format and keyword-optimise your application to clear that first digital gate.',
    content: [
      'Applicant Tracking Systems scan your CV for keywords that match the job description before any recruiter reads a single word. If your document does not contain the right terms — even if you are a perfect fit — it may never reach a human. The fix is surprisingly straightforward: mirror the language in the posting.',
      'Use the exact phrases the job description uses. If it says "cross-functional collaboration", do not assume "working across teams" is equivalent in the eyes of the ATS. Paste the job description into a word-frequency tool and compare the top nouns and verb phrases against your CV. Close the gaps where you legitimately have that experience.',
      'Format matters just as much as content. Stick to standard section headings such as Experience, Education, and Skills. Avoid tables, text boxes, graphics, and headers or footers — many ATS engines either skip or scramble those sections entirely. A clean, single-column layout in a common font will parse correctly every time.',
    ],
    publicationDate: '2026-05-20',
    coverImageUrl: 'https://picsum.photos/seed/cvwrite/800/450',
    category: 'CV Tips',
    readTimeMinutes: 6,
  },
  {
    id: '3',
    slug: 'interview-questions-to-ask',
    title: '10 Questions to Ask in Every Job Interview',
    excerpt:
      'The questions you ask at the end of an interview reveal as much about you as the answers you give. These ten questions demonstrate strategic thinking and help you evaluate whether the role is actually right for you.',
    content: [
      'When an interviewer asks "do you have any questions for us?", saying no is one of the most costly mistakes a candidate can make. It signals low curiosity and weak interest. Strong candidates arrive with prepared questions that do two things simultaneously: impress the panel and extract genuine information.',
      'Ask about the onboarding process and what success looks like in the first ninety days. This shows you are already thinking about delivering impact, not just landing the role. Ask why the previous person left or how the role came to be open — the answer, or the discomfort around answering, tells you a great deal about the team culture and management.',
      'Finally, ask a question specific to something mentioned during the interview. If the manager described a scaling challenge, ask how the team is approaching it. This demonstrates active listening and genuine engagement — two qualities every employer values.',
    ],
    publicationDate: '2026-05-28',
    coverImageUrl: 'https://picsum.photos/seed/interview/800/450',
    category: 'Interviews',
    readTimeMinutes: 7,
  },
  {
    id: '4',
    slug: 'remote-work-applications',
    title: 'Remote Work Applications: What Recruiters Look For',
    excerpt:
      'Remote positions attract far more applicants than on-site roles. Standing out requires demonstrating self-management, communication discipline, and async-first working habits before the first call.',
    content: [
      'The talent pool for remote roles is global, which means competition is significantly higher than for a local position. Recruiters screening remote applicants are specifically looking for evidence of independent work — not just the claim "I work well independently" but concrete proof: projects delivered without close supervision, tools you use for async communication, and how you structure your working day.',
      'Tailor your CV and cover letter to highlight remote-specific skills. Mention tools like Notion, Linear, Slack, or Loom by name if you have used them. Describe how you have kept teammates aligned across time zones. Quantify outcomes where possible — percentages and figures are harder to dismiss than adjectives.',
      'In the interview itself, treat your video setup as part of your presentation. Good lighting, clear audio, and a tidy background signal that you take the remote environment seriously. Arriving two minutes early to test your connection is exactly the kind of proactive behaviour remote managers look for.',
    ],
    publicationDate: '2026-06-04',
    coverImageUrl: 'https://picsum.photos/seed/remotework/800/450',
    category: 'Remote Work',
    readTimeMinutes: 5,
  },
  {
    id: '5',
    slug: 'salary-negotiation-scripts',
    title: 'Salary Negotiation: Scripts That Actually Work',
    excerpt:
      'Most people leave money on the table simply because they never ask. These proven scripts remove the awkwardness and help you negotiate with confidence at every stage of the offer process.',
    content: [
      'Negotiation begins before an offer is made. When asked for your salary expectation early in the process, deflect rather than anchor low: "I am focused on finding the right fit — I am confident we can agree on a number once we know more about the scope of the role." This protects your leverage until you have all the information.',
      'When the offer arrives, take 24 to 48 hours before responding — even if you are thrilled. Then express genuine enthusiasm first: "I am really excited about this opportunity and I can see myself contributing significantly to the team." Follow with your counter: "Based on my research and experience, I was expecting something closer to X. Is there flexibility there?"',
      'If the base salary is fixed, negotiate on everything else: start date, remote days, signing bonus, equipment budget, or accelerated first performance review. Companies that cannot move on salary often have more flexibility on total compensation than the headline number suggests. The worst response you will get is "no" — and you are no worse off than before you asked.',
    ],
    publicationDate: '2026-06-08',
    coverImageUrl: 'https://picsum.photos/seed/salary/800/450',
    category: 'Career',
    readTimeMinutes: 8,
  },
  {
    id: '6',
    slug: 'linkedin-profile-optimization',
    title: 'LinkedIn Profile Optimisation for Active Job Seekers',
    excerpt:
      'Recruiters spend an average of seven seconds scanning a LinkedIn profile before deciding whether to move on. These optimisations ensure your profile grabs attention in that window and ranks higher in search results.',
    content: [
      'Your headline is the most important field on your LinkedIn profile after your name. It appears in search results, connection requests, and recruiter inboxes. Do not waste it on your job title alone. Instead, pair your role with the value you deliver: "Product Designer · Turning complex workflows into delightful mobile experiences" says far more than "Product Designer at Company X".',
      'The About section should open with your strongest hook in the first two lines, before the "see more" fold. Start with a statement about the kind of problems you solve or the impact you have created — recruiters who see the fold decide whether to expand it in a single second. Use line breaks generously; dense prose gets skipped.',
      'Activity matters as much as profile completeness. Engage meaningfully on posts in your field, publish short insights once a week, and comment on content from people at companies you are targeting. LinkedIn\'s algorithm promotes profiles that are active, increasing how often you appear in recruiter searches even without changing a word of your profile text.',
    ],
    publicationDate: '2026-06-12',
    coverImageUrl: 'https://picsum.photos/seed/linkedin/800/450',
    category: 'Personal Brand',
    readTimeMinutes: 6,
  },
];
