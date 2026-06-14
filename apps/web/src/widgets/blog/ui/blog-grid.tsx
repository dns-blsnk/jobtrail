import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import type { BlogPost } from '@/shared/data/blog-posts';
import s from './blog-grid.module.scss';

interface BlogGridProps {
  posts: BlogPost[];
  readMoreLabel: string;
  minReadLabel: string;
}

export function BlogGrid({ posts, readMoreLabel, minReadLabel }: BlogGridProps) {
  const largePosts = posts.slice(0, 2);
  const smallPosts = posts.slice(2, 6);

  return (
    <div className={s.grid}>
      <div className={s['col-large']}>
        {largePosts.map((post) => (
          <BlogCardLarge key={post.id} minReadLabel={minReadLabel} post={post} readMoreLabel={readMoreLabel} />
        ))}
      </div>
      <div className={s['col-small']}>
        {smallPosts.map((post) => (
          <BlogCardSmall key={post.id} minReadLabel={minReadLabel} post={post} />
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  post: BlogPost;
  readMoreLabel?: string;
  minReadLabel: string;
}

function BlogCardLarge({ post, readMoreLabel, minReadLabel }: CardProps) {
  return (
    <Link className={clsx(s.card, s['card-large'])} href={`/blog/${post.slug}`}>
      <div className={s['cover-wrap-large']}>
        <Image
          alt={post.title}
          className={s['cover-img']}
          fill
          sizes="(max-width: 899px) 100vw, 50vw"
          src={post.coverImageUrl}
        />
        <span className={s.category}>{post.category}</span>
      </div>
      <div className={s['card-body']}>
        <h2 className={s['card-title']}>{post.title}</h2>
        <p className={s['card-excerpt']}>{post.excerpt}</p>
        <div className={s['card-meta']}>
          <time dateTime={post.publicationDate}>{formatDate(post.publicationDate)}</time>
          <span>{post.readTimeMinutes} {minReadLabel}</span>
        </div>
        {readMoreLabel && <span className={s['read-more']}>{readMoreLabel} →</span>}
      </div>
    </Link>
  );
}

function BlogCardSmall({ post, minReadLabel }: CardProps) {
  return (
    <Link className={clsx(s.card, s['card-small'])} href={`/blog/${post.slug}`}>
      <div className={s['cover-wrap-small']}>
        <Image
          alt={post.title}
          className={s['cover-img']}
          fill
          sizes="(max-width: 899px) 100vw, 160px"
          src={post.coverImageUrl}
        />
      </div>
      <div className={s['card-body']}>
        <span className={s['category-small']}>{post.category}</span>
        <h3 className={s['card-title-small']}>{post.title}</h3>
        <div className={s['card-meta']}>
          <time dateTime={post.publicationDate}>{formatDate(post.publicationDate)}</time>
          <span>{post.readTimeMinutes} {minReadLabel}</span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
