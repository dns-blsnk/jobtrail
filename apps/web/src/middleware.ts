import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/shared/auth/auth.config';
import { FF_LANDING_COOKIE, FF_LANDING_COOKIE_MAX_AGE } from '@/flags';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (req.nextUrl.pathname === '/') {
    const stored = req.cookies.get(FF_LANDING_COOKIE)?.value;
    if (stored === 'v1' || stored === 'v2') return NextResponse.next();

    const pct = parseInt(process.env.FF_LANDING_V2_PERCENT ?? '100', 10);
    const variant = Math.random() * 100 < pct ? 'v2' : 'v1';
    const res = NextResponse.next();
    res.cookies.set(FF_LANDING_COOKIE, variant, {
      maxAge: FF_LANDING_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
    });
    return res;
  }
});

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/jobs/:path*',
    '/applications/:path*',
    '/analytics/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};
