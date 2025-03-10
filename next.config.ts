import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*'],
    unoptimized: true,
  },
  /* config options here */
}

export default nextConfig
