/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'openweathermap.org',
      }
    ]
  },
}

module.exports = nextConfig
