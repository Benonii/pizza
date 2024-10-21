import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
    const body = await request.json();
    const roleId = body.id;

    if (!roleId) {
        return NextResponse.json({success: false, message: "Role ID is required"}, { status: 400 })
    }

    try {
        await prisma.role.delete({
            where: { id: parseInt(roleId)},
        });

        return NextResponse.json({ success: true, message: "Role deleted successfully" }, { status: 200});
    } catch (error) {
        console.error("Role delete error:", error);
        return NextResponse.json({ error: 'Failed to delete role'}, { status: 500 });
    }
}