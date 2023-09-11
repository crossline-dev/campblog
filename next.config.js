const { withKumaUI } = require('@kuma-ui/next-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = withKumaUI(nextConfig)
