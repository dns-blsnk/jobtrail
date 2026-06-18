import type { SocialLinkItem } from '@/entities/resume/model/types';
import { Icon } from '@/shared/ui/icon/icon';
import type { IconName } from '@/shared/ui/icon/icon';
import s from './blocks.module.scss';

interface BlockSocialLinksProps {
  data: { items: SocialLinkItem[] };
}

function getPlatformIcon(platform: SocialLinkItem['platform']): IconName {
  switch (platform) {
    case 'LinkedIn': return 'linkedin';
    case 'GitHub': return 'github';
    case 'Portfolio': return 'globe';
    case 'Twitter': return 'globe';
    case 'Other': return 'link2';
  }
}

export function BlockSocialLinks({ data }: BlockSocialLinksProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Links</h2>
      <div className={s.socialList}>
        {data.items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={s.socialItem}
          >
            <Icon name={getPlatformIcon(item.platform)} size={16} strokeWidth={1.9} />
            <span>{item.platform}: {item.url}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
