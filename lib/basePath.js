// Centralized basePath helper. Next.js's `unoptimized` image mode does not
// auto-prepend `basePath` to local image sources, so we do it manually here.
// When moving to the custom domain (root path), set NEXT_PUBLIC_BASE_PATH to
// an empty string (or remove it) and update next.config.mjs's basePath/assetPrefix.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
