/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    minimumCacheTTL: 15000000,
  },
};

module.exports = nextConfig;
