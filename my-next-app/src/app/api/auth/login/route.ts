import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

interface SignInRequest {
    email: string,
    password: string
}

export async function POST(request: Request) {
    const { email, password }: SignInRequest = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: 'Invalid password '});
        }

        return NextResponse.json({ message: 'Sign in successfull', user })
    } catch (error) {
        return NextResponse.json({ error: 'An error occured during sign in' }, { status: 500 })
    }
}