/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "boba2go.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
