import NextAuth from 'next-auth';
import { authConfig } from '@/shared/auth/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/jobs/:path*',
    '/applications/:path*',
    '/analytics/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};
