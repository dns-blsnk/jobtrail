import { getTranslations } from 'next-intl/server';
import { BLOG_POSTS } from '@/shared/data/blog-posts';
import { BlogGrid } from '@/widgets/blog/ui/blog-grid';
import s from './page.module.scss';

export default async function BlogRoute() {
  const t = await getTranslations('blogPage');
  return (
    <div className={s.root}>
      <div className={s.inner}>
        <header className={s.hero}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </header>
        <BlogGrid
          minReadLabel={t('minRead')}
          posts={BLOG_POSTS}
          readMoreLabel={t('readMore')}
        />
      </div>
    </div>
  );
}
