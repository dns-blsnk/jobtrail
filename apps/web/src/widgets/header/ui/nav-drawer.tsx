'use client';

import styles from './nav-drawer.module.scss';

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
        className={`${styles.scrim} ${open ? styles.scrimVisible : ''}`}
        onClick={onClose}
      />
      <div
        aria-label={label}
        className={`${styles.drawer} ${tone === 'deep' ? styles.deep : ''} ${open ? styles.open : ''}`}
        role="dialog"
      >
        {children}
      </div>
    </>
  );
}
