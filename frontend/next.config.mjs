/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL ?? "http://localhost:3001/api" }
};

export default nextConfig;
