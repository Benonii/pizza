import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';

const restaurantSchema = z.object({
    admin_name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
    phone_number: z.string().min(10, "phone number is required"),
    name: z.string().min(1, "Restaurant name is required"),
    location: z.string().min(1, "Location is required"),
    admin: z.object({
        admin_name: z.string(),
        email: z.string().email(),
        phone_number: z.string(),
        password: z.string()
    })
});

export async function POST(request: Request) {
    const body = await request.json();

    // Validate incoming data
    const validation = restaurantSchema.safeParse(body);
    if (!validation.success) {
        console.error('validation Error', validation.error.errors)
        return NextResponse.json({ success: false, error: validation.error.errors }, { status: 400 });
    }

    const { admin_name, email, password, phone_number, name, location, admin } = validation.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userHashedPassword = await bcrypt.hash(password, 10);

    console.log("Incoming data:", validation.data);

    try {
        const newAdmin = await prisma.user.create({
            data: {
                name: admin_name,
                email,
                phone_number,
                password: userHashedPassword,
            } as Prisma.UserCreateInput
        });

        const restaurant = await prisma.restaurant.create({
            data: {
                admin_name,
                admin: {
                    connect: { id: newAdmin.id },
                },
                name,
                email,
                password: hashedPassword,
                phone_number,
                location,
            } as Prisma.RestaurantCreateInput
        });

        return NextResponse.json({ success: true, restaurantId: restaurant.id });
    } catch (error) {
        if (error instanceof Error) {
          console.error('Error registering restaurant:', error.message);
          return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        } else {
          console.error('Unknown error:', error);
          return NextResponse.json({ success: false, error: 'An unknown error occurred.' }, { status: 500 });
        }
    }
}