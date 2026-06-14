'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { en, type Messages } from './messages/en';

const IntlContext = createContext<Messages>(en);

export function IntlProvider({ children }: { children: ReactNode }) {
  return <IntlContext.Provider value={en}>{children}</IntlContext.Provider>;
}

export function useTranslations(): Messages {
  return useContext(IntlContext);
}
