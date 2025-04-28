#!/bin/bash

# 颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}手动部署到GitHub Pages${NC}"
echo ""

# 步骤1: 确认GitHub仓库信息
echo -e "${GREEN}步骤 1: 确认仓库信息${NC}"
read -p "请输入您的GitHub用户名: " github_username
repo_name="murder-game-poster"
repo_url="git@github.com:$github_username/$repo_name.git"

echo ""
echo -e "将使用以下信息:"
echo -e "GitHub用户名: ${YELLOW}$github_username${NC}"
echo -e "仓库名称: ${YELLOW}$repo_name${NC}"
echo -e "仓库URL: ${YELLOW}$repo_url${NC}"
echo ""
read -p "确认以上信息是否正确? (y/n): " confirm
if [[ $confirm != "y" && $confirm != "Y" ]]; then
  echo "已取消操作。"
  exit 1
fi

# 步骤2: 本地构建
echo ""
echo -e "${GREEN}步骤 2: 本地构建${NC}"
echo "清理旧的构建文件..."
rm -rf .next out

echo "构建应用..."
npm run build

if [ ! -d "out" ]; then
  echo "错误: 构建失败，未找到'out'目录"
  exit 1
fi

echo "构建成功!"

# 步骤3: 准备gh-pages分支
echo ""
echo -e "${GREEN}步骤 3: 准备gh-pages分支${NC}"

# 创建临时目录
temp_dir=$(mktemp -d)
echo "创建临时目录: $temp_dir"

# 复制构建文件到临时目录
cp -r out/* $temp_dir/

# 切换到gh-pages分支或创建一个新的orphan分支
if git show-ref --quiet refs/heads/gh-pages; then
  echo "切换到gh-pages分支..."
  git checkout gh-pages
else
  echo "创建gh-pages分支..."
  git checkout --orphan gh-pages
  git rm -rf .
fi

# 复制构建文件到工作目录
echo "复制构建文件..."
cp -r $temp_dir/* .

# 添加.nojekyll文件
echo "添加.nojekyll文件..."
touch .nojekyll

# 确保临时目录存在
mkdir -p $temp_dir

# 清理临时目录
echo "清理临时目录..."
rm -rf $temp_dir

# 步骤4: 提交并推送
echo ""
echo -e "${GREEN}步骤 4: 提交并推送${NC}"
git add .
git commit -m "手动部署: $(date '+%Y-%m-%d %H:%M:%S')"

echo "推送到gh-pages分支..."
git push origin gh-pages

# 切回main分支
git checkout main

echo ""
echo -e "${GREEN}部署完成!${NC}"
echo -e "您的应用将在以下地址可访问:"
echo -e "${YELLOW}https://$github_username.github.io/$repo_name/${NC}" 