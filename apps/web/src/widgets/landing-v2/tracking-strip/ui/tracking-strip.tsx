import { getTranslations } from 'next-intl/server';
import s from './tracking-strip.module.scss';

interface KanbanCard {
  company: string;
  role: string;
  date: string;
}

interface KanbanColumn {
  label: string;
  accent: boolean;
  cards: KanbanCard[];
}

const COMPANY_COLORS: Record<string, string> = {
  Notion: '#191919',
  Loom: '#625df5',
  Codeium: '#09b6a2',
  Linear: '#5e6ad2',
  Raycast: '#ff6363',
  Vercel: '#000000',
  Stripe: '#6772e5',
  GitHub: '#24292e',
};

export async function TrackingStrip() {
  const t = await getTranslations('landingV2Page.trackingStrip');
  const columns = t.raw('columns') as KanbanColumn[];

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.label}>{t('label')}</p>
          <h2 className={s.title}>{t('title')}</h2>
          <p className={s.body}>{t('body')}</p>
        </div>

        <div className={s.board} aria-hidden="true">
          {columns.map((col) => (
            <div key={col.label} className={s.col}>
              <div className={`${s.colHeader} ${col.accent ? s.colHeaderAccent : ''}`}>
                {col.label}
                <span className={`${s.count} ${col.accent ? s.countAccent : ''}`}>
                  {col.cards.length}
                </span>
              </div>
              <div className={s.cards}>
                {col.cards.map((card) => {
                  const color = COMPANY_COLORS[card.company] ?? '#375dfb';
                  return (
                    <div
                      key={`${card.company}-${card.date}`}
                      className={`${s.card} ${col.accent ? s.cardAccent : ''}`}
                    >
                      <div className={s.cardTop}>
                        <div className={s.avatar} style={{ background: color }}>
                          {card.company[0]}
                        </div>
                        <div className={s.cardInfo}>
                          <span className={s.cardCompany}>{card.company}</span>
                          <span className={s.cardRole}>{card.role}</span>
                        </div>
                      </div>
                      <div className={`${s.dateBadge} ${col.accent ? s.dateBadgeAccent : ''}`}>
                        {card.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
