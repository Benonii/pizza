import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
    const { email, password,  location, phone_number } = await request.json();

    console.log("User:", email,  password, location, phone_number);
    if (!email || !password || !location || !phone_number) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                location,
                phone_number,
            } as Prisma.UserCreateInput
        });

        return NextResponse.json({ message: 'User created successfully!', user });
    } catch (error) {
        return NextResponse.json({ error: 'User already exists'}, { status: 400 })
    }
}