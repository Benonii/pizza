import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming your Prisma client is set up here

export async function POST(req: Request) {
  try {
    const { name, user_id, restaurantId, status, toppings,
            quantity, price, customerNumber, createdAt } = await req.json();

    // Validate input data
    if (!user_id || !status) {
      return NextResponse.json({ error: 'User ID and Status are required' }, { status: 400 });
    }

    // Create the order in the database
    const newOrder = await prisma.order.create({
      data: {
        name,
        user_id,
        restaurantId: Number(restaurantId), // This can be null if no restaurant is associated
        status,
        toppings,
        quantity: Number(quantity),
        price: Number(price),
        createdAt,
        customerNumber,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
