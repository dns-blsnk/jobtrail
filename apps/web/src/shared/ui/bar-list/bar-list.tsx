import type { ReactNode } from 'react';
import s from './bar-list.module.scss';

export interface BarListItem {
  key: string;
  label: string;
  barWidthPct: number;
  trailing: ReactNode;
  onClick?: () => void;
}

interface BarListProps {
  items: BarListItem[];
}

export function BarList({ items }: BarListProps) {
  return (
    <ul className={s.list} role="list">
      {items.map((item) => (
        <li key={item.key} className={s.item}>
          {item.onClick ? (
            <button className={s.row} onClick={item.onClick}>
              <BarListRow item={item} />
            </button>
          ) : (
            <div className={s.row}>
              <BarListRow item={item} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function BarListRow({ item }: { item: BarListItem }) {
  return (
    <>
      <span className={s.label}>{item.label}</span>
      <div className={s.barTrack}>
        <div className={s.bar} style={{ width: `${item.barWidthPct}%` }} />
      </div>
      <span className={s.trailing}>{item.trailing}</span>
    </>
  );
}

export function BarListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <ul className={s.list}>
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className={s.item}>
          <div className={s.row}>
            <div className={s.skeletonLabel} />
            <div className={s.barTrack}>
              <div className={s.skeletonFill} style={{ width: `${90 - i * 14}%` }} />
            </div>
            <div className={s.skeletonTrailing} />
          </div>
        </li>
      ))}
    </ul>
  );
}
