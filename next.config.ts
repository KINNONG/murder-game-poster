import type { NextConfig } from "next";

// 获取环境变量
const repo = "murder-game-poster";
const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 静态HTML导出

  // 根据部署平台调整配置
  basePath: isProduction && !isVercel ? `/${repo}` : "",

  images: {
    unoptimized: true, // 静态导出时需要设置图像为非优化
  },

  // 根据部署平台调整资源前缀
  assetPrefix: isProduction && !isVercel ? `/${repo}/` : "",

  // 指定输出目录
  distDir: "out",

  // 在 Vercel 上部署时不需要尾部斜杠
  trailingSlash: !isVercel,
};

export default nextConfig;
