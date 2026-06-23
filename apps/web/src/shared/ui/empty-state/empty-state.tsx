import type { ReactNode } from 'react';
import s from './empty-state.module.scss';

interface EmptyStateProps {
  title: string;
  hint?: string;
  action?: ReactNode;
}

export function EmptyState({ title, hint, action }: EmptyStateProps) {
  return (
    <div className={s.root}>
      <p className={s.title}>{title}</p>
      {hint && <p className={s.hint}>{hint}</p>}
      {action && <div className={s.action}>{action}</div>}
    </div>
  );
}
