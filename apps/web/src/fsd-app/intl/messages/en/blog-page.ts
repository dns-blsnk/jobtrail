export const blogPage = {
  title: 'Blog',
  subtitle: 'Tips and insights for job seekers',
  placeholder: 'Articles coming soon. Check back later.',
} as const;

export type BlogPageMessages = typeof blogPage;
