import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST request to add user data to the database
export async function POST(req) {
  try {
    const { email, name } = await req.json(); // Get user data from request body

    // Check if user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      return NextResponse.json({ message: 'User added successfully!', user: newUser });
    }

    return NextResponse.json({ message: 'User already exists!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}
