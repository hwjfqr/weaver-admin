'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/types'

interface PostFormProps {
  post?: Post
  mode: 'create' | 'edit'
}

export default function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    author: post?.author || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const url = mode === 'create' ? '/api/posts' : `/api/posts/${post?.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/')
        router.refresh()
      } else {
        if (data.details) {
          const fieldErrors: Record<string, string> = {}
          data.details.forEach((error: any) => {
            fieldErrors[error.path[0]] = error.message
          })
          setErrors(fieldErrors)
        } else {
          setErrors({ submit: data.error || '操作失败' })
        }
      }
    } catch (error) {
      console.error('提交失败:', error)
      setErrors({ submit: '提交时发生错误，请重试' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {mode === 'create' ? '创建新文章' : '编辑文章'}
      </h2>

      {errors.submit && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          标题 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
          作者 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '提交中...' : mode === 'create' ? '创建' : '更新'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
        >
          取消
        </button>
      </div>
    </form>
  )
}

