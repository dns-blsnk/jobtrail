'use client';

import styles from './button.module.scss';

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
      className={styles.button}
      disabled={disabled ?? loading}
      type={type}
      onClick={onClick}
    >
      {leftLabel && <span className={styles.label}>{leftLabel}</span>}
      <span>{loading ? 'Loading...' : title}</span>
      {rightLabel && <span className={styles.label}>{rightLabel}</span>}
    </button>
  );
}
