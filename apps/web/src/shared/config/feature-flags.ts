function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

export const FEATURE_FLAGS = {
  landing: {
    v2Percent: clamp(parseInt(process.env.FF_LANDING_V2_PERCENT ?? '100', 10)),
  },
} as const;
