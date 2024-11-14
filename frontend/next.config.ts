import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_WEBSOCKET_URL: 'ws://localhost:3001',
  },
};

export default nextConfig;
