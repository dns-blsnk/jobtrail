'use client';

import { clsx } from 'clsx';
import s from './dropdown.module.scss';

interface DropdownProps {
  open: boolean;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

export function Dropdown({ open, children, align = 'right' }: DropdownProps) {
  const alignClass = align === 'left' ? s.alignLeft : s.alignRight;

  return (
    <div
      aria-hidden={!open}
      className={clsx(s.root, alignClass, open && s.open)}
      role="menu"
    >
      {children}
    </div>
  );
}
