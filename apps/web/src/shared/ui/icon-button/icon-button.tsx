'use client';

import type { ComponentType } from 'react';
import s from './icon-button.module.scss';

interface IconButtonProps {
  icon: ComponentType<{ sx?: object; className?: string }>;
  label: string;
  dot?: boolean;
  onClick?: () => void;
}

export function IconButton({ icon: IconComp, label, dot, onClick }: IconButtonProps) {
  return (
    <button aria-label={label} className={s.root} type="button" onClick={onClick}>
      <IconComp sx={{ fontSize: 20 }} />
      {dot && <span aria-hidden className={s.dot} />}
    </button>
  );
}
