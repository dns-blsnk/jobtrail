'use client';

import { useEffect, useState } from 'react';
import { MobileHeader } from './mobile-header';
import { DesktopHeader } from './desktop-header';

const MOBILE_MAX = 1023;

export function HeaderClient({ initialMobile }: { initialMobile: boolean }) {
  const [isMobile, setIsMobile] = useState(initialMobile);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
