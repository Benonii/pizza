import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
    const body = await request.json();
    const adminId = body.id;

    console.log("adminId:", adminId )

    if (!adminId) {
        return NextResponse.json({success: false, message: "Role ID is required"}, { status: 400 })
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(adminId)},
        });

        console.log("User deleted successfully");

        return NextResponse.json({success: true, message: "User deleted successfully"}, { status: 200});
    } catch (error) {
        console.error("User delete error:", error);
        return NextResponse.json({ error: 'Failed to delete User'}, { status: 500 });
    }
}