import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon/icons/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
        pathname: '/logos/tailwindcss/**',
      },
    ],
  },
};

export default nextConfig;
