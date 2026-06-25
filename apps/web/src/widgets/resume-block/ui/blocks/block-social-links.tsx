import type { ComponentType } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import type { SocialLinkItem } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockSocialLinksProps {
  data: { items: SocialLinkItem[] };
}

type IconComponent = ComponentType<{ sx?: object; className?: string }>;

function getPlatformIcon(platform: SocialLinkItem['platform']): IconComponent {
  switch (platform) {
    case 'LinkedIn':
      return LinkedInIcon;
    case 'GitHub':
      return GitHubIcon;
    case 'Portfolio':
      return LanguageOutlinedIcon;
    case 'Twitter':
      return LanguageOutlinedIcon;
    case 'Other':
      return LinkOutlinedIcon;
  }
}

export function BlockSocialLinks({ data }: BlockSocialLinksProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Links</h2>
      <div className={s.socialList}>
        {data.items.map((item) => {
          const PlatformIcon = getPlatformIcon(item.platform);
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.socialItem}
            >
              <PlatformIcon sx={{ fontSize: 16 }} />
              <span>
                {item.platform}: {item.url}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
