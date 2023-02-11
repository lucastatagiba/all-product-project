/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/non-existent-page',
        },
      ],
    };
  },
};

module.exports = nextConfig;
