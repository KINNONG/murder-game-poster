import type { NextConfig } from "next";

// 获取GitHub仓库名称，用于配置基础路径
const repo = "murder-game-poster";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // 静态HTML导出
  basePath: isProduction ? `/${repo}` : "",
  images: {
    unoptimized: true, // GitHub Pages不支持Next.js的图像优化
  },
  // 确保应用能作为静态站点工作
  assetPrefix: isProduction ? `/${repo}/` : "",
  distDir: "out", // 指定输出目录为out
  trailingSlash: true,
};

export default nextConfig;
