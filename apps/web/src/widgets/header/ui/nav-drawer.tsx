'use client';

import { clsx } from 'clsx';
import s from './nav-drawer.module.scss';

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  label?: string;
  tone?: 'light' | 'deep';
  children: React.ReactNode;
}

export function NavDrawer({ open, onClose, label, tone = 'light', children }: NavDrawerProps) {
  return (
    <>
      <div
        aria-hidden
        className={clsx(s.scrim, open && s.scrimVisible)}
        onClick={onClose}
      />
      <div
        aria-label={label}
        className={clsx(s.drawer, tone === 'deep' && s.deep, open && s.open)}
        role="dialog"
      >
        {children}
      </div>
    </>
  );
}
