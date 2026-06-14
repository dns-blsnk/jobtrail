import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@job-search-tracker/types'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;
