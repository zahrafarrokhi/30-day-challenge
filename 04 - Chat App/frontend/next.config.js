/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'external-content.duckduckgo.com',
      }
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
