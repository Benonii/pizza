import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you have prisma client initialized in this path

export async function GET() {
  try {
    // Fetch all pizzas from the database
    const pizzas = await prisma.pizza.findMany();

    // Return the pizzas as a JSON response
    return NextResponse.json(pizzas, { status: 200 });
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    return NextResponse.json({ error: 'Failed to fetch pizzas' }, { status: 500 });
  }
}