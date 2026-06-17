/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // TODO: fix this before production - using static export for now
  trailingSlash: true,
}

module.exports = nextConfig
