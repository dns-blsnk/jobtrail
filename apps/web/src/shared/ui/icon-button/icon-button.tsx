'use client';

import { Icon, type IconName } from '@/shared/ui/icon/icon';
import styles from './icon-button.module.scss';

interface IconButtonProps {
  icon: IconName;
  label: string;
  dot?: boolean;
  onClick?: () => void;
}

export function IconButton({ icon, label, dot, onClick }: IconButtonProps) {
  return (
    <button aria-label={label} className={styles.root} type="button" onClick={onClick}>
      <Icon name={icon} size={20} strokeWidth={1.9} />
      {dot && <span aria-hidden className={styles.dot} />}
    </button>
  );
}
