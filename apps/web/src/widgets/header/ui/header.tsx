import { headers } from 'next/headers';
import { HeaderClient } from './header-client';

function isMobileUA(ua: string): boolean {
  return /android|iphone|ipad|ipod|blackberry|opera mini|iemobile|windows phone/i.test(ua);
}

export async function Header() {
  const ua = (await headers()).get('user-agent') ?? '';
  return <HeaderClient initialMobile={isMobileUA(ua)} />;
}
