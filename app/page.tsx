import Link from 'next/link'
import { prisma } from '@/lib/db'
import { format } from 'date-fns'
import DeleteButton from '@/components/DeleteButton'

export const dynamic = 'force-dynamic'

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return posts
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return []
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">文章列表</h2>
        <Link
          href="/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          创建新文章
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">还没有文章，创建第一篇吧！</p>
          <Link
            href="/posts/new"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
          >
            创建文章 →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>作者: {post.author}</span>
                    <span>
                      创建时间:{' '}
                      {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/posts/${post.id}/edit`}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
                  >
                    编辑
                  </Link>
                  <DeleteButton postId={post.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

