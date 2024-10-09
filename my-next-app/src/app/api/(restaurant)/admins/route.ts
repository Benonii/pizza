import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const restaurantId = url.searchParams.get('restaurantId');
  try {
    const users = await prisma.user.findMany({
      where: {
        restaurantId: Number(restaurantId),
      },
      select: {
        id: true,
        name: true,
        phone_number: true,
        email: true,
      }
    });

    return NextResponse.json({ success: true, users: users }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}
