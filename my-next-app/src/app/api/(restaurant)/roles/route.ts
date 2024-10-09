import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all roles from the database
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        created_at: true,
        actions: true,
      }
    });

    return NextResponse.json({ success: true, roles: roles }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}
