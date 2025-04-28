# 六楼剧本杀海报生成器

一个用于创建专业级剧本杀海报的 Next.js 应用，支持多种风格模板。

## 功能特点

- 🎭 多风格模板: 侦探风、复古风、现代风
- 🖼️ 图片上传: 支持自定义海报封面图片
- ✏️ 内容编辑: 直观的表单界面，轻松编辑所有内容
- 📱 响应式设计: 完美适配桌面和移动设备
- 🖨️ 一键导出: 高质量 PNG 格式导出

## 本地开发

### 系统要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装

1. 克隆项目仓库:

```bash
git clone <repository-url>
cd pic-editor
```

2. 安装依赖:

```bash
npm install
```

3. 启动开发服务器:

```bash
npm run dev
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

### 图像资源

在首次运行前，请先准备所需的纹理图像资源:

1. 打开 `public/images/textures/README.md` 查看所需图片信息
2. 将获取的图片资源放置在 `public/images/textures` 目录下

## 使用指南

1. 选择海报风格: 侦探风、复古风或现代风
2. 填写剧本信息: 标题、类型、剧情简介等
3. 上传剧本封面图片
4. 实时预览海报效果
5. 点击"导出海报"按钮保存图片

## 部署到 GitHub Pages

本项目已配置好自动部署到 GitHub Pages 的工作流程。按照以下步骤操作：

1. 创建 GitHub 仓库:

   - 访问 [GitHub](https://github.com/) 并登录
   - 点击 "New" 创建新仓库
   - 填写仓库名称（例如 "murder-game-poster"）
   - 勾选 "Public" 选项
   - 点击 "Create repository" 按钮

2. 使用部署脚本:

   ```bash
   ./scripts/deploy-github.sh
   ```

   - 按提示输入您的 GitHub 用户名和仓库名称
   - 脚本会自动配置和推送代码到 GitHub

3. 配置 GitHub Pages:

   - 在您的仓库页面，点击 "Settings"
   - 在左侧导航中找到 "Pages"
   - 在 "Source" 部分，选择 "GitHub Actions"
   - 等待自动部署完成

4. 访问您的网站:
   ```
   https://[您的GitHub用户名].github.io/[仓库名称]/
   ```

## 技术栈

- Next.js 15.x - React 框架
- TypeScript - 类型安全
- Tailwind CSS - 样式系统
- Shadcn UI - UI 组件库
- html-to-image - 图像导出

## 授权协议

MIT
