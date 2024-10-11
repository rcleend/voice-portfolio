/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RELAY_SERVER_URL: process.env.RELAY_SERVER_URL,
  },
};

export default nextConfig;
