import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, location, phone_number, password, role,  } = await request.json();
    console.log("Password", password);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate input
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }



    // Create the new role and connect to existing permissions
    const newRole = await prisma.user.create({
      data: {
        name,
        email,
        location,
        phone_number,
        password: hashedPassword,
        role,
      } as Prisma.UserCreateInput,
    });

    return NextResponse.json({ success: true, role: newRole }, { status: 201 });
} catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Error creating role' }, { status: 500 });
  }
}
