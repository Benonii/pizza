import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST( req: Request) {
    const body = await req.json();
    const roleName = body.name;
  try {
    // Fetch all permissions given to a role
    const roles = await prisma.role.findMany({
      where: {
        name: roleName
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        actions: true,
      }
    });

    return NextResponse.json({ success: true, permissions: roles[0]?.actions }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}