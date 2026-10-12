import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // NFT media comes from many hosts; keep it simple and unoptimized for those.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
