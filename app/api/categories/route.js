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
  await dbConnect();

  try {
    const categories = await Category.find({}).select('_id name'); // Ensure _id and name are returned
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching categories', error: error.message }, { status: 500 });
  }
}
