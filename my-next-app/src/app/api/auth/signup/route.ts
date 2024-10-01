import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const { email, password,  location, phoneNumber } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                location,
                phoneNumber
            }
        });

        return NextResponse.json({ message: 'User created successfully!', user });
    } catch (error) {
        return NextResponse.json({ error: 'User already exists'}, { status: 400 })
    }
}