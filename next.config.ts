import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'regenesis.co.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aspmedica.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

    