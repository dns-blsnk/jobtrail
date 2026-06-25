'use client';

import { clsx } from 'clsx';
import { useReveal } from '@/shared/lib/hooks/use-reveal';
import s from './reveal-wrapper.module.scss';

export function RevealWrapper({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={clsx(s.root, isVisible && s.visible)}>
      {children}
    </div>
  );
}
