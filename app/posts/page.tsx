import Link from 'next/link';
import { deletePost } from '@/lib/actions';

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return res.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Blog<span className="text-blue-600">Media</span>
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Share your thoughts with the world
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-end mb-6">
            <Link
              href="/posts/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Post
            </Link>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {posts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {posts.map((post: any) => (
                  <li key={post.id}>
                    <div className="block hover:bg-gray-50 p-6 transition duration-150 ease-in-out">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <Link href={`/posts/${post.id}`}>
                            <h2 className="text-xl font-semibold text-gray-900 truncate">
                              {post.title}
                            </h2>
                          </Link>
                          <p className="mt-1 text-sm text-gray-500">
                            By {post.author?.name || 'Unknown Author'}
                          </p>
                        </div>
                        <div className="ml-4 flex items-center space-x-2">
                          <Link
                            href={`/posts/${post.id}/edit`}
                            className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Edit
                          </Link>
                          <form action={deletePost} className="inline">
                            <input type="hidden" name="id" value={post.id} />
                            <button
                              type="submit"
                              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}