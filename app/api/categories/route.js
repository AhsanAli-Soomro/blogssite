import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Category from '../../../models/Category';

// Create a new category
export async function POST(request) {
  await dbConnect();
  const { name } = await request.json();

  try {
    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
    }

    // Create a new category
    const newCategory = new Category({ name });
    await newCategory.save();

    return NextResponse.json({ message: 'Category created successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating category', error: error.message }, { status: 500 });
  }
}

// Get all categories
export async function GET() {
  try {
    // Fetch categories logic here
    const categories = await Category.find().lean();

    return new Response(JSON.stringify({ categories }), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error); // Log the error details
    return new Response(JSON.stringify({ message: 'Failed to fetch categories', error: error.message }), { status: 500 });
  }
}

