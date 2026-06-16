import { BLOG_POSTS } from '@/entities/blog/model/blog-posts.data';
import { BlogPostPage } from '@/pages/blog-post/ui/blog-post-page';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
