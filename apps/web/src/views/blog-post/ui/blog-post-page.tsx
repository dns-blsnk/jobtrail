import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { BLOG_POSTS } from '@/entities/blog/model/blog-posts.data';
import { PopularPosts } from '@/widgets/blog/ui/popular-posts';
import s from './blog-post-page.module.scss';

interface BlogPostPageProps {
  slug: string;
}

export async function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const t = await getTranslations('blogPage');
  const popular = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 4);

  const formattedDate = new Date(post.publicationDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <Link className={s['back-link']} href="/blog">
          {t('backToBlog')}
        </Link>

        <article className={s.article}>
          <header className={s['article-header']}>
            <span className={s.category}>{post.category}</span>
            <h1 className={s.title}>{post.title}</h1>
            <div className={s.meta}>
              <time dateTime={post.publicationDate}>{formattedDate}</time>
              <span>·</span>
              <span>
                {post.readTimeMinutes} {t('minRead')}
              </span>
            </div>
          </header>

          <div className={s['cover-wrap']}>
            <Image
              alt={post.title}
              className={s['cover-img']}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 760px"
              src={post.coverImageUrl}
            />
          </div>

          <div className={s.prose}>
            <p className={s.lead}>{post.excerpt}</p>
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className={s.divider} />

        <PopularPosts minReadLabel={t('minRead')} posts={popular} title={t('popularPostsTitle')} />
      </div>
    </div>
  );
}
