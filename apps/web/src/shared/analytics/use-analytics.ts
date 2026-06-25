'use client';

import { useCallback } from 'react';

export function useAnalytics() {
  const capture = useCallback((_event: string, _properties?: Record<string, unknown>) => {}, []);
  return { capture };
}
