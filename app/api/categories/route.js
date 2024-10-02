import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Category from '../../../models/Category';

// Create a new category (POST request)
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

    return NextResponse.json({ message: 'Category created successfully!', category: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating category', error: error.message }, { status: 500 });
  }
}

// Get all categories (GET request)
export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find({}).select('_id name subcategories').lean(); // Ensure _id, name, and subcategories are returned
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching categories', error: error.message }, { status: 500 });
  }
}

// Update a category (PUT request)
export async function PUT(request) {
  await dbConnect();
  const { id, name } = await request.json();

  try {
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    // Update the category name
    category.name = name;
    await category.save();

    return NextResponse.json({ message: 'Category updated successfully!', category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating category', error: error.message }, { status: 500 });
  }
}

// Delete a category (DELETE request)
export async function DELETE(request) {
  await dbConnect();
  const { id } = await request.json();

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category deleted successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting category', error: error.message }, { status: 500 });
  }
}
