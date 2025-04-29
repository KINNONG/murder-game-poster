import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 配置图片优化
  images: {
    // 使用默认优化配置
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
