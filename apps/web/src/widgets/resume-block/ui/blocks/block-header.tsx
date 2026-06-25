import type { ComponentType } from 'react';
import { clsx } from 'clsx';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import type { HeaderData } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockHeaderProps {
  data: HeaderData;
}

type IconComponent = ComponentType<{ sx?: object; className?: string }>;

const PLATFORM_ICONS: Record<string, IconComponent> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Portfolio: LanguageOutlinedIcon,
  Twitter: TwitterIcon,
  Other: InsertLinkOutlinedIcon,
};

export function BlockHeader({ data }: BlockHeaderProps) {
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
  const shape = data.photoShape ?? 'circle';

  return (
    <div className={s.header}>
      {data.photoUrl && (
        <div className={s.headerPhotoWrap}>
          <img
            src={data.photoUrl}
            alt={fullName || 'Profile photo'}
            className={clsx(
              s.headerPhoto,
              shape === 'circle' && s.headerPhotoCircle,
              shape === 'square' && s.headerPhotoSquare,
              shape === 'portrait' && s.headerPhotoPortrait,
            )}
          />
        </div>
      )}

      <div className={s.headerInfo}>
        {fullName && <h1 className={s.headerName}>{fullName}</h1>}
        {data.jobTitle && <p className={s.headerJobTitle}>{data.jobTitle}</p>}

        <div className={s.headerContacts}>
          {data.email && (
            <a href={`mailto:${data.email}`} className={s.headerContactItem}>
              <MailOutlinedIcon sx={{ fontSize: 13 }} className={s.headerContactIcon} />
              <span>{data.email}</span>
            </a>
          )}
          {data.phone && (
            <span className={s.headerContactItem}>
              <PhoneOutlinedIcon sx={{ fontSize: 13 }} className={s.headerContactIcon} />
              <span>{data.phone}</span>
            </span>
          )}
          {data.location && (
            <span className={s.headerContactItem}>
              <LocationOnOutlinedIcon sx={{ fontSize: 13 }} className={s.headerContactIcon} />
              <span>{data.location}</span>
            </span>
          )}
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className={s.headerContactItem}
            >
              <LanguageOutlinedIcon sx={{ fontSize: 13 }} className={s.headerContactIcon} />
              <span>{data.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </a>
          )}
          {data.links?.map((link) => {
            const PlatformIcon = PLATFORM_ICONS[link.platform] ?? InsertLinkOutlinedIcon;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.headerContactItem}
              >
                <PlatformIcon sx={{ fontSize: 13 }} className={s.headerContactIcon} />
                <span>
                  {link.title ||
                    (link.platform === 'Other'
                      ? link.url.replace(/^https?:\/\/(www\.)?/, '')
                      : link.platform)}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
