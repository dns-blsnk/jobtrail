import { FEATURE_FLAGS } from '@/shared/config/feature-flags';

export type LandingVariant = 'v1' | 'v2';

export const LANDING_FLAG_COOKIE = 'ff_landing';
export const LANDING_FLAG_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export function resolveLandingVariant(storedVariant?: string): LandingVariant {
  if (storedVariant === 'v1' || storedVariant === 'v2') return storedVariant;
  return Math.random() * 100 < FEATURE_FLAGS.landing.v2Percent ? 'v2' : 'v1';
}
