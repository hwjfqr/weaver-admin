'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  postId: string
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('确定要删除这篇文章吗？')) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        router.refresh()
      } else {
        alert('删除失败: ' + data.error)
      }
    } catch (error) {
      console.error('删除文章失败:', error)
      alert('删除文章时发生错误')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? '删除中...' : '删除'}
    </button>
  )
}

