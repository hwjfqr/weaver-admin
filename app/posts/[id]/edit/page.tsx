import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import PostForm from '@/components/PostForm'

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  })

  if (!post) {
    notFound()
  }

  return (
    <div>
      <PostForm post={post} mode="edit" />
    </div>
  )
}

