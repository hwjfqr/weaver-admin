# Weaver Admin - 基于 Vercel 的全栈 Next.js 项目

这是一个使用 Next.js 14 (App Router)、TypeScript、Prisma 和 Vercel Postgres 构建的全栈管理平台最小案例。

## 🚀 技术栈

- **前端框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Vercel Postgres (PostgreSQL)
- **ORM**: Prisma
- **部署平台**: Vercel
- **验证库**: Zod

## ✨ 功能特性

- ✅ 完整的 CRUD 操作（创建、读取、更新、删除文章）
- ✅ 服务端渲染 (SSR)
- ✅ API 路由
- ✅ Server Actions
- ✅ 数据验证
- ✅ 响应式设计
- ✅ Vercel 自动部署

## 📦 项目结构

```
weaver-admin/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── posts/         # 文章 API
│   ├── posts/             # 文章页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── PostForm.tsx       # 文章表单
│   └── DeleteButton.tsx   # 删除按钮
├── lib/                   # 工具库
│   ├── db.ts             # Prisma 客户端
│   └── validations.ts    # Zod 验证 Schema
├── prisma/               # Prisma 配置
│   └── schema.prisma     # 数据库 Schema
├── types/                # TypeScript 类型
└── public/               # 静态资源
```

## 🛠️ 本地开发

### 前置要求

- Node.js 18+ 
- npm 或 yarn 或 pnpm
- Git

### 安装步骤

1. **克隆项目并安装依赖**

```bash
npm install
```

2. **配置环境变量**

复制 `.env.example` 文件为 `.env.local`：

```bash
# Windows
copy .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

3. **配置 Vercel Postgres 数据库**

有两种方式：

#### 方式一：使用 Vercel 提供的 Postgres（推荐）

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 创建一个新项目或选择现有项目
3. 在项目设置中，进入 **Storage** 标签
4. 点击 **Create Database** → 选择 **Postgres**
5. 数据库创建后，Vercel 会自动生成环境变量
6. 将以下环境变量复制到本地 `.env.local` 文件中：
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `DATABASE_URL`

#### 方式二：使用本地 PostgreSQL 数据库

如果你有本地 PostgreSQL 数据库，可以直接在 `.env.local` 中配置：

```env
POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/weaver_admin?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/weaver_admin"
DATABASE_URL="postgresql://user:password@localhost:5432/weaver_admin"
```

4. **生成 Prisma Client 并推送数据库 Schema**

```bash
npm run db:generate
npm run db:push
```

5. **启动开发服务器**

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🚢 部署到 Vercel

### 方法一：通过 Vercel CLI（推荐用于首次部署）

1. **安装 Vercel CLI**

```bash
npm i -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

3. **在项目根目录执行部署**

```bash
vercel
```

4. **创建 Vercel Postgres 数据库**

部署完成后，在 Vercel Dashboard 中：
- 进入项目设置
- 选择 **Storage** 标签
- 点击 **Create Database** → 选择 **Postgres**
- 数据库创建后，Vercel 会自动将环境变量注入到项目中

5. **推送数据库 Schema**

```bash
vercel env pull .env.local  # 拉取环境变量到本地
npm run db:generate
npm run db:push
```

6. **重新部署以应用数据库变更**

```bash
vercel --prod
```

### 方法二：通过 GitHub 自动部署（推荐用于持续集成）

1. **将代码推送到 GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **在 Vercel Dashboard 中导入项目**

- 访问 [Vercel Dashboard](https://vercel.com/dashboard)
- 点击 **Add New** → **Project**
- 选择你的 GitHub 仓库
- 点击 **Import**

3. **配置项目**

- Framework Preset: **Next.js**
- Root Directory: `./` (默认)
- Build Command: `npm run build` (或使用默认值)
- Output Directory: `.next` (默认)
- Install Command: `npm install` (默认)

4. **添加环境变量**

在项目设置中的 **Environment Variables** 部分，添加以下变量：
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `DATABASE_URL`

或者直接创建 Postgres 数据库，Vercel 会自动注入这些变量。

5. **创建 Postgres 数据库**

- 在项目设置中，进入 **Storage** 标签
- 点击 **Create Database** → 选择 **Postgres**
- 数据库创建后会自动注入环境变量

6. **部署并初始化数据库**

Vercel 会自动部署你的项目。部署完成后，需要初始化数据库：

在 Vercel Dashboard 中：
- 进入项目的 **Deployments** 标签
- 点击最新的部署
- 进入 **Functions** 标签，找到任意一个函数
- 或者使用 Vercel CLI：

```bash
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

或者在 Vercel Dashboard 中添加 Build Command 自动执行：

```
prisma generate && next build
```

## 📝 使用说明

### 创建文章

1. 点击首页的 **"创建新文章"** 按钮
2. 填写标题、作者和内容
3. 点击 **"创建"** 提交

### 编辑文章

1. 在文章列表中找到要编辑的文章
2. 点击 **"编辑"** 按钮
3. 修改内容后点击 **"更新"** 提交

### 删除文章

1. 在文章列表中找到要删除的文章
2. 点击 **"删除"** 按钮
3. 确认删除操作

## 🔧 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint
- `npm run db:generate` - 生成 Prisma Client
- `npm run db:push` - 推送数据库 Schema（开发环境）
- `npm run db:migrate` - 创建数据库迁移（生产环境推荐）
- `npm run db:studio` - 打开 Prisma Studio（数据库管理界面）

## 📚 API 端点

### GET `/api/posts`
获取所有文章列表

### POST `/api/posts`
创建新文章

**请求体：**
```json
{
  "title": "文章标题",
  "content": "文章内容",
  "author": "作者名称"
}
```

### GET `/api/posts/[id]`
获取指定文章

### PUT `/api/posts/[id]`
更新指定文章

**请求体：**
```json
{
  "title": "更新后的标题",
  "content": "更新后的内容",
  "author": "作者名称"
}
```

### DELETE `/api/posts/[id]`
删除指定文章

## 🌟 Vercel 免费额度

Vercel 为免费用户提供：

- **Vercel Postgres**: 
  - 256 MB 数据库存储
  - 60 小时计算时间/月
  - 适合中小型项目

- **部署**:
  - 无限预览部署
  - 100 GB 带宽/月
  - 全球 CDN

## ⚠️ 注意事项

1. **数据库连接**: Vercel Postgres 使用连接池，确保使用 `POSTGRES_PRISMA_URL`（带 pgbouncer）用于 Prisma
2. **环境变量**: 确保所有必要的环境变量都在 Vercel Dashboard 中正确配置
3. **冷启动**: Serverless 函数有冷启动时间，首次访问可能稍慢
4. **执行时间限制**: 
   - Hobby 计划：10 秒
   - Pro 计划：60 秒

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

