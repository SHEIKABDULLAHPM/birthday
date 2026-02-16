import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static exports
  basePath: '/birthday', // Use your repository name
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;