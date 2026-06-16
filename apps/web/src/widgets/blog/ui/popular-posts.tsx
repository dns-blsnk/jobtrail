import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/entities/blog/model/blog-post.types';
import s from './popular-posts.module.scss';

interface PopularPostsProps {
  posts: BlogPost[];
  title: string;
  minReadLabel: string;
}

export function PopularPosts({ posts, title, minReadLabel }: PopularPostsProps) {
  return (
    <aside className={s.root}>
      <h2 className={s.heading}>{title}</h2>
      <ul className={s.list}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link className={s.item} href={`/blog/${post.slug}`}>
              <div className={s['thumb-wrap']}>
                <Image
                  alt={post.title}
                  className={s.thumb}
                  fill
                  sizes="80px"
                  src={post.coverImageUrl}
                />
              </div>
              <div className={s['item-body']}>
                <span className={s.category}>{post.category}</span>
                <p className={s.title}>{post.title}</p>
                <span className={s.meta}>
                  {post.readTimeMinutes} {minReadLabel}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
