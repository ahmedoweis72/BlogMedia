import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDistance } from 'date-fns'

async function getPost(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
      cache: 'no-store'
    })
    if (!res.ok) {
      throw new Error('Failed to fetch post')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function PostPage({ params }) {
  const { id } = params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  const formattedDate = post.createdAt 
    ? formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })
    : 'recently'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Link 
                  href="/"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to posts
                </Link>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{post.author?.name || 'Unknown author'}</span>
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <time dateTime={post.createdAt}>{formattedDate}</time>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Link
                  href={`/posts/${id}/edit`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}