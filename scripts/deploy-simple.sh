#!/bin/bash

# 颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}简单部署到GitHub Pages${NC}"
echo ""

# 步骤1: 本地构建
echo -e "${GREEN}步骤 1: 本地构建${NC}"
echo "清理旧的构建文件..."
rm -rf .next out

echo "构建应用..."
npm run build

if [ ! -d "out" ]; then
  echo "错误: 构建失败，未找到'out'目录"
  exit 1
fi

echo "构建成功!"

# 步骤2: 创建.nojekyll文件
echo -e "${GREEN}步骤 2: 创建.nojekyll文件${NC}"
touch out/.nojekyll

# 步骤3: 使用subtree推送
echo -e "${GREEN}步骤 3: 推送到gh-pages分支${NC}"
echo "将out目录推送到gh-pages分支..."

# 检查gh-pages分支是否存在
if git ls-remote --heads origin gh-pages | grep -q 'gh-pages'; then
  echo "远程gh-pages分支已存在"
else
  echo "远程gh-pages分支不存在，将创建一个新分支"
fi

# 使用subtree推送
git add out -f
git commit -m "构建网站内容"
git subtree push --prefix out origin gh-pages

echo ""
echo -e "${GREEN}部署完成!${NC}"
echo -e "请确保在GitHub仓库设置中启用GitHub Pages:"
echo -e "1. 访问 https://github.com/KINNONG/murder-game-poster/settings/pages"
echo -e "2. 在'Source'部分，选择'Deploy from a branch'"
echo -e "3. 选择'gh-pages'分支和'/ (root)'目录"
echo -e "4. 点击'Save'"
echo -e "您的应用将在以下地址可访问:"
echo -e "${YELLOW}https://KINNONG.github.io/murder-game-poster/${NC}" 