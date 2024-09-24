import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  const { title, content, image } = await request.json();

  try {
    const newBlog = await prisma.blog.create({
      data: { title, content, image },
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating blog' }, { status: 500 });
  }
}
