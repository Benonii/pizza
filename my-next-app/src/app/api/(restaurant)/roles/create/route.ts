import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

type Role = {
  name: string;
  actions: number[]; // Assuming you are passing an array of permission IDs
};

export async function POST(request: Request) {
  try {
    const { name, actions, restaurantId } = await request.json();

    // Validate input
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    // if (!Array.isArray(actions) || !actions.every(action => typeof action === 'number')) {
    //   return NextResponse.json({ error: 'Actions must be an array of permission IDs.' }, { status: 400 });
    // }

    // Create the new role and connect to existing permissions
    const newRole = await prisma.role.create({
      data: {
        name,
        actions,
        restaurant: {
            connect: { id: Number(restaurantId)},
        }
      } as Prisma.RoleCreateInput,
    });

    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Error creating role' }, { status: 500 });
  }
}
