# ⚡ 快速开始指南

## 5 分钟快速部署到 Vercel

### 步骤 1: 安装依赖（本地开发）

```bash
npm install
```

### 步骤 2: 配置环境变量

创建 `.env.local` 文件（用于本地开发）：

```env
POSTGRES_PRISMA_URL="your_postgres_prisma_url"
POSTGRES_URL_NON_POOLING="your_postgres_url_non_pooling"
DATABASE_URL="your_database_url"
```

**注意**: 如果是首次部署，可以先跳过这一步，直接在 Vercel 上配置。

### 步骤 3: 初始化数据库（如果使用本地数据库）

```bash
# 生成 Prisma Client
npm run db:generate

# 推送数据库 Schema
npm run db:push
```

### 步骤 4: 启动本地开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

---

## 🚀 部署到 Vercel（推荐方式）

### 方法一：通过 GitHub 自动部署

1. **推送代码到 GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/weaver-admin.git
git push -u origin main
```

2. **在 Vercel 导入项目**
   - 访问 https://vercel.com/dashboard
   - 点击 "Add New" → "Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - Framework: Next.js（自动检测）
   - Build Command: `prisma generate && next build` ⚠️ **重要！**
   - 其他使用默认值

4. **创建 Vercel Postgres 数据库**
   - 在项目设置中，点击 "Storage" 标签
   - 点击 "Create Database" → 选择 "Postgres"
   - 输入数据库名称
   - 点击 "Create"

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成

6. **初始化数据库 Schema**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并链接项目
vercel login
vercel link

# 拉取环境变量
vercel env pull .env.local

# 生成 Prisma Client 并推送 Schema
npm install
npx prisma generate
npx prisma db push
```

7. **完成！** 访问你的部署 URL，开始使用！

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 按照提示操作，然后创建数据库并初始化 Schema
```

---

## 📋 最小案例功能

本项目实现了一个完整的文章管理系统的 CRUD 功能：

- ✅ **创建文章** - 填写标题、作者、内容
- ✅ **查看文章列表** - 首页显示所有文章
- ✅ **编辑文章** - 修改已有文章
- ✅ **删除文章** - 删除不需要的文章

## 🧪 测试流程

1. **创建文章**
   - 点击 "创建新文章"
   - 填写表单
   - 提交

2. **查看列表**
   - 首页自动显示所有文章
   - 按创建时间倒序排列

3. **编辑文章**
   - 点击文章右侧 "编辑" 按钮
   - 修改内容
   - 保存

4. **删除文章**
   - 点击文章右侧 "删除" 按钮
   - 确认删除

## 🔧 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 数据库
npm run db:generate      # 生成 Prisma Client
npm run db:push          # 推送 Schema 到数据库（开发）
npm run db:migrate       # 创建迁移（生产推荐）
npm run db:studio        # 打开 Prisma Studio（数据库管理界面）

# 构建
npm run build            # 构建生产版本
npm run start            # 启动生产服务器

# 代码质量
npm run lint             # 运行 ESLint
```

## 📁 项目结构

```
weaver-admin/
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   ├── posts/          # 文章页面
│   ├── page.tsx        # 首页
│   └── layout.tsx      # 根布局
├── components/         # React 组件
├── lib/               # 工具库（数据库、验证等）
├── prisma/            # Prisma 配置
└── types/             # TypeScript 类型
```

## ⚠️ 重要提示

1. **Build Command 必须包含 Prisma 生成**
   ```
   prisma generate && next build
   ```

2. **Vercel Postgres 免费额度**
   - 256 MB 存储
   - 60 小时计算时间/月
   - 适合中小型项目

3. **环境变量**
   - 本地开发：`.env.local`
   - Vercel 部署：在 Dashboard 中配置

4. **数据库初始化**
   - 部署后必须运行 `prisma db push` 初始化数据库结构

## 🆘 遇到问题？

查看详细文档：
- 📖 [README.md](./README.md) - 完整文档
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - 详细部署指南
- 📐 [ARCHITECTURE.md](./ARCHITECTURE.md) - 架构说明

## 🎉 下一步

- 添加用户认证
- 添加分页功能
- 添加搜索功能
- 添加文件上传
- 自定义样式和主题

开始构建你的全栈应用吧！

