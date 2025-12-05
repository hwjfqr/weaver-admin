import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { postSchema } from '@/lib/validations'

// GET - 获取单篇文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章失败' },
      { status: 500 }
    )
  }
}

// PUT - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // 验证输入数据
    const validatedData = postSchema.parse(body)
    
    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    const post = await prisma.post.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json({ success: true, data: post })
  } catch (error: any) {
    console.error('更新文章失败:', error)
    
    // Zod验证错误
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: '数据验证失败', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: '更新文章失败' },
      { status: 500 }
    )
  }
}

// DELETE - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true, message: '文章已删除' })
  } catch (error) {
    console.error('删除文章失败:', error)
    return NextResponse.json(
      { success: false, error: '删除文章失败' },
      { status: 500 }
    )
  }
}

