import { flag } from 'flags/next';

export const FF_LANDING_COOKIE = 'ff_landing';
export const FF_LANDING_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const landingVariantFlag = flag<'v1' | 'v2'>({
  key: 'landing-variant',
  defaultValue: 'v2',
  options: [
    { value: 'v1', label: 'Landing V1' },
    { value: 'v2', label: 'Landing V2' },
  ],
  decide({ cookies }) {
    const stored = cookies.get(FF_LANDING_COOKIE)?.value;
    if (stored === 'v1' || stored === 'v2') return stored;
    const pct = parseInt(process.env.FF_LANDING_V2_PERCENT ?? '100', 10);
    return Math.random() * 100 < pct ? 'v2' : 'v1';
  },
});
