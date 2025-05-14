'use server'

import { revalidatePath } from 'next/cache'

export async function deletePost(formData: FormData) {
  const id = formData.get('id')
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete post')
    }

    revalidatePath('/posts')
  } catch (error) {
    console.error('Error deleting post:', error)
    throw new Error('Failed to delete post')
  }
}