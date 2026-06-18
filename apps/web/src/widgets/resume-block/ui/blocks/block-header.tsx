import type { HeaderData } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockHeaderProps {
  data: HeaderData;
}

export function BlockHeader({ data }: BlockHeaderProps) {
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');

  return (
    <div className={s.header}>
      {data.photoUrl && (
        <img
          src={data.photoUrl}
          alt={fullName || 'Profile photo'}
          className={s.headerPhoto}
        />
      )}
      <div className={s.headerInfo}>
        {fullName && <h1 className={s.headerName}>{fullName}</h1>}
        {data.jobTitle && <p className={s.headerJobTitle}>{data.jobTitle}</p>}
        <div className={s.headerContacts}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && (
            <a href={data.website} target="_blank" rel="noopener noreferrer" className={s.headerLink}>
              {data.website}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
