import NextAuth from 'next-auth';
import { authConfig } from '@/shared/auth/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/profile/:path*', '/auth/:path*'],
};
