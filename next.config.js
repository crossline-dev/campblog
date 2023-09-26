/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_NEWT_SPACE_UID}.assets.newt.so`,
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  trailingSlash: true,
}

module.exports = nextConfig
