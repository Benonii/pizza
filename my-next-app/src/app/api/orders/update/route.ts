import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
    const body = await request.json();
    const { orderId, status } = body;
    console.log("Order ID:", orderId, "Status:", status)

    if (!orderId || !status) {
        return NextResponse.json({ success: false, error: 'Order ID and status are required' }, { status: 400 });
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { status },
        });

        return NextResponse.json({ success: true, data: updatedOrder }, {status: 200  })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update order status'}, { status: 500 });
    }
}