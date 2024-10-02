import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
// import { pizzaSchema } from '@/lib/validationSchemas';

export async function POST(request: Request) {
    try {
        const body = await request.json();


        const { name, price, restaurantId, toppings } = body;

        const newPizza = await prisma.pizza.create({
            data: {
                name,
                price,
                vendor: {
                    connect: { id: Number(restaurantId)}
                },
                toppings
            } as Prisma.PizzaCreateInput
        })

        return NextResponse.json({ success: true, pizza: newPizza }, { status: 201 });

    } catch (error) {
        console.error('Error creating pizza:', error)
        return NextResponse.json({ error: 'Failed to create pizza' }, { status: 500 });
    }
}