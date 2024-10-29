/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opgg-static.akamaized.net',
        port: '',
        pathname: '/meta/images/profile_icons/**',
      },
    ],
  },
};

export default nextConfig;
