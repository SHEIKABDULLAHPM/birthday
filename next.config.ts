import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // Enable static exports
  basePath: isProd ? '/nanban' : '', // Use your repository name
  assetPrefix: isProd ? '/nanban/' : '', // Required for static assets on GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with GitHub Pages routing
};

export default nextConfig;