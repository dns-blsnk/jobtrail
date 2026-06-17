import { headers } from 'next/headers';

function isMobileUA(ua: string): boolean {
  return /android|iphone|ipad|ipod|blackberry|opera mini|iemobile|windows phone/i.test(ua);
}

export async function Header() {
  const ua = (await headers()).get('user-agent') ?? '';
  if (isMobileUA(ua)) {
    const { MobileHeader } = await import('./mobile-header');
    return <MobileHeader />;
  }
  const { DesktopHeader } = await import('./desktop-header');
  return <DesktopHeader />;
}
