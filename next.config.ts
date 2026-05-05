import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // i18n configuration for App Router
  // Note: In Next.js 14+, i18n routing is handled via middleware.ts and [lang] dynamic segments
};

export default nextConfig;
