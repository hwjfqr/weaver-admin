import { z } from 'zod'

// 文章创建/更新验证Schema
export const postSchema = z.object({
  title: z.string().min(1, '标题不能为空').max(200, '标题不能超过200个字符'),
  content: z.string().min(1, '内容不能为空').max(5000, '内容不能超过5000个字符'),
  author: z.string().min(1, '作者不能为空').max(100, '作者名称不能超过100个字符'),
})

export type PostInput = z.infer<typeof postSchema>

