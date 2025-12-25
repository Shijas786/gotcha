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
    ],
  },
  webpack: (config, { isServer }) => {
    // Externalize problematic dependencies
    config.externals.push(
      'pino-pretty',
      'lokijs',
      'encoding',
      'axios',
      '@solana/kit',
      '@solana/web3.js',
      '@coinbase/cdp-sdk',
      '@base-org/account'
    )

    // Ignore optional dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      '@coinbase/cdp-sdk': false,
      '@base-org/account': false,
    }

    return config
  },
};

export default nextConfig;
