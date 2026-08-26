/** @type {import('next').NextConfig} */
// Vercel build: a normal Next.js server, not a static export, so that
// app/api/checkout/route.js (the Stripe backend) can run. No basePath is
// needed since this deploys at its own domain instead of a GitHub Pages
// subpath.
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
