import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
    return NextResponse.json(posts)
}

export async function POST(request) {
  try {
    const { title, content, authorId } = await request.json();

  
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Title, content and authorId are required" },
        { status: 400 }
      );
    }

   
    const author = await prisma.user.findUnique({
      where: { id: Number(authorId) },
    });

    if (!author) {
      return NextResponse.json(
        { error: "Author not found" },
        { status: 404 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
      },
      include: {
        author: true, 
      },
    });

    return NextResponse.json(
      { 
        message: "Post created successfully",
        data: newPost 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}