import { clsx } from 'clsx';
import type { HeaderData } from '@/entities/resume/model/types';
import { Icon } from '@/shared/ui/icon/icon';
import type { IconName } from '@/shared/ui/icon/icon';
import s from './blocks.module.scss';

interface BlockHeaderProps {
  data: HeaderData;
}

const PLATFORM_ICONS: Record<string, IconName> = {
  LinkedIn:  'linkedin',
  GitHub:    'github',
  Portfolio: 'globe',
  Twitter:   'twitter',
  Other:     'link',
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
              shape === 'circle'  && s.headerPhotoCircle,
              shape === 'square'  && s.headerPhotoSquare,
              shape === 'rounded' && s.headerPhotoRounded,
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
              <Icon name="mail" size={13} strokeWidth={1.9} className={s.headerContactIcon} />
              <span>{data.email}</span>
            </a>
          )}
          {data.phone && (
            <span className={s.headerContactItem}>
              <Icon name="phone" size={13} strokeWidth={1.9} className={s.headerContactIcon} />
              <span>{data.phone}</span>
            </span>
          )}
          {data.location && (
            <span className={s.headerContactItem}>
              <Icon name="mapPin" size={13} strokeWidth={1.9} className={s.headerContactIcon} />
              <span>{data.location}</span>
            </span>
          )}
          {data.website && (
            <a href={data.website} target="_blank" rel="noopener noreferrer" className={s.headerContactItem}>
              <Icon name="globe" size={13} strokeWidth={1.9} className={s.headerContactIcon} />
              <span>{data.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </a>
          )}
          {data.links?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.headerContactItem}
            >
              <Icon
                name={PLATFORM_ICONS[link.platform] ?? 'link'}
                size={13}
                strokeWidth={1.9}
                className={s.headerContactIcon}
              />
              <span>{link.platform === 'Other' ? link.url.replace(/^https?:\/\/(www\.)?/, '') : link.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
