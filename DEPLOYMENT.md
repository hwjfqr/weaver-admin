# 🚀 快速部署指南

本指南将帮助您快速将项目部署到 Vercel 并使用 Vercel Postgres 数据库。

## 前置准备

1. **GitHub 账号** - 用于代码托管
2. **Vercel 账号** - 免费注册 [vercel.com](https://vercel.com)

## 部署步骤

### 第一步：准备代码并推送到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Next.js + Vercel Postgres 全栈项目"

# 在 GitHub 上创建新仓库，然后连接
git remote add origin https://github.com/你的用户名/weaver-admin.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 第二步：在 Vercel 上导入项目

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **"Add New"** → **"Project"**
3. 在 **"Import Git Repository"** 中选择你的 GitHub 仓库
4. 点击 **"Import"**

### 第三步：配置项目设置

在项目配置页面：

- **Framework Preset**: Next.js（应该自动检测）
- **Root Directory**: `./`（默认）
- **Build Command**: `prisma generate && next build`（重要！）
- **Output Directory**: `.next`（默认）
- **Install Command**: `npm install`（默认）

**重要提示**：必须将 Build Command 改为包含 Prisma 生成步骤：
```
prisma generate && next build
```

### 第四步：创建 Vercel Postgres 数据库

1. 在项目设置页面，滚动到 **"Storage"** 部分
2. 点击 **"Create Database"**
3. 选择 **"Postgres"**
4. 输入数据库名称（例如：`weaver-admin-db`）
5. 选择区域（选择离你最近的区域，如 `Singapore` 或 `Tokyo`）
6. 点击 **"Create"**

数据库创建后，Vercel 会自动生成并注入以下环境变量：
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `DATABASE_URL`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 第五步：部署项目

1. 点击 **"Deploy"** 按钮
2. 等待构建完成（通常需要 1-2 分钟）

### 第六步：初始化数据库 Schema

部署完成后，需要初始化数据库结构。有两种方式：

#### 方式一：使用 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 登录 Vercel
vercel login

# 在项目目录中链接到 Vercel 项目
vercel link

# 拉取环境变量
vercel env pull .env.local

# 生成 Prisma Client
npm install
npx prisma generate

# 推送数据库 Schema
npx prisma db push
```

#### 方式二：使用 Vercel Dashboard（需要修改配置）

1. 在项目设置中，进入 **"Settings"** → **"Environment Variables"**
2. 找到 `POSTGRES_PRISMA_URL` 和 `POSTGRES_URL_NON_POOLING`
3. 复制这些值到本地 `.env.local` 文件
4. 在本地执行：

```bash
npm install
npx prisma generate
npx prisma db push
```

### 第七步：验证部署

1. 访问你的部署 URL（例如：`https://weaver-admin.vercel.app`）
2. 尝试创建一篇文章
3. 如果成功，说明数据库连接正常！

## 🔧 常见问题

### 问题 1：部署后数据库连接失败

**解决方案**：
- 确保 Build Command 包含 `prisma generate`
- 检查环境变量是否正确注入
- 确认数据库已创建并处于活跃状态

### 问题 2：构建失败，提示找不到 Prisma Client

**解决方案**：
确保 Build Command 为：`prisma generate && next build`

### 问题 3：如何查看数据库内容？

使用 Prisma Studio：

```bash
# 拉取环境变量
vercel env pull .env.local

# 运行 Prisma Studio
npm run db:studio
```

### 问题 4：如何在生产环境运行数据库迁移？

使用 Prisma Migrate（生产环境推荐）：

```bash
# 创建迁移
npx prisma migrate dev --name init

# 在生产环境应用迁移
npx prisma migrate deploy
```

可以在 Vercel 的部署后钩子（Deploy Hooks）中自动执行，或手动执行。

## 📊 监控和维护

### 查看部署日志

1. 在 Vercel Dashboard 中进入项目
2. 点击 **"Deployments"** 标签
3. 选择任意部署，查看构建日志和函数日志

### 查看数据库使用情况

1. 进入项目设置
2. 点击 **"Storage"** 标签
3. 选择你的 Postgres 数据库
4. 查看使用量和性能指标

### 备份数据库

Vercel Postgres 提供自动备份功能，可在数据库设置中查看和管理。

## 🎉 完成！

现在你的全栈项目已经成功部署到 Vercel，并且可以使用 Vercel Postgres 数据库了！

每次向 GitHub 推送代码，Vercel 都会自动重新部署。Pull Request 会自动创建预览部署。

