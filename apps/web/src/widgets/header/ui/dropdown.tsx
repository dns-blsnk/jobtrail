'use client';

import styles from './dropdown.module.scss';

interface DropdownProps {
  open: boolean;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

export function Dropdown({ open, children, align = 'right' }: DropdownProps) {
  const alignClass = align === 'left' ? styles.alignLeft : styles.alignRight;

  return (
    <div
      aria-hidden={!open}
      className={`${styles.root} ${alignClass} ${open ? styles.open : ''}`}
      role="menu"
    >
      {children}
    </div>
  );
}
