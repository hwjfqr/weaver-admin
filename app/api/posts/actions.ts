'use server'

import { prisma } from '@/lib/db'
import { postSchema, type PostInput } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

// Server Actions - 用于客户端直接调用

export async function createPost(data: PostInput) {
  try {
    const validatedData = postSchema.parse(data)
    const post = await prisma.post.create({
      data: validatedData,
    })
    revalidatePath('/')
    return { success: true, data: post }
  } catch (error: any) {
    console.error('创建文章失败:', error)
    if (error.name === 'ZodError') {
      return { success: false, error: '数据验证失败', details: error.errors }
    }
    return { success: false, error: '创建文章失败' }
  }
}

export async function updatePost(id: string, data: PostInput) {
  try {
    const validatedData = postSchema.parse(data)
    
    const existingPost = await prisma.post.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return { success: false, error: '文章不存在' }
    }

    const post = await prisma.post.update({
      where: { id },
      data: validatedData,
    })
    
    revalidatePath('/')
    return { success: true, data: post }
  } catch (error: any) {
    console.error('更新文章失败:', error)
    if (error.name === 'ZodError') {
      return { success: false, error: '数据验证失败', details: error.errors }
    }
    return { success: false, error: '更新文章失败' }
  }
}

export async function deletePost(id: string) {
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return { success: false, error: '文章不存在' }
    }

    await prisma.post.delete({
      where: { id },
    })
    
    revalidatePath('/')
    return { success: true, message: '文章已删除' }
  } catch (error) {
    console.error('删除文章失败:', error)
    return { success: false, error: '删除文章失败' }
  }
}

