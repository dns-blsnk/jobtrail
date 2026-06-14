'use client';

import { clsx } from 'clsx';
import s from './bottom-sheet.module.scss';

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
        className={clsx(s.scrim, open && s.scrimVisible)}
        onClick={onClose}
      />
      <div
        aria-label={label}
        className={clsx(s.sheet, tone === 'deep' && s.deep, open && s.open)}
        role="dialog"
      >
        <div className={s.handle} />
        {children}
      </div>
    </>
  );
}
