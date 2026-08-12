/** @type {import('next').NextConfig} */
const BASE_PATH = '/one-scroll-web';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  eslint: { ignoreDuringBuilds: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
