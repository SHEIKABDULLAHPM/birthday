import type { NextConfig } from "next";

const basePath = "/birthday";

const nextConfig: NextConfig = {
  output: "export", // Enable static exports
  basePath, // Use your repository name
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;