import type { Session } from 'next-auth';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/shared/auth/auth';

export interface AuthContext {
  session: Session;
}

export function withAuthGuard(handler: (context: AuthContext) => Promise<ReactNode>) {
  return async function ProtectedPage(): Promise<ReactNode> {
    const session = await auth();
    if (!session?.user) redirect('/auth');
    return handler({ session: session as Session });
  };
}
