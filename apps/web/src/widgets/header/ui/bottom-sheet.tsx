'use client';

import styles from './bottom-sheet.module.scss';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  label?: string;
  tone?: 'light' | 'deep';
  children: React.ReactNode;
}

export function BottomSheet({ open, onClose, label, tone = 'light', children }: BottomSheetProps) {
  return (
    <>
      <div
        aria-hidden
        className={`${styles.scrim} ${open ? styles.scrimVisible : ''}`}
        onClick={onClose}
      />
      <div
        aria-label={label}
        className={`${styles.sheet} ${tone === 'deep' ? styles.deep : ''} ${open ? styles.open : ''}`}
        role="dialog"
      >
        <div className={styles.handle} />
        {children}
      </div>
    </>
  );
}
