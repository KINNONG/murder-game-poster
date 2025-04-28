#!/bin/bash

# 颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 确保目录存在
mkdir -p .github/workflows

echo -e "${YELLOW}将项目部署到GitHub Pages的步骤:${NC}"
echo ""

# 步骤1: 确认GitHub仓库信息
echo -e "${GREEN}步骤 1: 设置GitHub仓库${NC}"
read -p "请输入您的GitHub用户名: " github_username
read -p "请输入仓库名称（默认: murder-game-poster）: " repo_name
repo_name=${repo_name:-murder-game-poster}
repo_url="https://github.com/$github_username/$repo_name.git"

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

# 步骤2: 更新next.config.ts中的仓库名称
echo ""
echo -e "${GREEN}步骤 2: 更新Next.js配置${NC}"
sed -i "" "s/const repo = 'murder-game-poster';/const repo = '$repo_name';/" next.config.ts
echo "已更新next.config.ts中的仓库名称为: $repo_name"

# 步骤3: 初始化Git仓库
echo ""
echo -e "${GREEN}步骤 3: 准备Git仓库${NC}"

# 检查是否已经是git仓库
if [ -d .git ]; then
  echo "Git仓库已存在，跳过初始化"
else
  echo "初始化Git仓库..."
  git init
fi

# 设置远程仓库
if git remote | grep -q "origin"; then
  echo "远程仓库已存在，正在更新..."
  git remote set-url origin $repo_url
else
  echo "添加远程仓库..."
  git remote add origin $repo_url
fi

# 步骤4: 提交代码
echo ""
echo -e "${GREEN}步骤 4: 提交代码${NC}"
git add .
git commit -m "Initial commit for GitHub Pages deployment"

# 步骤5: 推送代码
echo ""
echo -e "${GREEN}步骤 5: 推送代码${NC}"
echo "准备推送代码到 $repo_url"
echo "注意: 请确保已在GitHub上创建名为 $repo_name 的仓库"
read -p "已创建GitHub仓库并准备推送代码? (y/n): " push_confirm
if [[ $push_confirm != "y" && $push_confirm != "Y" ]]; then
  echo "已取消推送。您可以稍后手动执行: git push -u origin main"
  exit 1
fi

git push -u origin main

# 步骤6: 部署说明
echo ""
echo -e "${GREEN}部署完成!${NC}"
echo -e "请完成以下操作以启用GitHub Pages:"
echo -e "1. 访问 ${YELLOW}https://github.com/$github_username/$repo_name/settings/pages${NC}"
echo -e "2. 在'Source'部分，选择'GitHub Actions'"
echo -e "3. 等待GitHub Actions工作流完成"
echo -e "4. 部署完成后，您的应用将可在以下地址访问:"
echo -e "   ${YELLOW}https://$github_username.github.io/$repo_name/${NC}" 