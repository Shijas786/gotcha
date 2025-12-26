import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.neynar.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'wrp.it',
      },
      {
        protocol: 'https',
        hostname: '**.ipfs.w3s.link',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: '**.farcaster.xyz',
      },
    ],
  },
  webpack: (config) => {
    // Externalize optional dependencies that cause build issues
    config.externals.push(
      'pino-pretty',
      'lokijs',
      'encoding'
    )
    return config
  },
};

export default nextConfig;
