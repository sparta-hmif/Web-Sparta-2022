import { PrismaClient } from '@prisma/client'
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest,) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Missing id parameter" }, { status: 400 });
    }

    try {
        const kasuh = await prisma.userKasuh.findUnique({
            select: {
                id: true,
                user: true,
                userId: true,
                deskripsi: true,
                kuota: true,
                pendaftarSekarang: true,
                PendaftaranKasuh: true,
            },
            where: {
                id: id,
            },
        });

        if (!kasuh) {
            return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
        }

        const adikAsuh = kasuh.PendaftaranKasuh;

        return NextResponse.json({ adikAsuh }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
          { message: "Failed to fetch user", error },
          { status: 500 }
        );
    }
}
