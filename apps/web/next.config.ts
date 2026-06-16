import type { NextConfig } from 'next';
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['@job-search-tracker/tokens', '@job-search-tracker/types'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
};

export default withNextIntl(nextConfig);
