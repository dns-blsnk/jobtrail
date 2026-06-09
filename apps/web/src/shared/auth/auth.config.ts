import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith('/profile');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');

      if (isOnProfile) return isLoggedIn;
      if (isOnAuth && isLoggedIn) {
        return Response.redirect(new URL('/profile', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role ?? 'USER';
        token.accessToken = (user as { accessToken?: string }).accessToken ?? '';
        token.refreshToken = (user as { refreshToken?: string }).refreshToken ?? '';
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      (session.user as { role?: string }).role = token.role as string;
      (session as { accessToken?: string }).accessToken = token.accessToken as string;
      return session;
    },
  },
  providers: [],
  session: { strategy: 'jwt' },
  trustHost: true,
};
