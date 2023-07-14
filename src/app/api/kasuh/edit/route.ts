import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { deskripsi } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "Missing id parameter" }, { status: 400 });
    }

    try {
        const kasuh = await prisma.userKasuh.update({
            where: { id },
            data : {
                deskripsi: deskripsi,
            }
        });

        if (!kasuh) {
            return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
        }

        return NextResponse.json( { status: 200 })

    } catch (error) {
        return NextResponse.json(
          { message: "Failed to fetch user", error },
          { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const idPendaftaranKasuh = searchParams.get("id");

    if (!idPendaftaranKasuh) {
        return NextResponse.json({ message: "Missing id parameter" }, { status: 400 });
    }

    try {
        const kasuh = await prisma.pendaftaranKasuh.delete({
            where: {
                id: idPendaftaranKasuh,
            },
        });

        if (!kasuh) {
            return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
        }

        return NextResponse.json( { status: 200 })

    } catch (error) {
        return NextResponse.json(
          { message: "Failed to fetch user", error },
          { status: 500 }
        );
    }
}
