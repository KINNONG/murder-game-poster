import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 生成资源的URL，自动添加basePath
export function getAssetPath(path: string): string {
  // 检查环境变量来判断是否为生产环境
  const isProduction = process.env.NODE_ENV === "production";
  // 仓库名称
  const repoName = "murder-game-poster";

  // 如果路径已经是绝对URL或数据URL，直接返回
  if (path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }

  // 确保路径以/开头
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // 生产环境添加仓库名称作为前缀
  return isProduction ? `/${repoName}${normalizedPath}` : normalizedPath;
}
