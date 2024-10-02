import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming you have prisma client initialized in this path

export async function GET() {
  try {
    // Fetch all pizzas from the database
    const orders = await prisma.order.findMany();

    // Return the pizzas as a JSON response
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}