import type { CertificationItem } from '@/entities/resume/model/types';
import s from './blocks.module.scss';

interface BlockCertificationsProps {
  data: { items: CertificationItem[] };
}

export function BlockCertifications({ data }: BlockCertificationsProps) {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Certifications</h2>
      {data.items.map((item) => (
        <div key={item.id} className={s.item}>
          <div className={s.itemHeader}>
            <div>
              <div className={s.itemTitle}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className={s.itemLink}>
                    {item.name}
                  </a>
                ) : item.name}
              </div>
              <div className={s.itemSubtitle}>{item.issuer}</div>
            </div>
            <div className={s.itemDate}>
              {item.issueDate}
              {item.expiryDate ? ` – ${item.expiryDate}` : ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
