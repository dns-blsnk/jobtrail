'use client';

import s from './button.module.scss';

interface ButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export function Button({ title, loading, disabled, leftLabel, rightLabel, type = 'button', onClick }: ButtonProps) {
  return (
    <button
      className={s.button}
      disabled={disabled ?? loading}
      type={type}
      onClick={onClick}
    >
      {leftLabel && <span className={s.label}>{leftLabel}</span>}
      <span>{loading ? 'Loading...' : title}</span>
      {rightLabel && <span className={s.label}>{rightLabel}</span>}
    </button>
  );
}
