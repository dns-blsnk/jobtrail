export const blogPage = {
  title: 'Blog',
  subtitle: 'Practical tips and insights for every stage of your job search.',
  readMore: 'Read article',
  minRead: 'min read',
  backToBlog: '← Back to Blog',
  popularPostsTitle: 'Popular Posts',
} as const;

export type BlogPageMessages = typeof blogPage;
