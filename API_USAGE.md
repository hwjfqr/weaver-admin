# 📡 API 使用文档

## 基础 URL

- **本地开发**: `http://localhost:3000`
- **生产环境**: `https://your-project.vercel.app`

## API 端点列表

### 1. 获取所有文章

**GET** `/api/posts`

**请求示例：**
```bash
curl http://localhost:3000/api/posts
```

**响应示例：**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx123456",
      "title": "文章标题",
      "content": "文章内容",
      "author": "作者名称",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. 创建新文章

**POST** `/api/posts`

**请求头：**
```
Content-Type: application/json
```

**请求体：**
```json
{
  "title": "我的第一篇文章",
  "content": "这是文章的内容，可以写很多文字...",
  "author": "张三"
}
```

**请求示例（curl）：**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的第一篇文章",
    "content": "这是文章的内容",
    "author": "张三"
  }'
```

**请求示例（PowerShell）：**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"我的第一篇文章","content":"这是文章的内容","author":"张三"}'
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123456",
    "title": "我的第一篇文章",
    "content": "这是文章的内容",
    "author": "张三",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 3. 获取单篇文章

**GET** `/api/posts/[id]`

**请求示例：**
```bash
curl http://localhost:3000/api/posts/clxxx123456
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123456",
    "title": "文章标题",
    "content": "文章内容",
    "author": "作者名称",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**错误响应（文章不存在）：**
```json
{
  "success": false,
  "error": "文章不存在"
}
```

---

### 4. 更新文章

**PUT** `/api/posts/[id]`

**请求头：**
```
Content-Type: application/json
```

**请求体：**
```json
{
  "title": "更新后的标题",
  "content": "更新后的内容",
  "author": "作者名称"
}
```

**请求示例（curl）：**
```bash
curl -X PUT http://localhost:3000/api/posts/clxxx123456 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "更新后的标题",
    "content": "更新后的内容",
    "author": "作者名称"
  }'
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "id": "clxxx123456",
    "title": "更新后的标题",
    "content": "更新后的内容",
    "author": "作者名称",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### 5. 删除文章

**DELETE** `/api/posts/[id]`

**请求示例：**
```bash
curl -X DELETE http://localhost:3000/api/posts/clxxx123456
```

**响应示例：**
```json
{
  "success": true,
  "message": "文章已删除"
}
```

---

## 错误响应格式

### 验证错误（400）
```json
{
  "success": false,
  "error": "数据验证失败",
  "details": [
    {
      "path": ["title"],
      "message": "标题不能为空"
    }
  ]
}
```

### 未找到（404）
```json
{
  "success": false,
  "error": "文章不存在"
}
```

### 服务器错误（500）
```json
{
  "success": false,
  "error": "操作失败的具体原因"
}
```

---

## 使用 Postman 测试

1. **创建新文章**
   - Method: `POST`
   - URL: `http://localhost:3000/api/posts`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "测试文章",
       "content": "这是测试内容",
       "author": "测试作者"
     }
     ```

2. **获取所有文章**
   - Method: `GET`
   - URL: `http://localhost:3000/api/posts`

3. **更新文章**
   - Method: `PUT`
   - URL: `http://localhost:3000/api/posts/[文章ID]`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON): 同创建文章格式

4. **删除文章**
   - Method: `DELETE`
   - URL: `http://localhost:3000/api/posts/[文章ID]`

---

## 数据验证规则

根据 `lib/validations.ts` 中的 Zod Schema：

- **title（标题）**:
  - 必填
  - 最小长度：1 个字符
  - 最大长度：200 个字符

- **content（内容）**:
  - 必填
  - 最小长度：1 个字符
  - 最大长度：5000 个字符

- **author（作者）**:
  - 必填
  - 最小长度：1 个字符
  - 最大长度：100 个字符

---

## 快速测试脚本

### PowerShell 测试脚本

```powershell
# 1. 创建文章
$newPost = @{
    title = "测试文章"
    content = "这是测试内容"
    author = "测试作者"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/posts" `
    -Method POST `
    -ContentType "application/json" `
    -Body $newPost

Write-Host "创建的文章 ID: $($response.data.id)"

# 2. 获取所有文章
$posts = Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method GET
Write-Host "文章总数: $($posts.data.Count)"

# 3. 更新文章
$updateData = @{
    title = "更新后的标题"
    content = "更新后的内容"
    author = "测试作者"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/posts/$($response.data.id)" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $updateData

# 4. 删除文章
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/$($response.data.id)" `
    -Method DELETE
```

---

## 浏览器直接测试

在浏览器地址栏输入以下 URL 可以直接测试 GET 请求：

- 获取所有文章: `http://localhost:3000/api/posts`
- 获取单篇文章: `http://localhost:3000/api/posts/[文章ID]`

