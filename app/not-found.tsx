import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">页面未找到</h2>
      <p className="text-gray-600 mb-6">您访问的页面不存在。</p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}

