import type { Session } from 'next-auth';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/shared/auth/auth';

export interface WithSession {
  session: Session;
}

export function withAuthGuard<P extends object>(
  Component: (props: P & WithSession) => ReactNode | Promise<ReactNode>
) {
  return async function GuardedPage(props: P): Promise<ReactNode> {
    const session = await auth();
    if (!session?.user) redirect('/auth');
    return Component({ ...props, session: session as Session });
  };
}
