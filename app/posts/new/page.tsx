import Form from "next/form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import FormButtons from "@/app/components/FormButtons";

async function getUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    cache: 'no-store'
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export default async function NewPost() {
  const users = await getUsers();

  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          authorId: Number(authorId),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create post');
      }

      revalidatePath("/posts");
      redirect("/posts");
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Create New Post
        </h1>
        
        <Form action={createPost} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Enter your post title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <select
              id="authorId"
              name="authorId"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select an author</option>
              {users.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Write your post content here..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <FormButtons />
        </Form>
      </div>
    </div>
  );
}