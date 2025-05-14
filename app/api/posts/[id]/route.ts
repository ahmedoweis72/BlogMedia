import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { id } = params
  
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(id) }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    await prisma.post.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('DELETE Post Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(id) }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { 
        title,
        content
      },
    })

    return NextResponse.json(
      { data: updatedPost },
      { status: 200 }
    )
  } catch (error) {
    console.error('UPDATE Post Error:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}
