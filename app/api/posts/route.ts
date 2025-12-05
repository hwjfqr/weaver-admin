import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { postSchema } from '@/lib/validations'

// GET - 获取所有文章
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章列表失败' },
      { status: 500 }
    )
  }
}

// POST - 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 验证输入数据
    const validatedData = postSchema.parse(body)
    
    const post = await prisma.post.create({
      data: validatedData,
    })
    
    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch (error: any) {
    console.error('创建文章失败:', error)
    
    // Zod验证错误
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: '数据验证失败', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: '创建文章失败' },
      { status: 500 }
    )
  }
}

