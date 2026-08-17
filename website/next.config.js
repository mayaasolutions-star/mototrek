/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:5000/api/v1/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/shop.html',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/events.html',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/guide.html',
        destination: '/guide',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/indexwithguide.html',
        destination: '/indexwithguide',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
