import type { Session } from 'next-auth';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/shared/auth/auth';

export interface AuthContext {
  session: Session;
}

export function withAuthGuard<P extends Record<string, unknown>>(
  handler: (context: AuthContext & P) => Promise<ReactNode>
) {
  return async function ProtectedPage(props: P): Promise<ReactNode> {
    const session = await auth();
    if (!session?.user) redirect('/auth');
    return handler({ ...props, session: session as Session });
  };
}
